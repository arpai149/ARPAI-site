import { supabase } from '../config/clients';
import { AppError } from '../utils/errors';

type LeadFilters = {
  stage?: string;
  intent?: string;
  assigned_rep?: string;
  source?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  page: number;
  limit: number;
};

type ActivityFilters = {
  event?: string;
  lead_id?: string;
  date_from?: string;
  date_to?: string;
  page: number;
  limit: number;
};

const fail = (message: string): never => {
  throw new AppError(message, 500, 'DB_ERROR');
};

const applyDateRange = (query: any, dateFrom?: string, dateTo?: string) => {
  let current = query;
  if (dateFrom) current = current.gte('created_at', dateFrom);
  if (dateTo) current = current.lte('created_at', dateTo);
  return current;
};

export const adminRepository = {
  async countLeads(): Promise<number> {
    const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    if (error) fail(`Failed to count leads: ${error.message}`);
    return count ?? 0;
  },

  async countLeadsSince(isoDate: string): Promise<number> {
    const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', isoDate);
    if (error) fail(`Failed to count recent leads: ${error.message}`);
    return count ?? 0;
  },

  async countAppointmentsSince(isoDate: string): Promise<number> {
    const { count, error } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).gte('created_at', isoDate);
    if (error) fail(`Failed to count appointments: ${error.message}`);
    return count ?? 0;
  },

  async fetchLeadsByField(field: 'stage' | 'intent'): Promise<Record<string, number>> {
    const { data, error } = await supabase.from('leads').select(field);
    if (error) fail(`Failed to fetch ${field} buckets: ${error.message}`);

    return (data ?? []).reduce<Record<string, number>>((acc, row) => {
      const key = String(row[field] ?? 'unknown');
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  },

  async countFollowupsDue(beforeIso: string): Promise<number> {
    const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true }).lte('last_contact_date', beforeIso);
    if (error) fail(`Failed to count followups due: ${error.message}`);
    return count ?? 0;
  },

  async countLogsByEvent(event: string, sinceIso?: string): Promise<number> {
    let query = supabase.from('logs').select('*', { count: 'exact', head: true }).eq('event', event);
    if (sinceIso) {
      query = query.gte('created_at', sinceIso);
    }
    const { count, error } = await query;
    if (error) fail(`Failed to count logs for ${event}: ${error.message}`);
    return count ?? 0;
  },

  async countInventoryNeedingAction(): Promise<number> {
    const { count, error } = await supabase.from('inventory').select('*', { count: 'exact', head: true }).in('recommended_action', ['drop', 'push']);
    if (error) fail(`Failed to count inventory action queue: ${error.message}`);
    return count ?? 0;
  },

  async fetchLeads(filters: LeadFilters): Promise<{ data: Record<string, unknown>[]; total: number }> {
    let query = supabase.from('leads').select('*', { count: 'exact' });

    if (filters.stage) query = query.eq('stage', filters.stage);
    if (filters.intent) query = query.eq('intent', filters.intent);
    if (filters.assigned_rep) query = query.eq('assigned_rep', filters.assigned_rep);
    if (filters.source) query = query.eq('source', filters.source);
    query = applyDateRange(query, filters.date_from, filters.date_to);

    if (filters.search) {
      query = query.or([
        `name.ilike.%${filters.search}%`,
        `email.ilike.%${filters.search}%`,
        `phone.ilike.%${filters.search}%`,
        `vehicle.ilike.%${filters.search}%`
      ].join(','));
    }

    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;

    const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) fail(`Failed to fetch leads queue: ${error.message}`);
    return { data: data ?? [], total: count ?? 0 };
  },

  async fetchLeadById(leadId: string): Promise<Record<string, unknown> | null> {
    const { data, error } = await supabase.from('leads').select('*').eq('id', leadId).maybeSingle();
    if (error) fail(`Failed to load lead detail: ${error.message}`);
    return data;
  },

  async fetchAppointmentsByLeadId(leadId: string): Promise<Record<string, unknown>[]> {
    const { data, error } = await supabase.from('appointments').select('*').eq('lead_id', leadId).order('created_at', { ascending: false });
    if (error) fail(`Failed to load lead appointments: ${error.message}`);
    return data ?? [];
  },

  async fetchLeadIdsWithAppointments(leadIds: string[]): Promise<Set<string>> {
    if (leadIds.length === 0) return new Set();
    const { data, error } = await supabase.from('appointments').select('lead_id').in('lead_id', leadIds);
    if (error) fail(`Failed to load appointment lead IDs: ${error.message}`);
    return new Set((data ?? []).map((row) => String(row.lead_id)));
  },

  async fetchLogsByLeadId(leadId: string, limit = 200): Promise<Record<string, unknown>[]> {
    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .or(`lead_id.eq.${leadId},payload->>leadId.eq.${leadId}`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) fail(`Failed to load lead timeline: ${error.message}`);
    return data ?? [];
  },

  async fetchFollowupsDue(beforeIso: string, limit = 100): Promise<Record<string, unknown>[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('id,name,assigned_rep,stage,last_contact_date')
      .lte('last_contact_date', beforeIso)
      .order('last_contact_date', { ascending: true })
      .limit(limit);

    if (error) fail(`Failed to load followups due: ${error.message}`);
    return data ?? [];
  },

  async fetchRoutingConflictLogs(sinceIso: string): Promise<Record<string, unknown>[]> {
    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .in('event', ['routing_conflict_prevented', 'lead_duplicate_skipped'])
      .gte('created_at', sinceIso)
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) fail(`Failed to load routing conflicts: ${error.message}`);
    return data ?? [];
  },

  async fetchInventoryActions(filters: { action?: string; urgency?: string; sort_by: string; order: 'asc' | 'desc'; page: number; limit: number }): Promise<{ data: Record<string, unknown>[]; total: number }> {
    let query = supabase.from('inventory').select('*', { count: 'exact' });
    if (filters.action) query = query.eq('recommended_action', filters.action);
    if (filters.urgency) query = query.eq('urgency', filters.urgency);

    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;
    const { data, count, error } = await query.order(filters.sort_by, { ascending: filters.order === 'asc' }).range(from, to);

    if (error) fail(`Failed to load inventory action queue: ${error.message}`);
    return { data: data ?? [], total: count ?? 0 };
  },

  async fetchActivity(filters: ActivityFilters): Promise<{ data: Record<string, unknown>[]; total: number }> {
    let query = supabase.from('logs').select('*', { count: 'exact' });

    if (filters.event) query = query.eq('event', filters.event);
    if (filters.lead_id) query = query.eq('lead_id', filters.lead_id);
    query = applyDateRange(query, filters.date_from, filters.date_to);

    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;

    const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) fail(`Failed to load activity stream: ${error.message}`);
    return { data: data ?? [], total: count ?? 0 };
  },

  async fetchTimeseriesSeed(rangeDays: number, sinceIso: string): Promise<{
    leads: Record<string, unknown>[];
    appointments: Record<string, unknown>[];
    followups: Record<string, unknown>[];
    inventory: Record<string, unknown>[];
    duplicates: Record<string, unknown>[];
  }> {
    const [
      leadsRes,
      appointmentsRes,
      followupsRes,
      inventoryRes,
      duplicatesRes
    ] = await Promise.all([
      supabase.from('leads').select('created_at').gte('created_at', sinceIso),
      supabase.from('appointments').select('created_at').gte('created_at', sinceIso),
      supabase.from('logs').select('created_at').eq('event', 'followup_generated').gte('created_at', sinceIso),
      supabase.from('logs').select('created_at').eq('event', 'inventory_analyzed').gte('created_at', sinceIso),
      supabase.from('logs').select('created_at').eq('event', 'lead_duplicate_skipped').gte('created_at', sinceIso)
    ]);

    if (leadsRes.error) fail(`Failed to fetch leads series: ${leadsRes.error.message}`);
    if (appointmentsRes.error) fail(`Failed to fetch appointments series: ${appointmentsRes.error.message}`);
    if (followupsRes.error) fail(`Failed to fetch followups series: ${followupsRes.error.message}`);
    if (inventoryRes.error) fail(`Failed to fetch inventory series: ${inventoryRes.error.message}`);
    if (duplicatesRes.error) fail(`Failed to fetch duplicate series: ${duplicatesRes.error.message}`);

    return {
      leads: leadsRes.data ?? [],
      appointments: appointmentsRes.data ?? [],
      followups: followupsRes.data ?? [],
      inventory: inventoryRes.data ?? [],
      duplicates: duplicatesRes.data ?? []
    };
  }
};
