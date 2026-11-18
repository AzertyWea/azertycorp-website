-- =============================================
-- AZERTYCORP — RLS remediation for existing databases
-- Run once after the original 0001_init.sql was applied.
--
-- Non-destructive: no table drops, no row deletes, no data updates.
-- Idempotent: safe to re-run.
-- =============================================

create extension if not exists "pgcrypto";

-- Admin identity comes from app_metadata (not user-editable raw metadata).
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

-- Honeypot column for validated public inserts.
alter table if exists public.contacts add column if not exists website text;

-- -------------------------------------------------
-- CONTACTS
-- -------------------------------------------------
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
-- CONTENT TABLES
-- -------------------------------------------------
alter table public.projects enable row level security;
drop policy if exists "projects_admin_all" on public.projects;
drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write" on public.projects
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

alter table public.testimonials enable row level security;
drop policy if exists "testimonials_admin_all" on public.testimonials;
drop policy if exists "testimonials_admin_write" on public.testimonials;
create policy "testimonials_admin_write" on public.testimonials
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

alter table public.blog_posts enable row level security;
drop policy if exists "blog_admin_all" on public.blog_posts;
drop policy if exists "blog_admin_write" on public.blog_posts;
create policy "blog_admin_write" on public.blog_posts
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

alter table public.site_metrics enable row level security;
drop policy if exists "metrics_admin_all" on public.site_metrics;
drop policy if exists "metrics_admin_write" on public.site_metrics;
create policy "metrics_admin_write" on public.site_metrics
  for all to authenticated
  using (public.azerty_is_admin())
  with check (public.azerty_is_admin());

-- -------------------------------------------------
-- VERIFICATION (operator may run after applying)
-- Expected: no rows for non-admin authenticated role.
-- -------------------------------------------------
-- select polname, polroles::text, pg_get_expr(polqual, polrelid) as using_expr
-- from pg_policy
-- where polrelid in (
--   'public.contacts'::regclass,
--   'public.projects'::regclass,
--   'public.testimonials'::regclass,
--   'public.blog_posts'::regclass,
--   'public.site_metrics'::regclass
-- )
-- order by polrelid::text, polname;
