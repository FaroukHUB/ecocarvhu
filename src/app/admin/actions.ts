"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { computeTotals, parseAmount } from "@/lib/admin/argent";
import { requireUser } from "@/lib/admin/auth";
import { CENTRE_STEPS, DOCUMENTS, fromLocalInput, isStatus, STATUS_INFO, type CentreStep } from "@/lib/admin/demandes";
import { draftWithClaude } from "@/lib/prospection/ai";
import { fillProspect, sendProspectEmail } from "@/lib/prospection/email";
import { unsubscribeUrl } from "@/lib/prospection/stages";
import { contentTemplate, countToConfirm, draftContentWithClaude } from "@/lib/visibilite/content";
import { activite, type Company as Entreprise } from "@/lib/prospection/search";
import { resolveSiteUrl } from "@/config/env";
import { supabaseConfig } from "@/lib/supabase/config";
import { supabaseServer } from "@/lib/supabase/server";

/* ------------------------------------------------------------ connexion */

export async function signIn(_prev: { error?: string } | undefined, form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Il manque ton e-mail ou ton mot de passe." };
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: "E-mail ou mot de passe incorrect, réessaie." };
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
  if (up.error) return { error: "L'envoi n'est pas passé, réessaie." };
  const reg = await supabase.rpc("chauffeur_add_photo", { demande: id, object_path: path, photo_kind: kind });
  if (reg.error) return { error: "L'envoi n'est pas passé, réessaie." };
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
      error: "L'accès est noté, mais le compte n'a pas pu être créé pour l'instant. Réessaie un peu plus tard, puis clique sur « Actualiser ».",
    };
  }
  return { ok: `${full_name || email} peut se connecter avec ce mot de passe (s'il avait déjà un compte, il garde son ancien mot de passe).` };
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

/* ---------------------------------------------------------- entreprise */

