#!/usr/bin/env node
/**
 * Parcours navigateur des formulaires (Playwright, non installé par défaut) :
 *
 *   BASE_URL=http://localhost:3000 PLAYWRIGHT_MODULE=playwright node scripts/e2e-forms.mjs
 *
 * Redémarrer le serveur avant chaque passage : la limitation de débit en mémoire
 * (6 envois / 10 min / IP) bloquerait sinon les envois suivants.
 * Suppose un serveur SANS transport configuré (cas "service absent"). Les cas
 * "succès" et "erreurs par champ" sont simulés en interceptant /api/demandes.
 */

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");

const results = [];
const check = (ok, label) => results.push({ ok: Boolean(ok), label });

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

async function fillPickup(p) {
  await p.fill('[name="postalCode"]', "13005");
  await p.fill('[name="city"]', "Marseille");
  await p.selectOption('select[name="brand"]', "Peugeot");
  await p.selectOption('select[name="model"]', "206");
  await p.check('[name="condition"][value="panne"]', { force: true });
  await p.click("button[type=submit]");
  await p.check('[name="wheels"][value="oui"]', { force: true });
  await p.check('[name="keys"][value="oui"]', { force: true });
  await p.check('[name="movable"][value="non"]', { force: true });
  await p.check('[name="access"][value="sous-sol"]', { force: true });
  await p.click("button[type=submit]");
  await p.check('[name="registrationDoc"][value="oui"]', { force: true });
  await p.check('[name="holder"][value="moi"]', { force: true });
  await p.fill('[name="name"]', "Client Test");
  await p.fill('[name="phone"]', "06 12 34 56 78");
}

// 1. Validation par étape : impossible de passer l'étape 1 vide
await page.goto(`${BASE}/enlevement-epave`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000); // dépasse le délai anti-robot
await page.click("button[type=submit]");
const step2Visible = await page.isVisible('[name="wheels"][value="oui"] >> xpath=..');
check(!step2Visible, "étape 1 vide : on reste sur l'étape 1");
const focused = await page.evaluate(() => document.activeElement?.getAttribute("name"));
check(focused === "postalCode", `focus sur le premier champ invalide (${focused})`);

// 2. Service absent : message explicite, champs conservés, pas de succès
await fillPickup(page);
await page.click("button[type=submit]");
await page.waitForSelector('form [role="alert"]');
const alertText = await page.textContent('form [role="alert"]'); if (process.env.DEBUG) console.log("alerte :", alertText);
check(/pas encore disponible|n'a pas été transmise/.test(alertText ?? ""), "service absent : message d'indisponibilité");
check((await page.inputValue('[name="name"]')) === "Client Test", "service absent : champs conservés");
check(!(await page.isVisible("text=Votre demande a été transmise")), "service absent : aucun faux succès");

// 3. Fichier refusé (contenu non image renommé en .jpg)
await page.goto(`${BASE}/demande-piece`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.selectOption('select[name="brand"]', "Renault");
await page.selectOption('select[name="model"]', "Clio");
await page.click("button[type=submit]");
await page.fill('[name="partName"]', "Alternateur");
await page.setInputFiles('input[type=file]', {
  name: "faux.jpg",
  mimeType: "image/jpeg",
  buffer: Buffer.from("ceci n'est pas une image, mais un texte assez long"),
});
await page.click("button[type=submit]");
await page.fill('[name="name"]', "Client");
await page.fill('[name="email"]', "client@test.invalid");
await page.click("button[type=submit]");
await page.waitForSelector('form [role="alert"]');
check(/n'est pas une photo acceptée/.test((await page.textContent('form [role="alert"]')) ?? ""), "fichier non image refusé par le serveur");

// 3 bis. Sélecteurs véhicule : « Autre marque » ouvre un champ libre envoyé sous le nom "brand"
await page.goto(`${BASE}/rachat-vehicule`, { waitUntil: "networkidle" });
check(await page.isDisabled('select[name="model"]'), "modèle désactivé tant que la marque n'est pas choisie");
await page.selectOption('select[name="brand"]', "Dacia");
const daciaModels = await page.locator('select[name="model"] option').allTextContents();
check(daciaModels.includes("Sandero"), "modèles proposés selon la marque (Dacia → Sandero)");
await page.selectOption('select[name="brandChoice"], select[name="brand"]', "__autre");
check(await page.isVisible('input[name="brand"]'), "« Autre marque » ouvre un champ libre");
check(await page.isVisible('input[name="model"]'), "modèle en champ libre si la marque est « Autre »");

// 4. Succès simulé : affiché seulement sur réponse "accepted/sent"
await page.route("**/api/demandes", (route) =>
  route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ status: "accepted", mode: "sent", formType: "contact" }) }),
);
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.fill('[name="name"]', "Client");
await page.fill('[name="email"]', "client@test.invalid");
await page.fill('[name="message"]', "Bonjour");
await page.click("button[type=submit]");
await page.waitForSelector('[role="status"]');
check(await page.isVisible("text=Votre message a été transmis"), "succès affiché après acceptation du transport");

// 5. Erreurs par champ renvoyées par le serveur
await page.unroute("**/api/demandes");
await page.route("**/api/demandes", (route) =>
  route.fulfill({
    status: 422,
    contentType: "application/json",
    body: JSON.stringify({ status: "invalid", message: "Certains champs sont à corriger.", fieldErrors: { email: "Adresse e-mail invalide." } }),
  }),
);
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.fill('[name="name"]', "Client");
await page.fill('[name="email"]', "client@test.invalid");
await page.fill('[name="message"]', "Bonjour");
await page.click("button[type=submit]");
await page.waitForSelector("text=Adresse e-mail invalide.");
check((await page.getAttribute('[name="email"]', "aria-invalid")) === "true", "erreur serveur liée au champ (aria-invalid)");
check((await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "email", "focus sur le champ en erreur");

// 6. Clavier : lien d'évitement en premier
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
check((await page.evaluate(() => document.activeElement?.textContent)) === "Aller au contenu", "premier Tab : lien « Aller au contenu »");

// 7. Bouton d'appel flottant masqué pendant la saisie
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
const fab = page.locator('a.call-fab');
check(await fab.isVisible(), "bouton d'appel flottant visible sur mobile");
await page.focus('[name="name"]');
await page.waitForTimeout(400);
check((await fab.evaluate((el) => getComputedStyle(el).opacity)) === "0", "bouton flottant retiré pendant la saisie");

await browser.close();
for (const r of results) console.log(r.ok ? "✓" : "✗", r.label);
if (results.some((r) => !r.ok)) process.exit(1);
