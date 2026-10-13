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
