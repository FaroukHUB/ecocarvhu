"use client";

import { createContext, useContext } from "react";

export interface FormCtx {
  errors: Record<string, string>;
  clearError: (name: string) => void;
  /** Fichiers préparés (réduits) par le champ photo, envoyés à la place de l'input natif. */
  setFiles: (field: string, files: File[]) => void;
  idPrefix: string;
}

export const FormContext = createContext<FormCtx>({
  errors: {},
  clearError: () => {},
  setFiles: () => {},
  idPrefix: "f",
});

export const useFormCtx = () => useContext(FormContext);
