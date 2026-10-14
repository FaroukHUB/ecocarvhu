import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "@/content/pages";
import { posts, type Post, type PostBlock } from "@/content/blog";
import { hasPublishedPosts, isPostPublished, isPostRenderable, postPath, visiblePosts } from "@/lib/publication";
import { draftsVisible } from "@/config/env";
import { blogPostingJsonLd, breadcrumbJsonLd, buildMetadata, type Crumb } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Faq } from "@/components/ui/Faq";
import { PhoneBig } from "@/components/ui/PhoneBig";
import { CheckIcon, ArrowIcon } from "@/components/ui/icons";
import { RichText } from "@/components/blog/RichText";
import { PostCard, formatDate, readingMinutes } from "@/components/blog/PostCard";
import { CallBand } from "@/components/sections/CallBand";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

function find(slug: string): Post | undefined {
  const p = posts.find((x) => x.slug === slug);
  return p && isPostRenderable(p) ? p : undefined;
}

/** Ancre stable d'un intertitre (sommaire). */
function anchor(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return { title: "Page introuvable", robots: { index: false } };
  return buildMetadata({
    path: postPath(p),
    title: p.title,
    description: p.description,
    draft: !isPostPublished(p),
    article: {
      publishedTime: p.date,
      image: p.cover ? { url: p.cover.src, width: p.cover.width, height: p.cover.height } : undefined,
    },
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={anchor(block.text)} className="scroll-mt-28">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "list": {
      const L = block.ordered ? "ol" : "ul";
      return (
        <L className="!list-none !pl-0">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </L>
      );
    }
    case "figure":
      return (
        <figure className="not-prose my-10">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 border-l-2 border-lime pl-3 text-sm text-muted">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "table":
      return (
        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.92rem]">
            {block.caption ? (
              <caption className="caption-bottom border-t border-line bg-surface px-4 py-2.5 text-left text-xs text-muted">
                {block.caption}
              </caption>
            ) : null}
            <thead className="bg-ink text-white">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {block.rows.map((r) => (
                <tr key={r[0]} className="even:bg-surface">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={c} scope="row" className="px-4 py-3 font-semibold text-ink">
                        {c}
                      </th>
                    ) : (
                      <td key={c} className="px-4 py-3 text-ink-3">
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <blockquote className="not-prose my-8 rounded-3xl bg-brand-soft p-6 sm:p-7">
          {block.label ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{block.label}</p> : null}
          <p className="mt-2 text-lg font-medium leading-relaxed text-ink">{block.text}</p>
        </blockquote>
      );
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = find(slug);
  if (!post) notFound();

  const crumbs: Crumb[] = [];
  if (hasPublishedPosts() || draftsVisible) crumbs.push({ name: pages.conseils.label, path: pages.conseils.path });
  crumbs.push({ name: post.h1, path: postPath(post) });

  const toc = post.blocks.filter((b): b is { type: "h2"; text: string } => b.type === "h2");
  const others = visiblePosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={blogPostingJsonLd({
          h1: post.h1,
          description: post.description,
          date: post.date,
          path: postPath(post),
          image: post.cover?.src,
          author: post.author,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {/* En-tête de l'article */}
      <header className="bg-hero-light border-b border-ink/5">
        <Breadcrumbs items={crumbs} />
        <Container className="pb-12 pt-8 sm:pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
              <span aria-hidden="true" className="pulse-dot text-brand" />
              {post.category}
            </p>
            <h1 className="mt-5 text-[2.1rem] font-bold leading-[1.06] tracking-[-0.04em] sm:text-[3.2rem]">{post.h1}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="font-semibold text-ink-2">{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post)} min de lecture</span>
              {post.sourcesCheckedOn ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Sources vérifiées le {post.sourcesCheckedOn}</span>
                </>
              ) : null}
            </p>
            {post.lead ? <p className="mt-6 text-lg leading-relaxed text-ink-3 sm:text-xl">{post.lead}</p> : null}
          </div>
        </Container>
      </header>

      {post.cover ? (
        <Container className="-mt-2 pt-10">
          <figure>
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                sizes="(min-width: 1152px) 1120px, 100vw"
                fetchPriority="high"
                loading="eager"
                className="h-auto w-full"
              />
            </div>
            {post.cover.caption ? (
              <figcaption className="mt-3 max-w-3xl border-l-2 border-lime pl-3 text-sm text-muted">{post.cover.caption}</figcaption>
            ) : null}
          </figure>
        </Container>
      ) : null}

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-16">
        <article className="min-w-0">
          {post.keyPoints ? (
            <aside className="bg-ink-grid mb-10 rounded-3xl p-7 text-white sm:p-8" aria-labelledby="essentiel-title">
              <p id="essentiel-title" className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">
                {post.keyPoints.title}
              </p>
              {post.keyPoints.highlight ? (
                <p className="mt-3 text-2xl font-bold leading-tight tracking-tight">{post.keyPoints.highlight}</p>
              ) : null}
              <ul className="mt-5 space-y-3">
                {post.keyPoints.items.map((it) => (
                  <li key={it} className="flex gap-3 text-white/85 [&_a]:text-lime [&_strong]:text-white">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>
                      <RichText text={it} />
                    </span>
                  </li>
                ))}
              </ul>
              {post.keyPoints.tip ? (
                <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">{post.keyPoints.tip}</p>
              ) : null}
            </aside>
          ) : null}

          <div className="prose-eco prose-article text-[1.06rem] text-ink-2">
            {post.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>

          {post.faq?.length ? (
            <section className="mt-14" aria-labelledby="faq-title">
              <h2 id="faq-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
                {post.faqTitle ?? "Questions fréquentes"}
              </h2>
              <div className="mt-6">
                <Faq items={post.faq} />
              </div>
            </section>
          ) : null}

          {post.cta ? (
            <section className="bg-brand-glow mt-14 rounded-3xl p-7 text-white sm:p-10" aria-labelledby="cta-title">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime">{post.cta.eyebrow ?? "Préparer votre demande"}</p>
              <h2 id="cta-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {post.cta.title}
              </h2>
              <p className="mt-3 max-w-2xl text-white/80">{post.cta.text}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link href={post.cta.href} className="btn btn-lime">
                  {post.cta.label}
                  <ArrowIcon className="h-5 w-5" />
                </Link>
                <PhoneBig placement={`blog-${post.slug}`} size="md" caption="Appel direct" />
              </div>
              {post.cta.note ? <p className="mt-4 text-sm text-white/60">{post.cta.note}</p> : null}
            </section>
          ) : null}

          {post.sources.length ? (
            <section className="mt-14 border-t border-line pt-8" aria-labelledby="sources-title">
              <h2 id="sources-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                {post.sourcesTitle ?? "Sources et repères officiels"}
              </h2>
              <ol className="mt-4 space-y-2 text-sm text-ink-3">
                {post.sources.map((s, i) => (
                  <li key={s.label} id={`source-${i + 1}`} className="flex scroll-mt-28 gap-3">
                    <span className="font-semibold text-ink">[{i + 1}]</span>
                    {s.url ? (
                      <a href={s.url} rel="noopener" className="underline underline-offset-2 hover:text-brand">
                        {s.label}
                      </a>
                    ) : (
                      <span>{s.label}</span>
                    )}
                  </li>
                ))}
              </ol>
              {post.footnote ? <p className="mt-6 text-xs leading-relaxed text-muted">{post.footnote}</p> : null}
            </section>
          ) : null}
        </article>

        {/* Sommaire et appel, collants sur grand écran */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            {toc.length ? (
              <nav aria-label="Sommaire" className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Sommaire</p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {toc.map((h) => (
                    <li key={h.text}>
                      <a href={`#${anchor(h.text)}`} className="text-ink-3 transition-colors hover:text-brand">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="card-dark bg-ink p-6 text-white">
              <p className="font-semibold">Une question sur votre véhicule ?</p>
              <p className="mt-1.5 text-sm text-white/70">Appelez, c&apos;est souvent le plus rapide.</p>
              <div className="mt-4">
                <PhoneBig placement={`blog-aside-${post.slug}`} size="md" caption={null} />
              </div>
            </div>
          </div>
        </aside>
      </Container>

      {others.length ? (
        <section className="bg-surface py-16 sm:py-20" aria-labelledby="autres-title">
          <Container>
            <h2 id="autres-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
              À lire aussi
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CallBand placement={`blog-${post.slug}`} />
    </>
  );
}
