import Link from "next/link";
import { company } from "@/config/company";
import { ShieldIcon } from "@/components/ui/icons";

/**
 * Encart "centre VHU partenaire". Les informations non fournies sont affichées
 * comme "à venir" : elles ne sont jamais inventées. Le rôle d'EcocarVHU et
 * celui du centre sont distingués.
 */
export function PartnerCentreCard({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { vhu } = company;
  if (vhu.situation !== "partner-centre" || !vhu.partner.declared?.value) return null;
  const p = vhu.partner;

  const rows: { label: string; value: string | null }[] = [
    { label: "Centre partenaire", value: p.name },
    { label: "N° d'agrément", value: p.agrementNumber },
    { label: "Délivré par", value: p.issuingAuthority },
  ];

  // Seules les informations réellement fournies sont affichées (pas de série de « à venir »).
  const known = rows.filter((r): r is { label: string; value: string } => Boolean(r.value));

  if (variant === "compact") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <p className="flex items-center gap-2 font-bold text-white">
          <ShieldIcon className="h-5 w-5 text-brand-bright" />
          Partenariat avec un centre VHU agréé
        </p>
        <p className="mt-1.5 text-white/75">
          N° d&apos;agrément : {p.agrementNumber ?? <span className="font-semibold text-lime">à venir</span>}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="partner-centre-title"
      className="relative overflow-hidden rounded-3xl bg-brand-glow text-white"
    >
      <div className="flex flex-col gap-7 p-7 sm:p-10 md:flex-row md:items-center">
        <div className="float draw flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-lime text-ink shadow-[0_20px_50px_-15px_rgb(159_232_112/0.7)]">
          <ShieldIcon className="h-10 w-10" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">Centre VHU partenaire</p>
          <h2 id="partner-centre-title" className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Partenariat avec un centre VHU agréé
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Les véhicules hors d&apos;usage sont remis à un centre VHU partenaire, seul habilité à les
            dépolluer, les démonter et délivrer le certificat de destruction. {company.brandName} reçoit
            votre demande, la qualifie et organise l&apos;enlèvement.
          </p>
          {known.length ? (
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              {known.map((r) => (
                <div key={r.label} className="border-t border-white/15 pt-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-white/60">{r.label}</dt>
                  <dd className="mt-1 font-bold">{r.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="mt-5 text-sm text-white/60">
            {known.length < rows.length
              ? "La raison sociale et le numéro d'agrément du centre partenaire seront publiés ici dès leur communication. "
              : null}
            <Link href="/centre-vhu" className="font-semibold text-lime underline underline-offset-2">
              Comprendre la prise en charge
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
