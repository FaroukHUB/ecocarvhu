import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftsVisible } from "@/config/env";
import { pages } from "@/content/pages";
import { guides, type Guide } from "@/content/guides";
import { hasPublishedGuides, isGuidePublished, isGuideRenderable } from "@/lib/publication";
import { buildMetadata, type Crumb } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { DraftBanner } from "@/components/ui/DraftBanner";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { CallBand } from "@/components/sections/CallBand";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

function find(slug: string): Guide | undefined {
  const g = guides.find((x) => x.slug === slug);
  return g && isGuideRenderable(g) ? g : undefined;
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = find(slug);
  if (!g) return { title: "Page introuvable", robots: { index: false } };
  return buildMetadata({
    path: `/conseils/${g.slug}`,
    title: g.title,
    description: g.description,
    draft: !isGuidePublished(g),
  });
}

export default async function GuidePage({ params }: PageProps<"/conseils/[slug]">) {
  const { slug } = await params;
  const g = find(slug);
  if (!g) notFound();

  const crumbs: Crumb[] = [];
  if (hasPublishedGuides() || draftsVisible) crumbs.push({ name: pages.conseils.label, path: pages.conseils.path });
  crumbs.push({ name: g.h1, path: `/conseils/${g.slug}` });

  return (
    <>
      {!isGuidePublished(g) ? (
        <DraftBanner missing={["Relecture humaine du contenu et des sources officielles.", "Validation de publication."]} label="Guide en brouillon" />
      ) : null}
      <PageHero crumbs={crumbs} eyebrow="Conseils pratiques" title={g.h1} lead={<p>{g.summary}</p>} phone={false} />
      <Container className="py-12">
        <article className="prose-eco max-w-3xl text-[1.05rem] text-ink-2">
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.list ? (
                s.ordered ? (
                  <ol>{s.list.map((li) => <li key={li}>{li}</li>)}</ol>
                ) : (
                  <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>
                )
              ) : null}
            </section>
          ))}
          {g.sources.length ? (
            <section>
              <h2>Sources</h2>
              <ul>
                {g.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {g.reviewedOn ? <p className="text-sm text-muted">Dernière relecture : {g.reviewedOn}</p> : null}
        </article>
        <div className="mt-10">
          <ButtonLink href={g.cta.href}>{g.cta.label}</ButtonLink>
        </div>
      </Container>
      <CallBand placement={`guide-${g.slug}`} />
    </>
  );
}
