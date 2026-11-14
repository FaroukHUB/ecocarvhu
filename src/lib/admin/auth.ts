import { redirect } from "next/navigation";
import { supabaseConfig } from "@/lib/supabase/config";
import { supabaseServer } from "@/lib/supabase/server";

export type Role = "admin" | "chauffeur";
export interface Profile {
  id: string;
  email: string;
  role: Role;
  full_name: string;
}

export function adminConfigured(): boolean {
  return supabaseConfig() !== null;
}

/** Personne connectée et son profil ; redirige vers la connexion sinon. */
export async function requireUser(role?: Role) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");
  const { data: profile } = await supabase.from("profiles").select("id, email, role, full_name").eq("id", user.id).single<Profile>();
  if (!profile) redirect("/admin/connexion?refus=1");
  if (role && profile.role !== role) redirect(profile.role === "chauffeur" ? "/admin/chauffeur" : "/admin");
  return { supabase, profile };
}
