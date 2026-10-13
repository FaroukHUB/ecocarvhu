"use client";

import { useEffect, useRef, useState } from "react";
import type { Option } from "@/lib/forms/options";
import { CameraIcon } from "@/components/ui/icons";
import { useFormCtx } from "./context";

const inputBase =
  "block w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/70 hover:border-ink/25 focus:border-brand focus:outline-none focus:ring-4 focus:ring-lime/40 aria-[invalid=true]:border-danger";

function useField(name: string) {
  const { errors, clearError, idPrefix } = useFormCtx();
  const id = `${idPrefix}-${name}`;
  const error = errors[name];
  return { id, error, clearError, errorId: `${id}-error`, hintId: `${id}-hint` };
}

function Label({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-semibold">
      {children}
      {required ? (
        <span className="text-danger" aria-hidden="true">
          {" "}*
        </span>
      ) : (
        <span className="text-sm font-normal text-muted"> (facultatif)</span>
      )}
    </label>
  );
}

function FieldMessages({ hint, hintId, error, errorId }: { hint?: string; hintId: string; error?: string; errorId: string }) {
  return (
    <>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </>
  );
}

function describedBy(hint: string | undefined, error: string | undefined, hintId: string, errorId: string) {
  return [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
}

export function TextField({
  name,
  label,
  required,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  defaultValue,
  placeholder,
  maxLength,
  pattern,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
}) {
  const { id, error, clearError, errorId, hintId } = useField(name);
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        onInput={() => error && clearError(name)}
        className={inputBase}
      />
      <FieldMessages hint={hint} hintId={hintId} error={error} errorId={errorId} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  required,
  hint,
  rows = 4,
  placeholder,
  maxLength,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}) {
  const { id, error, clearError, errorId, hintId } = useField(name);
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        onInput={() => error && clearError(name)}
        className={inputBase}
      />
      <FieldMessages hint={hint} hintId={hintId} error={error} errorId={errorId} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  hint,
  defaultValue = "",
  placeholder = "Choisir…",
  onValueChange,
  submitName,
  disabled,
}: {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  hint?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Appelé à chaque changement de valeur. */
  onValueChange?: (value: string) => void;
  /** Nom envoyé au serveur s'il diffère de `name` (ex. choix « Autre » remplacé par un champ libre). */
  submitName?: string;
  disabled?: boolean;
}) {
  const { id, error, clearError, errorId, hintId } = useField(name);
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={submitName ?? name}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, hintId, errorId)}
          onChange={(e) => {
            if (error) clearError(name);
            onValueChange?.(e.target.value);
          }}
          className={`${inputBase} appearance-none pr-11 disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <FieldMessages hint={hint} hintId={hintId} error={error} errorId={errorId} />
    </div>
  );
}

/** Choix en "tuiles" (radios natives) : gros boutons tactiles, clavier natif. */
export function ChoiceGroup({
  name,
  legend,
  options,
  required,
  hint,
  defaultValue,
  columns = 2,
}: {
  name: string;
  legend: string;
  options: Option[];
  required?: boolean;
  hint?: string;
  defaultValue?: string;
  columns?: 2 | 3 | 4;
}) {
  const { id, error, clearError, errorId, hintId } = useField(name);
  const cols = columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <fieldset aria-describedby={describedBy(hint, error, hintId, errorId)} aria-invalid={error ? true : undefined}>
      <legend className="mb-1.5 font-semibold">
        {legend}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="text-sm font-normal text-muted"> (facultatif)</span>
        )}
      </legend>
      <div className={`grid grid-cols-2 gap-2 ${cols}`}>
        {options.map((o, i) => {
          const oid = `${id}-${o.value}`;
          return (
            <div key={o.value} className="relative">
              <input
                type="radio"
                id={oid}
                name={name}
                value={o.value}
                required={required && i === 0}
                defaultChecked={defaultValue === o.value}
                onChange={() => error && clearError(name)}
                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <label
                htmlFor={oid}
                className={`flex h-full min-h-12 cursor-pointer flex-col justify-center rounded-xl border-2 bg-paper px-3.5 py-2.5 text-[0.95rem] font-semibold leading-snug peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
                  error ? "border-danger" : "border-line"
                }`}
              >
                {o.label}
                {o.hint ? <span className="mt-0.5 text-xs font-normal text-muted">{o.hint}</span> : null}
              </label>
            </div>
          );
        })}
      </div>
      <FieldMessages hint={hint} hintId={hintId} error={error} errorId={errorId} />
    </fieldset>
  );
}

const ACCEPTED = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif";

/** Réduit une photo (max 1600 px, JPEG) quand le navigateur sait la décoder. */
async function shrink(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || typeof createImageBitmap !== "function") return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 900_000) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function mb(bytes: number) {
  return `${(bytes / 1024 / 1024).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
}

