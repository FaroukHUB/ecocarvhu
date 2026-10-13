import { z } from "zod";

/**
 * Schémas de validation serveur des demandes. Les noms de champs sont ceux des
 * attributs `name` des formulaires (src/components/forms).
 */

export const FORM_TYPES = ["enlevement", "piece", "rachat", "pro", "contact"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const FORM_TYPE_LABELS: Record<FormType, string> = {
  enlevement: "Enlèvement de véhicule",
  piece: "Recherche de pièce",
  rachat: "Étude de rachat",
  pro: "Demande professionnelle",
  contact: "Contact",
};

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `${max} caractères maximum.`)
    .transform((v) => v.replace(/\s+\n/g, "\n"));

const required = (max: number, msg = "Ce champ est obligatoire.") =>
  text(max).pipe(z.string().min(1, msg));

const optional = (max: number) =>
  text(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const choice = <T extends readonly [string, ...string[]]>(values: T, msg = "Choisissez une option.") =>
  z.enum(values, { error: msg });

const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined));

/** Téléphone français ou international, chiffres/espaces/points/tirets. */
export const phoneSchema = required(30, "Indiquez un numéro de téléphone.").refine(
  (v) => {
    const digits = v.replace(/[\s.\-()]/g, "");
    return /^(\+\d{8,15}|0\d{9})$/.test(digits);
  },
  { message: "Numéro de téléphone invalide (ex. 06 12 34 56 78)." },
);

const optionalPhone = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || /^(\+\d{8,15}|0\d{9})$/.test(v.replace(/[\s.\-()]/g, "")), {
    message: "Numéro de téléphone invalide.",
  });

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || z.email().safeParse(v).success, {
    message: "Adresse e-mail invalide.",
  });

/** Code postal français à 5 chiffres (Monaco : 98000). */
const postalCode = required(5, "Indiquez le code postal.").refine((v) => /^\d{5}$/.test(v), {
  message: "Code postal à 5 chiffres.",
});

const optionalPostalCode = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || /^\d{5}$/.test(v), { message: "Code postal à 5 chiffres." });

const year = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || (/^\d{4}$/.test(v) && +v >= 1900 && +v <= 2100), {
    message: "Année sur 4 chiffres.",
  });

const YES_NO_UNKNOWN = ["oui", "non", "ne-sait-pas"] as const;

/** Champs techniques communs à toutes les demandes. */
export const metaSchema = z.object({
  formType: z.enum(FORM_TYPES),
  /** Secteur d'origine (slug) ou vide. */
  sector: optional(40),
  /** Page d'origine (chemin uniquement, jamais de paramètres). */
  pagePath: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v && /^\/[a-z0-9\-/]*$/.test(v) ? v : undefined)),
});

export const pickupSchema = z.object({
  postalCode,
  city: required(80, "Indiquez la commune."),
  arrondissement: optional(5),
  locationDetail: optional(300),
  brand: required(60, "Indiquez la marque."),
  model: required(80, "Indiquez le modèle."),
  year,
  condition: choice(["panne", "accident", "non-roulant", "autre"] as const, "Indiquez l'état du véhicule."),
  conditionDetail: optional(500),
  wheels: choice(["oui", "non", "partiel"] as const, "Indiquez si les roues sont présentes."),
  keys: choice(YES_NO_UNKNOWN, "Indiquez si vous avez les clés."),
  movable: choice(YES_NO_UNKNOWN, "Indiquez si le véhicule peut être déplacé."),
  access: choice(
    ["rue", "parking-ouvert", "parking-ferme", "sous-sol", "garage-box", "cour-terrain", "difficile", "autre"] as const,
    "Indiquez le type d'accès.",
  ),
  accessDetail: optional(600),
  registrationDoc: choice(
    ["oui", "perdue", "volee", "etrangere", "non"] as const,
    "Indiquez la situation de la carte grise.",
  ),
  holder: choice(["moi", "proche", "entreprise", "autre"] as const, "Indiquez qui est titulaire."),
  pledge: optionalChoice(YES_NO_UNKNOWN),
  name: required(120, "Indiquez votre nom."),
  phone: phoneSchema,
  email: optionalEmail,
  availability: optional(300),
  comment: optional(1500),
});

export const partSchema = z
  .object({
    brand: required(60, "Indiquez la marque."),
    model: required(80, "Indiquez le modèle."),
    year,
    engine: optional(120),
    fuel: optionalChoice(["essence", "diesel", "hybride", "electrique", "gpl", "autre"] as const),
    partName: optional(200),
    partDescription: optional(1500),
    oemRef: optional(80),
    plate: optional(12),
    quantity: optional(10),
    postalCode: optionalPostalCode,
    name: required(120, "Indiquez votre nom."),
    phone: optionalPhone,
    email: optionalEmail,
    comment: optional(1000),
  })
  .superRefine((v, ctx) => {
    if (!v.partName && !v.partDescription) {
      ctx.addIssue({
        code: "custom",
        path: ["partDescription"],
        message: "Indiquez le nom de la pièce ou décrivez votre besoin.",
      });
    }
    if (!v.phone && !v.email) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Indiquez un téléphone ou un e-mail pour la réponse.",
      });
    }
  });

