"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadMissionFile } from "@/app/admin/actions";

/** Réduit une photo (1600 px max, JPEG) avant l'envoi : rapide même en 4G. */
async function shrink(file: File): Promise<File> {
  if (file.type === "application/pdf") return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
  return blob ? new File([blob], "photo.jpg", { type: "image/jpeg" }) : file;
}

export function PhotoUploader({
  demandeId,
  kind,
  label,
  accept = "image/*",
  capture = true,
}: {
  demandeId: string;
  kind: "enlevement" | "document";
  label: string;
  accept?: string;
  capture?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function send(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    let k = 0;
    for (const original of Array.from(files)) {
      k++;
      setBusy(`Envoi ${k}/${files.length}…`);
      const fd = new FormData();
      fd.append("file", await shrink(original));
      const res = await uploadMissionFile(demandeId, kind, fd);
      if (res && "error" in res && res.error) {
        setError(res.error);
        break;
      }
    }
    setBusy("");
    if (input.current) input.current.value = "";
    router.refresh();
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple
        {...(capture ? { capture: "environment" as const } : {})}
        className="sr-only"
        onChange={(e) => send(e.target.files)}
      />
      <button
        type="button"
        disabled={Boolean(busy)}
        onClick={() => input.current?.click()}
        className="w-full rounded-2xl bg-brand-bright px-5 py-4 text-lg font-bold text-ink shadow-sm transition active:scale-[0.98] disabled:opacity-60"
      >
        {busy || label}
      </button>
      {error ? <p className="mt-2 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p> : null}
    </div>
  );
}
