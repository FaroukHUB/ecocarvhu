import type { Sector } from "./types";
import { CITY_MISSING, CONFIRMED, HA, citySeo as seo } from "./shared";

/**
 * Villes des Hautes-Alpes (05). Secteur de montagne éloigné : l'organisation
 * (distance, saison, enneigement, jours d'intervention) est confirmée dossier
 * par dossier. Les faits locaux se limitent au département, au statut
 * administratif et au code postal ; aucun délai ni prix n'est annoncé.
 */
const DEPT_MISSING = "Organisation spécifique au département (distance, saison, jours d'intervention).";
const SOURCE = "Découpage administratif officiel / La Poste";

export const cities05: Sector[] = [
  {
    slug: "gap",
    name: "Gap",
    kind: "city",
    locative: "à Gap",
    department: HA,
    postalCodes: ["05000"],
    status: { ...CONFIRMED },
    seo: seo(
      "Gap",
      "05000",
      "Centre, quartiers périphériques ou maison sur les hauteurs : l'accès et la saison sont pris en compte avant de fixer le passage.",
      ["épaviste Gap", "enlèvement voiture Gap", "épaviste Hautes-Alpes"],
    ),
    lead:
      "Préfecture et principale ville des Hautes-Alpes, Gap s'étend du centre vers des quartiers périphériques et des secteurs plus en hauteur. En hiver, la neige peut compliquer l'accès : indiquez l'emplacement du véhicule et l'état habituel de la route, le passage est confirmé en fonction.",
    accessTips: [
      "Quartier en périphérie ou sur les hauteurs : précisez si la rue est en pente et si elle est déneigée en hiver.",
      "Véhicule couvert de neige ou pris dans un tas de neige de déneigement : dégagez-le autant que possible avant le rendez-vous.",
      "Copropriété : signalez le type de parking (extérieur, couvert, souterrain) et les conditions d'accès.",
    ],
    localFacts: [
      {
        text: "Gap (code postal 05000) est la préfecture des Hautes-Alpes (05).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Peut-on faire enlever une voiture à Gap en plein hiver ?",
        a: "Oui, à condition que l'accès soit praticable le jour convenu. Si la neige ou le verglas rendent la rue dangereuse, le rendez-vous est déplacé d'un commun accord.",
      },
      {
        q: "Mon véhicule est dans un parking souterrain de résidence : est-ce possible ?",
        a: "Indiquez la hauteur d'entrée, la pente de la rampe et si le véhicule roule encore. La faisabilité est vérifiée avant le rendez-vous, car tous les sous-sols ne sont pas accessibles à un camion.",
      },
      {
        q: "Nous sommes une entreprise gapençaise avec plusieurs véhicules à retirer : quelle démarche ?",
        a: "Passez par le formulaire professionnel et décrivez l'ensemble des véhicules : un passage groupé est étudié.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
    ],
    form: { city: "Gap", postalCode: "05000" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["veynes", "embrun", "laragne-monteglin", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Gap en toutes saisons : anticiper la neige et les hauteurs",
        paragraphs: [
          "Gap regroupe un centre dense, des quartiers résidentiels en périphérie et des maisons installées sur les pentes autour de la ville. Selon l'endroit, le camion plateau doit composer avec une rue en pente, un virage serré ou une allée étroite. Indiquez précisément l'adresse, le type de stationnement et tout ce qui pourrait gêner l'approche, photos à l'appui si vous le pouvez.",
          "L'hiver change les conditions. Une rue dégagée en vallée peut rester enneigée ou verglacée un peu plus haut. Signalez si votre route est régulièrement déneigée et si le véhicule est enseveli ou bloqué par un tas de neige. Le rendez-vous est recherché à un moment où l'accès reste raisonnable, et peut être déplacé si la météo se dégrade.",
          "Les Hautes-Alpes sont éloignées des bases d'intervention : l'organisation est confirmée dossier par dossier, selon la distance et la saison, sans délai annoncé à l'avance. L'enlèvement est gratuit pour un véhicule complet et accessible. Pour un véhicule incomplet, enneigé ou difficile à atteindre, les conditions sont discutées et confirmées avec vous avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Les cas que l'on voit à Gap",
        items: [
          {
            title: "Une rue enneigée en hauteur",
            text: "Indiquez si elle est déneigée : le passage est fixé quand l'accès redevient sûr.",
          },
          {
            title: "Un parking de copropriété",
            text: "Hauteur d'entrée, badge et pente de rampe : ces détails conditionnent la faisabilité.",
          },
          {
            title: "Une voiture remplacée après un accident",
            text: "Gardez la carte grise et le certificat de cession à portée de main pour le jour du passage.",
          },
        ],
      },
      nearby: ["Pelleautier", "Rambaud", "Jarjayes"],
    },
  },

  {
    slug: "briancon",
    name: "Briançon",
    kind: "city",
    locative: "à Briançon",
    department: HA,
    postalCodes: ["05100"],
    status: { ...CONFIRMED },
    seo: seo(
      "Briançon",
      "05100",
      "Cité fortifiée, quartiers en altitude ou chalet enneigé : la période et l'accès sont convenus avec vous avant tout déplacement.",
      ["épaviste Briançon", "enlèvement voiture Briançon", "enlèvement épave montagne Hautes-Alpes"],
    ),
    lead:
      "Sous-préfecture des Hautes-Alpes, Briançon compte parmi les villes les plus hautes de France. L'enneigement hivernal et les rues étroites de la cité fortifiée imposent de bien choisir la période et le point de chargement : décrivez la situation, l'organisation est confirmée avec vous.",
    accessTips: [
      "En hiver, indiquez si la route jusqu'au véhicule exige des chaînes ou des équipements neige.",
      "Cité fortifiée : un camion ne peut généralement pas y circuler librement ; dites si le véhicule peut être sorti des remparts.",
      "Véhicule bloqué par la neige depuis des semaines : signalez-le, l'enlèvement peut être prévu à une saison plus favorable.",
    ],
    localFacts: [
      {
        text: "Briançon (code postal 05100) est une sous-préfecture des Hautes-Alpes (05).",
        source: SOURCE,
      },
      {
        text: "Briançon compte parmi les villes les plus hautes de France.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Vaut-il mieux attendre la fin de l'hiver pour faire enlever ma voiture à Briançon ?",
        a: "Ça dépend de l'accès. Si la route est dégagée et le véhicule déblayé, un passage peut être étudié en hiver ; sinon, il est souvent plus simple de convenir d'une période plus favorable. Dans les deux cas, rien n'est fixé sans confirmation.",
      },
      {
        q: "Ma voiture est garée dans la vieille ville, à l'intérieur des remparts : est-ce possible ?",
        a: "Si elle roule, l'amener à l'extérieur de la cité facilite tout. Sinon, décrivez précisément l'emplacement : la faisabilité est étudiée au cas par cas.",
      },
      {
        q: "Je suis saisonnier et je quitte la station en fin de saison : comment m'organiser ?",
        a: "Faites la demande tôt en indiquant votre date de départ et, si besoin, la personne qui remettra les clés et les documents après votre départ.",
      },
    ],
    form: { city: "Briançon", postalCode: "05100" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["embrun", "gap", "veynes", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "En altitude, la saison décide souvent du rendez-vous",
        paragraphs: [
          "À Briançon, l'altitude et l'enneigement pèsent sur tout enlèvement. En hiver, une voiture garée dehors peut disparaître sous la neige, et les routes qui mènent aux quartiers hauts demandent parfois des chaînes. Avant de proposer une date, vérifiez si le véhicule est dégagé, si ses roues tournent et si la voie d'accès est déneigée. Ces informations évitent un déplacement inutile.",
          "La cité fortifiée pose une autre difficulté : rues étroites, portes, passages où un camion ne peut pas s'engager. Un véhicule qui démarre encore peut être sorti des remparts vers un emplacement plus dégagé. Dans le cas contraire, décrivez l'endroit exact et joignez des photos : la faisabilité est étudiée avant de vous proposer quoi que ce soit.",
          "Briançon est l'un des secteurs les plus éloignés : l'organisation est confirmée dossier par dossier, en fonction de la distance et de la saison. Aucun délai n'est promis. L'enlèvement est gratuit pour un véhicule complet et accessible ; s'il est incomplet, enneigé ou difficile à atteindre, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Situations propres à Briançon",
        items: [
          {
            title: "Une voiture ensevelie sous la neige",
            text: "Déblayez-la ou attendez le redoux : le passage est calé sur des conditions réalistes.",
          },
          {
            title: "Un véhicule dans la vieille ville",
            text: "S'il roule, sortez-le des remparts ; sinon, décrivez précisément son emplacement.",
          },
          {
            title: "Un départ en fin de saison",
            text: "Donnez votre date de départ et le nom de la personne qui gardera les clés.",
          },
        ],
      },
      nearby: ["Villard-Saint-Pancrace", "Saint-Chaffrey", "Puy-Saint-Pierre"],
    },
  },

  {
    slug: "embrun",
    name: "Embrun",
    kind: "city",
    locative: "à Embrun",
    department: HA,
    postalCodes: ["05200"],
    status: { ...CONFIRMED },
    seo: seo(
      "Embrun",
      "05200",
      "Résidence secondaire, logement saisonnier ou maison à l'année : l'enlèvement est planifié selon la période et l'accès.",
      ["épaviste Embrun", "enlèvement voiture Embrun", "enlèvement véhicule Serre-Ponçon"],
    ),
    lead:
      "Près du lac de Serre-Ponçon, Embrun accueille des résidents à l'année, des propriétaires de résidences secondaires et des saisonniers. Hors saison, des véhicules restent immobilisés sans que personne ne soit sur place : précisez qui pourra accueillir le camion.",
    accessTips: [
      "Résidence secondaire : indiquez la période où vous ou un proche serez présents pour ouvrir et remettre les clés.",
      "Véhicule immobilisé depuis longtemps : signalez les pneus à plat, les freins grippés ou la batterie vide.",
      "Parking partagé d'une résidence : vérifiez auprès du gestionnaire que le camion peut y entrer.",
    ],
    localFacts: [
      {
        text: "Embrun (code postal 05200) est une commune des Hautes-Alpes (05), près du lac de Serre-Ponçon.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Je ne viens à Embrun que l'été : puis-je organiser l'enlèvement à distance ?",
        a: "Oui, si une personne de confiance peut être présente avec les clés et les documents. Indiquez son nom et ses coordonnées, ou proposez une période où vous serez sur place.",
      },
      {
        q: "La voiture n'a pas bougé depuis plusieurs hivers : est-ce encore enlevable ?",
        a: "Généralement oui, même si elle ne démarre plus. Décrivez son état (roues, freins, carrosserie) pour que le bon matériel soit prévu.",
      },
      {
        q: "Où trouver toutes les conditions de l'enlèvement gratuit ?",
        a: "La page dédiée détaille ce que recouvre la gratuité et les documents à préparer.",
        link: { href: "/enlevement-epave", label: "Voir l'enlèvement d'épave" },
      },
    ],
    form: { city: "Embrun", postalCode: "05200" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["gap", "briancon", "veynes", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Résidences secondaires et saisonniers : qui sera là le jour J ?",
        paragraphs: [
          "Autour d'Embrun, de nombreux logements ne sont occupés qu'une partie de l'année. Une voiture peut rester garée des mois devant une maison fermée, et finir par ne plus démarrer. Les saisonniers, de leur côté, laissent parfois un véhicule en fin de contrat. Dans ces situations, la vraie question est simple : qui sera présent, avec les clés et la carte grise, au moment du passage ?",
          "Un véhicule immobilisé longtemps vieillit mal : pneus dégonflés, freins grippés, batterie à plat, parfois des nids de rongeurs. Rien de tout cela n'empêche l'enlèvement, mais il faut le savoir à l'avance pour prévoir le chargement. Décrivez l'état du véhicule le plus honnêtement possible et ajoutez une photo si vous en avez une récente.",
          "Embrun est éloignée des bases d'intervention : l'organisation est confirmée dossier par dossier, en tenant compte de la distance, de la saison et de votre présence sur place. Aucune date n'est promise avant confirmation. L'enlèvement est gratuit pour un véhicule complet et accessible ; pour tout autre cas, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Ce que l'on nous demande à Embrun",
        items: [
          {
            title: "Une maison fermée hors saison",
            text: "Désignez un voisin ou un proche qui ouvrira et remettra les documents.",
          },
          {
            title: "Une fin de contrat saisonnier",
            text: "Prévenez dès que possible et indiquez votre date de départ.",
          },
          {
            title: "Une voiture qui ne démarre plus après l'hiver",
            text: "Signalez roues bloquées et pneus à plat : le chargement est préparé en conséquence.",
          },
        ],
      },
      nearby: ["Crots", "Baratier", "Saint-Sauveur"],
    },
  },

  {
    slug: "laragne-monteglin",
    name: "Laragne-Montéglin",
    kind: "city",
    locative: "à Laragne-Montéglin",
    department: HA,
    postalCodes: ["05300"],
    status: { ...CONFIRMED },
    seo: seo(
      "Laragne-Montéglin",
      "05300",
      "Bourg, verger ou terrain agricole : décrivez l'accès, il est vérifié avant tout déplacement.",
      ["épaviste Laragne-Montéglin", "enlèvement voiture Laragne", "enlèvement épave sud Hautes-Alpes"],
    ),
    lead:
      "Petite ville du sud des Hautes-Alpes, Laragne-Montéglin est entourée de vergers et de terrains agricoles. Un véhicule hors d'usage peut s'y trouver en bordure de parcelle ou près d'un bâtiment d'exploitation : indiquez comment l'atteindre.",
    accessTips: [
      "Bordure de verger : précisez la largeur entre les rangs et s'il faut traverser la parcelle.",
      "Période de récolte ou de traitement : signalez les moments où le passage d'un camion gênerait l'exploitation.",
      "Dans le bourg : indiquez la rue et si le véhicule est sur la voie publique ou dans une cour.",
    ],
    localFacts: [
      {
        text: "Laragne-Montéglin (code postal 05300) est une commune des Hautes-Alpes (05).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est près d'un hangar agricole, au bout d'un chemin entre les vergers : est-ce accessible ?",
        a: "Cela dépend de la largeur du chemin et de l'état du sol. Décrivez-les avec précision : la faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "Je suis exploitant et j'ai aussi un vieux fourgon de l'exploitation : comment le déclarer ?",
        a: "Utilisez le formulaire professionnel et indiquez à quel nom est la carte grise de chaque véhicule.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
      {
        q: "Puis-je choisir une période en dehors des récoltes ?",
        a: "Oui, indiquez les périodes qui vous conviennent. Le passage est organisé en tenant compte de vos contraintes et de la distance, puis confirmé avec vous.",
      },
    ],
    form: { city: "Laragne-Montéglin", postalCode: "05300" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["gap", "veynes", "embrun", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Entre vergers et parcelles : choisir le bon moment",
        paragraphs: [
          "Autour de Laragne-Montéglin, les vergers et les terrains agricoles occupent une grande place. Il n'est pas rare qu'une ancienne voiture ou un utilitaire termine sa vie près d'un hangar, au bout d'un chemin d'exploitation ou en bordure de parcelle. L'accès dépend alors de la largeur entre les rangs, de la portance du sol et des obstacles à contourner : décrivez tout cela précisément.",
          "Le calendrier agricole compte aussi. Pendant les récoltes ou les traitements, faire entrer un camion dans une exploitation n'est pas toujours souhaitable. Indiquez les périodes où le passage vous arrange. Dans le bourg, la situation est plus simple : précisez la rue, le type de stationnement et la personne présente lors du chargement.",
          "Laragne-Montéglin se trouve loin des bases d'intervention : l'organisation est confirmée dossier par dossier, en fonction de la distance et de la saison. Aucun délai n'est annoncé avant cette confirmation. L'enlèvement est gratuit pour un véhicule complet et accessible ; pour un véhicule incomplet ou difficile d'accès, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Autour de Laragne-Montéglin",
        items: [
          {
            title: "Un véhicule près d'un hangar agricole",
            text: "Décrivez le chemin d'exploitation et le sol : le camion doit pouvoir approcher sans s'enliser.",
          },
          {
            title: "Une période de récolte chargée",
            text: "Proposez un moment plus calme : le rendez-vous est calé avec vous.",
          },
          {
            title: "Un fourgon d'exploitation à réformer",
            text: "Vérifiez le titulaire de la carte grise : société, exploitation ou particulier.",
          },
        ],
      },
      nearby: ["Lazer", "Upaix"],
    },
  },

  {
    slug: "veynes",
    name: "Veynes",
    kind: "city",
    locative: "à Veynes",
    department: HA,
    postalCodes: ["05400"],
    status: { ...CONFIRMED },
    seo: seo(
      "Veynes",
      "05400",
      "Maison de village, garage ou terrain en bord de commune : l'accès et la saison sont étudiés avant le passage.",
      ["épaviste Veynes", "enlèvement voiture Veynes", "épaviste 05400"],
    ),
    lead:
      "Petite ville de montagne des Hautes-Alpes, longtemps connue comme un carrefour ferroviaire, Veynes compte de nombreuses maisons de village et des garages particuliers. Un véhicule y est souvent remisé à l'abri depuis des années : dites-nous comment le sortir.",
    accessTips: [
      "Garage de maison de village : indiquez la largeur de la porte, la rue devant et si le véhicule peut être poussé dehors.",
      "Rue étroite ou en pente : précisez s'il existe une place proche où le camion peut stationner.",
      "Hiver : signalez si la rue reste enneigée ou verglacée et si des chaînes sont nécessaires pour y accéder.",
    ],
    localFacts: [
      {
        text: "Veynes (code postal 05400) est une commune des Hautes-Alpes (05).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture dort dans un garage de village depuis des années : comment la sortir ?",
        a: "Si les roues tournent, elle peut souvent être poussée jusqu'à la rue. Sinon, indiquez la profondeur du garage, la largeur de la porte et l'espace devant : la faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "J'ai récupéré la maison d'un parent avec sa voiture : que dois-je fournir ?",
        a: "La carte grise et les documents prouvant que vous pouvez disposer du véhicule (succession, mandat des héritiers). Précisez votre situation dans la demande : les pièces nécessaires vous sont confirmées.",
      },
      {
        q: "Je n'ai besoin que d'une pièce d'occasion pour mon autre véhicule : est-ce possible ?",
        a: "Vous pouvez faire une demande de pièce, distincte de l'enlèvement.",
        link: { href: "/demande-piece", label: "Demander une pièce" },
      },
    ],
    form: { city: "Veynes", postalCode: "05400" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["gap", "laragne-monteglin", "embrun", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Maisons de village et garages : sortir un véhicule remisé",
        paragraphs: [
          "À Veynes, beaucoup de véhicules hors d'usage ne sont pas dans la rue mais à l'abri : dans un garage de maison de village, une remise ou une cour. Ils y sont parfois depuis longtemps, à la suite d'une panne, d'un décès ou d'un simple oubli. Pour les sortir, il faut savoir si les roues tournent, si la porte est assez large et si la rue permet au camion de s'arrêter devant.",
          "La montagne ajoute ses propres contraintes. En hiver, certaines rues restent enneigées ou verglacées, et une pente devient vite délicate pour un camion chargé. Si c'est le cas chez vous, dites-le dès la demande. Pensez aussi à libérer l'espace devant le garage le jour prévu : un véhicule voisin mal garé suffit à bloquer le chargement.",
          "Veynes est éloignée des bases d'intervention : l'organisation est confirmée dossier par dossier, selon la distance et la saison. Aucune date n'est promise avant d'avoir été convenue avec vous. L'enlèvement est gratuit pour un véhicule complet et accessible ; s'il est incomplet ou difficile à sortir, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "À Veynes, des demandes typiques",
        items: [
          {
            title: "Une voiture oubliée au fond d'un garage",
            text: "Vérifiez que les roues tournent et que la porte s'ouvre entièrement.",
          },
          {
            title: "Une maison familiale à vider",
            text: "Rassemblez carte grise et documents de succession avant de proposer une date.",
          },
          {
            title: "Une rue verglacée en hiver",
            text: "Le passage est envisagé quand la rue redevient praticable pour un camion.",
          },
        ],
      },
      nearby: ["Oze", "Montmaur", "Furmeyer"],
    },
  },
];
