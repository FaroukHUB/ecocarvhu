import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Lien reçu par e-mail (mot de passe oublié) : ouvre la session puis envoie
 * vers « Choisis ton nouveau mot de passe ».
 * - token_hash + type : modèle d'e-mail Supabase « Reset Password » pointant ici
 *   (fonctionne même si l'e-mail est ouvert sur un autre appareil).
 * - code : lien classique demandé depuis la page de connexion.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");
  const supabase = await supabaseServer();
  let ok = false;
  if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  } else if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  }
  const to = new URL(ok ? "/admin/mot-de-passe" : "/admin/connexion?lien=expire", request.url);
  const res = NextResponse.redirect(to);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}
