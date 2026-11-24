import { draftsVisible } from "@/config/env";
import { pages } from "@/content/pages";
import { hasPublishedPosts } from "@/lib/publication";

export interface NavItem {
  href: string;
  label: string;
}

export const showBlog = hasPublishedPosts() || draftsVisible;

export const mainNav: NavItem[] = [
  { href: pages.enlevement.path, label: "Enlèvement gratuit" },
  { href: pages.rachat.path, label: "Rachat" },
  { href: pages.rachatTaxi.path, label: "Taxis" },
  { href: pages.pros.path, label: "Professionnels" },
  { href: pages.zones.path, label: "Zones" },
  ...(showBlog ? [{ href: pages.conseils.path, label: "Blog" }] : []),
  { href: pages.contact.path, label: "Contact" },
];


export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { href: pages.enlevement.path, label: "Enlèvement d'épave gratuit" },
      { href: pages.rachat.path, label: "Rachat de véhicule" },
      { href: pages.rachatTaxi.path, label: "Rachat de taxi" },
      { href: pages.centreVhu.path, label: "Centre VHU agréé" },
      { href: pages.pros.path, label: "Professionnels" },
    ],
  },
  {
    title: "Informations",
    items: [
      { href: pages.zones.path, label: "Zones d'intervention" },
      ...(showBlog ? [{ href: pages.conseils.path, label: "Blog" }] : []),
      { href: pages.contact.path, label: "Contact" },
      { href: pages.mentions.path, label: "Mentions légales" },
      { href: pages.confidentialite.path, label: "Confidentialité" },
      { href: pages.conditions.path, label: "Conditions" },
    ],
  },
];
