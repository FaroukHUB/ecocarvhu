import { describe, expect, it } from "vitest";
import { sectors } from "@/content/sectors/data";
import { posts } from "@/content/blog";
import {
  guideHref,
  isSectorPublished,
  isSectorRenderable,
  shouldNoindex,
  sitemapEntries,
} from "@/lib/publication";

const PROD = { SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.domaine.fr" };
const PREVIEW = { SITE_ENV: "preview", NEXT_PUBLIC_SITE_URL: "https://preview.domaine.fr" };

describe("publication des secteurs", () => {
  it("exige les quatre statuts pour publier", () => {
    const base = { targeted: true, serviceConfirmed: true, contentVerified: true, publicationApproved: true };
    expect(isSectorPublished(base)).toBe(true);
    for (const key of Object.keys(base) as (keyof typeof base)[]) {
      expect(isSectorPublished({ ...base, [key]: false })).toBe(false);
    }
  });

  it("rend les brouillons en prévisualisation mais pas en production", () => {
    const draft = { ...sectors[0], status: { ...sectors[0].status, publicationApproved: false } };
    expect(isSectorRenderable(draft, PREVIEW)).toBe(true);
    expect(isSectorRenderable(draft, PROD)).toBe(false);
  });

  it("ne contient pas de valeur commerciale inventée dans les faits locaux", () => {
    for (const s of sectors) {
      for (const f of s.localFacts) {
        expect(f.source.length).toBeGreaterThan(0);
        expect(f.text).not.toMatch(/\b\d+\s*(avis|interventions|clients)\b/i);
      }
    }
  });
});

describe("sitemap", () => {
  it("est vide hors production", () => {
    expect(sitemapEntries(PREVIEW)).toEqual([]);
    expect(sitemapEntries({ SITE_ENV: "production" })).toEqual([]);
  });

  it("ne contient que des URL absolues du domaine, sans brouillon ni page légale provisoire", () => {
    const urls = sitemapEntries(PROD).map((e) => e.url);
    expect(urls.length).toBeGreaterThan(0);
    for (const u of urls) expect(u.startsWith("https://www.domaine.fr/")).toBe(true);
    for (const s of sectors.filter((x) => !isSectorPublished(x.status))) {
      expect(urls).not.toContain(`https://www.domaine.fr/zones-intervention/${s.slug}`);
    }
    expect(urls).not.toContain("https://www.domaine.fr/mentions-legales");
    expect(urls.some((u) => u.includes("localhost"))).toBe(false);
  });

  it("n'inclut le blog que s'il existe un article publié", () => {
    const urls = sitemapEntries(PROD).map((e) => e.url);
    const anyPublished = posts.some((g) => g.status.contentVerified && g.status.publicationApproved);
    expect(urls.includes("https://www.domaine.fr/blog")).toBe(anyPublished);
  });
});

describe("robots des pages", () => {
  it("met noindex hors production et sur les brouillons en production", () => {
    expect(shouldNoindex({}, PREVIEW)).toBe(true);
    expect(shouldNoindex({}, PROD)).toBe(false);
    expect(shouldNoindex({ draft: true }, PROD)).toBe(true);
  });

  it("ne produit aucun lien vers un guide en brouillon en production", () => {
    for (const g of posts.filter((x) => !x.status.publicationApproved)) {
      expect(guideHref(g.slug, PROD)).toBeNull();
      expect(guideHref(g.slug, PREVIEW)).toBe(`/blog/${g.slug}`);
    }
  });
});

describe("routes dynamiques (vrai 404)", async () => {
  const { isKnownDynamicPath } = await import("@/lib/routes");
  it("reconnaît les segments existants et refuse les autres", () => {
    expect(isKnownDynamicPath("/zones-intervention/marseille", PREVIEW)).toBe(true);
    expect(isKnownDynamicPath("/zones-intervention/marseille", PROD)).toBe(true);
    expect(isKnownDynamicPath("/zones-intervention/ville-inconnue", PREVIEW)).toBe(false);
    expect(isKnownDynamicPath("/zones-intervention/marseille/x", PREVIEW)).toBe(false);
    expect(isKnownDynamicPath("/blog/inconnu", PREVIEW)).toBe(false);
    expect(isKnownDynamicPath("/demande/resultat/ok-sent", PROD)).toBe(true);
    expect(isKnownDynamicPath("/demande/resultat/xyz", PROD)).toBe(false);
    expect(isKnownDynamicPath("/contact", PROD)).toBeNull();
  });
});
