/**
 * Informations de l'entreprise — SOURCE UNIQUE.
 *
 * Règle : une valeur inconnue reste `null`. Elle n'est jamais remplacée par une
 * valeur "plausible". Les composants affichent un texte neutre ou masquent le
 * bloc quand la donnée manque. La liste de ce qui bloque la publication est
 * calculée dans `src/lib/launch-readiness.ts`.
 */

export type VerifiedValue<T> = {
  value: T;
  /** D'où vient l'information (qui, quand). */
  source: string;
};

export type VhuSituation =
  /** L'entreprise exploite elle-même un centre VHU (statut à prouver). */
  | "own-centre"
  /** L'entreprise organise l'enlèvement et remet le véhicule à un centre partenaire. */
  | "partner-centre"
  /** Situation pas encore précisée. */
  | "to-define";

export interface PartnerCentre {
  /** Déclaration du porteur de projet : un partenariat existe avec un centre VHU agréé. */
  declared: VerifiedValue<boolean> | null;
  /** Raison sociale du centre partenaire. */
  name: string | null;
  /** Numéro d'agrément préfectoral / d'enregistrement ICPE du centre. */
  agrementNumber: string | null;
  /** Préfecture ayant délivré l'agrément / l'enregistrement. */
  issuingAuthority: string | null;
  /** Commune du centre (jamais présentée comme une implantation EcocarVHU). */
  city: string | null;
}

export interface CompanyConfig {
  brandName: string;
  /** La marque est encore provisoire. */
  brandIsProvisional: boolean;
  legalName: string | null;
  legalForm: string | null;
  siret: string | null;
  vatNumber: string | null;
  registeredAddress: string | null;
  publicationDirector: string | null;
  phone: (VerifiedValue<string> & { e164: string }) | null;
  /** Numéro WhatsApp au format international sans "+" (ex. 33612345678). */
  whatsapp: VerifiedValue<string> | null;
  email: VerifiedValue<string> | null;
  /** Adresse d'accueil du public. `null` = pas d'adresse publiée. */
  publicAddress: string | null;
  openingHours: string | null;
  vhu: {
    situation: VhuSituation;
    situationSource: string;
    partner: PartnerCentre;
  };
  pickup: {
    /** Conditions de gratuité réellement appliquées. `null` = à confirmer au cas par cas. */
    freeConditions: string | null;
    /** Capacités logistiques confirmées (plateau, treuil, sous-sol…). */
    confirmedCapabilities: string[];
  };
  /** Hébergeur du site (mentions légales). */
  host: string | null;
  /** Preuves commerciales vérifiées (avis réels, interventions documentées…). Vide = bloc masqué. */
  proofs: { label: string; detail: string; source: string }[];
}

export const company: CompanyConfig = {
  brandName: "EcocarVHU",
  brandIsProvisional: true,
  legalName: null,
  legalForm: null,
  siret: null,
  vatNumber: null,
  registeredAddress: null,
  publicationDirector: null,
  phone: {
    value: "07 53 08 62 18",
    e164: "+33753086218",
    source: "Fourni par le porteur de projet, 13/10/2026",
  },
  whatsapp: null,
  email: null,
  publicAddress: null,
  openingHours: null,
  vhu: {
    situation: "partner-centre",
    situationSource:
      "Déclaration du porteur de projet (13/10/2026) : partenariat avec un centre VHU agréé, numéro d'agrément à venir.",
    partner: {
      declared: {
        value: true,
        source: "Déclaration du porteur de projet, 13/10/2026 — à justifier avant publication",
      },
      name: null,
      agrementNumber: null,
      issuingAuthority: null,
      city: null,
    },
  },
  pickup: {
    freeConditions: null,
    confirmedCapabilities: [],
  },
  host: null,
  proofs: [],
};

export function telHref(): string | null {
  return company.phone ? `tel:${company.phone.e164}` : null;
}

export function whatsappHref(prefill?: string): string | null {
  if (!company.whatsapp) return null;
  const text = prefill ? `?text=${encodeURIComponent(prefill)}` : "";
  return `https://wa.me/${company.whatsapp.value}${text}`;
}
