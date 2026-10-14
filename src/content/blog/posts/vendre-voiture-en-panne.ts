import type { Post } from "../types";

const IMG = "/images/blog/vendre-voiture-en-panne";
const W = 1672;
const H = 941;

/** Article 3, transmis par le porteur de projet (PDF du 14/10/2026), repris fidèlement. */
export const vendreVoitureEnPanne: Post = {
  slug: "vendre-voiture-en-panne",
  title: "Voiture en panne ou non roulante : peut-on la vendre et à qui ?",
  description:
    "Voiture en panne ou non roulante : peut-on la vendre à un particulier, à qui s'adresser, comment préparer une demande de rachat en PACA et comparer les offres.",
  h1: "Voiture en panne ou non roulante : peut-on la vendre et à qui ?",
  excerpt:
    "Vente à un particulier, rachat par un professionnel ou destruction : les règles à connaître et les informations à réunir pour faire étudier le rachat d'une voiture qui ne roule plus.",
  lead:
    "Votre voiture ne démarre plus, une réparation devient trop coûteuse ou un accident vous oblige à chercher une solution. Avant de publier une annonce, il faut distinguer trois questions : le véhicule peut-il encore circuler, qui peut l'acheter et est-il destiné à être réparé ou détruit ? Ce guide vous aide à préparer une demande de rachat en PACA avec les bonnes informations, sans confondre estimation, enlèvement et destruction.",
  category: "Rachat et reprise",
  author: "La rédaction EcocarVHU",
  date: "2026-10-14",
  sourcesCheckedOn: "14 octobre 2026",
  cover: {
    src: `${IMG}/couverture.webp`,
    alt: "Voiture grise capot ouvert dans la cour d'une maison en pierre, sous un olivier",
    caption:
      "Une voiture immobilisée peut justifier une étude de rachat. Son état et sa situation administrative déterminent les possibilités.",
    width: 1672,
    height: 941,
  },
  keyPoints: {
    title: "Le point en 30 secondes",
    highlight: "Une panne ne signifie pas automatiquement la casse.",
    items: [
      "Un véhicule qui n'est plus en état de rouler ne se vend pas à un particulier, même « pour pièces ». La vente relève d'un professionnel de l'automobile. [1]",
      "**Le rachat dépend du dossier.** Modèle, panne, dommages, documents et transport comptent. Une demande d'estimation ne garantit ni une offre ni un montant.",
      "**Vente et destruction suivent des démarches différentes.** Faites préciser le destinataire, le prix éventuel, les frais et les justificatifs avant la remise.",
    ],
    tip: "Le bon premier réflexe : décrire précisément le véhicule et demander quelle opération est proposée.",
  },
  blocks: [
    { type: "h2", text: "Peut-on vendre une voiture en panne à un particulier ?" },
    {
      type: "p",
      text: "Le mot « panne » recouvre des situations très différentes. Une voiture présentant un défaut à réparer peut encore être en état de rouler ; une autre, moteur bloqué ou immobilisée, ne l'est plus. Le fait de pouvoir la déplacer de quelques mètres ne suffit pas à établir qu'elle peut circuler normalement. Des photos ne permettent pas non plus de trancher sa sécurité.",
    },
    {
      type: "p",
      text: "**Pour un véhicule réellement non roulant, la vente à un particulier est interdite, y compris avec une annonce « pour pièces ».** Il faut s'adresser à un professionnel de l'automobile identifié. La seule présence d'un numéro Siret sur une annonce ne décrit pas son activité : demandez la raison sociale de l'acquéreur et vérifiez son identité dans l'Annuaire des entreprises. [1] [7]",
    },
    { type: "h3", text: "Le contrôle technique change-t-il la réponse ?" },
    {
      type: "p",
      text: "Pour une vente à un particulier d'une voiture concernée par le contrôle technique, âgée de quatre ans ou plus, la preuve du contrôle doit respecter le délai applicable : moins de six mois, ou le délai de contre-visite de deux mois lorsqu'elle est prescrite. Une voiture de moins de quatre ans peut être vendue sans cette preuve. La vente à un garage ou à un concessionnaire constitue aussi un cas où elle n'est pas exigée. [2] [3]",
    },
    {
      type: "p",
      text: "**Une défaillance critique impose des réparations et une contre-visite avant une vente à un particulier.** Écrire « vendu en l'état » ne remplace pas ces exigences et ne dispense pas d'informer l'acheteur des défauts connus. [3]",
    },

    { type: "h2", text: "Rachat, réparation ou destruction : quelle voie choisir ?" },
    {
      type: "p",
      text: "Le choix se prépare en comparant une réparation réaliste, une éventuelle offre d'achat et une remise dans la filière VHU. Les trois opérations ne produisent pas le même résultat.",
    },
    {
      type: "table",
      head: ["Option", "Quand l'examiner ?", "Ce qu'il faut clarifier"],
      rows: [
        ["Faire réparer et conserver la voiture", "Un diagnostic permet de chiffrer la remise en état.", "Coût total, travaux nécessaires et intérêt de garder le véhicule."],
        ["Vendre à un professionnel de l'automobile", "Un acquéreur accepte d'étudier le véhicule dans son état actuel.", "Identité de l'acheteur, prix, conditions de vérification et transport."],
        ["Remettre pour destruction", "Vous souhaitez vous débarrasser du véhicule dans la filière VHU.", "Centre destinataire, formalités, collecte et certificat de destruction."],
      ],
    },
    {
      type: "p",
      text: "Un véhicule destiné à la destruction doit rejoindre un centre VHU habilité. Le certificat de destruction est remis par ce centre. À l'inverse, une vente en vue d'une réparation n'implique pas automatiquement la destruction ni la délivrance de ce certificat. [4]",
    },
    {
      type: "p",
      text: "Une reprise gratuite et un rachat rémunéré répondent également à deux questions différentes. Le fait qu'un véhicule puisse être collecté ne signifie pas qu'une somme sera versée au propriétaire. Pour les modalités d'enlèvement, consultez la [page dédiée à l'enlèvement d'épaves](/enlevement-epave) et faites confirmer les conditions de votre demande.",
    },

    { type: "h2", text: "Combien vaut une voiture en panne ou non roulante ?" },
    {
      type: "p",
      text: "Il n'existe pas de prix sérieux valable pour toutes les voitures immobilisées. Deux véhicules du même modèle peuvent susciter des propositions différentes selon leur état, leur historique et les coûts nécessaires pour les prendre en charge. Une annonce de voiture roulante comparable donne un contexte ; elle ne constitue pas la valeur de votre véhicule en panne.",
    },
    {
      type: "figure",
      src: `${IMG}/diagnostic.webp`,
      alt: "Mécanicien penché sur le moteur d'une voiture grise, capot ouvert, dans un atelier",
      caption: "Un diagnostic documenté donne plus d'informations qu'une simple mention « moteur HS ».",
      width: W,
      height: H,
    },
    { type: "h3", text: "Les critères utiles pour préparer l'estimation" },
    {
      type: "table",
      head: ["Information", "Pourquoi elle compte", "Comment la présenter"],
      rows: [
        ["Modèle, année et motorisation", "Identifier précisément la version étudiée.", "Reprendre les informations du véhicule, sans supposer sa finition."],
        ["Kilométrage et entretien", "Comprendre l'usage et les travaux déjà réalisés.", "Indiquer le compteur et les factures disponibles."],
        ["Panne et diagnostic", "Évaluer l'incertitude sur la remise en état.", "Joindre un devis existant ou décrire les symptômes observés."],
        ["Dommages et état général", "Repérer les éléments à examiner.", "Montrer l'ensemble de la voiture et les défauts en détail."],
        ["Clés, composants et documents", "Préparer la vérification et la prise en charge.", "Signaler immédiatement un élément manquant."],
        ["Localisation et accès", "Organiser le transport et apprécier ses contraintes.", "Donner la commune, le type de stationnement et les obstacles."],
      ],
    },
    {
      type: "p",
      text: "Cette grille prépare une discussion ; ce n'est pas un barème de prix. La demande pour un modèle, les possibilités de remise en état et les coûts supportés par l'acquéreur entrent aussi dans son appréciation.",
    },
    {
      type: "p",
      text: "Avant de payer une réparation uniquement pour espérer une meilleure revente, comparez le devis à une éventuelle offre dans l'état actuel. Si aucun diagnostic n'existe, dites-le. « Ne démarre plus depuis telle date » est une information plus fiable qu'une panne précise déduite d'une recherche sur internet.",
    },

    { type: "h2", text: "Voiture accidentée : vérifier l'expertise avant la vente" },
    {
      type: "p",
      text: "Un pare-chocs abîmé, une déformation importante ou une voiture déclarée dangereuse ne relèvent pas du même dossier. Après un accident, les conclusions de l'expert et les mesures administratives peuvent limiter la circulation ou le transfert de la carte grise. **Une opposition liée à la dangerosité peut toutefois permettre une cession en l'état à un professionnel de l'automobile ou à l'assureur, dans le cadre de la procédure applicable.** Il faut identifier le motif exact ; toutes les oppositions ne se traitent pas de la même manière. [5]",
    },
    {
      type: "figure",
      src: `${IMG}/dommages.webp`,
      alt: "Avant d'une voiture grise accidentée, pare-chocs et aile enfoncés",
      caption: "Les photos montrent les dommages visibles ; elles ne remplacent pas un rapport d'expertise.",
      width: W,
      height: H,
    },
    {
      type: "p",
      text: "Transmettez les conclusions déjà disponibles et indiquez si un échange avec votre assureur est en cours. Si vous avez accepté une proposition de cession dans ce cadre, clarifiez d'abord la suite du dossier avec lui. Une autre demande de reprise ne doit pas être préparée comme si aucune démarche n'existait.",
    },
    {
      type: "p",
      text: "Évitez les raccourcis « accidentée donc bonne pour la casse » et « elle démarre donc elle peut rouler ». La décision repose sur l'état réel du véhicule et son dossier, pas sur l'apparence d'une seule photo.",
    },

    { type: "h2", text: "Préparer une demande de rachat avec les bonnes informations" },
    {
      type: "p",
      text: "Une demande précise évite les échanges consacrés à retrouver la version du véhicule ou à découvrir un obstacle le jour de la reprise. Pour un premier examen, préparez :",
    },
    {
      type: "list",
      items: [
        "La marque, le modèle, l'année et la motorisation, si vous les connaissez.",
        "Le kilométrage affiché et les informations d'entretien disponibles.",
        "La panne observée, la date d'immobilisation et un éventuel diagnostic écrit.",
        "Les dommages, les éléments démontés ou manquants et l'état de l'habitacle.",
        "Le nombre de clés et la disponibilité de la carte grise.",
        "La commune en PACA et les conditions d'accès : rue, cour, parking, sous-sol.",
        "Les photos du véhicule entier, des défauts et des éléments utiles au dossier.",
        "Votre téléphone ou votre e-mail pour obtenir une réponse après étude.",
      ],
    },
    {
      type: "p",
      text: "Inutile d'embellir l'état de la voiture. Une information manquante peut être demandée ; une différence importante découverte sur place peut obliger à revoir la proposition ou l'organisation prévue.",
    },
    {
      type: "figure",
      src: `${IMG}/photos.webp`,
      alt: "Un homme photographie avec son téléphone l'arrière d'une voiture grise garée dans une cour",
      caption: "Une vue d'ensemble et des photos nettes des défauts permettent un premier examen plus utile.",
      width: W,
      height: H,
    },
    { type: "h3", text: "Quelles photos envoyer ?" },
    {
      type: "p",
      text: "Prenez les quatre côtés, l'habitacle et chaque zone endommagée. Un détail de la panne n'est utile que s'il est visible ; n'ouvrez pas un élément dangereux pour compléter la demande. Photographiez le véhicule sur place, sans déplacement risqué.",
    },
    {
      type: "p",
      text: "Pour le premier contact, privilégiez les informations du véhicule. Évitez d'envoyer spontanément des papiers d'identité ou des photos laissant apparaître des documents personnels en arrière-plan. Les justificatifs nécessaires pourront être précisés lorsque le type de cession et l'interlocuteur seront identifiés.",
    },

    { type: "h2", text: "Quels documents préparer pour céder le véhicule ?" },
    {
      type: "p",
      text: "**La vente doit être faite par le propriétaire.** Les signatures des cotitulaires sont nécessaires ; une personne utilisant une voiture en LOA n'en est pas automatiquement propriétaire. La carte grise et la situation de propriété doivent donc être vérifiées avant l'accord. [3]",
    },
    {
      type: "p",
      text: "Pour une cession ordinaire, préparez la carte grise, le certificat de cession et le certificat de situation administrative. Ce dernier, daté de moins de quinze jours, permet de vérifier notamment un gage ou une opposition. Le formulaire de cession est disponible sur sa page officielle : utilisez la version proposée au moment de la démarche. [6] [8]",
    },
    {
      type: "p",
      text: "Si la carte grise manque ou si le véhicule dépend d'une succession, signalez-le avant de convenir de la remise. Les démarches peuvent différer. La checklist publiée dans le [guide des documents pour la remise d'un véhicule](guide:documents-enlevement-epave-paca) traite ces situations pour une destruction ; elle ne remplace pas la procédure d'une vente ordinaire.",
    },
    {
      type: "figure",
      src: `${IMG}/documents.webp`,
      alt: "Chemise kraft et clé de voiture posées sur un établi, une voiture grise en arrière-plan",
      caption: "Vérifiez les documents disponibles avant la remise, sans confondre vente et destruction.",
      width: W,
      height: H,
    },
    {
      type: "p",
      text: "Dans une vente ordinaire, renseignez la date et l'heure exactes avec l'acquéreur et conservez votre exemplaire signé. Déclarez la cession dans les quinze jours et avertissez l'assureur. Un simple message annonçant « voiture récupérée » ne remplace pas les justificatifs de la démarche. [3]",
    },

    { type: "h2", text: "Comparer les offres sans se limiter au montant annoncé" },
    {
      type: "p",
      text: "Avant de retenir une proposition, demandez si le montant est confirmé ou conditionné à une inspection. Faites préciser ce qui pourrait le modifier : écart entre la description et le véhicule, pièces manquantes, documents incomplets ou contraintes de transport non signalées.",
    },
    {
      type: "p",
      text: "Comparez également le montant effectivement versé, les frais éventuels, le destinataire inscrit sur la cession et les modalités de paiement. Une offre plus élevée accompagnée de frais reste difficile à comparer tant que ces frais ne sont pas chiffrés.",
    },
    {
      type: "p",
      text: "Demandez un écrit reprenant les conditions convenues. Avant la remise des clés, assurez-vous que vous comprenez l'opération et que les documents correspondent au véhicule et à l'acquéreur. Ne signez pas un certificat de cession laissé vide pour « le compléter plus tard ».",
    },

    { type: "h2", text: "Organiser une reprise en PACA : l'accès compte aussi" },
    {
      type: "p",
      text: "À Marseille, Aubagne, La Ciotat, Cassis ou Nice, une demande peut concerner un véhicule dans une rue étroite, une résidence ou un parking souterrain. Ces exemples décrivent des contraintes possibles ; ils ne garantissent pas une intervention à chaque adresse.",
    },
    {
      type: "p",
      text: "Précisez si la voiture peut être approchée par un véhicule de transport, si les roues tournent et si la direction peut être déverrouillée. Indiquez aussi une pente, une barrière, une hauteur limitée ou une place bloquée. Ces détails servent à organiser la reprise, pas à calculer automatiquement un prix.",
    },
    {
      type: "figure",
      src: `${IMG}/transport.webp`,
      alt: "Voiture grise chargée sur une dépanneuse plateau devant un garage",
      caption: "La commune, l'accès et l'état d'immobilisation doivent être connus avant de confirmer le transport.",
      width: W,
      height: H,
    },
    {
      type: "p",
      text: "La faisabilité, les conditions financières et le créneau sont à confirmer après étude. Consultez les [zones d'intervention](/zones-intervention) puis décrivez votre adresse de prise en charge. N'essayez pas de conduire un véhicule dangereux pour simplifier l'enlèvement.",
    },
  ],
  faqTitle: "Questions fréquentes sur le rachat d'une voiture en panne",
  faq: [
    {
      q: "Une voiture qui ne démarre plus peut-elle encore avoir une valeur ?",
      a: "Une étude peut être utile, mais une offre n'est pas automatique. Le modèle, l'état, les informations disponibles et les coûts de prise en charge comptent. Un kilométrage faible ne suffit pas à garantir un prix.",
    },
    {
      q: "Peut-on la vendre à un particulier qui veut la réparer ?",
      a: "Si elle n'est plus en état de rouler, la vente au particulier n'est pas permise, même s'il souhaite la réparer. Le projet de l'acheteur ne change pas la règle. [1]",
    },
    {
      q: "Faut-il attendre une estimation pour demander l'enlèvement ?",
      a: "Vous pouvez expliquer dès le premier échange si vous cherchez un rachat ou une remise pour destruction. L'interlocuteur doit clarifier la solution étudiée ; ces demandes ne signifient pas qu'une offre ou un rendez-vous est déjà confirmé.",
    },
    {
      q: "Recevrai-je forcément un certificat de destruction ?",
      a: "Seulement lorsqu'il s'agit de la remise pour destruction dans la filière VHU, avec le certificat délivré par le centre destinataire. Une vente à un professionnel pour réparation correspond à une autre opération. [4]",
    },
  ],
  cta: {
    eyebrow: "Passer à l'étape suivante",
    title: "Votre voiture est immobilisée en PACA ? Faites étudier votre dossier.",
    text: "Décrivez la voiture, sa panne, ses dommages et son lieu de stationnement dans la demande de rachat de véhicule. EcocarVHU pourra examiner votre demande et préciser la suite possible.",
    label: "Faire étudier le rachat",
    href: "/rachat-vehicule#demande",
    note: "Étude selon l'état, les documents et l'éligibilité du véhicule. Aucune offre, aucun prix ni créneau garantis avant confirmation.",
  },
  sourcesTitle: "Sources et formulaires officiels",
  sources: [
    { label: "Service Public — Peut-on vendre ou acheter un véhicule non roulant ?" },
    { label: "Service Public — Peut-on vendre un véhicule d'occasion sans contrôle technique ?" },
    { label: "Service Public — Vendre ou donner son véhicule." },
    {
      label: "Service Public — Véhicule à détruire et certificat d'immatriculation.",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1468",
    },
    { label: "Service Public — Véhicule accidenté : conséquences sur la carte grise." },
    { label: "Service Public — Certificat de situation administrative." },
    { label: "Service Public Entreprendre — Annuaire des entreprises : rechercher les informations d'une entreprise." },
    { label: "Service Public — Certificat de cession d'un véhicule d'occasion." },
  ],
  footnote:
    "Sources consultées le 14 octobre 2026. Les références réglementaires concernent les voitures immatriculées en France. Les tableaux d'estimation et conseils de préparation sont des repères pratiques, sans barème de prix. Images : illustrations générées par IA. Elles ne représentent pas des clients, des interventions ou des locaux réels d'EcocarVHU.",
  status: { contentVerified: true, publicationApproved: true },
};
