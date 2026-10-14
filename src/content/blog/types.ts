/**
 * Articles du blog. Le texte peut contenir deux balises simples :
 * **gras** et [libellé](lien). Un lien « guide:slug » pointe vers un autre
 * article et n'est rendu que si cet article est publié.
 */
export type PostBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "figure"; src: string; alt: string; caption?: string; width: number; height: number }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "quote"; label?: string; text: string };

export interface Post {
  slug: string;
  /** Balise title (SEO). */
  title: string;
  description: string;
  h1: string;
  /** Résumé affiché sur les cartes. */
  excerpt: string;
  /** Chapeau en tête d'article. */
  lead?: string;
  category: string;
  author: string;
  /** Date de publication (AAAA-MM-JJ). */
  date: string;
  /** Date de vérification des sources, si indiquée par l'auteur. */
  sourcesCheckedOn?: string;
  cover?: { src: string; alt: string; caption?: string; width: number; height: number };
  /** Encadré « l'essentiel » en tête d'article. */
  keyPoints?: { title: string; highlight?: string; items: string[]; tip?: string };
  blocks: PostBlock[];
  faq?: { q: string; a: string }[];
  faqTitle?: string;
  cta?: { title: string; text: string; label: string; href: string; note?: string };
  sources: { label: string; url?: string }[];
  sourcesTitle?: string;
  /** Mention finale de l'auteur (ex. nature des visuels). */
  footnote?: string;
  status: { contentVerified: boolean; publicationApproved: boolean };
}
