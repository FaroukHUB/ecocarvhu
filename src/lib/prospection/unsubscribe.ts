import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/config";

/** Désinscription depuis le lien d'un e-mail (sans compte). Retourne le nom de l'entreprise, ou null. */
export async function unsubscribeToken(token: string): Promise<string | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  const config = supabaseConfig();
  if (!config) return null;
  const db = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await db.rpc("prospect_unsubscribe", { token });
  if (error) throw new Error(error.message);
  return (data as string | null) ?? null;
}
