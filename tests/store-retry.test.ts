import { afterEach, describe, expect, it, vi } from "vitest";
import { isNetworkError, storeDemande } from "@/lib/forms/store";

const env = { SUPABASE_URL: "https://exemple.supabase.co", SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test", SUPABASE_INGEST_TOKEN: "jeton" };
const input = { formType: "enlevement", data: { name: "Test" }, attachments: [] };

afterEach(() => vi.unstubAllGlobals());

describe("copie des demandes dans l'espace de gestion", () => {
  it("reconnaît une coupure réseau", () => {
    expect(isNetworkError("TypeError: fetch failed")).toBe(true);
    expect(isNetworkError("jeton invalide")).toBe(false);
  });

  it("réessaie après une coupure réseau passagère", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValue(new Response(JSON.stringify({ id: "d1", upload_key: "k1" }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(storeDemande(input, env)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("ne réessaie pas quand la base refuse", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ message: "jeton invalide", code: "42501" }), { status: 403, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(storeDemande(input, env)).rejects.toThrow("jeton invalide");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
