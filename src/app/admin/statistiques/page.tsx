import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { posts } from "@/content/blog";
import { pages } from "@/content/pages";
import { sectors } from "@/content/sectors/data";
import { Container } from "@/components/ui/primitives";
import { amount, eventsBy, statsConfigured, StatsError, visitors, visitsBy, visitsCount, type Row } from "@/lib/stats/vercel";

/**
 * Tableau de bord privé (protégé par ADMIN_BASIC_AUTH dans le proxy).
 * Données : Vercel Web Analytics, production uniquement, lues à chaque visite.
 */
export const metadata: Metadata = {
  title: { absolute: "Statistiques — EcocarVHU" },
  robots: { index: false, follow: false },
};

const PERIODS = [7, 30, 90] as const;
const CONTACT_EVENTS = ["call_click", "whatsapp_click", "form_submit_accepted"];
const FORM_EVENTS = ["form_start", "form_submit_accepted", "form_submit_error"];

const PLACEMENTS: Record<string, string> = {
  header: "En-tête",
  "floating-button": "Bouton flottant (mobile)",
  hero: "Accueil, haut de page",
  "page-hero": "Haut des pages",
  "home-faq": "Accueil, FAQ",
  "home-bottom": "Accueil, bas de page",
  footer: "Pied de page",
  contact: "Page contact",
  "result-page": "Après envoi d'un formulaire",
  "404": "Page introuvable",
  blog: "Blog",
  zones: "Page des zones",
  rachat: "Page rachat",
  pros: "Page professionnels",
  pieces: "Page pièces",
  "pieces-bientot": "Page pièces",
  "centre-vhu": "Page centre VHU",
  "enlevement-mid": "Page enlèvement",
};

const FORMS: Record<string, string> = {
  enlevement: "Enlèvement d'épave",
  rachat: "Rachat de véhicule",
  piece: "Pièce auto",
  pro: "Professionnels",
  contact: "Contact",
};

