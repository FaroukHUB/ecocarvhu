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
  | "rachat"
  | "rachatTaxi"
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
    title: "Épaviste en PACA : enlèvement d'épave gratuit | EcocarVHU",
    description:
      "Épaviste en PACA : enlèvement gratuit d'un véhicule complet et accessible, remis à un centre VHU agréé. Rachat de voitures et de taxis sur étude.",
    h1: "Enlèvement d'épave gratuit en Provence-Alpes-Côte d'Azur",
    intent: "Navigation / choix du service",
    primaryQuery: "enlèvement épave PACA",
    secondaryQueries: ["épaviste PACA", "enlèvement épave gratuit", "rachat véhicule PACA"],
    sitemap: true,
  },
  enlevement: {
    path: "/enlevement-epave",
    label: "Enlèvement d'épave",
    title: "Enlèvement d'épave gratuit en PACA",
    description:
      "Voiture en panne, accidentée ou non roulante : enlèvement gratuit si elle est complète et accessible, remise à un centre VHU agréé.",
    h1: "Enlèvement d'épave gratuit",
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
    title: "Centre VHU agréé : prise en charge",
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
  rachat: {
    path: "/rachat-vehicule",
    label: "Rachat de véhicule",
    title: "Rachat voiture en panne et non roulante",
    description:
      "Faites étudier le rachat de votre voiture en panne ou non roulante en PACA. Décrivez son état et joignez des photos : offre après examen.",
    h1: "Faire étudier le rachat de votre véhicule",
    intent: "Transactionnelle : obtenir une étude de rachat",
    primaryQuery: "rachat voiture en panne",
    secondaryQueries: ["rachat voiture accidentée", "vendre voiture pour pièces"],
    sitemap: true,
  },
  rachatTaxi: {
    path: "/rachat-taxi",
    label: "Rachat de taxi",
    title: "Rachat de taxi : fort kilométrage ou accidenté",
    description:
      "Rachat de taxi à Marseille, Nice, Toulon et dans toute la région PACA : fort kilométrage, accidenté ou en panne. Décrivez-le, offre après étude.",
    h1: "Rachat de taxi à fort kilométrage ou accidenté",
    intent: "Transactionnelle : vendre un taxi usé ou accidenté",
    primaryQuery: "rachat taxi",
    secondaryQueries: [
      "vendre son taxi",
      "rachat taxi accidenté",
      "rachat taxi gros kilométrage",
      "rachat taxi Marseille",
      "reprise taxi",
    ],
    sitemap: true,
  },
  pros: {
    path: "/professionnels",
    label: "Professionnels",
    title: "Enlèvement d'épaves pour garages et pros en PACA",
    description:
      "Garages, carrossiers, dépanneurs, flottes : enlèvement gratuit des véhicules complets et accessibles, remise à un centre VHU agréé, étude de rachat.",
    h1: "Enlèvement de véhicules hors d'usage pour les professionnels",
    intent: "B2B : enlèvement d'épaves et rachat de véhicules pour professionnels",
    primaryQuery: "enlèvement épave garage",
    secondaryQueries: [
      "épaviste professionnel PACA",
      "enlèvement véhicule hors d'usage garage",
      "enlèvement épaves carrossier",
      "enlèvement VHU flotte entreprise",
      "rachat véhicule professionnel",
    ],
    sitemap: true,
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contacter EcocarVHU",
    description:
      "Téléphone et formulaire de contact. Pour un enlèvement ou un rachat, utilisez le formulaire dédié : il pose les questions utiles pour vous répondre vite.",
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
      "Secteurs couverts et en cours d'ouverture dans les six départements de PACA. La faisabilité est confirmée pour chaque demande selon votre commune.",
    h1: "Zones d'intervention",
    intent: "Navigation locale",
    primaryQuery: "épaviste PACA",
    secondaryQueries: ["enlèvement épave Bouches-du-Rhône", "enlèvement épave Var"],
    sitemap: true,
  },
  conseils: {
    path: "/blog",
    label: "Blog",
    title: "Blog : épave, documents et rachat de véhicule",
    description:
      "Guides pratiques : enlèvement d'épave gratuit, documents à préparer, accès au véhicule, rôle du centre VHU et vente d'une voiture en panne en PACA.",
    h1: "Le blog EcocarVHU",
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
