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

describe("prospection", () => {
  it("remplit un modèle d'e-mail", async () => {
    const { fillProspect } = await import("@/lib/prospection/email");
    const p = { name: "Garage Martin", city: "Aubagne", naf: "45.20A", dirigeant: "Paul Martin", contact_name: null };
    expect(fillProspect("Bonjour{dirigeant}, {entreprise} à {ville}", p)).toBe("Bonjour Paul Martin, Garage Martin à Aubagne");
    expect(fillProspect("{accroche}", p)).toContain("répare des véhicules");
    expect(fillProspect("Bonjour{dirigeant},", { ...p, dirigeant: null })).toBe("Bonjour,");
  });
  it("construit le lien de désinscription", async () => {
    const { unsubscribeUrl } = await import("@/lib/prospection/stages");
    expect(unsubscribeUrl("https://www.ecocarvhu.fr/", "abc")).toBe("https://www.ecocarvhu.fr/api/desinscription/abc");
  });
});

describe("visibilité", () => {
  it("compare les recherches sans accents", async () => {
    const { normalize } = await import("@/lib/visibilite/gsc");
    expect(normalize("Épaviste  Aix-en-Provence")).toBe(normalize("epaviste aix en provence"));
  });
  it("calcule deux périodes de 28 jours avant le retard de Google", async () => {
    const { periods } = await import("@/lib/visibilite/gsc");
    const p = periods(Date.UTC(2026, 10, 14, 12));
    expect(p.current).toEqual({ startDate: "2026-10-15", endDate: "2026-11-11" });
    expect(p.previous).toEqual({ startDate: "2026-09-17", endDate: "2026-10-14" });
  });
  it("signe le jeton Google avec la clé du compte de service", async () => {
    const { generateKeyPairSync, createVerify } = await import("node:crypto");
    const { signedAssertion, gscConfig } = await import("@/lib/visibilite/gsc");
    const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const account = { client_email: "x@y.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }).toString() };
    const jwt = signedAssertion(account, 1000);
    const [h, c, sig] = jwt.split(".");
    expect(JSON.parse(Buffer.from(c, "base64url").toString()).scope).toContain("webmasters.readonly");
    const v = createVerify("RSA-SHA256");
    v.update(`${h}.${c}`);
    expect(v.verify(publicKey, Buffer.from(sig, "base64url"))).toBe(true);
    const b64 = Buffer.from(JSON.stringify(account)).toString("base64");
    expect(gscConfig({ GSC_SERVICE_ACCOUNT: b64 })?.site).toBe("sc-domain:ecocarvhu.fr");
    expect(gscConfig({ GSC_SERVICE_ACCOUNT: "pas du json" })).toBeNull();
  });
  it("prépare un plan à compléter, qu'on ne peut pas valider en l'état", async () => {
    const { contentTemplate, countToConfirm } = await import("@/lib/visibilite/content");
    const t = contentTemplate("ville", "Gardanne", "");
    expect(t.title).toBe("Enlèvement d'épave gratuit à Gardanne");
    expect(countToConfirm(t.body)).toBeGreaterThan(0);
    expect(countToConfirm("Texte final relu.")).toBe(0);
  });
});
