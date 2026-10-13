"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import { FormContext } from "./context";

/**
 * Coque commune des formulaires de demande :
 * - étapes facultatives (les champs restent dans le DOM : rien n'est perdu),
 * - envoi `fetch` vers /api/demandes, ou envoi HTML classique sans JavaScript,
 * - erreurs serveur affichées sur les champs, focus sur la première erreur,
 * - succès affiché UNIQUEMENT si le service de transmission a accepté l'envoi.
 */

export interface Step {
  title: string;
  content: React.ReactNode;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "success"; mode: "sent" | "demo" };

interface ServerResponse {
  status: string;
  mode?: "sent" | "demo";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export function FormShell({
  formType,
  sector,
  pagePath,
  steps,
  submitLabel,
  successTitle,
  successText,
  privacyNote = true,
}: {
  formType: string;
  sector?: string;
  pagePath: string;
  steps: Step[];
  submitLabel: string;
  successTitle: string;
  successText: string;
  privacyNote?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const filesRef = useRef<Record<string, File[]>>({});
  const startTracked = useRef(false);
  const idPrefix = useId().replace(/:/g, "");
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Avant hydratation (ou sans JavaScript) : toutes les étapes sont visibles et
  // la validation native du navigateur s'applique.
  const enhanced = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const multi = steps.length > 1;
  const last = step === steps.length - 1;

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  const clearError = useCallback((name: string) => {
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });
  }, []);
  const setFiles = useCallback((field: string, files: File[]) => {
    filesRef.current[field] = files;
  }, []);
  const ctx = useMemo(() => ({ errors, clearError, setFiles, idPrefix }), [errors, clearError, setFiles, idPrefix]);

  const stepEl = (i: number) => formRef.current?.querySelector<HTMLElement>(`[data-step="${i}"]`);

  const validateStep = (i: number) => {
    const el = stepEl(i);
    if (!el) return true;
    const fields = Array.from(el.querySelectorAll<HTMLInputElement>("input, select, textarea"));
    const invalid = fields.find((f) => !f.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return false;
    }
    return true;
  };

