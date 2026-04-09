import { z } from 'zod';

export const leadIntakeSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  vehicle: z.string().min(1),
  source: z.string().min(1)
});

export const classifySchema = z.object({
  message: z.string().min(1),
  lead_id: z.string().uuid().optional()
});

export const respondSchema = z.object({
  lead_message: z.string().min(1),
  vehicle: z.string().min(1),
  customer_name: z.string().min(1),
  safe_to_share_pricing: z.boolean().default(false)
});

export const routeSchema = z.object({
  lead_id: z.string().uuid(),
  intent: z.enum(['price', 'availability', 'trade', 'credit', 'appointment']),
  ai_contact_sent: z.boolean().default(false),
  human_contact_sent: z.boolean().default(false)
});

export const followupSchema = z.object({
  lead_id: z.string().uuid(),
  last_contact_date: z.string().datetime()
});

export const appointmentSchema = z.object({
  lead_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  rep: z.string().min(1)
});

export const inventorySchema = z.object({
  vin: z.string().min(11).max(17),
  msrp: z.number().positive(),
  price: z.number().positive(),
  days_in_stock: z.number().int().nonnegative()
});

export const leadQueueQuerySchema = z.object({
  status: z.enum(['new', 'contacted', 'appointed']).optional(),
  stage: z.enum(['early', 'mid', 'late']).optional(),
  intent: z.enum(['price', 'availability', 'trade', 'credit', 'appointment']).optional(),
  assigned_rep: z.string().optional(),
  source: z.string().optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25)
});

export const activityQuerySchema = z.object({
  event: z.string().optional(),
  lead_id: z.string().uuid().optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const inventoryActionQuerySchema = z.object({
  action: z.enum(['hold', 'drop', 'push']).optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  sort_by: z.enum(['days_in_stock', 'market_rank', 'updated_at']).default('days_in_stock'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25)
});

export const kpiTimeseriesQuerySchema = z.object({
  range: z.enum(['7d', '30d', '90d']).default('30d')
});

export const routingConflictQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(90).default(7)
});
