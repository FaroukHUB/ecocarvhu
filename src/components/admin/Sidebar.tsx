"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MENU } from "@/lib/admin/menu";

/** Menu latéral (ordinateur) et tiroir (téléphone). */
export function Sidebar({ name, nouvelles, signOut }: { name: string; nouvelles: number; signOut: () => Promise<void> }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  const nav = (
    <nav aria-label="Menu de gestion" className="flex-1 space-y-5 overflow-y-auto px-3 pb-6 [scrollbar-color:rgb(255_255_255/0.15)_transparent] [scrollbar-width:thin]">
      {MENU.map((cat) => (
        <div key={cat.title}>
          <p className="mb-1.5 flex items-center gap-2 px-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
            <span className={`h-2 w-2 rounded-full ${cat.color}`} aria-hidden="true" />
            {cat.title}
          </p>
          <ul className="space-y-1">
            {cat.items.map((it) =>
              it.soon ? (
                <li key={it.href}>
                  <span className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-white/40">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-lg grayscale" aria-hidden="true">
                      {it.emoji}
                    </span>
                    <span className="flex-1 text-[0.95rem]">{it.label}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold">Bientôt</span>
                  </span>
                </li>
              ) : (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    aria-current={active(it.href) ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-[0.95rem] font-medium transition ${
                      active(it.href) ? "bg-brand-bright text-ink shadow-lg shadow-brand-bright/20" : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${active(it.href) ? "bg-white/60" : "bg-white/10"}`}
                      aria-hidden="true"
                    >
                      {it.emoji}
                    </span>
                    <span className="flex-1">{it.label}</span>
                    {it.badge === "nouvelles" && nouvelles > 0 ? (
                      <span className="min-w-6 rounded-full bg-red-500 px-1.5 py-0.5 text-center text-xs font-bold text-white">
                        {nouvelles}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <Link href="/admin" className="flex items-center gap-2 px-5 py-5" onClick={() => setOpen(false)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-bright text-xl" aria-hidden="true">
        ♻️
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-bold text-white">
          Ecocar<span className="text-brand-bright">VHU</span>
        </span>
        <span className="block text-xs text-white/55">Espace de gestion</span>
      </span>
    </Link>
  );

  const footer = (
    <div className="border-t border-white/10 px-5 py-4 text-sm text-white/70">
      <p>
        Connecté : <strong className="text-white">{name}</strong>
      </p>
      <div className="mt-2 flex gap-3">
        <Link href="/" className="underline hover:text-white">
          Voir le site
        </Link>
        <form action={signOut}>
          <button type="submit" className="underline hover:text-white">
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Téléphone : barre du haut + tiroir */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-ink-grid px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-white">
          <span aria-hidden="true">♻️</span> Ecocar<span className="-ml-2 text-brand-bright">VHU</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          aria-expanded={open}
          aria-controls="admin-menu"
        >
          ☰ Menu
          {nouvelles > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 rounded-full bg-red-500 px-1.5 text-xs font-bold">{nouvelles}</span>
          ) : null}
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Fermer le menu" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div id="admin-menu" className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-ink-grid">
            {brand}
            {nav}
            {footer}
          </div>
        </div>
      ) : null}

      {/* Ordinateur : menu fixe */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-ink-grid lg:flex">
        {brand}
        {nav}
        {footer}
      </aside>
    </>
  );
}
