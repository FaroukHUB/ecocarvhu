import { createSign } from "node:crypto";

/**
 * Google Search Console (API officielle, gratuite, lecture seule).
 * Accès par un « compte de service » Google Cloud ajouté comme utilisateur
 * de la propriété Search Console.
 * - GSC_SERVICE_ACCOUNT : contenu du fichier JSON de la clé (brut ou en base64).
 * - GSC_SITE : propriété Search Console, par défaut « sc-domain:ecocarvhu.fr ».
 */

type EnvSource = Record<string, string | undefined>;

interface ServiceAccount {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

export function gscConfig(env: EnvSource = process.env): { account: ServiceAccount; site: string } | null {
  const raw = env.GSC_SERVICE_ACCOUNT?.trim();
  if (!raw) return null;
  try {
    const text = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const account = JSON.parse(text) as ServiceAccount;
    if (!account.client_email || !account.private_key) return null;
    return { account, site: env.GSC_SITE?.trim() || "sc-domain:ecocarvhu.fr" };
  } catch {
    return null;
  }
}

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

/** Jeton signé (RS256) échangé contre un jeton d'accès Google. */
export function signedAssertion(account: ServiceAccount, now = Math.floor(Date.now() / 1000)): string {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: account.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: account.token_uri ?? "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  return `${header}.${claims}.${b64url(signer.sign(account.private_key.replace(/\\n/g, "\n")))}`;
}

export class GscError extends Error {}

async function accessToken(account: ServiceAccount): Promise<string> {
  const res = await fetch(account.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: signedAssertion(account) }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new GscError(`Connexion à Google refusée (${res.status}). Vérifiez la clé du compte de service.`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscQuery {
  startDate: string;
  endDate: string;
  dimensions: ("query" | "page" | "date" | "device")[];
  rowLimit?: number;
}

/** Interroge Search Console. Plusieurs requêtes partagent un même jeton. */
export async function gscClient() {
  const config = gscConfig();
  if (!config) return null;
  const token = await accessToken(config.account);
  return async (q: GscQuery): Promise<GscRow[]> => {
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.site)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ ...q, rowLimit: q.rowLimit ?? 1000, dataState: "final" }),
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      },
    );
    if (res.status === 403) {
      throw new GscError(`Google refuse l'accès à la propriété « ${config.site} ». Ajoutez l'e-mail du compte de service comme utilisateur dans Search Console.`);
    }
    if (!res.ok) throw new GscError(`Search Console ne répond pas (${res.status}).`);
    return ((await res.json()) as { rows?: GscRow[] }).rows ?? [];
  };
}

/** Jour au format AAAA-MM-JJ, décalé de `days` jours. */
export const isoDay = (now: number, days: number) => new Date(now + days * 86400_000).toISOString().slice(0, 10);

/**
 * Deux périodes consécutives de `length` jours. Google publie ses chiffres
 * définitifs avec environ 3 jours de retard : la période s'arrête avant.
 */
export function periods(now: number, length = 28) {
  return {
    current: { startDate: isoDay(now, -3 - length + 1), endDate: isoDay(now, -3) },
    previous: { startDate: isoDay(now, -3 - 2 * length + 1), endDate: isoDay(now, -3 - length) },
  };
}

/** Comparaison sans accents ni majuscules (« Épaviste Aix » = « epaviste aix »). */
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[-']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
