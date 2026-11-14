import { describe, expect, it } from "vitest";
import { fillTemplate, fromLocalInput, toLocalInput, whatsappNumber, type Demande } from "@/lib/admin/demandes";

describe("dates de rendez-vous (heure de Paris)", () => {
  it("convertit une saisie d'hiver (UTC+1)", () => {
    expect(fromLocalInput("2026-01-15T14:30")).toBe("2026-01-15T13:30:00.000Z");
  });
  it("convertit une saisie d'été (UTC+2)", () => {
    expect(fromLocalInput("2026-07-15T14:30")).toBe("2026-07-15T12:30:00.000Z");
  });
  it("fait l'aller-retour", () => {
    expect(toLocalInput("2026-07-15T12:30:00.000Z")).toBe("2026-07-15T14:30");
  });
  it("refuse une saisie invalide", () => {
    expect(fromLocalInput("demain")).toBeNull();
  });
});

describe("messages types", () => {
  const d = { contact_name: "Jean Dupont", city: "Marseille", brand: "Renault", model: "Clio", rdv_at: null } as Demande;
  it("remplace les mots magiques", () => {
    expect(fillTemplate("Bonjour {prenom} ({nom}), {vehicule} à {ville}, le {date_rdv}", d)).toBe(
      "Bonjour Jean (Jean Dupont), Renault Clio à Marseille, le (date à définir)",
    );
  });
  it("prépare le numéro WhatsApp", () => {
    expect(whatsappNumber("06 12 34 56 78")).toBe("33612345678");
    expect(whatsappNumber("+33 6 12 34 56 78")).toBe("33612345678");
    expect(whatsappNumber(null)).toBeNull();
  });
});

import { computeTotals, marge, parseAmount } from "@/lib/admin/argent";

describe("argent", () => {
  it("calcule les totaux d'une facture", () => {
    const t = computeTotals([
      { label: "Enlèvement", qty: 1, unit_ht: 100, tva: 20 },
      { label: "Frais d'accès", qty: 2, unit_ht: 12.5, tva: 20 },
      { label: "", qty: 1, unit_ht: 999, tva: 20 },
    ]);
    expect(t.lines).toHaveLength(2);
    expect(t).toMatchObject({ total_ht: 125, total_tva: 25, total_ttc: 150 });
  });
  it("lit les montants à la française", () => {
    expect(parseAmount("1 200,50")).toBe(1200.5);
    expect(parseAmount("")).toBeNull();
  });
  it("calcule la marge d'un rachat", () => {
    expect(marge({ prix_achat: 300, frais: 50, revente_pieces: 400, revente_metal: 120 })).toBe(170);
  });
});
