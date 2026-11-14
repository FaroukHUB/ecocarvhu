import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { CENTRE_STEPS, formatDate, placeLabel, vehicleLabel, type Demande } from "@/lib/admin/demandes";
import { setCentreStep } from "../../actions";

export const metadata: Metadata = { title: "Suivi centre VHU" };

const TABS = [
  { key: "remettre", label: "♻️ À remettre au centre", test: (d: Demande) => !d.centre_remis_at },
  { key: "certificat", label: "📄 Certificat attendu", test: (d: Demande) => Boolean(d.centre_remis_at) && !d.cd_recu_at },
  { key: "envoyer", label: "📨 Certificat à envoyer", test: (d: Demande) => Boolean(d.cd_recu_at) && !d.cd_envoye_at },
  { key: "fini", label: "✅ Terminé", test: (d: Demande) => Boolean(d.cd_envoye_at) },
] as const;

export default function CentrePage({ searchParams }: PageProps<"/admin/centre-vhu">) {
  return (
    <>
      <PageTitle
        emoji="♻️"
        title="Suivi centre VHU"
        subtitle="Après l'enlèvement : remise au centre, certificat de destruction, envoi au client."
      />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Pipeline searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Pipeline({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { onglet } = await searchParams;
  const tab = TABS.find((t) => t.key === onglet) ?? TABS[0];
  const { supabase } = await requireUser("admin");
  const { data } = await supabase
    .from("demandes")
    .select("*")
    .in("status", ["enlevee", "terminee"])
    .order("enleve_at", { ascending: false, nullsFirst: false })
    .limit(300)
    .returns<Demande[]>();
  const all = data ?? [];
  const rows = all.filter(tab.test);

  return (
    <>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/centre-vhu?onglet=${t.key}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ring-1 ${t.key === tab.key ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
          >
            {t.label} ({all.filter(t.test).length})
          </Link>
        ))}
      </div>
      {rows.length ? (
        <ul className="mt-4 grid gap-3">
          {rows.map((d) => (
            <li key={d.id} className="rounded-3xl border border-line bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <Link href={`/admin/demandes/${d.id}`} className="hover:underline">
                  <strong>{vehicleLabel(d)}</strong>
                  {d.plate ? ` · ${d.plate}` : ""}
                  <span className="block text-sm text-muted">
                    {d.contact_name || "Sans nom"} · {placeLabel(d)}
                    {d.enleve_at ? ` · enlevé le ${formatDate(d.enleve_at, false)}` : ""}
                  </span>
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {CENTRE_STEPS.map((s) => {
                  const done = Boolean(d[s.key]);
                  return (
                    <form key={s.key} action={setCentreStep.bind(null, d.id, s.key, !done)}>
                      <button
                        type="submit"
                        className={`w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold ring-1 transition hover:-translate-y-0.5 ${
                          done ? "bg-emerald-50 text-emerald-900 ring-emerald-300" : "bg-surface ring-line"
                        }`}
                      >
                        <span aria-hidden="true">{done ? "✅" : s.emoji}</span> {s.label}
                        <span className="block text-xs font-normal">
                          {done ? `le ${formatDate(d[s.key]!, false)} · cliquer pour annuler` : "cliquer quand c'est fait"}
                        </span>
                      </button>
                    </form>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-3xl bg-white p-8 text-center text-muted">Rien dans cette étape.</p>
      )}
      <p className="mt-6 text-sm text-muted">
        Astuce : le certificat de destruction (photo ou PDF) se joint dans la fiche de la demande, rubrique « Documents ».
      </p>
    </>
  );
}
