/** Menu de l'espace de gestion : catégories, sous-catégories, couleurs. */

export interface MenuItem {
  href: string;
  label: string;
  emoji: string;
  /** Pas encore disponible : affiché avec le badge « Bientôt ». */
  soon?: boolean;
  badge?: "nouvelles";
}

export interface MenuCategory {
  title: string;
  emoji: string;
  /** Couleur de la pastille de catégorie (classes Tailwind). */
  color: string;
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    title: "Accueil",
    emoji: "🏠",
    color: "bg-emerald-400",
    items: [{ href: "/admin", label: "Ma journée", emoji: "☀️" }],
  },
  {
    title: "Enlèvements",
    emoji: "🚗",
    color: "bg-lime-400",
    items: [
      { href: "/admin/demandes", label: "Demandes", emoji: "📥", badge: "nouvelles" },
      { href: "/admin/vehicules", label: "Fiches véhicules", emoji: "🚘" },
      { href: "/admin/agenda", label: "Agenda", emoji: "📅" },
      { href: "/admin/messages", label: "Messages types", emoji: "💬" },
    ],
  },
  {
    title: "Administratif",
    emoji: "📋",
    color: "bg-sky-400",
    items: [
      { href: "/admin/centre-vhu", label: "Suivi centre VHU", emoji: "♻️" },
      { href: "/admin/registre", label: "Registre", emoji: "📚" },
    ],
  },
  {
    title: "Argent",
    emoji: "💶",
    color: "bg-amber-400",
    items: [
      { href: "/admin/rachats", label: "Rachats", emoji: "🤝" },
      { href: "/admin/chiffres", label: "Chiffres du mois", emoji: "📊" },
      { href: "/admin/factures", label: "Factures et devis", emoji: "🧾" },
    ],
  },
  {
    title: "Clients pros",
    emoji: "🏢",
    color: "bg-violet-400",
    items: [
      { href: "/admin/pros", label: "Fichier pros", emoji: "📇" },
      { href: "/admin/prospection", label: "Prospection", emoji: "🎯" },
    ],
  },
  {
    title: "Visibilité",
    emoji: "📈",
    color: "bg-pink-400",
    items: [
      { href: "/admin/statistiques", label: "Statistiques du site", emoji: "📈" },
      { href: "/admin/google", label: "Positions Google", emoji: "🔎" },
      { href: "/admin/contenu", label: "Contenu", emoji: "✍️" },
      { href: "/admin/carte", label: "Carte des enlèvements", emoji: "🗺️" },
    ],
  },
  {
    title: "Chauffeur",
    emoji: "🚚",
    color: "bg-orange-400",
    items: [{ href: "/admin/chauffeur", label: "Espace chauffeur", emoji: "📱" }],
  },
  {
    title: "Réglages",
    emoji: "⚙️",
    color: "bg-stone-300",
    items: [
      { href: "/admin/entreprise", label: "Entreprise", emoji: "🏷️" },
      { href: "/admin/equipe", label: "Équipe et accès", emoji: "👥" },
    ],
  },
];

/** Menu réduit du chauffeur : uniquement sa tournée. */
export const CHAUFFEUR_MENU: MenuCategory[] = [
  {
    title: "Ma tournée",
    emoji: "🚚",
    color: "bg-orange-400",
    items: [{ href: "/admin/chauffeur", label: "Mes enlèvements", emoji: "📱" }],
  },
];
