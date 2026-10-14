import { posts } from "@/content/blog";
import { sectors } from "@/content/sectors/data";
import { isPostRenderable, isSectorRenderable } from "@/lib/publication";

type EnvSource = Record<string, string | undefined>;

export const RESULT_STATUSES = [
  "ok-sent",
  "ok-demo",
  "invalid",
  "rejected-file",
  "spam",
  "rate-limited",
  "unavailable",
  "failed",
] as const;

/**
 * Pour les routes dynamiques : le segment existe-t-il dans cet environnement ?
 * Retourne `null` si le chemin n'est pas une route dynamique du site.
 *
 * Utilisé par le proxy pour garantir un vrai statut 404 (avec le rendu
 * partiel, une page dynamique inconnue pourrait sinon commencer en 200).
 */
export function isKnownDynamicPath(pathname: string, env: EnvSource = process.env): boolean | null {
  const path = pathname.replace(/\/$/, "");
  let m = path.match(/^\/zones-intervention\/([^/]+)(\/.*)?$/);
  if (m) {
    if (m[2]) return false;
    const sector = sectors.find((s) => s.slug === m![1]);
    return Boolean(sector && isSectorRenderable(sector, env));
  }
  m = path.match(/^\/blog\/([^/]+)(\/.*)?$/);
  if (m) {
    if (m[2]) return false;
    const post = posts.find((p) => p.slug === m![1]);
    return Boolean(post && isPostRenderable(post, env));
  }
  m = path.match(/^\/demande\/resultat\/([^/]+)(\/.*)?$/);
  if (m) return !m[2] && (RESULT_STATUSES as readonly string[]).includes(m[1]);
  return null;
}
