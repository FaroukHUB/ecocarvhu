/**
 * Espace conseils : peu de guides, chacun répondant à une question qui freine
 * réellement la demande. Statut : rédigés, en attente de relecture.
 */

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  /** Date de dernière révision humaine (sert de lastmod). */
  reviewedOn: string | null;
  status: { contentVerified: boolean; publicationApproved: boolean };
  sections: GuideSection[];
  sources: { label: string; url: string }[];
  cta: { label: string; href: string };
}

export const guides: Guide[] = [
  {
    slug: "enlevement-acces-difficile",
    title: "Enlèvement d'un véhicule en sous-sol ou d'accès difficile : comment le décrire",
    description:
      "Sous-sol, box, cour étroite, pente, véhicule sans roues : les informations et photos qui permettent de vérifier si un enlèvement est faisable avant de se déplacer.",
    h1: "Demander un enlèvement dans un lieu difficile d'accès",
    summary: "Les informations qui évitent un déplacement inutile quand l'accès au véhicule est compliqué.",
    reviewedOn: null,
    status: { contentVerified: false, publicationApproved: false },
    sections: [
      {
        heading: "Ce qui rend un enlèvement difficile",
        paragraphs: [
          "Un camion plateau a besoin de place pour manœuvrer et charger. Un sous-sol bas, une rampe en courbe, un portail étroit, un véhicule sans roues ou au frein bloqué demandent un matériel ou une méthode spécifique. Ce n'est pas forcément impossible, mais il faut le savoir avant.",
        ],
      },
      {
        heading: "Les informations à donner",
        list: [
          "Le type d'emplacement : rue, parking ouvert, parking fermé, sous-sol, box, cour ou terrain.",
          "Pour un sous-sol : le niveau, la hauteur maximale affichée à l'entrée, la forme de la rampe.",
          "L'état du véhicule : roues présentes et gonflées, direction et frein à main libres ou bloqués, clés disponibles.",
          "Les contraintes d'accès : badge, code, horaires, présence obligatoire du gardien.",
        ],
      },
      {
        heading: "Les photos les plus utiles",
        list: [
          "Le véhicule entier, de trois quarts avant et arrière.",
          "L'entrée de l'emplacement (portail, rampe, panneau de hauteur).",
          "Le chemin entre le véhicule et la rue s'il y a des obstacles.",
        ],
      },
      {
        heading: "Et ensuite",
        paragraphs: [
          "L'équipe étudie ces éléments et vous indique si l'enlèvement est faisable, avec quel matériel et à quelles conditions. Le créneau que vous proposez n'est confirmé qu'après cette étape.",
        ],
      },
    ],
    sources: [],
    cta: { label: "Décrire mon véhicule et son accès", href: "/enlevement-epave#demande" },
  },
  {
    slug: "identifier-reference-piece",
    title: "Comment trouver la référence d'une pièce auto",
    description:
      "Où lire la référence constructeur d'une pièce, quelles informations du véhicule relever et comment faire une demande même sans connaître le nom exact de la pièce.",
    h1: "Identifier la référence d'une pièce auto",
    summary: "Les bons repères pour décrire une pièce et éviter une erreur de compatibilité.",
    reviewedOn: null,
    status: { contentVerified: false, publicationApproved: false },
    sections: [
      {
        heading: "Les informations du véhicule à relever",
        paragraphs: [
          "Deux véhicules du même modèle peuvent recevoir des pièces différentes selon l'année, la motorisation ou la finition. La carte grise contient la plupart des informations utiles : marque, dénomination commerciale, date de première immatriculation, type et puissance.",
        ],
        list: [
          "Marque, modèle et année de première mise en circulation.",
          "Motorisation (cylindrée, carburant, puissance) et type de boîte de vitesses.",
          "Pour une pièce de carrosserie : la couleur et, si possible, le code peinture.",
        ],
      },
      {
        heading: "Où se trouve la référence d'une pièce",
        paragraphs: [
          "Beaucoup de pièces portent une étiquette ou un marquage gravé : boîtier électronique, alternateur, démarreur, optique, compresseur… La référence constructeur est généralement une suite de chiffres et de lettres. Une photo nette de cette étiquette vaut mieux qu'une recopie approximative.",
        ],
      },
      {
        heading: "Vous ne connaissez pas le nom de la pièce ?",
        paragraphs: [
          "Ce n'est pas un problème. Décrivez ce que vous constatez (« le cache sous le moteur côté passager est arraché », « le bouton de vitre avant gauche ne répond plus ») et ajoutez une photo de l'emplacement. L'équipe identifie la pièce puis vérifie sa disponibilité et sa compatibilité avant de vous proposer quoi que ce soit.",
        ],
      },
    ],
    sources: [],
    cta: { label: "Pièces auto d'occasion", href: "/pieces-auto-occasion" },
  },
  {
    slug: "etapes-prise-en-charge-vhu",
    title: "Les étapes de la prise en charge d'un véhicule hors d'usage",
    description:
      "De la demande en ligne au certificat de destruction : qui fait quoi, ce qui est confirmé à chaque étape et ce que devient le véhicule dans un centre VHU.",
    h1: "Comprendre les étapes de prise en charge d'un VHU",
    summary: "Qui fait quoi, de votre demande jusqu'au certificat de destruction.",
    reviewedOn: null,
    status: { contentVerified: false, publicationApproved: false },
    sections: [
      {
        heading: "1. La demande",
        paragraphs: [
          "Vous décrivez le véhicule, son état, son accès et les documents dont vous disposez. Cette demande n'engage personne : elle ne vaut ni rendez-vous ni autorisation de destruction.",
        ],
      },
      {
        heading: "2. La qualification",
        paragraphs: [
          "L'équipe vérifie la faisabilité (secteur, accès, matériel) et les points administratifs (titulaire, gage, véhicule étranger). Elle vous communique les conditions de l'enlèvement, puis propose un rendez-vous.",
        ],
      },
      {
        heading: "3. L'enlèvement",
        paragraphs: [
          "Le jour convenu, les documents sont vérifiés et remis, puis le véhicule est chargé et transporté vers le centre VHU.",
        ],
      },
      {
        heading: "4. Le traitement par le centre VHU",
        paragraphs: [
          "Le centre VHU dépollue le véhicule (fluides, batterie, éléments dangereux), démonte les pièces réutilisables puis oriente le reste vers les filières de recyclage. Il délivre le certificat de destruction.",
        ],
      },
      {
        heading: "5. Après la destruction",
        paragraphs: [
          "Conservez le certificat de destruction et prévenez votre assureur pour résilier le contrat du véhicule.",
        ],
      },
    ],
    sources: [
      {
        label: "Ministère de la Transition écologique — Véhicules hors d'usage",
        url: "https://www.ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu",
      },
      {
        label: "Service-Public.fr — Véhicule à détruire",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1468",
      },
    ],
    cta: { label: "Voir le rôle du centre VHU", href: "/centre-vhu" },
  },
];
