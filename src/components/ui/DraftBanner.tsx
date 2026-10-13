import { Container } from "./primitives";

/** Bandeau des brouillons (visible uniquement hors production). */
export function DraftBanner({ missing, label = "Brouillon non publié" }: { missing: string[]; label?: string }) {
  return (
    <div className="border-b-2 border-signal bg-warn-soft" role="note">
      <Container className="py-3 text-sm">
        <details>
          <summary className="cursor-pointer font-bold">
            {label} — page non indexée, absente du sitemap et non liée en production.
          </summary>
          {missing.length ? (
            <>
              <p className="mt-2 font-semibold">Avant publication :</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {missing.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </>
          ) : null}
        </details>
      </Container>
    </div>
  );
}