export default function StatsPage({ searchParams }: PageProps<"/admin/statistiques">) {
  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Statistiques du site</h1>
      <p className="mt-2 text-muted">
        Vercel Web Analytics, site en production. Un clic sur le numéro n&apos;est pas forcément un appel abouti.
      </p>
      <Suspense fallback={<p className="mt-10 text-muted">Chargement des statistiques…</p>}>
        <Dashboard searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function Dashboard({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const p = Number((await searchParams).p);
  const days = (PERIODS as readonly number[]).includes(p) ? p : 30;

  const periodNav = (
    <nav aria-label="Période" className="mt-6 flex flex-wrap gap-2">
      {PERIODS.map((d) => (
        <Link
          key={d}
          href={`?p=${d}`}
          aria-current={d === days ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
            d === days ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
          }`}
        >
          {d} derniers jours
        </Link>
      ))}
    </nav>
  );

  if (!statsConfigured()) {
    return (
      <>
        {periodNav}
        <Message>
          Configuration à terminer : ajoutez la variable <code>VERCEL_ANALYTICS_TOKEN</code> (jeton d&apos;accès Vercel)
          dans les variables d&apos;environnement du projet, puis redéployez.
        </Message>
      </>
    );
  }

  const until = new Date();
  const since = new Date(until.getTime() - days * 86_400_000);

  let data;
  try {
    const [total, visitsDay, visitsPage, referrers, devices, eventsTotal, contactsDay, eventsPage, eventsPlacement, eventsForm] =
      await Promise.all([
        visitsCount(since, until),
        visitsBy(since, until, ["day"], 100),
        visitsBy(since, until, ["requestPath"], 100),
        visitsBy(since, until, ["referrerHostname"], 8),
        visitsBy(since, until, ["deviceType"], 5),
        eventsBy(since, until, ["eventName"], 20),
        eventsBy(since, until, ["day"], 100, `eventName in (${CONTACT_EVENTS.map((e) => `'${e}'`).join(",")})`),
        eventsBy(since, until, ["eventName", "eventData/page"], 100),
        eventsBy(since, until, ["eventName", "eventData/placement"], 50),
        eventsBy(since, until, ["eventName", "eventData/form"], 50),
      ]);
    data = { total, visitsDay, visitsPage, referrers, devices, eventsTotal, contactsDay, eventsPage, eventsPlacement, eventsForm };
  } catch (e) {
    return (
      <>
        {periodNav}
        <Message>
          Les statistiques n&apos;ont pas pu être chargées. {e instanceof StatsError ? e.message : "Erreur inattendue."}
        </Message>
      </>
    );
  }

  const { total, visitsDay, visitsPage, referrers, devices, eventsTotal, contactsDay, eventsPage, eventsPlacement, eventsForm } = data;

  const sumEvents = (rows: Row[], names: string[]) =>
    rows.filter((r) => names.includes(String(r.eventName))).reduce((s, r) => s + amount(r), 0);
  const calls = sumEvents(eventsTotal, ["call_click", "whatsapp_click"]);
  const requests = sumEvents(eventsTotal, ["form_submit_accepted"]);
  const contacts = calls + requests;

  // Séries par jour (jours sans donnée = 0).
  const dayKeys = Array.from({ length: days }, (_, i) =>
    new Date(since.getTime() + (i + 1) * 86_400_000).toISOString().slice(0, 10),
  );
  const visitorsByDay = new Map(visitsDay.map((r) => [String(r.timestamp ?? "").slice(0, 10), visitors(r)]));
  const contactsByDay = new Map(contactsDay.map((r) => [String(r.timestamp ?? "").slice(0, 10), amount(r)]));

  // Pages : visiteurs et contacts.
  const byPage = new Map<string, { visitors: number; calls: number; requests: number }>();
  const entry = (path: string) => {
    const key = normalizePath(path);
    if (!byPage.has(key)) byPage.set(key, { visitors: 0, calls: 0, requests: 0 });
    return byPage.get(key)!;
  };
  for (const r of visitsPage) if (r.requestPath && !String(r.requestPath).startsWith("/admin")) entry(String(r.requestPath)).visitors += visitors(r);
  for (const r of eventsPage) {
    const path = dim(r, "eventData/page");
    if (!path || path.startsWith("/admin")) continue;
    if (r.eventName === "form_submit_accepted") entry(path).requests += amount(r);
    else if (r.eventName === "call_click" || r.eventName === "whatsapp_click") entry(path).calls += amount(r);
  }
  const pageRows = [...byPage.entries()]
    .map(([path, v]) => ({ path, ...v, contacts: v.calls + v.requests }))
    .sort((a, b) => b.contacts - a.contacts || b.visitors - a.visitors);
  const zoneRows = pageRows.filter((r) => r.path.startsWith("/zones-intervention/")).slice(0, 12);

  const placementRows = groupSum(
    eventsPlacement.filter((r) => r.eventName === "call_click" || r.eventName === "whatsapp_click"),
    (r) => placementLabel(dim(r, "eventData/placement")),
  );

  const formRows = Object.entries(
    eventsForm
      .filter((r) => FORM_EVENTS.includes(String(r.eventName)))
      .reduce<Record<string, { start: number; sent: number; error: number }>>((acc, r) => {
        const f = dim(r, "eventData/form") || "inconnu";
        acc[f] ??= { start: 0, sent: 0, error: 0 };
        if (r.eventName === "form_start") acc[f].start += amount(r);
        else if (r.eventName === "form_submit_accepted") acc[f].sent += amount(r);
        else acc[f].error += amount(r);
        return acc;
      }, {}),
  ).sort((a, b) => b[1].sent - a[1].sent || b[1].start - a[1].start);

  const referrerRows = groupSum(referrers, (r) => (r.referrerHostname ? String(r.referrerHostname) : "Accès direct"), visitors);
  const deviceRows = groupSum(devices, (r) => deviceLabel(String(r.deviceType ?? "")), visitors);

  return (
    <>
      {periodNav}

      <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Tile label="Visiteurs" value={fmt(total.visitors)} />
        <Tile label="Pages vues" value={fmt(total.pageviews)} />
        <Tile label="Clics sur le numéro" value={fmt(calls)} />
        <Tile label="Demandes envoyées" value={fmt(requests)} />
        <Tile
          label="Taux de contact"
          value={total.visitors ? pct(contacts / total.visitors) : "—"}
          hint="clics numéro + demandes, rapportés aux visiteurs"
        />
      </dl>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Visiteurs par jour">
          <DayBars keys={dayKeys} values={dayKeys.map((k) => visitorsByDay.get(k) ?? 0)} unit="visiteur" />
        </Panel>
        <Panel title="Contacts par jour" note="clics sur le numéro et demandes envoyées">
          <DayBars keys={dayKeys} values={dayKeys.map((k) => contactsByDay.get(k) ?? 0)} unit="contact" />
        </Panel>
      </div>

      <Panel className="mt-4" title="Pages qui amènent des contacts" note="triées par nombre de contacts">
        <PageTable rows={pageRows.slice(0, 15)} />
      </Panel>

      <Panel className="mt-4" title="Zones d'intervention" note="les pages ville, pour suivre le référencement local">
        <PageTable rows={zoneRows} empty="Aucune visite sur les pages ville pour cette période." />
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="D'où viennent les visiteurs">
          <BarList rows={referrerRows} unit="visiteurs" />
        </Panel>
        <Panel title="Appareils">
          <BarList rows={deviceRows} unit="visiteurs" share />
        </Panel>
        <Panel title="Boutons d'appel utilisés">
          <BarList rows={placementRows} unit="clics" />
        </Panel>
      </div>

      <Panel className="mt-4" title="Formulaires" note="commencés, envoyés et en erreur, par type de demande">
        {formRows.length ? (
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2 font-medium">Formulaire</th>
                <th className="py-2 text-right font-medium">Commencés</th>
                <th className="py-2 text-right font-medium">Envoyés</th>
                <th className="py-2 text-right font-medium">Erreurs</th>
                <th className="py-2 text-right font-medium">Finalisation</th>
              </tr>
            </thead>
            <tbody>
              {formRows.map(([f, v]) => (
                <tr key={f} className="border-t border-line">
                  <td className="py-2">{FORMS[f] ?? f}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(v.start)}</td>
                  <td className="py-2 text-right tabular-nums font-semibold">{fmt(v.sent)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt(v.error)}</td>
                  <td className="py-2 text-right tabular-nums">{v.start ? pct(v.sent / v.start) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-muted">Aucun formulaire commencé pour cette période.</p>
        )}
      </Panel>
    </>
  );
}

/* ---------------------------------------------------------------- outils */

function dim(r: Row, name: string): string {
  const v = r[name] ?? (name.startsWith("eventData/") ? r.eventData : undefined);
  return v == null ? "" : String(v);
}

function groupSum(rows: Row[], label: (r: Row) => string, value: (r: Row) => number = amount) {
  const m = new Map<string, number>();
  for (const r of rows) m.set(label(r), (m.get(label(r)) ?? 0) + value(r));
  return [...m.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function normalizePath(path: string): string {
  const p = path.split("?")[0].replace(/\/$/, "");
  return p || "/";
}

function pageLabel(path: string): string {
  const page = Object.values(pages).find((pg) => pg.path === path);
  if (page) return page.label;
  let m = path.match(/^\/zones-intervention\/([^/]+)$/);
  if (m) return sectors.find((s) => s.slug === m![1])?.name ?? path;
  m = path.match(/^\/blog\/([^/]+)$/);
  if (m) return posts.find((p) => p.slug === m![1])?.title ?? path;
  return path;
}

function placementLabel(p: string): string {
  if (!p) return "Inconnu";
  if (PLACEMENTS[p]) return PLACEMENTS[p];
  if (p.startsWith("secteur-")) return "Bandeau d'une page ville";
  if (p.startsWith("blog-aside-")) return "Blog, colonne latérale";
  if (p.startsWith("blog-")) return "Blog, fin d'article";
  return p;
}

function deviceLabel(d: string): string {
  return { mobile: "Mobile", desktop: "Ordinateur", tablet: "Tablette" }[d.toLowerCase()] ?? (d || "Inconnu");
}

const fmt = (n: number) => n.toLocaleString("fr-FR");
const pct = (x: number) => `${(x * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;

/* ------------------------------------------------------------ composants */

function Message({ children }: { children: React.ReactNode }) {
  return <p className="mt-8 rounded-2xl border border-line bg-surface p-5 text-ink-3">{children}</p>;
}

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-3xl font-bold tabular-nums tracking-tight">{value}</dd>
      {hint ? <dd className="mt-1 text-xs text-muted">{hint}</dd> : null}
    </div>
  );
}

function Panel({ title, note, className = "", children }: { title: string; note?: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-5 sm:p-6 ${className}`}>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      {note ? <p className="text-sm text-muted">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Barres verticales par jour ; survol : date et valeur (infobulle native). */
function DayBars({ keys, values, unit }: { keys: string[]; values: number[]; unit: string }) {
  const max = Math.max(1, ...values);
  const W = 600;
  const H = 160;
  const slot = W / keys.length;
  const bar = Math.max(2, slot - 2);
  const day = (k: string) => new Date(`${k}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full" role="img" aria-label={`${unit}s par jour`}>
        <line x1="0" x2={W} y1={H} y2={H} className="stroke-line" strokeWidth="1" />
        <text x="0" y="10" className="fill-muted text-[11px]">
          max {fmt(max)}
        </text>
        {values.map((v, i) => {
          const h = v ? Math.max(2, (v / max) * (H - 18)) : 0;
          return (
            <g key={keys[i]}>
              <rect x={i * slot} y={0} width={slot} height={H} fill="transparent">
                <title>{`${day(keys[i])} : ${fmt(v)} ${unit}${v > 1 ? "s" : ""}`}</title>
              </rect>
              {h ? (
                <rect x={i * slot + (slot - bar) / 2} y={H - h} width={bar} height={h} rx={Math.min(2, bar / 2)} className="pointer-events-none fill-brand" />
              ) : null}
            </g>
          );
        })}
        <text x="0" y={H + 16} className="fill-muted text-[11px]">
          {day(keys[0])}
        </text>
        <text x={W} y={H + 16} textAnchor="end" className="fill-muted text-[11px]">
          {day(keys[keys.length - 1])}
        </text>
      </svg>
      <figcaption className="sr-only">
        {keys.map((k, i) => `${day(k)} : ${values[i]}`).join(" ; ")}
      </figcaption>
    </figure>
  );
}

function BarList({ rows, unit, share = false }: { rows: { label: string; value: number }[]; unit: string; share?: boolean }) {
  if (!rows.length) return <p className="text-sm text-muted">Aucune donnée pour cette période.</p>;
  const max = Math.max(1, ...rows.map((r) => r.value));
  const sum = rows.reduce((s, r) => s + r.value, 0) || 1;
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex justify-between gap-3 text-sm">
            <span className="truncate">{r.label}</span>
            <span className="shrink-0 tabular-nums text-ink-3" title={`${fmt(r.value)} ${unit}`}>
              {share ? pct(r.value / sum) : fmt(r.value)}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-surface">
            <div className="h-1.5 rounded-full bg-brand" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function PageTable({
  rows,
  empty = "Aucune visite pour cette période.",
}: {
  rows: { path: string; visitors: number; calls: number; requests: number; contacts: number }[];
  empty?: string;
}) {
  if (!rows.length) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="text-muted">
          <tr>
            <th className="px-1 py-2 font-medium">Page</th>
            <th className="px-1 py-2 text-right font-medium">Visiteurs</th>
            <th className="px-1 py-2 text-right font-medium">Clics numéro</th>
            <th className="px-1 py-2 text-right font-medium">Demandes</th>
            <th className="px-1 py-2 text-right font-medium">Taux de contact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.path} className="border-t border-line">
              <td className="max-w-[16rem] truncate px-1 py-2" title={r.path}>
                {pageLabel(r.path)}
              </td>
              <td className="px-1 py-2 text-right tabular-nums">{fmt(r.visitors)}</td>
              <td className="px-1 py-2 text-right tabular-nums">{fmt(r.calls)}</td>
              <td className="px-1 py-2 text-right tabular-nums">{fmt(r.requests)}</td>
              <td className="px-1 py-2 text-right tabular-nums font-semibold">
                {r.visitors ? pct(r.contacts / r.visitors) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
