import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/publication";

/** Uniquement les URL canoniques publiées ; vide hors production. lastmod seulement si connu. */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((e) => ({
    url: e.url,
    ...(e.lastModified ? { lastModified: e.lastModified } : {}),
  }));
}