export async function saveCompany(_prev: { error?: string; ok?: string } | undefined, form: FormData) {
  const { supabase } = await requireUser("admin");
  const t = (k: string, max = 200) => String(form.get(k) ?? "").trim().slice(0, max);
  const { error } = await supabase
    .from("company_settings")
    .update({
      legal_name: t("legal_name"),
      legal_form: t("legal_form"),
      siret: t("siret").replace(/\s/g, ""),
      rcs: t("rcs"),
      capital: t("capital"),
      tva_number: t("tva_number").replace(/\s/g, ""),
      tva_franchise: form.get("tva_franchise") === "on",
      address: t("address"),
      postal_code: t("postal_code"),
      city: t("city"),
      phone: t("phone"),
      email: t("email"),
      iban: t("iban").replace(/\s/g, ""),
      bic: t("bic"),
      payment_days: Math.min(Math.max(Number(form.get("payment_days")) || 30, 0), 60),
      legal_footer: t("legal_footer", 1500),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) return { error: "Enregistrement impossible." };
  revalidatePath("/admin", "layout");
  return { ok: "Informations enregistrées." };
}

/* --------------------------------------------------------------- pros */

function proFields(form: FormData) {
  const t = (k: string) => String(form.get(k) ?? "").trim().slice(0, 200) || null;
  return {
    name: t("name") ?? "Sans nom",
    kind: t("kind") ?? "garage",
    status: t("status") ?? "prospect",
    contact_name: t("contact_name"),
    phone: t("phone"),
    email: t("email"),
    address: t("address"),
    postal_code: t("postal_code"),
    city: t("city"),
    siret: t("siret"),
    notes: String(form.get("notes") ?? "").slice(0, 5000),
  };
}

export async function savePro(id: string | null, form: FormData) {
  const { supabase } = await requireUser("admin");
  if (id) {
    await supabase.from("pros").update(proFields(form)).eq("id", id);
    revalidatePath(`/admin/pros/${id}`);
    revalidatePath("/admin/pros");
    return;
  }
  const { data, error } = await supabase.from("pros").insert(proFields(form)).select("id").single();
  if (error || !data) throw new Error("Création impossible.");
  revalidatePath("/admin/pros");
  redirect(`/admin/pros/${data.id}`);
}

export async function touchPro(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("pros").update({ last_contact_at: new Date().toISOString() }).eq("id", id);
  revalidatePath(`/admin/pros/${id}`);
}

export async function deletePro(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("pros").delete().eq("id", id);
  revalidatePath("/admin/pros");
  redirect("/admin/pros");
}

export async function linkDemandePro(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const pro = String(form.get("pro_id") ?? "");
  await supabase.from("demandes").update({ pro_id: pro || null }).eq("id", id);
  refresh(id);
}

/* ------------------------------------------------------------ rachats */

export async function createRachat(demandeId: string | null) {
  const { supabase } = await requireUser("admin");
  let vehicle = "";
  if (demandeId) {
    const { data: existing } = await supabase.from("rachats").select("id").eq("demande_id", demandeId).maybeSingle();
    if (existing) redirect(`/admin/rachats/${existing.id}`);
    const { data: d } = await supabase.from("demandes").select("brand, model, year, plate").eq("id", demandeId).maybeSingle();
    vehicle = [d?.brand, d?.model, d?.year, d?.plate].filter(Boolean).join(" ");
  }
  const { data, error } = await supabase.from("rachats").insert({ demande_id: demandeId, vehicle }).select("id").single();
  if (error || !data) throw new Error("Création impossible.");
  revalidatePath("/admin/rachats");
  redirect(`/admin/rachats/${data.id}`);
}

export async function saveRachat(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const status = String(form.get("status") ?? "estimation");
  await supabase
    .from("rachats")
    .update({
      vehicle: String(form.get("vehicle") ?? "").trim().slice(0, 200),
      status,
      prix_propose: parseAmount(form.get("prix_propose")),
      prix_achat: parseAmount(form.get("prix_achat")),
      frais: parseAmount(form.get("frais")) ?? 0,
      revente_pieces: parseAmount(form.get("revente_pieces")) ?? 0,
      revente_metal: parseAmount(form.get("revente_metal")) ?? 0,
      achete_le: /^\d{4}-\d{2}-\d{2}$/.test(String(form.get("achete_le"))) ? String(form.get("achete_le")) : null,
      notes: String(form.get("notes") ?? "").slice(0, 5000),
    })
    .eq("id", id);
  revalidatePath(`/admin/rachats/${id}`);
  revalidatePath("/admin/rachats");
}

export async function deleteRachat(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("rachats").delete().eq("id", id);
  revalidatePath("/admin/rachats");
  redirect("/admin/rachats");
}

/* --------------------------------------------------- devis et factures */

export async function createDocument(kind: "devis" | "facture", source: { pro?: string; demande?: string; devis?: string }) {
  const { supabase } = await requireUser("admin");
  const doc: Record<string, unknown> = { kind };
  if (source.devis) {
    const { data: dv } = await supabase.from("factures").select("*").eq("id", source.devis).maybeSingle();
    if (dv) Object.assign(doc, { devis_id: dv.id, pro_id: dv.pro_id, demande_id: dv.demande_id, client_name: dv.client_name, client_address: dv.client_address, client_email: dv.client_email, client_siret: dv.client_siret, lines: dv.lines, total_ht: dv.total_ht, total_tva: dv.total_tva, total_ttc: dv.total_ttc });
  } else if (source.pro) {
    const { data: p } = await supabase.from("pros").select("*").eq("id", source.pro).maybeSingle();
    if (p)
      Object.assign(doc, {
        pro_id: p.id,
        client_name: p.name,
        client_address: [p.address, [p.postal_code, p.city].filter(Boolean).join(" ")].filter(Boolean).join("\n"),
        client_email: p.email ?? "",
        client_siret: p.siret ?? "",
      });
  } else if (source.demande) {
    const { data: d } = await supabase.from("demandes").select("*").eq("id", source.demande).maybeSingle();
    if (d)
      Object.assign(doc, {
        demande_id: d.id,
        pro_id: d.pro_id,
        client_name: d.company || d.contact_name || "",
        client_address: [d.address, [d.postal_code, d.city].filter(Boolean).join(" ")].filter(Boolean).join("\n"),
        client_email: d.email ?? "",
      });
  }
  const { data, error } = await supabase.from("factures").insert(doc).select("id").single();
  if (error || !data) throw new Error("Création impossible.");
  revalidatePath("/admin/factures");
  redirect(`/admin/factures/${data.id}`);
}

export async function saveDocument(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  let raw: unknown = [];
  try {
    raw = JSON.parse(String(form.get("lines") ?? "[]"));
  } catch {
    raw = [];
  }
  const totals = computeTotals(raw);
  const t = (k: string, max = 300) => String(form.get(k) ?? "").trim().slice(0, max);
  const { error } = await supabase
    .from("factures")
    .update({
      client_name: t("client_name"),
      client_address: t("client_address", 500),
      client_email: t("client_email"),
      client_siret: t("client_siret").replace(/\s/g, ""),
      notes: t("notes", 2000),
      ...totals,
    })
    .eq("id", id)
    .is("numero", null);
  if (error) throw new Error("Enregistrement impossible.");
  revalidatePath(`/admin/factures/${id}`);
}

export async function emitDocument(id: string) {
  const { supabase } = await requireUser("admin");
  const { error } = await supabase.rpc("emit_document", { doc: id });
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath("/admin/factures");
  if (error) redirect(`/admin/factures/${id}?erreur=${encodeURIComponent(error.message)}`);
}

export async function setDocumentStatus(id: string, status: "accepte" | "refuse" | "paye" | "emis" | "annule") {
  const { supabase } = await requireUser("admin");
  const patch: Record<string, unknown> = { status };
  patch.paid_at = status === "paye" ? new Date().toISOString().slice(0, 10) : null;
  await supabase.from("factures").update(patch).eq("id", id).not("numero", "is", null);
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath("/admin/factures");
}

export async function deleteDraft(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("factures").delete().eq("id", id).is("numero", null);
  revalidatePath("/admin/factures");
  redirect("/admin/factures");
}

/** Enregistre le brouillon puis l'émet (un seul clic, rien n'est perdu). */
export async function saveAndEmit(id: string, form: FormData) {
  await saveDocument(id, form);
  await emitDocument(id);
}

/* --------------------------------------------------------- prospection */

/** Ajoute les entreprises cochées au fichier pros (étape « à contacter »). */
export async function addProspects(form: FormData) {
  const { supabase } = await requireUser("admin");
  let list: Entreprise[] = [];
  try {
    list = JSON.parse(String(form.get("companies") ?? "[]"));
  } catch {
    list = [];
  }
  const chosen = new Set(form.getAll("siren").map(String));
  const rows = list
    .filter((c) => chosen.has(c.siren) && !c.refuseProspection)
    .map((c) => ({
      siren: c.siren,
      name: c.name,
      naf: c.naf,
      naf_label: c.nafLabel,
      effectif: c.effectif,
      dirigeant: c.dirigeant || null,
      address: c.address || null,
      postal_code: c.postalCode || null,
      city: c.city || null,
      kind: activite(c.naf)?.kind ?? "autre",
      status: "prospect",
      source: "prospection",
      stage: "a_contacter",
    }));
  if (rows.length) await supabase.from("pros").upsert(rows, { onConflict: "siren", ignoreDuplicates: true });
  revalidatePath("/admin/prospection");
  redirect(`/admin/prospection?onglet=suivi&ajoutes=${rows.length}`);
}

export async function saveProspectInfo(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  const t = (k: string) => String(form.get(k) ?? "").trim().slice(0, 200) || null;
  await supabase.from("pros").update({ email: t("email")?.toLowerCase() ?? null, website: t("website"), contact_name: t("contact_name"), phone: t("phone") }).eq("id", id);
  revalidatePath(`/admin/prospection/${id}`);
}

/** Prépare les 3 e-mails en brouillon, à partir des modèles ou avec l'IA. */
export async function prepareProspectEmails(id: string, mode: "modele" | "ia") {
  const { supabase } = await requireUser("admin");
  const { data: p } = await supabase.from("pros").select("*").eq("id", id).single();
  if (!p) return;
  let emails: { subject: string; body: string }[];
  if (mode === "ia") {
    try {
      emails = await draftWithClaude(p);
    } catch (e) {
      redirect(`/admin/prospection/${id}?erreur=${encodeURIComponent(e instanceof Error ? e.message : "Rédaction impossible.")}`);
    }
  } else {
    const { data: tpl } = await supabase.from("prospect_templates").select("*").order("step");
    emails = (tpl ?? []).map((t) => ({ subject: fillProspect(t.subject, p), body: fillProspect(t.body, p) }));
  }
  await supabase.from("prospect_emails").delete().eq("pro_id", id).in("status", ["brouillon", "annule", "erreur"]);
  await supabase.from("prospect_emails").upsert(
    emails.slice(0, 3).map((e, i) => ({ pro_id: id, step: i + 1, subject: e.subject, body: e.body, status: "brouillon" })),
    { onConflict: "pro_id,step", ignoreDuplicates: true },
  );
  await supabase.from("pros").update({ stage: "pret" }).eq("id", id).eq("stage", "a_contacter");
  revalidatePath(`/admin/prospection/${id}`);
}

export async function saveProspectEmail(emailId: string, proId: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  await supabase
    .from("prospect_emails")
    .update({ subject: String(form.get("subject") ?? "").slice(0, 200), body: String(form.get("body") ?? "").slice(0, 5000) })
    .eq("id", emailId)
    .eq("status", "brouillon");
  revalidatePath(`/admin/prospection/${proId}`);
}

/** Validation : envoie le premier e-mail tout de suite et programme les relances. */
export async function approveAndSend(id: string) {
  const { supabase } = await requireUser("admin");
  const back = (msg: string) => redirect(`/admin/prospection/${id}?erreur=${encodeURIComponent(msg)}`);
  const [{ data: p }, { data: emails }, { data: tpl }] = await Promise.all([
    supabase.from("pros").select("*").eq("id", id).single(),
    supabase.from("prospect_emails").select("*").eq("pro_id", id).order("step"),
    supabase.from("prospect_templates").select("step, delay_days"),
  ]);
  if (!p) return;
  if (!p.email) back("Il manque l'adresse e-mail de l'entreprise.");
  const { data: optout } = await supabase.from("optouts").select("email").eq("email", String(p.email).toLowerCase()).maybeSingle();
  if (optout) back("Cette entreprise a demandé à ne plus recevoir de messages.");
  const first = (emails ?? []).find((e) => e.step === 1 && e.status === "brouillon");
  if (!first) back("Il faut d'abord préparer les e-mails.");
  const site = resolveSiteUrl() ?? "https://www.ecocarvhu.fr";
  const sent = await sendProspectEmail({
    to: p.email,
    subject: first.subject,
    body: first.body,
    unsubscribeUrl: unsubscribeUrl(site, p.unsubscribe_token),
  });
  if (!sent.ok) {
    await supabase.from("prospect_emails").update({ status: "erreur", error: sent.error }).eq("id", first.id);
    back(`Envoi impossible : ${sent.error}`);
  }
  const now = Date.now();
  const delay = new Map((tpl ?? []).map((t) => [t.step, t.delay_days]));
  await supabase.from("prospect_emails").update({ status: "envoye", sent_at: new Date(now).toISOString() }).eq("id", first.id);
  for (const e of (emails ?? []).filter((x) => x.step > 1 && x.status === "brouillon")) {
    const days = delay.get(e.step) ?? (e.step === 2 ? 5 : 12);
    await supabase.from("prospect_emails").update({ status: "planifie", scheduled_at: new Date(now + days * 86400_000).toISOString() }).eq("id", e.id);
  }
  await supabase.from("pros").update({ stage: "envoye", last_contact_at: new Date(now).toISOString() }).eq("id", id);
  revalidatePath(`/admin/prospection/${id}`);
  revalidatePath("/admin/prospection");
}

/** Résultat de la prospection : arrête les relances programmées. */
export async function setProspectStage(id: string, stage: "repondu" | "gagne" | "refus" | "a_contacter") {
  const { supabase } = await requireUser("admin");
  const patch: Record<string, unknown> = { stage };
  if (stage === "gagne") patch.status = "client";
  await supabase.from("pros").update(patch).eq("id", id);
  if (stage !== "a_contacter") await supabase.from("prospect_emails").update({ status: "annule" }).eq("pro_id", id).eq("status", "planifie");
  revalidatePath(`/admin/prospection/${id}`);
  revalidatePath("/admin/prospection");
}

export async function saveProspectTemplate(step: number, form: FormData) {
  const { supabase } = await requireUser("admin");
  await supabase
    .from("prospect_templates")
    .update({
      subject: String(form.get("subject") ?? "").slice(0, 200),
      body: String(form.get("body") ?? "").slice(0, 5000),
      delay_days: Math.min(Math.max(Number(form.get("delay_days")) || 0, 0), 60),
    })
    .eq("step", step);
  revalidatePath("/admin/prospection");
}

/* --------------------------------------------------------- contenu */

export async function createContentDraft(form: FormData) {
  const { supabase, profile } = await requireUser("admin");
  const kind = form.get("kind") === "ville" ? "ville" : "article";
  const topic = String(form.get("topic") ?? "").trim().slice(0, 150);
  const keyword = String(form.get("keyword") ?? "").trim().slice(0, 120);
  const notes = String(form.get("notes") ?? "").trim().slice(0, 4000);
  const mode = form.get("mode") === "ia" ? "ia" : "plan";
  if (!topic) redirect("/admin/contenu?erreur=" + encodeURIComponent("Il manque le sujet ou la ville."));
  let draft: { title: string; meta_description: string; body: string };
  if (mode === "ia") {
    try {
      draft = await draftContentWithClaude({ kind, topic, keyword, notes });
    } catch (e) {
      redirect("/admin/contenu?erreur=" + encodeURIComponent(e instanceof Error ? e.message : "Rédaction impossible."));
    }
  } else {
    draft = contentTemplate(kind, topic, keyword);
  }
  const { data, error } = await supabase
    .from("content_drafts")
    .insert({ kind, topic, keyword, notes, ...draft, created_by: profile.id })
    .select("id")
    .single();
  if (error || !data) redirect("/admin/contenu?erreur=" + encodeURIComponent("Enregistrement impossible."));
  redirect(`/admin/contenu/${data.id}`);
}

export async function saveContentDraft(id: string, form: FormData) {
  const { supabase } = await requireUser("admin");
  await supabase
    .from("content_drafts")
    .update({
      title: String(form.get("title") ?? "").slice(0, 200),
      meta_description: String(form.get("meta_description") ?? "").slice(0, 400),
      body: String(form.get("body") ?? "").slice(0, 30000),
      keyword: String(form.get("keyword") ?? "").slice(0, 120),
    })
    .eq("id", id)
    .eq("status", "brouillon");
  revalidatePath(`/admin/contenu/${id}`);
}

export async function setContentStatus(id: string, status: "brouillon" | "valide" | "publie") {
  const { supabase } = await requireUser("admin");
  if (status === "valide") {
    const { data } = await supabase.from("content_drafts").select("title, meta_description, body").eq("id", id).single();
    if (!data) return;
    if (countToConfirm(`${data.title}\n${data.meta_description}\n${data.body}`) > 0) {
      redirect(`/admin/contenu/${id}?erreur=` + encodeURIComponent("Il reste des passages [À CONFIRMER] ou [À COMPLÉTER] : complète-les ou enlève-les avant de valider."));
    }
  }
  await supabase
    .from("content_drafts")
    .update({ status, validated_at: status === "brouillon" ? null : status === "valide" ? new Date().toISOString() : undefined })
    .eq("id", id);
  revalidatePath(`/admin/contenu/${id}`);
  revalidatePath("/admin/contenu");
}

export async function deleteContentDraft(id: string) {
  const { supabase } = await requireUser("admin");
  await supabase.from("content_drafts").delete().eq("id", id).neq("status", "publie");
  revalidatePath("/admin/contenu");
  redirect("/admin/contenu");
}
