import { resolveSiteEnv } from "@/config/env";
import type { CheckedFile } from "./files";

/**
 * Adaptateur de transmission des demandes.
 *
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
  if (kind === "resend") {
    const apiKey = env.RESEND_API_KEY?.trim();
    const to = (env.FORM_TO_EMAIL ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const from = env.FORM_FROM_EMAIL?.trim();
    const missing = [
      !apiKey && "RESEND_API_KEY",
      to.length === 0 && "FORM_TO_EMAIL",
      !from && "FORM_FROM_EMAIL",
    ].filter(Boolean);
    if (missing.length) {
      return { kind: "unconfigured", reason: `Variables manquantes : ${missing.join(", ")}.` };
    }
    return { kind: "resend", apiKey: apiKey!, to, from: from! };
  }
  return { kind: "unconfigured", reason: "FORM_TRANSPORT n'est pas défini (valeurs : resend, demo)." };
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
