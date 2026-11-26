import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/config";
import type { CheckedFile } from "./files";

type EnvSource = Record<string, string | undefined>;

/**
 * Copie d'une demande dans l'espace de gestion (Supabase), en plus de l'e-mail.
 * Sans configuration, ne fait rien. Une erreur est journalisée sans bloquer
 * la demande : l'e-mail reste la transmission de référence.
 */
export async function storeDemande(
  input: {
    formType: string;
    sector?: string;
    pagePath?: string;
    data: Record<string, string | undefined>;
    attachments: CheckedFile[];
  },
  env: EnvSource = process.env,
): Promise<void> {
  const config = supabaseConfig(env);
  const token = env.SUPABASE_INGEST_TOKEN?.trim();
  if (!config || !token) return;
  const db = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });

  // Une coupure réseau passagère ne doit pas faire perdre la copie : 3 essais.
  const payload = { formType: input.formType, sector: input.sector, pagePath: input.pagePath, data: input.data };
  let { data, error } = await db.rpc("submit_demande", { token, payload });
  for (const wait of [1_000, 3_000]) {
    if (!error || !isNetworkError(error.message)) break;
    await new Promise((r) => setTimeout(r, wait));
    ({ data, error } = await db.rpc("submit_demande", { token, payload }));
  }
  if (error || !data) throw new Error(`enregistrement : ${error?.message ?? "réponse vide"}`);
  const { id, upload_key } = data as { id: string; upload_key: string };

  await Promise.all(
    input.attachments.map(async (file, i) => {
      const safe = file.filename.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-60) || "photo";
      const path = `${id}/${upload_key}/${i + 1}-${safe}`;
      const up = await db.storage.from("photos").upload(path, file.content, { contentType: file.contentType });
      if (up.error) throw new Error(`photo : ${up.error.message}`);
      const reg = await db.rpc("register_demande_photo", { token, demande: id, object_path: path });
      if (reg.error) throw new Error(`photo : ${reg.error.message}`);
    }),
  );
}

/** Erreur de connexion (et non refus de la base) : on peut réessayer. */
export function isNetworkError(message: string): boolean {
  return /fetch failed|network|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket|timeout/i.test(message);
}
