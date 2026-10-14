import Link from "next/link";
import { guideHref } from "@/lib/publication";

/**
 * Texte d'article avec deux balises simples : **gras** et [libellé](lien).
 * Les renvois [1] deviennent des liens vers la liste des sources.
 * Un lien « guide:slug » n'est rendu que si l'article cible est visible.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\[\d\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const ref = part.match(/^\[(\d)\]$/);
        if (ref)
          return (
            <sup key={i}>
              <a href={`#source-${ref[1]}`} className="no-underline" aria-label={`Source ${ref[1]}`}>
                [{ref[1]}]
              </a>
            </sup>
          );
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const href = link[2].startsWith("guide:") ? guideHref(link[2].slice(6)) : link[2];
          return href ? (
            <Link key={i} href={href}>
              {link[1]}
            </Link>
          ) : (
            <span key={i}>{link[1]}</span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
