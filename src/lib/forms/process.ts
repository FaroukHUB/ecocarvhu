import { company } from "@/config/company";
import { checkFiles, resolveFileLimits, type CheckedFile } from "./files";
import { labelFor } from "./options";
import {
  FIELD_LABELS,
  FILE_POLICY,
  FORM_TYPE_LABELS,
  metaSchema,
  schemasByType,
  type FormType,
} from "./schemas";
import { deliver, resolveTransport, type OutgoingMessage } from "./transport";

/**
 * Traitement complet d'une demande : anti-spam, validation, fichiers,
 * mise en forme et transmission. Fonction indépendante de Next.js pour être
 * testable et réutilisable (futur dashboard).
 */

export type ProcessResult =
  | { status: "accepted"; mode: "sent" | "demo"; formType: FormType }
  | { status: "invalid"; fieldErrors: Record<string, string>; message: string }
  | { status: "rejected-file"; message: string }
  | { status: "spam" }
  | { status: "rate-limited" }
  | { status: "unavailable"; message: string }
  | { status: "failed"; message: string };

interface ProcessOptions {
  env?: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
  now?: number;
}

const MIN_FILL_MS = 2500;

export async function processRequest(form: FormData, opts: ProcessOptions = {}): Promise<ProcessResult> {
  const env = opts.env ?? process.env;
  const now = opts.now ?? Date.now();

  // 1. Anti-spam : champ piège + temps de remplissage minimal.
  const honeypot = form.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return { status: "spam" };
  const startedAt = Number(form.get("startedAt"));
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) return { status: "spam" };

  // 2. Métadonnées
  const meta = metaSchema.safeParse({
    formType: form.get("formType"),
    sector: str(form.get("sector")),
    pagePath: str(form.get("pagePath")),
  });
  if (!meta.success) {
    return { status: "invalid", fieldErrors: {}, message: "Type de demande inconnu." };
  }
  const { formType, sector, pagePath } = meta.data;

  // 3. Champs
  const schema = schemasByType[formType];
  const raw: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string" && !["website", "startedAt", "formType", "sector", "pagePath"].includes(key)) {
      raw[key] = value;
    }
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "invalid",
      fieldErrors,
      message: "Certains champs sont à compléter ou à corriger.",
    };
  }
  const data = parsed.data as Record<string, string | undefined>;

  // 4. Fichiers
  let attachments: CheckedFile[] = [];
  const policy = FILE_POLICY[formType];
  if (policy) {
    const result = await checkFiles(form.getAll(policy.field), {
      maxFiles: policy.maxFiles,
      limits: resolveFileLimits(env),
    });
    if (!result.ok) return { status: "rejected-file", message: result.message };
    attachments = result.files;
  } else if (form.getAll("photos").some((f) => typeof f !== "string" && f.size > 0)) {
    return { status: "rejected-file", message: "Ce formulaire n'accepte pas de fichiers." };
  }

  // 5. Transmission
  const transport = resolveTransport(env);
  if (transport.kind === "unconfigured") {
    console.error(`[demandes] transmission non configurée : ${transport.reason}`);
    return { status: "unavailable", message: unavailableMessage() };
  }
  const message = formatMessage({ formType, sector, pagePath, data, attachments });
  const result = await deliver(message, transport, opts.fetchImpl);
  if (!result.ok) {
    console.error(`[demandes] échec de transmission (${result.reason}) : ${result.detail}`);
    return {
      status: "failed",
      message:
        "La demande n'a pas pu être transmise. Vos informations sont conservées dans le formulaire : réessayez dans un instant" +
        (company.phone ? ` ou appelez le ${company.phone.value}.` : "."),
    };
  }
  return { status: "accepted", mode: result.mode, formType };
}

function str(v: FormDataEntryValue | null): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function unavailableMessage(): string {
  return (
    "L'envoi en ligne n'est pas encore disponible : votre demande n'a pas été transmise." +
    (company.phone ? ` Appelez le ${company.phone.value} pour la faire directement.` : "")
  );
}

export function formatMessage(input: {
  formType: FormType;
  sector?: string;
  pagePath?: string;
  data: Record<string, string | undefined>;
  attachments: CheckedFile[];
}): OutgoingMessage {
  const { formType, sector, pagePath, data, attachments } = input;
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => [FIELD_LABELS[k] ?? k, labelFor(k, v!)] as const);

  const place = [data.postalCode, data.city].filter(Boolean).join(" ");
  const vehicle = [data.brand, data.model, data.year].filter(Boolean).join(" ");
  const subject = [
    `[${company.brandName}] ${FORM_TYPE_LABELS[formType]}`,
    place,
    vehicle || data.company,
  ]
    .filter(Boolean)
    .join(" — ");

  const header = [
    `Type : ${FORM_TYPE_LABELS[formType]}`,
    `Secteur d'origine : ${sector || "non précisé"}`,
    `Page d'origine : ${pagePath || "inconnue"}`,
    `Photos jointes : ${attachments.length}`,
  ];
  const text = [
    ...header,
    "",
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "Rappel : cette demande ne vaut ni rendez-vous confirmé ni autorisation de destruction.",
  ].join("\n");

  const html = `<!doctype html><html lang="fr"><body style="font-family:Arial,sans-serif;color:#1b1f23">
<h2 style="margin:0 0 8px">${esc(FORM_TYPE_LABELS[formType])}</h2>
<p style="margin:0 0 16px;color:#59626b">${header.map(esc).join("<br>")}</p>
<table cellpadding="6" style="border-collapse:collapse;border:1px solid #dfe3e0">
${rows
  .map(
    ([k, v]) =>
      `<tr><th align="left" style="background:#f4f6f2;border:1px solid #dfe3e0;vertical-align:top">${esc(k)}</th><td style="border:1px solid #dfe3e0;white-space:pre-wrap">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="color:#59626b;font-size:13px">Cette demande ne vaut ni rendez-vous confirmé ni autorisation de destruction.</p>
</body></html>`;

  return { subject, text, html, replyTo: data.email, attachments };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
