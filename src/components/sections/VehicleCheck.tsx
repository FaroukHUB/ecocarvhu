"use client";

import Link from "next/link";
import { useState } from "react";
import { VEHICLE_CHECK_KEY } from "@/lib/forms/options";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Module pratique : quelques questions sur l'état et l'accès du véhicule,
 * avec les points à signaler avant le déplacement. Les réponses sont
 * reprises dans le formulaire d'enlèvement (sessionStorage, rien n'est envoyé).
 */


type Answer = "oui" | "non" | "ne-sait-pas";
type Access = "simple" | "sous-sol" | "difficile";

interface State {
  wheels?: "oui" | "non";
  keys?: Answer;
  movable?: Answer;
  access?: Access;
  registration?: "oui" | "non";
}

const QUESTIONS: {
  key: keyof State;
  label: string;
  short: string;
  options: { value: string; label: string }[];
}[] = [
  { key: "wheels", short: "Roues", label: "Le véhicule a-t-il ses quatre roues ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }] },
  { key: "keys", short: "Clés", label: "Avez-vous les clés ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "ne-sait-pas", label: "Je ne sais pas" }] },
  { key: "movable", short: "Déplaçable", label: "Peut-il rouler ou être poussé ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "ne-sait-pas", label: "Je ne sais pas" }] },
  { key: "access", short: "Emplacement", label: "Où se trouve-t-il ?", options: [{ value: "simple", label: "Rue / parking ouvert" }, { value: "sous-sol", label: "Sous-sol / box" }, { value: "difficile", label: "Accès difficile" }] },
  { key: "registration", short: "Carte grise", label: "Avez-vous la carte grise ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }] },
];

function advice(s: State): { tone: "ok" | "warn"; text: string }[] {
  const out: { tone: "ok" | "warn"; text: string }[] = [];
  if (s.wheels === "non") out.push({ tone: "warn", text: "Sans roues, un chargement spécifique est nécessaire : l'équipe doit le savoir avant de venir." });
  if (s.wheels === "oui") out.push({ tone: "ok", text: "Roues présentes : précisez si les pneus sont à plat." });
  if (s.keys === "non" || s.keys === "ne-sait-pas") out.push({ tone: "warn", text: "Sans clés, la direction ou la boîte peuvent rester bloquées : à signaler dans la demande." });
  if (s.movable === "non") out.push({ tone: "warn", text: "Véhicule bloqué : indiquez la distance jusqu'à la rue et ajoutez une photo de l'emplacement." });
  if (s.access === "sous-sol") out.push({ tone: "warn", text: "Sous-sol ou box : notez la hauteur maximale affichée à l'entrée et le niveau." });
  if (s.access === "difficile") out.push({ tone: "warn", text: "Accès difficile : une photo du passage (portail, pente, rue étroite) évite un déplacement inutile." });
  if (s.access === "simple") out.push({ tone: "ok", text: "Accès simple : indiquez seulement si un badge ou un code est nécessaire." });
  if (s.registration === "non") out.push({ tone: "warn", text: "Sans carte grise, d'autres justificatifs sont nécessaires (déclaration de perte ou de vol…). Signalez-le, ce sera examiné." });
  if (s.registration === "oui") out.push({ tone: "ok", text: "Carte grise disponible : préparez aussi un certificat de situation administrative de moins de 15 jours." });
  return out;
}

export function VehicleCheck() {
  const [state, setState] = useState<State>({});
  const [lastKey, setLastKey] = useState<keyof State | null>(null);
  const items = advice(state);
  const answered = Object.keys(state).length;
  const total = QUESTIONS.length;

  const update = (key: keyof State, value: string) => {
    const next = { ...state, [key]: value } as State;
    setState(next);
    setLastKey(key);
    try {
      sessionStorage.setItem(VEHICLE_CHECK_KEY, JSON.stringify(next));
    } catch {
      /* stockage indisponible : sans conséquence */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form
        className="space-y-4 rounded-3xl bg-paper p-5 shadow-xl ring-1 ring-black/5 sm:p-7"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <div className="flex items-center justify-between text-sm font-bold">
            <span>Votre progression</span>
            <span className="text-brand">
              {answered} / {total}
            </span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-mint-2" aria-hidden="true">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-bright transition-[width] duration-500"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
        </div>
        {QUESTIONS.map((q, i) => {
          const done = Boolean(state[q.key]);
          return (
            <fieldset
              key={q.key}
              className={`rounded-2xl border-2 p-4 transition-colors ${done ? "border-brand/40 bg-mint" : "border-line bg-paper"}`}
            >
              <legend className="sr-only">{q.label}</legend>
              <p aria-hidden="true" className="flex items-center gap-3 font-bold">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    done ? "bg-brand text-white" : "bg-sun-2 text-[#6b4f00]"
                  }`}
                >
                  {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                </span>
                {q.label}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const id = `vc-${q.key}-${o.value}`;
                  return (
                    <span key={o.value}>
                      <input
                        type="radio"
                        id={id}
                        name={`vc-${q.key}`}
                        value={o.value}
                        checked={state[q.key] === o.value}
                        onChange={() => update(q.key, o.value)}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={id}
                        className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border-2 border-line bg-paper px-4 text-[0.95rem] font-semibold transition hover:border-brand/50 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-signal"
                      >
                        {o.label}
                      </label>
                    </span>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </form>

      <div className="flex flex-col gap-5 rounded-3xl bg-ink p-5 text-white shadow-xl sm:p-7 lg:sticky lg:top-28 lg:self-start">
        <div aria-live="polite">
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-bright text-ink">
              <CheckIcon className="h-4 w-4" />
            </span>
            Vos réponses
          </p>
          {answered === 0 ? (
            <p className="mt-3 text-white/75">
              Cliquez sur une réponse à gauche : elle s&apos;affiche ici et sera reprise dans votre demande.
            </p>
          ) : (
            <>
              <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {QUESTIONS.filter((q) => state[q.key]).map((q) => (
                  <div
                    key={q.key}
                    className={`flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3.5 py-2.5 ring-1 ring-white/10 ${
                      lastKey === q.key ? "pop" : ""
                    }`}
                  >
                    <dt className="text-sm text-white/70">{q.short}</dt>
                    <dd className="text-right font-bold text-brand-bright">
                      {q.options.find((o) => o.value === state[q.key])?.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex items-center gap-2 rounded-xl bg-brand/30 px-3.5 py-2.5 text-sm font-semibold text-white">
                <CheckIcon className="h-4 w-4 shrink-0 text-brand-bright" />
                Réponses enregistrées : elles seront reprises automatiquement dans votre demande d&apos;enlèvement.
              </p>
            </>
          )}
        </div>

        <div aria-live="polite">
          <p className="text-lg font-extrabold">À signaler avant le déplacement</p>
          {items.length === 0 ? (
            <p className="mt-2 text-white/75">Les points utiles pour préparer l&apos;enlèvement s&apos;affichent ici.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {items.map((it) => (
                <li
                  key={it.text}
                  className={`flex gap-3 rounded-xl px-3.5 py-3 text-[0.95rem] leading-relaxed ${
                    it.tone === "warn" ? "bg-signal/15 ring-1 ring-signal/40" : "bg-white/5"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${it.tone === "warn" ? "bg-signal" : "bg-brand-bright"}`}
                  />
                  <span>
                    <span className="sr-only">{it.tone === "warn" ? "À signaler : " : "Bon à savoir : "}</span>
                    {it.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href="/enlevement-epave#demande"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-center font-bold text-white shadow-[0_4px_0_var(--color-brand-deep)] hover:bg-brand-dark sm:w-auto"
          >
            {answered > 0 ? "Continuer ma demande avec ces réponses" : "Faire une demande d'enlèvement"}
          </Link>
          <p className="mt-3 text-xs text-white/60">
            Ces indications ne valent pas confirmation : la faisabilité est vérifiée par l&apos;équipe.
          </p>
        </div>
      </div>
    </div>
  );
}
