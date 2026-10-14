import type { FaqItem } from "./sectors/types";

/**
 * Contenus de l'accueil. Règle : aucune preuve, implantation, disponibilité,
 * délai ou tarif inventé. Ce qui dépend d'une confirmation de l'entreprise est
 * formulé comme vérifié au cas par cas.
 */

/* B + E — Rôles et déroulement ------------------------------------------- */

export const roles = [
  {
    who: "EcocarVHU",
    title: "Reçoit et prépare votre demande",
    points: [
      "Reçoit votre appel ou votre formulaire et vous rappelle.",
      "Vérifie la faisabilité : commune, accès, état du véhicule, matériel à prévoir.",
      "Vous indique les documents à préparer selon votre situation.",
      "Organise l'enlèvement et le transport vers le centre partenaire.",
    ],
  },
  {
    who: "Le centre VHU partenaire",
    title: "Assure la prise en charge réglementaire",
    points: [
      "Prend en charge le véhicule hors d'usage.",
      "Le dépollue, récupère les pièces réutilisables et oriente le reste vers le recyclage.",
      "Délivre le certificat de destruction.",
    ],
  },
];

export const steps = [
  {
    title: "Vous préparez la demande",
    text: "Commune, marque et modèle, état du véhicule, accès, documents disponibles. Une photo du véhicule et de l'accès aide beaucoup. Pas besoin d'envoyer vos papiers.",
  },
  {
    title: "L'équipe vérifie",
    text: "Faisabilité selon l'accès et l'état, matériel nécessaire, points administratifs (titulaire, gage, carte grise perdue). Elle vous rappelle si une précision manque.",
  },
  {
    title: "Conditions et rendez-vous confirmés",
    text: "Vous savez avant le déplacement si l'enlèvement est gratuit ou non, quels documents remettre, et quand. Le créneau que vous avez proposé n'est retenu qu'après cette confirmation.",
  },
  {
    title: "Enlèvement et certificat",
    text: "Les documents sont vérifiés, le véhicule est chargé et conduit au centre VHU partenaire, qui délivre le certificat de destruction selon la procédure applicable.",
  },
];

/* C — Situations de véhicules -------------------------------------------- */

export const situations = [
  {
    title: "Voiture en panne ou immobilisée depuis longtemps",
    text: "Moteur cassé, boîte hors service, réparation trop chère, véhicule qui n'a pas roulé depuis des mois.",
    provide: "Depuis quand il est immobilisé, si les pneus sont à plat, si les roues tournent encore.",
    check: "Le chargement possible et le matériel à prévoir.",
  },
  {
    title: "Véhicule accidenté",
    text: "Après un choc, lorsque le véhicule n'est pas cédé à l'assureur.",
    provide: "La nature des dégâts, si les roues avant sont faussées, et toute opposition signalée par l'expert ou l'assureur.",
    check: "La situation administrative : une opposition peut bloquer la cession.",
  },
  {
    title: "Véhicule non roulant",
    text: "Batterie morte, freins grippés, direction bloquée, véhicule qui ne peut pas être poussé.",
    provide: "S'il peut être déplacé, la distance jusqu'à la rue et la présence des clés.",
    check: "Le matériel nécessaire (treuil, plateau) et la faisabilité sur place.",
  },
  {
    title: "Véhicule difficile d'accès",
    text: "Sous-sol, box, cour étroite, voie en pente, résidence fermée par badge.",
    provide: "Le niveau et la hauteur maximale d'un parking, la largeur d'un portail, qui peut ouvrir.",
    check: "Si un camion plateau peut accéder et charger le véhicule en sécurité.",
  },
];

export const toVerify = [
  {
    title: "Sans clés",
    text: "La direction ou la boîte peuvent rester bloquées. L'enlèvement reste souvent envisageable, mais il faut le signaler pour prévoir le bon matériel.",
  },
  {
    title: "Sans roues ou incomplet",
    text: "Le chargement est plus complexe et un véhicule incomplet ne relève pas forcément de la gratuité. Les conditions sont étudiées avant tout rendez-vous.",
  },
  {
    title: "Sans carte grise",
    text: "Une déclaration de perte ou de vol peut la remplacer. Chaque situation (perte, vol, héritage, véhicule étranger) est examinée avant de fixer un rendez-vous.",
  },
];

/* D — Gratuité ----------------------------------------------------------- */

export const freeConditions = [
  {
    title: "Un véhicule complet",
    text: "Le moteur, le pot catalytique et la batterie sont présents. Un véhicule désossé ou incomplet fait l'objet d'une étude particulière.",
  },
  {
    title: "Un accès normal",
    text: "Le véhicule peut être approché et chargé sans manœuvre exceptionnelle. Sous-sol, absence de roues ou passage étroit : à signaler dans la demande.",
  },
  {
    title: "Une commune desservie",
    text: "La zone visée couvre la région PACA. La faisabilité est vérifiée pour chaque commune, à partir de votre code postal.",
  },
  {
    title: "Une confirmation avant le rendez-vous",
    text: "Gratuité ou conditions particulières : tout vous est annoncé avant le déplacement. Rien ne vous est demandé après coup.",
  },
];

/* F — Pièces auto d'occasion --------------------------------------------- */

