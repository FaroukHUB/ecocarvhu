"use client";

import Link from "next/link";
import { useState } from "react";
import { VEHICLE_CHECK_KEY } from "@/lib/forms/options";

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
  options: { value: string; label: string }[];
}[] = [
  { key: "wheels", label: "Le véhicule a-t-il ses quatre roues ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }] },
  { key: "keys", label: "Avez-vous les clés ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "ne-sait-pas", label: "Je ne sais pas" }] },
  { key: "movable", label: "Peut-il rouler ou être poussé ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }, { value: "ne-sait-pas", label: "Je ne sais pas" }] },
  { key: "access", label: "Où se trouve-t-il ?", options: [{ value: "simple", label: "Rue / parking ouvert" }, { value: "sous-sol", label: "Sous-sol / box" }, { value: "difficile", label: "Accès difficile" }] },
  { key: "registration", label: "Avez-vous la carte grise ?", options: [{ value: "oui", label: "Oui" }, { value: "non", label: "Non" }] },
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
  const items = advice(state);
  const answered = Object.keys(state).length;

  const update = (key: keyof State, value: string) => {
    const next = { ...state, [key]: value } as State;
    setState(next);
    try {
      sessionStorage.setItem(VEHICLE_CHECK_KEY, JSON.stringify(next));
    } catch {
      /* stockage indisponible : sans conséquence */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <form className="space-y-5 rounded-2xl bg-paper p-5 ring-1 ring-line sm:p-6" onSubmit={(e) => e.preventDefault()}>
        {QUESTIONS.map((q) => (
          <fieldset key={q.key}>
            <legend className="font-bold">{q.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
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
                      className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border-2 border-line bg-paper px-3.5 text-[0.95rem] font-semibold peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-brand-deep peer-focus-visible:outline-3 peer-focus-visible:outline-signal"
                    >
                      {o.label}
                    </label>
                  </span>
                );
              })}
            </div>
          </fieldset>
        ))}
      </form>
      <div className="flex flex-col rounded-2xl bg-ink p-5 text-white sm:p-6" aria-live="polite">
        <p className="text-lg font-bold">À signaler avant le déplacement</p>
        {items.length === 0 ? (
          <p className="mt-3 text-white/75">
            Répondez aux questions : les points utiles pour préparer l&apos;enlèvement s&apos;affichent ici.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((it) => (
              <li key={it.text} className="flex gap-3 text-[0.95rem] leading-relaxed">
                <span
                  aria-hidden="true"
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${it.tone === "warn" ? "bg-signal" : "bg-brand-bright"}`}
                />
                <span>
                  <span className="sr-only">{it.tone === "warn" ? "À signaler : " : "Bon à savoir : "}</span>
                  {it.text}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-6">
          <Link
            href="/enlevement-epave#demande"
            className="inline-flex min-h-12 items-center rounded-xl bg-brand px-5 font-bold text-white shadow-[0_4px_0_var(--color-brand-deep)] hover:bg-brand-dark"
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
