import { handoverDocuments, sources, specialCases } from "@/content/regulatory";
import { DocIcon } from "@/components/ui/icons";

/** Documents à préparer + cas particuliers, avec la source officielle. */
export function DocumentsChecklist({ showCases = true, headingLevel = 3 }: { showCases?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-paper p-6 ring-1 ring-line">
        <H className="flex items-center gap-2 text-lg font-bold">
          <DocIcon className="h-6 w-6 text-brand" /> À préparer pour le rendez-vous
        </H>
        <ul className="mt-4 space-y-4">
          {handoverDocuments.map((d) => (
            <li key={d.title} className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="mt-0.5 text-[0.95rem] text-ink-3">{d.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          Ne joignez aucune copie de ces documents au formulaire en ligne : ils sont vérifiés lors du
          rendez-vous.
        </p>
      </div>
      {showCases ? (
        <div className="rounded-2xl bg-paper p-6 ring-1 ring-line">
          <H className="text-lg font-bold">Cas particuliers</H>
          <dl className="mt-4 space-y-4">
            {specialCases.map((c) => (
              <div key={c.situation}>
                <dt className="font-semibold">{c.situation}</dt>
                <dd className="mt-0.5 text-[0.95rem] text-ink-3">{c.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      <p className="text-sm text-muted lg:col-span-2">
        Source :{" "}
        <a href={sources.f1468.url} className="underline underline-offset-2 hover:text-brand" rel="noopener">
          {sources.f1468.label}
        </a>
        . Les règles peuvent évoluer : la fiche officielle fait foi.
      </p>
    </div>
  );
}
