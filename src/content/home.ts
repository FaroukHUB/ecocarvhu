import type { FaqItem } from "./sectors/types";

export const partFamilies = [
  { title: "Moteur et boîte", items: "Moteurs, boîtes de vitesses, turbos, injecteurs" },
  { title: "Carrosserie", items: "Portières, capots, pare-chocs, ailes, hayons" },
  { title: "Éclairage et vitrage", items: "Optiques, feux arrière, rétroviseurs, vitres" },
  { title: "Mécanique", items: "Alternateurs, démarreurs, trains roulants, freinage" },
  { title: "Électronique", items: "Calculateurs, commodos, compteurs, faisceaux" },
  { title: "Intérieur", items: "Sièges, garnitures, tableaux de bord, autoradios" },
];

export const homeFaq: FaqItem[] = [
  {
    q: "L'enlèvement de mon épave est-il vraiment gratuit ?",
    a: "Oui, l'enlèvement est gratuit pour un véhicule complet (moteur, pot catalytique, batterie) et accessible dans des conditions normales. Pour un véhicule incomplet ou un accès particulier (sous-sol, sans roues…), les conditions vous sont annoncées avant le rendez-vous, jamais après.",
  },
  {
    q: "Est-ce que ma demande en ligne vaut rendez-vous ?",
    a: "Non. Elle permet à l'équipe de vérifier la faisabilité et la situation administrative. Le rendez-vous est fixé ensuite, avec votre accord.",
  },
  {
    q: "Quels documents dois-je préparer ?",
    a: "La carte grise barrée et signée, la déclaration de cession et un certificat de situation administrative de moins de 15 jours. Des solutions existent si la carte grise est perdue ou volée.",
  },
  {
    q: "Je ne connais pas le nom de la pièce dont j'ai besoin : comment faire ?",
    a: "Décrivez ce que vous constatez et ajoutez une photo de l'emplacement ou de l'étiquette de la pièce. L'équipe identifie la pièce, puis vérifie sa disponibilité et sa compatibilité.",
  },
  {
    q: "Qui détruit le véhicule ?",
    a: "Un centre VHU partenaire, seul habilité à dépolluer et détruire un véhicule hors d'usage. Il délivre le certificat de destruction.",
  },
  {
    q: "Intervenez-vous dans ma commune ?",
    a: "La zone visée est la région Provence-Alpes-Côte d'Azur. Indiquez votre code postal dans la demande : la faisabilité est confirmée commune par commune.",
  },
];
