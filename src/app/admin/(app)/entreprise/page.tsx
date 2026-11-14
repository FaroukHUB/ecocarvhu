import type { Metadata } from "next";
import { Suspense } from "react";
import { CompanyForm } from "@/components/admin/CompanyForm";
import { Card, PageTitle } from "@/components/admin/ui";
import { companyReady, type Company } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Entreprise" };

export default function EntreprisePage() {
  return (
    <>
      <PageTitle emoji="🏷️" title="Informations de l'entreprise" subtitle="Elles apparaissent sur les devis et les factures." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Content />
      </Suspense>
    </>
  );
}

async function Content() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase.from("company_settings").select("*").eq("id", 1).single<Company>();
  if (!data) return null;
  return (
    <>
      {!companyReady(data) ? (
        <p className="mb-5 rounded-2xl bg-amber-50 p-4 text-amber-950">
          ⚠️ Tant que la raison sociale, le SIRET et l&apos;adresse ne sont pas remplis, vous pouvez préparer des brouillons mais pas
          émettre de devis ni de facture.
        </p>
      ) : null}
      <Card>
        <CompanyForm company={data} />
      </Card>
    </>
  );
}
