/**
 * Connexion à Supabase (base de l'espace de gestion). Uniquement côté serveur :
 * la clé publiable n'est jamais envoyée au navigateur.
 */
export function supabaseConfig(env: Record<string, string | undefined> = process.env) {
  const url = env.SUPABASE_URL?.trim();
  const key = env.SUPABASE_PUBLISHABLE_KEY?.trim();
  return url && key ? { url, key } : null;
}