  const goTo = (i: number) => {
    setStep(i);
    requestAnimationFrame(() => {
      const heading = stepEl(i)?.querySelector<HTMLElement>("[data-step-title]");
      heading?.focus();
      formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const onFirstInput = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track("form_start", { form_type: formType, page_path: pagePath });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (multi && !last && enhanced) {
      if (validateStep(step)) goTo(step + 1);
      return;
    }
    if (!validateStep(step)) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    for (const [field, files] of Object.entries(filesRef.current)) {
      fd.delete(field);
      files.forEach((f) => fd.append(field, f, f.name));
    }

    setStatus({ kind: "sending" });
    let data: ServerResponse | null = null;
    try {
      const res = await fetch(form.action, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      data = (await res.json().catch(() => null)) as ServerResponse | null;
      if (res.status === 413 && !data) {
        data = { status: "rejected-file", message: "Les photos sont trop lourdes pour être envoyées. Retirez-en une." };
      }
    } catch {
      data = null;
    }

    if (data?.status === "accepted" && (data.mode === "sent" || data.mode === "demo")) {
      setStatus({ kind: "success", mode: data.mode });
      track("form_submit_accepted", { form_type: formType, page_path: pagePath });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    const kind = data?.status ?? "network";
    track("form_submit_error", { form_type: formType, page_path: pagePath, error_kind: kind });

    if (data?.status === "invalid" && data.fieldErrors && Object.keys(data.fieldErrors).length) {
      setErrors(data.fieldErrors);
      setStatus({ kind: "error", message: data.message ?? "Certains champs sont à corriger." });
      const first = Object.keys(data.fieldErrors)[0];
      const field = form.querySelector<HTMLElement>(`[name="${CSS.escape(first)}"]`);
      const stepIndex = Number(field?.closest<HTMLElement>("[data-step]")?.dataset.step ?? step);
      setStep(stepIndex);
      requestAnimationFrame(() => field?.focus());
      return;
    }

    const message =
      data?.message ??
      (kind === "rate-limited"
        ? "Trop de demandes envoyées en peu de temps. Patientez quelques minutes ou appelez-nous."
        : kind === "spam"
          ? "La demande n'a pas pu être validée. Réessayez dans quelques secondes."
          : "La connexion a échoué. Vos informations sont conservées : vérifiez votre réseau et réessayez.");
    setStatus({ kind: "error", message });
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={`rounded-3xl border-2 p-6 sm:p-8 ${status.mode === "demo" ? "border-ink/20 bg-surface" : "border-brand bg-brand-soft"}`}
      >
        {status.mode === "demo" ? (
          <>
            <p className="text-xl font-bold">Mode démonstration : rien n&apos;a été transmis</p>
            <p className="mt-2">
              Le formulaire a été validé, mais aucun service d&apos;envoi n&apos;est configuré sur cet
              environnement local. Aucune demande n&apos;a été envoyée à l&apos;entreprise.
            </p>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2 text-xl font-bold text-brand-deep">
              <CheckIcon className="h-7 w-7" /> {successTitle}
            </p>
            <p className="mt-2 leading-relaxed">{successText}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <FormContext.Provider value={ctx}>
      <form
        ref={formRef}
        action="/api/demandes"
        method="post"
        encType="multipart/form-data"
        noValidate={enhanced}
        onSubmit={onSubmit}
        onInput={onFirstInput}
        className="scroll-mt-24"
        aria-busy={status.kind === "sending"}
      >
        <input type="hidden" name="formType" value={formType} />
        <input type="hidden" name="sector" value={sector ?? ""} />
        <input type="hidden" name="pagePath" value={pagePath} />
        <input ref={startedRef} type="hidden" name="startedAt" defaultValue="0" />
        {/* Champ piège anti-robots : invisible et ignoré par les lecteurs d'écran. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Ne pas remplir
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {multi && enhanced ? (
          <ol className="mb-6 flex gap-2" aria-label="Étapes du formulaire">
            {steps.map((s, i) => (
              <li key={s.title} className="flex-1">
                <span
                  aria-current={i === step ? "step" : undefined}
                  className={`block h-1.5 rounded-full ${i <= step ? "bg-ink" : "bg-line"}`}
                />
                <span className={`mt-2 block text-xs font-semibold ${i === step ? "text-ink" : "text-muted"}`}>
                  <span className="sr-only">Étape {i + 1} sur {steps.length} : </span>
                  <span aria-hidden="true">{i + 1}. </span>
                  {s.title}
                </span>
              </li>
            ))}
          </ol>
        ) : null}

        {steps.map((s, i) => (
          <fieldset
            key={s.title}
            data-step={i}
            hidden={enhanced && multi && i !== step}
            className="space-y-5"
          >
            {multi ? (
              <legend className="contents">
                <span data-step-title tabIndex={-1} className="mb-4 block text-xl font-bold focus:outline-none">
                  {s.title}
                </span>
              </legend>
            ) : null}
            {s.content}
          </fieldset>
        ))}

        <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
          {status.kind === "error" ? (
            <div role="alert" className="mt-6 flex gap-3 rounded-xl border-l-4 border-danger bg-danger-soft p-4">
              <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
              <p className="font-semibold">{status.message}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {enhanced && multi && step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="btn btn-outline"
            >
              Retour
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="btn btn-lime min-h-13 px-7 text-lg disabled:cursor-wait disabled:opacity-70"
          >
            {status.kind === "sending" ? (
              <>
                <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Envoi en cours…
              </>
            ) : enhanced && multi && !last ? (
              "Continuer"
            ) : (
              submitLabel
            )}
          </button>
        </div>

        {privacyNote ? (
          <p className="mt-5 text-xs leading-relaxed text-muted">
            Les informations transmises servent uniquement à traiter votre demande. Aucun document
            d&apos;identité n&apos;est demandé en ligne. Voir la{" "}
            <a href="/confidentialite" className="underline">
              politique de confidentialité
            </a>
            .
          </p>
        ) : null}
      </form>
    </FormContext.Provider>
  );
}

const noopSubscribe = () => () => {};
