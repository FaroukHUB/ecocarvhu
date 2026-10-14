#!/usr/bin/env node
/**
 * Contrôle du HTML rendu par un serveur en marche (`next start`).
 *
 *   BASE_URL=http://localhost:3000 EXPECT=production SITE_URL=https://www.domaine.fr node scripts/check-site.mjs
 *
 * EXPECT=production : vérifie indexabilité, canonicals, sitemap, absence de brouillons.
 * EXPECT=preview    : vérifie noindex partout, robots.txt bloquant, sitemap vide.
 *
 * Vérifie aussi : un H1 par page, title/description, liens internes sans 404,
 * vrais 404, JSON-LD valide, absence de valeurs de démonstration.
 */

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const EXPECT = process.env.EXPECT ?? "preview";
const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/$/, "");

const CORE_PATHS = [
  "/",
  "/enlevement-epave",
  "/centre-vhu",
  "/pieces-auto-occasion",
  "/demande-piece",
  "/rachat-vehicule",
  "/professionnels",
  "/contact",
  "/zones-intervention",
  "/mentions-legales",
  "/confidentialite",
  "/conditions",
  "/blog",
  "/blog/enlevement-epave-gratuit-paca",
  "/blog/documents-enlevement-epave-paca",
  "/blog/vendre-voiture-en-panne",
];
const SECTOR_PATHS = [
  "/zones-intervention/paca",
  "/zones-intervention/marseille",
  "/zones-intervention/aubagne",
  "/zones-intervention/la-ciotat",
  "/zones-intervention/cassis",
  "/zones-intervention/nice",
];
const DRAFT_PATHS = [
  "/blog/enlevement-acces-difficile",
];
const FORBIDDEN = [/lorem ipsum/i, /01 23 45 67 89/, /exemple\.(com|fr)/i, /aggregateRating/, /"@type":"LocalBusiness"/];

const failures = [];
const fail = (msg) => failures.push(msg);
const passes = [];
const pass = (msg) => passes.push(msg);

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = await res.text();
  return { status: res.status, body, headers: res.headers };
}

const attr = (html, re) => (html.match(re) ?? [])[1];

function analyse(path, html) {
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`${path} : ${h1} balise(s) H1`);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) fail(`${path} : pas de <title>`);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!desc && !path.startsWith("/demande/")) fail(`${path} : pas de meta description`);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) ?? "";
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  if (!/lang="fr"/.test(html)) fail(`${path} : attribut lang="fr" absent`);
  for (const re of FORBIDDEN) if (re.test(html)) fail(`${path} : contenu interdit ${re}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(`${path} : JSON-LD invalide`);
    }
  }
  const links = [...html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]);
  return { title, robots, canonical, links };
}

async function main() {
  const allLinks = new Set();

  const pagesToCheck = EXPECT === "production" ? [...CORE_PATHS, ...SECTOR_PATHS] : [...CORE_PATHS, ...SECTOR_PATHS, ...DRAFT_PATHS];
  for (const path of pagesToCheck) {
    const { status, body } = await get(path);
    if (status !== 200) {
      fail(`${path} : statut ${status}`);
      continue;
    }
    const info = analyse(path, body);
    info.links.forEach((l) => allLinks.add(l));
    const legalDraft = ["/mentions-legales", "/confidentialite", "/conditions"].includes(path);
    if (EXPECT === "production") {
      if (legalDraft) {
        if (!/noindex/.test(info.robots)) fail(`${path} : page légale provisoire indexable`);
      } else {
        if (/noindex/.test(info.robots)) fail(`${path} : noindex en production`);
        const expected = path === "/" ? `${SITE_URL}` : `${SITE_URL}${path}`;
        if (!info.canonical || info.canonical.replace(/\/$/, "") !== expected.replace(/\/$/, ""))
          fail(`${path} : canonical ${info.canonical} ≠ ${expected}`);
      }
    } else if (!/noindex/.test(info.robots)) {
      fail(`${path} : pas de noindex en prévisualisation`);
    }
  }
  pass(`${pagesToCheck.length} pages analysées`);

  if (EXPECT === "production") {
    for (const path of DRAFT_PATHS) {
      const { status } = await get(path);
      if (status !== 404) fail(`${path} : brouillon accessible en production (statut ${status})`);
    }
    pass("brouillons non accessibles en production");
  }

  // Liens internes : aucun lien vers une page inexistante.
  for (const link of allLinks) {
    const { status } = await get(link);
    if (status >= 400) fail(`lien interne cassé ou vers un brouillon : ${link} (${status})`);
  }
  pass(`${allLinks.size} liens internes vérifiés`);

  // Vrai 404
  const missing = await get("/page-qui-n-existe-pas");
  if (missing.status !== 404) fail(`route inexistante : statut ${missing.status} au lieu de 404`);
  for (const p of ["/zones-intervention/ville-inconnue", "/blog/inconnu", "/demande/resultat/xyz", "/enlevement-epave/x"]) {
    const r = await get(p);
    if (r.status !== 404) fail(`${p} : statut ${r.status} au lieu de 404`);
  }
  pass("404 réels");

  // robots.txt + sitemap
  const robots = await get("/robots.txt");
  const sitemap = await get("/sitemap.xml");
  const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (EXPECT === "production") {
    if (/Disallow: \/\s*$/m.test(robots.body)) fail("robots.txt bloque tout le site en production");
    if (!robots.body.includes(`${SITE_URL}/sitemap.xml`)) fail("robots.txt sans URL de sitemap");
    if (!urls.length) fail("sitemap vide en production");
    for (const u of urls) {
      if (!u.startsWith(SITE_URL)) fail(`sitemap : URL hors domaine ${u}`);
      if (/localhost/.test(u)) fail(`sitemap : localhost ${u}`);
      const path = u.slice(SITE_URL.length) || "/";
      const { status, body } = await get(path);
      if (status !== 200) fail(`sitemap : ${u} renvoie ${status}`);
      const { robots: r, canonical } = analyse(path, body);
      if (/noindex/.test(r)) fail(`sitemap : ${u} est en noindex`);
      if (canonical && canonical.replace(/\/$/, "") !== u.replace(/\/$/, "")) fail(`sitemap : ${u} canonical ${canonical}`);
      if (DRAFT_PATHS.includes(path)) fail(`sitemap : brouillon ${u}`);
    }
    pass(`sitemap : ${urls.length} URL vérifiées`);
  } else {
    if (!/Disallow: \/\s*$/m.test(robots.body)) fail("robots.txt n'interdit pas l'exploration en prévisualisation");
    if (urls.length) fail(`sitemap non vide en prévisualisation (${urls.length})`);
    const home = await get("/");
    if (!/noindex/.test(home.headers.get("x-robots-tag") ?? "")) fail("en-tête X-Robots-Tag noindex absent en prévisualisation");
    pass("robots/sitemap/X-Robots-Tag de prévisualisation");
  }

  // API : un GET n'est pas accepté, un POST vide est refusé proprement
  const api = await fetch(BASE + "/api/demandes", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(),
  });
  if (api.status < 400) fail(`/api/demandes accepte un envoi vide (statut ${api.status})`);
  pass(`/api/demandes refuse un envoi vide (${api.status})`);

  for (const p of passes) console.log("✓", p);
  if (failures.length) {
    for (const f of failures) console.error("✗", f);
    console.error(`\n${failures.length} problème(s).`);
    process.exit(1);
  }
  console.log(`\nAucun problème détecté (${EXPECT}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