export const partFamilies = [
  {
    title: "Moteurs et boîtes de vitesses",
    text: "La motorisation exacte (code moteur, cylindrée, puissance) et le type de boîte sont indispensables pour vérifier la correspondance.",
  },
  {
    title: "Alternateurs et démarreurs",
    text: "Une même voiture peut recevoir plusieurs modèles selon l'année ou la climatisation : la référence de l'étiquette évite l'erreur.",
  },
  {
    title: "Carrosserie",
    text: "Portières, capots, pare-chocs, ailes, hayons. Indiquez le côté, la couleur et, si possible, le code peinture.",
  },
  {
    title: "Éclairage et rétroviseurs",
    text: "Optiques, feux arrière, rétroviseurs : la technologie (halogène, xénon, LED) et les options (rabattable, chauffant) changent la pièce.",
  },
  {
    title: "Électronique",
    text: "Calculateurs, commodos, compteurs : la référence est souvent indispensable, et certaines pièces doivent être reprogrammées par un professionnel.",
  },
  {
    title: "Équipements intérieurs",
    text: "Sièges, garnitures, commandes : précisez la finition et la couleur, qui varient au sein d'un même modèle.",
  },
];

export const partChecklist = [
  "Marque, modèle, année de première mise en circulation et motorisation (sur la carte grise).",
  "La référence constructeur, si vous la trouvez sur la pièce ou son étiquette.",
  "Une photo de la pièce, de son étiquette ou de son emplacement.",
  "Si vous ne connaissez pas le nom : une description de ce que vous constatez suffit.",
];

/* G — Rachat ------------------------------------------------------------- */

export const buybackInfo = [
  "Le modèle, l'année et le kilométrage.",
  "L'état mécanique et les dommages connus.",
  "La présence des clés et de la carte grise à votre nom.",
  "Plusieurs photos : avant, arrière, côtés, intérieur, compteur.",
];

/* H — Professionnels ----------------------------------------------------- */

export const proUses = [
  { title: "Une étude de rachat", text: "Un véhicule qui garde de la valeur : demandez une étude, sans estimation automatique." },
  { title: "Les informations des véhicules", text: "État, clés, carte grise et accès au site : de quoi confirmer les conditions avant le passage." },
  { title: "Des véhicules à faire enlever", text: "Épaves de clients ou véhicules abandonnés à l'atelier : décrivez le lot, les conditions sont étudiées." },
  { title: "Une relation régulière", text: "Garages, carrossiers, dépanneurs : proposez une collaboration, ses modalités sont discutées au cas par cas." },
];

/* K — FAQ ---------------------------------------------------------------- */

export const homeFaq: FaqItem[] = [
  {
    q: "L'enlèvement de mon épave est-il vraiment gratuit ?",
    a: "Oui, pour un véhicule complet (moteur, pot catalytique, batterie) et accessible dans des conditions normales, dans une commune desservie. Pour un véhicule incomplet ou un accès particulier, les conditions vous sont annoncées avant le rendez-vous, jamais après.",
    link: { href: "/enlevement-epave", label: "Voir les conditions de l'enlèvement" },
  },
  {
    q: "Quels documents préparer pour faire enlever une épave ?",
    a: "La carte grise barrée avec la mention « vendu pour destruction », datée et signée, la déclaration de cession et un certificat de situation administrative de moins de 15 jours. Des solutions existent si la carte grise est perdue ou volée.",
    link: { href: "/centre-vhu", label: "Le détail des documents et des cas particuliers" },
  },
  {
    q: "Mon véhicule ne roule plus et je n'ai plus les clés : est-ce possible ?",
    a: "Souvent, mais cela se vérifie. Indiquez-le dans la demande : sans clés, la direction ou la boîte peuvent rester bloquées et l'équipe doit prévoir le bon matériel.",
  },
  {
    q: "Le véhicule est dans un sous-sol ou un passage étroit : que faire ?",
    a: "Décrivez l'accès (niveau, hauteur maximale, largeur du portail) et ajoutez une photo de l'entrée. La faisabilité est confirmée avant tout déplacement.",
  },
  {
    q: "Est-ce que ma demande en ligne vaut rendez-vous ?",
    a: "Non. Elle permet de vérifier la faisabilité et la situation administrative. Le rendez-vous est fixé ensuite, avec votre accord. Elle ne vaut pas non plus autorisation de destruction.",
  },
  {
    q: "Proposez-vous des pièces auto d'occasion ?",
    a: "Le service de pièces auto d'occasion est en cours de préparation. Les demandes de pièces seront ouvertes dès qu'il sera prêt ; en attendant, l'enlèvement d'épave et l'étude de rachat restent disponibles.",
    link: { href: "/pieces-auto-occasion", label: "Pièces auto d'occasion" },
  },
  {
    q: "Comment se passe une étude de rachat ?",
    a: "Vous envoyez les caractéristiques, l'état et des photos. L'équipe étudie la demande et vous indique si une offre est possible. Une première réponse reste indicative : l'offre définitive suppose de vérifier le véhicule.",
    link: { href: "/rachat-vehicule", label: "Demander une étude de rachat" },
  },
  {
    q: "Intervenez-vous dans ma commune ?",
    a: "La zone visée est la région Provence-Alpes-Côte d'Azur. Indiquez votre code postal dans la demande ou par téléphone : la faisabilité est confirmée commune par commune.",
    link: { href: "/zones-intervention", label: "Les zones d'intervention" },
  },
];
