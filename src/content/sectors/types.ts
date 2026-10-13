export interface FaqItem {
  q: string;
  a: string;
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

export type SectorKind = "region" | "city" | "foreign-state";

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
}
