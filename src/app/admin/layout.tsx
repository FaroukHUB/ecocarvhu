import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Espace de gestion — EcocarVHU", template: "%s — Gestion EcocarVHU" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-surface text-ink">{children}</div>;
}
