import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { draftsVisible } from "@/config/env";
import { hasPublishedPosts, visiblePosts } from "@/lib/publication";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/primitives";
import { PostCard } from "@/components/blog/PostCard";
import { CallBand } from "@/components/sections/CallBand";

const page = pages.conseils;

export const metadata = buildMetadata({
  path: page.path,
  title: page.title,
  description: page.description,
  draft: !hasPublishedPosts(),
});

export default function BlogPage() {
  // Sans article publié, le blog n'existe pas en production (pas de page vide indexable).
  if (!hasPublishedPosts() && !draftsVisible) notFound();
  const list = visiblePosts();
  return (
    <>
      <PageHero
        crumbs={[{ name: page.label, path: page.path }]}
        eyebrow="Guides et conseils"
        title={page.h1}
        lead={
          <p>
            Enlèvement d&apos;épave, documents, accès au véhicule, rôle du centre VHU : des articles pratiques pour
            préparer votre demande en Provence-Alpes-Côte d&apos;Azur.
          </p>
        }
        phone={false}
      />
      <Section tone="surface">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug} className="reveal">
              <PostCard post={p} headingLevel={2} />
            </li>
          ))}
        </ul>
      </Section>
      <CallBand placement="blog" />
    </>
  );
}
