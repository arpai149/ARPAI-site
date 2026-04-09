import { determineFollowupStage } from './followup-service';
import { generateFollowupMessage } from './ai-service';
import { adminRepository } from '../repositories/admin-repository';
import { AppError } from '../utils/errors';

const startOfUtcDay = (d = new Date()): string => {
  const day = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return day.toISOString();
};

const startOfDaysAgo = (days: number): string => {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - days);
  return startOfUtcDay(now);
};

const dateKey = (value: string): string => value.slice(0, 10);

export const paginate = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  total_pages: Math.max(1, Math.ceil(total / limit))
});

export const applyStatusFilter = async (
  leads: Record<string, unknown>[],
  status?: 'new' | 'contacted' | 'appointed'
): Promise<Record<string, unknown>[]> => {
  if (!status) return leads;

  if (status === 'new') {
    return leads.filter((lead) => !lead.last_contact_date);
  }

  if (status === 'contacted') {
    return leads.filter((lead) => Boolean(lead.last_contact_date));
  }

  const leadIds = leads.map((lead) => String(lead.id));
  const appointmentLeadIds = await adminRepository.fetchLeadIdsWithAppointments(leadIds);
  return leads.filter((lead) => appointmentLeadIds.has(String(lead.id)));
};

export const buildTimeseries = (
  rangeDays: number,
  seed: {
    leads: Record<string, unknown>[];
    appointments: Record<string, unknown>[];
    followups: Record<string, unknown>[];
    inventory: Record<string, unknown>[];
    duplicates: Record<string, unknown>[];
  }
): Array<Record<string, unknown>> => {
  const rows: Array<Record<string, unknown>> = [];
  const today = new Date();

  const bucket = (items: Record<string, unknown>[]): Record<string, number> =>
    items.reduce<Record<string, number>>((acc, item) => {
      const createdAt = String(item.created_at ?? '');
      const key = dateKey(createdAt);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

  const leadsB = bucket(seed.leads);
  const apptsB = bucket(seed.appointments);
  const followupsB = bucket(seed.followups);
  const inventoryB = bucket(seed.inventory);
  const duplicateB = bucket(seed.duplicates);

  for (let i = rangeDays - 1; i >= 0; i -= 1) {
    const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const key = day.toISOString().slice(0, 10);
    rows.push({
      date: key,
      leads_created: leadsB[key] ?? 0,
      appointments_set: apptsB[key] ?? 0,
      followups_generated: followupsB[key] ?? 0,
      inventory_analyses: inventoryB[key] ?? 0,
      duplicate_preventions: duplicateB[key] ?? 0
    });
  }

  return rows;
};

export const mapFollowupQueueItem = (
  lead: Record<string, unknown>,
  recommended_next_message: string
): Record<string, unknown> => {
  const fallbackLastContact = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const lastContact = String(lead.last_contact_date ?? fallbackLastContact);
  const recommended_followup_stage = determineFollowupStage(lastContact);

  return {
    lead_id: lead.id,
    customer_name: lead.name,
    assigned_rep: lead.assigned_rep,
    stage: lead.stage,
    last_contact_date: lead.last_contact_date,
    recommended_followup_stage,
    recommended_next_message
  };
};

export const adminService = {
  async getDashboardSummary(): Promise<Record<string, unknown>> {
    const today = startOfUtcDay();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [
      total_leads,
      new_leads_today,
      appointments_set_today,
      leads_by_stage,
      leads_by_intent,
      followups_due,
      duplicate_leads_prevented,
      routing_conflicts_prevented,
      inventory_units_needing_action,
      last_24h_activity_count
    ] = await Promise.all([
      adminRepository.countLeads(),
      adminRepository.countLeadsSince(today),
      adminRepository.countAppointmentsSince(today),
      adminRepository.fetchLeadsByField('stage'),
      adminRepository.fetchLeadsByField('intent'),
      adminRepository.countFollowupsDue(dayAgo),
      adminRepository.countLogsByEvent('lead_duplicate_skipped'),
      adminRepository.countLogsByEvent('routing_conflict_prevented'),
      adminRepository.countInventoryNeedingAction(),
      adminRepository.countLogsByEvent('lead_intake', dayAgo)
    ]);

    return {
      total_leads,
      new_leads_today,
      appointments_set_today,
      leads_by_stage,
      leads_by_intent,
      followups_due,
      duplicate_leads_prevented,
      routing_conflicts_prevented,
      inventory_units_needing_action,
      last_24h_activity_count
    };
  },

  async getLeadQueue(query: {
    status?: 'new' | 'contacted' | 'appointed';
    stage?: string;
    intent?: string;
    assigned_rep?: string;
    source?: string;
    date_from?: string;
    date_to?: string;
    search?: string;
    page: number;
    limit: number;
  }): Promise<Record<string, unknown>> {
    const { data, total } = await adminRepository.fetchLeads(query);
    const filtered = await applyStatusFilter(data, query.status);

    return {
      data: filtered,
      pagination: paginate(query.page, query.limit, total)
    };
  },

  async getLeadDetail(leadId: string): Promise<Record<string, unknown>> {
    const [lead, appointments, timeline] = await Promise.all([
      adminRepository.fetchLeadById(leadId),
      adminRepository.fetchAppointmentsByLeadId(leadId),
      adminRepository.fetchLogsByLeadId(leadId)
    ]);

    if (!lead) {
      throw new AppError('Lead not found', 404, 'NOT_FOUND');
    }

    const latestActivity = timeline[0] ?? null;
    const followupHistory = timeline.filter((log) => log.event === 'followup_generated');

    return {
      lead,
      classification: {
        intent: lead.intent,
        urgency: lead.urgency,
        buyer_stage: lead.stage
      },
      assignment: {
        assigned_rep: lead.assigned_rep
      },
      latest_activity: latestActivity,
      appointment_history: appointments,
      followup_history: followupHistory,
      communication_timeline: timeline
    };
  },

  async getFollowupsDue(): Promise<Record<string, unknown>[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const leads = await adminRepository.fetchFollowupsDue(oneDayAgo);

    return Promise.all(leads.map(async (lead) => {
      const lastContact = String(lead.last_contact_date ?? oneDayAgo);
      const recommended_followup_stage = determineFollowupStage(lastContact);
      const recommended_next_message = await generateFollowupMessage(recommended_followup_stage);
      return mapFollowupQueueItem(lead, recommended_next_message);
    }));
  },

  async getRoutingConflicts(days: number): Promise<Record<string, unknown>> {
    const since = startOfDaysAgo(days);
    const items = await adminRepository.fetchRoutingConflictLogs(since);

    return {
      since,
      total_conflicts: items.length,
      conflicts: items
    };
  },

  async getInventoryActions(query: {
    action?: string;
    urgency?: string;
    sort_by: string;
    order: 'asc' | 'desc';
    page: number;
    limit: number;
  }): Promise<Record<string, unknown>> {
    const { data, total } = await adminRepository.fetchInventoryActions(query);

    return {
      data,
      pagination: paginate(query.page, query.limit, total)
    };
  },

  async getActivity(query: {
    event?: string;
    lead_id?: string;
    date_from?: string;
    date_to?: string;
    page: number;
    limit: number;
  }): Promise<Record<string, unknown>> {
    const { data, total } = await adminRepository.fetchActivity(query);

    return {
      data,
      pagination: paginate(query.page, query.limit, total)
    };
  },

  async getKpiTimeseries(range: '7d' | '30d' | '90d'): Promise<Record<string, unknown>> {
    const rangeDays = Number(range.replace('d', ''));
    const since = startOfDaysAgo(rangeDays - 1);
    const seed = await adminRepository.fetchTimeseriesSeed(rangeDays, since);

    return {
      range,
      series: buildTimeseries(rangeDays, seed)
    };
  }
};
