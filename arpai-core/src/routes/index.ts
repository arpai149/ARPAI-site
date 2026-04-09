import { Router } from 'express';
import { supabase } from '../config/clients';
import { validateBody } from '../middleware/validate';
import { validateQuery } from '../middleware/validate-query';
import { rateLimit, verifyAdminKey, verifyWebhookSignature } from '../middleware/security';
import {
  activityQuerySchema,
  appointmentSchema,
  classifySchema,
  followupSchema,
  inventoryActionQuerySchema,
  inventorySchema,
  kpiTimeseriesQuerySchema,
  leadIntakeSchema,
  leadQueueQuerySchema,
  respondSchema,
  routeSchema,
  routingConflictQuerySchema
} from '../utils/schemas';
import { normalizeLead, saveLead, updateLastContactDate, updateLeadClassification, assignRep } from '../services/lead-service';
import { classifyLeadIntent, generateFollowupMessage, generateLeadResponse } from '../services/ai-service';
import { routeLead } from '../services/routing-service';
import { determineFollowupStage } from '../services/followup-service';
import { setAppointment } from '../services/appointment-service';
import { analyzeInventory } from '../services/inventory-service';
import { insertLog } from '../services/db-service';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/errors';
import { adminService } from '../services/admin-service';

export const apiRouter = Router();

apiRouter.use(rateLimit);

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'arpai-core', timestamp: new Date().toISOString() });
});

apiRouter.post('/lead/intake', validateBody(leadIntakeSchema), asyncHandler(async (req, res) => {
  const normalized = normalizeLead(req.body);
  const result = await saveLead(normalized);
  res.status(result.duplicate ? 200 : 201).json(result);
}));

apiRouter.post('/lead/classify', validateBody(classifySchema), asyncHandler(async (req, res) => {
  const classification = await classifyLeadIntent(req.body.message);

  if (req.body.lead_id) {
    await updateLeadClassification(req.body.lead_id, classification);
  }

  await insertLog('lead_classified', { leadId: req.body.lead_id, classification }, req.body.lead_id);
  res.json(classification);
}));

apiRouter.post('/lead/respond', validateBody(respondSchema), asyncHandler(async (req, res) => {
  const response = await generateLeadResponse(
    req.body.lead_message,
    req.body.vehicle,
    req.body.customer_name,
    req.body.safe_to_share_pricing
  );

  await insertLog('lead_response_generated', { vehicle: req.body.vehicle });
  res.json(response);
}));

apiRouter.post('/lead/route', validateBody(routeSchema), asyncHandler(async (req, res) => {
  const routing = routeLead(req.body.intent, req.body.ai_contact_sent, req.body.human_contact_sent);

  if (!routing.conflict_prevented) {
    await assignRep(req.body.lead_id, routing.assigned_rep);
    await insertLog('lead_routed', { leadId: req.body.lead_id, routing }, req.body.lead_id);
  } else {
    await insertLog('routing_conflict_prevented', { leadId: req.body.lead_id, routing }, req.body.lead_id);
  }

  res.json(routing);
}));

apiRouter.post('/followup/run', validateBody(followupSchema), asyncHandler(async (req, res) => {
  const followup_stage = determineFollowupStage(req.body.last_contact_date);
  const next_message = await generateFollowupMessage(followup_stage);
  const nowIso = new Date().toISOString();

  await updateLastContactDate(req.body.lead_id, nowIso);
  await insertLog('followup_generated', { leadId: req.body.lead_id, followup_stage }, req.body.lead_id);

  res.json({ followup_stage, next_message });
}));

apiRouter.post('/appointment/set', validateBody(appointmentSchema), asyncHandler(async (req, res) => {
  const appointment = await setAppointment(req.body);
  res.status(201).json({ appointment });
}));

apiRouter.post('/inventory/analyze', validateBody(inventorySchema), asyncHandler(async (req, res) => {
  const result = analyzeInventory(req.body.msrp, req.body.price, req.body.days_in_stock);

  const { error } = await supabase.from('inventory').upsert({
    vin: req.body.vin,
    msrp: req.body.msrp,
    price: req.body.price,
    days_in_stock: req.body.days_in_stock,
    market_rank: result.market_rank,
    pricing_position: result.pricing_position,
    urgency: result.urgency,
    recommended_action: result.recommended_action
  });

  if (error) {
    throw new AppError(`Failed to save inventory analysis: ${error.message}`);
  }

  await insertLog('inventory_analyzed', { vin: req.body.vin });
  res.json(result);
}));

apiRouter.post('/webhook/lead/intake', verifyWebhookSignature, asyncHandler(async (req, res) => {
  const body = JSON.parse(req.body as string) as unknown;
  const parsed = leadIntakeSchema.safeParse(body);

  if (!parsed.success) {
    throw new AppError('Invalid webhook payload', 400, 'INVALID_WEBHOOK_PAYLOAD', parsed.error.flatten());
  }

  const normalized = normalizeLead(parsed.data);
  const result = await saveLead(normalized);
  res.status(result.duplicate ? 200 : 201).json(result);
}));

apiRouter.get('/admin/dashboard/summary', verifyAdminKey, asyncHandler(async (_req, res) => {
  const summary = await adminService.getDashboardSummary();
  res.json(summary);
}));

apiRouter.get('/admin/leads', verifyAdminKey, validateQuery(leadQueueQuerySchema), asyncHandler(async (req, res) => {
  const queue = await adminService.getLeadQueue(req.query as unknown as Parameters<typeof adminService.getLeadQueue>[0]);
  res.json(queue);
}));

apiRouter.get('/admin/leads/:id', verifyAdminKey, asyncHandler(async (req, res) => {
  const detail = await adminService.getLeadDetail(req.params.id);
  res.json(detail);
}));

apiRouter.get('/admin/followups/due', verifyAdminKey, asyncHandler(async (_req, res) => {
  const due = await adminService.getFollowupsDue();
  res.json({ data: due });
}));

apiRouter.get('/admin/routing/conflicts', verifyAdminKey, validateQuery(routingConflictQuerySchema), asyncHandler(async (req, res) => {
  const days = Number((req.query as Record<string, unknown>).days ?? 7);
  const conflicts = await adminService.getRoutingConflicts(days);
  res.json(conflicts);
}));

apiRouter.get('/admin/inventory/actions', verifyAdminKey, validateQuery(inventoryActionQuerySchema), asyncHandler(async (req, res) => {
  const queue = await adminService.getInventoryActions(req.query as unknown as Parameters<typeof adminService.getInventoryActions>[0]);
  res.json(queue);
}));

apiRouter.get('/admin/activity', verifyAdminKey, validateQuery(activityQuerySchema), asyncHandler(async (req, res) => {
  const activity = await adminService.getActivity(req.query as unknown as Parameters<typeof adminService.getActivity>[0]);
  res.json(activity);
}));

apiRouter.get('/admin/kpi/timeseries', verifyAdminKey, validateQuery(kpiTimeseriesQuerySchema), asyncHandler(async (req, res) => {
  const range = String((req.query as Record<string, unknown>).range ?? '30d') as '7d' | '30d' | '90d';
  const series = await adminService.getKpiTimeseries(range);
  res.json(series);
}));
