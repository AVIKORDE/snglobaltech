-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run
-- Creates the table the /api/inquiry function writes to.

create table if not exists public.inquiries (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  full_name     text not null,
  email         text not null,
  phone         text,
  company       text,
  product_slug  text,
  product_name  text,
  message       text not null,
  source        text default 'website',
  user_agent    text,
  ip            text,
  status        text not null default 'new'   -- new | contacted | closed (for your own tracking)
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- Lock the table down: only the service key (used by the serverless function) can access it.
alter table public.inquiries enable row level security;
-- No policies = anon/authenticated keys are denied. The service role bypasses RLS.
