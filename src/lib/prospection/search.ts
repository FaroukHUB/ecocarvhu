/**
 * Recherche d'entreprises : API publique « Recherche d'entreprises » de l'État
 * (gratuite, sans clé). Les entreprises qui s'opposent à la prospection
 * commerciale (opposition_diffusion_commerciale) sont signalées et exclues.
 */

export const ACTIVITES = [
  { code: "45.20A", label: "Garages (réparation de voitures)", kind: "garage", accroche: "entretient et répare des véhicules : vous avez sans doute régulièrement des voitures que leurs propriétaires ne font pas réparer" },
  { code: "45.20B", label: "Garages poids lourds et utilitaires", kind: "garage", accroche: "intervient sur des véhicules utilitaires et poids lourds, dont certains finissent hors d'usage" },
  { code: "45.11Z", label: "Concessions et négoce de voitures", kind: "concession", accroche: "vend des véhicules : les reprises en mauvais état ou invendables doivent bien partir quelque part" },
  { code: "77.11A", label: "Location de voitures", kind: "flotte", accroche: "gère une flotte de véhicules de location, avec des véhicules accidentés ou en fin de vie à sortir du parc" },
  { code: "77.12Z", label: "Location de camions et utilitaires", kind: "flotte", accroche: "gère une flotte d'utilitaires et de camions, avec des véhicules en fin de vie à sortir du parc" },
  { code: "49.41A", label: "Transport routier de marchandises", kind: "flotte", accroche: "fait rouler une flotte de véhicules, avec des véhicules accidentés ou en fin de vie à remplacer" },
  { code: "49.41B", label: "Transport de proximité et livraison", kind: "flotte", accroche: "fait rouler une flotte de véhicules de livraison, avec des véhicules en fin de vie à remplacer" },
  { code: "49.32Z", label: "Taxis et VTC", kind: "flotte", accroche: "fait rouler des véhicules intensivement, qui arrivent un jour en fin de vie" },
  { code: "49.39A", label: "Transport de voyageurs (cars)", kind: "flotte", accroche: "gère une flotte de véhicules de transport, avec des véhicules à sortir du parc" },
  { code: "85.53Z", label: "Auto-écoles", kind: "flotte", accroche: "renouvelle régulièrement ses véhicules d'apprentissage" },
  { code: "86.90A", label: "Ambulances", kind: "flotte", accroche: "fait rouler des véhicules sanitaires qui arrivent un jour en fin de vie" },
  { code: "52.21Z", label: "Dépannage, remorquage, parkings", kind: "fourriere", accroche: "récupère des véhicules accidentés ou abandonnés, dont certains ne seront jamais réparés" },
  { code: "68.32A", label: "Syndics et gestion d'immeubles", kind: "syndic", accroche: "gère des résidences où des véhicules sont parfois abandonnés dans les parkings" },
] as const;

export const DEPARTEMENTS = [
  { code: "13", label: "Bouches-du-Rhône (13)" },
  { code: "83", label: "Var (83)" },
  { code: "84", label: "Vaucluse (84)" },
  { code: "06", label: "Alpes-Maritimes (06)" },
  { code: "04", label: "Alpes-de-Haute-Provence (04)" },
  { code: "05", label: "Hautes-Alpes (05)" },
] as const;

export const TAILLES = [
  { key: "toutes", label: "Toutes tailles", codes: "" },
  { key: "petites", label: "1 à 9 salariés", codes: "01,02,03" },
  { key: "moyennes", label: "10 à 49 salariés", codes: "11,12" },
  { key: "grandes", label: "50 salariés et plus", codes: "21,22,31,32,41,42,51,52,53" },
] as const;

const EFFECTIFS: Record<string, string> = {
  "00": "0 salarié", "01": "1 à 2 salariés", "02": "3 à 5 salariés", "03": "6 à 9 salariés", "11": "10 à 19 salariés",
  "12": "20 à 49 salariés", "21": "50 à 99 salariés", "22": "100 à 199 salariés", "31": "200 à 249 salariés",
  "32": "250 à 499 salariés", "41": "500 à 999 salariés", "42": "1 000 à 1 999 salariés", "51": "2 000 à 4 999 salariés",
  "52": "5 000 à 9 999 salariés", "53": "10 000 salariés et plus",
};

export interface Company {
  siren: string;
  name: string;
  naf: string;
  nafLabel: string;
  effectif: string;
  address: string;
  postalCode: string;
  city: string;
  dirigeant: string;
  refuseProspection: boolean;
}

export const activite = (code: string | null | undefined) => ACTIVITES.find((a) => a.code === code);

const title = (s: string) => s.toLowerCase().replace(/(^|[\s'-])\p{L}/gu, (m) => m.toUpperCase());

export async function searchCompanies(p: { naf: string; dep: string; taille: string; q?: string; page: number }) {
  const qs = new URLSearchParams({ activite_principale: p.naf, departement: p.dep, etat_administratif: "A", per_page: "20", page: String(p.page) });
  const t = TAILLES.find((x) => x.key === p.taille);
  if (t?.codes) qs.set("tranche_effectif_salarie", t.codes);
  if (p.q) qs.set("q", p.q);
  const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?${qs}`, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`La base des entreprises ne répond pas (${res.status}). Réessayez dans un instant.`);
  const data = (await res.json()) as { total_results: number; total_pages: number; results: Record<string, unknown>[] };
  const companies: Company[] = data.results.map((r) => {
    const etabs = (r.matching_etablissements as Record<string, string>[] | undefined) ?? [];
    const e = etabs.find((x) => String(x.code_postal ?? "").startsWith(p.dep)) ?? etabs[0] ?? (r.siege as Record<string, string>);
    const boss = ((r.dirigeants as Record<string, string>[] | undefined) ?? []).find((d) => d.type_dirigeant === "personne physique");
    const a = activite(String(r.activite_principale ?? p.naf));
    return {
      siren: String(r.siren),
      name: title(String(r.nom_complet ?? r.nom_raison_sociale ?? "")),
      naf: String(r.activite_principale ?? p.naf),
      nafLabel: a?.label ?? String(r.activite_principale ?? ""),
      effectif: EFFECTIFS[String(r.tranche_effectif_salarie ?? "")] ?? "effectif inconnu",
      address: title(String(e?.adresse ?? "")),
      postalCode: String(e?.code_postal ?? ""),
      city: title(String(e?.libelle_commune ?? "")),
      dirigeant: boss ? title(`${String(boss.prenoms ?? "").split(" ")[0]} ${String(boss.nom ?? "").replace(/\s*\(.*\)/, "")}`.trim()) : "",
      refuseProspection: Boolean(r.opposition_diffusion_commerciale),
    };
  });
  return { total: data.total_results, pages: data.total_pages, companies };
}
