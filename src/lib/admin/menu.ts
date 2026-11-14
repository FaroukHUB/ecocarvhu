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
      { href: "/admin/agenda", label: "Agenda", emoji: "📅", soon: true },
      { href: "/admin/messages", label: "Messages types", emoji: "💬" },
    ],
  },
  {
    title: "Administratif",
    emoji: "📋",
    color: "bg-sky-400",
    items: [
      { href: "/admin/centre-vhu", label: "Suivi centre VHU", emoji: "♻️", soon: true },
      { href: "/admin/registre", label: "Registre", emoji: "📚", soon: true },
    ],
  },
  {
    title: "Argent",
    emoji: "💶",
    color: "bg-amber-400",
    items: [
      { href: "/admin/rachats", label: "Rachats", emoji: "🤝", soon: true },
      { href: "/admin/chiffres", label: "Chiffres du mois", emoji: "📊", soon: true },
      { href: "/admin/factures", label: "Factures et devis", emoji: "🧾", soon: true },
    ],
  },
  {
    title: "Clients pros",
    emoji: "🏢",
    color: "bg-violet-400",
    items: [
      { href: "/admin/pros", label: "Fichier pros", emoji: "📇", soon: true },
      { href: "/admin/prospection", label: "Prospection", emoji: "🎯", soon: true },
    ],
  },
  {
    title: "Visibilité",
    emoji: "📈",
    color: "bg-pink-400",
    items: [
      { href: "/admin/statistiques", label: "Statistiques du site", emoji: "📈" },
      { href: "/admin/google", label: "Positions Google", emoji: "🔎", soon: true },
      { href: "/admin/contenu", label: "Contenu", emoji: "✍️", soon: true },
      { href: "/admin/carte", label: "Carte des enlèvements", emoji: "🗺️", soon: true },
    ],
  },
  {
    title: "Chauffeur",
    emoji: "🚚",
    color: "bg-orange-400",
    items: [{ href: "/admin/chauffeur", label: "Espace chauffeur", emoji: "📱", soon: true }],
  },
];
