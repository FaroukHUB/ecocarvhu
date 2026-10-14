import type { Sector } from "./types";
import { BDR, CITY_MISSING, CONFIRMED, citySeo as seo } from "./shared";

/**
 * Communes des Bouches-du-Rhône (ouest du département et pourtour de l'étang de Berre).
 * Faits locaux limités aux données administratives fournies (statut, codes postaux).
 * Aucun délai, prix ni horaire n'est annoncé : tout est confirmé avant le rendez-vous.
 */
export const cities13: Sector[] = [
  {
    slug: "arles",
    name: "Arles",
    kind: "city",
    locative: "à Arles",
    department: BDR,
    postalCodes: ["13200", "13280", "13129"],
    status: { ...CONFIRMED },
    seo: seo(
      "Arles",
      "13200",
      "Ville, mas isolés de Camargue ou de Crau : le hameau et le chemin d'accès sont vérifiés avant le déplacement.",
      ["épaviste Arles", "enlèvement voiture Camargue", "enlèvement véhicule hors d'usage Arles"],
    ),
    lead:
      "Arles couvre un territoire immense, de la ville elle-même jusqu'aux mas et hameaux dispersés en Camargue et en Crau. Le nom du hameau ou du quartier compte autant que le code postal : sans lui, impossible de préparer un trajet fiable.",
    accessTips: [
      "Donnez le nom du hameau, du lieu-dit ou du mas, en plus du code postal (13200, 13280 ou 13129).",
      "Chemin agricole ou piste : précisez s'il est carrossable par temps sec comme après la pluie.",
      "Un point de repère visible depuis la route (portail, croisement, panneau du mas) aide beaucoup sur un territoire aussi vaste.",
    ],
    localFacts: [
      {
        text: "Arles est une sous-préfecture des Bouches-du-Rhône (13), desservie par les codes postaux 13200, 13280 et 13129.",
        source: "Découpage administratif officiel / La Poste",
      },
      {
        text: "Arles est la commune la plus étendue de France métropolitaine.",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Mon mas est à plusieurs kilomètres du centre d'Arles : la demande reste-t-elle possible ?",
        a: "Oui, la distance au centre n'est pas un critère en soi. Ce qui compte, c'est le chemin d'accès : indiquez le lieu-dit, l'état de la piste et l'endroit exact du véhicule. La faisabilité est confirmée avant le rendez-vous.",
      },
      {
        q: "La voiture n'a plus roulé depuis des années au fond d'un hangar : est-elle encore enlevable gratuitement ?",
        a: "L'enlèvement est gratuit pour un véhicule complet et accessible. Si des pièces manquent ou si le véhicule est difficile à sortir, dites-le dans la demande : les conditions vous sont confirmées avant le rendez-vous.",
      },
      {
        q: "Le véhicule roule encore et a de la valeur : dois-je le faire enlever comme épave ?",
        a: "Pas forcément. Une voiture encore utilisable peut faire l'objet d'une proposition de rachat, à étudier avant tout enlèvement.",
        link: { href: "/rachat-vehicule", label: "Demander une estimation de rachat" },
      },
    ],
    form: { city: "Arles" },
    missing: CITY_MISSING,
    related: ["salon-de-provence", "istres", "martigues", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Entre Camargue et Crau, localiser le véhicule d'abord",
        paragraphs: [
          "Sur une commune aussi vaste qu'Arles, une adresse seule ne suffit pas toujours. Beaucoup de véhicules hors d'usage se trouvent loin du centre, dans un mas, une ancienne grange ou au bord d'un chemin agricole. Avant de parler du véhicule, il faut savoir où il se trouve exactement et comment on y parvient.",
          "Les pistes de Camargue et de Crau changent d'aspect selon la saison. Un chemin facile en été peut devenir boueux ou glissant après de fortes pluies. Décrivez la voie telle qu'elle est le plus souvent, et prévenez si elle devient difficile par mauvais temps : le rendez-vous en tient compte.",
          "Dans les exploitations, le véhicule est parfois entouré de matériel, de bottes de foin ou de clôtures. Dégager un passage pour le camion plateau, ou indiquer qui pourra le faire le jour venu, évite un aller-retour inutile. Une photo prise depuis le chemin résume souvent mieux la situation qu'une longue description.",
        ],
      },
      situations: {
        title: "Ce qu'on rencontre souvent sur le territoire arlésien",
        items: [
          {
            title: "Un mas au bout d'une piste",
            text: "Nom du mas, état du chemin, place pour manœuvrer : ce trio permet de juger si le camion peut approcher.",
          },
          {
            title: "Une voiture oubliée sous un hangar",
            text: "Indiquez si elle est encore sur ses roues et si l'on peut la tirer jusqu'à l'entrée du bâtiment.",
          },
          {
            title: "Un proche qui ne vit plus sur place",
            text: "Précisez qui ouvrira le portail et remettra les documents : sur un site isolé, personne ne peut improviser l'accès.",
          },
        ],
      },
      nearby: ["Saint-Martin-de-Crau", "Tarascon", "Fontvieille", "Saintes-Maries-de-la-Mer"],
    },
  },

  {
    slug: "martigues",
    name: "Martigues",
    kind: "city",
    locative: "à Martigues",
    department: BDR,
    postalCodes: ["13500"],
    status: { ...CONFIRMED },
    seo: seo(
      "Martigues",
      "13500",
      "Parking de résidence, quartier au bord de l'étang ou site d'entreprise : l'accès est confirmé avant le rendez-vous.",
      ["épaviste Martigues", "enlèvement voiture Martigues", "épave étang de Berre"],
    ),
    lead:
      "À Martigues, les quartiers se répartissent de part et d'autre de l'eau, au bord de l'étang de Berre, et beaucoup de voitures stationnent au pied d'immeubles. Dites dans quel quartier se trouve le véhicule et sur quel type de parking : ce sont les deux clés de l'organisation.",
    accessTips: [
      "Nommez le quartier : la ville est découpée par l'eau, et le trajet n'est pas le même d'une rive à l'autre.",
      "Parking d'immeuble : précisez s'il est ouvert, fermé par barrière ou souterrain, et qui gère l'accès.",
      "Véhicule sur un site d'entreprise : indiquez l'entrée à utiliser et les consignes de sécurité à respecter.",
    ],
    localFacts: [
      {
        text: "Martigues (code postal 13500) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "La voiture est sur le parking de ma résidence : faut-il prévenir le bailleur ou le syndic ?",
        a: "C'est recommandé, surtout si le parking est fermé ou si un badge est nécessaire. Indiquez dans la demande qui peut ouvrir l'accès le jour de l'enlèvement.",
      },
      {
        q: "Le véhicule se trouve dans l'enceinte de mon entreprise : comment se passe l'accès ?",
        a: "Beaucoup de sites imposent un accueil, un badge ou un équipement de sécurité. Donnez le nom d'un contact sur place et les règles d'entrée : le rendez-vous est organisé en fonction.",
        link: { href: "/professionnels", label: "Enlèvement pour les professionnels" },
      },
      {
        q: "Il ne me manque qu'une pièce pour réparer ma voiture : pouvez-vous m'aider ?",
        a: "Oui, une demande de pièce d'occasion peut être faite séparément de tout enlèvement. Indiquez le modèle et la référence si vous l'avez.",
        link: { href: "/demande-piece", label: "Faire une demande de pièce" },
      },
    ],
    form: { city: "Martigues", postalCode: "13500" },
    missing: CITY_MISSING,
    related: ["istres", "vitrolles", "salon-de-provence", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Une ville partagée par l'eau, des parkings au pied des immeubles",
        paragraphs: [
          "Martigues s'organise autour de l'eau : plusieurs quartiers se font face de part et d'autre des canaux et de l'étang de Berre. Pour préparer un enlèvement, il est donc utile de dire de quel côté se trouve le véhicule, et par quelle voie on l'atteint le plus simplement.",
          "Une grande partie des demandes concerne des voitures immobilisées sur des parkings de résidence. L'emplacement est souvent étroit, encadré par d'autres véhicules, parfois derrière une barrière. Une photo de la place et l'indication du gestionnaire du parking permettent de prévoir le chargement sans gêner les voisins.",
          "Les sites industriels voisins ont leurs propres règles : accueil, badge, circulation encadrée, équipements obligatoires. Si le véhicule est stationné dans l'enceinte d'une entreprise, signalez-le dès la demande. L'intervention se cale alors sur les consignes du site, et non l'inverse.",
        ],
      },
      situations: {
        title: "Situations fréquentes autour de l'étang",
        items: [
          {
            title: "Une place de parking bloquée depuis des mois",
            text: "Pneus à plat, voiture coincée entre deux autres : signalez-le, le chargement se prépare différemment.",
          },
          {
            title: "Un parking souterrain de résidence",
            text: "Hauteur de l'entrée et pente de la rampe : ces deux informations décident si le véhicule peut être sorti.",
          },
          {
            title: "Un véhicule laissé sur un site d'entreprise",
            text: "Contact sur place, entrée à utiliser et règles de sécurité : à transmettre avant de fixer un créneau.",
          },
        ],
      },
      nearby: ["Port-de-Bouc", "Châteauneuf-les-Martigues", "Sausset-les-Pins", "Saint-Mitre-les-Remparts"],
    },
  },

  {
    slug: "salon-de-provence",
    name: "Salon-de-Provence",
    kind: "city",
    locative: "à Salon-de-Provence",
    department: BDR,
    postalCodes: ["13300"],
    status: { ...CONFIRMED },
    seo: seo(
      "Salon-de-Provence",
      "13300",
      "Maison avec terrain, garage, atelier ou utilitaire d'artisan : la situation du véhicule est vérifiée avant de venir.",
      ["épaviste Salon-de-Provence", "enlèvement utilitaire Salon-de-Provence", "enlèvement voiture Salon"],
    ),
    lead:
      "En périphérie de Salon-de-Provence, beaucoup de véhicules hors d'usage attendent dans un garage, un atelier ou sur le terrain d'une maison. Décrivez où il est rangé et ce qu'il faut déplacer pour l'atteindre : c'est souvent là que tout se joue.",
    accessTips: [
      "Véhicule dans un garage : précisez si la porte s'ouvre entièrement et si la voiture peut être tirée jusqu'à l'extérieur.",
      "Terrain privé : indiquez la largeur du portail et la nature du sol entre la rue et le véhicule.",
      "Utilitaire d'artisan : videz le chargement (outils, matériaux) avant le rendez-vous, et précisez s'il reste des aménagements fixes.",
    ],
    localFacts: [
      {
        text: "Salon-de-Provence (code postal 13300) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Mon fourgon de travail est en fin de vie : l'enlevez-vous comme une voiture particulière ?",
        a: "Un utilitaire immatriculé peut être pris en charge s'il est complet et accessible. Indiquez son gabarit, son poids approximatif et le titulaire de la carte grise : les conditions sont confirmées avant le rendez-vous.",
        link: { href: "/professionnels", label: "Solutions pour artisans et entreprises" },
      },
      {
        q: "La voiture est au fond du garage, derrière un établi : que dois-je préparer ?",
        a: "Libérez le passage jusqu'à la porte si vous le pouvez et dites si les roues tournent encore. Si rien ne peut être déplacé, signalez-le avec une photo.",
      },
      {
        q: "Puis-je récupérer quelques pièces de ma voiture avant qu'elle parte ?",
        a: "Retirer des éléments essentiels peut changer les conditions de prise en charge, car la gratuité vise un véhicule complet. Posez la question dans la demande avant de démonter quoi que ce soit.",
        link: { href: "/enlevement-epave", label: "Conditions de l'enlèvement d'épave" },
      },
    ],
    form: { city: "Salon-de-Provence", postalCode: "13300" },
    missing: CITY_MISSING,
    related: ["istres", "arles", "vitrolles", "paca"],
    local: {
      variant: 3,
      guide: {
        title: "Garages, ateliers et terrains : sortir le véhicule de son abri",
        paragraphs: [
          "Autour de Salon-de-Provence, l'habitat individuel avec terrain est courant. Le véhicule hors d'usage n'est donc pas toujours dans la rue : il peut dormir dans un garage, sous un abri ou au fond d'un jardin. Avant d'organiser l'enlèvement, la vraie question est de savoir comment le faire sortir.",
          "Les artisans gardent souvent un ancien fourgon ou une camionnette à côté de l'atelier, en attendant de s'en occuper. Ces véhicules sont plus lourds et parfois aménagés. Mentionnez les étagères ou équipements fixés à l'intérieur, et retirez tout le matériel transportable : cela simplifie le chargement.",
          "Le sol joue aussi un rôle : gravier, herbe ou terre meuble ne se franchissent pas comme une dalle. Une photo du trajet entre la rue et le véhicule, avec le portail visible, permet de juger rapidement si l'approche du camion est possible ou s'il faut prévoir autrement.",
        ],
      },
      situations: {
        title: "Les cas que l'on voit souvent à Salon",
        items: [
          {
            title: "Le fourgon de l'atelier",
            text: "Gabarit, aménagements intérieurs et titulaire de la carte grise : trois points à préciser d'emblée.",
          },
          {
            title: "La voiture remisée au garage",
            text: "Dites si elle peut être poussée jusqu'à la porte ou si elle est bloquée par d'autres objets.",
          },
          {
            title: "Un véhicule sur terrain meuble",
            text: "Herbe, gravier, terre : décrivez le sol, il conditionne l'approche du camion plateau.",
          },
        ],
      },
      nearby: ["Pélissanne", "Grans", "Lançon-Provence"],
    },
  },

  {
    slug: "istres",
    name: "Istres",
    kind: "city",
    locative: "à Istres",
    department: BDR,
    postalCodes: ["13800", "13118"],
    status: { ...CONFIRMED },
    seo: seo(
      "Istres",
      "13800",
      "Quartier pavillonnaire, Entressen ou départ imminent : le rendez-vous se prépare avec vous avant le déplacement.",
      ["épaviste Istres", "enlèvement voiture Istres", "enlèvement épave Entressen"],
    ),
    lead:
      "Istres voit régulièrement des familles arriver et repartir, notamment au rythme des affectations liées à la base aérienne. Quand un départ approche, une voiture hors d'usage devient vite un souci : signalez votre date de départ dès la demande.",
    accessTips: [
      "Indiquez 13800 pour Istres et 13118 pour Entressen : les deux secteurs ne se rejoignent pas par le même trajet.",
      "Départ programmé : donnez la date limite et le nom de la personne qui pourra remettre les clés si vous êtes déjà parti.",
      "Maison en lotissement : précisez si le véhicule est dans l'allée, au garage ou garé dans la rue.",
    ],
    localFacts: [
      {
        text: "Istres est une sous-préfecture des Bouches-du-Rhône (13), desservie par les codes postaux 13800 et 13118 (Entressen).",
        source: "Découpage administratif officiel / La Poste",
      },
      {
        text: "La commune d'Istres accueille une base aérienne.",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Je suis muté et je quitte Istres bientôt : comment ne pas laisser ma voiture derrière moi ?",
        a: "Faites la demande dès que la date est connue. Un rendez-vous est recherché avant votre départ ; s'il ne peut être confirmé à temps, une personne de confiance peut vous représenter avec les documents.",
      },
      {
        q: "Qui doit signer si la carte grise est au nom de mon conjoint ?",
        a: "Le titulaire de la carte grise signe la cession, ou mandate par écrit la personne présente. Préparez ce mandat si le titulaire ne peut pas être là.",
      },
      {
        q: "J'habite Entressen : faut-il écrire Istres ou Entressen dans le formulaire ?",
        a: "Indiquez Istres comme commune et 13118 comme code postal, puis précisez Entressen dans la description de l'adresse.",
      },
    ],
    form: { city: "Istres" },
    missing: CITY_MISSING,
    related: ["martigues", "salon-de-provence", "arles", "paca"],
    local: {
      variant: 1,
      guide: {
        title: "Mutations et déménagements : anticiper avant les cartons",
        paragraphs: [
          "À Istres, les départs font partie de la vie de nombreux foyers, en particulier chez les familles de militaires. Quand une mutation tombe, la voiture qui ne roule plus passe souvent après le déménagement. Mieux vaut pourtant s'en occuper tôt : une fois le logement rendu, l'accès au véhicule peut devenir compliqué.",
          "Si vous partez avant le rendez-vous, organisez la remise à l'avance : une personne de confiance, les clés, la carte grise et un mandat signé si elle n'est pas titulaire. Dites aussi où le véhicule restera stationné après votre départ, et si le nouveau locataire ou propriétaire est au courant.",
          "Les quartiers pavillonnaires et Entressen offrent en général des accès simples, mais un véhicule rangé au garage ou au fond d'une allée demande un peu de préparation. Précisez où il est garé et s'il peut être poussé : ces détails évitent les mauvaises surprises le jour venu.",
        ],
      },
      situations: {
        title: "Les demandes istréennes typiques",
        items: [
          {
            title: "Une affectation qui arrive vite",
            text: "Date de départ, personne relais, documents prêts : de quoi organiser l'enlèvement même en votre absence.",
          },
          {
            title: "Une voiture dans l'allée du pavillon",
            text: "Indiquez si un autre véhicule bloque le passage et s'il pourra être déplacé le jour prévu.",
          },
          {
            title: "Un véhicule à Entressen",
            text: "Code postal 13118 et description précise de l'adresse : le trajet est préparé en conséquence.",
          },
        ],
      },
      nearby: ["Miramas", "Fos-sur-Mer", "Saint-Mitre-les-Remparts"],
    },
  },

  {
    slug: "vitrolles",
    name: "Vitrolles",
    kind: "city",
    locative: "à Vitrolles",
    department: BDR,
    postalCodes: ["13127"],
    status: { ...CONFIRMED },
    seo: seo(
      "Vitrolles",
      "13127",
      "Zone d'activités, flotte d'entreprise ou parking de résidence : l'accès et le titulaire sont vérifiés avant de venir.",
      ["épaviste Vitrolles", "enlèvement véhicule société Vitrolles", "enlèvement voiture Vitrolles"],
    ),
    lead:
      "À Vitrolles, une part importante des véhicules hors d'usage appartient à des entreprises installées dans les zones d'activités, ou stationne sur des parkings de résidence. Dans les deux cas, la question du titulaire de la carte grise se pose avant même celle de l'accès.",
    accessTips: [
      "Véhicule de société : indiquez la raison sociale du titulaire et la personne habilitée à signer la cession.",
      "Voiture de location ou en location longue durée : l'accord écrit du loueur est nécessaire avant tout enlèvement.",
      "Zone d'activités : précisez le bâtiment, le quai ou le parking où se trouve le véhicule, et le contact présent sur place.",
    ],
    localFacts: [
      {
        text: "Vitrolles (code postal 13127) est une commune des Bouches-du-Rhône (13).",
        source: "Découpage administratif officiel / La Poste",
      },
    ],
    faq: [
      {
        q: "Notre entreprise doit se séparer de plusieurs véhicules : faut-il une demande par véhicule ?",
        a: "Vous pouvez regrouper la demande en listant chaque véhicule avec son immatriculation et son état. L'organisation et les conditions sont confirmées avant le rendez-vous.",
        link: { href: "/professionnels", label: "Enlèvement de véhicules d'entreprise" },
      },
      {
        q: "La voiture que j'utilise est en location longue durée : puis-je la faire enlever ?",
        a: "Non, pas sans l'accord du loueur, qui est le titulaire de la carte grise. Contactez-le d'abord : c'est lui qui décide du sort du véhicule et signe la cession, directement ou par mandat.",
      },
      {
        q: "Ma voiture encore roulante a juste beaucoup de kilomètres : vaut-il mieux la vendre ?",
        a: "Si elle fonctionne, une proposition de rachat peut être plus intéressante qu'un enlèvement. Décrivez-la pour obtenir une estimation.",
        link: { href: "/rachat-vehicule", label: "Estimer le rachat de mon véhicule" },
      },
    ],
    form: { city: "Vitrolles", postalCode: "13127" },
    missing: CITY_MISSING,
    related: ["martigues", "salon-de-provence", "istres", "paca"],
    local: {
      variant: 2,
      guide: {
        title: "Flottes d'entreprise et voitures de résidence : qui signe ?",
        paragraphs: [
          "Vitrolles accueille de grandes zones d'activités, et avec elles des flottes de véhicules : voitures de commerciaux, utilitaires de livraison, véhicules de service. Lorsqu'un de ces véhicules arrive en fin de vie, c'est l'entreprise titulaire de la carte grise qui décide et signe la cession, pas le salarié qui le conduisait.",
          "Les véhicules de location, courte ou longue durée, obéissent à la même logique : leur propriétaire est le loueur. Sans son accord écrit, aucun enlèvement ne peut être organisé. Si vous utilisez un véhicule de ce type, rapprochez-vous de lui en premier.",
          "Côté particuliers, beaucoup de voitures immobilisées stationnent sur des parkings de résidence. Indiquez le gestionnaire du parking, la présence éventuelle d'une barrière et l'emplacement exact. Pour une entreprise, précisez plutôt le bâtiment, l'accès livraison et le nom du contact qui accueillera l'équipe.",
        ],
      },
      situations: {
        title: "Les demandes qui reviennent à Vitrolles",
        items: [
          {
            title: "Un utilitaire retiré de la flotte",
            text: "Raison sociale, signataire habilité et emplacement sur le site : à réunir avant de fixer une date.",
          },
          {
            title: "Une voiture de location immobilisée",
            text: "Le loueur reste propriétaire : son accord écrit conditionne toute prise en charge.",
          },
          {
            title: "Une épave sur un parking de résidence",
            text: "Barrière, gestionnaire, place exacte : ces indications évitent de bloquer les voisins le jour venu.",
          },
        ],
      },
      nearby: ["Marignane", "Rognac", "Les Pennes-Mirabeau", "Cabriès"],
    },
  },
];
