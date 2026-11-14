-- Espace de gestion EcocarVHU — fondations (appliqué le 14/11/2026 sur le projet
-- Supabase « ecocarvhu », région eu-west-3). Aucun secret dans ce fichier : le
-- jeton de réception est généré par la base (private.settings).

-- Rôles et comptes autorisés -------------------------------------------------
create type public.app_role as enum ('admin', 'chauffeur');

create table public.allowed_users (
  email text primary key,
  role public.app_role not null,
  full_name text not null default ''
);
alter table public.allowed_users enable row level security;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.app_role not null,
  full_name text not null default '',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;

-- Un compte créé dans Supabase n'a accès à rien s'il n'est pas dans allowed_users.
create or replace function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare a public.allowed_users;
begin
  select * into a from public.allowed_users where lower(email) = lower(new.email);
  if found then
    insert into public.profiles (id, email, role, full_name)
    values (new.id, new.email, a.role, a.full_name)
    on conflict (id) do nothing;
  end if;
  return new;
end $$;
revoke all on function private.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.handle_new_user();

create or replace function private.app_role() returns public.app_role
language sql stable security definer set search_path = '' as $$
  select role from public.profiles where id = auth.uid()
$$;
revoke all on function private.app_role() from public, anon;
grant execute on function private.app_role() to authenticated;

create policy "profil personnel" on public.profiles for select to authenticated
  using (id = auth.uid() or private.app_role() = 'admin');
create policy "admin gère les comptes autorisés" on public.allowed_users for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

-- Demandes ------------------------------------------------------------------
create type public.demande_status as enum ('nouvelle', 'a_rappeler', 'rdv_fixe', 'enlevee', 'terminee', 'perdue');

create table public.demandes (
  id uuid primary key default gen_random_uuid(),
  numero bigint generated always as identity unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  origine text not null default 'site' check (origine in ('site', 'manuelle')),
  form_type text not null,
  status public.demande_status not null default 'nouvelle',
  source_page text,
  sector text,
  contact_name text,
  phone text,
  email text,
  company text,
  postal_code text,
  city text,
  address text,
  brand text,
  model text,
  year text,
  plate text,
  data jsonb not null default '{}'::jsonb,
  notes text not null default '',
  rdv_at timestamptz,
  chauffeur_id uuid references public.profiles (id) on delete set null,
  lost_reason text,
  upload_key uuid not null default gen_random_uuid()
);
create index demandes_status_idx on public.demandes (status, created_at desc);
alter table public.demandes enable row level security;

create table public.demande_photos (
  id uuid primary key default gen_random_uuid(),
  demande_id uuid not null references public.demandes (id) on delete cascade,
  path text not null unique,
  kind text not null default 'client' check (kind in ('client', 'enlevement', 'signature', 'document')),
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null
);
create index demande_photos_demande_idx on public.demande_photos (demande_id);
alter table public.demande_photos enable row level security;

create table public.demande_events (
  id uuid primary key default gen_random_uuid(),
  demande_id uuid not null references public.demandes (id) on delete cascade,
  created_at timestamptz not null default now(),
  author_id uuid references public.profiles (id) on delete set null,
  kind text not null,
  message text not null default ''
);
create index demande_events_demande_idx on public.demande_events (demande_id, created_at desc);
alter table public.demande_events enable row level security;

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;
create trigger demandes_touch before update on public.demandes
  for each row execute function public.touch_updated_at();

create policy "admin : demandes" on public.demandes for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create policy "chauffeur : ses enlèvements" on public.demandes for select to authenticated
  using (private.app_role() = 'chauffeur' and chauffeur_id = auth.uid());
create policy "admin : photos" on public.demande_photos for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create policy "chauffeur : photos de ses enlèvements" on public.demande_photos for select to authenticated
  using (private.app_role() = 'chauffeur' and exists (
    select 1 from public.demandes d where d.id = demande_id and d.chauffeur_id = auth.uid()));
create policy "admin : historique" on public.demande_events for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

-- Messages types --------------------------------------------------------------
create table public.message_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.message_templates enable row level security;
create policy "admin : messages types" on public.message_templates for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
-- (5 messages types de départ insérés à la création : accusé de réception,
-- confirmation de rendez-vous, documents à préparer, demande de photos, merci.)

-- Réception des demandes du site (appelée par le serveur du site) --------------
create table private.settings (key text primary key, value text not null);
revoke all on all tables in schema private from public, anon, authenticated;
insert into private.settings (key, value) values ('ingest_token', encode(extensions.gen_random_bytes(32), 'hex'));

create or replace function public.submit_demande(token text, payload jsonb) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare d public.demandes;
begin
  if token is null or token <> (select value from private.settings where key = 'ingest_token') then
    raise exception 'jeton invalide' using errcode = '42501';
  end if;
  insert into public.demandes (
    form_type, source_page, sector, contact_name, phone, email, company,
    postal_code, city, brand, model, year, plate, data
  ) values (
    payload->>'formType', payload->>'pagePath', payload->>'sector',
    nullif(coalesce(payload->'data'->>'name', payload->'data'->>'contactName'), ''),
    nullif(payload->'data'->>'phone', ''), nullif(payload->'data'->>'email', ''),
    nullif(payload->'data'->>'company', ''),
    nullif(payload->'data'->>'postalCode', ''), nullif(payload->'data'->>'city', ''),
    nullif(payload->'data'->>'brand', ''), nullif(payload->'data'->>'model', ''),
    nullif(payload->'data'->>'year', ''), nullif(payload->'data'->>'plate', ''),
    coalesce(payload->'data', '{}'::jsonb)
  ) returning * into d;
  insert into public.demande_events (demande_id, kind, message)
    values (d.id, 'creation', 'Demande reçue depuis le site');
  return jsonb_build_object('id', d.id, 'upload_key', d.upload_key);
end $$;
revoke all on function public.submit_demande(text, jsonb) from public, authenticated;
grant execute on function public.submit_demande(text, jsonb) to anon;

-- Photos : le site peut déposer des photos dans le dossier d'une demande qu'il
-- vient de créer (clé de dépôt secrète, 15 minutes).
create or replace function private.can_upload_demande_photo(object_name text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.demandes d
    where split_part(object_name, '/', 1) = d.id::text
      and split_part(object_name, '/', 2) = d.upload_key::text
      and d.created_at > now() - interval '15 minutes'
  )
$$;
revoke all on function private.can_upload_demande_photo(text) from public, authenticated;
grant execute on function private.can_upload_demande_photo(text) to anon;

create or replace function public.register_demande_photo(token text, demande uuid, object_path text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if token is null or token <> (select value from private.settings where key = 'ingest_token') then
    raise exception 'jeton invalide' using errcode = '42501';
  end if;
  insert into public.demande_photos (demande_id, path, kind) values (demande, object_path, 'client')
  on conflict (path) do nothing;
end $$;
revoke all on function public.register_demande_photo(text, uuid, text) from public, authenticated;
grant execute on function public.register_demande_photo(text, uuid, text) to anon;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

create policy "site : dépôt des photos d'une demande" on storage.objects for insert to anon
  with check (bucket_id = 'photos' and private.can_upload_demande_photo(name));
create policy "admin : photos" on storage.objects for all to authenticated
  using (bucket_id = 'photos' and private.app_role() = 'admin')
  with check (bucket_id = 'photos' and private.app_role() = 'admin');
