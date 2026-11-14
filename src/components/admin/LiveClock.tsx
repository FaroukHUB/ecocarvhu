"use client";

import { useEffect, useState } from "react";

const fmt = (t: number) =>
  new Date(t).toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

/** Date du jour suivie de l'heure de Paris, mise à jour chaque minute. */
export function LiveClock({ initial }: { initial: number }) {
  const [now, setNow] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);
  const date = new Date(now).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long" });
  return (
    <span suppressHydrationWarning>
      {date} · {fmt(now)}
    </span>
  );
}
