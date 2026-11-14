-- Espace de gestion EcocarVHU — visibilité : brouillons de contenu (articles, pages ville).
create table public.content_drafts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kind text not null check (kind in ('article', 'ville')),
  topic text not null,
  keyword text not null default '',
  notes text not null default '',
  title text not null default '',
  meta_description text not null default '',
  body text not null default '',
  status text not null default 'brouillon' check (status in ('brouillon', 'valide', 'publie')),
  validated_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null
);
create index content_drafts_status_idx on public.content_drafts (status, updated_at desc);
alter table public.content_drafts enable row level security;
create policy "admin : contenu" on public.content_drafts for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create trigger content_drafts_touch before update on public.content_drafts
  for each row execute function public.touch_updated_at();
