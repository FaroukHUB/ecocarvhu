"use client";

import { useState } from "react";

/** Choix d'un message type déjà personnalisé, envoi par WhatsApp, SMS ou e-mail. */
export function MessagePicker({
  templates,
  whatsapp,
  phone,
  email,
}: {
  templates: { id: string; title: string; text: string }[];
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
}) {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  if (!templates.length) return <p className="text-sm text-muted">Pas encore de message type : tu peux en ajouter dans « Messages types ».</p>;
  const text = templates[i].text;
  const enc = encodeURIComponent(text);
  const btn = "inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5";
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {templates.map((t, k) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setI(k);
              setCopied(false);
            }}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 ${k === i ? "bg-ink text-white ring-ink" : "bg-white ring-line"}`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <p className="mt-3 whitespace-pre-wrap rounded-2xl bg-surface p-4 text-sm">{text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {whatsapp ? (
          <a className={`${btn} bg-[#25d366] text-ink`} href={`https://wa.me/${whatsapp}?text=${enc}`} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp
          </a>
        ) : null}
        {phone ? (
          <a className={`${btn} bg-sky-100 text-sky-900`} href={`sms:${phone.replace(/\s/g, "")}?body=${enc}`}>
            ✉️ SMS
          </a>
        ) : null}
        {email ? (
          <a className={`${btn} bg-violet-100 text-violet-900`} href={`mailto:${email}?subject=${encodeURIComponent("EcocarVHU")}&body=${enc}`}>
            📧 E-mail
          </a>
        ) : null}
        <button
          type="button"
          className={`${btn} bg-white ring-1 ring-line`}
          onClick={() => navigator.clipboard.writeText(text).then(() => setCopied(true))}
        >
          {copied ? "✅ Copié" : "📋 Copier"}
        </button>
      </div>
    </div>
  );
}
