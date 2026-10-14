import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { company, telHref } from "@/config/company";
import { indexingAllowed, siteEnv, siteUrl } from "@/config/env";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallFab } from "@/components/layout/CallFab";
import { JsonLd } from "@/components/ui/primitives";
import { organizationJsonLd } from "@/lib/seo";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const tel = telHref();
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        {tel && company.phone ? <CallFab href={tel} label={`Appeler le ${company.phone.value}`} /> : null}
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
