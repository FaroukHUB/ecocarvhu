import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PhotoUploader } from "@/components/admin/PhotoUploader";
import { SignaturePad } from "@/components/admin/SignaturePad";
import { Card, inputClass } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { DOCUMENTS, formatDate, placeLabel, vehicleLabel, whatsappNumber, type Demande } from "@/lib/admin/demandes";
import { finishMission } from "../../../actions";

export const metadata: Metadata = { title: "Mission" };

export default function MissionPage({ params }: PageProps<"/admin/chauffeur/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted">Chargement…</p>}>
      <Mission params={params} />
    </Suspense>
  );
}

async function Mission({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { supabase } = await requireUser();
  const [{ data: d }, { data: photos }] = await Promise.all([
    supabase.from("demandes").select("*").eq("id", id).maybeSingle<Demande>(),
    supabase.from("demande_photos").select("path, kind").eq("demande_id", id).order("created_at"),
  ]);
  if (!d) notFound();
  const signed = photos?.length ? (await supabase.storage.from("photos").createSignedUrls(photos.map((p) => p.path), 3600)).data ?? [] : [];
  const kindOf = new Map((photos ?? []).map((p) => [p.path, p.kind]));
  const pics = (kind: string) => signed.filter((s) => s.signedUrl && kindOf.get(s.path ?? "") === kind);
  const address = [d.address, d.postal_code, d.city].filter(Boolean).join(" ");
  const wa = whatsappNumber(d.phone);
  const done = d.status === "enlevee" || d.status === "terminee";
  const step = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-bold text-white";

  const gallery = (list: typeof signed) =>
    list.length ? (
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {list.map((p) => (
          <li key={p.path}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.signedUrl!} alt="" className="aspect-square w-full rounded-xl bg-white object-cover" />
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/admin/chauffeur" className="text-sm font-semibold text-muted">
        ← Ma tournée
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{d.contact_name || "Sans nom"}</h1>
      {d.rdv_at ? <p className="font-semibold text-orange-800">🕐 {formatDate(d.rdv_at)}</p> : null}

      <Card className="mt-4">
        <p className="text-lg">📍 {[d.address, placeLabel(d)].filter(Boolean).join(", ")}</p>
        <p className="mt-1 text-lg">🚗 {vehicleLabel(d)}{d.plate ? ` · ${d.plate}` : ""}</p>
        {d.notes ? <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-amber-50 p-3 text-amber-950">🗒️ {d.notes}</p> : null}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {d.phone ? (
            <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="rounded-2xl bg-brand-bright px-3 py-3 text-center font-bold text-ink">
              📞 Appeler
            </a>
          ) : null}
          {address ? (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-sky-100 px-3 py-3 text-center font-bold text-sky-900"
            >
              🗺️ Y aller
            </a>
          ) : null}
          {wa ? (
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="col-span-2 rounded-2xl bg-[#25d366]/20 px-3 py-3 text-center font-bold">
              💬 WhatsApp
            </a>
          ) : null}
        </div>
        {gallery(pics("client"))}
      </Card>

      {done ? (
        <p className="mt-6 rounded-3xl bg-emerald-50 p-5 text-center text-lg font-bold text-emerald-900">✅ Enlèvement déjà validé.</p>
      ) : null}

      <Card className="mt-6">
        <h2 className="flex items-center gap-3 text-lg font-bold">
          <span className={step}>1</span> Photos du véhicule
        </h2>
        <p className="mt-1 text-sm text-muted">Avant le chargement : les 4 côtés, le compteur, la plaque.</p>
        <div className="mt-3">
          <PhotoUploader demandeId={d.id} kind="enlevement" label="📷 Prendre des photos" />
        </div>
        {gallery(pics("enlevement"))}
      </Card>

      <Card className="mt-6">
        <h2 className="flex items-center gap-3 text-lg font-bold">
          <span className={step}>2</span> Signature du client
        </h2>
        <p className="mt-1 text-sm text-muted">Le client signe avec le doigt pour confirmer la remise du véhicule.</p>
        <div className="mt-3">
          <SignaturePad demandeId={d.id} signed={pics("signature").length > 0} />
        </div>
      </Card>

      <Card className="mt-6">
        <form action={finishMission.bind(null, d.id)}>
          <h2 className="flex items-center gap-3 text-lg font-bold">
            <span className={step}>3</span> Papiers récupérés
          </h2>
          <ul className="mt-3 space-y-2">
            {DOCUMENTS.map((doc) => (
              <li key={doc.key}>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-surface p-3">
                  <input type="checkbox" name={doc.key} defaultChecked={Boolean(d.documents?.[doc.key])} className="h-6 w-6 accent-[#25d366]" />
                  <span className="font-medium">{doc.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <label className="mt-4 block">
            <span className="mb-1 block font-semibold">Nom de la personne qui a signé</span>
            <input name="signataire" defaultValue={d.signataire ?? d.contact_name ?? ""} className={inputClass} />
          </label>
          <h2 className="mt-6 flex items-center gap-3 text-lg font-bold">
            <span className={step}>4</span> Valider
          </h2>
          <button type="submit" className="mt-3 w-full rounded-2xl bg-ink px-5 py-4 text-lg font-bold text-white active:scale-[0.98]">
            ✅ Véhicule enlevé
          </button>
          <p className="mt-2 text-center text-xs text-muted">Les photos, la signature et les papiers remontent dans la fiche du bureau.</p>
        </form>
      </Card>
    </div>
  );
}
