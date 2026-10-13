import { canPreviewDrafts, isIndexingAllowed, resolveSiteUrl } from "@/config/env";
import { pages, type PageEntry } from "@/content/pages";
import { sectors } from "@/content/sectors/data";
import type { Sector, SectorStatus } from "@/content/sectors/types";
import { guides, type Guide } from "@/content/guides";

type EnvSource = Record<string, string | undefined>;

export function isSectorPublished(status: SectorStatus): boolean {
  return (
    status.targeted &&
    status.serviceConfirmed &&
    status.contentVerified &&
    status.publicationApproved
  );
}

/** Une page de secteur peut-elle être rendue dans cet environnement ? */
export function isSectorRenderable(sector: Sector, env: EnvSource = process.env): boolean {
  return isSectorPublished(sector.status) || canPreviewDrafts(env);
}

export function sectorPath(sector: Sector): string {
  return `/zones-intervention/${sector.slug}`;
}

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

/** Secteurs publiés (production) — les seuls qui reçoivent des liens sur le site public. */
export function publishedSectors(): Sector[] {
  return sectors.filter((s) => isSectorPublished(s.status));
}

/** Secteurs visibles dans l'environnement courant (brouillons inclus hors production). */
export function visibleSectors(env: EnvSource = process.env): Sector[] {
  return sectors.filter((s) => isSectorRenderable(s, env));
}

export function isGuidePublished(guide: Guide): boolean {
  return guide.status.contentVerified && guide.status.publicationApproved;
}

/** Le hub /conseils n'est indexé et lié que s'il contient au moins un guide publié. */
export function hasPublishedGuides(): boolean {
  return guides.some(isGuidePublished);
}

export function isGuideRenderable(guide: Guide, env: EnvSource = process.env): boolean {
  return isGuidePublished(guide) || canPreviewDrafts(env);
}

/** Une page doit-elle porter un noindex ? */
export function shouldNoindex(opts: { draft?: boolean }, env: EnvSource = process.env): boolean {
  return !isIndexingAllowed(env) || Boolean(opts.draft);
}

export interface SitemapEntry {
  url: string;
  lastModified?: string;
}

/**
 * Entrées du sitemap : uniquement des URL canoniques, publiées, indexables.
 * Vide hors production ou sans domaine configuré.
 */
export function sitemapEntries(env: EnvSource = process.env): SitemapEntry[] {
  if (!isIndexingAllowed(env)) return [];
  const base = resolveSiteUrl(env)!;
  const abs = (path: string) => (path === "/" ? base + "/" : base + path);

  const staticPages = (Object.values(pages) as PageEntry[])
    .filter((p) => p.sitemap && !p.draft)
    .filter((p) => p.path !== pages.conseils.path || hasPublishedGuides())
    .map((p) => ({ url: abs(p.path) }));

  const sectorPages = publishedSectors().map((s) => ({ url: abs(sectorPath(s)) }));

  const guidePages = guides
    .filter(isGuidePublished)
    .map((g) => ({
      url: abs(`/conseils/${g.slug}`),
      // lastmod seulement si une date de révision réelle est renseignée
      ...(g.reviewedOn ? { lastModified: g.reviewedOn } : {}),
    }));

  return [...staticPages, ...sectorPages, ...guidePages];
}

/** Lien vers un guide, ou `null` s'il n'est pas visible ici (jamais de lien vers un brouillon en production). */
export function guideHref(slug: string, env: EnvSource = process.env): string | null {
  const guide = guides.find((g) => g.slug === slug);
  return guide && isGuideRenderable(guide, env) ? `/conseils/${guide.slug}` : null;
}
