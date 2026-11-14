-- Espace de gestion EcocarVHU — prospection (entreprises, e-mails, relances, désinscription).

alter table public.pros
  add column siren text unique,
  add column naf text,
  add column naf_label text,
  add column effectif text,
  add column dirigeant text,
  add column website text,
  add column stage text not null default 'a_contacter'
    check (stage in ('a_contacter', 'pret', 'envoye', 'relance', 'repondu', 'gagne', 'refus', 'desinscrit')),
  add column unsubscribe_token uuid not null default gen_random_uuid();

-- E-mails de prospection : 1 = premier message, 2 et 3 = relances.
create table public.prospect_emails (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pro_id uuid not null references public.pros (id) on delete cascade,
  step int not null check (step between 1 and 3),
  subject text not null,
  body text not null,
  status text not null default 'brouillon' check (status in ('brouillon', 'planifie', 'envoye', 'annule', 'erreur')),
  scheduled_at timestamptz,
  sent_at timestamptz,
  error text,
  unique (pro_id, step)
);
create index prospect_emails_due_idx on public.prospect_emails (status, scheduled_at);
alter table public.prospect_emails enable row level security;
create policy "admin : e-mails de prospection" on public.prospect_emails for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

-- Modèles des 3 e-mails (modifiables).
create table public.prospect_templates (
  step int primary key check (step between 1 and 3),
  delay_days int not null default 0,
  subject text not null,
  body text not null
);
alter table public.prospect_templates enable row level security;
create policy "admin : modèles de prospection" on public.prospect_templates for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

insert into public.prospect_templates (step, delay_days, subject, body) values
(1, 0, 'Vos véhicules hors d''usage à {ville} : enlèvement gratuit',
'Bonjour{dirigeant},

Je me permets de vous contacter car {entreprise} {accroche}.

EcocarVHU s''occupe de l''enlèvement des véhicules hors d''usage en Provence-Alpes-Côte d''Azur : nous venons chercher les véhicules sur place et les remettons à un centre VHU agréé partenaire, qui délivre le certificat de destruction. Pour un véhicule complet et accessible, l''enlèvement est gratuit. Pour un véhicule qui garde de la valeur, nous pouvons aussi étudier un rachat.

Seriez-vous intéressé par un échange rapide pour voir si nous pouvons vous faire gagner du temps ?

Bien cordialement,
L''équipe EcocarVHU
07 53 08 62 18 · www.ecocarvhu.fr'),
(2, 5, 'Re : Vos véhicules hors d''usage à {ville}',
'Bonjour{dirigeant},

Je reviens vers vous au sujet de mon précédent message. Si {entreprise} a des véhicules immobilisés, accidentés ou en fin de vie, nous pouvons organiser leur enlèvement à {ville} et alentours, avec les documents de cession en règle.

Un simple retour par e-mail ou au 07 53 08 62 18 suffit pour en parler.

Bien cordialement,
L''équipe EcocarVHU'),
(3, 12, 'Dernier message : enlèvement de véhicules à {ville}',
'Bonjour{dirigeant},

Je ne veux pas encombrer votre boîte de réception : ce sera mon dernier message. Si un jour vous avez un véhicule hors d''usage ou à vendre, vous pouvez nous joindre au 07 53 08 62 18 ou via www.ecocarvhu.fr.

Bonne continuation,
L''équipe EcocarVHU');

-- Liste des adresses qui ne veulent plus recevoir de prospection.
create table public.optouts (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table public.optouts enable row level security;
create policy "admin : désinscriptions" on public.optouts for all to authenticated
  using (private.app_role() = 'admin') with check (private.app_role() = 'admin');

-- Désinscription par le lien en bas des e-mails (sans compte).
create or replace function public.prospect_unsubscribe(token uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare p public.pros;
begin
  update public.pros set stage = 'desinscrit' where unsubscribe_token = token returning * into p;
  if not found then return null; end if;
  if p.email is not null then insert into public.optouts (email) values (lower(p.email)) on conflict do nothing; end if;
  update public.prospect_emails set status = 'annule' where pro_id = p.id and status in ('brouillon', 'planifie');
  return p.name;
end $$;
revoke all on function public.prospect_unsubscribe(uuid) from public, authenticated;
grant execute on function public.prospect_unsubscribe(uuid) to anon;

-- Envoi des relances programmées (tâche quotidienne, protégée par le jeton du site).
create or replace function public.prospect_due_emails(token text) returns table (
  id uuid, step int, subject text, body text, email text, name text, unsubscribe_token uuid
)
language plpgsql security definer set search_path = '' as $$
begin
  if token is null or token <> (select value from private.settings where key = 'ingest_token') then
    raise exception 'jeton invalide' using errcode = '42501';
  end if;
  return query
    select e.id, e.step, e.subject, e.body, p.email, p.name, p.unsubscribe_token
    from public.prospect_emails e join public.pros p on p.id = e.pro_id
    where e.status = 'planifie' and e.scheduled_at <= now()
      and p.stage in ('envoye', 'relance') and p.email is not null
      and not exists (select 1 from public.optouts o where o.email = lower(p.email))
    order by e.scheduled_at limit 100;
end $$;
revoke all on function public.prospect_due_emails(text) from public, authenticated;
grant execute on function public.prospect_due_emails(text) to anon;

create or replace function public.prospect_mark_sent(token text, email_id uuid, ok boolean, err text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if token is null or token <> (select value from private.settings where key = 'ingest_token') then
    raise exception 'jeton invalide' using errcode = '42501';
  end if;
  update public.prospect_emails set status = case when ok then 'envoye' else 'erreur' end,
    sent_at = case when ok then now() end, error = err
  where id = email_id;
  if ok then
    update public.pros set stage = 'relance', last_contact_at = now()
    where id = (select pro_id from public.prospect_emails where id = email_id) and stage = 'envoye';
  end if;
end $$;
revoke all on function public.prospect_mark_sent(text, uuid, boolean, text) from public, authenticated;
grant execute on function public.prospect_mark_sent(text, uuid, boolean, text) to anon;
