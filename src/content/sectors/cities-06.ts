import type { Sector } from "./types";
import { AM, CITY_MISSING, CONFIRMED, citySeo as seo } from "./shared";

/**
 * Villes des Alpes-Maritimes (06). Faits locaux limités aux données
 * administratives vérifiables (département, codes postaux, statut de
 * sous-préfecture). Aucun délai, prix ni horaire n'est annoncé :
 * l'organisation dans les Alpes-Maritimes est confirmée dossier par dossier.
 */
const AM_MISSING = [...CITY_MISSING, "Organisation spécifique au département (distance, jours d'intervention)."];
const SOURCE = "Découpage administratif officiel / La Poste";

export const cities06: Sector[] = [
  {
    slug: "antibes",
    name: "Antibes",
    kind: "city",
    locative: "à Antibes",
    department: AM,
    postalCodes: ["06600", "06160"],
    status: { ...CONFIRMED },
    seo: seo(
      "Antibes",
      "06600",
      "Antibes, Juan-les-Pins, parking souterrain ou véhicule de société : décrivez l'accès avant tout rendez-vous.",
      ["épaviste Antibes", "enlèvement voiture Juan-les-Pins", "enlèvement véhicule société Sophia Antipolis"],
    ),
    lead:
      "Entre le vieil Antibes, Juan-les-Pins et les résidences dotées de parkings souterrains, les situations varient beaucoup d'une adresse à l'autre. La technopole de Sophia Antipolis, toute proche, amène aussi des demandes pour des véhicules de société.",
    accessTips: [
      "Précisez le code postal : 06600 pour Antibes, 06160 pour Juan-les-Pins.",
      "Parking souterrain : indiquez la hauteur sous plafond si elle est affichée, ainsi que le niveau où se trouve la voiture.",
      "Véhicule d'entreprise : nommez l'interlocuteur habilité à signer la cession au nom de la société.",
    ],
    localFacts: [
      {
        text: "Antibes est une commune des Alpes-Maritimes (06), desservie par les codes postaux 06600 et 06160 (Juan-les-Pins).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est au deuxième sous-sol de ma résidence : est-ce réalisable ?",
        a: "Un camion plateau ne descend pas toujours en sous-sol. Indiquez la hauteur de l'entrée, la pente de la rampe et si le véhicule roule encore : s'il peut être remonté en surface, tout devient plus simple. La faisabilité vous est confirmée avant le rendez-vous.",
      },
      {
        q: "Notre société basée à Sophia Antipolis doit se séparer de véhicules hors d'usage : quelle démarche ?",
        a: "Passez par le formulaire professionnel en listant chaque véhicule et son état. Vérifiez au préalable que la société est bien titulaire des cartes grises, et non un loueur.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
      {
        q: "J'habite Juan-les-Pins : quelle ville renseigner ?",
        a: "Juan-les-Pins fait partie de la commune d'Antibes. Indiquez Antibes et le code postal 06160.",
      },
    ],
    form: { city: "Antibes" },
    missing: AM_MISSING,
    related: ["cannes", "cagnes-sur-mer", "nice", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Antibes et Juan-les-Pins : du sous-sol de résidence au parc d'entreprise",
        paragraphs: [
          "À Antibes comme à Juan-les-Pins, beaucoup de voitures sont garées dans des parkings souterrains de résidences. Ces sous-sols ont souvent une hauteur limitée et des rampes pentues qui ne conviennent pas à un camion plateau. Si le véhicule démarre encore, le remonter en surface ou jusqu'à l'entrée du parking simplifie nettement l'enlèvement ; sinon, décrivez précisément son emplacement.",
          "La proximité de la technopole de Sophia Antipolis explique des demandes venues d'entreprises : véhicules de service accidentés, utilitaires en fin de vie, voitures de fonction immobilisées. Avant toute démarche, vérifiez qui est titulaire de la carte grise. Si c'est un loueur, c'est à lui de décider ; si c'est la société, un représentant habilité signe la cession.",
          "Antibes se trouve dans les Alpes-Maritimes : l'organisation y est confirmée dossier par dossier, en fonction de la distance. Aucun délai n'est annoncé avant l'étude de la demande. L'enlèvement d'un véhicule complet et accessible est gratuit ; pour un sous-sol difficile ou un véhicule incomplet, les conditions sont confirmées avant le rendez-vous. Préciser le niveau et la hauteur d'accès accélère l'étude du dossier.",
        ],
      },
      situations: {
        title: "Demandes fréquentes à Antibes",
        items: [
          {
            title: "Un sous-sol à hauteur limitée",
            text: "Relevez la hauteur affichée à l'entrée et dites si la voiture peut remonter par ses propres moyens.",
          },
          {
            title: "Un utilitaire d'entreprise en fin de vie",
            text: "Préparez l'extrait Kbis et le mandat du signataire, puis décrivez le véhicule dans le formulaire professionnel.",
          },
          {
            title: "Une voiture à Juan-les-Pins",
            text: "Indiquez le code postal 06160 et précisez si elle est dans une résidence ou sur la voie publique.",
          },
        ],
      },
      nearby: ["Vallauris", "Biot", "Villeneuve-Loubet"],
    },
  },

  {
    slug: "cannes",
    name: "Cannes",
    kind: "city",
    locative: "à Cannes",
    department: AM,
    postalCodes: ["06400", "06150"],
    status: { ...CONFIRMED },
    seo: seo(
      "Cannes",
      "06400",
      "Parking souterrain, copropriété ou quartier de La Bocca : l'accès et l'accord du syndic sont vérifiés en amont.",
      ["épaviste Cannes", "enlèvement voiture Cannes La Bocca", "enlèvement épave parking copropriété Cannes"],
    ),
    lead:
      "À Cannes, les véhicules hors d'usage se trouvent souvent dans des parkings souterrains à plusieurs niveaux, au sein de copropriétés gérées par un syndic. À La Bocca comme dans le reste de la ville, l'accord du gestionnaire et une description de l'accès sont les deux préalables à un enlèvement.",
    accessTips: [
      "Précisez le code postal : 06400 pour Cannes, 06150 pour Cannes La Bocca.",
      "Copropriété : informez le syndic ou le gardien et demandez les modalités d'ouverture du parking.",
      "Parking à plusieurs niveaux : indiquez le niveau, le numéro de place et la présence d'une rampe en spirale.",
    ],
    localFacts: [
      {
        text: "Cannes est une commune des Alpes-Maritimes (06), desservie par les codes postaux 06400 et 06150 (Cannes La Bocca).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Le syndic doit-il donner son accord pour sortir une voiture du parking de la copropriété ?",
        a: "Le propriétaire du véhicule décide de sa cession, mais l'accès au parking relève des règles de la copropriété. Prévenez le syndic ou le gardien : un badge, une clé ou une présence peuvent être nécessaires le jour du rendez-vous.",
      },
      {
        q: "Une voiture abandonnée occupe une place dans notre parking : pouvons-nous la faire enlever ?",
        a: "Non, pas directement : seul le titulaire de la carte grise, ou une personne qu'il mandate, peut céder le véhicule. Pour un véhicule dont le propriétaire est inconnu, le syndic doit passer par les démarches prévues par la réglementation.",
      },
      {
        q: "Ma voiture est encore en bon état mais je n'en veux plus : que me conseillez-vous ?",
        a: "Si elle conserve une valeur, demandez une étude de rachat avant d'envisager un enlèvement.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "Cannes" },
    missing: AM_MISSING,
    related: ["le-cannet", "antibes", "grasse", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Copropriétés cannoises : passer par le syndic avant le camion",
        paragraphs: [
          "Une grande partie du parc automobile cannois dort dans des parkings souterrains de copropriétés, parfois sur plusieurs niveaux. Rampes étroites, virages en sous-sol, hauteur limitée : ces ouvrages sont rarement conçus pour un camion plateau. La première étape consiste à savoir si la voiture peut être amenée jusqu'à la sortie, par ses propres moyens ou en la poussant.",
          "Le syndic ou le gardien jouent souvent un rôle clé : ils détiennent les badges, connaissent le règlement et peuvent indiquer un emplacement de chargement en surface. Contactez-les avant de faire la demande, et précisez leurs consignes. À La Bocca, où l'on trouve aussi des maisons et de petites résidences, les accès sont parfois plus simples, mais restent à décrire.",
          "Cannes étant dans les Alpes-Maritimes, l'organisation de l'enlèvement y est confirmée dossier par dossier, selon la distance. Aucun délai n'est garanti à l'avance. Pour un véhicule complet et accessible, l'enlèvement est gratuit ; un véhicule difficile à extraire d'un sous-sol fait l'objet de conditions confirmées avant le rendez-vous. Joindre une photo de la rampe et de l'entrée du parking permet de lever la plupart des doutes dès le départ.",
        ],
      },
      situations: {
        title: "Ce qui revient le plus souvent à Cannes",
        items: [
          {
            title: "Une voiture au dernier niveau du sous-sol",
            text: "Dites si elle démarre : la remonter à l'entrée du parking change tout pour le chargement.",
          },
          {
            title: "Un gardien qui détient les badges",
            text: "Convenez avec lui d'une présence le jour du rendez-vous et indiquez son contact dans la demande.",
          },
          {
            title: "Une maison à La Bocca",
            text: "Renseignez le code postal 06150 et décrivez l'entrée de la propriété ou la rue de stationnement.",
          },
        ],
      },
      nearby: ["Le Cannet", "Mandelieu-la-Napoule", "Mougins"],
    },
  },

  {
    slug: "grasse",
    name: "Grasse",
    kind: "city",
    locative: "à Grasse",
    department: AM,
    postalCodes: ["06130"],
    status: { ...CONFIRMED },
    seo: seo(
      "Grasse",
      "06130",
      "Hameau, route en lacets ou propriété avec terrain : décrivez le chemin, la faisabilité est vérifiée en amont.",
      ["épaviste Grasse", "enlèvement voiture Grasse", "épaviste 06130"],
    ),
    lead:
      "Sous-préfecture des Alpes-Maritimes, Grasse s'étend sur des collines où se répartissent de nombreux hameaux. Entre routes en lacets et propriétés avec terrain, l'enlèvement d'un véhicule commence par une description précise du chemin qui y mène.",
    accessTips: [
      "Indiquez le hameau ou le quartier en plus de l'adresse : la commune est étendue.",
      "Route en lacets : signalez les épingles serrées et l'existence d'une aire où un camion peut manœuvrer.",
      "Propriété : précisez la largeur du portail et la pente de l'allée jusqu'au véhicule.",
    ],
    localFacts: [
      {
        text: "Grasse (code postal 06130) est une sous-préfecture des Alpes-Maritimes (06).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "J'habite un hameau de Grasse, loin du centre : ma demande est-elle recevable ?",
        a: "Oui, la demande est étudiée quel que soit le quartier. Indiquez le nom du hameau et décrivez la route ; l'équipe vous dit ensuite si l'accès est possible et à quelles conditions.",
      },
      {
        q: "Le véhicule est en contrebas de la maison, l'allée est très raide : que faut-il prévoir ?",
        a: "Joignez une photo de l'allée prise depuis la route et indiquez si la voiture roule encore. Un treuil peut être nécessaire : cela se vérifie avant le rendez-vous, avec les conditions qui s'y rattachent.",
      },
      {
        q: "Je cherche une pièce d'occasion pour un autre véhicule : pouvez-vous m'aider ?",
        a: "Vous pouvez déposer une recherche de pièce, distincte de la demande d'enlèvement.",
        link: { href: "/demande-piece", label: "Rechercher une pièce" },
      },
    ],
    form: { city: "Grasse", postalCode: "06130" },
    missing: AM_MISSING,
    related: ["cannes", "le-cannet", "antibes", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Collines et hameaux grassois : décrire la route avant tout",
        paragraphs: [
          "Grasse ne se résume pas à son centre ancien. La commune s'étale sur des collines, avec de nombreux hameaux reliés par des routes qui montent en lacets. Un même code postal recouvre donc des situations très différentes : une rue de quartier facile d'accès, ou un chemin étroit qui serpente jusqu'à une maison isolée. C'est la route qui détermine la faisabilité.",
          "Les propriétés avec terrain sont nombreuses, et une voiture hors d'usage y reste parfois longtemps, garée sur une restanque ou au bout d'une allée en pente. Avant de faire la demande, prenez quelques photos : la route depuis le dernier carrefour, le portail, l'allée et le véhicule lui-même. Elles évitent bien des allers-retours.",
          "Grasse se trouve dans les Alpes-Maritimes : l'organisation y est confirmée dossier par dossier, en tenant compte de la distance. Aucun délai n'est fixé d'avance. L'enlèvement d'un véhicule complet et accessible est gratuit ; un accès difficile ou un véhicule incomplet donne lieu à des conditions confirmées avant le rendez-vous. Plus la route est décrite avec précision, plus la réponse peut être claire.",
        ],
      },
      situations: {
        title: "Configurations courantes à Grasse",
        items: [
          {
            title: "Une maison isolée sur les hauteurs",
            text: "Décrivez la route depuis le dernier carrefour et signalez les passages les plus étroits.",
          },
          {
            title: "Une voiture garée sur une restanque",
            text: "Précisez la hauteur du mur, l'accès à la terrasse et si le véhicule peut être déplacé.",
          },
          {
            title: "Un portail étroit",
            text: "Mesurez sa largeur : si le camion ne peut pas entrer, la voiture devra être amenée jusqu'à la route.",
          },
        ],
      },
      nearby: ["Mouans-Sartoux", "Peymeinade"],
    },
  },

  {
    slug: "cagnes-sur-mer",
    name: "Cagnes-sur-Mer",
    kind: "city",
    locative: "à Cagnes-sur-Mer",
    department: AM,
    postalCodes: ["06800"],
    status: { ...CONFIRMED },
    seo: seo(
      "Cagnes-sur-Mer",
      "06800",
      "Du Cros-de-Cagnes au haut de Cagnes : indiquez le quartier, l'accès est vérifié avant le déplacement.",
      ["épaviste Cagnes-sur-Mer", "enlèvement voiture Cagnes-sur-Mer", "enlèvement épave Cros-de-Cagnes"],
    ),
    lead:
      "Entre Nice et Antibes, Cagnes-sur-Mer va du Cros-de-Cagnes, en bord de mer, jusqu'au haut de Cagnes, perché sur sa colline. Le quartier change complètement la manière d'aborder un enlèvement : précisez-le dès la demande.",
    accessTips: [
      "Nommez le quartier : Cros-de-Cagnes, centre, haut de Cagnes ou zone résidentielle.",
      "Haut de Cagnes : les ruelles du village perché sont étroites ; indiquez si le véhicule peut être descendu vers une voie plus large.",
      "Résidence : précisez si le parking est en surface ou en sous-sol, et qui peut l'ouvrir.",
    ],
    localFacts: [
      {
        text: "Cagnes-sur-Mer (code postal 06800) est une commune des Alpes-Maritimes (06), située entre Nice et Antibes.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Ma voiture est garée près du village perché : un camion peut-il y accéder ?",
        a: "Les rues du haut de Cagnes sont étroites et pentues, ce qui limite l'approche d'un camion. Si le véhicule peut être déplacé vers une voie plus large, signalez-le. Sinon, décrivez l'emplacement : la faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "J'habite au Cros-de-Cagnes : dois-je indiquer un autre code postal ?",
        a: "Non, le Cros-de-Cagnes fait partie de Cagnes-sur-Mer et partage le code postal 06800. Précisez simplement le quartier.",
      },
      {
        q: "Je souhaite faire enlever ma voiture et récupérer certaines pièces avant : est-ce possible ?",
        a: "Le véhicule doit rester complet pour que l'enlèvement soit gratuit. Si vous retirez des éléments, signalez-le : les conditions sont alors confirmées avant le rendez-vous.",
      },
    ],
    form: { city: "Cagnes-sur-Mer", postalCode: "06800" },
    missing: AM_MISSING,
    related: ["nice", "antibes", "le-cannet", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Du bord de mer au village perché : deux Cagnes, deux approches",
        paragraphs: [
          "À Cagnes-sur-Mer, l'écart est grand entre le Cros-de-Cagnes, ouvert sur le littoral, et le haut de Cagnes, village perché aux rues étroites et pentues. Entre les deux s'étendent des quartiers résidentiels, des résidences avec parking et des maisons individuelles. Le nom du quartier donne d'emblée une idée de l'accès et oriente la préparation de l'enlèvement.",
          "Près du bord de mer, le stationnement est souvent dense : le camion doit pouvoir s'arrêter le temps du chargement sans gêner la circulation. Sur les hauteurs, c'est la largeur des voies qui pose question. Dans les deux cas, une photo de la rue et quelques mots sur l'emplacement exact du véhicule permettent de préparer l'intervention correctement.",
          "Cagnes-sur-Mer étant dans les Alpes-Maritimes, l'organisation y est confirmée dossier par dossier, en fonction de la distance. Aucun délai n'est annoncé avant l'étude de votre demande. Un véhicule complet et accessible est enlevé gratuitement ; les situations plus complexes font l'objet de conditions confirmées avant le rendez-vous. N'oubliez pas de préciser le quartier : c'est la première information que l'équipe regarde.",
        ],
      },
      situations: {
        title: "À Cagnes-sur-Mer, selon le quartier",
        items: [
          {
            title: "Une rue animée près du littoral",
            text: "Repérez une place ou un renfoncement où le camion peut s'arrêter pendant le chargement.",
          },
          {
            title: "Une ruelle du village perché",
            text: "Si la voiture roule, rapprochez-la d'une voie plus large ; sinon, décrivez la rue en détail.",
          },
          {
            title: "Un parking de résidence fermé",
            text: "Indiquez qui ouvre la barrière ou le portail le jour du rendez-vous.",
          },
        ],
      },
      nearby: ["Villeneuve-Loubet", "Saint-Laurent-du-Var", "La Colle-sur-Loup"],
    },
  },

  {
    slug: "le-cannet",
    name: "Le Cannet",
    kind: "city",
    locative: "au Cannet",
    department: AM,
    postalCodes: ["06110"],
    status: { ...CONFIRMED },
    seo: {
      ...seo(
        "Le Cannet",
        "06110",
        "",
        ["épaviste Le Cannet", "enlèvement voiture Le Cannet", "épaviste 06110"],
      ),
      title: "Enlèvement d'épave gratuit au Cannet (06110) : épaviste Le Cannet",
      description:
        "Enlèvement d'épave gratuit au Cannet pour tout véhicule complet et accessible. Rue en pente, garage individuel ou parking de résidence : l'accès est vérifié avant le rendez-vous. Demande en ligne ou par téléphone.",
      h1: "Enlèvement d'épave gratuit au Cannet",
      intent: "Locale transactionnelle : faire enlever un véhicule au Cannet",
    },
    lead:
      "Voisine de Cannes, Le Cannet s'élève sur les hauteurs, avec de nombreuses rues en pente. Les véhicules hors d'usage y attendent souvent dans un garage individuel ou un parking de résidence : décrivez l'endroit, et les conditions d'enlèvement vous sont confirmées.",
    accessTips: [
      "Garage individuel : indiquez le type de porte (basculante, battante) et sa largeur.",
      "Rue en pente : précisez si le véhicule freine encore et s'il est garé dans le sens de la descente.",
      "Parking de résidence : dites qui détient le badge et si l'accès se fait par une rampe.",
    ],
    localFacts: [
      {
        text: "Le Cannet (code postal 06110) est une commune des Alpes-Maritimes (06), voisine de Cannes.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est dans mon garage fermé et ne démarre plus : comment la sortir ?",
        a: "Indiquez si les roues tournent et si le frein à main se desserre : on peut parfois la pousser jusqu'à la rue. Sinon, la largeur de la porte et la place disponible devant le garage déterminent la méthode. Tout est vérifié avant le rendez-vous.",
      },
      {
        q: "Ma rue est très pentue : est-ce un frein à l'enlèvement ?",
        a: "Une forte pente complique le chargement, surtout si le véhicule ne freine plus. Signalez-le avec une photo ; la faisabilité et les conditions vous sont confirmées avant tout déplacement.",
      },
      {
        q: "Je possède aussi une voiture récente que je souhaite vendre : pouvez-vous l'étudier ?",
        a: "Oui, une étude de rachat peut être demandée séparément pour un véhicule qui a encore de la valeur.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "Le Cannet", postalCode: "06110" },
    missing: AM_MISSING,
    related: ["cannes", "grasse", "antibes", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Sortir une voiture d'un garage du Cannet",
        paragraphs: [
          "Au Cannet, la ville monte depuis la limite de Cannes vers les hauteurs, et beaucoup de rues sont en pente. Les véhicules dont on ne se sert plus finissent souvent dans un garage individuel, sous la maison ou en batterie au fond d'une impasse. La porte, la place devant et l'inclinaison de la rue déterminent la manière de les sortir et de les charger.",
          "Dans les résidences, le véhicule est plutôt sur une place de parking, en surface ou en sous-sol. Renseignez-vous sur la rampe, la hauteur d'accès et la personne qui détient le badge. Si la voiture démarre encore, l'amener sur une portion de rue plate avant le rendez-vous rend le chargement plus sûr pour tout le monde.",
          "Le Cannet se trouve dans les Alpes-Maritimes : l'organisation de l'enlèvement y est confirmée dossier par dossier, en tenant compte de la distance. Aucun délai n'est garanti à l'avance. L'enlèvement est gratuit pour un véhicule complet et accessible ; un garage difficile à dégager ou une forte pente donnent lieu à des conditions confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Les cas que l'on voit au Cannet",
        items: [
          {
            title: "Un garage en batterie au bout d'une impasse",
            text: "Précisez l'espace disponible devant la porte : il faut pouvoir sortir la voiture et approcher le camion.",
          },
          {
            title: "Un véhicule garé dans une descente",
            text: "Signalez l'état des freins : un véhicule qui ne retient plus se prépare avec précaution.",
          },
          {
            title: "Une place en sous-sol de résidence",
            text: "Notez la hauteur de l'entrée et le niveau de la place, et prévoyez le badge le jour venu.",
          },
        ],
      },
      nearby: ["Cannes", "Mougins", "Vallauris"],
    },
  },
];
