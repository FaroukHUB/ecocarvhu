import { resolveTransport } from "@/lib/forms/transport";
import { activite } from "./search";

export interface ProspectLike {
  name: string;
  city: string | null;
  naf: string | null;
  dirigeant: string | null;
  contact_name: string | null;
}

/** Remplit un modèle : {entreprise}, {ville}, {dirigeant}, {accroche}. */
export function fillProspect(text: string, p: ProspectLike): string {
  const who = (p.contact_name || p.dirigeant || "").trim();
  return text
    .replaceAll("{entreprise}", p.name)
    .replaceAll("{ville}", p.city || "votre secteur")
    .replaceAll("{dirigeant}", who ? ` ${who}` : "")
    .replaceAll("{accroche}", activite(p.naf)?.accroche ?? "fait partie des entreprises de la région qui peuvent avoir des véhicules hors d'usage");
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Envoi d'un e-mail de prospection par Brevo, avec lien de désinscription. */
export async function sendProspectEmail(input: { to: string; subject: string; body: string; unsubscribeUrl: string }) {
  const config = resolveTransport();
  if (config.kind !== "brevo") return { ok: false as const, error: "L'envoi d'e-mails n'est pas encore activé." };
  const footer = `\n\n—\nVous recevez ce message car votre entreprise exerce une activité liée aux véhicules en Provence-Alpes-Côte d'Azur.\nPour ne plus recevoir nos messages : ${input.unsubscribeUrl}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#1b1f23">${esc(input.body).replace(/\n/g, "<br>")}</div>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#6b7280;margin-top:28px">Vous recevez ce message car votre entreprise exerce une activité liée aux véhicules en Provence-Alpes-Côte d'Azur.<br><a href="${input.unsubscribeUrl}" style="color:#6b7280">Ne plus recevoir nos messages</a></p>`;
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": config.apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { email: config.from, name: config.fromName },
        to: [{ email: input.to }],
        replyTo: { email: config.to[0] ?? config.from },
        subject: input.subject,
        textContent: input.body + footer,
        htmlContent: html,
        headers: {
          "List-Unsubscribe": `<${input.unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return { ok: false as const, error: `Brevo ${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}` };
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
  }
}
