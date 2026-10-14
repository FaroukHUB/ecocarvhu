import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/blog";
import { postPath } from "@/lib/publication";
import { ArrowIcon, DocIcon } from "@/components/ui/icons";

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export function readingMinutes(post: Post): number {
  const words = [post.lead ?? "", ...post.blocks.map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))]
    .concat((post.faq ?? []).map((f) => `${f.q} ${f.a}`))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Carte d'article : image, catégorie, date, titre, résumé. */
export function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card group flex h-full flex-col overflow-hidden p-0">
      <Link href={postPath(post)} className="flex h-full flex-col" aria-label={post.h1}>
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {post.cover ? (
            <Image
              src={post.cover.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-brand-glow flex h-full items-center justify-center">
              <span className="icon-tile h-16 w-16 rounded-2xl">
                <DocIcon className="h-8 w-8" />
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingMinutes(post)} min de lecture
          </p>
          <H className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-brand">{post.h1}</H>
          <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-3">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Lire l&apos;article
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
