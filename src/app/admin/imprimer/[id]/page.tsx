import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PrintButton } from "@/components/admin/PrintButton";
import { euro, type Company, type Facture } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Impression" };

export default function PrintPage({ params }: PageProps<"/admin/imprimer/[id]">) {
  return (
    <Suspense fallback={null}>
      <Doc params={params} />
    </Suspense>
  );
}

async function Doc({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const [{ data: f }, { data: current }] = await Promise.all([
    supabase.from("factures").select("*").eq("id", id).maybeSingle<Facture>(),
    supabase.from("company_settings").select("*").eq("id", 1).single<Company>(),
  ]);
  if (!f) notFound();
  const s = f.seller ?? current;
  const title = f.kind === "devis" ? "DEVIS" : "FACTURE";
  const missing = (v: string | undefined, label: string) => v || <span className="font-bold text-red-600 print:text-black">[{label} à compléter]</span>;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[210mm] p-8 text-[13px] leading-relaxed text-black print:p-0">
        <div className="mb-6 flex justify-between gap-4 print:hidden">
          <p className="text-sm text-stone-500">Aperçu avant impression. Pour un PDF, choisis « Enregistrer en PDF » dans la fenêtre d&apos;impression.</p>
          <PrintButton />
        </div>
        {!f.numero ? <p className="mb-4 rounded bg-amber-100 p-2 text-center font-bold">BROUILLON — document non émis</p> : null}

        <header className="flex justify-between gap-8">
          <div>
            <p className="text-xl font-bold">EcocarVHU</p>
            <p>{missing(s?.legal_name, "Raison sociale")}{s?.legal_form ? ` — ${s.legal_form}` : ""}</p>
            <p className="whitespace-pre-line">{missing(s?.address, "Adresse")}</p>
            <p>{[s?.postal_code, s?.city].filter(Boolean).join(" ")}</p>
            {s?.phone ? <p>Tél. {s.phone}</p> : null}
            {s?.email ? <p>{s.email}</p> : null}
            <p>SIRET : {missing(s?.siret, "SIRET")}</p>
            {s?.rcs ? <p>{s.rcs}</p> : null}
            {s?.capital ? <p>Capital : {s.capital}</p> : null}
            {s?.tva_number && !s.tva_franchise ? <p>TVA intracommunautaire : {s.tva_number}</p> : null}
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tracking-wide">{title}</p>
            <p className="mt-1 text-base font-semibold">N° {f.numero ?? "—"}</p>
            <p>Date : {f.issued_at ? formatDate(f.issued_at, false) : "—"}</p>
            {f.due_at ? <p>{f.kind === "facture" ? "Échéance" : "Valable jusqu'au"} : {formatDate(f.due_at, false)}</p> : null}
          </div>
        </header>

        <section className="mt-8 ml-auto w-1/2 rounded border border-stone-300 p-4">
          <p className="text-xs uppercase text-stone-500">Client</p>
          <p className="font-semibold">{f.client_name || "—"}</p>
          <p className="whitespace-pre-line">{f.client_address}</p>
          {f.client_siret ? <p>SIRET : {f.client_siret}</p> : null}
        </section>

        <table className="mt-8 w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black text-left">
              <th className="py-2">Désignation</th>
              <th className="py-2 text-right">Qté</th>
              <th className="py-2 text-right">Prix unitaire HT</th>
              <th className="py-2 text-right">TVA</th>
              <th className="py-2 text-right">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {(f.lines ?? []).map((l, i) => (
              <tr key={i} className="border-b border-stone-200">
                <td className="py-2 pr-2">{l.label}</td>
                <td className="py-2 text-right tabular-nums">{String(l.qty).replace(".", ",")}</td>
                <td className="py-2 text-right tabular-nums">{euro(l.unit_ht)}</td>
                <td className="py-2 text-right tabular-nums">{String(l.tva).replace(".", ",")} %</td>
                <td className="py-2 text-right tabular-nums">{euro(Math.round(l.qty * l.unit_ht * 100) / 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="ml-auto mt-4 w-64 space-y-1">
          <div className="flex justify-between"><dt>Total HT</dt><dd className="tabular-nums">{euro(f.total_ht)}</dd></div>
          <div className="flex justify-between"><dt>TVA</dt><dd className="tabular-nums">{euro(f.total_tva)}</dd></div>
          <div className="flex justify-between border-t-2 border-black pt-1 text-base font-bold"><dt>Total TTC</dt><dd className="tabular-nums">{euro(f.total_ttc)}</dd></div>
        </dl>
        {s?.tva_franchise ? <p className="mt-2 text-right text-xs">TVA non applicable, art. 293 B du CGI</p> : null}

        {f.notes ? <p className="mt-8 whitespace-pre-line">{f.notes}</p> : null}
        {f.kind === "devis" ? <p className="mt-8">Bon pour accord (date et signature) :</p> : null}
        {f.kind === "facture" && s?.iban ? (
          <p className="mt-8">
            Règlement par virement : IBAN {s.iban}
            {s.bic ? ` — BIC ${s.bic}` : ""}
          </p>
        ) : null}
        {f.kind === "facture" ? <p className="mt-6 text-xs text-stone-600">{s?.legal_footer}</p> : null}
      </div>
    </div>
  );
}
