export interface FaqItem {
  q: string;
  a: string;
  /** Lien vers la page qui détaille la réponse (route existante uniquement). */
  link?: { href: string; label: string };
}

/**
 * Les quatre statuts sont indépendants. Une page de secteur n'est publiée
 * (indexable, présente dans le sitemap, liée depuis le site de production)
 * que lorsque les QUATRE sont vrais.
 */
export interface SectorStatus {
  /** Cible commerciale souhaitée. */
  targeted: boolean;
  /** Le service est réellement assuré sur ce secteur (confirmé par l'entreprise). */
  serviceConfirmed: boolean;
  /** Le contenu de la page a été relu et ses faits vérifiés. */
  contentVerified: boolean;
  /** Feu vert explicite pour la publication. */
  publicationApproved: boolean;
}

export type SectorKind = "region" | "city";

export interface Sector {
  slug: string;
  name: string;
  kind: SectorKind;
  /** "dans les Bouches-du-Rhône", "à Marseille"… pour les phrases. */
  locative: string;
  department?: { code: string; name: string };
  postalCodes: string[];
  status: SectorStatus;
  seo: {
    title: string;
    description: string;
    h1: string;
    intent: string;
    primaryQuery: string;
    secondaryQueries: string[];
  };
  /** Introduction propre au secteur. */
  lead: string;
  /** Éléments utiles pour décrire le véhicule et son accès dans ce secteur. */
  accessTips: string[];
  /** Faits locaux VÉRIFIABLES (administratifs, logistiques confirmés). Jamais de remplissage touristique. */
  localFacts: { text: string; source: string }[];
  faq: FaqItem[];
  form: {
    city: string;
    postalCode?: string;
    /** Marseille : demander l'arrondissement. */
    askArrondissement?: boolean;
  };
  /** Ce qui manque pour publier cette page. */
  missing: string[];
  /** Slugs de secteurs liés (maillage). */
  related: string[];
  /** Mis en avant dans les listes courtes (accueil, page enlèvement). Les autres restent sur la page des zones. */
  featured?: boolean;
  /** Contenu propre à une page de ville (évite les pages trop semblables). */
  local?: CityLocal;
}

export interface CityLocal {
  /** Ordre des sections, pour que les pages ne suivent pas toutes le même plan. */
  variant: 1 | 2 | 3;
  /** Article propre à la commune : contexte d'accès, habitat, organisation. */
  guide: { title: string; paragraphs: string[] };
  /** Situations fréquentes formulées pour la commune. */
  situations: { title: string; items: { title: string; text: string }[] };
  /** Communes voisines (texte simple, sans promesse de service). */
  nearby: string[];
  /** Sections éditoriales propres à la commune, placées via `order` (clé `extra:<id>`). */
  extraSections?: CityExtraSection[];
  /** Ordre explicite des sections ; à défaut, celui de la variante. */
  order?: CitySectionKey[];
  /** Masque l'encart « pièce / rachat » à côté du formulaire. */
  hideFormAside?: boolean;
}

export type CitySectionKey = "guide" | "situations" | "access" | "form" | "faq" | `extra:${string}`;

/** Lien vers une section d'article du blog, affiché seulement si l'article est visible. */
export interface GuideLink {
  label: string;
  guide: string;
  anchor?: string;
}

/**
 * Section éditoriale d'une page de ville. Les textes acceptent les balises de
 * `RichText` (**gras**, [libellé](lien)). Aucune condition commerciale non validée.
 */
export interface CityExtraSection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  blocks?: { title: string; paragraphs?: string[]; list?: string[] }[];
  links?: GuideLink[];
  /** Ligne de sources officielles (RichText). */
  sources?: string;
  /** Ajoute un bouton vers le formulaire `#demande`. */
  formCta?: string;
}
