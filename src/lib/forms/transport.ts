import { resolveSiteEnv } from "@/config/env";
import type { CheckedFile } from "./files";

/**
 * Adaptateur de transmission des demandes.
 *
 * - `brevo` : envoi d'un e-mail transactionnel via l'API HTTP de Brevo (aucune dépendance).
 * - `resend` : envoi d'un e-mail via l'API HTTP de Resend (aucune dépendance).
 * - `demo` : uniquement en développement local ; rien n'est transmis et
 *   l'interface l'indique clairement.
 * - `unconfigured` : identifiants manquants ; la demande est refusée avec un
 *   message explicite (jamais de faux succès).
 *
 * Pour brancher plus tard un dashboard / CMS : ajouter un adaptateur qui
 * implémente `deliver()` et le sélectionner ici.
 */

export interface OutgoingMessage {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments: CheckedFile[];
}

export type TransportConfig =
  | { kind: "resend"; apiKey: string; to: string[]; from: string }
  | { kind: "brevo"; apiKey: string; to: string[]; from: string; fromName: string }
  | { kind: "demo" }
  | { kind: "unconfigured"; reason: string };

export type DeliveryResult =
  | { ok: true; mode: "sent"; providerId?: string }
  | { ok: true; mode: "demo" }
  | { ok: false; reason: "unconfigured" | "provider-error" | "network-error"; detail: string };

type EnvSource = Record<string, string | undefined>;

export function resolveTransport(env: EnvSource = process.env): TransportConfig {
  const kind = env.FORM_TRANSPORT?.trim().toLowerCase();
  if (kind === "demo") {
    if (resolveSiteEnv(env) === "development") return { kind: "demo" };
    return { kind: "unconfigured", reason: "Le mode démonstration est interdit hors développement local." };
  }
  if (kind === "resend" || kind === "brevo") {
    const keyName = kind === "brevo" ? "BREVO_API_KEY" : "RESEND_API_KEY";
    const apiKey = env[keyName]?.trim();
    const to = (env.FORM_TO_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const from = env.FORM_FROM_EMAIL?.trim();
    const missing = [
      !apiKey && keyName,
      to.length === 0 && "FORM_TO_EMAIL",
      !from && "FORM_FROM_EMAIL",
    ].filter(Boolean);
    if (missing.length) {
      return { kind: "unconfigured", reason: `Variables manquantes : ${missing.join(", ")}.` };
    }
    if (kind === "brevo") {
      // Brevo attend l'adresse seule : « Nom <adresse> » est découpé.
      const m = from!.match(/^(.*)<([^>]+)>$/);
      const fromName = env.FORM_FROM_NAME?.trim() || m?.[1].trim().replace(/^"|"$/g, "") || "EcocarVHU";
      return { kind: "brevo", apiKey: apiKey!, to, from: m ? m[2].trim() : from!, fromName };
    }
    return { kind: "resend", apiKey: apiKey!, to, from: from! };
  }
  return { kind: "unconfigured", reason: "FORM_TRANSPORT n'est pas défini (valeurs : brevo, resend, demo)." };
}

export async function deliver(
  message: OutgoingMessage,
  config: TransportConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<DeliveryResult> {
  if (config.kind === "unconfigured") {
    return { ok: false, reason: "unconfigured", detail: config.reason };
  }
  if (config.kind === "demo") {
    return { ok: true, mode: "demo" };
  }

  if (config.kind === "brevo") return deliverBrevo(message, config, fetchImpl);

  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        attachments: message.attachments.map((f) => ({
          filename: f.filename,
          content: Buffer.from(f.content).toString("base64"),
        })),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: "provider-error", detail: `HTTP ${res.status} ${body.slice(0, 300)}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, mode: "sent", providerId: data.id };
  } catch (err) {
    return { ok: false, reason: "network-error", detail: err instanceof Error ? err.message : String(err) };
  }
}

/** Extensions de pièces jointes acceptées par Brevo parmi les photos reçues (WebP et HEIC refusés). */
const BREVO_ATTACHMENT_EXT = new Set(["jpg", "jpeg", "png"]);

async function deliverBrevo(
  message: OutgoingMessage,
  config: Extract<TransportConfig, { kind: "brevo" }>,
  fetchImpl: typeof fetch,
): Promise<DeliveryResult> {
  const accepted = message.attachments.filter((f) => BREVO_ATTACHMENT_EXT.has(f.filename.split(".").pop() ?? ""));
  const skipped = message.attachments.length - accepted.length;
  // Une photo dans un format refusé par Brevo n'empêche pas l'envoi : elle est signalée dans l'e-mail.
  const note = skipped
    ? `\n\n${skipped} photo(s) au format WebP ou HEIC n'ont pas pu être jointes : demandez-les au client si nécessaire.`
    : "";
  try {
    const res = await fetchImpl("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": config.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: config.from, name: config.fromName },
        to: config.to.map((email) => ({ email })),
        subject: message.subject,
        textContent: message.text + note,
        htmlContent: message.html + (note ? `<p><strong>${note.trim()}</strong></p>` : ""),
        ...(message.replyTo ? { replyTo: { email: message.replyTo } } : {}),
        ...(accepted.length
          ? {
              attachment: accepted.map((f) => ({
                name: f.filename,
                content: Buffer.from(f.content).toString("base64"),
              })),
            }
          : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: "provider-error", detail: `HTTP ${res.status} ${body.slice(0, 300)}` };
    }
    const data = (await res.json().catch(() => ({}))) as { messageId?: string };
    return { ok: true, mode: "sent", providerId: data.messageId };
  } catch (err) {
    return { ok: false, reason: "network-error", detail: err instanceof Error ? err.message : String(err) };
  }
}
