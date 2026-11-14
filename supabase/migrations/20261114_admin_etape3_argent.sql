-- Espace de gestion EcocarVHU — étape 3 : entreprise, fichier pros, rachats,
-- devis et factures (numérotation continue, factures émises non modifiables).

-- Informations de l'entreprise (une seule ligne) --------------------------------
create table public.company_settings (
  id int primary key default 1 check (id = 1),
  legal_name text not null default '',
  legal_form text not null default '',
  siret text not null default '',
  rcs text not null default '',
  capital text not null default '',
  tva_number text not null default '',
  tva_franchise boolean not null default true,
  address text not null default '',
  postal_code text not null default '',
  city text not null default '',
  phone text not null default '07 53 08 62 18',
  email text not null default '',
  iban text not null default '',
  bic text not null default '',
  payment_days int not null default 30,
  legal_footer text not null default 'Pénalités de retard : trois fois le taux d''intérêt légal. Indemnité forfaitaire pour frais de recouvrement : 40 € (clients professionnels). Pas d''escompte pour paiement anticipé.',
  updated_at timestamptz not null default now()
);
insert into public.company_settings (id) values (1);
alter table public.company_settings enable row level security;
create policy "admin : entreprise" on public.company_settings for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

-- Fichier pros ---------------------------------------------------------------
create table public.pros (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  kind text not null default 'garage' check (kind in ('garage', 'concession', 'flotte', 'syndic', 'assurance', 'fourriere', 'autre')),
  status text not null default 'prospect' check (status in ('prospect', 'client', 'inactif')),
  source text not null default 'manuel',
  contact_name text,
  phone text,
  email text,
  address text,
  postal_code text,
  city text,
  siret text,
  notes text not null default '',
  last_contact_at timestamptz
);
create index pros_status_idx on public.pros (status, name);
alter table public.pros enable row level security;
create policy "admin : pros" on public.pros for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create trigger pros_touch before update on public.pros
  for each row execute function public.touch_updated_at();

alter table public.demandes add column pro_id uuid references public.pros (id) on delete set null;

-- Rachats ----------------------------------------------------------------------
create table public.rachats (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  demande_id uuid unique references public.demandes (id) on delete set null,
  vehicle text not null default '',
  status text not null default 'estimation' check (status in ('estimation', 'propose', 'accepte', 'achete', 'revendu', 'refuse')),
  prix_propose numeric(10, 2),
  prix_achat numeric(10, 2),
  frais numeric(10, 2) not null default 0,
  revente_pieces numeric(10, 2) not null default 0,
  revente_metal numeric(10, 2) not null default 0,
  achete_le date,
  notes text not null default ''
);
alter table public.rachats enable row level security;
create policy "admin : rachats" on public.rachats for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create trigger rachats_touch before update on public.rachats
  for each row execute function public.touch_updated_at();

-- Devis et factures ------------------------------------------------------------
create table public.factures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kind text not null check (kind in ('devis', 'facture')),
  numero text unique,
  status text not null default 'brouillon' check (status in ('brouillon', 'emis', 'accepte', 'refuse', 'paye', 'annule')),
  issued_at date,
  due_at date,
  paid_at date,
  pro_id uuid references public.pros (id) on delete set null,
  demande_id uuid references public.demandes (id) on delete set null,
  devis_id uuid references public.factures (id) on delete set null,
  client_name text not null default '',
  client_address text not null default '',
  client_email text not null default '',
  client_siret text not null default '',
  lines jsonb not null default '[]'::jsonb,
  total_ht numeric(12, 2) not null default 0,
  total_tva numeric(12, 2) not null default 0,
  total_ttc numeric(12, 2) not null default 0,
  notes text not null default '',
  seller jsonb
);
create index factures_kind_idx on public.factures (kind, created_at desc);
alter table public.factures enable row level security;
create policy "admin : factures" on public.factures for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');
create trigger factures_touch before update on public.factures
  for each row execute function public.touch_updated_at();

-- Une facture émise ne se modifie pas et ne se supprime pas (seuls le statut et
-- la date de paiement changent). Un devis émis garde son contenu.
create or replace function private.protect_emitted() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'DELETE' then
    if old.numero is not null and old.kind = 'facture' then
      raise exception 'Une facture émise ne peut pas être supprimée.';
    end if;
    return old;
  end if;
  if old.numero is not null and (
    new.numero is distinct from old.numero or new.kind is distinct from old.kind or
    new.lines is distinct from old.lines or new.total_ttc is distinct from old.total_ttc or
    new.client_name is distinct from old.client_name or new.client_address is distinct from old.client_address or
    new.issued_at is distinct from old.issued_at or new.seller is distinct from old.seller
  ) then
    raise exception 'Un document émis ne peut plus être modifié.';
  end if;
  return new;
end $$;
create trigger factures_protect before update or delete on public.factures
  for each row execute function private.protect_emitted();

create table private.doc_counters (kind text, year int, last int not null, primary key (kind, year));
revoke all on private.doc_counters from public, anon, authenticated;

-- Émet un devis ou une facture : numéro continu par année, identité du vendeur figée.
create or replace function public.emit_document(doc uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare
  f public.factures;
  c public.company_settings;
  n int;
  y int := extract(year from now() at time zone 'Europe/Paris');
  num text;
begin
  if private.app_role() is distinct from 'admin' then raise exception 'réservé aux administrateurs' using errcode = '42501'; end if;
  select * into f from public.factures where id = doc for update;
  if not found then raise exception 'document introuvable'; end if;
  if f.numero is not null then return f.numero; end if;
  select * into c from public.company_settings where id = 1;
  if coalesce(c.legal_name, '') = '' or coalesce(c.siret, '') = '' or coalesce(c.address, '') = '' then
    raise exception 'Complétez la raison sociale, le SIRET et l''adresse dans Réglages › Entreprise avant d''émettre.';
  end if;
  if jsonb_array_length(f.lines) = 0 then raise exception 'Ajoutez au moins une ligne.'; end if;
  insert into private.doc_counters (kind, year, last) values (f.kind, y, 1)
    on conflict (kind, year) do update set last = private.doc_counters.last + 1
    returning last into n;
  num := (case f.kind when 'facture' then 'F' else 'D' end) || '-' || y || '-' || lpad(n::text, 4, '0');
  update public.factures set
    numero = num, status = 'emis', issued_at = current_date,
    due_at = case when f.kind = 'facture' then current_date + c.payment_days else current_date + 30 end,
    seller = to_jsonb(c) - 'id' - 'updated_at'
  where id = doc;
  return num;
end $$;
revoke all on function public.emit_document(uuid) from public, anon;
grant execute on function public.emit_document(uuid) to authenticated;
