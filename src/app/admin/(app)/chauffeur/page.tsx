import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { currentTime, parisDay, placeLabel, vehicleLabel, type Demande } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Ma tournée" };

export default function ChauffeurPage({ searchParams }: PageProps<"/admin/chauffeur">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Tournee searchParams={searchParams} />
    </Suspense>
  );
}

async function Tournee({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { fait } = await searchParams;
  const { supabase, profile } = await requireUser();
  let q = supabase
    .from("demandes")
    .select("*")
    .not("chauffeur_id", "is", null)
    .in("status", ["nouvelle", "a_rappeler", "rdv_fixe"])
    .order("rdv_at", { ascending: true, nullsFirst: false });
  if (profile.role === "chauffeur") q = q.eq("chauffeur_id", profile.id);
  const { data } = await q.returns<Demande[]>();
  const missions = data ?? [];
  const today = parisDay(new Date(currentTime()));
  const groups = [
    { title: "Aujourd'hui", emoji: "📍", list: missions.filter((d) => d.rdv_at && parisDay(d.rdv_at) <= today) },
    { title: "Prochains jours", emoji: "📅", list: missions.filter((d) => d.rdv_at && parisDay(d.rdv_at) > today) },
    { title: "Date à confirmer", emoji: "❔", list: missions.filter((d) => !d.rdv_at) },
  ];
  const first = (profile.full_name || "").split(" ")[0];

  return (
    <>
      <PageTitle
        emoji="🚚"
        title={profile.role === "chauffeur" ? `Bonjour${first ? ` ${first}` : ""} !` : "Espace chauffeur"}
        subtitle={profile.role === "chauffeur" ? "Vos enlèvements à faire." : "Aperçu : toutes les missions attribuées à un chauffeur."}
      />
      {fait ? <p className="mb-5 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-900">🎉 Enlèvement validé. Merci !</p> : null}
      {missions.length ? (
        groups.map((g) =>
          g.list.length ? (
            <section key={g.title} className="mb-6">
              <h2 className="mb-3 text-lg font-bold">
                {g.emoji} {g.title} ({g.list.length})
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {g.list.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/admin/chauffeur/${d.id}`}
                      className="block rounded-3xl border border-line bg-white p-5 shadow-sm transition active:scale-[0.99]"
                    >
                      {d.rdv_at ? (
                        <span className="inline-block rounded-xl bg-orange-100 px-3 py-1 font-bold text-orange-900">
                          🕐{" "}
                          {new Date(d.rdv_at).toLocaleString("fr-FR", {
                            timeZone: "Europe/Paris",
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      ) : null}
                      <span className="mt-2 block text-lg font-bold">{d.contact_name || "Sans nom"}</span>
                      <span className="block text-ink-3">📍 {[d.address, placeLabel(d)].filter(Boolean).join(", ")}</span>
                      <span className="block text-ink-3">🚗 {vehicleLabel(d)}</span>
                      <span className="mt-3 block text-center font-bold text-brand">Ouvrir la mission →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null,
        )
      ) : (
        <p className="rounded-3xl bg-white p-8 text-center text-lg text-muted">Aucun enlèvement prévu pour le moment. 😊</p>
      )}
    </>
  );
}
