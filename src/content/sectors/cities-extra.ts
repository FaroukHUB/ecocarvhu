import type { Sector } from "./types";
import { BDR, CITY_MISSING, CONFIRMED, VAR, citySeo as seo } from "./shared";

/**
 * Villes ajoutées le 13/10/2026 à la demande du porteur de projet (service confirmé).
 * Chaque page a son propre angle : habitat, accès, organisation. Les faits locaux
 * se limitent à des données administratives vérifiables (département, codes postaux,
 * intercommunalité) ; aucun délai ni prix n'est annoncé.
 */
const AMP = "Métropole Aix-Marseille-Provence";

export const extraCities: Sector[] = [
  {
    slug: "aix-en-provence",
    name: "Aix-en-Provence",
    kind: "city",
    locative: "à Aix-en-Provence",
    department: BDR,
    postalCodes: ["13080", "13090", "13100", "13290", "13540"],
    status: { ...CONFIRMED },
    seo: seo(
      "Aix-en-Provence",
      "13090",
      "Centre-ville, quartiers résidentiels, Les Milles, Luynes ou Puyricard : l'accès est vérifié avant tout déplacement.",
      ["épaviste Aix-en-Provence", "enlèvement voiture Aix-en-Provence", "casse auto Aix-en-Provence pièces"],
    ),
    lead:
      "Aix-en-Provence est une commune étendue : centre historique, quartiers résidentiels, zones d'activités et villages rattachés comme Les Milles, Luynes ou Puyricard. Indiquez le code postal et le quartier : c'est le point de départ pour organiser un enlèvement réaliste.",
    accessTips: [
      "Précisez le code postal exact : 13080 (Luynes), 13090 ou 13100 (Aix), 13290 (Les Milles), 13540 (Puyricard).",
      "Dans le centre ancien, la circulation des camions est contrainte : dites si le véhicule peut être amené dans une rue plus accessible.",
      "En zone d'activités, indiquez les horaires d'ouverture du site et la personne à contacter sur place.",
    ],
    localFacts: [
      {
        text: "Aix-en-Provence est une sous-préfecture des Bouches-du-Rhône (13) et fait partie de la Métropole Aix-Marseille-Provence.",
        source: "Découpage administratif officiel",
      },
      {
        text: "La commune compte plusieurs codes postaux, dont 13080 (Luynes), 13090, 13100, 13290 (Les Milles) et 13540 (Puyricard).",
        source: "La Poste",
      },
    ],
    faq: [
      {
        q: "Le véhicule est garé dans le centre historique : est-ce un problème ?",
        a: "Le centre d'Aix a des rues étroites et des zones à circulation restreinte. Si le véhicule roule encore, il peut parfois être déplacé vers une rue plus accessible ; sinon, décrivez précisément l'emplacement et l'équipe vérifie ce qui est faisable.",
      },
      {
        q: "J'habite à Puyricard ou aux Milles : faut-il indiquer Aix-en-Provence ?",
        a: "Indiquez la commune (Aix-en-Provence) et surtout le code postal du quartier. C'est lui qui permet de préparer le trajet.",
      },
      {
        q: "Je suis étudiant et je quitte la ville : puis-je faire enlever ma voiture avant de partir ?",
        a: "Oui, si vous êtes titulaire de la carte grise ou mandaté par lui. Indiquez votre date de départ dans la demande : un rendez-vous est recherché avant, sans garantie de date tant qu'il n'est pas confirmé.",
      },
    ],
    form: { city: "Aix-en-Provence" },
    missing: CITY_MISSING,
    related: ["marseille", "plan-de-cuques", "allauch", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Une grande commune, des accès très différents",
        paragraphs: [
          "On imagine souvent Aix-en-Provence à travers son centre ancien, mais la plupart des véhicules hors d'usage se trouvent ailleurs : dans les quartiers résidentiels, les copropriétés avec parking souterrain, les zones d'activités ou les villages rattachés à la commune. D'un quartier à l'autre, l'approche d'un camion plateau n'a rien à voir.",
          "Les demandes aixoises concernent souvent des situations de transition : un étudiant qui termine ses études, une famille qui déménage, un véhicule de société remplacé. Dans ces cas, la date de départ compte autant que l'état du véhicule. Indiquez-la dès la demande, avec la personne qui pourra remettre les clés si vous n'êtes plus sur place.",
          "Pour les copropriétés, le règlement intérieur ou le syndic peuvent imposer des conditions d'accès au parking. Renseignez-vous avant de proposer une date : c'est souvent ce point, plus que le véhicule lui-même, qui retarde un enlèvement.",
        ],
      },
      situations: {
        title: "À Aix, on nous demande souvent…",
        items: [
          {
            title: "Avant un déménagement",
            text: "Donnez votre date de départ et la personne qui gardera les clés : le rendez-vous est recherché en conséquence.",
          },
          {
            title: "Dans une copropriété",
            text: "Badge, syndic, horaires : vérifiez les conditions d'accès au parking avant de proposer un créneau.",
          },
          {
            title: "Dans un village rattaché",
            text: "Luynes, Les Milles, Puyricard : le code postal du quartier suffit pour préparer le trajet.",
          },
        ],
      },
      nearby: ["Marseille", "Plan-de-Cuques", "Allauch"],
    },
  },

  {
    slug: "toulon",
    name: "Toulon",
    kind: "city",
    locative: "à Toulon",
    department: VAR,
    postalCodes: ["83000", "83100", "83200"],
    status: { ...CONFIRMED },
    seo: seo(
      "Toulon",
      "83000",
      "Centre, quartiers en hauteur ou parkings de résidence : la faisabilité est confirmée avant le déplacement.",
      ["épaviste Toulon", "enlèvement voiture Toulon", "épaviste Var"],
    ),
    lead:
      "Toulon est la préfecture du Var : un secteur à part, à distance des communes des Bouches-du-Rhône. Votre demande précise le code postal, le quartier et l'accès au véhicule pour que l'organisation de l'enlèvement soit confirmée avec vous.",
    accessTips: [
      "Indiquez le code postal (83000, 83100 ou 83200) et le quartier.",
      "Quartiers sur les hauteurs : signalez les rues en forte pente et les virages serrés.",
      "Véhicule de service ou de location longue durée : précisez qui est titulaire de la carte grise.",
    ],
    localFacts: [
      {
        text: "Toulon est la préfecture du Var (83) et fait partie de la Métropole Toulon Provence Méditerranée.",
        source: "Découpage administratif officiel",
      },
      {
        text: "La commune est desservie par les codes postaux 83000, 83100 et 83200.",
        source: "La Poste",
      },
    ],
    faq: [
      {
        q: "Intervenez-vous aussi dans les communes autour de Toulon ?",
        a: "Indiquez la commune et le code postal : la faisabilité est vérifiée au cas par cas dans le Var.",
      },
      {
        q: "Je suis muté et je dois partir rapidement : que faire de ma voiture hors d'usage ?",
        a: "Faites la demande dès que possible en indiquant votre date de départ et la personne qui pourra remettre les clés et les documents si vous êtes déjà parti.",
      },
      {
        q: "La voiture est au nom de mon employeur : puis-je demander l'enlèvement ?",
        a: "La cession doit être faite par le titulaire de la carte grise, ou par une personne qu'il mandate. Précisez-le dans la demande.",
      },
    ],
    form: { city: "Toulon" },
    missing: [...CITY_MISSING, "Organisation spécifique au Var (distance, jours d'intervention)."],
    related: ["saint-cyr-sur-mer", "la-ciotat", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Organiser un enlèvement dans le Var, depuis Toulon",
        paragraphs: [
          "Toulon se trouve dans le Var, à distance des communes des Bouches-du-Rhône où se concentrent la plupart des interventions. Un enlèvement toulonnais est donc organisé pour votre dossier : jour, trajet et centre de destination vous sont confirmés au moment de la réponse.",
          "La ville s'étage entre la rade et les collines : certains quartiers en hauteur sont desservis par des rues en forte pente, parfois étroites et en lacets. Pour un camion plateau, ces détails comptent plus que la distance. Une photo de la rue et l'indication de la pente évitent un déplacement inutile.",
          "Les changements d'affectation et les départs rapides sont fréquents dans une ville de garnison. Si vous devez quitter Toulon, faites votre demande tôt et désignez une personne qui pourra remettre le véhicule, les clés et les documents en votre absence.",
        ],
      },
      situations: {
        title: "Les demandes toulonnaises les plus courantes",
        items: [
          {
            title: "Un départ prochain",
            text: "Mutation, déménagement : indiquez la date et la personne qui vous remplacera le jour de l'enlèvement.",
          },
          {
            title: "Une rue en pente",
            text: "Dites si le véhicule est garé en côte et s'il freine encore : le chargement se prépare différemment.",
          },
          {
            title: "Un véhicule au nom d'une société",
            text: "Le titulaire de la carte grise, ou son mandataire, signe la cession : prévoyez le document adéquat.",
          },
        ],
      },
      nearby: ["Saint-Cyr-sur-Mer"],
    },
  },

  {
    slug: "allauch",
    name: "Allauch",
    kind: "city",
    locative: "à Allauch",
    department: BDR,
    postalCodes: ["13190"],
    status: { ...CONFIRMED },
    seo: seo(
      "Allauch",
      "13190",
      "Village, hameaux et collines : l'accès au véhicule est vérifié avant le rendez-vous.",
      ["épaviste Allauch", "enlèvement voiture Allauch"],
    ),
    lead:
      "Village perché, hameaux et quartiers résidentiels sur les collines : à Allauch, l'accès au véhicule est la première question. Décrivez la rue, la pente et l'endroit exact où se trouve la voiture.",
    accessTips: [
      "Hameaux et chemins : indiquez si la voie est goudronnée et si un camion peut faire demi-tour.",
      "Véhicule garé en pente : précisez s'il freine encore et si les roues tournent.",
      "Propriété avec portail : donnez la largeur approximative du passage.",
    ],
    localFacts: [
      {
        text: `Allauch (code postal 13190) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Le véhicule est au bout d'un chemin en terre : est-ce possible ?",
        a: "Cela dépend de la largeur, de la pente et de l'état du sol. Décrivez le chemin et ajoutez une photo : la faisabilité est confirmée avant tout déplacement.",
      },
      {
        q: "La voiture ne freine plus et elle est garée en pente : que faire ?",
        a: "Ne la déplacez pas vous-même. Signalez-le dans la demande pour que le chargement soit préparé en conséquence.",
      },
      {
        q: "Faut-il être présent le jour de l'enlèvement ?",
        a: "Une personne doit remettre les clés et les documents et donner accès au véhicule. Indiquez qui sera présent si ce n'est pas vous.",
      },
    ],
    form: { city: "Allauch", postalCode: "13190" },
    missing: CITY_MISSING,
    related: ["plan-de-cuques", "marseille", "aubagne", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Collines, hameaux et chemins privés : l'accès avant tout",
        paragraphs: [
          "Allauch s'étend du village ancien aux hameaux dispersés sur les reliefs qui bordent l'est de Marseille. Beaucoup de maisons sont desservies par des chemins étroits ou en pente, parfois privés, où un camion plateau doit pouvoir avancer, se placer et repartir.",
          "Pour préparer l'enlèvement, trois informations font la différence : la nature de la voie (goudronnée ou non), la possibilité de faire demi-tour, et la position du véhicule par rapport à la route. Un véhicule garé au fond d'une propriété, derrière un portail étroit, ne se charge pas comme une voiture garée en bord de rue.",
          "Si la voiture est en pente et ne freine plus, ne tentez pas de la déplacer vous-même. Indiquez-le simplement : l'équipe prévoit le matériel adapté ou vous dit honnêtement si l'intervention n'est pas possible.",
        ],
      },
      situations: {
        title: "Les accès typiques à Allauch",
        items: [
          {
            title: "Un chemin sans issue",
            text: "Le camion pourra-t-il faire demi-tour ? Si non, dites à quelle distance se trouve le premier espace de manœuvre.",
          },
          {
            title: "Une maison avec portail",
            text: "Largeur du portail et nature du sol devant la maison : deux mesures suffisent pour préparer l'approche.",
          },
          {
            title: "Une voiture en pente",
            text: "Freins, frein à main, roues : précisez leur état pour un chargement en sécurité.",
          },
        ],
      },
      nearby: ["Plan-de-Cuques", "Marseille", "Aubagne"],
    },
  },

  {
    slug: "plan-de-cuques",
    name: "Plan-de-Cuques",
    kind: "city",
    locative: "à Plan-de-Cuques",
    department: BDR,
    postalCodes: ["13380"],
    status: { ...CONFIRMED },
    seo: seo(
      "Plan-de-Cuques",
      "13380",
      "Lotissements, résidences et rues pavillonnaires : décrivez l'accès, l'équipe confirme avant de venir.",
      ["épaviste Plan-de-Cuques", "enlèvement voiture Plan-de-Cuques"],
    ),
    lead:
      "Commune résidentielle entre Marseille et Allauch, Plan-de-Cuques compte surtout des lotissements et des petites résidences. L'enlèvement s'y joue sur des détails pratiques : accès au lotissement, place devant la maison, voisins à prévenir.",
    accessTips: [
      "Lotissement fermé : indiquez qui ouvre et comment (code, télécommande, gardien).",
      "Rue pavillonnaire étroite : dites si le camion pourra stationner le temps du chargement.",
      "Véhicule dans un garage individuel : précisez s'il peut en être sorti à la main.",
    ],
    localFacts: [
      {
        text: `Plan-de-Cuques (code postal 13380) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture est dans mon garage individuel : faut-il la sortir avant ?",
        a: "Si elle roule ou peut être poussée sans risque, c'est plus simple. Sinon, indiquez la largeur de la porte et la distance jusqu'à la rue : l'équipe vous dira ce qui est possible.",
      },
      {
        q: "Dois-je prévenir mes voisins ?",
        a: "Si le camion doit occuper la rue quelques minutes ou passer devant un accès partagé, c'est recommandé. Le chargement lui-même est rapide une fois l'accès dégagé.",
      },
      {
        q: "Puis-je faire la demande pour mon père qui ne peut pas se déplacer ?",
        a: "Oui. Indiquez qui est titulaire de la carte grise : c'est lui qui signe la cession, ou une personne qu'il mandate.",
      },
    ],
    form: { city: "Plan-de-Cuques", postalCode: "13380" },
    missing: CITY_MISSING,
    related: ["allauch", "marseille", "aix-en-provence", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "En lotissement : préparer un enlèvement sans gêner le voisinage",
        paragraphs: [
          "Plan-de-Cuques est une commune majoritairement pavillonnaire. Les véhicules hors d'usage y sont souvent garés dans un garage individuel, une allée privée ou devant la maison, dans des rues où un camion plateau ne peut pas stationner longtemps sans gêner.",
          "Le jour J, tout se passe mieux quand l'accès est dégagé : portail ouvert, véhicule voisin déplacé si besoin, clés et documents prêts. Prévenir les voisins d'un accès partagé évite les attentes et les manœuvres inutiles.",
          "Beaucoup de demandes sont faites par un proche pour un parent âgé. C'est possible : il faut simplement identifier le titulaire de la carte grise, qui signe la cession ou mandate quelqu'un pour le faire.",
        ],
      },
      situations: {
        title: "Ce qu'il faut prévoir à Plan-de-Cuques",
        items: [
          {
            title: "Un garage individuel",
            text: "Largeur de la porte et distance jusqu'à la rue : utile si le véhicule ne roule plus.",
          },
          {
            title: "Un accès partagé",
            text: "Allée commune ou voie de lotissement : prévenez les voisins et le gestionnaire si nécessaire.",
          },
          {
            title: "Une demande pour un proche",
            text: "Le titulaire de la carte grise signe la cession ou donne mandat : préparez le document.",
          },
        ],
      },
      nearby: ["Allauch", "Marseille"],
    },
  },

  {
    slug: "la-penne-sur-huveaune",
    name: "La Penne-sur-Huveaune",
    kind: "city",
    locative: "à La Penne-sur-Huveaune",
    department: BDR,
    postalCodes: ["13821"],
    status: { ...CONFIRMED },
    seo: seo(
      "La Penne-sur-Huveaune",
      "13821",
      "Entre Marseille et Aubagne : décrivez le véhicule et son accès, l'équipe confirme les conditions.",
      ["épaviste La Penne-sur-Huveaune", "enlèvement voiture La Penne-sur-Huveaune"],
    ),
    lead:
      "Entre l'est de Marseille et Aubagne, La Penne-sur-Huveaune est une petite commune de la vallée de l'Huveaune. Indiquez le code postal 13821 et décrivez l'accès : la demande est étudiée avant tout déplacement.",
    accessTips: [
      "Code postal : 13821 (à ne pas confondre avec celui des communes voisines).",
      "Résidence avec parking : précisez s'il est en surface ou souterrain.",
      "Rue à fort passage : indiquez s'il existe un endroit où le camion peut se garer sans bloquer la circulation.",
    ],
    localFacts: [
      {
        text: `La Penne-sur-Huveaune (code postal 13821) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Mon code postal est 13821 : êtes-vous sûrs de couvrir la commune ?",
        a: "La commune fait partie des secteurs desservis. Chaque demande est tout de même confirmée individuellement, avec la date et les conditions.",
      },
      {
        q: "Le véhicule est garé dans une rue très passante : comment faire ?",
        a: "Indiquez s'il existe une place, une impasse ou un parking à proximité où le chargement peut se faire en sécurité.",
      },
      {
        q: "Je veux aussi vendre des pièces de ce véhicule : est-ce possible ?",
        a: "Le site ne rachète pas de pièces détachées. Si le véhicule garde une valeur, demandez plutôt une étude de rachat.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "La Penne-sur-Huveaune", postalCode: "13821" },
    missing: CITY_MISSING,
    related: ["aubagne", "marseille", "gemenos", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Une commune de passage : penser au stationnement du camion",
        paragraphs: [
          "Coincée entre l'est marseillais et Aubagne, La Penne-sur-Huveaune est traversée par des axes fréquentés. Le véhicule à enlever est souvent garé dans une rue où il n'est pas simple de s'arrêter, ou dans une petite résidence au parking compté.",
          "La question à anticiper est donc celle de l'emplacement du camion pendant le chargement : une impasse voisine, une place de livraison, une cour d'immeuble. Si vous connaissez un endroit adapté à proximité, indiquez-le ; c'est un vrai gain de temps.",
          "Pour un véhicule qui garde de la valeur, une étude de rachat peut être plus intéressante qu'un enlèvement. Si vous hésitez, décrivez-le : l'équipe vous oriente vers la solution la plus adaptée.",
        ],
      },
      situations: {
        title: "À La Penne-sur-Huveaune",
        items: [
          {
            title: "Une rue à fort passage",
            text: "Signalez un endroit proche où le camion peut s'arrêter sans bloquer la circulation.",
          },
          {
            title: "Un parking de résidence",
            text: "Surface ou sous-sol, barrière ou non : ces détails déterminent l'approche.",
          },
          {
            title: "Un véhicule qui a encore de la valeur",
            text: "Plutôt qu'un enlèvement, une étude de rachat peut être proposée.",
          },
        ],
      },
      nearby: ["Aubagne", "Marseille", "Gémenos"],
    },
  },

  {
    slug: "gemenos",
    name: "Gémenos",
    kind: "city",
    locative: "à Gémenos",
    department: BDR,
    postalCodes: ["13420"],
    status: { ...CONFIRMED },
    seo: seo(
      "Gémenos",
      "13420",
      "Village, quartiers résidentiels et parc d'activités : particuliers et professionnels.",
      ["épaviste Gémenos", "enlèvement voiture Gémenos", "enlèvement véhicule entreprise Gémenos"],
    ),
    lead:
      "Au pied de la Sainte-Baume, Gémenos réunit un village, des quartiers résidentiels et un important parc d'activités. Particulier ou entreprise, décrivez le véhicule et l'accès : les conditions vous sont confirmées avant le rendez-vous.",
    accessTips: [
      "Entreprise du parc d'activités : indiquez les horaires d'accès du site et le contact sur place.",
      "Plusieurs véhicules : listez-les dans une seule demande, avec leur état.",
      "Particulier : précisez si le véhicule est sur la voie publique ou dans une propriété.",
    ],
    localFacts: [
      {
        text: `Gémenos (code postal 13420) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Notre entreprise a plusieurs véhicules hors d'usage : faut-il une demande par véhicule ?",
        a: "Non. Utilisez le formulaire professionnel pour décrire le lot : un passage groupé est étudié.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
      {
        q: "Le véhicule de société est en location longue durée : pouvons-nous le faire enlever ?",
        a: "Non sans l'accord du loueur, qui est généralement le titulaire de la carte grise. Contactez-le d'abord.",
      },
      {
        q: "Le site ferme le week-end : est-ce compatible ?",
        a: "Indiquez vos jours et horaires d'ouverture : le rendez-vous proposé en tient compte.",
      },
    ],
    form: { city: "Gémenos", postalCode: "13420" },
    missing: CITY_MISSING,
    related: ["aubagne", "auriol", "la-penne-sur-huveaune", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Particuliers et entreprises : deux façons de préparer l'enlèvement",
        paragraphs: [
          "Gémenos a la particularité d'accueillir un grand parc d'activités à côté d'un village et de quartiers résidentiels. Les demandes y sont donc de deux natures : un particulier avec une voiture hors d'usage, ou une entreprise avec un ou plusieurs véhicules à sortir de son site.",
          "Pour une entreprise, la préparation est surtout administrative et logistique : qui est titulaire de la carte grise (la société, un loueur, un salarié ?), quels jours le site est ouvert, qui accompagnera l'équipe. Un véhicule en location longue durée ne peut pas être cédé sans l'accord du loueur.",
          "Pour un particulier, les questions restent celles de l'accès : voie publique ou propriété, pente, portail. Dans les deux cas, une demande précise permet une réponse plus rapide.",
        ],
      },
      situations: {
        title: "Les demandes que l'on reçoit pour Gémenos",
        items: [
          {
            title: "Une flotte qui se renouvelle",
            text: "Plusieurs véhicules à sortir : décrivez le lot dans le formulaire professionnel.",
          },
          {
            title: "Un véhicule en location",
            text: "Le loueur est titulaire de la carte grise : son accord est indispensable.",
          },
          {
            title: "Une voiture de particulier",
            text: "Voie publique ou propriété privée : décrivez l'accès et ajoutez une photo.",
          },
        ],
      },
      nearby: ["Aubagne", "Auriol", "La Penne-sur-Huveaune", "Roquefort-la-Bédoule"],
    },
  },

  {
    slug: "auriol",
    name: "Auriol",
    kind: "city",
    locative: "à Auriol",
    department: BDR,
    postalCodes: ["13390"],
    status: { ...CONFIRMED },
    seo: seo(
      "Auriol",
      "13390",
      "Maisons avec terrain, campagne et hameaux : l'accès est vérifié avant le déplacement.",
      ["épaviste Auriol", "enlèvement voiture Auriol"],
    ),
    lead:
      "Dans la haute vallée de l'Huveaune, Auriol compte beaucoup de maisons avec terrain et d'habitations à l'écart du centre. Le véhicule à enlever s'y trouve souvent sur une propriété : décrivez le chemin d'accès et l'emplacement exact.",
    accessTips: [
      "Propriété à la campagne : indiquez la distance entre la route et le véhicule.",
      "Sol en herbe ou en terre : précisez s'il est praticable par temps de pluie.",
      "Véhicule ancien immobilisé depuis longtemps : signalez la végétation ou les objets qui l'entourent.",
    ],
    localFacts: [
      {
        text: `Auriol (code postal 13390) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture est dans un champ depuis des années : peut-elle être enlevée ?",
        a: "Souvent oui, si un camion peut approcher. Indiquez la distance depuis la route, la nature du sol et l'état du véhicule (roues, pneus).",
      },
      {
        q: "Il manque des pièces sur le véhicule : est-ce toujours gratuit ?",
        a: "La gratuité vise les véhicules complets. Un véhicule incomplet est étudié au cas par cas ; les conditions vous sont annoncées avant le rendez-vous.",
      },
      {
        q: "Je n'ai plus la carte grise : que faire ?",
        a: "D'autres justificatifs peuvent la remplacer selon les cas. Indiquez la situation dans la demande, elle est examinée avant tout rendez-vous.",
      },
    ],
    form: { city: "Auriol", postalCode: "13390" },
    missing: CITY_MISSING,
    related: ["gemenos", "aubagne", "roquefort-la-bedoule", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Véhicules oubliés sur un terrain : ce qu'il faut vérifier",
        paragraphs: [
          "Avec ses nombreuses maisons entourées de terrain, Auriol fait partie des communes où l'on retrouve des véhicules immobilisés depuis très longtemps : vieille voiture au fond du jardin, utilitaire garé dans un champ, véhicule hérité que personne n'a déplacé.",
          "Après des années sans rouler, le véhicule peut être enfoncé dans le sol, entouré de végétation, avec des pneus éclatés et des roues bloquées. Rien de tout cela n'empêche forcément l'enlèvement, mais l'équipe doit le savoir pour prévoir le matériel et le temps nécessaires.",
          "Pensez aussi aux papiers : pour un véhicule ancien, la carte grise est parfois perdue ou au nom d'une personne décédée. Ces situations ont des solutions ; elles doivent simplement être examinées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Situations fréquentes à Auriol",
        items: [
          {
            title: "Au fond du jardin",
            text: "Distance jusqu'à la route, portail, nature du sol : trois informations pour préparer l'approche.",
          },
          {
            title: "Un véhicule hérité",
            text: "Carte grise au nom d'un défunt : les justificatifs à prévoir sont vérifiés avant le rendez-vous.",
          },
          {
            title: "Un véhicule incomplet",
            text: "Moteur ou pièces manquants : la demande est étudiée, les conditions annoncées à l'avance.",
          },
        ],
      },
      nearby: ["Gémenos", "Aubagne", "Roquefort-la-Bédoule"],
    },
  },

  {
    slug: "roquefort-la-bedoule",
    name: "Roquefort-la-Bédoule",
    kind: "city",
    locative: "à Roquefort-la-Bédoule",
    department: BDR,
    postalCodes: ["13830"],
    status: { ...CONFIRMED },
    seo: seo(
      "Roquefort-la-Bédoule",
      "13830",
      "Quartiers résidentiels et chemins de campagne : décrivez l'accès, l'équipe confirme.",
      ["épaviste Roquefort-la-Bédoule", "enlèvement voiture Roquefort-la-Bédoule"],
    ),
    lead:
      "Entre Aubagne, Cassis et La Ciotat, Roquefort-la-Bédoule est une commune résidentielle étendue, avec de nombreux quartiers desservis par des chemins. L'accès au véhicule est la première chose à décrire.",
    accessTips: [
      "Chemin communal ou privé : précisez sa largeur et s'il est goudronné.",
      "Quartier éloigné du centre : indiquez un point de repère facile à trouver.",
      "Véhicule sous un abri ou un carport : précisez la hauteur disponible.",
    ],
    localFacts: [
      {
        text: `Roquefort-la-Bédoule (code postal 13830) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Mon adresse est difficile à trouver : comment faire ?",
        a: "Indiquez un point de repère (croisement, nom du chemin, bâtiment visible). L'adresse exacte et les indications sont confirmées au moment du rendez-vous.",
      },
      {
        q: "La voiture est sous un carport : est-ce gênant ?",
        a: "Si le véhicule peut être sorti à la main, non. Sinon, indiquez la hauteur disponible et la distance jusqu'au chemin.",
      },
      {
        q: "Combien de temps dure l'enlèvement sur place ?",
        a: "Cela dépend de l'accès et de l'état du véhicule. Aucune durée n'est promise avant l'étude ; elle vous est indiquée avec la confirmation.",
      },
    ],
    form: { city: "Roquefort-la-Bédoule", postalCode: "13830" },
    missing: CITY_MISSING,
    related: ["cassis", "carnoux-en-provence", "aubagne", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Une commune étendue : bien se repérer pour bien s'organiser",
        paragraphs: [
          "Roquefort-la-Bédoule s'étale sur un territoire vaste pour sa population, avec des quartiers résidentiels reliés par des chemins plus ou moins larges. Pour une personne qui ne connaît pas la commune, trouver la bonne maison peut prendre du temps.",
          "Donnez donc, en plus de l'adresse, un repère simple : un croisement, le nom d'un chemin, un bâtiment visible depuis la route. Indiquez aussi si le chemin est goudronné et s'il permet à un camion de croiser un autre véhicule ou de faire demi-tour.",
          "Les véhicules sont souvent garés sous un abri, un carport ou dans une dépendance. Si la voiture ne roule plus, la hauteur et l'espace disponibles autour d'elle décident de la façon de la sortir.",
        ],
      },
      situations: {
        title: "Ce qu'on nous signale à Roquefort-la-Bédoule",
        items: [
          {
            title: "Une maison au bout d'un chemin",
            text: "Largeur, revêtement, possibilité de demi-tour : décrivez le chemin depuis la route principale.",
          },
          {
            title: "Un véhicule sous abri",
            text: "Carport, garage ouvert, dépendance : indiquez la hauteur et l'espace autour.",
          },
          {
            title: "Une adresse difficile à trouver",
            text: "Un point de repère clair évite de perdre du temps le jour du rendez-vous.",
          },
        ],
      },
      nearby: ["Cassis", "Carnoux-en-Provence", "Aubagne", "La Ciotat"],
    },
  },

  {
    slug: "carnoux-en-provence",
    name: "Carnoux-en-Provence",
    kind: "city",
    locative: "à Carnoux-en-Provence",
    department: BDR,
    postalCodes: ["13470"],
    status: { ...CONFIRMED },
    seo: seo(
      "Carnoux-en-Provence",
      "13470",
      "Résidences, parkings et rues en pente : l'accès est confirmé avant le rendez-vous.",
      ["épaviste Carnoux-en-Provence", "enlèvement voiture Carnoux"],
    ),
    lead:
      "Carnoux-en-Provence est une commune compacte, entre Aubagne et Cassis, construite en grande partie sur un relief. Résidences, parkings collectifs et rues en pente : précisez où se trouve exactement le véhicule.",
    accessTips: [
      "Parking collectif : indiquez s'il est en surface, couvert ou souterrain.",
      "Rue en pente : dites si le véhicule est garé en côte et s'il freine.",
      "Place réservée ou numérotée : signalez-la pour que le véhicule soit identifié sans erreur.",
    ],
    localFacts: [
      {
        text: `Carnoux-en-Provence (code postal 13470) est une commune des Bouches-du-Rhône (13), membre de la ${AMP}.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Plusieurs voitures se ressemblent dans le parking : comment éviter une erreur ?",
        a: "Indiquez le numéro de place, la couleur, le modèle et, si possible, l'immatriculation dans la demande. L'identification est vérifiée sur place avec les documents.",
      },
      {
        q: "Le syndic doit-il être prévenu ?",
        a: "Pour un parking collectif, c'est recommandé : il peut imposer des horaires ou une autorisation d'accès.",
      },
      {
        q: "Puis-je faire enlever un véhicule sans contrôle technique ?",
        a: "Oui. Un véhicule hors d'usage n'a pas besoin d'un contrôle technique valide pour être remis à un centre VHU.",
      },
    ],
    form: { city: "Carnoux-en-Provence", postalCode: "13470" },
    missing: CITY_MISSING,
    related: ["cassis", "aubagne", "roquefort-la-bedoule", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Parkings de résidence et rues en pente : les deux points à préparer",
        paragraphs: [
          "Commune compacte construite sur un relief, Carnoux-en-Provence compte beaucoup de résidences avec parkings collectifs. Un véhicule hors d'usage y est souvent garé sur une place numérotée, au milieu d'autres voitures, parfois dans une allée en pente.",
          "Le jour de l'enlèvement, il faut pouvoir identifier le bon véhicule et l'approcher sans gêner les autres résidents. Notez dans la demande le numéro de place, la couleur et le modèle, et prévenez le syndic si l'accès au parking est réglementé.",
          "Dans les rues en pente, l'état des freins et du frein à main compte : une voiture qui ne retient plus doit être chargée avec précaution. Signalez-le plutôt que de tenter de la déplacer.",
        ],
      },
      situations: {
        title: "À Carnoux-en-Provence",
        items: [
          {
            title: "Une place numérotée",
            text: "Numéro de place, couleur et modèle : le bon véhicule est identifié sans hésitation.",
          },
          {
            title: "Un parking collectif",
            text: "Prévenez le syndic : horaires ou autorisation d'accès peuvent être exigés.",
          },
          {
            title: "Une allée en pente",
            text: "Freins et frein à main : précisez leur état pour un chargement sûr.",
          },
        ],
      },
      nearby: ["Cassis", "Aubagne", "Roquefort-la-Bédoule"],
    },
  },

  {
    slug: "ceyreste",
    name: "Ceyreste",
    kind: "city",
    locative: "à Ceyreste",
    department: BDR,
    postalCodes: ["13600"],
    status: { ...CONFIRMED },
    seo: seo(
      "Ceyreste",
      "13600",
      "Village et collines au-dessus de La Ciotat : décrivez l'accès, l'équipe vérifie.",
      ["épaviste Ceyreste", "enlèvement voiture Ceyreste"],
    ),
    lead:
      "Sur les hauteurs de La Ciotat, Ceyreste partage le code postal 13600 avec sa voisine. Pensez à préciser le nom de la commune : l'accès aux quartiers des collines n'est pas le même qu'en bord de mer.",
    accessTips: [
      "Code postal 13600 : précisez bien « Ceyreste » et non La Ciotat.",
      "Quartiers des collines : signalez les rues étroites et les virages.",
      "Maison avec terrain : indiquez la distance entre la route et le véhicule.",
    ],
    localFacts: [
      {
        text: `Ceyreste est une commune des Bouches-du-Rhône (13), membre de la ${AMP} ; elle partage le code postal 13600 avec La Ciotat.`,
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "J'ai mis 13600 et l'équipe me parle de La Ciotat : est-ce normal ?",
        a: "Les deux communes partagent ce code postal. Précisez « Ceyreste » dans le champ commune pour éviter toute confusion.",
      },
      {
        q: "Ma rue est étroite et sinueuse : le camion pourra-t-il passer ?",
        a: "Décrivez la rue et ajoutez une photo : la faisabilité est vérifiée avant de vous proposer un rendez-vous.",
      },
      {
        q: "Le véhicule est une ancienne voiture de collection abîmée : faut-il un enlèvement ?",
        a: "S'il garde une valeur, une étude de rachat est plus adaptée. Sinon, l'enlèvement vers le centre VHU vous est proposé.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "Ceyreste", postalCode: "13600" },
    missing: CITY_MISSING,
    related: ["la-ciotat", "saint-cyr-sur-mer", "roquefort-la-bedoule", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Ceyreste ou La Ciotat ? Un même code postal, des accès différents",
        paragraphs: [
          "Ceyreste partage le code postal 13600 avec La Ciotat, ce qui crée parfois des confusions. Pour l'organisation d'un enlèvement, la différence compte : le village et ses quartiers sont situés sur les collines, avec des rues plus étroites et plus sinueuses que le front de mer.",
          "Écrivez donc clairement le nom de la commune, puis décrivez la rue : largeur, pente, virages, possibilité de stationner le camion à proximité. Une photo de la rue, prise depuis le véhicule, aide beaucoup.",
          "Pour une maison avec terrain, ajoutez la distance entre le véhicule et la route, et l'état du sol. Ces quelques lignes suffisent souvent à éviter une visite préalable.",
        ],
      },
      situations: {
        title: "Les situations courantes à Ceyreste",
        items: [
          {
            title: "Une rue sinueuse",
            text: "Largeur et virages : une photo depuis le véhicule renseigne mieux qu'une longue description.",
          },
          {
            title: "Un terrain en hauteur",
            text: "Distance jusqu'à la route et nature du sol : deux informations à donner.",
          },
          {
            title: "Une confusion de code postal",
            text: "Précisez « Ceyreste » dans le champ commune, le code 13600 étant partagé.",
          },
        ],
      },
      nearby: ["La Ciotat", "Saint-Cyr-sur-Mer", "Roquefort-la-Bédoule"],
    },
  },

  {
    slug: "saint-cyr-sur-mer",
    name: "Saint-Cyr-sur-Mer",
    kind: "city",
    locative: "à Saint-Cyr-sur-Mer",
    department: VAR,
    postalCodes: ["83270"],
    status: { ...CONFIRMED },
    seo: seo(
      "Saint-Cyr-sur-Mer",
      "83270",
      "Dans le Var, à côté de La Ciotat : résidences, maisons et parkings, accès vérifié avant le rendez-vous.",
      ["épaviste Saint-Cyr-sur-Mer", "enlèvement voiture Saint-Cyr-sur-Mer", "épaviste Les Lecques"],
    ),
    lead:
      "Saint-Cyr-sur-Mer est la première commune du Var après La Ciotat. Centre, quartier des Lecques ou résidences : indiquez précisément l'emplacement du véhicule et sa situation d'accès.",
    accessTips: [
      "Précisez le quartier (centre, Les Lecques…) pour faciliter l'organisation.",
      "Résidence de vacances : indiquez les périodes où le parking est accessible.",
      "Véhicule immatriculé dans un autre département : aucun problème, seul l'emplacement compte.",
    ],
    localFacts: [
      {
        text: "Saint-Cyr-sur-Mer (code postal 83270) est une commune du Var (83), limitrophe de La Ciotat.",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Saint-Cyr-sur-Mer est dans le Var : est-ce que cela change quelque chose ?",
        a: "Pas pour vous : les documents sont les mêmes partout en France. L'organisation est simplement confirmée pour votre commune.",
      },
      {
        q: "Je n'habite pas sur place toute l'année : comment faire ?",
        a: "Indiquez vos dates de présence ou la personne qui pourra remettre les clés et les documents. Un rendez-vous est recherché en conséquence.",
      },
      {
        q: "Le véhicule est immatriculé dans un autre département : est-ce possible ?",
        a: "Oui. Le certificat d'immatriculation est national : c'est l'endroit où se trouve le véhicule qui compte.",
      },
    ],
    form: { city: "Saint-Cyr-sur-Mer", postalCode: "83270" },
    missing: CITY_MISSING,
    related: ["la-ciotat", "ceyreste", "toulon", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "À la frontière du Var : une commune proche, une organisation simple",
        paragraphs: [
          "Saint-Cyr-sur-Mer touche La Ciotat mais se trouve dans le Var. Pour vous, cela ne change rien aux démarches : la carte grise, la déclaration de cession et le certificat de situation administrative sont les mêmes partout en France.",
          "Beaucoup de logements de la commune, notamment autour des Lecques, ne sont occupés qu'une partie de l'année. Les véhicules immobilisés y attendent parfois le retour de leur propriétaire. Si vous n'êtes pas sur place, indiquez vos dates de présence ou désignez quelqu'un qui pourra remettre le véhicule.",
          "Les parkings de résidences de vacances ont souvent des horaires ou des badges spécifiques : vérifiez les conditions d'accès avant de proposer une date.",
        ],
      },
      situations: {
        title: "Les cas fréquents à Saint-Cyr-sur-Mer",
        items: [
          {
            title: "Un propriétaire absent",
            text: "Dates de présence ou personne de confiance : le rendez-vous se cale sur ces informations.",
          },
          {
            title: "Une résidence de vacances",
            text: "Badge, gardien, horaires : précisez comment accéder au parking.",
          },
          {
            title: "Une immatriculation d'ailleurs",
            text: "Aucun problème : seul l'emplacement du véhicule compte pour organiser l'enlèvement.",
          },
        ],
      },
      nearby: ["La Ciotat", "Ceyreste", "Toulon"],
    },
  },
];
