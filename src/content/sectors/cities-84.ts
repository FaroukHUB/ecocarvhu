import type { Sector } from "./types";
import { CITY_MISSING, CONFIRMED, VAUCLUSE, citySeo as seo } from "./shared";

/**
 * Communes du Vaucluse. Faits locaux limités aux données administratives fournies
 * (statut, codes postaux). Aucun délai, prix ni horaire n'est annoncé :
 * l'organisation est confirmée avant chaque rendez-vous.
 */
export const cities84: Sector[] = [
  {
    slug: "avignon",
    name: "Avignon",
    kind: "city",
    locative: "à Avignon",
    department: VAUCLUSE,
    postalCodes: ["84000", "84140"],
    status: { ...CONFIRMED },
    seo: seo(
      "Avignon",
      "84000",
      "Intra-muros, extra-muros ou Montfavet : l'accès au véhicule est étudié avant tout déplacement.",
      ["épaviste Avignon", "enlèvement voiture Avignon", "enlèvement épave Montfavet"],
    ),
    lead:
      "À Avignon, tout change selon que le véhicule se trouve à l'intérieur des remparts ou à l'extérieur. Précisez d'abord ce point, puis le quartier : c'est ce qui détermine si et comment un camion plateau peut l'approcher.",
    accessTips: [
      "Intra-muros : dites si la rue est étroite, en sens unique ou à accès réglementé, et si le véhicule peut être amené hors des remparts.",
      "Extra-muros : indiquez le quartier et le type de stationnement (rue, cour, parking de résidence).",
      "Montfavet : utilisez le code postal 84140 et précisez le quartier dans l'adresse.",
    ],
    localFacts: [
      {
        text: "Avignon est la préfecture du Vaucluse (84), desservie par les codes postaux 84000 et 84140 (Montfavet).",
        source: "Découpage administratif officiel / La Poste",
      },
      {
        text: "Le centre historique d'Avignon est entouré de remparts.",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Ma voiture est garée dans une ruelle à l'intérieur des remparts : un camion peut-il y accéder ?",
        a: "Pas toujours : certaines rues du centre ne laissent pas passer un plateau, ou leur accès est réglementé. Si le véhicule peut encore rouler ou être remorqué jusqu'à une voie plus large, indiquez-le ; sinon, décrivez précisément l'emplacement pour qu'une solution soit étudiée.",
      },
      {
        q: "Montfavet fait-il partie d'Avignon pour la demande ?",
        a: "Oui. Indiquez Avignon comme commune et 84140 comme code postal ; ajoutez « Montfavet » dans l'adresse pour lever toute ambiguïté.",
      },
      {
        q: "Je cherche une pièce d'occasion plutôt qu'un enlèvement : est-ce possible ?",
        a: "Oui, la demande de pièce se fait à part. Donnez le modèle, l'année et la référence si vous la connaissez.",
        link: { href: "/demande-piece", label: "Rechercher une pièce d'occasion" },
      },
    ],
    form: { city: "Avignon" },
    missing: CITY_MISSING,
    related: ["carpentras", "cavaillon", "orange", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Dedans ou dehors : les remparts changent tout",
        paragraphs: [
          "Les remparts d'Avignon tracent une frontière très concrète pour un enlèvement. À l'intérieur, les rues sont souvent étroites, sinueuses, et la circulation y est contrainte. Un camion plateau ne peut pas aller partout, et certaines manœuvres sont tout simplement impossibles. Dire d'emblée que le véhicule est intra-muros permet d'étudier la faisabilité sérieusement.",
          "À l'extérieur des remparts, la situation ressemble davantage à celle d'une ville classique : rues plus larges, quartiers résidentiels, parkings d'immeubles, maisons avec cour. L'approche est généralement plus simple, mais l'emplacement exact et la présence d'une barrière ou d'un portail restent utiles à connaître.",
          "Montfavet, rattaché à la commune, a son propre code postal. Pensez à l'indiquer correctement : cela évite toute confusion sur l'adresse et facilite la préparation du trajet. Quel que soit le secteur, une photo de la rue et du véhicule aide à valider l'organisation.",
        ],
      },
      situations: {
        title: "Les situations avignonnaises les plus courantes",
        items: [
          {
            title: "Une voiture coincée dans le centre ancien",
            text: "Rue étroite ou accès réglementé : précisez si le véhicule peut être déplacé vers l'extérieur des remparts.",
          },
          {
            title: "Une cour de maison hors les murs",
            text: "Largeur d'entrée, sol, distance depuis la rue : de quoi juger si le plateau peut approcher.",
          },
          {
            title: "Un véhicule à Montfavet",
            text: "Code postal 84140 et nom du quartier : l'adresse est ainsi impossible à confondre.",
          },
        ],
      },
      nearby: ["Le Pontet", "Morières-lès-Avignon", "Caumont-sur-Durance"],
    },
  },

  {
    slug: "carpentras",
    name: "Carpentras",
    kind: "city",
    locative: "à Carpentras",
    department: VAUCLUSE,
    postalCodes: ["84200"],
    status: { ...CONFIRMED },
    seo: seo(
      "Carpentras",
      "84200",
      "Maison de ville, cour, hangar ou propriété à la campagne : l'accès est confirmé avant le rendez-vous.",
      ["épaviste Carpentras", "enlèvement voiture Carpentras"],
    ),
    lead:
      "Carpentras mêle des maisons de ville serrées dans le centre et une campagne agricole tout autour, avec ses cours, ses granges et ses hangars. Dites dans lequel de ces deux univers se trouve le véhicule : l'approche n'a rien de comparable.",
    accessTips: [
      "Maison de ville : précisez si la voiture est dans la rue, dans une cour intérieure ou derrière un porche, et la largeur du passage.",
      "Hangar ou grange : indiquez si le véhicule peut être sorti à l'extérieur avant le rendez-vous.",
      "Propriété à la campagne : décrivez le chemin d'accès et signalez un repère visible depuis la route.",
    ],
    localFacts: [
      {
        text: "Carpentras (code postal 84200) est une sous-préfecture du Vaucluse (84).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture est dans une cour fermée par un porche étroit : comment savoir si elle peut sortir ?",
        a: "Mesurez la largeur et la hauteur du passage, puis joignez une photo. Si le camion ne peut pas entrer, il faut que le véhicule puisse être amené jusqu'à la rue ; l'équipe vous dit ce qui est réaliste avant le rendez-vous.",
      },
      {
        q: "Un vieux véhicule est rangé sous notre hangar depuis longtemps : est-il concerné par la gratuité ?",
        a: "Oui, s'il est immatriculé, complet et accessible. S'il manque le moteur ou d'autres éléments importants, précisez-le : les conditions vous sont confirmées avant le rendez-vous.",
        link: { href: "/enlevement-epave", label: "Ce qui est pris en charge" },
      },
      {
        q: "Je n'ai plus la carte grise du véhicule : puis-je quand même faire une demande ?",
        a: "Faites la demande en le signalant clairement. Selon la situation, des démarches ou justificatifs complémentaires peuvent être nécessaires ; ils vous sont indiqués avant toute prise en charge.",
      },
    ],
    form: { city: "Carpentras", postalCode: "84200" },
    missing: CITY_MISSING,
    related: ["avignon", "orange", "cavaillon", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Du cœur de ville aux hangars de la plaine",
        paragraphs: [
          "Dans le centre de Carpentras, les maisons de ville se touchent, et beaucoup disposent d'une cour ou d'un garage accessible par un porche. Un véhicule hors d'usage peut y rester des années sans gêner personne, jusqu'au jour où il faut le sortir. Le passage, souvent étroit, devient alors le premier sujet à vérifier.",
          "Autour de la ville, la campagne agricole offre un tout autre décor : propriétés avec grand terrain, granges, hangars où l'on remise une vieille voiture ou une camionnette. L'espace ne manque pas, mais le sol et le chemin d'accès peuvent poser question, surtout après la pluie.",
          "Dans les deux cas, la meilleure préparation reste la même : une photo du véhicule, une autre de l'accès, et la personne qui ouvrira le jour venu. Si le véhicule peut être tiré à l'extérieur du hangar ou de la cour avant le rendez-vous, signalez-le ; cela simplifie nettement le chargement.",
        ],
      },
      situations: {
        title: "Ce que l'on rencontre souvent à Carpentras",
        items: [
          {
            title: "Une voiture derrière un porche",
            text: "Largeur et hauteur du passage décident de tout : mesurez-les avant de faire la demande.",
          },
          {
            title: "Une camionnette sous un hangar",
            text: "Précisez si elle repose sur ses roues et si quelque chose l'entoure ou la bloque.",
          },
          {
            title: "Une propriété hors de la ville",
            text: "Chemin, portail, repère depuis la route : trois indications pour trouver le véhicule sans détour.",
          },
        ],
      },
      nearby: ["Monteux", "Pernes-les-Fontaines", "Mazan", "Aubignan"],
    },
  },

  {
    slug: "orange",
    name: "Orange",
    kind: "city",
    locative: "à Orange",
    department: VAUCLUSE,
    postalCodes: ["84100"],
    status: { ...CONFIRMED },
    seo: seo(
      "Orange",
      "84100",
      "Pavillon, cour ou allée privée : l'emplacement du véhicule et son accès sont vérifiés avant de venir.",
      ["épaviste Orange", "enlèvement voiture Orange 84", "épave Orange Vaucluse"],
    ),
    lead:
      "À Orange, les demandes viennent souvent de quartiers pavillonnaires, où une voiture immobilisée finit par occuper la cour ou l'allée depuis trop longtemps. Indiquez où elle stationne exactement et si elle peut encore être déplacée.",
    accessTips: [
      "Cour ou allée : précisez si un autre véhicule devra être déplacé pour libérer le passage.",
      "Voiture immobilisée depuis longtemps : signalez les pneus à plat ou les roues bloquées.",
      "Lotissement : donnez le nom de l'allée ou de l'impasse en plus de l'adresse, certaines voies se ressemblent.",
    ],
    localFacts: [
      {
        text: "Orange (code postal 84100) est une commune du Vaucluse (84).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture n'a pas bougé de la cour depuis des années et les roues sont bloquées : est-ce gênant ?",
        a: "Ce n'est pas forcément un obstacle, mais le chargement se prépare différemment. Indiquez l'état des roues et des pneus, et joignez une photo de la cour.",
      },
      {
        q: "Je suis locataire et la voiture est garée dans la résidence : qui doit faire la demande ?",
        a: "C'est le titulaire de la carte grise, ou une personne qu'il mandate. Si le parking est commun, prévenez le gestionnaire pour faciliter l'accès le jour du rendez-vous.",
      },
      {
        q: "Mon utilitaire professionnel est hors service : la démarche est-elle la même ?",
        a: "Le principe reste le même, mais les informations demandées diffèrent : raison sociale, signataire habilité, gabarit du véhicule.",
        link: { href: "/professionnels", label: "Démarche pour les professionnels" },
      },
    ],
    form: { city: "Orange", postalCode: "84100" },
    missing: CITY_MISSING,
    related: ["avignon", "carpentras", "cavaillon", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "La voiture qui encombre la cour depuis trop longtemps",
        paragraphs: [
          "Dans les quartiers pavillonnaires d'Orange, le scénario est fréquent : une voiture tombe en panne, on la gare dans la cour ou l'allée en se promettant de la réparer, puis les mois passent. Pneus dégonflés, batterie vide, freins grippés : le véhicule devient difficile à déplacer et l'espace reste occupé.",
          "Pour organiser l'enlèvement, il faut savoir si la voiture repose encore sur ses roues, si celles-ci tournent, et si un autre véhicule bloque le passage. Ces détails, qui paraissent secondaires, déterminent la manière de charger. Une photo prise depuis la rue montre aussi la place disponible pour le camion plateau.",
          "La commune est bien reliée aux grands axes routiers de la vallée du Rhône, ce qui facilite les trajets vers la ville. Sur place, ce sont surtout l'entrée de la propriété et la largeur de l'allée qui comptent. Mesurez-les si vous avez un doute.",
        ],
      },
      situations: {
        title: "Ce qui revient souvent à Orange",
        items: [
          {
            title: "Une voiture aux roues bloquées",
            text: "Freins grippés ou pneus à plat : signalez-le, un véhicule qui ne roule pas se charge autrement.",
          },
          {
            title: "Une allée partagée avec la voiture du quotidien",
            text: "Prévoyez de déplacer l'autre véhicule le jour du rendez-vous pour libérer le passage.",
          },
          {
            title: "Une impasse de lotissement",
            text: "Le nom exact de la voie et un repère visuel évitent de chercher la bonne maison.",
          },
        ],
      },
      nearby: ["Courthézon", "Jonquières", "Caderousse", "Piolenc"],
    },
  },

  {
    slug: "cavaillon",
    name: "Cavaillon",
    kind: "city",
    locative: "à Cavaillon",
    department: VAUCLUSE,
    postalCodes: ["84300"],
    status: { ...CONFIRMED },
    seo: seo(
      "Cavaillon",
      "84300",
      "Exploitation agricole, utilitaire de service ou terrain en terre : l'accès est vérifié avant le rendez-vous.",
      ["épaviste Cavaillon", "enlèvement utilitaire Cavaillon", "enlèvement voiture Cavaillon"],
    ),
    lead:
      "Autour de Cavaillon, de nombreuses exploitations agricoles gardent un vieil utilitaire ou une voiture de service en bout de course. Seuls les véhicules immatriculés sont concernés : le matériel agricole (tracteurs, outils, engins) n'est pas pris en charge.",
    accessTips: [
      "Vérifiez que le véhicule est immatriculé : tracteurs et matériel agricole ne sont pas concernés.",
      "Terrain en terre : précisez si le sol reste praticable après la pluie et où le camion peut se garer.",
      "Exploitation : indiquez le bâtiment ou la parcelle où se trouve le véhicule et la personne qui accueillera l'équipe.",
    ],
    localFacts: [
      {
        text: "Cavaillon (code postal 84300) est une commune du Vaucluse (84).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous emporter un vieux tracteur ou une remorque agricole ?",
        a: "Non. L'enlèvement concerne uniquement des véhicules immatriculés comme les voitures, camionnettes ou fourgons. Le matériel et les engins agricoles relèvent d'autres filières.",
      },
      {
        q: "La camionnette de l'exploitation est au nom de la société : qui signe ?",
        a: "Le représentant de la structure titulaire de la carte grise, ou une personne qu'il mandate par écrit. Indiquez-le dans la demande avec la raison sociale.",
        link: { href: "/professionnels", label: "Démarche pour les entreprises" },
      },
      {
        q: "Le véhicule est garé dans un champ, sur un sol en terre : est-ce possible ?",
        a: "Cela dépend de l'état du sol et de la distance jusqu'à un chemin stable. Décrivez le terrain et joignez une photo : la faisabilité est confirmée avant le rendez-vous.",
      },
    ],
    form: { city: "Cavaillon", postalCode: "84300" },
    missing: CITY_MISSING,
    related: ["avignon", "pertuis", "carpentras", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Exploitations agricoles : ce qui peut partir, et ce qui reste",
        paragraphs: [
          "La plaine autour de Cavaillon compte de nombreuses exploitations, où l'on garde volontiers une vieille camionnette, un fourgon ou une voiture de service pour les déplacements entre parcelles. Quand ces véhicules arrivent en fin de vie, ils restent souvent sur place, au bord d'un hangar ou au coin d'un champ.",
          "Une précision s'impose : seuls les véhicules immatriculés peuvent être enlevés dans ce cadre. Tracteurs, remorques non immatriculées, outils et engins agricoles ne sont pas concernés. En cas de doute, regardez la carte grise : si le véhicule n'en a jamais eu, il ne relève pas de cette démarche.",
          "Les terrains en terre posent une question pratique : un camion plateau a besoin d'un sol porteur pour approcher et charger. Indiquez où se trouve le chemin stable le plus proche et si le véhicule peut y être tiré. Après de fortes pluies, il est parfois plus sage d'attendre que le sol sèche.",
        ],
      },
      situations: {
        title: "Les situations typiques autour de Cavaillon",
        items: [
          {
            title: "La camionnette des tournées",
            text: "Utilitaire immatriculé au nom de l'exploitation : prévoyez le signataire habilité et la carte grise.",
          },
          {
            title: "Une voiture au bord d'une parcelle",
            text: "Distance jusqu'au chemin, nature du sol : à décrire pour savoir si le plateau peut approcher.",
          },
          {
            title: "Un doute sur ce qui est accepté",
            text: "Pas de carte grise, pas d'enlèvement : le matériel agricole suit une autre filière.",
          },
        ],
      },
      nearby: ["Cheval-Blanc", "Robion", "Les Taillades"],
    },
  },

  {
    slug: "pertuis",
    name: "Pertuis",
    kind: "city",
    locative: "à Pertuis",
    department: VAUCLUSE,
    postalCodes: ["84120"],
    status: { ...CONFIRMED },
    seo: seo(
      "Pertuis",
      "84120",
      "Maison avec terrain, départ ou véhicule hérité : les démarches et l'accès sont vérifiés avant le rendez-vous.",
      ["épaviste Pertuis", "enlèvement voiture Pertuis", "enlèvement véhicule succession Pertuis"],
    ),
    lead:
      "Au sud du Vaucluse, Pertuis compte beaucoup de maisons avec terrain, où un véhicule hors d'usage reste parfois après un départ ou une succession. Que vous vendiez la maison ou héritiez de la voiture, la question des documents se pose en premier.",
    accessTips: [
      "Véhicule hérité : préparez la carte grise et les justificatifs de la succession, ou signalez ce qui manque.",
      "Vente de la maison : indiquez la date de remise des clés, le véhicule doit partir avant.",
      "Terrain : précisez où la voiture est garée et si le portail laisse passer un camion plateau.",
    ],
    localFacts: [
      {
        text: "Pertuis (code postal 84120) est une commune du Vaucluse (84), située au sud du département, à proximité du pays d'Aix.",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture appartenait à un parent décédé : qui peut demander l'enlèvement ?",
        a: "Un héritier, ou la personne chargée de la succession, peut faire la démarche. Des justificatifs sont nécessaires en plus de la carte grise ; ils vous sont précisés avant toute prise en charge.",
      },
      {
        q: "Nous vendons la maison : peut-on organiser l'enlèvement avant la signature ?",
        a: "C'est même conseillé. Indiquez la date de remise des clés dans la demande : un rendez-vous est recherché avant, sans engagement de date tant qu'il n'est pas confirmé.",
      },
      {
        q: "Le véhicule hérité est en bon état : faut-il vraiment le détruire ?",
        a: "Non, s'il roule encore, un rachat peut être envisagé. Décrivez le véhicule pour obtenir une proposition.",
        link: { href: "/rachat-vehicule", label: "Proposer mon véhicule au rachat" },
      },
    ],
    form: { city: "Pertuis", postalCode: "84120" },
    missing: CITY_MISSING,
    related: ["cavaillon", "avignon", "carpentras", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Succession, vente, départ : régler la question du véhicule",
        paragraphs: [
          "À Pertuis, beaucoup de demandes naissent d'un changement de vie : une maison mise en vente, des propriétaires qui partent, une succession à régler. Dans ces moments, la voiture garée sur le terrain depuis des années devient un point à traiter parmi d'autres, souvent sous contrainte de calendrier.",
          "Lorsqu'un véhicule est hérité, la carte grise est encore au nom du défunt. La démarche reste possible, mais elle demande des justificatifs propres à la succession. Rassemblez ce que vous avez et signalez ce qui manque : les pièces nécessaires vous sont indiquées avant toute prise en charge.",
          "En cas de vente, pensez à la date de remise des clés : une fois la maison cédée, accéder au terrain devient compliqué. Indiquez aussi où se trouve le véhicule sur la propriété et la largeur du portail. Une photo de l'ensemble suffit souvent à valider l'approche.",
        ],
      },
      situations: {
        title: "Les demandes fréquentes à Pertuis",
        items: [
          {
            title: "La voiture d'un parent disparu",
            text: "Carte grise, justificatifs de succession, accord des héritiers : rassemblez-les avant le rendez-vous.",
          },
          {
            title: "Une maison qui change de mains",
            text: "Fixez l'enlèvement avant la remise des clés, tant que le terrain vous reste accessible.",
          },
          {
            title: "Un véhicule au fond du jardin",
            text: "Portail, pente, nature du sol : décrivez le trajet entre la rue et la voiture.",
          },
        ],
      },
      nearby: ["Villelaure", "La Tour-d'Aigues"],
    },
  },
];
