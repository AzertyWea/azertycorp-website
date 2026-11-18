-- =============================================
-- AZERTYCORP Backend — Initial Schema (hardened)
-- Run in Supabase SQL Editor or via `supabase db push`.
--
-- This file is safe for a fresh database. If the original unsafe version was
-- already applied, run 0002_secure_rls.sql instead of re-running this file.
-- =============================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------
-- 0. ADMIN ROLE HELPER
-- Admin identity must come from JWT app_metadata, which users cannot edit.
-- Grant an existing auth user admin access in Supabase with:
--   update auth.users
--   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
--       || '{"role":"admin"}'::jsonb
--   where email = 'ADMIN_EMAIL';
-- -------------------------------------------------
create or replace function public.azerty_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.azerty_is_admin() from public;
grant execute on function public.azerty_is_admin() to anon, authenticated;

-- -------------------------------------------------
-- 1. LEAD CAPTURE (contact forms everywhere)
-- Public can INSERT validated rows; only admins can read or update.
-- -------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  source text default 'website',      -- contact.html | quote-modal | website
  website text,                       -- honeypot; must be empty
  created_at timestamptz not null default now(),
  status text not null default 'new',  -- new | contacted | done
  notes text
);

alter table public.contacts enable row level security;

drop policy if exists "contacts_public_insert" on public.contacts;
drop policy if exists "contacts_admin_select" on public.contacts;
drop policy if exists "contacts_admin_update" on public.contacts;

create policy "contacts_public_insert" on public.contacts
  for insert to anon, authenticated
  with check (
    char_length(btrim(name)) between 2 and 120
    and char_length(btrim(email)) between 5 and 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and char_length(btrim(message)) between 2 and 5000
    and (phone is null or char_length(phone) <= 50)
    and (service is null or char_length(service) <= 120)
    and (source is null or source ~ '^[a-z0-9-]{1,50}$')
    and (website is null or website = '')
  );

create policy "contacts_admin_select" on public.contacts
  for select to authenticated
  using (public.azerty_is_admin());

create policy "contacts_admin_update" on public.contacts
  for update to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

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

drop policy if exists "projects_public_read" on public.projects;
drop policy if exists "projects_admin_all" on public.projects;
drop policy if exists "projects_admin_write" on public.projects;

create policy "projects_public_read" on public.projects
  for select using (published = true);

create policy "projects_admin_write" on public.projects
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

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

drop policy if exists "testimonials_public_read" on public.testimonials;
drop policy if exists "testimonials_admin_all" on public.testimonials;
drop policy if exists "testimonials_admin_write" on public.testimonials;

create policy "testimonials_public_read" on public.testimonials
  for select using (published = true);

create policy "testimonials_admin_write" on public.testimonials
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

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

drop policy if exists "blog_public_read" on public.blog_posts;
drop policy if exists "blog_admin_all" on public.blog_posts;
drop policy if exists "blog_admin_write" on public.blog_posts;

create policy "blog_public_read" on public.blog_posts
  for select using (published = true);

create policy "blog_admin_write" on public.blog_posts
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

-- -------------------------------------------------
-- 5. CONTENT ENGINE — draft items (user-owned)
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

drop policy if exists "engine_own_read" on public.engine_items;
drop policy if exists "engine_own_insert" on public.engine_items;
drop policy if exists "engine_own_update" on public.engine_items;
drop policy if exists "engine_own_delete" on public.engine_items;

create policy "engine_own_read" on public.engine_items
  for select to authenticated
  using (auth.uid() = user_id);

create policy "engine_own_insert" on public.engine_items
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy "engine_own_update" on public.engine_items
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

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

drop policy if exists "draft_own_all" on public.engine_active_draft;

create policy "draft_own_all" on public.engine_active_draft
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -------------------------------------------------
-- 7. BRAND MEMORY (engine)
-- -------------------------------------------------
create table if not exists public.brand_memory (
  user_id uuid primary key default auth.uid(),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.brand_memory enable row level security;

drop policy if exists "brand_own_all" on public.brand_memory;

create policy "brand_own_all" on public.brand_memory
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

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

drop policy if exists "metrics_public_read" on public.site_metrics;
drop policy if exists "metrics_admin_all" on public.site_metrics;
drop policy if exists "metrics_admin_write" on public.site_metrics;

create policy "metrics_public_read" on public.site_metrics
  for select using (true);

create policy "metrics_admin_write" on public.site_metrics
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());
