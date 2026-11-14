import { NextResponse, type NextRequest } from "next/server";
import { formatDate, type Demande } from "@/lib/admin/demandes";
import { csvCell, monthBounds } from "@/lib/admin/registre";
import { supabaseServer } from "@/lib/supabase/server";

/** Registre du mois au format CSV (Excel), réservé aux administrateurs. */
export async function GET(request: NextRequest) {
  const mois = request.nextUrl.searchParams.get("mois") ?? "";
  if (!/^\d{4}-\d{2}$/.test(mois)) return new NextResponse("Mois invalide", { status: 400 });
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Connexion requise", { status: 401 });
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return new NextResponse("Accès refusé", { status: 403 });

  const [from, to] = monthBounds(mois);
  const { data } = await supabase.from("demandes").select("*").gte("enleve_at", from).lt("enleve_at", to).order("enleve_at").returns<Demande[]>();
  const head = ["N°", "Enlevé le", "Marque", "Modèle", "Année", "Immatriculation", "Propriétaire", "Téléphone", "Adresse", "Code postal", "Commune", "Remis au centre", "Certificat reçu", "Certificat envoyé", "Signataire"];
  const d = (v: string | null) => (v ? formatDate(v, false) : "");
  const lines = (data ?? []).map((r) =>
    [r.numero, d(r.enleve_at), r.brand, r.model, r.year, r.plate, r.contact_name, r.phone, r.address, r.postal_code, r.city, d(r.centre_remis_at), d(r.cd_recu_at), d(r.cd_envoye_at), r.signataire]
      .map(csvCell)
      .join(";"),
  );
  const body = "﻿" + [head.join(";"), ...lines].join("\r\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registre-ecocarvhu-${mois}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
