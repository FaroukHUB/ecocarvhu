import type { MetadataRoute } from "next";
import { isIndexingAllowed, resolveSiteUrl } from "@/config/env";

/**
 * robots.txt selon l'environnement. Rappel : robots.txt ne protège pas une
 * prévisualisation et ne garantit pas la désindexation ; la prévisualisation
 * porte aussi un noindex (balise + en-tête X-Robots-Tag) et doit être protégée
 * par l'hébergeur ou par PREVIEW_BASIC_AUTH.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  const base = resolveSiteUrl()!;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/demande/"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
