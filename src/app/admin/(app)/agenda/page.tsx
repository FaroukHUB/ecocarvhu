import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { currentTime, parisDay, placeLabel, vehicleLabel, type Demande } from "@/lib/admin/demandes";

export const metadata: Metadata = { title: "Agenda" };

export default function AgendaPage({ searchParams }: PageProps<"/admin/agenda">) {
  return (
    <>
      <PageTitle emoji="📅" title="Agenda des enlèvements" subtitle="Les rendez-vous de la semaine, jour par jour." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Week searchParams={searchParams} />
      </Suspense>
    </>
  );
}

/** Lundi (AAAA-MM-JJ) de la semaine d'une date. */
function monday(day: string): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

async function Week({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const today = parisDay(new Date(currentTime()));
  const start = monday(typeof sp.semaine === "string" && /^\d{4}-\d{2}-\d{2}$/.test(sp.semaine) ? sp.semaine : today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const { supabase } = await requireUser("admin");

  const [{ data: rdv }, { data: todo }, { data: chauffeurs }] = await Promise.all([
    supabase
      .from("demandes")
      .select("*")
      .gte("rdv_at", `${addDays(start, -1)}T00:00:00Z`)
      .lte("rdv_at", `${addDays(start, 8)}T00:00:00Z`)
      .order("rdv_at")
      .returns<Demande[]>(),
    supabase
      .from("demandes")
      .select("*")
      .is("rdv_at", null)
      .in("status", ["nouvelle", "a_rappeler", "rdv_fixe"])
      .in("form_type", ["enlevement", "rachat"])
      .order("created_at")
      .returns<Demande[]>(),
    supabase.from("profiles").select("id, full_name, email"),
  ]);
  const who = new Map((chauffeurs ?? []).map((c) => [c.id, c.full_name || c.email]));
  const byDay = new Map<string, Demande[]>();
  for (const d of rdv ?? []) {
    const k = parisDay(d.rdv_at!);
    byDay.set(k, [...(byDay.get(k) ?? []), d]);
  }
  const label = (day: string) =>
    new Date(`${day}T12:00:00Z`).toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });
  const route = (list: Demande[]) => {
    const stops = list.map((d) => [d.address, d.postal_code, d.city].filter(Boolean).join(" ")).filter(Boolean);
    if (!stops.length) return null;
    const dest = encodeURIComponent(stops[stops.length - 1]);
    const way = stops.slice(0, -1).map(encodeURIComponent).join("|");
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}${way ? `&waypoints=${way}` : ""}`;
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Link href={`/admin/agenda?semaine=${addDays(start, -7)}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
          ← Semaine précédente
        </Link>
        <Link href="/admin/agenda" className="rounded-2xl bg-ink px-4 py-2 font-semibold text-white">
          Cette semaine
        </Link>
        <Link href={`/admin/agenda?semaine=${addDays(start, 7)}`} className="rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
          Semaine suivante →
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {days.map((day) => {
          const list = byDay.get(day) ?? [];
          const itin = route(list);
          return (
            <section
              key={day}
              className={`rounded-3xl border bg-white p-5 shadow-sm ${day === today ? "border-brand-bright ring-2 ring-brand-bright/40" : "border-line"}`}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold capitalize">
                  {day === today ? "📍 Aujourd'hui · " : ""}
                  {label(day)}
                </h2>
                {itin ? (
                  <a href={itin} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-900">
                    🗺️ Itinéraire du jour
                  </a>
                ) : null}
              </div>
              {list.length ? (
                <ul className="space-y-2">
                  {list.map((d) => (
                    <li key={d.id}>
                      <Link href={`/admin/demandes/${d.id}`} className="flex items-start gap-3 rounded-2xl bg-surface p-3 hover:bg-sky-50">
                        <span className="rounded-xl bg-white px-2.5 py-1 font-bold tabular-nums">
                          {new Date(d.rdv_at!).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong>{d.contact_name || "Sans nom"}</strong> · {placeLabel(d)}
                          <span className="block text-sm text-muted">
                            {vehicleLabel(d)} · {d.chauffeur_id ? `🚚 ${who.get(d.chauffeur_id) ?? "chauffeur"}` : "⚠️ pas de chauffeur"}
                          </span>
                        </span>
                        <StatusBadge status={d.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Aucun rendez-vous.</p>
              )}
            </section>
          );
        })}
      </div>

      <Card className="mt-6" title="À planifier" emoji="🗓️">
        {todo?.length ? (
          <ul className="divide-y divide-line">
            {todo.map((d) => (
              <li key={d.id}>
                <Link href={`/admin/demandes/${d.id}`} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span>
                    <strong>{d.contact_name || "Sans nom"}</strong> · {placeLabel(d)}
                    <span className="block text-sm text-muted">{vehicleLabel(d)} · ouvrez la fiche pour fixer la date</span>
                  </span>
                  <StatusBadge status={d.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Tout est planifié. 👍</p>
        )}
      </Card>
    </>
  );
}
