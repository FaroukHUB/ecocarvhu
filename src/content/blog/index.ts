import { guides, type Guide } from "@/content/guides";
import type { Post, PostBlock } from "./types";
import { enlevementEpaveGratuitPaca } from "./posts/enlevement-epave-gratuit-paca";
import { documentsEnlevementEpavePaca } from "./posts/documents-enlevement-epave-paca";

/** Les guides pratiques existants deviennent des articles du blog (sans image de couverture). */
function guideToPost(g: Guide): Post {
  const blocks: PostBlock[] = [];
  for (const s of g.sections) {
    blocks.push({ type: "h2", text: s.heading });
    for (const p of s.paragraphs ?? []) blocks.push({ type: "p", text: p });
    if (s.list) blocks.push({ type: "list", items: s.list, ordered: s.ordered });
  }
  return {
    slug: g.slug,
    title: g.title,
    description: g.description,
    h1: g.h1,
    excerpt: g.summary,
    lead: g.summary,
    category: "Guide pratique",
    author: "La rédaction EcocarVHU",
    date: g.reviewedOn ?? "2026-10-13",
    blocks,
    cta: { title: "Besoin d'aide pour votre demande ?", text: g.summary, label: g.cta.label, href: g.cta.href },
    sources: g.sources,
    status: g.status,
  };
}

/** Tous les articles, du plus récent au plus ancien. */
export const posts: Post[] = [documentsEnlevementEpavePaca, enlevementEpaveGratuitPaca, ...guides.map(guideToPost)].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export type { Post, PostBlock } from "./types";
