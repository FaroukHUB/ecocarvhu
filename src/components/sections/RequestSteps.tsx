const DEFAULT_STEPS = [
  {
    title: "Vous décrivez",
    text: "Le véhicule, son état, son accès et vos documents. Les photos sont facultatives mais utiles.",
  },
  {
    title: "L'équipe vérifie",
    text: "Faisabilité, matériel à prévoir, situation administrative. Rien n'est engagé à ce stade.",
  },
  {
    title: "Les conditions sont confirmées",
    text: "Vous recevez les conditions et une proposition de rendez-vous. Vous acceptez ou non.",
  },
  {
    title: "Enlèvement et suivi",
    text: "Documents remis, véhicule chargé et conduit au centre VHU partenaire, qui délivre le certificat de destruction.",
  },
];

export function RequestSteps({
  steps = DEFAULT_STEPS,
  tone = "light",
}: {
  steps?: { title: string; text: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`relative rounded-2xl p-5 ${
            tone === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-paper ring-1 ring-line"
          }`}
        >
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-lg font-extrabold text-white shadow-[3px_3px_0_var(--color-brand-deep)]"
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
          <p className={`mt-1.5 text-[0.95rem] leading-relaxed ${tone === "dark" ? "text-white/75" : "text-ink-3"}`}>
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
