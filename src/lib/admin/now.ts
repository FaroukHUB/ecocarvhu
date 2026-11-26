import { connection } from "next/server";

/** Heure actuelle, lue au moment de la requête (jamais figée au rendu préalable). */
export async function currentTime(): Promise<number> {
  await connection();
  return Date.now();
}
