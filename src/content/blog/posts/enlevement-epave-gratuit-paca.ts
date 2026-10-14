import type { Post } from "../types";

const IMG = "/images/blog/enlevement-epave-gratuit-paca";

/** Article 1, transmis par le porteur de projet (PDF du 14/10/2026), repris fidèlement. */
export const enlevementEpaveGratuitPaca: Post = {
  slug: "enlevement-epave-gratuit-paca",
  title: "Enlèvement d'épave gratuit en PACA : les conditions à connaître",
  description:
    "Enlèvement d'épave gratuit en PACA : ce que couvre la gratuité, l'état du véhicule, l'accès et les documents à préparer avant de faire votre demande.",
  h1: "Enlèvement d'épave gratuit en PACA : les conditions à connaître",
  excerpt:
    "Ce qu'il reste sur le véhicule, la façon d'y accéder, les documents disponibles : les trois informations qui permettent d'obtenir une réponse utile, et ce que couvre vraiment la gratuité.",
  lead:
    "Votre voiture ne démarre plus et occupe une place dans la cour, au garage ou sur un parking ? Avant de demander un enlèvement d'épave gratuit en PACA, trois informations permettent d'obtenir une réponse utile : ce qu'il reste sur le véhicule, la façon d'y accéder et les documents disponibles. Voici comment préparer votre demande et comprendre ce que couvre la gratuité.",
  category: "Enlèvement d'épave",
  author: "La rédaction EcocarVHU",
  date: "2026-10-14",
  sourcesCheckedOn: "14 octobre 2026",
  cover: {
    src: `${IMG}/couverture.webp`,
    alt: "Voiture grise immobilisée dans la cour d'une maison provençale, une dépanneuse plateau en attente devant le portail",
    caption:
      "Une voiture immobilisée peut être prise en charge sans devoir redémarrer. Son état et son emplacement doivent être décrits avant le déplacement.",
    width: 1672,
    height: 941,
  },
  keyPoints: {
    title: "Le point en 30 secondes",
    highlight: "La gratuité se vérifie avant le départ du camion.",
    items: [
      "**Au centre VHU.** La remise d'un véhicule complet est gratuite. [1]",
      "**Pour la collecte.** La filière des constructeurs prévoit aussi une collecte sans frais, avec des modalités à vérifier auprès du dispositif sollicité. [2]",
      "**Pour votre demande EcocarVHU.** Décrivez le véhicule, l'accès et la commune : les conditions et le rendez-vous sont confirmés avant l'intervention.",
    ],
    tip: "Le bon réflexe : une photo du véhicule et une photo du chemin d'accès, dès le premier contact.",
  },
  blocks: [
    { type: "h2", text: "Pourquoi « enlèvement gratuit » mérite une explication" },
    {
      type: "p",
      text: "Le terme regroupe plusieurs opérations : venir chercher la voiture, la transporter et la remettre à l'installation qui la traitera. Pour comparer deux propositions, demandez toujours quelles étapes sont couvertes.",
    },
    {
      type: "p",
      text: "La reprise d'un véhicule complet par un centre VHU est gratuite. Depuis 2024, la responsabilité élargie des producteurs organise également une collecte et un transport sans frais depuis le lieu où se trouve le véhicule complet. Un particulier peut consulter le guichet d'information de cette filière pour être orienté. La gratuité ne se limite donc pas au dépôt à la casse. [1] [2]",
    },
    {
      type: "p",
      text: "Les conditions pratiques du dispositif doivent néanmoins être vérifiées. Recycler mon véhicule demande notamment que la voiture puisse être déplacée sur ses roues et qu'un camion puisse accéder à son emplacement. Ce sont les modalités de ce réseau ; elles ne constituent pas un gabarit universel applicable à chaque dépanneuse. [3]",
    },
    {
      type: "p",
      text: "Si une prestation complémentaire vous est proposée, faites préciser son motif, son contenu et son prix avant de donner votre accord. Une mention « gratuit » dans une annonce ne remplace pas une confirmation adaptée à votre situation.",
    },

    { type: "h2", text: "Véhicule complet : une panne n'est pas une pièce manquante" },
    {
      type: "p",
      text: "Une voiture dont le moteur ne fonctionne plus peut encore avoir tous ses équipements. À l'inverse, une voiture dont le moteur a été retiré nécessite une vérification particulière. Dites ce qui a été démonté, plutôt que de vous limiter à « elle ne roule plus ».",
    },
    {
      type: "p",
      text: "Pour la collecte proposée par Recycler mon véhicule, les éléments à conserver comprennent la carrosserie, l'ensemble moteur et transmission, le catalyseur et, lorsque le véhicule en était équipé à l'origine, sa batterie de traction. Des déchets ajoutés peuvent également modifier les conditions de prise en charge. [3]",
    },
    {
      type: "p",
      text: "Dans votre demande à EcocarVHU, signalez aussi la présence ou l'absence de la batterie, des roues et des clés. Vous n'avez pas besoin de diagnostiquer la panne : « moteur présent, ne démarre plus depuis plusieurs mois » est déjà une description exploitable. Ne démontez pas de pièces pour alléger la voiture avant d'avoir fait vérifier les conditions.",
    },
    {
      type: "figure",
      src: `${IMG}/equipements.webp`,
      alt: "Compartiment moteur d'une voiture grise, capot ouvert, moteur et équipements en place",
      caption:
        "Décrivez les équipements présents et les pièces éventuellement retirées. Un problème mécanique et un véhicule incomplet sont deux informations différentes.",
      width: 1448,
      height: 1086,
    },

    { type: "h2", text: "L'accès au véhicule : la photo qui évite les mauvaises surprises" },
    {
      type: "p",
      text: "Photographiez le trajet depuis la rue jusqu'à la voiture. Un gros plan sur le pare-chocs montre les dégâts, mais pas un portail étroit, un virage ou une rampe de sous-sol.",
    },
    { type: "p", text: "Indiquez ce que le professionnel ne peut pas deviner :" },
    {
      type: "list",
      items: [
        "**Le stationnement :** rue, parking ouvert, cour, box ou sous-sol, avec le niveau concerné.",
        "**Le passage :** largeur du portail, hauteur limitée, pente, virage serré ou obstacles.",
        "**La mobilité :** roues présentes, pneus à plat, direction bloquée ou voiture impossible à pousser.",
        "**L'ouverture des lieux :** badge, portail, gardien ou personne à prévenir.",
        "**La distance à parcourir :** emplacement proche de la rue ou au fond d'une propriété.",
      ],
    },
    {
      type: "p",
      text: "Ne tentez pas de déplacer un véhicule instable pour rendre l'accès plus simple. Décrivez la contrainte et laissez l'intervenant déterminer les moyens adaptés. Pour les parkings et passages particuliers, consultez notre [guide des enlèvements en accès difficile](guide:enlevement-acces-difficile).",
    },
    {
      type: "figure",
      src: `${IMG}/acces.webp`,
      alt: "Allée d'une propriété vue depuis la rue, portail ouvert, voiture garée au fond",
      caption:
        "Une vue prise depuis la rue permet de comprendre le passage, la distance et l'espace disponible autour de la voiture.",
      width: 1448,
      height: 1086,
    },

    { type: "h2", text: "Votre situation : que faut-il faire vérifier ?" },
    { type: "p", text: "Ce tableau aide à décrire la demande. Il ne confirme ni la gratuité ni un rendez-vous." },
    {
      type: "table",
      head: ["Situation du véhicule", "Information à transmettre", "Vérification avant le déplacement"],
      rows: [
        ["Ne démarre plus, équipements présents", "Panne connue et durée d'immobilisation", "Organisation du chargement et conditions de collecte"],
        ["Pneus à plat ou roues bloquées", "Photos des roues et possibilité de déplacer la voiture", "Matériel et manœuvres nécessaires"],
        ["Clés perdues", "Position du véhicule et blocage éventuel de la direction ou de la boîte", "Faisabilité de la manutention"],
        ["Sous-sol, box ou portail étroit", "Hauteur, largeur, niveau et photos du passage", "Possibilité d'approcher et de charger en sécurité"],
        ["Moteur ou catalyseur retiré", "Liste précise des éléments manquants", "Conditions applicables au véhicule incomplet"],
        ["Carte grise absente", "Motif : perte, vol, retrait ou autre situation", "Justificatifs adaptés avant la remise"],
      ],
    },

    { type: "h2", text: "Quels documents préparer ?" },
    {
      type: "p",
      text: "Pour une voiture immatriculée en France, le dossier habituel comprend la carte grise avec la mention de cession pour destruction et les signatures requises, un certificat de situation administrative de moins de quinze jours et le formulaire Cerfa 15776 renseigné pour le centre VHU. Si la carte grise manque, les justificatifs varient selon le motif. [4]",
    },
    {
      type: "p",
      text: "Commencez par indiquer les documents dont vous disposez. Le premier échange sert à préparer l'enlèvement : il n'est pas nécessaire de joindre spontanément une photographie de votre pièce d'identité ou de tous vos papiers. L'équipe précise ensuite ce qui doit être présenté ou transmis.",
    },
    {
      type: "p",
      text: "Si le véhicule appartient à une autre personne, provient d'une succession ou fait l'objet d'un signalement administratif, exposez la situation avant le rendez-vous. Évitez de remplir les coordonnées d'un centre au hasard. Notre [guide des documents de remise du véhicule](guide:documents-enlevement-epave-paca) détaille cette préparation.",
    },
    {
      type: "figure",
      src: `${IMG}/documents.webp`,
      alt: "Documents administratifs, stylo et clé de voiture posés sur une table en bois",
      caption: "Préparez votre dossier, puis vérifiez avec l'interlocuteur quels documents seront nécessaires dans votre cas.",
      width: 1448,
      height: 1086,
    },

    { type: "h2", text: "Avant le passage : préparer la voiture et le lieu" },
    {
      type: "p",
      text: "Une fois les conditions et le créneau confirmés, récupérez vos affaires : boîte à gants, coffre, vide-poches, badge de télépéage, papiers personnels et accessoires que vous souhaitez conserver. Prévenez la personne qui ouvrira le portail ou le parking et rendez le passage disponible.",
    },
    {
      type: "p",
      text: "Évitez en revanche de débrancher une batterie, d'ouvrir un circuit de fluide ou de démonter une pièce pour préparer la collecte. Ces gestes peuvent compliquer la manutention et la prise en charge. Si la voiture fuit, a brûlé ou paraît instable, signalez-le et laissez le professionnel évaluer l'intervention.",
    },
    {
      type: "quote",
      label: "Exemple de message utile, à adapter",
      text: "« Voiture à Aubagne, dans une cour au rez-de-chaussée. Moteur présent, elle ne démarre plus. Quatre roues, deux pneus à plat. Clés et carte grise disponibles. Je joins une vue du véhicule et une vue du portail. »",
    },
    {
      type: "p",
      text: "Ce type de description permet de traiter les points concrets dès le premier échange.",
    },
    {
      type: "figure",
      src: `${IMG}/objets-personnels.webp`,
      alt: "Habitacle d'une voiture, portière ouverte, sac posé sur le siège conducteur",
      caption: "Pensez aux objets oubliés dans l'habitacle et le coffre. Récupérez vos affaires sans démonter les équipements du véhicule.",
      width: 1448,
      height: 1086,
    },

    { type: "h2", text: "Après l'enlèvement : qui prend en charge la destruction ?" },
    {
      type: "p",
      text: "EcocarVHU reçoit et prépare la demande, puis organise l'enlèvement et le transport. La dépollution, le démontage et le traitement réglementaire relèvent du centre VHU destinataire. Le centre retire les éléments et fluides à traiter, récupère les pièces réutilisables et oriente les matériaux vers les filières adaptées. Il délivre le certificat de destruction et procède à l'annulation de l'immatriculation. [1]",
    },
    {
      type: "p",
      text: "Demandez le nom du centre destinataire et les modalités de remise du certificat. Conservez les justificatifs et informez votre assureur de la destruction pour faire traiter la résiliation du contrat. Vérifiez également, avec le centre, qui effectue la déclaration de cession et si une démarche reste à votre charge. [4]",
    },
    {
      type: "figure",
      src: `${IMG}/centre-vhu.webp`,
      alt: "Voiture grise sur un pont élévateur dans un atelier, un technicien à côté",
      caption: "Le traitement du véhicule relève du centre VHU. La collecte et le travail de dépollution correspondent à des étapes distinctes.",
      width: 1448,
      height: 1086,
    },

    { type: "h2", text: "Demander un enlèvement en PACA : préciser le lieu et l'accès" },
    {
      type: "p",
      text: "Que votre voiture se trouve à Marseille, Aubagne, La Ciotat, Cassis ou Nice, commencez par la commune et le code postal. Puis indiquez l'emplacement réel : parking d'une résidence, cour privée, garage ou chemin d'accès.",
    },
    {
      type: "p",
      text: "Dans une résidence fermée, précisez qui peut ouvrir. Pour un parking couvert, donnez le niveau et la hauteur de passage. Dans une propriété, montrez le trajet jusqu'à la rue. Ces renseignements sont plus utiles pour préparer le déplacement qu'une simple indication « dans le centre-ville ».",
    },
    {
      type: "p",
      text: "EcocarVHU vise la région Provence-Alpes-Côte d'Azur ; la faisabilité et les conditions sont vérifiées pour chaque demande. Consultez les [zones d'intervention](/zones-intervention) ou indiquez directement votre code postal au téléphone.",
    },
  ],
  faqTitle: "Les dernières questions avant de faire votre demande",
  faq: [
    {
      q: "Faut-il que la voiture roule pour être enlevée ?",
      a: "Elle n'a pas besoin de redémarrer pour être transportée sur un plateau. Indiquez toutefois si ses roues tournent et si la direction est bloquée : cela change la façon de la charger.",
    },
    {
      q: "Faut-il refaire le contrôle technique pour la destruction ?",
      a: "Non, la remise pour destruction à un centre VHU ne nécessite pas de refaire un contrôle technique. Les règles de vente à un particulier sont différentes. [5]",
    },
    {
      q: "L'enlèvement gratuit signifie-t-il que la voiture est rachetée ?",
      a: "Non. Une collecte sans frais et un achat du véhicule sont deux propositions différentes. Si vous souhaitez faire examiner une éventuelle valeur de reprise, demandez une étude de rachat avant d'engager la destruction.",
    },
    {
      q: "Le formulaire réserve-t-il automatiquement un créneau ?",
      a: "Non. La demande permet à l'équipe d'examiner le véhicule, l'accès et les documents. Le rendez-vous est retenu après confirmation des conditions.",
    },
  ],
  cta: {
    title: "Votre véhicule est immobilisé en PACA ?",
    text: "Indiquez votre commune, son état, les documents disponibles et les conditions d'accès. Ajoutez des photos du véhicule et du passage pour faire vérifier la prise en charge.",
    label: "Demander un enlèvement",
    href: "/enlevement-epave#demande",
    note: "Conditions et rendez-vous confirmés avant le déplacement.",
  },
  sources: [
    {
      label: "Ministère de la Transition écologique — Véhicules hors d'usage : reprise, filière REP et rôle du centre VHU.",
      url: "https://www.ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu",
    },
    { label: "Code de l'environnement — Article R. 543-160 : organisation de la collecte sans frais des véhicules complets." },
    { label: "Recycler mon véhicule — Collecte à domicile : conditions propres à son service, état du véhicule et accessibilité." },
    {
      label: "Service Public — Véhicule à détruire et certificat d'immatriculation : documents, déclaration et assurance.",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1468",
    },
    {
      label: "France Titres-ANTS — Réponse sur la cession sans contrôle technique : distinction entre cession à un particulier et remise pour destruction.",
    },
  ],
  footnote:
    "Informations vérifiées le 14 octobre 2026. Les démarches ci-dessus concernent principalement une voiture immatriculée en France ; un véhicule étranger ou une situation particulière nécessite une vérification adaptée. Les six visuels sont des illustrations générées par IA. Ils ne représentent pas les véhicules, les équipes ou les locaux d'EcocarVHU.",
  status: { contentVerified: true, publicationApproved: true },
};
