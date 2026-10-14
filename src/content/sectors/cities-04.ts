import type { Sector } from "./types";
import { AHP, CITY_MISSING, CONFIRMED, citySeo as seo } from "./shared";

/**
 * Villes des Alpes-de-Haute-Provence (04). Secteur éloigné : l'organisation
 * (distance, saison, jours d'intervention) est confirmée dossier par dossier.
 * Les faits locaux se limitent au département, au statut administratif et au
 * code postal ; aucun délai ni prix n'est annoncé.
 */
const DEPT_MISSING = "Organisation spécifique au département (distance, saison, jours d'intervention).";
const SOURCE = "Découpage administratif officiel / La Poste";

export const cities04: Sector[] = [
  {
    slug: "manosque",
    name: "Manosque",
    kind: "city",
    locative: "à Manosque",
    department: AHP,
    postalCodes: ["04100"],
    status: { ...CONFIRMED },
    seo: seo(
      "Manosque",
      "04100",
      "Quartier pavillonnaire, zone d'activités ou campagne de la Durance : l'organisation est confirmée avec vous avant tout déplacement.",
      ["épaviste Manosque", "enlèvement voiture Manosque", "épaviste Alpes-de-Haute-Provence"],
    ),
    lead:
      "Principale ville des Alpes-de-Haute-Provence, Manosque mêle quartiers pavillonnaires, zones d'activités et campagne ouverte sur la vallée de la Durance. Dites-nous où se trouve le véhicule et comment on y accède : l'enlèvement est organisé à partir de ces informations, puis confirmé avec vous.",
    accessTips: [
      "Maison individuelle : indiquez si le véhicule est dans l'allée, au garage ou sur la voie publique devant le portail.",
      "Zone d'activités : donnez le nom de l'entreprise, les jours d'ouverture du site et la personne qui accueillera le camion.",
      "Propriété en dehors de la ville : décrivez le chemin d'accès (goudronné ou non, largeur, portail) pour que le bon matériel soit prévu.",
    ],
    localFacts: [
      {
        text: "Manosque (code postal 04100) est une commune des Alpes-de-Haute-Provence (04).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Manosque est loin des grandes villes de la région : le service est-il vraiment assuré ?",
        a: "Oui, Manosque fait partie des secteurs couverts. Comme pour tout le département, le jour de passage est fixé dossier par dossier, en fonction de la distance et des autres demandes du secteur.",
      },
      {
        q: "Notre entreprise de la zone d'activités veut se séparer de deux utilitaires : comment procéder ?",
        a: "Décrivez les deux véhicules dans une seule demande via le formulaire professionnel, avec les horaires d'accès du site.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
      {
        q: "La voiture est dans mon garage, porte basculante : faut-il la sortir ?",
        a: "Si elle roule ou peut être poussée jusqu'à l'allée, c'est plus simple. Sinon, indiquez la largeur de la porte et la place devant le garage : la faisabilité est vérifiée avant le rendez-vous.",
      },
    ],
    form: { city: "Manosque", postalCode: "04100" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["oraison", "forcalquier", "sisteron", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Entre lotissements et zones d'activités : décrire le bon point de chargement",
        paragraphs: [
          "À Manosque, la plupart des véhicules immobilisés dorment dans une allée de maison, sous un abri ou au fond d'un garage individuel. Les quartiers pavillonnaires offrent souvent de la place, mais un portail étroit, un muret ou une pente d'accès suffisent à compliquer le chargement. Une ou deux photos de l'emplacement, prises depuis la rue, valent mieux qu'une longue description.",
          "Les zones d'activités amènent un autre type de demande : utilitaire en fin de vie, véhicule de service accidenté, petit lot à libérer d'un parking. Le site doit être ouvert et une personne doit pouvoir remettre les clés et les documents. Précisez les jours où c'est possible, ainsi que le nom de votre interlocuteur sur place.",
          "Manosque se trouve loin des bases habituelles d'intervention. L'organisation est donc confirmée dossier par dossier : la distance, la saison et les autres demandes du secteur entrent en compte. Aucune date n'est promise avant cette confirmation. L'enlèvement reste gratuit pour un véhicule complet et accessible ; toute situation particulière est discutée et confirmée avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Les demandes que l'on reçoit de Manosque",
        items: [
          {
            title: "Une voiture au fond de l'allée",
            text: "Indiquez la largeur du portail et si le véhicule peut être poussé jusqu'à la rue.",
          },
          {
            title: "Un utilitaire d'entreprise à sortir du parc",
            text: "Jours d'ouverture, contact sur place et carte grise au nom de la société : tout est réglé en une demande.",
          },
          {
            title: "Un véhicule garé dans la campagne",
            text: "Décrivez le chemin et le dernier tronçon goudronné : c'est ce qui détermine le camion envoyé.",
          },
        ],
      },
      nearby: ["Volx", "Pierrevert", "Sainte-Tulle"],
    },
  },

  {
    slug: "digne-les-bains",
    name: "Digne-les-Bains",
    kind: "city",
    locative: "à Digne-les-Bains",
    department: AHP,
    postalCodes: ["04000"],
    status: { ...CONFIRMED },
    seo: seo(
      "Digne-les-Bains",
      "04000",
      "Centre, quartiers en vallée ou hameaux sur les reliefs : l'accès au véhicule est vérifié avant de fixer le passage.",
      ["épaviste Digne-les-Bains", "enlèvement épave Digne", "enlèvement voiture hors d'usage 04"],
    ),
    lead:
      "Préfecture des Alpes-de-Haute-Provence, Digne-les-Bains s'étend au creux de vallées entourées de reliefs, avec des hameaux reliés par des routes de montagne. Plus vous décrivez précisément la route jusqu'au véhicule, plus l'enlèvement peut être préparé sérieusement.",
    accessTips: [
      "Hameau : donnez son nom en plus de « Digne-les-Bains » et signalez les passages étroits ou les virages serrés sur la route.",
      "Route de montagne en hiver : indiquez si elle est régulièrement enneigée ou verglacée, et si elle est déneigée.",
      "Véhicule sur un terrain en pente : précisez dans quel sens il est garé et s'il est calé ou freiné.",
    ],
    localFacts: [
      {
        text: "Digne-les-Bains (code postal 04000) est la préfecture des Alpes-de-Haute-Provence (04).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "J'habite un hameau de Digne-les-Bains, assez loin du centre : est-ce faisable ?",
        a: "Indiquez le nom du hameau et décrivez la route : largeur, revêtement, dernier virage avant la maison. La faisabilité et le jour de passage sont confirmés à partir de ces éléments.",
      },
      {
        q: "Peut-on prévoir l'enlèvement en plein hiver ?",
        a: "C'est possible si la route est praticable le jour convenu. En cas de neige ou de verglas, le rendez-vous peut être déplacé d'un commun accord : rien n'est fixé sans confirmation.",
      },
      {
        q: "Le véhicule n'est pas hors d'usage, il est seulement trop coûteux à réparer : avez-vous une autre solution ?",
        a: "S'il conserve une valeur, une étude de rachat peut être plus adaptée qu'un enlèvement. Décrivez-le précisément.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "Digne-les-Bains", postalCode: "04000" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["manosque", "sisteron", "oraison", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Vallées, reliefs et hameaux : la route compte autant que le véhicule",
        paragraphs: [
          "Digne-les-Bains ne se résume pas à son centre. Une partie des habitations se trouve dans des hameaux dispersés, accessibles par des routes qui montent, se resserrent et tournent. Pour un camion plateau, ces détails comptent : une épingle trop fermée ou un pont étroit peuvent rendre l'approche impossible. Décrivez le trajet depuis la route principale, en signalant tout passage délicat.",
          "La saison joue aussi un rôle. En hiver, certaines routes de montagne peuvent être enneigées ou verglacées, même lorsque la vallée est dégagée. Si c'est le cas chez vous, dites-le dès la demande : le rendez-vous sera recherché à un moment où l'accès est raisonnable, et pourra être déplacé si les conditions changent.",
          "Le département étant éloigné des bases d'intervention, chaque dossier est organisé à part, en tenant compte de la distance et de la saison. Aucune date n'est annoncée avant d'avoir été confirmée avec vous. L'enlèvement est gratuit pour un véhicule complet et accessible ; pour un véhicule incomplet ou difficile d'accès, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Autour de Digne, des cas qui reviennent",
        items: [
          {
            title: "Une maison au bout d'une route sinueuse",
            text: "Signalez les virages serrés et les passages où deux véhicules ne se croisent pas.",
          },
          {
            title: "Une voiture bloquée par l'hiver",
            text: "Indiquez si la route est déneigée : le passage est calé sur une période où l'accès est réaliste.",
          },
          {
            title: "Un véhicule hérité dans un hameau",
            text: "Précisez qui détient la carte grise et les documents de succession, et qui ouvrira sur place.",
          },
        ],
      },
      nearby: ["Mallemoisson", "Marcoux", "Le Chaffaut-Saint-Jurson"],
    },
  },

  {
    slug: "sisteron",
    name: "Sisteron",
    kind: "city",
    locative: "à Sisteron",
    department: AHP,
    postalCodes: ["04200"],
    status: { ...CONFIRMED },
    seo: seo(
      "Sisteron",
      "04200",
      "Vieille ville aux rues étroites, quartiers étagés ou maison de campagne : l'accès est vérifié avant tout rendez-vous.",
      ["épaviste Sisteron", "enlèvement voiture Sisteron", "enlèvement épave résidence secondaire 04"],
    ),
    lead:
      "Sisteron est une ville étagée, avec des rues anciennes étroites et une campagne qui l'entoure. On nous y signale aussi des véhicules laissés dans des résidences secondaires : précisez si vous êtes sur place ou à distance, l'enlèvement s'organise en conséquence.",
    accessTips: [
      "Vieille ville : un camion ne passe pas partout. Indiquez si le véhicule peut être amené jusqu'à une rue plus large.",
      "Rue en forte pente ou en escalier : précisez-le, ainsi que l'état des freins du véhicule.",
      "Résidence secondaire : désignez la personne qui ouvrira et remettra les clés si vous n'êtes pas présent.",
    ],
    localFacts: [
      {
        text: "Sisteron (code postal 04200) est une commune des Alpes-de-Haute-Provence (04).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Je vis loin et la voiture est restée dans notre maison de Sisteron : dois-je être présent ?",
        a: "Pas forcément. Un proche, un voisin ou un mandataire peut accueillir le camion, avec les clés et les documents. Indiquez son nom et ses coordonnées dans la demande.",
      },
      {
        q: "La voiture est garée dans une ruelle de la vieille ville : comment l'atteindre ?",
        a: "Si elle roule ou peut être poussée, elle peut être amenée jusqu'à une voie accessible au camion. Sinon, décrivez l'emplacement exact et la largeur de la rue : la faisabilité est étudiée avant le rendez-vous.",
      },
      {
        q: "Il manque le moteur et quelques pièces : l'enlèvement reste-t-il gratuit ?",
        a: "La gratuité concerne un véhicule complet et accessible. Pour un véhicule incomplet, les conditions sont indiquées et confirmées avant tout rendez-vous.",
        link: { href: "/enlevement-epave", label: "Conditions d'enlèvement" },
      },
    ],
    form: { city: "Sisteron", postalCode: "04200" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["digne-les-bains", "forcalquier", "manosque", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Une ville en étages : penser au chemin du camion",
        paragraphs: [
          "À Sisteron, le relief façonne la ville. Les rues anciennes sont étroites, certaines montent fort, et un camion plateau ne peut pas s'y engager partout. Si le véhicule démarre encore ou peut être poussé, l'amener vers une rue plus large règle souvent la question. Sinon, décrivez précisément l'endroit : largeur, pente, obstacles éventuels.",
          "Une partie des demandes concerne des maisons occupées seulement une partie de l'année. Le propriétaire n'est pas toujours sur place, la voiture n'a pas roulé depuis longtemps, la batterie est à plat. Prévoyez qui ouvrira le portail, remettra les clés et la carte grise : c'est souvent ce point qui conditionne la date, davantage que le véhicule lui-même.",
          "Sisteron est éloignée des bases d'intervention : l'organisation est confirmée dossier par dossier, selon la distance et la saison. Aucun jour de passage n'est garanti avant d'avoir été convenu avec vous. Pour un véhicule complet et accessible, l'enlèvement est gratuit ; dans les autres cas, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Ce que l'on rencontre à Sisteron",
        items: [
          {
            title: "Une ruelle trop étroite pour le camion",
            text: "Dites si le véhicule peut être déplacé de quelques dizaines de mètres vers une voie dégagée.",
          },
          {
            title: "Une maison de vacances fermée",
            text: "Désignez la personne qui ouvrira : le rendez-vous est fixé avec elle.",
          },
          {
            title: "Une voiture dans la campagne alentour",
            text: "Précisez le type de chemin et si le terrain est sec ou boueux selon la saison.",
          },
        ],
      },
      nearby: ["Mison", "Entrepierres", "Salignac"],
    },
  },

  {
    slug: "oraison",
    name: "Oraison",
    kind: "city",
    locative: "à Oraison",
    department: AHP,
    postalCodes: ["04700"],
    status: { ...CONFIRMED },
    seo: seo(
      "Oraison",
      "04700",
      "Maison avec terrain, hangar ou parcelle agricole : décrivez l'accès, il est vérifié avant le passage.",
      ["épaviste Oraison", "enlèvement voiture Oraison", "enlèvement véhicule terrain agricole"],
    ),
    lead:
      "Commune rurale de la vallée de la Durance, Oraison compte de nombreuses maisons avec terrain et des parcelles agricoles. Un véhicule y reste parfois immobilisé longtemps au fond d'une propriété : expliquez où il se trouve et dans quel état est le terrain.",
    accessTips: [
      "Terrain en herbe ou en terre : précisez s'il devient boueux après la pluie et si le camion peut s'en approcher.",
      "Véhicule sous un hangar ou derrière une haie : indiquez la largeur du passage et la hauteur sous toiture.",
      "Pneus à plat ou roues bloquées : signalez-le, le matériel de chargement en dépend.",
    ],
    localFacts: [
      {
        text: "Oraison (code postal 04700) est une commune des Alpes-de-Haute-Provence (04).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est au milieu de mon terrain, dans l'herbe : le camion peut-il aller la chercher ?",
        a: "Tout dépend de la nature du sol et de la distance depuis l'accès carrossable. Décrivez-les, avec une photo si possible : la faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "J'ai un vieux véhicule agricole léger en plus de la voiture : pouvez-vous tout prendre ?",
        a: "Indiquez précisément chaque véhicule, avec sa carte grise s'il en a une. Ce qui peut être enlevé, et à quelles conditions, vous est confirmé avant le passage.",
      },
      {
        q: "Je cherche une pièce pour réparer une autre voiture : pouvez-vous m'aider ?",
        a: "Vous pouvez déposer une demande de pièce d'occasion ; elle est traitée séparément de l'enlèvement.",
        link: { href: "/demande-piece", label: "Demander une pièce" },
      },
    ],
    form: { city: "Oraison", postalCode: "04700" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["manosque", "forcalquier", "digne-les-bains", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Un véhicule au fond du terrain : préparer l'approche",
        paragraphs: [
          "À Oraison, beaucoup de maisons disposent d'un terrain, et c'est souvent là qu'une voiture finit sa vie : sous un arbre, derrière une remise, à côté d'un hangar. Au fil des années, les pneus se dégonflent, la végétation pousse autour et le sol peut s'affaisser. Avant d'organiser quoi que ce soit, il faut savoir si un camion peut approcher, et sur quelle distance le véhicule devra être tiré.",
          "La nature du sol est déterminante. Une parcelle agricole ou un terrain en herbe supportent mal le passage d'un camion après de fortes pluies. Indiquez s'il existe une partie stabilisée, une cour ou un chemin empierré à proximité. Pensez aussi à dégager les branches basses et les objets encombrants avant le rendez-vous.",
          "La commune étant éloignée des bases d'intervention, chaque demande est organisée à part : distance, saison et état du terrain sont pris en compte, et aucun délai n'est promis avant confirmation. L'enlèvement est gratuit pour un véhicule complet et accessible ; si le véhicule est incomplet ou difficile à atteindre, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Situations fréquentes à Oraison",
        items: [
          {
            title: "Une voiture enherbée depuis des années",
            text: "Dégagez l'avant du véhicule et signalez les roues bloquées ou les pneus éclatés.",
          },
          {
            title: "Un sol détrempé après la pluie",
            text: "Le passage peut être décalé à une période où le terrain porte un camion.",
          },
          {
            title: "Plusieurs véhicules sur la même propriété",
            text: "Listez-les tous dans une seule demande, avec les documents disponibles pour chacun.",
          },
        ],
      },
      nearby: ["La Brillanne", "Villeneuve", "Les Mées"],
    },
  },

  {
    slug: "forcalquier",
    name: "Forcalquier",
    kind: "city",
    locative: "à Forcalquier",
    department: AHP,
    postalCodes: ["04300"],
    status: { ...CONFIRMED },
    seo: seo(
      "Forcalquier",
      "04300",
      "Mas isolé, chemin de terre ou maison de bourg : l'accès est étudié avant de convenir d'un passage.",
      ["épaviste Forcalquier", "enlèvement voiture Forcalquier", "épaviste 04300"],
    ),
    lead:
      "Sous-préfecture des Alpes-de-Haute-Provence, Forcalquier est entourée de collines rurales où l'on rejoint certains mas par des chemins de terre. Si le véhicule se trouve hors du bourg, décrivez la route jusqu'au bout : c'est ce qui permet de choisir le bon camion.",
    accessTips: [
      "Chemin de terre : indiquez sa longueur approximative, sa largeur et la présence d'ornières ou de passages ravinés.",
      "Mas isolé : donnez un repère clair (croisement, panneau, boîte aux lettres) pour retrouver l'entrée.",
      "Dans le bourg : signalez les rues en pente et l'endroit où le camion pourrait s'arrêter.",
    ],
    localFacts: [
      {
        text: "Forcalquier (code postal 04300) est une sous-préfecture des Alpes-de-Haute-Provence (04).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Notre mas est au bout d'un long chemin non goudronné : est-ce un obstacle ?",
        a: "Pas nécessairement. Décrivez l'état du chemin, sa largeur et les éventuelles montées : la faisabilité est évaluée avant de fixer quoi que ce soit.",
      },
      {
        q: "Le GPS ne trouve pas bien notre adresse : comment faire ?",
        a: "Ajoutez des repères dans la demande, et si possible des coordonnées GPS ou un point sur une carte. Le jour du rendez-vous, gardez votre téléphone à portée de main.",
      },
      {
        q: "Avant d'enlever la voiture, je voudrais savoir si elle a encore une valeur : est-ce possible ?",
        a: "Oui : décrivez-la dans une demande d'étude de rachat. Si elle n'a plus de valeur, l'enlèvement reste possible.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "Forcalquier", postalCode: "04300" },
    missing: [...CITY_MISSING, DEPT_MISSING],
    related: ["manosque", "oraison", "sisteron", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Chemins de terre et mas isolés : bien guider le chauffeur",
        paragraphs: [
          "Autour de Forcalquier, les collines abritent des mas et des maisons isolées que l'on rejoint par des chemins de terre, parfois longs, parfois ravinés après un orage. Pour un camion plateau, la question n'est pas seulement la largeur : une montée caillouteuse, un fossé en bord de chemin ou un portail étroit peuvent tout changer. Décrivez le trajet depuis la dernière route goudronnée.",
          "Trouver l'adresse est un autre enjeu. Dans la campagne, un nom de lieu-dit ne suffit pas toujours. Donnez des repères concrets, éventuellement des coordonnées GPS, et indiquez un numéro joignable le jour du passage. Si le véhicule est dans le bourg, précisez plutôt la rue et l'endroit où le camion peut stationner sans gêner.",
          "Forcalquier est éloignée des bases d'intervention : l'organisation est confirmée dossier par dossier, selon la distance, la saison et l'état des chemins. Aucune date n'est garantie avant cette confirmation. L'enlèvement est gratuit pour un véhicule complet et accessible ; pour toute autre situation, les conditions vous sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Dans les collines de Forcalquier",
        items: [
          {
            title: "Un chemin raviné après l'orage",
            text: "Signalez son état récent : le passage peut attendre que le chemin redevienne praticable.",
          },
          {
            title: "Une adresse introuvable par GPS",
            text: "Donnez des repères visibles et un numéro joignable le jour prévu.",
          },
          {
            title: "Une maison de bourg sans garage",
            text: "Indiquez la rue et l'endroit le plus proche où le camion peut s'arrêter.",
          },
        ],
      },
      nearby: ["Mane", "Niozelles", "Pierrerue"],
    },
  },
];
