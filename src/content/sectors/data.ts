import type { Sector } from "./types";

/**
 * Secteurs. Les statuts reflètent la situation au 13/10/2026 :
 * cibles souhaitées, service et contenu NON encore confirmés.
 * Pour publier un secteur : passer les quatre statuts à `true` après
 * vérification (voir docs/CONTENT-VALIDATION.md).
 */

import { CITY_MISSING, CONFIRMED } from "./shared";
import { extraCities } from "./cities-extra";
import { cityLocal } from "./local";

const baseSectors: Sector[] = [
  {
    slug: "paca",
    name: "Provence-Alpes-Côte d'Azur",
    kind: "region",
    locative: "en Provence-Alpes-Côte d'Azur",
    postalCodes: [],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit en PACA : épaviste dans les 6 départements",
      description:
        "Enlèvement d'épave gratuit dans les Bouches-du-Rhône, le Var, les Alpes-Maritimes, le Vaucluse, les Alpes-de-Haute-Provence et les Hautes-Alpes, pour tout véhicule complet.",
      h1: "Enlèvement d'épave gratuit en Provence-Alpes-Côte d'Azur",
      intent: "Locale régionale : savoir si le service couvre sa commune",
      primaryQuery: "épaviste PACA",
      secondaryQueries: [
        "enlèvement épave Bouches-du-Rhône",
        "enlèvement épave Var",
        "enlèvement épave Alpes-Maritimes",
        "casse auto PACA pièces",
      ],
    },
    lead:
      "La région compte six départements aux réalités très différentes : grandes agglomérations du littoral, communes de l'arrière-pays, vallées alpines. Plutôt que d'afficher une couverture uniforme, chaque demande est qualifiée à partir de la commune et de l'accès au véhicule, puis confirmée par l'équipe.",
    accessTips: [
      "Indiquez toujours le code postal : il permet de vérifier rapidement si le secteur est desservi.",
      "En zone de montagne ou sur une route étroite, précisez si un camion plateau peut s'approcher et s'il y a une pente.",
      "En résidence, précisez s'il faut un badge, un code ou la présence du gardien.",
    ],
    localFacts: [
      {
        text: "La région Provence-Alpes-Côte d'Azur regroupe six départements : Alpes-de-Haute-Provence (04), Hautes-Alpes (05), Alpes-Maritimes (06), Bouches-du-Rhône (13), Var (83) et Vaucluse (84).",
        source: "Découpage administratif officiel",
      },
    ],
    faq: [
      {
        q: "Ma commune n'est pas citée sur le site : puis-je faire une demande ?",
        a: "Oui. Les villes mises en avant ne sont pas une liste fermée. Indiquez votre code postal dans le formulaire : l'équipe vous dit si l'enlèvement est possible et à quelles conditions.",
      },
      {
        q: "Le délai d'intervention est-il le même partout dans la région ?",
        a: "Non. Il dépend de la distance, de l'accès et du planning. Aucun délai n'est promis avant l'étude de la demande ; il vous est communiqué au moment de la confirmation.",
      },
      {
        q: "Le véhicule est immatriculé dans un autre département : est-ce un problème ?",
        a: "Non. Le certificat d'immatriculation est national ; c'est le lieu où se trouve le véhicule qui compte pour organiser l'enlèvement.",
      },
    ],
    form: { city: "" },
    missing: [
      "Liste des départements et communes où l'enlèvement est réellement assuré.",
      "Centre(s) VHU de destination et leur numéro d'agrément/enregistrement.",
      "Conditions tarifaires ou de gratuité par zone.",
    ],
    related: ["marseille", "aix-en-provence", "toulon", "aubagne", "la-ciotat", "cassis", "nice"],
  },
  {
    slug: "marseille",
    name: "Marseille",
    kind: "city",
    locative: "à Marseille",
    department: { code: "13", name: "Bouches-du-Rhône" },
    postalCodes: [
      "13001", "13002", "13003", "13004", "13005", "13006", "13007", "13008",
      "13009", "13010", "13011", "13012", "13013", "13014", "13015", "13016",
    ],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit à Marseille : épaviste Marseille (13)",
      description:
        "Enlèvement d'épave gratuit à Marseille pour tout véhicule complet : voiture en panne, accidentée ou hors d'usage, dans tous les arrondissements. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit à Marseille",
      intent: "Locale transactionnelle : faire enlever un véhicule à Marseille",
      primaryQuery: "enlèvement épave Marseille",
      secondaryQueries: [
        "épaviste Marseille",
        "enlèvement voiture Marseille",
        "enlèvement épave gratuit Marseille",
        "pièces auto occasion Marseille",
      ],
    },
    lead:
      "À Marseille, la question décisive n'est pas seulement « où » mais « comment accéder au véhicule » : rue, parking de résidence, box ou sous-sol. Le formulaire vous demande l'arrondissement et le type d'accès pour que l'équipe vérifie la faisabilité avant de vous rappeler.",
    accessTips: [
      "Choisissez l'arrondissement (13001 à 13016) : il sert à organiser l'itinéraire, rien de plus.",
      "Sous-sol ou parking couvert : indiquez la hauteur sous plafond si elle est affichée à l'entrée et le niveau où se trouve le véhicule.",
      "Véhicule sur la voie publique : précisez s'il est garé normalement, s'il gêne, ou s'il a déjà reçu un avis des autorités.",
      "Une photo de l'accès (entrée du parking, rampe, portail) aide autant qu'une photo du véhicule.",
    ],
    localFacts: [
      {
        text: "Marseille est découpée en 16 arrondissements, avec un code postal par arrondissement (13001 à 13016).",
        source: "Découpage administratif officiel / La Poste",
      },
      {
        text: "Marseille fait partie du département des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel",
      },
    ],
    faq: [
      {
        q: "Faut-il préciser l'arrondissement ?",
        a: "C'est recommandé : le code postal de l'arrondissement suffit. L'adresse exacte n'est demandée qu'au moment de fixer le rendez-vous.",
      },
      {
        q: "Le véhicule est dans un parking souterrain de résidence : est-ce possible ?",
        a: "Cela dépend de la hauteur, de la rampe et de l'état du véhicule (roues, freins). Décrivez l'accès et ajoutez une photo de l'entrée : la faisabilité est confirmée avant tout déplacement.",
      },
      {
        q: "Le véhicule a reçu un avis de mise en fourrière : que faire ?",
        a: "Signalez-le dans votre demande avec la date indiquée sur l'avis. Une procédure engagée par les autorités ne se règle pas par un simple enlèvement privé : l'équipe vous indiquera si une intervention reste possible.",
      },
      {
        q: "Je cherche aussi une pièce pour un autre véhicule : faut-il deux demandes ?",
        a: "Oui, de préférence : la demande de pièce contient les questions de compatibilité (motorisation, référence) qui ne figurent pas dans le formulaire d'enlèvement.",
      },
    ],
    form: { city: "Marseille", askArrondissement: true },
    missing: CITY_MISSING,
    related: ["allauch", "plan-de-cuques", "la-penne-sur-huveaune", "aix-en-provence", "aubagne", "paca"],
  },
  {
    slug: "aubagne",
    name: "Aubagne",
    kind: "city",
    locative: "à Aubagne",
    department: { code: "13", name: "Bouches-du-Rhône" },
    postalCodes: ["13400"],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit à Aubagne (13400) : épaviste Aubagne",
      description:
        "Enlèvement d'épave gratuit à Aubagne pour tout véhicule complet : voiture en panne, accidentée ou hors d'usage. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit à Aubagne",
      intent: "Locale transactionnelle : faire enlever un véhicule à Aubagne",
      primaryQuery: "enlèvement épave Aubagne",
      secondaryQueries: ["épaviste Aubagne", "enlèvement voiture Aubagne", "casse auto Aubagne pièces"],
    },
    lead:
      "Maison avec cour, terrain, parking d'immeuble ou zone d'activités : à Aubagne comme ailleurs, le bon déroulement d'un enlèvement se joue sur l'accès. Décrivez-le précisément, la réponse sera plus rapide et plus fiable.",
    accessTips: [
      "Terrain ou cour privée : indiquez la largeur du portail si elle est réduite et si le sol est stabilisé.",
      "Zone d'activités ou garage : précisez les horaires d'ouverture du site pour que le rendez-vous proposé soit réaliste.",
      "Véhicule bloqué (frein à main grippé, roue manquante) : signalez-le, l'équipement à prévoir n'est pas le même.",
    ],
    localFacts: [
      {
        text: "Aubagne (code postal 13400) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Le véhicule est sur un terrain privé qui n'est pas le mien : est-ce possible ?",
        a: "Précisez qui est propriétaire du terrain et qui est titulaire de la carte grise. L'accord du titulaire reste nécessaire pour céder le véhicule ; les cas d'abandon suivent des règles particulières.",
      },
      {
        q: "Un véhicule sans clés peut-il être enlevé ?",
        a: "Souvent oui, mais l'absence de clés empêche parfois de débloquer la direction ou la boîte de vitesses. Indiquez-le pour que l'équipe prévoie le bon matériel.",
      },
      {
        q: "Puis-je demander une pièce pour mon autre voiture en même temps ?",
        a: "Faites une demande de pièce séparée : elle comporte les questions de compatibilité nécessaires.",
      },
    ],
    form: { city: "Aubagne", postalCode: "13400" },
    missing: [
      ...CITY_MISSING,
      "Confirmer que la ville visée par le brief (« Auban ») est bien Aubagne (13400).",
    ],
    related: ["gemenos", "la-penne-sur-huveaune", "auriol", "carnoux-en-provence", "marseille", "paca"],
  },
  {
    slug: "la-ciotat",
    name: "La Ciotat",
    kind: "city",
    locative: "à La Ciotat",
    department: { code: "13", name: "Bouches-du-Rhône" },
    postalCodes: ["13600"],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit à La Ciotat (13600) : épaviste La Ciotat",
      description:
        "Enlèvement d'épave gratuit à La Ciotat pour tout véhicule complet : voiture en panne, accidentée ou immobilisée. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit à La Ciotat",
      intent: "Locale transactionnelle : faire enlever un véhicule à La Ciotat",
      primaryQuery: "enlèvement épave La Ciotat",
      secondaryQueries: ["épaviste La Ciotat", "enlèvement voiture La Ciotat"],
    },
    lead:
      "Résidence secondaire, véhicule immobilisé depuis longtemps, voiture d'un proche : beaucoup de demandes concernent des véhicules qui n'ont pas roulé depuis des mois. Le formulaire vous aide à faire le point sur l'état réel et les documents avant d'organiser l'enlèvement.",
    accessTips: [
      "Véhicule immobilisé depuis longtemps : indiquez si les pneus sont à plat et si les roues tournent encore.",
      "Si vous n'êtes pas sur place, dites-le : il faudra organiser la remise des clés et des documents.",
      "Parking de résidence : précisez s'il est ouvert, fermé par barrière ou par badge.",
    ],
    localFacts: [
      {
        text: "La Ciotat (code postal 13600) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Je n'habite pas à La Ciotat toute l'année : faut-il être présent le jour de l'enlèvement ?",
        a: "Une personne doit pouvoir remettre les clés et les documents et donner accès au véhicule. Si ce n'est pas vous, indiquez-le dans la demande : une solution est recherchée avec vous avant de fixer la date.",
      },
      {
        q: "Les pneus sont à plat et le véhicule n'a pas bougé depuis des années : est-ce un problème ?",
        a: "Pas forcément, mais l'équipe doit le savoir pour prévoir le chargement. Une photo de chaque côté du véhicule est utile.",
      },
      {
        q: "Quels documents préparer ?",
        a: "Principalement la carte grise barrée et signée, la déclaration de cession et un certificat de situation administrative récent. Le détail et les cas particuliers sont expliqués plus bas sur cette page.",
      },
    ],
    form: { city: "La Ciotat", postalCode: "13600" },
    missing: CITY_MISSING,
    related: ["ceyreste", "saint-cyr-sur-mer", "cassis", "paca"],
  },
  {
    slug: "cassis",
    name: "Cassis",
    kind: "city",
    locative: "à Cassis",
    department: { code: "13", name: "Bouches-du-Rhône" },
    postalCodes: ["13260"],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit à Cassis (13260) : épaviste Cassis",
      description:
        "Enlèvement d'épave gratuit à Cassis pour tout véhicule complet : voiture en panne, accidentée ou hors d'usage. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit à Cassis",
      intent: "Locale transactionnelle : faire enlever un véhicule à Cassis",
      primaryQuery: "enlèvement épave Cassis",
      secondaryQueries: ["épaviste Cassis", "enlèvement voiture Cassis"],
    },
    lead:
      "Pour une commune de taille modeste, la première question est simple : le service se déplace-t-il jusqu'ici, et dans quelles conditions ? Votre demande permet d'y répondre précisément, sans promesse générale.",
    accessTips: [
      "Voie étroite ou en pente : indiquez-le, avec une photo de la rue si possible.",
      "Accès soumis à autorisation (voie privée, lotissement fermé) : précisez qui peut ouvrir.",
      "Indiquez vos disponibilités sur plusieurs jours : cela facilite l'organisation d'un déplacement groupé.",
    ],
    localFacts: [
      {
        text: "Cassis (code postal 13260) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Intervenez-vous à Cassis ?",
        a: "Cassis fait partie des secteurs visés. Chaque demande est confirmée individuellement : vous savez avant le rendez-vous si l'enlèvement est possible, quand, et à quelles conditions.",
      },
      {
        q: "Pourquoi donner plusieurs disponibilités ?",
        a: "Un créneau demandé n'est pas un rendez-vous confirmé. Plusieurs possibilités permettent de vous proposer plus vite une date réaliste.",
      },
      {
        q: "Le véhicule est-il repris gratuitement ?",
        a: "La remise d'un véhicule complet à un centre VHU est gratuite, mais le transport dépend de l'accès, de l'état et de la distance. Les conditions vous sont annoncées avant le rendez-vous.",
      },
    ],
    form: { city: "Cassis", postalCode: "13260" },
    missing: CITY_MISSING,
    related: ["carnoux-en-provence", "roquefort-la-bedoule", "la-ciotat", "paca"],
  },
  {
    slug: "nice",
    name: "Nice",
    kind: "city",
    locative: "à Nice",
    department: { code: "06", name: "Alpes-Maritimes" },
    postalCodes: ["06000", "06100", "06200", "06300"],
    status: { ...CONFIRMED },
    seo: {
      title: "Enlèvement d'épave gratuit à Nice : épaviste Nice (06)",
      description:
        "Enlèvement d'épave gratuit à Nice et dans les Alpes-Maritimes pour tout véhicule complet : voiture en panne, accidentée ou hors d'usage. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit à Nice",
      intent: "Locale transactionnelle : faire enlever un véhicule à Nice",
      primaryQuery: "enlèvement épave Nice",
      secondaryQueries: ["épaviste Nice", "enlèvement voiture Nice", "épaviste Alpes-Maritimes"],
    },
    lead:
      "Nice se trouve dans les Alpes-Maritimes, à bonne distance des autres villes visées dans les Bouches-du-Rhône. L'organisation d'un enlèvement y est donc confirmée séparément : votre demande précise le quartier ou le code postal et l'accès, pour une réponse fiable.",
    accessTips: [
      "Indiquez le code postal (06000, 06100, 06200 ou 06300) ou la commune voisine si le véhicule est hors de Nice.",
      "Parking en sous-sol : précisez le niveau, la hauteur et la présence d'une rampe en courbe.",
      "Véhicule immatriculé à l'étranger : signalez-le, les démarches ne sont pas les mêmes.",
    ],
    localFacts: [
      {
        text: "Nice est une commune des Alpes-Maritimes (06) ; elle compte plusieurs codes postaux (06000, 06100, 06200, 06300).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Intervenez-vous dans les communes autour de Nice ?",
        a: "Indiquez la commune et le code postal dans la demande : la faisabilité est vérifiée au cas par cas dans les Alpes-Maritimes.",
      },
      {
        q: "Le véhicule est immatriculé à l'étranger : est-ce possible ?",
        a: "Les démarches ne sont pas les mêmes qu'avec une carte grise française. Indiquez le pays d'immatriculation dans la demande : la procédure applicable est vérifiée avant toute intervention.",
      },
      {
        q: "Combien de temps faut-il pour obtenir une réponse ?",
        a: "Le délai de réponse dépend du volume de demandes ; il n'est pas garanti. Pour une situation urgente, appelez directement.",
      },
    ],
    form: { city: "Nice" },
    missing: [
      ...CITY_MISSING,
      "Organisation spécifique aux Alpes-Maritimes (distance depuis le centre de destination, jours d'intervention).",
    ],
    related: ["paca"],
  },
];

/** Secteurs historiques mis en avant dans les listes courtes. */
const FEATURED = new Set(["paca", "marseille", "aubagne", "la-ciotat", "cassis", "nice"]);

export const sectors: Sector[] = [...baseSectors, ...extraCities].map((s) => ({
  ...s,
  featured: FEATURED.has(s.slug),
  local: cityLocal[s.slug] ?? s.local,
}));

/** Départements de la cible régionale (pas de pages dédiées à ce stade). */
export const departments = [
  { code: "13", name: "Bouches-du-Rhône", serviceConfirmed: false },
  { code: "83", name: "Var", serviceConfirmed: false },
  { code: "06", name: "Alpes-Maritimes", serviceConfirmed: false },
  { code: "84", name: "Vaucluse", serviceConfirmed: false },
  { code: "04", name: "Alpes-de-Haute-Provence", serviceConfirmed: false },
  { code: "05", name: "Hautes-Alpes", serviceConfirmed: false },
] as const;
