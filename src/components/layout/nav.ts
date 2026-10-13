import { draftsVisible } from "@/config/env";
import { pages } from "@/content/pages";
import { hasPublishedGuides } from "@/lib/publication";

export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: pages.enlevement.path, label: "Enlèvement gratuit" },
  { href: pages.pieces.path, label: "Pièces d'occasion" },
  { href: pages.rachat.path, label: "Rachat" },
  { href: pages.pros.path, label: "Professionnels" },
  { href: pages.zones.path, label: "Zones" },
  { href: pages.contact.path, label: "Contact" },
];

export const showConseils = hasPublishedGuides() || draftsVisible;

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { href: pages.enlevement.path, label: "Enlèvement d'épave gratuit" },
      { href: pages.centreVhu.path, label: "Centre VHU partenaire" },
      { href: pages.pieces.path, label: "Pièces auto d'occasion" },
      { href: pages.demandePiece.path, label: "Demande de pièce" },
      { href: pages.rachat.path, label: "Rachat de véhicule" },
      { href: pages.pros.path, label: "Professionnels" },
    ],
  },
  {
    title: "Informations",
    items: [
      { href: pages.zones.path, label: "Zones d'intervention" },
      ...(showConseils ? [{ href: pages.conseils.path, label: "Conseils pratiques" }] : []),
      { href: pages.contact.path, label: "Contact" },
      { href: pages.mentions.path, label: "Mentions légales" },
      { href: pages.confidentialite.path, label: "Confidentialité" },
      { href: pages.conditions.path, label: "Conditions" },
    ],
  },
];
