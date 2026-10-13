/** Options des champs à choix : partagées par les formulaires et l'e-mail transmis. */

export type Option = { value: string; label: string; hint?: string };

export const CONDITION_OPTIONS: Option[] = [
  { value: "panne", label: "En panne" },
  { value: "accident", label: "Accidenté" },
  { value: "non-roulant", label: "Non roulant / immobilisé" },
  { value: "autre", label: "Autre" },
];

export const WHEELS_OPTIONS: Option[] = [
  { value: "oui", label: "Oui, les 4 roues" },
  { value: "partiel", label: "Il en manque" },
  { value: "non", label: "Aucune roue" },
];

export const YES_NO_UNKNOWN_OPTIONS: Option[] = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "ne-sait-pas", label: "Je ne sais pas" },
];

export const MOVABLE_OPTIONS: Option[] = [
  { value: "oui", label: "Oui", hint: "Il roule ou peut être poussé" },
  { value: "non", label: "Non", hint: "Bloqué, freins grippés, pas de roues…" },
  { value: "ne-sait-pas", label: "Je ne sais pas" },
];

export const ACCESS_OPTIONS: Option[] = [
  { value: "rue", label: "Dans la rue" },
  { value: "parking-ouvert", label: "Parking ouvert" },
  { value: "parking-ferme", label: "Parking fermé (badge, barrière)" },
  { value: "sous-sol", label: "Sous-sol" },
  { value: "garage-box", label: "Garage ou box" },
  { value: "cour-terrain", label: "Cour ou terrain privé" },
  { value: "difficile", label: "Accès difficile (pente, passage étroit…)" },
  { value: "autre", label: "Autre" },
];

export const REGISTRATION_DOC_OPTIONS: Option[] = [
  { value: "oui", label: "Oui, je l'ai" },
  { value: "perdue", label: "Perdue" },
  { value: "volee", label: "Volée" },
  { value: "etrangere", label: "Immatriculation étrangère" },
  { value: "non", label: "Non / je ne sais pas" },
];

export const HOLDER_OPTIONS: Option[] = [
  { value: "moi", label: "Moi" },
  { value: "proche", label: "Un proche (héritage, famille…)" },
  { value: "entreprise", label: "Une entreprise" },
  { value: "autre", label: "Autre situation" },
];

export const FUEL_OPTIONS: Option[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Électrique" },
  { value: "gpl", label: "GPL" },
  { value: "autre", label: "Autre" },
];

export const MECHANICAL_OPTIONS: Option[] = [
  { value: "roule", label: "Roule normalement" },
  { value: "roule-defaut", label: "Roule avec un défaut" },
  { value: "ne-roule-pas", label: "Ne roule pas" },
  { value: "moteur-hs", label: "Moteur ou boîte hors service" },
];

export const BUYBACK_DOC_OPTIONS: Option[] = [
  { value: "oui", label: "Oui, à mon nom" },
  { value: "perdue", label: "Perdue" },
  { value: "non", label: "Non / autre situation" },
];

export const PRO_ACTIVITY_OPTIONS: Option[] = [
  { value: "garage", label: "Garage / mécanique" },
  { value: "carrosserie", label: "Carrosserie" },
  { value: "depannage", label: "Dépannage / remorquage" },
  { value: "flotte", label: "Gestionnaire de flotte" },
  { value: "autre", label: "Autre" },
];

export const PRO_REQUEST_OPTIONS: Option[] = [
  { value: "pieces", label: "Pièces (une ou plusieurs références)" },
  { value: "enlevements", label: "Enlèvement de plusieurs véhicules" },
  { value: "partenariat", label: "Partenariat" },
  { value: "autre", label: "Autre" },
];

export const VALUE_LABELS: Record<string, Option[]> = {
  condition: CONDITION_OPTIONS,
  wheels: WHEELS_OPTIONS,
  keys: YES_NO_UNKNOWN_OPTIONS,
  movable: MOVABLE_OPTIONS,
  pledge: YES_NO_UNKNOWN_OPTIONS,
  access: ACCESS_OPTIONS,
  registrationDoc: [...REGISTRATION_DOC_OPTIONS, ...BUYBACK_DOC_OPTIONS],
  holder: HOLDER_OPTIONS,
  fuel: FUEL_OPTIONS,
  mechanical: MECHANICAL_OPTIONS,
  activity: PRO_ACTIVITY_OPTIONS,
  requestType: PRO_REQUEST_OPTIONS,
};

export function labelFor(field: string, value: string): string {
  return VALUE_LABELS[field]?.find((o) => o.value === value)?.label ?? value;
}

/** Clé du module "état et accès" (réponses reprises par le formulaire d'enlèvement). */
export const VEHICLE_CHECK_KEY = "ecocar:vehicle-check";

export const MARSEILLE_ARRONDISSEMENTS: Option[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1;
  return { value: `130${String(n).padStart(2, "0")}`, label: n === 1 ? "1er" : `${n}e` };
});
