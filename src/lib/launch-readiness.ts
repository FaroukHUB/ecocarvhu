import { company } from "@/config/company";
import { resolveSiteEnv, resolveSiteUrl } from "@/config/env";
import { pages } from "@/content/pages";
import { sources } from "@/content/regulatory";
import { resolveTransport } from "@/lib/forms/transport";
import { publishedSectors } from "@/lib/publication";

type EnvSource = Record<string, string | undefined>;

/**
 * Liste des points qui bloquent une publication en production.
 * `npm run check:launch` échoue tant que cette liste n'est pas vide.
 */
export function launchBlockers(env: EnvSource = process.env): string[] {
  const b: string[] = [];
  if (resolveSiteEnv(env) !== "production") b.push("SITE_ENV doit valoir « production » sur l'environnement publié.");
  if (!resolveSiteUrl({ ...env, SITE_ENV: "production" })) b.push("NEXT_PUBLIC_SITE_URL : domaine définitif en https manquant.");
  if (!["resend", "brevo"].includes(resolveTransport(env).kind))
    b.push("Transmission des formulaires non configurée (FORM_TRANSPORT=brevo ou resend + variables).");

  if (company.brandIsProvisional) b.push("Marque encore provisoire : confirmer le nom EcocarVHU.");
  if (!company.legalName || !company.siret || !company.registeredAddress)
    b.push("Identité légale incomplète (raison sociale, SIRET, siège).");
  if (!company.publicationDirector) b.push("Directeur de la publication non renseigné.");
  if (!company.host) b.push("Hébergeur non renseigné (mentions légales).");
  if (!company.email) b.push("E-mail de contact non renseigné.");

  // Plusieurs centres VHU agréés selon le secteur : aucun centre nommé sur le site
  // (décision du porteur de projet, 24/11/2026). Rien à exiger ici.
  if (company.vhu.situation === "to-define") b.push("Situation VHU de l'entreprise à préciser.");

  for (const key of ["mentions", "confidentialite", "conditions"] as const) {
    if (pages[key].draft) b.push(`Page « ${pages[key].label} » encore en brouillon.`);
  }
  for (const s of Object.values(sources)) {
    if (!s.checkedOn) b.push(`Source officielle à relire en direct : ${s.label}.`);
  }
  if (publishedSectors().length === 0)
    b.push("Aucun secteur publié : confirmer au moins la zone régionale ou une ville (4 statuts).");
  return b;
}
