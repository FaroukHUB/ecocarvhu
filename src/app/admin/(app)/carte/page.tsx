import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DEPARTMENT_SHAPES, PACA_VIEWBOX, project } from "@/content/paca-map";
import { sectors } from "@/content/sectors/data";
import { CITY_COORDS } from "@/content/sectors/coords";
import { Card, PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { currentTime } from "@/lib/admin/now";
import { isSectorPublished, sectorPath } from "@/lib/publication";

export const metadata: Metadata = { title: "Carte des enlèvements" };

type SP = Record<string, string | string[] | undefined>;
const PERIODES = { "3m": { label: "3 derniers mois", days: 92 }, "12m": { label: "12 derniers mois", days: 366 }, tout: { label: "Depuis le début", days: 0 } } as const;
const QUOI = { demandes: "Toutes les demandes", enlevements: "Enlèvements faits" } as const;
const DONE = new Set(["enlevee", "terminee"]);
const DEPS: Record<string, string> = { "04": "Alpes-de-Haute-Provence", "05": "Hautes-Alpes", "06": "Alpes-Maritimes", "13": "Bouches-du-Rhône", "83": "Var", "84": "Vaucluse" };

export default function CartePage({ searchParams }: PageProps<"/admin/carte">) {
  return (
    <>
      <PageTitle emoji="🗺️" title="Carte des enlèvements" subtitle="D'où viennent les clients, pour savoir où mettre le paquet en pub et en pages ville." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Content searchParams={searchParams} />
      </Suspense>
    </>
  );
}

interface Spot {
  key: string;
  name: string;
  dep: string | null;
  count: number;
  slug: string | null;
  published: boolean;
}

async function Content({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const periode = typeof sp.periode === "string" && sp.periode in PERIODES ? (sp.periode as keyof typeof PERIODES) : "12m";
  const quoi = typeof sp.quoi === "string" && sp.quoi in QUOI ? (sp.quoi as keyof typeof QUOI) : "demandes";
  const { supabase } = await requireUser("admin");
  let q = supabase.from("demandes").select("postal_code, city, status, created_at").limit(5000);
  const days = PERIODES[periode].days;
  if (days) q = q.gte("created_at", new Date((await currentTime()) - days * 86400_000).toISOString());
  const { data } = await q;
  const rows = (data ?? []).filter((d) => quoi === "demandes" || DONE.has(d.status as string));

  const byPostal = new Map<string, (typeof sectors)[number]>();
  for (const s of sectors) if (s.kind === "city") for (const pc of s.postalCodes) byPostal.set(pc, s);
  const spots = new Map<string, Spot>();
  const deps = new Map<string, number>();
  let unknown = 0;
  let outside = 0;
  for (const d of rows) {
    const pc = String(d.postal_code ?? "").replace(/\s/g, "");
    if (!/^\d{5}$/.test(pc)) {
      unknown++;
      continue;
    }
    const dep = pc.slice(0, 2);
    if (!DEPS[dep]) {
      outside++;
      continue;
    }
    deps.set(dep, (deps.get(dep) ?? 0) + 1);
    const s = byPostal.get(pc);
    const key = s ? s.slug : `${pc}`;
    const spot = spots.get(key) ?? {
      key,
      name: s ? s.name : `${String(d.city ?? "").trim() || "Ville inconnue"} (${pc})`,
      dep,
      count: 0,
      slug: s?.slug ?? null,
      published: s ? isSectorPublished(s.status) : false,
    };
    spot.count++;
    spots.set(key, spot);
  }
  const list = [...spots.values()].sort((a, b) => b.count - a.count);
  const maxDep = Math.max(...deps.values(), 1);
  const maxSpot = Math.max(...list.map((s) => s.count), 1);
  const total = rows.length;
  const sansPage = list.filter((s) => !s.published && s.count >= 2);

  const chip = (href: string, label: string, on: boolean) => (
    <Link key={href} href={href} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${on ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}>
      {label}
    </Link>
  );

  return (
    <>
      <div className="-mx-1 flex flex-wrap gap-2 px-1 pb-2">
        {(Object.keys(QUOI) as (keyof typeof QUOI)[]).map((k) => chip(`/admin/carte?quoi=${k}&periode=${periode}`, QUOI[k], quoi === k))}
        <span className="mx-1 hidden w-px bg-line sm:block" />
        {(Object.keys(PERIODES) as (keyof typeof PERIODES)[]).map((k) => chip(`/admin/carte?quoi=${quoi}&periode=${k}`, PERIODES[k].label, periode === k))}
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <svg viewBox={`0 0 ${PACA_VIEWBOX.width} ${PACA_VIEWBOX.height}`} className="w-full" role="img" aria-label="Carte des demandes par département et par ville">
            {DEPARTMENT_SHAPES.map((dep) => {
              const n = deps.get(dep.code) ?? 0;
              return (
                <g key={dep.code}>
                  <title>{`${DEPS[dep.code]} : ${n}`}</title>
                  <path d={dep.d} fill="#16a34a" fillOpacity={0.06 + 0.5 * (n / maxDep)} stroke="#15803d" strokeOpacity="0.5" strokeWidth="2" strokeLinejoin="round" />
                  <text x={dep.label[0]} y={dep.label[1]} textAnchor="middle" fill="#14532d" fillOpacity="0.35" fontSize="64" fontWeight="800">
                    {dep.code}
                  </text>
                </g>
              );
            })}
            {list.map((s) => {
              const c = s.slug ? CITY_COORDS[s.slug] : undefined;
              if (!c) return null;
              const [x, y] = project(c[0], c[1]);
              const r = 8 + 32 * Math.sqrt(s.count / maxSpot);
              return (
                <g key={s.key}>
                  <title>{`${s.name} : ${s.count}`}</title>
                  <circle cx={x} cy={y} r={r} fill="#f59e0b" fillOpacity="0.55" stroke="#b45309" strokeWidth="2" />
                  {r > 18 ? (
                    <text x={x} y={y + 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#451a03">
                      {s.count}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-muted">
            Plus le département est foncé, plus il y a de {quoi === "demandes" ? "demandes" : "enlèvements"}. Les ronds orange montrent les villes qui ont une page sur
            le site ; les autres villes sont dans la liste.
          </p>
        </Card>

        <div className="space-y-5">
          <Card title={`${total} ${quoi === "demandes" ? "demande" : "enlèvement"}${total > 1 ? "s" : ""}`} emoji="📍">
            <ul className="space-y-1.5 text-sm">
              {Object.entries(DEPS)
                .sort((a, b) => (deps.get(b[0]) ?? 0) - (deps.get(a[0]) ?? 0))
                .map(([code, name]) => (
                  <li key={code} className="flex justify-between gap-3">
                    <span>
                      {name} ({code})
                    </span>
                    <span className="font-semibold tabular-nums">{deps.get(code) ?? 0}</span>
                  </li>
                ))}
              {outside ? (
                <li className="flex justify-between gap-3 text-muted">
                  <span>Hors région</span>
                  <span className="tabular-nums">{outside}</span>
                </li>
              ) : null}
              {unknown ? (
                <li className="flex justify-between gap-3 text-muted">
                  <span>Sans code postal</span>
                  <span className="tabular-nums">{unknown}</span>
                </li>
              ) : null}
            </ul>
          </Card>
          {sansPage.length ? (
            <Card title="Villes demandées sans page publiée" emoji="💡">
              <p className="mb-2 text-sm text-muted">Au moins 2 {quoi === "demandes" ? "demandes" : "enlèvements"} sur la période, mais pas de page ville en ligne.</p>
              <ul className="space-y-1 text-sm">
                {sansPage.map((s) => (
                  <li key={s.key} className="flex justify-between gap-3">
                    <span>{s.name}</span>
                    <span className="font-semibold tabular-nums">{s.count}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </div>

      <Card title="Classement des villes" emoji="🏆" className="mt-5">
        {list.length ? (
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="text-xs uppercase text-muted">
                <tr>
                  <th className="px-2 py-2">Ville</th>
                  <th className="px-2 py-2">Département</th>
                  <th className="px-2 py-2 text-right">{quoi === "demandes" ? "Demandes" : "Enlèvements"}</th>
                  <th className="px-2 py-2">Page sur le site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {list.map((s) => (
                  <tr key={s.key}>
                    <td className="px-2 py-2.5 font-semibold">{s.name}</td>
                    <td className="px-2 py-2.5">{s.dep}</td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{s.count}</td>
                    <td className="px-2 py-2.5">
                      {s.published && s.slug ? (
                        <a href={sectorPath({ slug: s.slug } as (typeof sectors)[number])} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                          ✅ En ligne
                        </a>
                      ) : s.slug ? (
                        <span className="text-amber-800">📝 Préparée, pas encore publiée</span>
                      ) : (
                        <span className="text-muted">Aucune</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">Aucune donnée sur cette période.</p>
        )}
      </Card>
    </>
  );
}
