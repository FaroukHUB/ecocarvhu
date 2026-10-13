import type { CityLocal } from "./types";

/**
 * Contenu propre aux pages des villes historiques. Chaque page a son article,
 * ses situations et son ordre de sections : les pages ne doivent pas se ressembler.
 * Aucune promesse de délai ni de prix : uniquement des repères d'accès et d'organisation.
 */
export const cityLocal: Record<string, CityLocal> = {
  marseille: {
    variant: 1,
    guide: {
      title: "Faire enlever une épave dans une grande ville : ce qui change à Marseille",
      paragraphs: [
        "Dans une ville de seize arrondissements, deux véhicules hors d'usage ne posent presque jamais le même problème. Une voiture garée dans une rue du centre, une autre au deuxième sous-sol d'une résidence des quartiers sud, une troisième sur un terrain des quartiers nord : le matériel, le temps de chargement et les personnes à prévenir changent à chaque fois.",
        "C'est pour cela que le formulaire marseillais demande l'arrondissement et le type d'accès avant tout le reste. Le code postal suffit pour préparer l'itinéraire ; l'adresse précise n'est demandée qu'au moment de fixer le rendez-vous. Si le véhicule se trouve dans un parking collectif, prévenez le syndic ou le gardien : un badge ou une clé de portail oubliés suffisent à faire échouer un déplacement.",
        "Enfin, distinguez bien votre situation d'une procédure publique : un véhicule ayant reçu un avis de mise en fourrière ne relève plus d'un simple enlèvement privé. Dites-le dès la demande, l'équipe vous indiquera ce qui reste possible.",
      ],
    },
    situations: {
      title: "Trois cas que l'on rencontre souvent à Marseille",
      items: [
        {
          title: "La voiture au sous-sol de la résidence",
          text: "Hauteur sous plafond, rampe en courbe, niveau du véhicule : ces trois informations décident du matériel. Une photo de l'entrée du parking évite un déplacement pour rien.",
        },
        {
          title: "Le véhicule stationné depuis des mois dans la rue",
          text: "Précisez s'il gêne, s'il a reçu un avis des autorités et si les roues tournent encore. S'il a été déplacé par la fourrière, la démarche n'est plus la même.",
        },
        {
          title: "La voiture d'un parent qui a quitté son logement",
          text: "Héritage, déménagement en maison de retraite : indiquez qui détient la carte grise et qui peut signer. Les justificatifs sont vérifiés avant le rendez-vous.",
        },
      ],
    },
    nearby: ["Allauch", "Plan-de-Cuques", "La Penne-sur-Huveaune", "Aubagne", "Cassis"],
  },

  aubagne: {
    variant: 2,
    guide: {
      title: "Entre zones d'activités et maisons avec terrain : préparer l'enlèvement à Aubagne",
      paragraphs: [
        "Aubagne mêle un centre ancien, des quartiers résidentiels en maisons individuelles et de grandes zones d'activités. Chacun de ces lieux impose sa propre logistique : un portail étroit dans un quartier pavillonnaire, des horaires d'ouverture dans une zone d'activités, une circulation dense aux heures de pointe.",
        "Pour un garage ou une entreprise installés en zone d'activités, la question pratique est souvent celle du créneau : précisez les jours et heures où le site est ouvert et où quelqu'un peut remettre les clés. Pour un particulier, c'est plutôt l'état du terrain qui compte : sol meuble, pente, végétation qui gêne l'approche d'un camion plateau.",
        "Si plusieurs véhicules sont concernés sur un même site, décrivez-les dans une seule demande. Les professionnels qui ont régulièrement des véhicules à faire enlever peuvent aussi passer par le formulaire dédié aux professionnels.",
      ],
    },
    situations: {
      title: "Ce que l'on nous décrit le plus souvent à Aubagne",
      items: [
        {
          title: "Une voiture au fond d'un terrain",
          text: "Largeur du portail, nature du sol, distance jusqu'à la route : ces éléments disent si un plateau peut approcher ou s'il faut un treuil.",
        },
        {
          title: "Un véhicule laissé dans un atelier",
          text: "Véhicule abandonné par un client ou épave après expertise : le titulaire de la carte grise reste la personne qui cède, sauf procédure particulière.",
        },
        {
          title: "Plusieurs véhicules sur le même site",
          text: "Listez-les dans une seule demande avec leur état respectif : l'organisation d'un passage unique est étudiée.",
        },
      ],
    },
    nearby: ["Gémenos", "La Penne-sur-Huveaune", "Carnoux-en-Provence", "Roquefort-la-Bédoule", "Auriol"],
  },

  "la-ciotat": {
    variant: 3,
    guide: {
      title: "Véhicules immobilisés et propriétaires absents : le cas fréquent de La Ciotat",
      paragraphs: [
        "Ville du littoral où beaucoup de logements sont occupés une partie de l'année seulement, La Ciotat voit souvent des véhicules immobilisés de longue date : voiture d'une résidence secondaire, véhicule d'un parent, voiture qui n'a pas passé le contrôle technique et n'a plus bougé.",
        "Dans ces cas, deux sujets demandent d'être réglés avant de fixer une date. Le premier est l'état réel du véhicule après des mois sans rouler : pneus à plat, freins grippés, batterie vide. Le second est la présence d'une personne sur place, avec les clés et les documents. Si ce n'est pas vous, indiquez qui pourra être présent.",
        "Les parkings de résidence avec barrière ou badge sont nombreux sur la commune : précisez comment y entrer. Une photo du véhicule prise de chaque côté permet souvent de répondre sans visite préalable.",
      ],
    },
    situations: {
      title: "Situations typiques sur la commune",
      items: [
        {
          title: "La voiture de la résidence secondaire",
          text: "Vous n'êtes pas sur place toute l'année ? Indiquez vos périodes de présence ou la personne qui peut remettre les clés.",
        },
        {
          title: "Le véhicule qui n'a pas roulé depuis des années",
          text: "Pneus, freins et roues bloquées changent le chargement. Une photo de chaque côté suffit souvent pour le préparer.",
        },
        {
          title: "Le parking fermé par barrière",
          text: "Badge, télécommande, gardien : précisez qui ouvre et à quelles heures pour que le rendez-vous proposé soit réaliste.",
        },
      ],
    },
    nearby: ["Ceyreste", "Saint-Cyr-sur-Mer", "Cassis", "Roquefort-la-Bédoule"],
  },

  cassis: {
    variant: 1,
    guide: {
      title: "Rues étroites, pentes et voies privées : organiser un enlèvement à Cassis",
      paragraphs: [
        "Cassis est une petite commune entourée de collines, avec un centre aux rues étroites et de nombreux lotissements desservis par des voies privées. Le camion plateau qui vient chercher un véhicule a besoin d'espace pour manœuvrer et charger : c'est la donnée qui conditionne tout le reste.",
        "Avant le rendez-vous, l'équipe cherche donc à savoir si le véhicule est accessible directement depuis la voie publique, s'il faut ouvrir un portail ou un lotissement fermé, et si la rue est en pente. Une photo de la rue prise depuis le véhicule répond souvent à ces trois questions d'un coup.",
        "Comme le déplacement depuis les autres secteurs prend du temps, donner plusieurs disponibilités sur la semaine aide à proposer plus vite une date réaliste, éventuellement groupée avec d'autres demandes voisines.",
      ],
    },
    situations: {
      title: "Les points à vérifier à Cassis",
      items: [
        {
          title: "Un lotissement fermé",
          text: "Qui ouvre le portail, et à quelles heures ? Sans réponse, le rendez-vous ne peut pas être confirmé.",
        },
        {
          title: "Une rue en pente ou très étroite",
          text: "Une photo de la rue suffit : elle montre si le plateau peut se placer à côté du véhicule.",
        },
        {
          title: "Un véhicule sans roues ou incomplet",
          text: "La gratuité vise les véhicules complets. Un véhicule désossé est étudié au cas par cas, conditions annoncées avant le rendez-vous.",
        },
      ],
    },
    nearby: ["Carnoux-en-Provence", "Roquefort-la-Bédoule", "La Ciotat", "Marseille"],
  },

  nice: {
    variant: 2,
    guide: {
      title: "Une organisation à part pour les Alpes-Maritimes",
      paragraphs: [
        "Nice est éloignée des communes des Bouches-du-Rhône où se concentre l'essentiel des demandes. Chaque enlèvement y est donc organisé spécifiquement : le jour d'intervention, le trajet et le centre de destination sont confirmés pour votre dossier, pas annoncés à l'avance de façon générale.",
        "La ville compte de nombreux immeubles avec parkings souterrains, parfois sur plusieurs niveaux et avec des rampes en courbe. Le niveau, la hauteur maximale affichée à l'entrée et l'état des roues sont les trois informations à donner en priorité.",
        "La proximité de Monaco amène aussi des questions sur les véhicules immatriculés à l'étranger. Leur prise en charge suit d'autres règles : signalez le pays d'immatriculation dès la demande pour éviter toute mauvaise surprise.",
      ],
    },
    situations: {
      title: "Trois situations propres au secteur niçois",
      items: [
        {
          title: "Un parking sur plusieurs niveaux",
          text: "Indiquez le niveau, la hauteur maximale et si la rampe est droite ou en courbe : un véhicule qui ne roule plus ne se sort pas de la même façon.",
        },
        {
          title: "Un véhicule immatriculé à Monaco",
          text: "Les formalités relèvent de l'administration monégasque. Aucune intervention n'est proposée avant vérification de la procédure.",
        },
        {
          title: "Une commune voisine de Nice",
          text: "Donnez la commune et le code postal exacts : la faisabilité est vérifiée commune par commune dans les Alpes-Maritimes.",
        },
      ],
    },
    nearby: [],
  },
};
