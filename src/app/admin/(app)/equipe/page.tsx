import type { Metadata } from "next";
import { Suspense } from "react";
import { AddMemberForm } from "@/components/admin/AddMemberForm";
import { Card, PageTitle } from "@/components/admin/ui";
import { requireUser } from "@/lib/admin/auth";
import { removeMember, syncMembers } from "../../actions";

export const metadata: Metadata = { title: "Équipe et accès" };

export default function EquipePage() {
  return (
    <>
      <PageTitle emoji="👥" title="Équipe et accès" subtitle="Ceux qui peuvent se connecter à l'espace de gestion." />
      <Suspense fallback={<p className="text-muted">Chargement…</p>}>
        <Team />
      </Suspense>
      <Card className="mt-6" title="Ajouter une personne" emoji="➕">
        <AddMemberForm />
        <p className="mt-4 text-sm text-muted">
          La personne se connecte sur <strong>www.ecocarvhu.fr/admin</strong> avec son e-mail et ce mot de passe. Un chauffeur ne voit
          que les enlèvements qu&apos;on lui confie.
        </p>
      </Card>
    </>
  );
}

async function Team() {
  const { supabase, profile } = await requireUser("admin");
  const [{ data: allowed }, { data: profiles }] = await Promise.all([
    supabase.from("allowed_users").select("email, role, full_name").order("role"),
    supabase.from("profiles").select("email"),
  ]);
  const active = new Set((profiles ?? []).map((p) => p.email.toLowerCase()));
  return (
    <Card>
      <ul className="divide-y divide-line">
        {(allowed ?? []).map((a) => (
          <li key={a.email} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <span>
              <span className="text-xl" aria-hidden="true">
                {a.role === "admin" ? "🔑" : "🚚"}
              </span>{" "}
              <strong>{a.full_name || a.email}</strong>{" "}
              <span className="text-sm text-muted">
                {a.email} · {a.role === "admin" ? "Administrateur" : "Chauffeur"}
              </span>
              {!active.has(a.email.toLowerCase()) ? (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">compte pas encore créé</span>
              ) : null}
            </span>
            {a.email.toLowerCase() !== profile.email.toLowerCase() ? (
              <form action={removeMember.bind(null, a.email)}>
                <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
                  Retirer l&apos;accès
                </button>
              </form>
            ) : (
              <span className="text-sm text-muted">c&apos;est toi</span>
            )}
          </li>
        ))}
      </ul>
      <form action={syncMembers} className="mt-3">
        <button type="submit" className="text-sm font-semibold text-brand hover:underline">
          🔄 Actualiser la liste
        </button>
      </form>
    </Card>
  );
}
