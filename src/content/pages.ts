/**
 * Registre des pages principales : slug stable, SEO et intention.
 * Les cartes de pages détaillées (plan éditorial, maillage, éléments à vérifier)
 * sont reprises dans docs/SEO-STRATEGY.md.
 *
 * Les requêtes sont des HYPOTHÈSES de formulation : aucun volume de recherche
 * n'a été mesuré.
 */

export type PageKey =
  | "home"
  | "enlevement"
  | "centreVhu"
  | "pieces"
  | "demandePiece"
  | "rachat"
  | "pros"
  | "contact"
  | "zones"
  | "conseils"
  | "mentions"
  | "confidentialite"
  | "conditions";

export interface PageEntry {
  path: string;
  /** Libellé court (navigation, fil d'Ariane). */
  label: string;
  title: string;
  description: string;
  h1: string;
  intent: string;
  primaryQuery: string | null;
  secondaryQueries: string[];
  /** Brouillon (ex. pages légales non validées) : visible, mais noindex. */
  draft?: boolean;
  /** Exclu du sitemap tout en restant accessible (ex. pages légales). */
  sitemap: boolean;
}

export const pages: Record<PageKey, PageEntry> = {
  home: {
    path: "/",
    label: "Accueil",
    title: "EcocarVHU — Enlèvement d'épave et pièces auto d'occasion en PACA",
    description:
      "Demandez l'enlèvement d'un véhicule hors d'usage, en panne ou accidenté, ou une pièce auto d'occasion en Provence-Alpes-Côte d'Azur. Conditions confirmées avant tout déplacement.",
    h1: "Enlèvement d'épave et pièces auto d'occasion en Provence-Alpes-Côte d'Azur",
    intent: "Navigation / choix du service",
    primaryQuery: "enlèvement épave PACA",
    secondaryQueries: ["épaviste PACA", "pièces auto occasion PACA", "casse auto PACA"],
    sitemap: true,
  },
  enlevement: {
    path: "/enlevement-epave",
    label: "Enlèvement d'épave",
    title: "Enlèvement d'épave et de véhicule hors d'usage en PACA",
    description:
      "Véhicule en panne, accidenté ou non roulant : décrivez son état et son accès en quelques étapes. L'équipe vérifie la faisabilité et confirme les conditions avant de se déplacer.",
    h1: "Faire enlever une épave ou un véhicule hors d'usage",
    intent: "Transactionnelle : obtenir un enlèvement",
    primaryQuery: "enlèvement épave",
    secondaryQueries: [
      "épaviste",
      "enlèvement épave gratuit",
      "enlèvement voiture non roulante",
      "enlèvement véhicule accidenté",
    ],
    sitemap: true,
  },
  centreVhu: {
    path: "/centre-vhu",
    label: "Centre VHU",
    title: "Centre VHU partenaire : prise en charge d'un véhicule hors d'usage",
    description:
      "Comment un véhicule hors d'usage est remis à un centre VHU, quels documents préparer et ce que le centre vous remet. Le rôle de chacun, expliqué simplement.",
    h1: "Prise en charge par un centre VHU : comment ça se passe",
    intent: "Informationnelle puis transactionnelle",
    primaryQuery: "centre VHU",
    secondaryQueries: [
      "centre VHU agréé",
      "certificat de destruction véhicule",
      "faire détruire sa voiture",
    ],
    sitemap: true,
  },
  pieces: {
    path: "/pieces-auto-occasion",
    label: "Pièces d'occasion",
    title: "Pièces auto d'occasion : demande de recherche et compatibilité",
    description:
      "Moteur, carrosserie, optiques, mécanique, électronique : décrivez votre véhicule et la pièce, même sans connaître son nom exact. Disponibilité et compatibilité vérifiées avant toute proposition.",
    h1: "Pièces auto d'occasion : trouvez la bonne pièce pour votre véhicule",
    intent: "Commerciale : recherche d'une pièce",
    primaryQuery: "pièces auto occasion",
    secondaryQueries: ["pièce détachée occasion", "casse auto pièces", "pièce de réemploi"],
    sitemap: true,
  },
  demandePiece: {
    path: "/demande-piece",
    label: "Demande de pièce",
    title: "Demande de pièce auto d'occasion",
    description:
      "Formulaire de recherche de pièce : véhicule, motorisation, référence si vous l'avez, photos. Nous vérifions la disponibilité et la compatibilité puis revenons vers vous.",
    h1: "Demander une pièce d'occasion",
    intent: "Transactionnelle : envoyer une demande de pièce",
    primaryQuery: "demande pièce auto occasion",
    secondaryQueries: ["recherche pièce auto", "trouver une pièce auto d'occasion"],
    sitemap: true,
  },
  rachat: {
    path: "/rachat-vehicule",
    label: "Rachat de véhicule",
    title: "Rachat de véhicule en panne ou accidenté : demande d'étude",
    description:
      "Vous voulez céder un véhicule en panne, accidenté ou très kilométré ? Envoyez ses caractéristiques et des photos : l'équipe étudie la demande, sans estimation automatique.",
    h1: "Faire étudier le rachat de votre véhicule",
    intent: "Transactionnelle : obtenir une étude de rachat",
    primaryQuery: "rachat voiture en panne",
    secondaryQueries: ["rachat voiture accidentée", "vendre voiture pour pièces"],
    sitemap: true,
  },
  pros: {
    path: "/professionnels",
    label: "Professionnels",
    title: "Garages, carrossiers : pièces d'occasion et enlèvements groupés",
    description:
      "Envoyez une liste de références, organisez plusieurs enlèvements ou proposez un partenariat. Un interlocuteur traite les demandes des garages et carrossiers.",
    h1: "Un service pensé pour les garages, carrossiers et professionnels",
    intent: "B2B : demande professionnelle",
    primaryQuery: "pièces occasion garage",
    secondaryQueries: ["enlèvement épaves garage", "fournisseur pièces réemploi carrossier"],
    sitemap: true,
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contacter EcocarVHU",
    description:
      "Téléphone et formulaire de contact. Pour un enlèvement, une pièce ou un rachat, utilisez le formulaire dédié : il contient les questions utiles pour vous répondre vite.",
    h1: "Nous contacter",
    intent: "Navigation : joindre l'entreprise",
    primaryQuery: null,
    secondaryQueries: [],
    sitemap: true,
  },
  zones: {
    path: "/zones-intervention",
    label: "Zones d'intervention",
    title: "Zones d'intervention en Provence-Alpes-Côte d'Azur",
    description:
      "Secteurs couverts et en cours d'ouverture dans les six départements de PACA. Indiquez votre code postal : la faisabilité est confirmée pour chaque demande.",
    h1: "Zones d'intervention",
    intent: "Navigation locale",
    primaryQuery: "épaviste PACA",
    secondaryQueries: ["enlèvement épave Bouches-du-Rhône", "enlèvement épave Var"],
    sitemap: true,
  },
  conseils: {
    path: "/conseils",
    label: "Conseils",
    title: "Conseils pratiques : documents, accès, références de pièces",
    description:
      "Guides courts pour préparer la remise d'un véhicule, décrire un accès difficile, identifier une référence de pièce et comprendre la prise en charge d'un VHU.",
    h1: "Conseils pratiques",
    intent: "Informationnelle",
    primaryQuery: null,
    secondaryQueries: [],
    sitemap: true,
  },
  mentions: {
    path: "/mentions-legales",
    label: "Mentions légales",
    title: "Mentions légales",
    description: "Mentions légales du site EcocarVHU.",
    h1: "Mentions légales",
    intent: "Légale",
    primaryQuery: null,
    secondaryQueries: [],
    draft: true,
    sitemap: false,
  },
  confidentialite: {
    path: "/confidentialite",
    label: "Confidentialité",
    title: "Politique de confidentialité",
    description: "Comment les données transmises via les formulaires EcocarVHU sont utilisées.",
    h1: "Politique de confidentialité",
    intent: "Légale",
    primaryQuery: null,
    secondaryQueries: [],
    draft: true,
    sitemap: false,
  },
  conditions: {
    path: "/conditions",
    label: "Conditions",
    title: "Conditions d'utilisation et de service",
    description: "Conditions d'utilisation du site et des demandes EcocarVHU.",
    h1: "Conditions d'utilisation et de service",
    intent: "Légale",
    primaryQuery: null,
    secondaryQueries: [],
    draft: true,
    sitemap: false,
  },
};
