create extension if not exists "pgcrypto";

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  command text not null,
  status text not null default 'pending' check (status in ('pending', 'running', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.logs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  agent text not null,
  output text not null,
  status text not null,
  timestamp timestamptz not null default now()
);

create table if not exists public.agents (
  name text primary key,
  role text not null,
  last_active timestamptz
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  trigger text not null,
  action text not null,
  created_at timestamptz default now()
);

create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  created_at timestamptz default now()
);

alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.logs;

insert into public.agents (name, role)
values
  ('Nova', 'planning'),
  ('Jura', 'refinement'),
  ('Onyx', 'execution'),
  ('Alex', 'validation'),
  ('Sentinel', 'security'),
  ('Logger', 'memory')
on conflict (name) do update set role = excluded.role;
