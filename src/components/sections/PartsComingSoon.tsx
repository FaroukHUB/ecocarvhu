import Link from "next/link";
import { pages } from "@/content/pages";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { CoinsIcon, TruckIcon } from "@/components/ui/icons";

const STEPS = [
  { title: "Vous décrirez votre véhicule et la pièce", text: "Marque, modèle, motorisation, référence si vous l'avez." },
  { title: "La compatibilité sera vérifiée", text: "Disponibilité, compatibilité et état contrôlés avant toute proposition." },
  { title: "Vous recevrez une proposition", text: "Prix et modalités indiqués avant tout engagement." },
];

/**
 * Service pièces auto en préparation : illustration animée à la place du
 * formulaire. Aucune date annoncée.
 */
export function PartsComingSoon({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="bg-ink-grid overflow-hidden rounded-[2rem] text-white">
      <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
            <span aria-hidden="true" className="pulse-dot text-lime" />
            Service en préparation
          </p>
          <H className="mt-5 text-[1.8rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
            La vente de pièces auto d&apos;occasion arrive bientôt
          </H>
          <p className="mt-4 text-white/75">
            Nous préparons le service de pièces de réemploi. Les demandes de pièces ne sont pas encore ouvertes :
            le formulaire sera mis en ligne dès que le service sera prêt.
          </p>
          <p className="mt-3 text-white/75">
            En attendant, l&apos;enlèvement d&apos;épave gratuit et l&apos;étude de rachat de véhicule restent
            disponibles.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/enlevement-epave#demande" className="btn btn-lime">
              <TruckIcon className="h-5 w-5" />
              Demander un enlèvement
            </Link>
            <Link href={pages.rachat.path} className="btn btn-glass">
              <CoinsIcon className="h-5 w-5 text-lime" />
              Étude de rachat
            </Link>
          </div>
          <div className="mt-7">
            <PhoneBig placement="pieces-bientot" size="md" caption="Une question ? Appelez" />
          </div>
        </div>

        <div>
          {/* Illustration : engrenages qui tournent et barre de progression */}
          <svg viewBox="0 0 320 170" className="mx-auto h-auto w-full max-w-sm" aria-hidden="true" fill="none">
            <g className="gear-spin" style={{ transformOrigin: "110px 85px" }}>
              <circle cx="110" cy="85" r="42" stroke="#25d366" strokeWidth="10" strokeDasharray="14 8.4" />
              <circle cx="110" cy="85" r="30" fill="#0f2a1d" stroke="#25d366" strokeWidth="3" />
              <circle cx="110" cy="85" r="10" fill="#25d366" />
            </g>
            <g className="gear-spin-reverse" style={{ transformOrigin: "190px 64px" }}>
              <circle cx="190" cy="64" r="28" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="8" strokeDasharray="10 6.6" />
              <circle cx="190" cy="64" r="19" fill="#0f2a1d" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" />
              <circle cx="190" cy="64" r="6" fill="#ffffff" fillOpacity="0.7" />
            </g>
            <rect x="40" y="148" width="240" height="8" rx="4" fill="#ffffff" fillOpacity="0.1" />
            <rect className="progress-bar" x="40" y="148" width="160" height="8" rx="4" fill="#25d366" />
          </svg>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Comment fonctionnera le service</p>
          <ol className="mt-3 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="mt-0.5 block text-sm text-white/65">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
