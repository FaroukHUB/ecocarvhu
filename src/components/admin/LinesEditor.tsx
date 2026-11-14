"use client";

import { useState } from "react";
import { computeTotals, euro, type Line } from "@/lib/admin/argent";
import { inputClass } from "./ui";

interface Row {
  id: number;
  label: string;
  qty: string;
  unit: string;
  tva: number;
}

let seq = 0;
const toRow = (l: Line): Row => ({ id: ++seq, label: l.label, qty: String(l.qty).replace(".", ","), unit: l.unit_ht ? String(l.unit_ht).replace(".", ",") : "", tva: l.tva });
const num = (v: string) => Number(v.replace(/\s/g, "").replace(",", ".")) || 0;

/** Lignes d'un devis ou d'une facture, avec totaux calculés en direct. */
export function LinesEditor({ initial, franchise, readOnly }: { initial: Line[]; franchise: boolean; readOnly: boolean }) {
  const defaultTva = franchise ? 0 : 20;
  const blank = (): Row => ({ id: ++seq, label: "", qty: "1", unit: "", tva: defaultTva });
  const [rows, setRows] = useState<Row[]>(() => (initial.length ? initial.map(toRow) : [blank()]));
  const lines: Line[] = rows.map((r) => ({ label: r.label, qty: num(r.qty), unit_ht: num(r.unit), tva: franchise ? 0 : r.tva }));
  const totals = computeTotals(lines);
  const set = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div>
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="grid gap-2 rounded-2xl bg-surface p-3 sm:grid-cols-[1fr_5rem_7rem_6rem_auto] sm:items-end">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Désignation</span>
              <input value={r.label} disabled={readOnly} onChange={(e) => set(r.id, { label: e.target.value })} placeholder="ex. Enlèvement d'un véhicule hors d'usage" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Qté</span>
              <input value={r.qty} disabled={readOnly} inputMode="decimal" onChange={(e) => set(r.id, { qty: e.target.value })} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">Prix HT (€)</span>
              <input value={r.unit} disabled={readOnly} inputMode="decimal" onChange={(e) => set(r.id, { unit: e.target.value })} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted">TVA</span>
              <select value={franchise ? 0 : r.tva} disabled={readOnly || franchise} onChange={(e) => set(r.id, { tva: Number(e.target.value) })} className={inputClass}>
                {[20, 10, 5.5, 0].map((t) => (
                  <option key={t} value={t}>
                    {String(t).replace(".", ",")} %
                  </option>
                ))}
              </select>
            </label>
            {!readOnly ? (
              <button type="button" onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="rounded-xl px-3 py-2.5 text-red-700 hover:bg-red-50" aria-label="Supprimer la ligne">
                🗑️
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {!readOnly ? (
        <button type="button" onClick={() => setRows((rs) => [...rs, blank()])} className="mt-3 rounded-2xl bg-white px-4 py-2 font-semibold ring-1 ring-line">
          ➕ Ajouter une ligne
        </button>
      ) : null}
      <dl className="ml-auto mt-5 max-w-xs space-y-1 text-right">
        <div className="flex justify-between gap-6"><dt>Total HT</dt><dd className="tabular-nums">{euro(totals.total_ht)}</dd></div>
        <div className="flex justify-between gap-6"><dt>TVA</dt><dd className="tabular-nums">{euro(totals.total_tva)}</dd></div>
        <div className="flex justify-between gap-6 border-t border-line pt-1 text-xl font-bold"><dt>Total TTC</dt><dd className="tabular-nums">{euro(totals.total_ttc)}</dd></div>
      </dl>
      {franchise ? <p className="mt-2 text-right text-xs text-muted">TVA non applicable, art. 293 B du CGI</p> : null}
    </div>
  );
}
