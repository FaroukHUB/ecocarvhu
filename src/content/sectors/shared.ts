/** Statuts confirmés par le porteur de projet (région PACA et villes). */
export const CONFIRMED = {
  targeted: true,
  serviceConfirmed: true,
  contentVerified: true,
  publicationApproved: true,
} as const;

export const CITY_MISSING = [
  "Confirmation écrite que l'enlèvement est assuré sur ce secteur (et dans quels délais habituels).",
  "Moyens logistiques confirmés : plateau, treuil, véhicule sans roues, sous-sol (hauteur maximale).",
  "Centre VHU de destination (raison sociale, numéro d'agrément/enregistrement).",
  "Conditions tarifaires ou de gratuité réellement appliquées sur ce secteur.",
  "Matière locale vérifiée : questions réellement reçues, contraintes d'accès observées lors d'interventions, photos autorisées.",
];

export const BDR = { code: "13", name: "Bouches-du-Rhône" } as const;
export const VAR = { code: "83", name: "Var" } as const;
export const AM = { code: "06", name: "Alpes-Maritimes" } as const;
export const VAUCLUSE = { code: "84", name: "Vaucluse" } as const;
export const AHP = { code: "04", name: "Alpes-de-Haute-Provence" } as const;
export const HA = { code: "05", name: "Hautes-Alpes" } as const;

/** Métadonnées SEO d'une page de ville. */
export function citySeo(name: string, cp: string, extra: string, secondary: string[]) {
  return {
    title: `Enlèvement d'épave gratuit à ${name} (${cp}) : épaviste ${name}`,
    description: `Enlèvement d'épave gratuit à ${name} pour tout véhicule complet et accessible. ${extra} Demande en ligne ou par téléphone.`,
    h1: `Enlèvement d'épave gratuit à ${name}`,
    intent: `Locale transactionnelle : faire enlever un véhicule à ${name}`,
    primaryQuery: `enlèvement épave ${name}`,
    secondaryQueries: secondary,
  };
}
