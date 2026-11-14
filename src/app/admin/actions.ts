"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin/auth";
import { CENTRE_STEPS, DOCUMENTS, fromLocalInput, isStatus, STATUS_INFO, type CentreStep } from "@/lib/admin/demandes";
import { supabaseConfig } from "@/lib/supabase/config";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------------------------------------ connexion */

export async function signIn(_prev: { error?: string } | undefined, form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Indiquez votre e-mail et votre mot de passe." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: "E-mail ou mot de passe incorrect." };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
  redirect(profile?.role === "chauffeur" ? "/admin/chauffeur" : "/admin");
}

export async function signOut() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/connexion");
}

/* ------------------------------------------------------------- demandes */

async function logEvent(demandeId: string, kind: string, message: string) {
  const { supabase, profile } = await requireUser("admin");
  await supabase.from("demande_events").insert({ demande_id: demandeId, kind, message, author_id: profile.id });
}

function refresh(id?: string) {
  revalidatePath("/admin", "layout");
  if (id) revalidatePath(`/admin/demandes/${id}`);
}

export async function setStatus(id: string, status: string) {
  if (!isStatus(status)) return;
  const { supabase } = await requireUser("admin");
  const { error } = await supabase.from("demandes").update({ status }).eq("id", id);
  if (!error) await logEvent(id, "statut", `Statut : ${STATUS_INFO[status].label}`);
  refresh(id);
}

export async function saveNotes(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const notes = String(form.get("notes") ?? "").slice(0, 5000);
  await supabase.from("demandes").update({ notes }).eq("id", id);
  refresh(id);
}

export async function saveRdv(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const raw = String(form.get("rdv_at") ?? "");
  const rdv_at = raw ? fromLocalInput(raw) : null;
  const patch: Record<string, unknown> = { rdv_at };
  if (rdv_at) patch.status = "rdv_fixe";
  await supabase.from("demandes").update(patch).eq("id", id);
  await logEvent(id, "rdv", rdv_at ? "Rendez-vous fixé" : "Rendez-vous retiré");
  refresh(id);
}

export async function saveContact(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const fields = ["contact_name", "phone", "email", "address", "postal_code", "city", "brand", "model", "year", "plate"];
  const patch: Record<string, string | null> = {};
  for (const f of fields) {
    const v = String(form.get(f) ?? "").trim().slice(0, 200);
    patch[f] = v || null;
  }
  await supabase.from("demandes").update(patch).eq("id", id);
  await logEvent(id, "modification", "Coordonnées ou véhicule modifiés");
  refresh(id);
}

export async function deleteDemande(id: string) {
  const { supabase } = await requireUser("admin");
  const { data: photos } = await supabase.from("demande_photos").select("path").eq("demande_id", id);
  if (photos?.length) await supabase.storage.from("photos").remove(photos.map((p) => p.path));
  await supabase.from("demandes").delete().eq("id", id);
  revalidatePath("/admin", "layout");
  redirect("/admin/demandes");
}

export async function createDemande(form: FormData) {
  const { supabase, profile } = await requireUser("admin");
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 200) || null;
  const formType = get("form_type") ?? "enlevement";
  const { data, error } = await supabase
    .from("demandes")
    .insert({
      origine: "manuelle",
      form_type: formType,
      contact_name: get("contact_name"),
      phone: get("phone"),
      email: get("email"),
      address: get("address"),
      postal_code: get("postal_code"),
      city: get("city"),
      brand: get("brand"),
      model: get("model"),
      year: get("year"),
      notes: String(form.get("notes") ?? "").slice(0, 5000),
    })
    .select("id")
    .single();
  if (error || !data) throw new Error("La demande n'a pas pu être créée.");
  await supabase
    .from("demande_events")
    .insert({ demande_id: data.id, kind: "creation", message: "Demande ajoutée à la main", author_id: profile.id });
  revalidatePath("/admin", "layout");
  redirect(`/admin/demandes/${data.id}`);
}

/* ------------------------------------------------------- messages types */

export async function saveTemplate(form: FormData) {
  const { supabase } = await requireUser("admin");
  const id = String(form.get("id") ?? "");
  const title = String(form.get("title") ?? "").trim().slice(0, 120);
  const body = String(form.get("body") ?? "").trim().slice(0, 2000);
  if (!title || !body) return;
  if (id) await supabase.from("message_templates").update({ title, body }).eq("id", id);
  else await supabase.from("message_templates").insert({ title, body, position: 100 });
  revalidatePath("/admin/messages");
}

export async function deleteTemplate(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("message_templates").delete().eq("id", id);
  revalidatePath("/admin/messages");
}

