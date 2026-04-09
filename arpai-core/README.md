# arpai-core

Production-grade modular backend for automotive lead lifecycle operations.

## Stack
- Node.js + TypeScript
- Express API
- Supabase (PostgreSQL)
- OpenAI API
- Twilio-ready messaging integration
- Vercel-compatible serverless entry (`api/index.ts`)

## Security + Reliability Included
- Shared API key auth middleware for `/api/*` (health exempt)
- Admin key protection for `/api/admin/*`
- In-memory rate limiting (`60 req/min` per IP)
- Webhook signature verification (`x-arpai-signature`, HMAC SHA256)
- Duplicate lead prevention (email/phone pre-check + DB unique indexes)
- Retry wrapper for OpenAI/Twilio outbound calls
- Centralized hardened error handling with stable error codes

## Setup
1. `npm install`
2. `cp .env.example .env`
3. Apply schema in `supabase/schema.sql`
4. `npm run dev`

## Local Validation Path
```bash
npm run check
npm run build
npm run test
```

## Core API Endpoints
- `POST /api/lead/intake`
- `POST /api/lead/classify`
- `POST /api/lead/respond`
- `POST /api/lead/route`
- `POST /api/followup/run`
- `POST /api/appointment/set`
- `POST /api/inventory/analyze`
- `POST /api/webhook/lead/intake`
- `GET /api/health`

## Admin / Dashboard API Contract
All admin routes require `x-admin-key`.

### Dashboard Summary
- `GET /api/admin/dashboard/summary`
- Returns: `total_leads`, `new_leads_today`, `appointments_set_today`, `leads_by_stage`, `leads_by_intent`, `followups_due`, `duplicate_leads_prevented`, `routing_conflicts_prevented`, `inventory_units_needing_action`, `last_24h_activity_count`.

### Lead Queue
- `GET /api/admin/leads`
- Query: `status`, `stage`, `intent`, `assigned_rep`, `source`, `date_from`, `date_to`, `search`, `page`, `limit`.
- Returns paginated lead records.

### Lead Detail
- `GET /api/admin/leads/:id`
- Returns lead, classification, assignment, latest activity, appointment history, followup history, communication timeline.

### Follow-up Queue
- `GET /api/admin/followups/due`
- Returns leads due now with recommended follow-up stage and generated next message.

### Routing Visibility
- `GET /api/admin/routing/conflicts?days=7`
- Returns recent conflict-prevention / duplicate-risk events.

### Inventory Action Queue
- `GET /api/admin/inventory/actions`
- Query: `action`, `urgency`, `sort_by`, `order`, `page`, `limit`.

### Activity Log API
- `GET /api/admin/activity`
- Query: `event`, `lead_id`, `date_from`, `date_to`, `page`, `limit`.

### KPI Timeseries
- `GET /api/admin/kpi/timeseries?range=7d|30d|90d`
- Returns daily aggregates: leads created, appointments set, followups generated, inventory analyses, duplicate preventions.

## Migration Notes
If you already deployed an older schema, apply these additions:
- `logs.lead_id` column + foreign key to `leads(id)`
- New indexes for `appointments`, `inventory.recommended_action`, and `logs(event, lead_id, created_at)`

## Still Missing Before True Production
- Distributed rate limiting (Redis/Upstash).
- Full JWT/OAuth identity + RBAC model.
- Persistent idempotency/replay prevention strategy.
- Integration tests + CI/CD gates.
- Advanced observability/alerting/compliance controls.
