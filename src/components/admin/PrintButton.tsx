"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-xl bg-black px-4 py-2 font-semibold text-white">
      🖨️ Imprimer / PDF
    </button>
  );
}
