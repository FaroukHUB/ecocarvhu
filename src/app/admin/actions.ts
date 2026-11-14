"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin/auth";
import { fromLocalInput, isStatus, STATUS_INFO } from "@/lib/admin/demandes";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------------------------------------ connexion */

export async function signIn(_prev: { error?: string } | undefined, form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Indiquez votre e-mail et votre mot de passe." };
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "E-mail ou mot de passe incorrect." };
  redirect("/admin");
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
