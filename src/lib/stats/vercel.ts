/**
 * Lecture des statistiques Vercel Web Analytics (API REST de Vercel).
 *
 * Le jeton VERCEL_ANALYTICS_TOKEN reste côté serveur. Les identifiants du
 * projet et de l'équipe ne sont pas secrets : ils peuvent être surchargés par
 * VERCEL_ANALYTICS_PROJECT_ID / VERCEL_ANALYTICS_TEAM_ID.
 */

const API = "https://api.vercel.com/v1/query/web-analytics";
const PROJECT_ID = process.env.VERCEL_ANALYTICS_PROJECT_ID || "prj_14XRnbEI85I09bOFMT2yTPfekstu";
const TEAM_ID = process.env.VERCEL_ANALYTICS_TEAM_ID || "team_oQGaJN5HD6KuAQ0JvOwqVgTl";

export type Row = Record<string, string | number | null | undefined>;

export class StatsError extends Error {}

export function statsConfigured(): boolean {
  return Boolean(process.env.VERCEL_ANALYTICS_TOKEN);
}

async function query(path: string, params: { since: Date; until: Date; by?: string[]; filter?: string; limit?: number }) {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  if (!token) throw new StatsError("VERCEL_ANALYTICS_TOKEN n'est pas défini.");
  const qs = new URLSearchParams({
    projectId: PROJECT_ID,
    teamId: TEAM_ID,
    since: params.since.toISOString(),
    until: params.until.toISOString(),
  });
  for (const b of params.by ?? []) qs.append("by", b);
  if (params.filter) qs.set("filter", params.filter);
  if (params.limit) qs.set("limit", String(params.limit));
  const res = await fetch(`${API}/${path}?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new StatsError(`API Vercel ${res.status} sur ${path} ${detail.slice(0, 200)}`);
  }
  return (await res.json()) as { data: unknown };
}

/** Valeur d'une ligne : pages vues pour les visites, nombre pour les événements. */
export function amount(r: Row): number {
  return Number(r.pageviews ?? r.count ?? r.total ?? 0) || 0;
}

export function visitors(r: Row): number {
  return Number(r.visitors ?? 0) || 0;
}

export async function visitsCount(since: Date, until: Date): Promise<{ pageviews: number; visitors: number }> {
  const { data } = await query("visits/count", { since, until });
  const d = (data ?? {}) as Row;
  return { pageviews: amount(d), visitors: visitors(d) };
}

export async function visitsBy(since: Date, until: Date, by: string[], limit = 10): Promise<Row[]> {
  const { data } = await query("visits/aggregate", { since, until, by, limit });
  return Array.isArray(data) ? (data as Row[]) : [];
}

export async function eventsBy(since: Date, until: Date, by: string[], limit = 10, filter?: string): Promise<Row[]> {
  const { data } = await query("events/aggregate", { since, until, by, limit, filter });
  return Array.isArray(data) ? (data as Row[]) : [];
}
