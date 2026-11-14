import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseConfig } from "./config";

/** Client lié à la session de la personne connectée (cookies). */
export async function supabaseServer() {
  // Lecture des cookies d'abord : la page est rendue à la demande, jamais au build.
  const store = await cookies();
  const config = supabaseConfig();
  if (!config) throw new Error("Supabase n'est pas configuré (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY).");
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Appel depuis un composant serveur : le proxy rafraîchit la session.
        }
      },
    },
  });
}
