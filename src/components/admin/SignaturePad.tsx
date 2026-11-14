"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { uploadMissionFile } from "@/app/admin/actions";

/** Signature du client au doigt, enregistrée en image dans la fiche. */
export function SignaturePad({ demandeId, signed }: { demandeId: string; signed: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(true);
  const [state, setState] = useState<"" | "envoi" | "ok" | "erreur">(signed ? "ok" : "");
  const router = useRouter();

  useEffect(() => {
    const c = canvas.current!;
    const ratio = window.devicePixelRatio || 1;
    c.width = c.offsetWidth * ratio;
    c.height = c.offsetHeight * ratio;
    const ctx = c.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0b1310";
  }, []);

  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };
  const down = (e: React.PointerEvent) => {
    canvas.current!.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = canvas.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(...point(e));
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvas.current!.getContext("2d")!;
    ctx.lineTo(...point(e));
    ctx.stroke();
    setEmpty(false);
  };
  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setEmpty(true);
  };
  const save = async () => {
    setState("envoi");
    const blob = await new Promise<Blob | null>((r) => canvas.current!.toBlob(r, "image/png"));
    if (!blob) return setState("erreur");
    const fd = new FormData();
    fd.append("file", new File([blob], "signature.png", { type: "image/png" }));
    const res = await uploadMissionFile(demandeId, "signature", fd);
    setState(res && "error" in res && res.error ? "erreur" : "ok");
    router.refresh();
  };

  return (
    <div>
      <canvas
        ref={canvas}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
        className="h-48 w-full touch-none rounded-2xl border-2 border-dashed border-ink/25 bg-white"
        aria-label="Zone de signature : le client signe avec le doigt"
      />
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={clear} className="rounded-2xl bg-white px-4 py-3 font-semibold ring-1 ring-line">
          Effacer
        </button>
        <button
          type="button"
          onClick={save}
          disabled={empty || state === "envoi"}
          className="flex-1 rounded-2xl bg-ink px-4 py-3 font-bold text-white disabled:opacity-40"
        >
          {state === "envoi" ? "Enregistrement…" : "✍️ Enregistrer la signature"}
        </button>
      </div>
      {state === "ok" ? <p className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">✅ Signature enregistrée.</p> : null}
      {state === "erreur" ? <p className="mt-2 rounded-xl bg-red-50 p-3 text-sm text-red-800">Ça n&apos;a pas marché, réessaie.</p> : null}
    </div>
  );
}
