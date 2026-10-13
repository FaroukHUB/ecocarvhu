/**
 * Informations réglementaires affichées sur le site.
 *
 * Statut de vérification au 13/10/2026 : les pages officielles n'ont pas pu
 * être ouvertes depuis l'environnement de développement (accès réseau
 * restreint). Le contenu ci-dessous provient des extraits indexés des pages
 * citées. `checkedOn` reste `null` tant qu'une personne n'a pas relu la page
 * officielle en direct (voir docs/CONTENT-VALIDATION.md).
 */

export interface OfficialSource {
  label: string;
  url: string;
  /** Date de relecture humaine de la page officielle. */
  checkedOn: string | null;
}

export const sources = {
  f1468: {
    label: "Service-Public.fr — Véhicule à détruire et certificat d'immatriculation (F1468)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1468",
    checkedOn: null,
  },
  ministere: {
    label: "Ministère de la Transition écologique — Véhicules hors d'usage (VHU)",
    url: "https://www.ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu",
    checkedOn: null,
  },
  ants: {
    label: "ANTS — démarches liées à la cession d'un véhicule",
    url: "https://immatriculation.ants.gouv.fr/",
    checkedOn: null,
  },
  monaco: {
    label: "Mon Service Public (Monaco) — titres de circulation",
    url: "https://monservicepublic.gouv.mc/",
    checkedOn: null,
  },
} satisfies Record<string, OfficialSource>;

export interface DocumentItem {
  title: string;
  detail: string;
}

/** Pièces habituellement demandées par un centre VHU pour un véhicule immatriculé en France. */
export const handoverDocuments: DocumentItem[] = [
  {
    title: "Le certificat d'immatriculation (carte grise)",
    detail:
      "Barré avec la mention « Vendu le … pour destruction » ou « Cédé le … pour destruction », daté et signé. S'il y a plusieurs titulaires, chacun signe.",
  },
  {
    title: "La déclaration de cession (cerfa 15776)",
    detail:
      "L'exemplaire n° 2 est remis au centre VHU. Le centre peut généralement enregistrer lui-même la cession ; sinon, elle se déclare en ligne sur le site de l'ANTS.",
  },
  {
    title: "Un certificat de situation administrative de moins de 15 jours",
    detail:
      "Il indique s'il existe un gage ou une opposition sur le véhicule. Il s'obtient gratuitement en ligne.",
  },
  {
    title: "Une pièce d'identité du titulaire",
    detail: "Elle peut être demandée pour vérifier que la personne qui cède le véhicule en a le droit.",
  },
];

export interface SpecialCase {
  situation: string;
  answer: string;
}

export const specialCases: SpecialCase[] = [
  {
    situation: "La carte grise est perdue",
    answer:
      "Une déclaration de perte remplace le certificat, accompagnée du certificat de situation administrative de moins de 15 jours.",
  },
  {
    situation: "La carte grise a été volée",
    answer:
      "Le récépissé de déclaration de vol (police ou gendarmerie) est demandé, avec le certificat de situation administrative.",
  },
  {
    situation: "Le véhicule est gagé ou fait l'objet d'une opposition",
    answer:
      "Un gage doit en principe être levé avant la cession. Une opposition liée à un classement « véhicule endommagé » peut bloquer la remise : signalez-la dès la demande, elle sera examinée.",
  },
  {
    situation: "Le véhicule est immatriculé à l'étranger",
    answer:
      "Le certificat d'immatriculation étranger est remis au centre VHU. Les pièces exigées diffèrent : la situation est examinée au cas par cas avant tout rendez-vous.",
  },
  {
    situation: "Vous n'êtes pas le titulaire de la carte grise",
    answer:
      "Héritage, véhicule d'un proche, véhicule abandonné sur un terrain privé : précisez-le dans la demande. Les documents nécessaires dépendent de la situation et vous seront indiqués.",
  },
];

/** Gratuité : formulation prudente, alignée sur les textes, sans promesse universelle. */
export const freeOfChargeExplanation = [
  "La remise d'un véhicule complet (avec notamment son moteur, son pot catalytique et sa batterie) à un centre VHU est gratuite pour le détenteur.",
  "Depuis 2024, la filière des constructeurs (responsabilité élargie du producteur) organise aussi une collecte sans frais des véhicules complets sur leur lieu de détention, selon des conditions qui lui sont propres.",
  "Le transport jusqu'au centre, lui, n'est pas automatiquement gratuit : il dépend notamment de l'état du véhicule, de son accès et de la distance. Les conditions de notre enlèvement vous sont annoncées avant le rendez-vous, jamais après.",
];

export const centreStatusExplanation = [
  "Seul un centre VHU est habilité à prendre en charge un véhicule hors d'usage pour le dépolluer, le démonter et le faire recycler, et à délivrer le certificat de destruction.",
  "Depuis le 1er janvier 2025, les nouveaux centres VHU relèvent d'un enregistrement au titre des installations classées (ICPE). Les centres titulaires d'un agrément préfectoral délivré auparavant peuvent continuer à exercer tant que cet agrément n'est ni retiré ni suspendu.",
  "Le numéro d'agrément ou d'enregistrement permet d'identifier le centre responsable. Il doit figurer sur les documents qu'il remet.",
];
