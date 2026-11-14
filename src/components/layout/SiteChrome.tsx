import { company, contactHref } from "@/config/company";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallFab } from "@/components/layout/CallFab";
import { JsonLd } from "@/components/ui/primitives";
import { organizationJsonLd } from "@/lib/seo";

/** En-tête, pied de page et bouton d'appel du site public (pas de l'espace de gestion). */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const tel = contactHref();
  const whatsapp = Boolean(tel?.startsWith("https://wa.me/"));
  return (
    <>
      <Header />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer />
      {tel && company.phone ? (
        <CallFab
          href={tel}
          whatsapp={whatsapp}
          label={whatsapp ? `Écrire sur WhatsApp au ${company.phone.value}` : `Appeler le ${company.phone.value}`}
        />
      ) : null}
      <JsonLd data={organizationJsonLd()} />
    </>
  );
}
