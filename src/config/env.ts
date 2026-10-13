/**
 * Environnement de publication.
 *
 * - `production` : seul environnement indexable, et seulement si
 *   NEXT_PUBLIC_SITE_URL est un domaine https réel.
 * - `preview` : recette / staging. Brouillons visibles, tout est en noindex.
 * - `development` : poste local. Brouillons visibles, noindex, mode démo des
 *   formulaires autorisé.
 *
 * Par sécurité, une build sans SITE_ENV explicite est traitée comme `preview`
 * (jamais indexée par accident).
 */

export type SiteEnv = "production" | "preview" | "development";

type EnvSource = Record<string, string | undefined>;

export function resolveSiteEnv(env: EnvSource = process.env): SiteEnv {
  const raw = env.SITE_ENV?.trim().toLowerCase();
  if (raw === "production" || raw === "preview" || raw === "development") return raw;
  return env.NODE_ENV === "development" || env.NODE_ENV === "test" ? "development" : "preview";
}

/**
 * URL publique du site, sans slash final. Retourne `null` si absente ou
 * invalide. En production, http, localhost et IP sont refusés.
 */
export function resolveSiteUrl(env: EnvSource = process.env): string | null {
  const raw = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const siteEnv = resolveSiteEnv(env);
  const isLocal =
    url.hostname === "localhost" ||
    url.hostname.endsWith(".local") ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname);
  if (siteEnv === "production" && (url.protocol !== "https:" || isLocal)) return null;
  return url.origin;
}

/** L'indexation n'est autorisée qu'en production avec un domaine valide. */
export function isIndexingAllowed(env: EnvSource = process.env): boolean {
  return resolveSiteEnv(env) === "production" && resolveSiteUrl(env) !== null;
}

/** Les brouillons sont prévisualisables partout sauf en production. */
export function canPreviewDrafts(env: EnvSource = process.env): boolean {
  return resolveSiteEnv(env) !== "production";
}

export const siteEnv = resolveSiteEnv();
export const siteUrl = resolveSiteUrl();
export const indexingAllowed = isIndexingAllowed();
export const draftsVisible = canPreviewDrafts();
