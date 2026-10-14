import type { Post } from "../types";

const IMG = "/images/blog/documents-enlevement-epave-paca";
const W = 1448;
const H = 1086;

/** Article 2, transmis par le porteur de projet (PDF du 14/10/2026), repris fidèlement. */
export const documentsEnlevementEpavePaca: Post = {
  slug: "documents-enlevement-epave-paca",
  title: "Quels documents pour l'enlèvement d'une épave ? La checklist en PACA",
  description:
    "Carte grise, certificat de non-gage, Cerfa 15776 : la checklist des documents pour l'enlèvement d'une épave en PACA, y compris sans carte grise ou en cas de succession.",
  h1: "Quels documents pour l'enlèvement d'une épave ? La checklist en PACA",
  excerpt:
    "Carte grise, certificat de situation administrative, Cerfa 15776 : la checklist pour préparer votre dossier avant le rendez-vous, y compris si la carte grise manque ou si plusieurs personnes doivent signer.",
  lead:
    "Vous avez décidé de faire enlever votre voiture hors d'usage ? Préparer les documents permet de vérifier qui peut la remettre, à quel centre elle sera confiée et comment sa cession sera enregistrée. Voici une checklist pour organiser votre dossier avant le rendez-vous en PACA, y compris si la carte grise manque ou si plusieurs personnes doivent signer. Ce guide concerne principalement les voitures immatriculées en France.",
  category: "Documents et formalités",
  author: "La rédaction EcocarVHU",
  date: "2026-10-14",
  sourcesCheckedOn: "14 octobre 2026",
  cover: {
    src: `${IMG}/couverture.webp`,
    alt: "Chemise de documents, stylo et clé posés sur une table, une voiture grise garée dans la cour",
    caption:
      "Vérifiez les documents disponibles avant de fixer la remise du véhicule. Un papier manquant doit être signalé dès la préparation de la demande.",
    width: 1672,
    height: 941,
  },
  keyPoints: {
    title: "Le point en 30 secondes",
    highlight: "Le bon dossier se prépare avant le rendez-vous.",
    items: [
      "**Carte grise.** Préparez l'original et vérifiez les signataires, ou signalez son absence. [1]",
      "**Situation administrative.** Le certificat de non-gage et non-opposition doit dater de moins de quinze jours. [2]",
      "**Cession.** Le Cerfa 15776 se prépare en deux exemplaires ; les coordonnées du centre destinataire doivent être vérifiées. [3]",
    ],
    tip: "Perte, vol, procuration ou succession : indiquez votre situation avant le déplacement pour faire préciser les justificatifs adaptés.",
  },
  blocks: [
    { type: "h2", text: "Les trois documents à préparer pour la remise" },
    {
      type: "p",
      text: "Commencez par rassembler les pièces disponibles dans une même chemise. Le tableau ci-dessous présente le dossier courant ; une situation particulière peut demander des justificatifs supplémentaires.",
    },
    {
      type: "table",
      caption: "Repères : dossier de destruction, certificat de situation administrative et formulaire de cession.",
      head: ["Document", "Ce qu'il faut préparer", "Point à vérifier"],
      rows: [
        ["Carte grise", "L'original et les signatures requises pour la cession pour destruction", "Les personnes concernées et les consignes adaptées à votre situation"],
        ["Certificat de situation administrative", "Un document datant de moins de quinze jours", "La date et les éventuelles mentions de gage ou d'opposition"],
        ["Certificat de cession, Cerfa 15776", "Deux exemplaires complétés et signés", "L'identification du véhicule et du centre VHU destinataire"],
      ],
    },
    {
      type: "p",
      text: "Gardez la carte grise à portée de main pour reporter les informations sans les recopier de mémoire. Pour une pièce d'identité, une procuration ou un justificatif complémentaire, demandez ce qui est nécessaire à votre dossier et à quel moment le présenter. Le premier échange sert surtout à repérer les points à résoudre avant le rendez-vous.",
    },

    { type: "h2", text: "Carte grise : vérifier les personnes qui doivent signer" },
    {
      type: "p",
      text: "Dans le cas courant, le certificat d'immatriculation doit porter la mention de cession pour destruction, les date et heure et les signatures requises. Plusieurs cotitulaires impliquent plusieurs signatures, sauf procuration permettant à l'un de signer pour l'autre. [1] [10]",
    },
    {
      type: "p",
      text: "Faites cette vérification avant de fixer le passage. Un conjoint absent, un cotitulaire difficile à joindre ou un document conservé dans un autre logement peuvent demander un peu d'organisation. Précisez qui détient les papiers, qui sera présent et si une procuration est envisagée.",
    },
    {
      type: "p",
      text: "Pour le cas courant, la notice officielle prévoit de compléter, découper et conserver le coupon détachable pendant cinq ans. Le guide consacré aux successions demande, lui, la remise de l'original complet. Consultez les consignes correspondant à votre dossier et faites préciser le traitement du coupon avant toute découpe. [5] [10]",
    },
    {
      type: "p",
      text: "Ne renseignez pas une date approximative longtemps à l'avance. Coordonnez la finalisation des mentions et des signatures avec la remise effective. Une photo conservée pour vos archives sera utile pour retrouver les informations que vous avez transmises.",
    },
    {
      type: "figure",
      src: `${IMG}/signatures.webp`,
      alt: "Deux personnes assises à une table relisent des documents, une clé de voiture posée devant elles",
      caption:
        "Identifiez les personnes concernées par les signatures. Prévenir d'une absence ou d'une procuration permet de préparer la remise.",
      width: W,
      height: H,
    },

    { type: "h2", text: "Certificat de non-gage : obtenir un document récent" },
    {
      type: "p",
      text: "Le nom officiel est certificat de situation administrative, ou CSA. Il réunit les informations sur le gage et sur l'opposition au transfert du certificat d'immatriculation. Ces deux mentions sont différentes. Le document doit dater de moins de quinze jours. [2]",
    },
    {
      type: "p",
      text: "Pour l'obtenir, utilisez le téléservice officiel HistoVec, accessible depuis Service Public. Le service est gratuit. Gardez les informations du véhicule à portée de main et suivez les champs demandés par le portail. [6] [9]",
    },
    {
      type: "p",
      text: "Après téléchargement, vérifiez trois choses : le véhicule concerné, la date du document et les mentions éventuelles. Si le rendez-vous est reporté, regardez à nouveau la date avant la remise. Conservez une version lisible pour votre dossier.",
    },
    {
      type: "p",
      text: "Si une mention apparaît, indiquez laquelle avant le déplacement. Écrire simplement « certificat de non-gage disponible » ne permet pas de comprendre un éventuel point administratif. La possibilité de céder pour destruction doit être examinée selon la nature de la mention et la procédure applicable ; n'assimilez pas automatiquement un gage à une opposition.",
    },
    {
      type: "figure",
      src: `${IMG}/certificat-situation.webp`,
      alt: "Ordinateur portable, imprimante et carnet sur une table, préparation d'un dossier administratif",
      caption:
        "Accédez au CSA par le téléservice officiel. L'image illustre la préparation informatique du dossier, sans reproduire l'interface d'HistoVec.",
      width: W,
      height: H,
    },

    { type: "h2", text: "Cerfa 15776 : identifier le véhicule et le centre destinataire" },
    {
      type: "p",
      text: "Le certificat de cession formalise la remise du véhicule. Le formulaire officiel disponible sur Service Public est le Cerfa 15776*02. Il se prépare en deux exemplaires, signés par les parties : le cédant garde le premier et remet le second au destinataire. [3]",
    },
    {
      type: "p",
      text: "Téléchargez-le depuis la page officielle et utilisez sa notice pour renseigner les rubriques. Contrôlez l'immatriculation, les informations du véhicule, les personnes concernées et la destination pour destruction. Les date et heure indiquées doivent correspondre à la cession. [10]",
    },
    {
      type: "p",
      text: "Demandez les coordonnées exactes du centre VHU qui recevra la voiture. La personne qui organise le transport et le centre chargé de la destruction peuvent être deux intervenants distincts. Ne choisissez pas au hasard une raison sociale trouvée sur internet. Reportez les informations confirmées pour votre remise, y compris les références du centre lorsqu'elles sont pertinentes.",
    },
    {
      type: "p",
      text: "Avant de signer, relisez les deux exemplaires côte à côte. Ils doivent raconter la même opération. Vérifiez ensuite lequel vous conservez : une copie non signée enregistrée sur votre téléphone ne remplace pas votre exemplaire final.",
    },
    {
      type: "figure",
      src: `${IMG}/remise.webp`,
      alt: "Une femme tenant une chemise de documents échange avec un dépanneur en gilet jaune devant une voiture grise",
      caption:
        "Les informations de remise et le centre destinataire doivent être confirmés. La prise en charge administrative accompagne l'organisation du transport.",
      width: W,
      height: H,
    },

    { type: "h2", text: "Sans carte grise : préciser pourquoi elle manque" },
    {
      type: "p",
      text: "Une carte grise absente ne correspond pas à une situation unique. Pour un véhicule immatriculé en France, la fiche Service Public distingue la perte, le vol et le retrait après dommage. Le dossier adapté doit être préparé avec le centre destinataire. [1]",
    },
    {
      type: "table",
      head: ["Situation", "Justificatif à préparer", "Première action utile"],
      rows: [
        ["Carte grise perdue", "Déclaration de perte", "Signaler la perte et préparer le formulaire officiel"],
        ["Carte grise volée", "Déclaration de vol déposée auprès des forces de l'ordre", "Préciser que la carte a été volée et retrouver la déclaration"],
        ["Carte grise retirée après dommage", "Avis de retrait", "Retrouver le document remis lors du retrait et expliquer le contexte"],
      ],
    },
    {
      type: "p",
      text: "Ces justificatifs s'ajoutent aux autres éléments du dossier de destruction. Le formulaire officiel de déclaration de perte ou de vol permet de préparer la déclaration correspondante. [1] [4]",
    },
    {
      type: "p",
      text: "Expliquez le motif réel : « je ne retrouve plus les papiers » ne donne pas la même information que « le certificat a été retiré après l'accident ». Si vous avez seulement une ancienne copie, dites-le également. Le centre pourra préciser ce qui est utilisable et ce qui doit être obtenu.",
    },
    {
      type: "p",
      text: "Pour une immatriculation étrangère, les justificatifs et les démarches dépendent du pays concerné. Utilisez la rubrique correspondante de la fiche officielle plutôt que d'appliquer automatiquement la liste française. [1]",
    },
    {
      type: "figure",
      src: `${IMG}/documents-manquants.webp`,
      alt: "Tiroir de commode ouvert rempli de dossiers, une clé de voiture posée dessus",
      caption:
        "Avant la demande, retrouvez les documents disponibles et notez ce qui manque. Le motif de l'absence détermine la préparation du dossier.",
      width: W,
      height: H,
    },

    { type: "h2", text: "Succession, mandat, leasing : les cas à signaler" },
    { type: "h3", text: "Véhicule reçu dans une succession" },
    {
      type: "p",
      text: "Pour remettre le véhicule hérité à la casse, il n'est pas nécessaire de refaire la carte grise au nom des héritiers. Le dossier comprend notamment les pièces de cession au nom des héritiers et un justificatif de succession : attestation notariale, acte de notoriété ou, dans les conditions précisées par Service Public, certificat de décès accompagné d'une attestation des héritiers. [5]",
    },
    {
      type: "p",
      text: "Faites vérifier quels héritiers doivent signer et quel justificatif convient. Évitez de transformer la liste des possibilités en autorisation générale d'utiliser une simple attestation : les conditions de la fiche officielle doivent être réunies. Si plusieurs personnes conservent une partie du dossier, rassemblez les pièces avant de proposer un rendez-vous.",
    },
    { type: "h3", text: "Vous organisez la remise pour quelqu'un d'autre" },
    {
      type: "p",
      text: "Indiquez qui est le propriétaire, qui signera et qui sera présent. Une procuration pour signer et un mandat pour effectuer une démarche en ligne répondent à des besoins différents. Faites préciser ce qui est demandé pour votre cas, sans considérer qu'une autorisation orale règle tout le dossier.",
    },
    { type: "h3", text: "Le véhicule est en LOA ou en leasing" },
    {
      type: "p",
      text: "Le fait d'utiliser la voiture ne vous donne pas le droit de la céder comme si vous en étiez le propriétaire. En LOA, l'organisme de financement reste propriétaire du véhicule. Contactez-le avant d'engager une cession pour destruction. [6]",
    },

    { type: "h2", text: "La checklist avant le rendez-vous en PACA" },
    {
      type: "p",
      text: "À Marseille, Aubagne, La Ciotat, Cassis ou Nice, les formalités françaises restent les mêmes. La commune et le lieu de stationnement servent à préparer le déplacement. Les documents, eux, servent à préparer la remise du véhicule.",
    },
    { type: "p", text: "Avant de confirmer le passage, vérifiez que :" },
    {
      type: "list",
      items: [
        "Le véhicule est correctement identifié dans les documents et dans votre demande.",
        "Les papiers disponibles et manquants ont été indiqués, avec le motif d'une absence.",
        "Les personnes devant signer sont identifiées, ainsi que la présence ou le besoin d'une procuration.",
        "Le CSA est suffisamment récent pour la date de remise envisagée.",
        "Le centre destinataire et les documents à remettre sont confirmés.",
        "Vous savez quel exemplaire conserver et comment récupérer les justificatifs après la remise.",
        "L'accès a été décrit : portail, parking, sous-sol, roues bloquées ou absence de clés.",
      ],
    },
    {
      type: "p",
      text: "Pour préparer aussi la partie pratique, consultez les [conditions de l'enlèvement d'épave](guide:enlevement-epave-gratuit-paca) et le [guide des accès difficiles](guide:enlevement-acces-difficile).",
    },
    {
      type: "p",
      text: "Au premier contact, décrivez votre situation avant d'envoyer tout votre dossier. Si une copie sensible est demandée, vérifiez le destinataire et le canal convenu. Un filigrane précisant le motif et le destinataire peut limiter certaines réutilisations, sous réserve d'acceptation et de lisibilité ; il ne garantit pas une protection absolue. [8]",
    },

    { type: "h2", text: "Après la remise : conserver les justificatifs et suivre la déclaration" },
    {
      type: "p",
      text: "Rangez votre exemplaire signé du certificat de cession avec les documents reçus ensuite. Le certificat de destruction est délivré par le centre VHU ; celui-ci procède aussi à l'annulation de l'immatriculation dans le système des véhicules. Un message confirmant le passage du camion n'est pas ce certificat. [7]",
    },
    {
      type: "p",
      text: "Dans de nombreux cas, le centre enregistre la déclaration de cession pour destruction. Demandez ce qui a été fait et gardez le justificatif disponible. Si une démarche reste à votre charge, utilisez le téléservice indiqué par Service Public. Prévenez enfin votre assureur de la destruction pour faire traiter la résiliation. [1] [5]",
    },
    {
      type: "p",
      text: "Conservez des fichiers lisibles dans un dossier identifiable. Un nom comprenant le véhicule, la date de remise et le type de document vous aidera à les retrouver. Vérifiez les pièces enregistrées plutôt que de vous contenter d'une photographie floue ou d'un message égaré dans une conversation.",
    },
    {
      type: "figure",
      src: `${IMG}/classement.webp`,
      alt: "Classeur ouvert avec pochettes de documents, téléphone et stylo sur une table",
      caption:
        "Conservez les exemplaires signés et les justificatifs de la procédure dans un même dossier, avec des copies numériques lisibles.",
      width: W,
      height: H,
    },
  ],
  faqTitle: "Deux questions fréquentes sur les papiers",
  faq: [
    {
      q: "Faut-il refaire le contrôle technique avant la destruction ?",
      a: "Non. La remise pour destruction à un centre VHU ne nécessite pas de refaire un contrôle technique. Les règles de vente à un particulier répondent à un autre cas. [11]",
    },
    {
      q: "Une photo des papiers suffit-elle pour tout faire ?",
      a: "Une copie permet de préparer certains échanges ou démarches numériques. Elle ne dispense pas de remettre les pièces et exemplaires requis pour votre dossier. Faites confirmer ce qui doit être fourni en original avant le rendez-vous.",
    },
  ],
  cta: {
    title: "Un document manque pour votre épave ?",
    text: "Indiquez votre commune, le véhicule concerné et les papiers disponibles. Décrivez votre situation pour faire préciser la préparation de la remise et vérifier les conditions d'enlèvement.",
    label: "Préparer ma demande",
    href: "/enlevement-epave#demande",
    note: "Le rendez-vous et les conditions de prise en charge sont confirmés avant le déplacement.",
  },
  sourcesTitle: "Sources et formulaires officiels",
  sources: [
    {
      label: "Service Public — Véhicule à détruire et certificat d'immatriculation : dossier courant, absence de carte grise et déclaration.",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1468",
    },
    { label: "Service Public — Certificat de situation administrative : date, gage et opposition." },
    { label: "Service Public — Cerfa 15776*02, certificat de cession : exemplaires et signatures." },
    { label: "Service Public — Déclaration de perte ou de vol, Cerfa 13753*04." },
    { label: "Service Public — Hériter d'un véhicule immatriculé en France : rubrique « Vous le mettez à la casse »." },
    { label: "Service Public — Vendre ou donner son véhicule : propriétaire et LOA." },
    {
      label: "Ministère de la Transition écologique — Véhicules hors d'usage : certificat de destruction et immatriculation.",
      url: "https://www.ecologie.gouv.fr/politiques-publiques/vehicules-hors-dusage-vhu",
    },
    { label: "France Num — FiligraneFacile : précautions lors de l'envoi de copies." },
    { label: "Service Public — Accéder à HistoVec pour obtenir le CSA." },
    { label: "Notice officielle 51291 du certificat de cession." },
    { label: "France Titres-ANTS — Réponse sur la cession sans contrôle technique." },
  ],
  footnote:
    "Sources consultées le 14 octobre 2026. Les cas particuliers sont à vérifier avec le centre destinataire ; les formulaires doivent être récupérés depuis leur page officielle. Les six visuels sont des illustrations générées par IA. Ils ne représentent pas les clients, les équipes ou les interventions réelles d'EcocarVHU, ni des copies de documents officiels.",
  status: { contentVerified: true, publicationApproved: true },
};
