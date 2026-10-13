import { describe, expect, it } from "vitest";
import { isIndexingAllowed, resolveSiteEnv, resolveSiteUrl } from "@/config/env";

describe("environnement de publication", () => {
  it("traite une build sans SITE_ENV comme une prévisualisation (jamais indexée par accident)", () => {
    expect(resolveSiteEnv({ NODE_ENV: "production" })).toBe("preview");
    expect(isIndexingAllowed({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://exemple-reel.fr" })).toBe(false);
  });

  it("n'autorise l'indexation qu'en production avec un domaine https valide", () => {
    expect(isIndexingAllowed({ SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.domaine.fr/" })).toBe(true);
    expect(isIndexingAllowed({ SITE_ENV: "production" })).toBe(false);
    expect(isIndexingAllowed({ SITE_ENV: "preview", NEXT_PUBLIC_SITE_URL: "https://www.domaine.fr" })).toBe(false);
  });

  it("refuse localhost, http et les IP comme domaine de production", () => {
    expect(resolveSiteUrl({ SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://localhost:3000" })).toBeNull();
    expect(resolveSiteUrl({ SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://www.domaine.fr" })).toBeNull();
    expect(resolveSiteUrl({ SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://127.0.0.1" })).toBeNull();
    expect(resolveSiteUrl({ SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.domaine.fr/chemin" })).toBe(
      "https://www.domaine.fr",
    );
  });
});