export const buybackSchema = z.object({
  brand: required(60, "Indiquez la marque."),
  model: required(80, "Indiquez le modèle."),
  year: year.refine((v) => v !== undefined, { message: "Indiquez l'année." }),
  fuel: optionalChoice(["essence", "diesel", "hybride", "electrique", "gpl", "autre"] as const),
  mileage: required(12, "Indiquez le kilométrage.").refine((v) => /^\d[\d\s]{0,10}$/.test(v), {
    message: "Kilométrage en chiffres.",
  }),
  mechanical: choice(
    ["roule", "roule-defaut", "ne-roule-pas", "moteur-hs"] as const,
    "Indiquez l'état mécanique.",
  ),
  damage: optional(1000),
  keys: choice(YES_NO_UNKNOWN, "Indiquez si vous avez les clés."),
  registrationDoc: choice(["oui", "non", "perdue"] as const, "Indiquez la situation de la carte grise."),
  postalCode,
  city: required(80, "Indiquez la commune."),
  name: required(120, "Indiquez votre nom."),
  phone: phoneSchema,
  email: optionalEmail,
  comment: optional(1500),
});

export const proSchema = z
  .object({
    company: required(150, "Indiquez le nom de l'entreprise."),
    contactName: required(120, "Indiquez le nom de l'interlocuteur."),
    activity: optionalChoice(["garage", "carrosserie", "depannage", "flotte", "autre"] as const),
    requestType: choice(
      ["pieces", "enlevements", "partenariat", "autre"] as const,
      "Indiquez l'objet de la demande.",
    ),
    references: optional(4000),
    message: optional(2000),
    postalCode: optionalPostalCode,
    phone: phoneSchema,
    email: optionalEmail,
  })
  .superRefine((v, ctx) => {
    if (!v.references && !v.message) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Décrivez votre demande ou listez les références.",
      });
    }
  });

export const contactSchema = z
  .object({
    name: required(120, "Indiquez votre nom."),
    phone: optionalPhone,
    email: optionalEmail,
    subject: optional(150),
    message: required(3000, "Écrivez votre message."),
  })
  .superRefine((v, ctx) => {
    if (!v.phone && !v.email) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Indiquez un téléphone ou un e-mail pour la réponse.",
      });
    }
  });

export const schemasByType = {
  enlevement: pickupSchema,
  piece: partSchema,
  rachat: buybackSchema,
  pro: proSchema,
  contact: contactSchema,
} as const;

/** Types autorisant les photos et nombre maximal de fichiers. */
export const FILE_POLICY: Record<FormType, { field: string; maxFiles: number } | null> = {
  enlevement: { field: "photos", maxFiles: 4 },
  piece: { field: "photos", maxFiles: 3 },
  rachat: { field: "photos", maxFiles: 6 },
  pro: null,
  contact: null,
};

/** Libellés lisibles des champs, pour l'e-mail transmis à l'entreprise. */
export const FIELD_LABELS: Record<string, string> = {
  postalCode: "Code postal",
  city: "Commune",
  arrondissement: "Arrondissement",
  locationDetail: "Précision sur l'emplacement",
  brand: "Marque",
  model: "Modèle",
  year: "Année",
  condition: "État",
  conditionDetail: "Précision sur l'état",
  wheels: "Roues présentes",
  keys: "Clés disponibles",
  movable: "Véhicule déplaçable",
  access: "Accès",
  accessDetail: "Précision sur l'accès",
  registrationDoc: "Carte grise",
  holder: "Titulaire de la carte grise",
  pledge: "Gage connu",
  name: "Nom",
  phone: "Téléphone",
  email: "E-mail",
  availability: "Disponibilités souhaitées (non confirmées)",
  comment: "Commentaire",
  engine: "Motorisation",
  partName: "Pièce recherchée",
  partDescription: "Description du besoin",
  oemRef: "Référence constructeur",
  plate: "Immatriculation",
  quantity: "Quantité",
  fuel: "Énergie",
  mileage: "Kilométrage",
  mechanical: "État mécanique",
  damage: "Dommages",
  company: "Entreprise",
  contactName: "Interlocuteur",
  activity: "Activité",
  requestType: "Objet",
  references: "Références",
  message: "Message",
  subject: "Sujet",
};
