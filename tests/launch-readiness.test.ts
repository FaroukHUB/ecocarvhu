import { describe, expect, it } from "vitest";
import { launchBlockers } from "@/lib/launch-readiness";

/**
 * Contrôle de publication : lancé par `npm run check:launch` (LAUNCH_CHECK=1),
 * ignoré par `npm test`. Échoue tant qu'une information bloquante manque.
 */
describe.runIf(process.env.LAUNCH_CHECK === "1")("prêt pour la publication", () => {
  it("n'a aucun point bloquant", () => {
    const blockers = launchBlockers();
    if (blockers.length) console.log("\nPoints bloquants :\n- " + blockers.join("\n- "));
    expect(blockers).toEqual([]);
  });
});

describe("liste des points bloquants", () => {
  it("signale l'identité légale tant qu'elle manque", () => {
    expect(launchBlockers({}).some((b) => b.includes("Identité légale"))).toBe(true);
  });

  it("n'exige plus d'identifier un centre VHU partenaire (plusieurs centres, non nommés)", () => {
    expect(launchBlockers({}).some((b) => b.toLowerCase().includes("partenaire"))).toBe(false);
  });
});
