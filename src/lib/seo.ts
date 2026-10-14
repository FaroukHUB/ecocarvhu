import type { Metadata } from "next";
import { siteUrl } from "@/config/env";
import { company } from "@/config/company";
import { shouldNoindex } from "@/lib/publication";

interface BuildMetadataInput {
  path: string;
  title: string;
  description: string;
  /** Titre complet sans ajout de la marque (accueil). */
  absoluteTitle?: boolean;
  draft?: boolean;
  /** Article de blog : image de partage propre et date de publication. */
  article?: { image?: { url: string; width: number; height: number }; publishedTime: string };
}

/**
 * Métadonnées d'une page : title, description, canonical (si le domaine est
 * connu), robots selon l'environnement et le statut, Open Graph.
 */
export function buildMetadata({
  path,
  title,
  description,
  absoluteTitle,
  draft,
  article,
}: BuildMetadataInput): Metadata {
  const noindex = shouldNoindex({ draft });
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: siteUrl ? { canonical: path } : undefined,
    robots: noindex
      ? { index: false, follow: !draft, googleBot: { index: false, follow: !draft } }
      : { index: true, follow: true },
    openGraph: {
      type: article ? "article" : "website",
      ...(article ? { publishedTime: article.publishedTime } : {}),
      locale: "fr_FR",
      siteName: company.brandName,
      title,
      description,
      url: siteUrl ? path : undefined,
      // Image de partage commune (src/app/opengraph-image.tsx).
      images: siteUrl ? [article?.image ?? { url: "/opengraph-image", width: 1200, height: 630 }] : undefined,
    },
  };
}

export function absoluteUrl(path: string): string | null {
  if (!siteUrl) return null;
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList : uniquement si le domaine est connu (URL absolues requises). */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/**
 * Organization : seulement quand l'identité est confirmée (raison sociale,
 * domaine). Aucune note, aucun avis, aucune adresse inventée.
 * LocalBusiness n'est PAS généré : il exige un établissement réel avec adresse.
 */
export function organizationJsonLd() {
  if (!siteUrl || !company.legalName || company.brandIsProvisional) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brandName,
    legalName: company.legalName,
    url: `${siteUrl}/`,
    ...(company.phone ? { telephone: company.phone.e164 } : {}),
    ...(company.email ? { email: company.email.value } : {}),
  };
}

/** Article de blog (BlogPosting) : uniquement si le domaine est connu (URL absolues requises). */
export function blogPostingJsonLd(post: {
  h1: string;
  description: string;
  date: string;
  path: string;
  image?: string;
  author: string;
}) {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(post.path),
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: company.brandName },
    inLanguage: "fr-FR",
  };
}
