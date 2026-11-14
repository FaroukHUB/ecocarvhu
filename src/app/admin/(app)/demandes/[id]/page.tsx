import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MessagePicker } from "@/components/admin/MessagePicker";
import { PhotoUploader } from "@/components/admin/PhotoUploader";
import { buttonClass, Card, inputClass, StatusBadge } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import {
  CENTRE_STEPS,
  DOCUMENTS,
  fillTemplate,
  FORM_INFO,
  formatDate,
  PHOTO_KINDS,
  placeLabel,
  STATUS_INFO,
  STATUSES,
  toLocalInput,
  vehicleLabel,
  whatsappNumber,
  type Demande,
} from "@/lib/admin/demandes";
import { labelFor } from "@/lib/forms/options";
import { FIELD_LABELS } from "@/lib/forms/schemas";
import { assignChauffeur, deleteDemande, saveContact, saveNotes, saveRdv, setCentreStep, setStatus } from "../../../actions";

export const metadata: Metadata = { title: "Fiche demande" };

export default function DemandePage({ params }: PageProps<"/admin/demandes/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Fiche params={params} />
    </Suspense>
  );
}

async function Fiche({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser("admin");
  const [{ data: d }, { data: photos }, { data: events }, { data: templates }, { data: chauffeurs }] = await Promise.all([
    supabase.from("demandes").select("*").eq("id", id).maybeSingle<Demande>(),
    supabase.from("demande_photos").select("path, kind").eq("demande_id", id).order("created_at"),
    supabase.from("demande_events").select("created_at, kind, message").eq("demande_id", id).order("created_at", { ascending: false }),
    supabase.from("message_templates").select("id, title, body").order("position"),
    supabase.from("profiles").select("id, full_name, email, role").order("role"),
  ]);
  if (!d) notFound();

  const signed = photos?.length
    ? (await supabase.storage.from("photos").createSignedUrls(photos.map((p) => p.path), 3600)).data ?? []
    : [];
  const kindOf = new Map((photos ?? []).map((p) => [p.path, p.kind]));
  const byKind = (kinds: string[]) => signed.filter((p) => p.signedUrl && kinds.includes(kindOf.get(p.path ?? "") ?? ""));
  const wa = whatsappNumber(d.phone);
  const mapQuery = [d.address, d.postal_code, d.city].filter(Boolean).join(" ");
  const formRows = Object.entries(d.data ?? {}).filter(([, v]) => v);

  return (
    <>
      <Link href="/admin/demandes" className="text-sm font-semibold text-muted hover:text-ink">
        ← Toutes les demandes
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            <span aria-hidden="true">{FORM_INFO[d.form_type]?.emoji ?? "📄"}</span> {d.contact_name || "Sans nom"}
          </h1>
          <p className="mt-1 text-muted">
            Demande n° {d.numero} · {FORM_INFO[d.form_type]?.label ?? d.form_type} · reçue le {formatDate(d.created_at)} ·{" "}
            {d.origine === "manuelle" ? "ajoutée à la main" : `via le site${d.source_page ? ` (${d.source_page})` : ""}`}
          </p>
        </div>
        <StatusBadge status={d.status} />
      </div>

      {/* Étapes : un clic change le statut */}
      <div className="mt-5 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <form key={s} action={setStatus.bind(null, d.id, s)}>
            <button
              type="submit"
              className={`rounded-2xl px-4 py-2.5 text-sm font-semibold ring-1 transition hover:-translate-y-0.5 ${
                d.status === s ? `${STATUS_INFO[s].tone} ring-2` : "bg-white ring-line"
              }`}
            >
              {STATUS_INFO[s].emoji} {STATUS_INFO[s].label}
            </button>
          </form>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card title="Contact" emoji="👤">
            <p className="text-lg font-semibold">{d.contact_name || "Nom non indiqué"}</p>
            {d.company ? <p className="text-muted">{d.company}</p> : null}
            <p className="mt-1">📍 {[d.address, placeLabel(d)].filter(Boolean).join(", ")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.phone ? (
                <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="rounded-2xl bg-brand-bright px-4 py-2.5 font-semibold text-ink">
                  📞 Appeler {d.phone}
                </a>
              ) : null}
              {wa ? (
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-[#25d366]/20 px-4 py-2.5 font-semibold">
                  💬 WhatsApp
                </a>
              ) : null}
              {d.email ? (
                <a href={`mailto:${d.email}`} className="rounded-2xl bg-violet-100 px-4 py-2.5 font-semibold text-violet-900">
                  📧 {d.email}
                </a>
              ) : null}
              {mapQuery ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-sky-100 px-4 py-2.5 font-semibold text-sky-900"
                >
                  🗺️ Itinéraire
                </a>
              ) : null}
            </div>
          </Card>

          <Card title="Véhicule" emoji="🚗">
            <p className="text-lg font-semibold">{vehicleLabel(d)}</p>
            {d.plate ? <p className="mt-1">Immatriculation : <strong>{d.plate}</strong></p> : null}
            {(["client", "enlevement", "signature"] as const).map((k) =>
              byKind([k]).length ? (
                <div key={k} className="mt-4">
                  <p className="text-sm font-semibold text-muted">{PHOTO_KINDS[k]}</p>
                  <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {byKind([k]).map((p) => (
                      <li key={p.path}>
                        <a href={p.signedUrl!} target="_blank" rel="noopener noreferrer">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.signedUrl!} alt={PHOTO_KINDS[k]} className={`aspect-square w-full rounded-2xl ${k === "signature" ? "bg-white object-contain ring-1 ring-line" : "object-cover"}`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
            {!byKind(["client", "enlevement", "signature"]).length ? <p className="mt-3 text-sm text-muted">Pas de photo.</p> : null}
          </Card>

          {d.enleve_at ? (
            <Card title="Enlèvement" emoji="🚛">
              <p>
                Enlevé le <strong>{formatDate(d.enleve_at)}</strong>
                {d.signataire ? <> · signé par <strong>{d.signataire}</strong></> : null}
              </p>
              <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                {DOCUMENTS.map((doc) => (
                  <li key={doc.key}>
                    {d.documents?.[doc.key] ? "✅" : "⬜"} {doc.label}
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {CENTRE_STEPS.map((st) => {
                  const done = Boolean(d[st.key]);
                  return (
                    <form key={st.key} action={setCentreStep.bind(null, d.id, st.key, !done)}>
                      <button
                        type="submit"
                        className={`w-full rounded-2xl px-3 py-2.5 text-left text-sm font-semibold ring-1 ${done ? "bg-emerald-50 text-emerald-900 ring-emerald-300" : "bg-surface ring-line"}`}
                      >
                        {done ? "✅" : st.emoji} {st.label}
                        {done ? <span className="block text-xs font-normal">le {formatDate(d[st.key]!, false)}</span> : null}
                      </button>
                    </form>
                  );
                })}
              </div>
            </Card>
          ) : null}

          <Card title="Documents" emoji="📄">
            {byKind(["document"]).length ? (
              <ul className="mb-3 space-y-1">
                {byKind(["document"]).map((p, k) => (
                  <li key={p.path}>
                    <a href={p.signedUrl!} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
                      📎 Document {k + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-3 text-sm text-muted">Certificat de destruction, carte grise, cerfa… (photo ou PDF)</p>
            )}
            <PhotoUploader demandeId={d.id} kind="document" label="📎 Joindre un document" accept="image/*,application/pdf" capture={false} />
          </Card>

          {formRows.length ? (
            <Card title="Tout ce que le client a indiqué" emoji="📝">
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {formRows.map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-2">
                    <dt className="text-xs text-muted">{FIELD_LABELS[k] ?? k}</dt>
                    <dd className="whitespace-pre-wrap">{labelFor(k, v)}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ) : null}

          <Card title="Modifier les coordonnées ou le véhicule" emoji="✏️">
            <details>
              <summary className="cursor-pointer font-semibold text-brand">Ouvrir le formulaire</summary>
              <form action={saveContact.bind(null, d.id)} className="mt-4 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["contact_name", "Nom"],
                    ["phone", "Téléphone"],
                    ["email", "E-mail"],
                    ["address", "Adresse"],
                    ["postal_code", "Code postal"],
                    ["city", "Commune"],
                    ["brand", "Marque"],
                    ["model", "Modèle"],
                    ["year", "Année"],
                    ["plate", "Immatriculation"],
                  ] as const
                ).map(([name, label]) => (
                  <label key={name} className="block">
                    <span className="mb-1 block text-sm font-semibold">{label}</span>
                    <input name={name} defaultValue={d[name] ?? ""} className={inputClass} />
                  </label>
                ))}
                <button type="submit" className={`${buttonClass} sm:col-span-2`}>
                  💾 Enregistrer
                </button>
              </form>
            </details>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Rendez-vous" emoji="📅">
            {d.rdv_at ? <p className="mb-3 text-lg font-semibold">{formatDate(d.rdv_at)}</p> : null}
            <form action={saveRdv.bind(null, d.id)} className="flex flex-wrap gap-2">
              <input type="datetime-local" name="rdv_at" defaultValue={toLocalInput(d.rdv_at)} className={`${inputClass} flex-1`} />
              <button type="submit" className={buttonClass}>
                Enregistrer
              </button>
            </form>
            <p className="mt-2 text-xs text-muted">Fixer une date passe la demande en « RDV fixé ». Laissez vide pour retirer le rendez-vous.</p>
            <form action={assignChauffeur.bind(null, d.id)} className="mt-4 flex flex-wrap gap-2">
              <select name="chauffeur_id" defaultValue={d.chauffeur_id ?? ""} className={`${inputClass} flex-1`}>
                <option value="">🚚 Aucun chauffeur</option>
                {(chauffeurs ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.full_name || c.email}
                    {c.role === "admin" ? " (administrateur)" : ""}
                  </option>
                ))}
              </select>
              <button type="submit" className={buttonClass}>
                Attribuer
              </button>
            </form>
            <Link href={`/admin/chauffeur/${d.id}`} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              📱 Ouvrir la mission (photos, signature, validation)
            </Link>
          </Card>

          <Card title="Envoyer un message" emoji="💬">
            <MessagePicker
              templates={(templates ?? []).map((t) => ({ id: t.id, title: t.title, text: fillTemplate(t.body, d) }))}
              whatsapp={wa}
              phone={d.phone}
              email={d.email}
            />
          </Card>

          <Card title="Notes" emoji="🗒️">
            <form action={saveNotes.bind(null, d.id)}>
              <textarea name="notes" defaultValue={d.notes} rows={5} placeholder="Ex. pas de clés, sous-sol 1,90 m, rappeler après 18 h…" className={inputClass} />
              <button type="submit" className={`${buttonClass} mt-2`}>
                💾 Enregistrer les notes
              </button>
            </form>
          </Card>

          <Card title="Historique" emoji="🕓">
            <ol className="space-y-2 text-sm">
              {(events ?? []).map((e, k) => (
                <li key={k} className="flex gap-2">
                  <span className="text-muted">{formatDate(e.created_at)}</span>
                  <span>{e.message}</span>
                </li>
              ))}
            </ol>
          </Card>

          <details className="rounded-3xl border border-red-200 bg-white p-5">
            <summary className="cursor-pointer font-semibold text-red-700">🗑️ Supprimer cette demande</summary>
            <p className="mt-2 text-sm text-muted">À utiliser pour un doublon ou un message indésirable. Les photos sont supprimées aussi. C&apos;est définitif.</p>
            <form action={deleteDemande.bind(null, d.id)} className="mt-3">
              <button type="submit" className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white">
                Oui, supprimer définitivement
              </button>
            </form>
          </details>
        </div>
      </div>
    </>
  );
}
