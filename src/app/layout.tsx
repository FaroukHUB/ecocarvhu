import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SiteAnalytics } from "@/components/layout/SiteAnalytics";
import { company } from "@/config/company";
import { indexingAllowed, siteEnv, siteUrl } from "@/config/env";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "EcocarVHU — Enlèvement d'épave et pièces auto d'occasion en PACA",
    template: "%s | EcocarVHU",
  },
  applicationName: company.brandName,
  formatDetection: { telephone: false },
  robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1b1f23",
  width: "device-width",
  initialScale: 1,
};

/** Racine commune : le site public est dans (site), l'espace de gestion dans admin. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
