import { Suspense } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireUser } from "@/lib/admin/auth";
import { signOut } from "../actions";

/** Cadre des pages de gestion : menu + contenu. */
export default function AppLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="lg:flex">
      <Suspense fallback={<div className="hidden w-72 shrink-0 bg-ink-grid lg:block" />}>
        <Menu />
      </Suspense>
      <main id="contenu" className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

async function Menu() {
  const { supabase, profile } = await requireUser();
  const { count } = await supabase.from("demandes").select("id", { count: "exact", head: true }).eq("status", "nouvelle");
  return <Sidebar name={profile.full_name || profile.email} nouvelles={count ?? 0} signOut={signOut} />;
}
