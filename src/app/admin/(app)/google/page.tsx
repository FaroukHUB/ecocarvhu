import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { currentTime } from "@/lib/admin/now";
import { publishedSectors, sectorPath } from "@/lib/publication";
import { GscError, gscClient, gscConfig, isoDay, normalize, periods, type GscRow } from "@/lib/visibilite/gsc";

export const metadata: Metadata = { title: "Positions Google" };

type SP = Record<string, string | string[] | undefined>;
const TABS = { villes: "🏙️ Villes", mots: "🔤 Mots-clés", pages: "📄 Pages", evolution: "📉 Évolution" } as const;
type Tab = keyof typeof TABS;

export default function GooglePage({ searchParams }: PageProps<"/admin/google">) {
  return (
    <>
      <PageTitle
        emoji="🔎"
        title="Positions Google"
        subtitle="Où on apparaît dans Google : sur quels mots, à quelle place, et combien de gens cliquent."
      />
      <Suspense fallback={<p className="text-muted">Chargement des chiffres Google…</p>}>
        <Content searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");
const pos = (n: number | undefined) => (n === undefined ? "—" : n.toFixed(1).replace(".", ","));
const path = (url: string) => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

/** En dessous de ce nombre d'affichages, une position moyenne n'est pas assez fiable pour comparer. */
const MIN_IMPRESSIONS = 20;
const reliable = (r?: GscRow) => (r?.impressions ?? 0) >= MIN_IMPRESSIONS;

/** Écart de position : négatif = le site remonte (position plus petite = mieux). */
function Delta({ now, before }: { now?: GscRow; before?: GscRow }) {
  if (!now) return null;
  if (!before) return <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-900">nouveau</span>;
  if (!reliable(now) || !reliable(before)) return null;
  const d = before.position - now.position;
  if (Math.abs(d) < 0.5) return <span className="text-muted">=</span>;
  return d > 0 ? (
    <span className="font-semibold text-emerald-700">▲ {pos(d)}</span>
  ) : (
    <span className="font-semibold text-red-700">▼ {pos(-d)}</span>
  );
}

async function Content({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  await requireUser("admin");
  const tab: Tab = typeof sp.onglet === "string" && sp.onglet in TABS ? (sp.onglet as Tab) : "villes";

  if (!gscConfig()) return <Setup />;

  const now = (await currentTime());
  const p = periods(now);
  type Data =
    | { kind: "evolution"; rows: GscRow[] }
    | { kind: "villes"; cur: GscRow[]; prev: GscRow[]; curQ: GscRow[]; prevQ: GscRow[] }
    | { kind: "table"; cur: GscRow[]; prev: GscRow[]; dim: "query" | "page" }
    | { kind: "error"; message: string };
  let data: Data;
  try {
    const query = await gscClient();
    if (!query) throw new GscError("Accès Google non configuré.");
    if (tab === "evolution") {
      data = { kind: "evolution", rows: await query({ startDate: isoDay(now, -3 - 89), endDate: isoDay(now, -3), dimensions: ["date"] }) };
    } else if (tab === "villes") {
      const [cur, prev, curQ, prevQ] = await Promise.all([
        query({ ...p.current, dimensions: ["page"] }),
        query({ ...p.previous, dimensions: ["page"] }),
        query({ ...p.current, dimensions: ["query"] }),
        query({ ...p.previous, dimensions: ["query"] }),
      ]);
      data = { kind: "villes", cur, prev, curQ, prevQ };
    } else {
      const dim = tab === "mots" ? "query" : "page";
      const [cur, prev] = await Promise.all([query({ ...p.current, dimensions: [dim] }), query({ ...p.previous, dimensions: [dim] })]);
      data = { kind: "table", cur, prev, dim };
    }
  } catch (e) {
    data = { kind: "error", message: e instanceof GscError ? e.message : "Impossible de lire les chiffres Google pour le moment." };
  }
  const body =
    data.kind === "evolution" ? (
      <Evolution rows={data.rows} />
    ) : data.kind === "villes" ? (
      <Villes pages={data.cur} pagesBefore={data.prev} queries={data.curQ} queriesBefore={data.prevQ} />
    ) : data.kind === "table" ? (
      <Table rows={data.cur} before={data.prev} dim={data.dim} />
    ) : (
      <p className="rounded-2xl bg-red-50 p-4 text-red-900">⚠️ {data.message}</p>
    );

  return (
    <>
      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-2">
        {(Object.keys(TABS) as Tab[]).map((k) => (
          <Link
            key={k}
            href={`/admin/google?onglet=${k}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${tab === k ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
          >
            {TABS[k]}
          </Link>
        ))}
      </div>
      <p className="mb-5 text-sm text-muted">
        {tab === "evolution"
          ? "90 derniers jours."
          : `Période : 28 jours, du ${p.current.startDate.split("-").reverse().join("/")} au ${p.current.endDate.split("-").reverse().join("/")}, comparés aux 28 jours d'avant.`}{" "}
        Les chiffres de Google ont environ 3 jours de décalage. La position est une moyenne : 1 = tout en haut, 10 = bas de la première page.
      </p>
      {body}
    </>
  );
}

function Villes({ pages, pagesBefore, queries, queriesBefore }: { pages: GscRow[]; pagesBefore: GscRow[]; queries: GscRow[]; queriesBefore: GscRow[] }) {
  const byPath = (rows: GscRow[]) => new Map(rows.map((r) => [path(r.keys[0]).replace(/\/$/, ""), r]));
  const pNow = byPath(pages);
  const pBefore = byPath(pagesBefore);
  const qNow = new Map(queries.map((r) => [normalize(r.keys[0]), r]));
  const qBefore = new Map(queriesBefore.map((r) => [normalize(r.keys[0]), r]));
  const cities = publishedSectors().filter((s) => s.kind === "city");
  const rows = cities
    .map((s) => {
      const key = normalize(`épaviste ${s.name}`);
      return {
        s,
        page: pNow.get(sectorPath(s)),
        pageBefore: pBefore.get(sectorPath(s)),
        epav: qNow.get(key),
        epavBefore: qBefore.get(key),
      };
    })
    .sort((a, b) => (b.page?.impressions ?? 0) - (a.page?.impressions ?? 0));

  const verdict = (r: (typeof rows)[number]) => {
    if (!r.page) return { label: "Pas encore vue par Google", tone: "bg-stone-100 text-stone-700" };
    const comparable = reliable(r.page) && reliable(r.pageBefore);
    if (comparable && r.pageBefore!.position - r.page.position >= 1) return { label: "🚀 Progresse", tone: "bg-emerald-100 text-emerald-900" };
    if (comparable && r.page.position - r.pageBefore!.position >= 1) return { label: "⚠️ Recule", tone: "bg-red-100 text-red-900" };
    if (r.page.position > 10) return { label: "🎯 À optimiser", tone: "bg-amber-100 text-amber-950" };
    return { label: "✅ Première page", tone: "bg-emerald-50 text-emerald-900" };
  };

  return (
    <Card>
      <p className="mb-4 text-sm text-muted">
        Une ligne par page ville en ligne. « À optimiser » : la page apparaît dans Google, mais en moyenne après la 10ᵉ position (au-delà de la première page).
        « Progresse » et « Recule », comme les flèches, ne s&apos;affichent qu&apos;à partir de {MIN_IMPRESSIONS} affichages sur chacune des deux périodes : en dessous, la
        moyenne n&apos;est pas fiable.
      </p>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr>
              <th className="px-2 py-2">Ville</th>
              <th className="px-2 py-2">« épaviste + ville »</th>
              <th className="px-2 py-2">Position de la page</th>
              <th className="px-2 py-2 text-right">Affichages</th>
              <th className="px-2 py-2 text-right">Clics</th>
              <th className="px-2 py-2">Bilan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => {
              const v = verdict(r);
              return (
                <tr key={r.s.slug}>
                  <td className="px-2 py-2.5 font-semibold">
                    <a href={sectorPath(r.s)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {r.s.name}
                    </a>
                  </td>
                  <td className="px-2 py-2.5 tabular-nums">
                    {pos(r.epav?.position)} <Delta now={r.epav} before={r.epavBefore} />
                  </td>
                  <td className="px-2 py-2.5 tabular-nums">
                    {pos(r.page?.position)} <Delta now={r.page} before={r.pageBefore} />
                  </td>
                  <td className="px-2 py-2.5 text-right tabular-nums">{fmt(r.page?.impressions ?? 0)}</td>
                  <td className="px-2 py-2.5 text-right tabular-nums">{fmt(r.page?.clicks ?? 0)}</td>
                  <td className="px-2 py-2.5">
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${v.tone}`}>{v.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Table({ rows, before, dim }: { rows: GscRow[]; before: GscRow[]; dim: "query" | "page" }) {
  const prev = new Map(before.map((r) => [r.keys[0], r]));
  const top = [...rows].sort((a, b) => b.impressions - a.impressions).slice(0, 150);
  if (!top.length) return <p className="rounded-3xl bg-white p-8 text-center text-muted">Pas encore de données sur cette période.</p>;
  return (
    <Card>
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr>
              <th className="px-2 py-2">{dim === "query" ? "Recherche tapée dans Google" : "Page"}</th>
              <th className="px-2 py-2">Position</th>
              <th className="px-2 py-2 text-right">Affichages</th>
              <th className="px-2 py-2 text-right">Clics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {top.map((r) => (
              <tr key={r.keys[0]}>
                <td className="max-w-[22rem] truncate px-2 py-2.5 font-medium">{dim === "page" ? path(r.keys[0]) : r.keys[0]}</td>
                <td className="whitespace-nowrap px-2 py-2.5 tabular-nums">
                  {pos(r.position)} <Delta now={r} before={prev.get(r.keys[0])} />
                </td>
                <td className="px-2 py-2.5 text-right tabular-nums">{fmt(r.impressions)}</td>
                <td className="px-2 py-2.5 text-right tabular-nums">{fmt(r.clicks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Evolution({ rows }: { rows: GscRow[] }) {
  if (!rows.length) return <p className="rounded-3xl bg-white p-8 text-center text-muted">Pas encore de données.</p>;
  const sorted = [...rows].sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
  const maxImp = Math.max(...sorted.map((r) => r.impressions), 1);
  const maxClicks = Math.max(...sorted.map((r) => r.clicks), 1);
  const W = 900;
  const H = 180;
  const step = W / sorted.length;
  const line = (val: (r: GscRow) => number, max: number) =>
    sorted.map((r, i) => `${i ? "L" : "M"}${(i + 0.5) * step},${H - (val(r) / max) * (H - 10)}`).join(" ");
  const total = (k: "clicks" | "impressions") => sorted.reduce((s, r) => s + r[k], 0);
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Affichages dans Google</p>
          <p className="text-3xl font-bold">{fmt(total("impressions"))}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Clics vers le site</p>
          <p className="text-3xl font-bold">{fmt(total("clicks"))}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Position moyenne (dernier jour)</p>
          <p className="text-3xl font-bold">{pos(sorted.at(-1)?.position)}</p>
        </Card>
      </div>
      {[
        { title: "Affichages par jour", val: (r: GscRow) => r.impressions, max: maxImp, color: "#16a34a" },
        { title: "Clics par jour", val: (r: GscRow) => r.clicks, max: maxClicks, color: "#0f172a" },
      ].map((c) => (
        <Card key={c.title} title={c.title}>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-44 w-full" preserveAspectRatio="none" role="img" aria-label={c.title}>
            <line x1="0" y1={H} x2={W} y2={H} stroke="#e5e7eb" />
            <path d={line(c.val, c.max)} fill="none" stroke={c.color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>{sorted[0].keys[0].split("-").reverse().join("/")}</span>
            <span>max {fmt(c.max)} / jour</span>
            <span>{sorted.at(-1)!.keys[0].split("-").reverse().join("/")}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Setup() {
  return (
    <Card title="Bientôt ici" emoji="🔌">
      <p className="text-muted">Les positions Google ne sont pas encore reliées. Elles s&apos;afficheront ici dès que ce sera fait.</p>
    </Card>
  );
}
