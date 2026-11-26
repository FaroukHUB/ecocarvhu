import { describe, expect, it } from "vitest";
import { pages } from "@/content/pages";
import { sectors } from "@/content/sectors/data";
import { posts } from "@/content/blog";

/**
 * Garde-fou issu de l'audit SEO du 23/11/2026 : titres et descriptions
 * lisibles dans les résultats Google. Ce ne sont pas des limites imposées par
 * Google, mais des repères pour éviter les titres à rallonge (ex. 103 caractères
 * avec le nom de ville répété).
 */
const BRAND = " | EcocarVHU";
const TITLE_MAX = 65;
const DESCRIPTION_MAX = 160;

const rows: { id: string; title: string; description: string }[] = [
  ...Object.entries(pages).map(([key, p]) => ({
    id: `page:${key}`,
    // L'accueil a un titre absolu (marque déjà incluse).
    title: p.title.includes("EcocarVHU") ? p.title : p.title + BRAND,
    description: p.description,
  })),
  ...sectors.map((s) => ({ id: `secteur:${s.slug}`, title: s.seo.title + BRAND, description: s.seo.description })),
  ...posts.map((p) => ({ id: `article:${p.slug}`, title: p.title + BRAND, description: p.description })),
];

describe("titres et descriptions", () => {
  it.each(rows)("$id : titre de 65 caractères au plus", ({ title }) => {
    expect(title.length, title).toBeLessThanOrEqual(TITLE_MAX);
  });

  it.each(rows)("$id : description de 160 caractères au plus", ({ description }) => {
    expect(description.length, description).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
});
