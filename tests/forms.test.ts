import { describe, expect, it, vi } from "vitest";
import { processRequest } from "@/lib/forms/process";
import { sniffImageType } from "@/lib/forms/files";
import { resolveTransport } from "@/lib/forms/transport";

const NOW = 1_800_000_000_000;
const RESEND_ENV = {
  SITE_ENV: "production",
  FORM_TRANSPORT: "resend",
  RESEND_API_KEY: "re_test",
  FORM_TO_EMAIL: "demandes@exemple.test",
  FORM_FROM_EMAIL: "site@exemple.test",
};

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 1]);

function pickupForm(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const fields: Record<string, string> = {
    formType: "enlevement",
    sector: "marseille",
    pagePath: "/zones-intervention/marseille",
    startedAt: String(NOW - 60_000),
    website: "",
    postalCode: "13005",
    city: "Marseille",
    brand: "Peugeot",
    model: "206",
    condition: "panne",
    wheels: "oui",
    keys: "oui",
    movable: "non",
    access: "sous-sol",
    registrationDoc: "oui",
    holder: "moi",
    name: "Client Test",
    phone: "06 12 34 56 78",
    ...overrides,
  };
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

function okFetch() {
  return vi.fn(async () => new Response(JSON.stringify({ id: "msg_1" }), { status: 200 })) as unknown as typeof fetch;
}

describe("transport", () => {
  it("refuse le mode démonstration hors développement", () => {
    expect(resolveTransport({ FORM_TRANSPORT: "demo", SITE_ENV: "production" }).kind).toBe("unconfigured");
    expect(resolveTransport({ FORM_TRANSPORT: "demo", SITE_ENV: "preview" }).kind).toBe("unconfigured");
    expect(resolveTransport({ FORM_TRANSPORT: "demo", SITE_ENV: "development" }).kind).toBe("demo");
  });

  it("signale les variables manquantes", () => {
    const t = resolveTransport({ FORM_TRANSPORT: "resend", RESEND_API_KEY: "x" });
    expect(t.kind).toBe("unconfigured");
    if (t.kind === "unconfigured") expect(t.reason).toContain("FORM_TO_EMAIL");
  });
});

describe("traitement des demandes", () => {
  it("n'affiche jamais de succès quand le service d'envoi est absent", async () => {
    const r = await processRequest(pickupForm(), { env: { SITE_ENV: "production" }, now: NOW });
    expect(r.status).toBe("unavailable");
  });

  it("accepte uniquement après acceptation par le prestataire, avec un contenu exploitable", async () => {
    const fetchImpl = okFetch();
    const r = await processRequest(pickupForm(), { env: RESEND_ENV, now: NOW, fetchImpl });
    expect(r).toMatchObject({ status: "accepted", mode: "sent", formType: "enlevement" });
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.to).toEqual(["demandes@exemple.test"]);
    expect(body.subject).toContain("Enlèvement");
    expect(body.subject).toContain("13005 Marseille");
    expect(body.text).toContain("Secteur d'origine : marseille");
    expect(body.text).toContain("Accès : Sous-sol");
    expect((init as RequestInit).headers).toMatchObject({ Authorization: "Bearer re_test" });
  });

  it("renvoie une erreur (et pas un succès) si le prestataire refuse", async () => {
    const fetchImpl = vi.fn(async () => new Response("quota", { status: 500 })) as unknown as typeof fetch;
    const r = await processRequest(pickupForm(), { env: RESEND_ENV, now: NOW, fetchImpl });
    expect(r.status).toBe("failed");
  });

  it("renvoie une erreur si le réseau échoue", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("ECONNRESET");
    }) as unknown as typeof fetch;
    const r = await processRequest(pickupForm(), { env: RESEND_ENV, now: NOW, fetchImpl });
    expect(r.status).toBe("failed");
  });

  it("retourne les erreurs par champ", async () => {
    const r = await processRequest(pickupForm({ phone: "123", postalCode: "13" , brand: "" }), {
      env: RESEND_ENV,
      now: NOW,
      fetchImpl: okFetch(),
    });
    expect(r.status).toBe("invalid");
    if (r.status === "invalid") {
      expect(Object.keys(r.fieldErrors)).toEqual(expect.arrayContaining(["phone", "postalCode", "brand"]));
    }
  });

  it("bloque le champ piège et les envois trop rapides", async () => {
    expect((await processRequest(pickupForm({ website: "http://spam" }), { env: RESEND_ENV, now: NOW })).status).toBe("spam");
    expect((await processRequest(pickupForm({ startedAt: String(NOW - 500) }), { env: RESEND_ENV, now: NOW })).status).toBe("spam");
  });

  it("exige un nom de pièce ou une description, et un moyen de contact", async () => {
    const fd = new FormData();
    for (const [k, v] of Object.entries({
      formType: "piece",
      startedAt: String(NOW - 60_000),
      brand: "Renault",
      model: "Clio",
      name: "Client",
    }))
      fd.append(k, v);
    const r = await processRequest(fd, { env: RESEND_ENV, now: NOW, fetchImpl: okFetch() });
    expect(r.status).toBe("invalid");
    if (r.status === "invalid") expect(Object.keys(r.fieldErrors)).toEqual(expect.arrayContaining(["partDescription", "phone"]));
  });

  it("refuse un fichier dont le contenu n'est pas une image, quel que soit son nom", async () => {
    const fd = pickupForm();
    fd.append("photos", new File([new TextEncoder().encode("<?php echo 1; ?> padding....")], "photo.jpg", { type: "image/jpeg" }));
    const r = await processRequest(fd, { env: RESEND_ENV, now: NOW, fetchImpl: okFetch() });
    expect(r.status).toBe("rejected-file");
  });

  it("refuse un fichier trop lourd et un nombre de photos excessif", async () => {
    const big = new Uint8Array(2 * 1024 * 1024);
    big.set(JPEG);
    const fd = pickupForm();
    fd.append("photos", new File([big], "a.jpg", { type: "image/jpeg" }));
    const r = await processRequest(fd, { env: { ...RESEND_ENV, FORM_MAX_FILE_MB: "1" }, now: NOW, fetchImpl: okFetch() });
    expect(r.status).toBe("rejected-file");

    const fd2 = pickupForm();
    for (let i = 0; i < 5; i++) fd2.append("photos", new File([JPEG], `p${i}.jpg`, { type: "image/jpeg" }));
    const r2 = await processRequest(fd2, { env: RESEND_ENV, now: NOW, fetchImpl: okFetch() });
    expect(r2.status).toBe("rejected-file");
  });

  it("joint les photos valides avec un nom neutre", async () => {
    const fetchImpl = okFetch();
    const fd = pickupForm();
    fd.append("photos", new File([JPEG], "IMG_famille_dupont.jpg", { type: "image/jpeg" }));
    const r = await processRequest(fd, { env: RESEND_ENV, now: NOW, fetchImpl });
    expect(r.status).toBe("accepted");
    const body = JSON.parse(((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit).body as string);
    expect(body.attachments).toHaveLength(1);
    expect(body.attachments[0].filename).toBe("photo-1.jpg");
  });

  it("refuse les fichiers sur un formulaire qui n'en accepte pas", async () => {
    const fd = new FormData();
    for (const [k, v] of Object.entries({
      formType: "contact",
      startedAt: String(NOW - 60_000),
      name: "Client",
      email: "client@exemple.test",
      message: "Bonjour",
    }))
      fd.append(k, v);
    fd.append("photos", new File([JPEG], "x.jpg", { type: "image/jpeg" }));
    const r = await processRequest(fd, { env: RESEND_ENV, now: NOW, fetchImpl: okFetch() });
    expect(r.status).toBe("rejected-file");
  });

  it("ignore un chemin d'origine contenant des paramètres (pas de donnée personnelle via l'URL)", async () => {
    const fetchImpl = okFetch();
    await processRequest(pickupForm({ pagePath: "/contact?email=a@b.c" }), { env: RESEND_ENV, now: NOW, fetchImpl });
    const body = JSON.parse(((fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit).body as string);
    expect(body.text).toContain("Page d'origine : inconnue");
  });
});

describe("détection du type réel des fichiers", () => {
  it("reconnaît JPEG, PNG, WebP, HEIC et rejette le reste", () => {
    expect(sniffImageType(JPEG)).toBe("image/jpeg");
    expect(sniffImageType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]))).toBe("image/png");
    expect(sniffImageType(new TextEncoder().encode("RIFF\0\0\0\0WEBPVP8 "))).toBe("image/webp");
    expect(sniffImageType(new TextEncoder().encode("\0\0\0\x18ftypheic\0\0"))).toBe("image/heic");
    expect(sniffImageType(new TextEncoder().encode("%PDF-1.7 xxxxxxx"))).toBeNull();
  });
});
