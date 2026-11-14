import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { resolveSiteUrl } from "@/config/env";
import { sendProspectEmail } from "@/lib/prospection/email";
import { unsubscribeUrl } from "@/lib/prospection/stages";
import { supabaseConfig } from "@/lib/supabase/config";

/**
 * Envoi quotidien des relances de prospection programmées (tâche Vercel Cron).
 * Protégé par CRON_SECRET ; ne part que ce qui a été validé dans l'admin et
 * n'a pas été annulé (réponse, refus, désinscription).
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "non autorisé" }, { status: 401 });
  }
  const config = supabaseConfig();
  const token = process.env.SUPABASE_INGEST_TOKEN?.trim();
  if (!config || !token) return NextResponse.json({ error: "non configuré" }, { status: 503 });
  const db = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await db.rpc("prospect_due_emails", { token });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const site = resolveSiteUrl() ?? "https://www.ecocarvhu.fr";
  const due = (data ?? []) as { id: string; subject: string; body: string; email: string; unsubscribe_token: string }[];
  let sent = 0;
  for (const e of due) {
    const r = await sendProspectEmail({ to: e.email, subject: e.subject, body: e.body, unsubscribeUrl: unsubscribeUrl(site, e.unsubscribe_token) });
    await db.rpc("prospect_mark_sent", { token, email_id: e.id, ok: r.ok, err: r.ok ? null : r.error });
    if (r.ok) sent++;
  }
  return NextResponse.json({ due: due.length, sent });
}