export function PhotoField({
  name = "photos",
  label,
  hint,
  maxFiles,
  maxFileBytes,
  maxTotalBytes,
}: {
  name?: string;
  label: string;
  hint?: string;
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
}) {
  const { id, error, clearError, errorId, hintId } = useField(name);
  const { setFiles } = useFormCtx();
  const [items, setItems] = useState<{ file: File; url: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  const files = items.map((i) => i.file);

  // Libère les aperçus à la fermeture du composant.
  useEffect(() => () => itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url)), []);

  const commit = (next: { file: File; url: string }[]) => {
    items.filter((i) => !next.includes(i)).forEach((i) => URL.revokeObjectURL(i.url));
    setItems(next);
    setFiles(name, next.map((i) => i.file));
  };

  const onPick = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setLocalError(null);
    if (error) clearError(name);
    setBusy(true);
    const picked = await Promise.all(Array.from(list).map(shrink));
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    const next = [...files, ...picked];
    if (next.length > maxFiles) {
      setLocalError(`${maxFiles} photos maximum.`);
      return;
    }
    const tooBig = picked.find((f) => f.size > maxFileBytes);
    if (tooBig) {
      setLocalError(`« ${tooBig.name} » dépasse ${mb(maxFileBytes)}, même après réduction. Choisissez une autre photo.`);
      return;
    }
    const total = next.reduce((s, f) => s + f.size, 0);
    if (total > maxTotalBytes) {
      setLocalError(`L'ensemble dépasse ${mb(maxTotalBytes)}. Retirez une photo.`);
      return;
    }
    commit([...items, ...picked.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
  };

  const shown = localError ?? error;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {hint ? (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <label
        htmlFor={id}
        className="flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ink/25 bg-surface px-4 py-4 font-semibold hover:border-brand has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-signal"
      >
        <CameraIcon className="h-6 w-6 text-brand" />
        {busy ? "Préparation des photos…" : files.length ? "Ajouter une autre photo" : "Prendre ou choisir des photos"}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={ACCEPTED}
          multiple
          className="sr-only"
          aria-describedby={describedBy(hint, shown ?? undefined, hintId, errorId)}
          onChange={(e) => onPick(e.target.files)}
        />
      </label>
      <p className="mt-1.5 text-xs text-muted">
        {maxFiles} photos maximum · JPEG, PNG, WebP ou HEIC · les photos sont allégées automatiquement.
      </p>
      {files.length ? (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.url} className="relative overflow-hidden rounded-lg ring-1 ring-line">
              {/* Aperçu local (blob) : next/image n'est pas adapté ici. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.url} alt={`Photo ${i + 1} sélectionnée`} className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => commit(items.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 rounded-md bg-ink/85 px-2 py-1 text-xs font-bold text-white"
                aria-label={`Retirer la photo ${i + 1}`}
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {shown ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-semibold text-danger">
          {shown}
        </p>
      ) : null}
    </div>
  );
}