/* ------------------------------------------------- agenda et chauffeur */

export async function assignChauffeur(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const chauffeur = String(form.get("chauffeur_id") ?? "");
  await supabase.from("demandes").update({ chauffeur_id: chauffeur || null }).eq("id", id);
  await logEvent(id, "chauffeur", chauffeur ? "Chauffeur attribué" : "Chauffeur retiré");
  refresh(id);
}

const PHOTO_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };

/** Photo ou signature déposée depuis l'espace chauffeur (ou par un administrateur). */
export async function uploadMissionFile(id: string, kind: "enlevement" | "signature" | "document", form: FormData) {
  const { supabase } = await requireUser();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) return { error: "Aucun fichier." };
  const ext = PHOTO_TYPES[file.type];
  if (!ext) return { error: "Format non accepté (JPEG, PNG, WebP ou PDF)." };
  if (file.size > 3_900_000) return { error: "Fichier trop lourd (4 Mo maximum)." };
  const path = `${id}/${kind}/${crypto.randomUUID()}.${ext}`;
  const up = await supabase.storage.from("photos").upload(path, file, { contentType: file.type });
  if (up.error) return { error: "Envoi impossible. Réessayez." };
  const reg = await supabase.rpc("chauffeur_add_photo", { demande: id, object_path: path, photo_kind: kind });
  if (reg.error) return { error: "Envoi impossible. Réessayez." };
  revalidatePath(`/admin/chauffeur/${id}`);
  revalidatePath(`/admin/demandes/${id}`);
  return { ok: true };
}

export async function finishMission(id: string, form: FormData) {
  const { supabase, profile } = await requireUser();
  const docs = Object.fromEntries(DOCUMENTS.map((d) => [d.key, form.get(d.key) === "on"]));
  const { error } = await supabase.rpc("chauffeur_finish", { demande: id, docs, signer: String(form.get("signataire") ?? "").slice(0, 120) });
  if (error) throw new Error("La validation a échoué.");
  revalidatePath("/admin", "layout");
  redirect(profile.role === "chauffeur" ? "/admin/chauffeur?fait=1" : `/admin/demandes/${id}`);
}

/* ------------------------------------------------------ centre VHU */

export async function setCentreStep(id: string, step: CentreStep, done: boolean) {
  if (!CENTRE_STEPS.some((s) => s.key === step)) return;
  const { supabase } = await requireUser("admin");
  const patch: Record<string, string | null> = { [step]: done ? new Date().toISOString() : null };
  if (step === "cd_envoye_at" && done) patch.status = "terminee";
  await supabase.from("demandes").update(patch).eq("id", id);
  const label = CENTRE_STEPS.find((s) => s.key === step)!.label;
  await logEvent(id, "centre", done ? label : `${label} (annulé)`);
  refresh(id);
  revalidatePath("/admin/centre-vhu");
}

/* ------------------------------------------------------------ équipe */

export async function addMember(_prev: { error?: string; ok?: string } | undefined, form: FormData) {
  const { supabase } = await requireUser("admin");
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const full_name = String(form.get("full_name") ?? "").trim().slice(0, 80);
  const role = form.get("role") === "admin" ? "admin" : "chauffeur";
  const password = String(form.get("password") ?? "");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Adresse e-mail invalide." };
  if (password.length < 8) return { error: "Le mot de passe doit faire au moins 8 caractères." };

  const { error } = await supabase.from("allowed_users").upsert({ email, role, full_name });
  if (error) return { error: "Ajout impossible." };

  // Création du compte avec un client sans session, pour ne pas déconnecter l'administrateur.
  const config = supabaseConfig()!;
  const anon = createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error: signUpError } = await anon.auth.signUp({ email, password });
  await supabase.rpc("admin_sync_profiles");
  revalidatePath("/admin/equipe");
  if (signUpError) {
    return {
      error: `Accès enregistré, mais le compte n'a pas pu être créé (${signUpError.message}). Créez-le dans Supabase (Authentication → Users → Add user), puis cliquez sur « Actualiser ».`,
    };
  }
  return { ok: `${full_name || email} peut se connecter avec ce mot de passe (si le compte existait déjà, son ancien mot de passe reste valable).` };
}

export async function removeMember(email: string) {
  const { supabase } = await requireUser("admin");
  await supabase.rpc("admin_remove_user", { target_email: email });
  revalidatePath("/admin/equipe");
}

export async function syncMembers() {
  const { supabase } = await requireUser("admin");
  await supabase.rpc("admin_sync_profiles");
  revalidatePath("/admin/equipe");
}
