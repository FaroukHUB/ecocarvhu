import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { guides } from "@/content/guides";
import { hasPublishedGuides, isGuidePublished, isGuideRenderable } from "@/lib/publication";
import { draftsVisible } from "@/config/env";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/primitives";
import { ArrowIcon } from "@/components/ui/icons";

const page = pages.conseils;

export const metadata = buildMetadata({
  path: page.path,
  title: page.title,
  description: page.description,
  draft: !hasPublishedGuides(),
});

export default function ConseilsPage() {
  // Sans guide publié, le hub n'existe pas en production (pas de page vide indexable).
  if (!hasPublishedGuides() && !draftsVisible) notFound();
  const list = guides.filter((g) => isGuideRenderable(g));
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Guides pratiques"
        title={page.h1}
        lead={<p>Des réponses courtes aux questions qui bloquent souvent une demande.</p>}
        phone={false}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {list.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/conseils/${g.slug}`}
                className="card group flex h-full flex-col p-7"
              >
                <h2 className="text-xl font-bold group-hover:text-brand">{g.h1}</h2>
                <p className="mt-2 flex-1 text-ink-3">{g.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand">
                  Lire le guide <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
