create extension if not exists "pgcrypto";

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  vehicle text not null,
  source text not null,
  intent text,
  urgency text,
  stage text,
  assigned_rep text,
  last_contact_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists leads_email_unique on leads (email);
create unique index if not exists leads_phone_unique on leads (phone);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  date date not null,
  time time not null,
  rep text not null,
  created_at timestamptz not null default now()
);

create index if not exists appointments_lead_id_idx on appointments (lead_id);
create index if not exists appointments_created_at_idx on appointments (created_at desc);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  vin text not null unique,
  msrp numeric not null,
  price numeric not null,
  days_in_stock integer not null,
  market_rank numeric,
  pricing_position text,
  urgency text,
  recommended_action text,
  updated_at timestamptz not null default now()
);

create index if not exists inventory_recommended_action_idx on inventory (recommended_action);

create table if not exists logs (
  id bigint generated always as identity primary key,
  event text not null,
  lead_id uuid references leads(id) on delete set null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists logs_event_idx on logs (event);
create index if not exists logs_lead_id_idx on logs (lead_id);
create index if not exists logs_created_at_idx on logs (created_at desc);
