-- =============================================
-- AZERTYCORP Backend — Initial Schema
-- Run in Supabase SQL Editor or via `supabase db push`
-- =============================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------
-- 1. LEAD CAPTURE (contact forms everywhere)
-- Public can INSERT; only admins can read.
-- -------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  source text default 'website',      -- contact.html | quote modal | landing
  created_at timestamptz not null default now(),
  status text not null default 'new',  -- new | contacted | done
  notes text
);

alter table public.contacts enable row level security;

create policy "contacts_public_insert" on public.contacts
  for insert to anon, authenticated
  with check (true);

create policy "contacts_admin_select" on public.contacts
  for select to authenticated
  using (true);

create policy "contacts_admin_update" on public.contacts
  for update to authenticated
  using (true);

-- -------------------------------------------------
-- 2. PORTFOLIO / CASE STUDIES
-- Public reads published; admins manage all.
-- -------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  title_fr text,
  category text not null,             -- website | system | ai | branding | design
  summary text not null,
  summary_fr text,
  challenge text,
  solution text,
  technology text[] default '{}',
  outcomes text[] default '{}',
  gallery text[] default '{}',        -- image urls
  cover text,
  client text,
  year text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects_public_read" on public.projects
  for select using (published = true);

create policy "projects_admin_all" on public.projects
  for all to authenticated
  using (true) with check (true);

-- -------------------------------------------------
-- 3. TESTIMONIALS
-- -------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  quote_fr text,
  author text not null,
  role text,
  company text,
  project text,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "testimonials_public_read" on public.testimonials
  for select using (published = true);

create policy "testimonials_admin_all" on public.testimonials
  for all to authenticated
  using (true) with check (true);

-- -------------------------------------------------
-- 4. BLOG POSTS
-- -------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  title_fr text,
  excerpt text not null,
  excerpt_fr text,
  body text not null,                 -- markdown/html
  body_fr text,
  category text not null,             -- AI | Technology | Entrepreneurship | Design
  cover text,
  reading_minutes int not null default 5,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "blog_public_read" on public.blog_posts
  for select using (published = true);

create policy "blog_admin_all" on public.blog_posts
  for all to authenticated
  using (true) with check (true);

-- -------------------------------------------------
-- 5. CONTENT ENGINE — draft items
-- Owned per user (auth required). JSONB payload.
-- -------------------------------------------------
create table if not exists public.engine_items (
  id text primary key,                -- current client-side string id
  user_id uuid not null default auth.uid(),
  topic text not null,
  pillar text not null default 'Technology',
  status text not null default 'IDEA',
  current_step int not null default 1,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.engine_items enable row level security;

create policy "engine_own_read" on public.engine_items
  for select to authenticated
  using (auth.uid() = user_id);

create policy "engine_own_insert" on public.engine_items
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy "engine_own_update" on public.engine_items
  for update to authenticated
  using (auth.uid() = user_id);

create policy "engine_own_delete" on public.engine_items
  for delete to authenticated
  using (auth.uid() = user_id);

-- -------------------------------------------------
-- 6. CONTENT ENGINE — active draft pointer
-- -------------------------------------------------
create table if not exists public.engine_active_draft (
  user_id uuid primary key default auth.uid(),
  item_id text,
  updated_at timestamptz not null default now()
);

alter table public.engine_active_draft enable row level security;

create policy "draft_own_all" on public.engine_active_draft
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- -------------------------------------------------
-- 7. BRAND MEMORY (engine)
-- -------------------------------------------------
create table if not exists public.brand_memory (
  user_id uuid primary key default auth.uid(),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.brand_memory enable row level security;

create policy "brand_own_all" on public.brand_memory
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- -------------------------------------------------
-- 8. SITE METRICS (analytics feed)
-- -------------------------------------------------
create table if not exists public.site_metrics (
  id uuid primary key default gen_random_uuid(),
  metric text not null,               -- visitors | page_views | leads | projects
  value numeric not null default 0,
  unit text default 'count',
  period text,                        -- 2026-09 ...
  label text,
  created_at timestamptz not null default now(),
  unique (metric, period)
);

alter table public.site_metrics enable row level security;

create policy "metrics_public_read" on public.site_metrics
  for select using (true);

create policy "metrics_admin_all" on public.site_metrics
  for all to authenticated
  using (true) with check (true);