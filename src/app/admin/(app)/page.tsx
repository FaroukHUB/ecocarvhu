import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LiveClock } from "@/components/admin/LiveClock";
import { BigButton, Card, PageTitle, StatusBadge } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import {ago, FORM_INFO, formatDate, placeLabel, STATUS_INFO, STATUSES, vehicleLabel, type Demande} from "@/lib/admin/demandes";
import { currentTime } from "@/lib/admin/now";

export const metadata: Metadata = { title: "Ma journée" };

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Home />
    </Suspense>
  );
}

async function Home() {
  const { supabase } = await requireUser("admin");
  const { data } = await supabase
    .from("demandes")
    .select("*")
    .not("status", "in", "(terminee,perdue)")
    .order("created_at", { ascending: false })
    .limit(300)
    .returns<Demande[]>();
  const open = data ?? [];
  const now = (await currentTime());
  const todayKey = new Date().toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });
  const dayOf = (iso: string) => new Date(iso).toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });

  const counts = Object.fromEntries(STATUSES.map((s) => [s, open.filter((d) => d.status === s).length])) as Record<string, number>;
  const late = open.filter((d) => d.status === "nouvelle" && now - new Date(d.created_at).getTime() > 2 * 3600_000);
  const today = open
    .filter((d) => d.rdv_at && dayOf(d.rdv_at) === todayKey)
    .sort((a, b) => a.rdv_at!.localeCompare(b.rdv_at!));
  const rdvMissing = open.filter((d) => d.status === "rdv_fixe" && !d.rdv_at);

  return (
    <>
      <PageTitle
        emoji="☀️"
        title="Salam la team EcocarVHU !"
        subtitle={<LiveClock initial={now} />}
        action={<BigButton href="/admin/demandes/nouvelle" emoji="➕">Ajouter une demande</BigButton>}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(["nouvelle", "a_rappeler", "rdv_fixe", "enlevee"] as const).map((s) => (
          <Link key={s} href={`/admin/demandes?statut=${s}`} className={`rounded-3xl p-5 ring-1 transition hover:-translate-y-0.5 ${STATUS_INFO[s].tone}`}>
            <span className="text-3xl" aria-hidden="true">
              {STATUS_INFO[s].emoji}
            </span>
            <span className="mt-2 block text-4xl font-bold tabular-nums">{counts[s]}</span>
            <span className="font-semibold">{STATUS_INFO[s].label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="À faire en priorité" emoji="⏰">
          {late.length || rdvMissing.length ? (
            <ul className="space-y-2">
              {late.map((d) => (
                <li key={d.id}>
                  <Link href={`/admin/demandes/${d.id}`} className="flex items-center justify-between gap-3 rounded-2xl bg-red-50 p-3 hover:bg-red-100">
                    <span>
                      <strong>{d.contact_name || "Sans nom"}</strong> · {placeLabel(d)}
                      <span className="block text-sm text-red-800">Pas encore traitée, reçue {ago(d.created_at, now)}</span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
              {rdvMissing.map((d) => (
                <li key={d.id}>
                  <Link href={`/admin/demandes/${d.id}`} className="flex items-center justify-between gap-3 rounded-2xl bg-amber-50 p-3 hover:bg-amber-100">
                    <span>
                      <strong>{d.contact_name || "Sans nom"}</strong> · {placeLabel(d)}
                      <span className="block text-sm text-amber-900">« RDV fixé » mais aucune date indiquée</span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-emerald-50 p-4 text-emerald-900">🎉 Rien en retard. Bravo !</p>
          )}
        </Card>

        <Card title="Rendez-vous du jour" emoji="📅">
          {today.length ? (
            <ul className="space-y-2">
              {today.map((d) => (
                <li key={d.id}>
                  <Link href={`/admin/demandes/${d.id}`} className="flex items-center gap-3 rounded-2xl bg-sky-50 p-3 hover:bg-sky-100">
                    <span className="rounded-xl bg-white px-2.5 py-1 font-bold tabular-nums">
                      {new Date(d.rdv_at!).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span>
                      <strong>{d.contact_name || "Sans nom"}</strong> · {placeLabel(d)}
                      <span className="block text-sm text-muted">{vehicleLabel(d)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-surface p-4 text-muted">Aucun rendez-vous aujourd&apos;hui.</p>
          )}
        </Card>
      </div>

      <Card className="mt-6" title="Dernières demandes" emoji="📥">
        {open.length ? (
          <ul className="divide-y divide-line">
            {open.slice(0, 6).map((d) => (
              <li key={d.id}>
                <Link href={`/admin/demandes/${d.id}`} className="flex flex-wrap items-center justify-between gap-2 py-3 hover:bg-surface">
                  <span>
                    <span aria-hidden="true">{FORM_INFO[d.form_type]?.emoji ?? "📄"}</span> <strong>{d.contact_name || "Sans nom"}</strong> ·{" "}
                    {placeLabel(d)}
                    <span className="block text-sm text-muted">
                      {formatDate(d.created_at)} · {vehicleLabel(d)}
                    </span>
                  </span>
                  <StatusBadge status={d.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Rien en cours pour l&apos;instant. Les nouvelles demandes du site arrivent ici toutes seules.</p>
        )}
      </Card>
    </>
  );
}
