import type { Sector } from "./types";
import { CITY_MISSING, CONFIRMED, VAR, citySeo as seo } from "./shared";

/**
 * Villes du Var (83). Faits locaux limités aux données administratives
 * vérifiables (département, codes postaux, statut de sous-préfecture).
 * Aucun délai, prix ni horaire n'est annoncé : l'organisation dans le Var
 * est confirmée dossier par dossier.
 */
const VAR_MISSING = [...CITY_MISSING, "Organisation spécifique au département (distance, jours d'intervention)."];
const SOURCE = "Découpage administratif officiel / La Poste";

export const cities83: Sector[] = [
  {
    slug: "la-seyne-sur-mer",
    name: "La Seyne-sur-Mer",
    kind: "city",
    locative: "à La Seyne-sur-Mer",
    department: VAR,
    postalCodes: ["83500"],
    status: { ...CONFIRMED },
    seo: seo(
      "La Seyne-sur-Mer",
      "83500",
      "Parking d'immeuble, garage de lotissement ou rue de quartier : l'accès est étudié avant tout rendez-vous.",
      ["épaviste La Seyne-sur-Mer", "enlèvement voiture La Seyne-sur-Mer", "épaviste 83500"],
    ),
    lead:
      "Voisine de Toulon, La Seyne-sur-Mer mêle grands ensembles d'habitat collectif et quartiers pavillonnaires. Que le véhicule dorme au pied d'un immeuble ou devant une maison, une description précise de son emplacement permet de vous confirmer les conditions d'enlèvement.",
    accessTips: [
      "Parking d'immeuble : précisez le bâtiment, le niveau et la présence éventuelle d'une barrière ou d'un bip.",
      "Si le véhicule occupe une place attribuée, indiquez-le : cela facilite le repérage le jour venu.",
      "Quartier pavillonnaire : dites si la voiture est dans une allée privée, un garage ou sur la chaussée.",
    ],
    localFacts: [
      {
        text: "La Seyne-sur-Mer (code postal 83500) est une commune du Var (83), voisine de Toulon.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est sur le parking de mon immeuble : faut-il prévenir le bailleur ou le syndic ?",
        a: "C'est conseillé. Le gestionnaire peut avoir des consignes sur l'accès des camions ou l'usage de la barrière. Mentionnez-les dans votre demande : le rendez-vous est proposé en tenant compte de ces contraintes.",
      },
      {
        q: "Je n'ai plus les clés du véhicule : l'enlèvement reste-t-il possible ?",
        a: "Signalez-le dès la demande. Sans clés, le véhicule ne peut souvent pas être mis au point mort ni déverrouillé, ce qui change la manière de le charger. La faisabilité et les conditions sont confirmées avant le rendez-vous.",
      },
      {
        q: "Ma voiture roule encore mais ne passe plus le contrôle technique : est-ce une épave ?",
        a: "Pas forcément. Si elle garde de la valeur, une étude de rachat peut être plus adaptée qu'un enlèvement. Décrivez-la pour être orienté.",
        link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
      },
    ],
    form: { city: "La Seyne-sur-Mer", postalCode: "83500" },
    missing: VAR_MISSING,
    related: ["toulon", "saint-cyr-sur-mer", "hyeres", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Au pied des immeubles seynois : préparer l'accès au parking",
        paragraphs: [
          "À La Seyne-sur-Mer, une bonne partie des véhicules hors d'usage attendent sur des parkings d'immeubles. Ces espaces sont souvent bien remplis, avec des voitures garées de part et d'autre des allées. Avant de proposer une date, regardez si un camion plateau peut manœuvrer près de la place et notez les éventuels obstacles : barrière, plots, bordures hautes ou passage étroit entre deux bâtiments.",
          "Dans les quartiers résidentiels, la situation est différente : le véhicule est plutôt dans une cour, un garage ou une allée privée. Indiquez si le portail laisse passer un camion, si la voiture peut être poussée jusqu'à la rue et si ses roues tournent encore. Ces informations simples suffisent souvent à savoir comment s'y prendre.",
          "La Seyne-sur-Mer étant dans le Var, l'organisation de l'enlèvement est confirmée dossier par dossier, en tenant compte de la distance. Aucun délai n'est annoncé à l'avance : le jour et les conditions vous sont précisés dans la réponse. Pour un véhicule complet et accessible, l'enlèvement est gratuit ; tout autre cas est examiné et confirmé avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Cas fréquents à La Seyne-sur-Mer",
        items: [
          {
            title: "Une voiture oubliée sur le parking de la résidence",
            text: "Si elle vous appartient, rassemblez carte grise et pièce d'identité ; le gestionnaire de l'immeuble peut faciliter l'accès.",
          },
          {
            title: "Un véhicule enfermé dans un garage de lotissement",
            text: "Mesurez la largeur de la porte et dites si la voiture peut être sortie à la main ou non.",
          },
          {
            title: "Un habitant de la presqu'île voisine",
            text: "Vous résidez du côté de Saint-Mandrier ? Indiquez la commune exacte et le code postal : la demande est étudiée de la même façon.",
          },
        ],
      },
      nearby: ["Toulon", "Six-Fours-les-Plages", "Saint-Mandrier-sur-Mer", "Ollioules"],
    },
  },

  {
    slug: "hyeres",
    name: "Hyères",
    kind: "city",
    locative: "à Hyères",
    department: VAR,
    postalCodes: ["83400"],
    status: { ...CONFIRMED },
    seo: seo(
      "Hyères",
      "83400",
      "Ville, presqu'île de Giens ou résidence secondaire : chaque situation est examinée avant le déplacement.",
      ["épaviste Hyères", "enlèvement voiture Hyères", "enlèvement épave Giens"],
    ),
    lead:
      "La commune d'Hyères s'étend du centre-ville jusqu'à la presqu'île de Giens et comprend aussi les îles de Porquerolles, Port-Cros et du Levant. Précisez où se trouve exactement le véhicule : sur le continent, la demande suit le circuit habituel ; sur une île, elle fait l'objet d'une étude particulière.",
    accessTips: [
      "Indiquez si le véhicule est en ville, sur la presqu'île de Giens ou sur l'une des îles de la commune.",
      "Résidence secondaire : donnez le nom d'une personne présente sur place le jour du rendez-vous.",
      "Propriété fermée une partie de l'année : précisez qui détient les clés du portail.",
    ],
    localFacts: [
      {
        text: "Hyères (code postal 83400) est une commune du Var (83). Son territoire comprend la presqu'île de Giens et les îles de Porquerolles, Port-Cros et du Levant.",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Le véhicule se trouve sur une île de la commune : pouvez-vous l'enlever ?",
        a: "Un véhicule situé sur une île relève de conditions particulières, liées notamment au transport. Rien n'est promis à l'avance : décrivez la situation et l'équipe vous dit si une solution est envisageable, et à quelles conditions.",
      },
      {
        q: "Je n'habite à Hyères qu'une partie de l'année : comment organiser l'enlèvement ?",
        a: "Faites la demande depuis chez vous et désignez une personne de confiance sur place, munie des clés et des documents. Une procuration signée du titulaire de la carte grise permet la cession en votre absence.",
      },
      {
        q: "Ma maison est sur la presqu'île de Giens : est-ce traité comme le reste d'Hyères ?",
        a: "La presqu'île fait partie de la commune et partage le code postal 83400. Précisez simplement le lieu exact et l'accès au terrain ; les conditions vous sont confirmées avant le rendez-vous.",
      },
    ],
    form: { city: "Hyères", postalCode: "83400" },
    missing: VAR_MISSING,
    related: ["toulon", "la-seyne-sur-mer", "frejus", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Hyères, entre continent, presqu'île et îles",
        paragraphs: [
          "Hyères n'est pas une commune comme les autres : en plus du centre-ville et de ses quartiers, elle comprend la presqu'île de Giens et plusieurs îles. Pour un enlèvement, la première question est donc simple : où se trouve le véhicule ? Sur le continent ou sur la presqu'île, l'accès se prépare comme ailleurs. Sur une île, la situation est étudiée à part, sans engagement préalable.",
          "Beaucoup de logements hyérois sont des résidences secondaires. Une voiture laissée là depuis plusieurs saisons finit parfois par ne plus démarrer. Si vous n'êtes pas sur place, organisez-vous avant de faire la demande : qui ouvrira le portail, qui remettra les clés et les papiers, et à quel moment cette personne est disponible. Une procuration signée complète utilement ce dispositif.",
          "Comme pour tout le Var, l'organisation est confirmée dossier par dossier, en fonction de la distance à parcourir. Aucun délai n'est fixé d'avance. L'enlèvement d'un véhicule complet et accessible est gratuit ; un véhicule incomplet, difficile d'accès ou situé sur une île fait l'objet de conditions confirmées avant le rendez-vous. Mieux vaut donc décrire la situation dans le détail dès le premier message.",
        ],
      },
      situations: {
        title: "Ce que l'on rencontre à Hyères",
        items: [
          {
            title: "La voiture de la maison de vacances",
            text: "Restée immobile trop longtemps, elle ne démarre plus : signalez l'état des pneus et si le frein à main est bloqué.",
          },
          {
            title: "Un terrain sur la presqu'île",
            text: "Décrivez le chemin d'accès et la largeur du portail : c'est ce qui permet de savoir si un camion peut entrer.",
          },
          {
            title: "Un véhicule sur une île",
            text: "Cas particulier par nature : exposez la situation, l'équipe étudie ce qui est envisageable sans rien promettre.",
          },
        ],
      },
      nearby: ["La Crau", "Carqueiranne", "La Londe-les-Maures"],
    },
  },

  {
    slug: "frejus",
    name: "Fréjus",
    kind: "city",
    locative: "à Fréjus",
    department: VAR,
    postalCodes: ["83600", "83370"],
    status: { ...CONFIRMED },
    seo: seo(
      "Fréjus",
      "83600",
      "Fréjus ou Saint-Aygulf, résidence de vacances ou camping : signalez qui sera présent sur place.",
      ["épaviste Fréjus", "enlèvement voiture Fréjus", "épaviste Saint-Aygulf"],
    ),
    lead:
      "À Fréjus, de nombreux véhicules hors d'usage appartiennent à des propriétaires qui ne vivent pas sur place toute l'année. Résidence de vacances, camping ou maison à Saint-Aygulf : indiquez le code postal et la personne joignable sur place pour que l'enlèvement soit organisé.",
    accessTips: [
      "Précisez le code postal : 83600 pour Fréjus, 83370 pour Saint-Aygulf.",
      "Camping ou résidence de vacances : vérifiez auprès du gestionnaire si un camion peut entrer sur le site.",
      "Propriétaire absent : indiquez le nom et le téléphone de la personne qui vous représentera.",
    ],
    localFacts: [
      {
        text: "Fréjus est une commune du Var (83), desservie par les codes postaux 83600 et 83370 (Saint-Aygulf).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Je vis loin de Fréjus et ma voiture y est immobilisée : comment faire ?",
        a: "Déposez la demande à distance et confiez clés et documents à un proche, un voisin ou le gestionnaire de la résidence. Une procuration du titulaire de la carte grise lui permet de signer la cession à votre place.",
      },
      {
        q: "Le véhicule est dans un camping : l'accès est-il autorisé ?",
        a: "Cela dépend du règlement du site. Interrogez le gestionnaire avant de proposer une date et transmettez ses consignes dans votre demande ; la faisabilité vous est confirmée ensuite.",
      },
      {
        q: "J'habite Saint-Aygulf : dois-je écrire Fréjus dans le formulaire ?",
        a: "Oui, Saint-Aygulf fait partie de la commune de Fréjus. Indiquez Fréjus comme ville et le code postal 83370 pour situer précisément le véhicule.",
      },
    ],
    form: { city: "Fréjus" },
    missing: VAR_MISSING,
    related: ["saint-raphael", "draguignan", "hyeres", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Propriétaire absent, voiture à Fréjus : s'organiser à distance",
        paragraphs: [
          "Fréjus accueille beaucoup de résidences de vacances et de campings. Il est fréquent qu'une voiture y reste garée hors saison et finisse par tomber en panne, alors que son propriétaire habite ailleurs. L'enlèvement reste possible sans que vous fassiez le déplacement, à condition de préparer en amont la remise des clés et des documents à une personne de confiance.",
          "Pensez à la procuration : le titulaire de la carte grise peut mandater quelqu'un pour signer la cession à sa place. Joignez la copie de sa pièce d'identité et le certificat d'immatriculation. Dans une résidence ou un camping, prévenez aussi le gestionnaire, qui peut fixer des règles d'accès aux véhicules lourds ou des périodes à éviter.",
          "Fréjus se situe dans l'est du Var : l'organisation y est confirmée dossier par dossier, selon la distance. Aucun délai n'est annoncé avant l'étude de votre demande, et la date proposée tient compte de la disponibilité de votre représentant sur place. L'enlèvement d'un véhicule complet et accessible est gratuit ; les autres situations sont examinées, et leurs conditions vous sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Situations courantes à Fréjus et Saint-Aygulf",
        items: [
          {
            title: "Une voiture restée au camping",
            text: "Obtenez l'accord du gestionnaire et indiquez l'emplacement exact du véhicule sur le site.",
          },
          {
            title: "Un appartement de vacances inoccupé",
            text: "Désignez la personne qui aura les clés et une procuration signée le jour du rendez-vous.",
          },
          {
            title: "Une maison à Saint-Aygulf",
            text: "Renseignez le code postal 83370 et décrivez l'accès à la propriété : allée, portail, garage.",
          },
        ],
      },
      nearby: ["Saint-Raphaël", "Puget-sur-Argens", "Roquebrune-sur-Argens"],
    },
  },

  {
    slug: "saint-raphael",
    name: "Saint-Raphaël",
    kind: "city",
    locative: "à Saint-Raphaël",
    department: VAR,
    postalCodes: ["83700", "83530"],
    status: { ...CONFIRMED },
    seo: seo(
      "Saint-Raphaël",
      "83700",
      "Quartiers en hauteur, routes sinueuses ou Agay : décrivez l'accès, la faisabilité est vérifiée avant de se déplacer.",
      ["épaviste Saint-Raphaël", "enlèvement voiture Saint-Raphaël", "épaviste Agay"],
    ),
    lead:
      "Voisine de Fréjus, Saint-Raphaël s'adosse au massif de l'Estérel : plusieurs quartiers sont en hauteur et reliés par des routes sinueuses, jusqu'à Agay. Une description fidèle de la route menant au véhicule est la meilleure façon de préparer l'enlèvement.",
    accessTips: [
      "Indiquez le code postal : 83700 pour Saint-Raphaël, 83530 pour Agay.",
      "Route étroite ou en lacets : signalez les virages serrés et les passages où deux véhicules ne se croisent pas.",
      "Maison en contrebas ou en surplomb de la route : précisez le dénivelé entre la voiture et la chaussée.",
    ],
    localFacts: [
      {
        text: "Saint-Raphaël est une commune du Var (83), voisine de Fréjus, desservie par les codes postaux 83700 et 83530 (Agay).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "Ma maison est sur les hauteurs, la route est étroite : un camion peut-il monter ?",
        a: "Tout dépend de la largeur de la voie, des virages et de la place pour manœuvrer. Joignez des photos de la route et de l'entrée : l'équipe vous dit ce qui est faisable avant de fixer quoi que ce soit.",
      },
      {
        q: "La voiture est à Agay : faut-il choisir Saint-Raphaël dans le formulaire ?",
        a: "Oui, Agay fait partie de Saint-Raphaël. Indiquez la commune et le code postal 83530 pour que l'emplacement soit bien identifié.",
      },
      {
        q: "Le véhicule est accidenté et n'a plus toutes ses pièces : l'enlèvement est-il gratuit ?",
        a: "La gratuité s'applique à un véhicule complet et accessible. S'il manque des éléments importants, décrivez précisément son état : les conditions vous sont confirmées avant le rendez-vous.",
      },
    ],
    form: { city: "Saint-Raphaël" },
    missing: VAR_MISSING,
    related: ["frejus", "draguignan", "toulon", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Routes de l'Estérel : ce qu'il faut savoir avant de demander",
        paragraphs: [
          "Une partie de Saint-Raphaël grimpe vers le massif de l'Estérel. Les quartiers en hauteur sont desservis par des routes qui tournent beaucoup, parfois étroites, avec peu d'endroits pour faire demi-tour. Pour un camion plateau, ces caractéristiques comptent davantage que l'état du véhicule. Décrire la route, avec quelques photos, évite un déplacement qui n'aboutirait pas.",
          "Regardez aussi l'endroit où la voiture est garée : sur une plateforme au bord de la route, dans un garage en sous-sol de la maison, sur un terrain en pente. Si elle roule encore, il peut être plus simple de la rapprocher d'un point plat et dégagé avant le rendez-vous. Mentionnez-le dans la demande pour que l'équipe le prenne en compte.",
          "Saint-Raphaël fait partie du Var : l'organisation y est confirmée dossier par dossier, en fonction de la distance. Aucun délai n'est garanti à l'avance ; le jour retenu vous est communiqué dans la réponse. L'enlèvement est gratuit pour un véhicule complet et accessible ; pour un accès difficile, les conditions sont confirmées avant le rendez-vous.",
        ],
      },
      situations: {
        title: "Questions typiques à Saint-Raphaël",
        items: [
          {
            title: "Un chemin trop étroit pour se croiser",
            text: "Indiquez s'il existe un élargissement ou une place proche où le camion peut s'arrêter et charger.",
          },
          {
            title: "Une voiture garée en pente",
            text: "Précisez si le frein à main tient encore et si les roues sont bloquées : le chargement se prépare en conséquence.",
          },
          {
            title: "Un véhicule à Agay",
            text: "Renseignez le code postal 83530 et décrivez la rue : la demande est étudiée comme pour le reste de la commune.",
          },
        ],
      },
      nearby: ["Fréjus"],
    },
  },

  {
    slug: "draguignan",
    name: "Draguignan",
    kind: "city",
    locative: "à Draguignan",
    department: VAR,
    postalCodes: ["83300"],
    status: { ...CONFIRMED },
    seo: seo(
      "Draguignan",
      "83300",
      "Maison avec terrain, cour ou rue du centre : précisez l'emplacement, les conditions sont confirmées avant le rendez-vous.",
      ["épaviste Draguignan", "enlèvement voiture Draguignan", "épaviste Var arrière-pays"],
    ),
    lead:
      "Sous-préfecture du Var, Draguignan se trouve dans l'arrière-pays, loin du littoral. On y trouve beaucoup de maisons avec terrain, où une vieille voiture peut rester stationnée longtemps : indiquez où elle se trouve sur la parcelle et comment on y accède.",
    accessTips: [
      "Véhicule sur un terrain : précisez la distance entre la voiture et le portail, et la nature du sol (herbe, gravier, terre).",
      "Voiture immobilisée depuis longtemps : signalez les pneus à plat ou les roues bloquées.",
      "Départ prochain de la commune : indiquez la date et la personne qui pourra vous remplacer.",
    ],
    localFacts: [
      {
        text: "Draguignan (code postal 83300) est une sous-préfecture du Var (83).",
        source: SOURCE,
      },
    ],
    faq: [
      {
        q: "La voiture est au fond du terrain, dans l'herbe : est-ce un obstacle ?",
        a: "Pas nécessairement, mais il faut le savoir à l'avance. Un sol meuble ou en pente peut empêcher le camion d'approcher. Décrivez le terrain et joignez une photo : la faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "Je quitte Draguignan pour une nouvelle affectation : puis-je organiser l'enlèvement après mon départ ?",
        a: "Oui, si une personne mandatée par le titulaire de la carte grise est présente avec les clés, les documents et une procuration signée. Signalez votre date de départ dans la demande.",
      },
      {
        q: "Plusieurs véhicules de notre entreprise sont hors d'usage : comment procéder ?",
        a: "Décrivez l'ensemble des véhicules dans une seule demande via le formulaire professionnel ; un passage commun est étudié.",
        link: { href: "/professionnels", label: "Formulaire professionnel" },
      },
    ],
    form: { city: "Draguignan", postalCode: "83300" },
    missing: VAR_MISSING,
    related: ["frejus", "saint-raphael", "toulon", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Dans l'arrière-pays varois, la voiture du fond du jardin",
        paragraphs: [
          "À Draguignan, une part importante de l'habitat est faite de maisons entourées d'un terrain. C'est souvent là que finissent les voitures que l'on n'utilise plus : garées au fond de la parcelle, parfois depuis des années, sous un arbre ou derrière un abri. Plus le véhicule est loin du portail, plus il est utile de décrire le chemin pour l'atteindre.",
          "La présence militaire importante dans le secteur explique aussi des départs parfois rapides. Si vous devez quitter la commune, ne laissez pas la voiture derrière vous sans solution : faites la demande tôt, préparez une procuration et confiez clés et documents à une personne qui restera joignable après votre départ. Indiquez ses coordonnées dans la demande pour que le rendez-vous puisse être fixé directement avec elle.",
          "Draguignan étant dans le Var, l'organisation de l'enlèvement y est confirmée dossier par dossier, selon la distance. Aucun délai n'est promis avant l'examen de la demande. Un véhicule complet et accessible est enlevé gratuitement ; pour un véhicule difficile à atteindre ou incomplet, les conditions sont confirmées avant le rendez-vous. Des photos du terrain et du chemin d'accès aident à répondre plus précisément.",
        ],
      },
      situations: {
        title: "Ce que les Dracénois nous signalent",
        items: [
          {
            title: "Une épave au fond de la propriété",
            text: "Indiquez la distance jusqu'au portail et l'état du sol : c'est ce qui détermine l'approche du camion.",
          },
          {
            title: "Un départ lié à une mutation",
            text: "Prévoyez une procuration et une personne relais avant de partir, puis faites la demande sans attendre.",
          },
          {
            title: "Une ancienne voiture de famille",
            text: "Après un décès, les héritiers doivent pouvoir justifier de leur qualité : précisez la situation dans la demande.",
          },
        ],
      },
      nearby: ["Trans-en-Provence", "Flayosc"],
    },
  },
];
