// src/app/blog/[slug]/page.tsx
import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

// Existing markdown helpers (unchanged)
import { getAllPostSlugs, getPostBySlug } from "@/app/lib/markdown";

// TSX posts index (new)
import { loadTsxPost, tsxSlugs } from "../../blog/_posts/index";
import { Footer } from "../../landing/components/Footer";

// In your project, Next's PageProps expects params to be a Promise.
type PageProps = { params: Promise<{ slug: string }> };

type Frontmatter = {
    title?: string;
    description?: string;
    date?: string;
    readingTime?: string;
    canonical?: string;
    postType?: "guide" | "case-study";
    author?: {
        name: string;
        image?: string;
    };
    // NEW: per-post image used for OG/Twitter (fallback to cardImage if present)
    cardImage?: string;
    cardImageAlt?: string;

    // NEW: per-post badge data (image + optional link/alt)
    heroBadgeSrc?: string; // e.g. "/images/investors/dfcrc.png"
    heroBadgeHref?: string; // e.g. "https://dfcrc.com.au/"
    heroBadgeAlt?: string; // e.g. "DFCRC logo"
};

// Optional named export each TSX post can provide
type TsxModule = {
    default?: React.ComponentType;
    frontmatter?: Frontmatter;
    HeroBadge?: React.ComponentType; // Optional override (legacy/custom). Template falls back to frontmatter.* if not provided.
};

export async function generateStaticParams() {
    const mdSlugs = await getAllPostSlugs();
    const all = Array.from(new Set([...mdSlugs, ...tsxSlugs]));
    return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // 1) Try TSX first
    const tsx = (await loadTsxPost(slug).catch(() => null)) as TsxModule | null;
    const fromModule = async (mod: TsxModule | null) => {
        if (!mod?.frontmatter) return null;
        const f = mod.frontmatter as Frontmatter;

        const title = f.title || "Blog";
        const description = f.description || "";
        const canonical = f.canonical || `https://www.kalisoftware.io/blog/${slug}`;

        // Prefer a real post image for OG/Twitter
        const ogImage = f.cardImage || "/images/og/image.png";

        const publishedTime = f.date || undefined;
        // If you later track edits, wire this to your CMS/file mtime; for now reuse date.
        const modifiedTime = f.date || undefined;

        return {
            title,
            description,
            alternates: { canonical },
            openGraph: {
                title,
                description,
                url: canonical,
                type: "article",
                images: [{ url: ogImage }],
                publishedTime,
                modifiedTime,
                authors: f.author?.name ? [f.author.name] : ["Kali Software"],
                section: f.postType === "case-study" ? "Case Study" : "Guide",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [ogImage],
            },
        } satisfies Metadata;
    };

    const tsxMeta = await fromModule(tsx);
    if (tsxMeta) return tsxMeta;

    // 2) Fallback to Markdown
    try {
        const { frontmatter } = await getPostBySlug(slug);
        const f = frontmatter as Frontmatter;

        const title = f.title || "Blog";
        const description = f.description || "";
        const canonical = f.canonical || `https://www.kalisoftware.io/blog/${slug}`;
        const ogImage = f.cardImage || "/images/og/image.png";
        const publishedTime = f.date || undefined;
        const modifiedTime = f.date || undefined;

        return {
            title,
            description,
            alternates: { canonical },
            openGraph: {
                title,
                description,
                url: canonical,
                type: "article",
                images: [{ url: ogImage }],
                publishedTime,
                modifiedTime,
                authors: f.author?.name ? [f.author.name] : ["Kali Software"],
                section: f.postType === "case-study" ? "Case Study" : "Guide",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [ogImage],
            },
        } satisfies Metadata;
    } catch {
        return { title: "Blog", description: "Kali Software blog post" };
    }
}

// Standard, uniform circular badge used across all posts.
// - Fixed size (h-48 w-48) and padding (p-4) to keep logos visually consistent.
// - `relative` container + `<Image fill>` ensures the image conforms to the circle.
// - Use `object-contain` so different logo aspect ratios fit nicely.
function BadgeCircle({ href, src, alt }: { href?: string; src: string; alt?: string }) {
    const inner = (
        <span className="relative inline-grid h-48 w-48 place-items-center overflow-hidden rounded-full bg-white p-4 shadow-sm ring-1 ring-neutral-200 dark:bg-white dark:ring-neutral-700">
            <Image src={src} alt={alt || ""} fill sizes="192px" className="object-contain" priority />
        </span>
    );
    if (!href) return inner;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={alt ? `Visit ${alt} (opens in a new tab)` : "Opens in a new tab"}
            className="transition-transform hover:scale-[1.03]"
            title={alt || undefined}>
            {inner}
        </a>
    );
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    // Prefer TSX post
    const tsx = (await loadTsxPost(slug).catch(() => null)) as TsxModule | null;

    let frontmatter: Frontmatter | undefined;
    let Html: React.ReactNode | null = null;
    let TsxComponent: React.ComponentType | null = null;
    let HeroBadge: React.ComponentType | null = null; // optional override

    if (tsx) {
        frontmatter = tsx.frontmatter as Frontmatter;
        TsxComponent = tsx.default ?? null;
        HeroBadge = tsx.HeroBadge ?? null; // if not provided, template will use frontmatter heroBadge*
    } else {
        try {
            const md = await getPostBySlug(slug);
            frontmatter = md.frontmatter as Frontmatter;
            Html = <div id="blog-content" className="blog-content" dangerouslySetInnerHTML={{ __html: md.html }} />;
        } catch {
            notFound();
        }
    }

    const isoDate = frontmatter?.date || undefined;

    const authorForLd = frontmatter?.author?.name
        ? {
              "@type": "Person",
              name: frontmatter.author.name,
              ...(frontmatter.author.image
                  ? {
                        image: `https://www.kalisoftware.io${frontmatter.author.image}`,
                    }
                  : {}),
          }
        : { "@type": "Organization", name: "Kali Software" };

    // --- JSON-LD: BlogPosting (richer than generic Article)
    const ogImage = frontmatter?.cardImage || "/images/og/image.png";
    const articleLd = frontmatter?.title
        ? {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: frontmatter.title,
              datePublished: isoDate,
              dateModified: isoDate,
              description: frontmatter.description,
              image: ogImage.startsWith("http") ? ogImage : `https://www.kalisoftware.io${ogImage}`,
              mainEntityOfPage: `https://www.kalisoftware.io/blog/${slug}`,
              author: authorForLd,
              publisher: {
                  "@type": "Organization",
                  name: "Kali Software",
                  logo: { "@type": "ImageObject", url: "https://www.kalisoftware.io/logo.png" },
              },
              articleSection:
                  (frontmatter?.postType === "case-study" && "Case Study") ||
                  (frontmatter?.postType === "guide" && "Guide") ||
                  "Guide",
          }
        : null;

    // --- JSON-LD: BreadcrumbList (Blog > Post)
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.kalisoftware.io/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.kalisoftware.io/blog",
            },
            ...(frontmatter?.title
                ? [
                      {
                          "@type": "ListItem",
                          position: 3,
                          name: frontmatter.title,
                          item: `https://www.kalisoftware.io/blog/${slug}`,
                      },
                  ]
                : []),
        ],
    };

    const defaultMessage =
        "HubSpot ↔ Xero Integration — free audit. Context: current flow, systems, volumes, deadlines.";

    const badgeLabel =
        (frontmatter?.postType === "case-study" && "Case Study") ||
        (frontmatter?.postType === "guide" && "Guide") ||
        "Guide";

    return (
        <>
            {articleLd && (
                <Script
                    id="ld-article"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
                />
            )}
            <Script
                id="ld-breadcrumbs"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <Script id="bind-open-contact" strategy="afterInteractive">
                {`
(function(){
  var DEFAULT_MSG = ${JSON.stringify(defaultMessage)};
  function getDetail(el){
    var json = el.getAttribute('data-detail');
    if (json) {
      try { return JSON.parse(json); } catch(e) {}
    }
    var msg = el.getAttribute('data-message') || DEFAULT_MSG;
    return msg ? { initial: { message: msg } } : undefined;
  }
  function onClickCapture(e){
    var t = e.target;
    if (!t || !(t instanceof Element)) return;
    var el = t.closest('[data-open-contact]');
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    var detail = getDetail(el);
    window.dispatchEvent(new CustomEvent('open-contact', { detail: detail }));
  }
  document.addEventListener('click', onClickCapture, true);
})();
        `}
            </Script>

            <main className="bg-base-200 text-base-content">
                <section className="mx-auto w-11/12 max-w-7xl px-4 pt-10 pb-16 md:w-10/12 md:px-6 lg:px-8">
                    <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                        {/* Extra right padding so a per-post badge doesn't overlap heading */}
                        <div className="relative p-6 pr-72 md:p-10 md:pr-96 lg:pr-[28rem]">
                            {(HeroBadge && (
                                <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 md:right-8 lg:right-12">
                                    <HeroBadge />
                                </div>
                            )) ||
                                (frontmatter?.heroBadgeSrc && (
                                    <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 md:right-8 lg:right-12">
                                        <BadgeCircle
                                            href={frontmatter.heroBadgeHref}
                                            src={frontmatter.heroBadgeSrc}
                                            alt={frontmatter.heroBadgeAlt}
                                        />
                                    </div>
                                ))}

                            <span className="badge badge-ghost badge-lg border-2 border-black">{badgeLabel}</span>
                            <h1 className="font-ocr mt-4 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl lg:text-4xl">
                                {frontmatter?.title}
                            </h1>
                            {frontmatter?.description && (
                                <p className="prose-blog mt-3 max-w-xl text-base md:text-lg">
                                    {frontmatter.description}
                                </p>
                            )}

                            {/* Byline */}
                            <div className="mt-4 flex items-center gap-3 text-xs opacity-90 md:text-sm">
                                {frontmatter?.author?.image && (
                                    <Image
                                        src={frontmatter.author.image}
                                        alt={frontmatter.author.name || "Author"}
                                        width={62}
                                        height={62}
                                        className="h-12 w-12 rounded-full border border-black"
                                        priority
                                    />
                                )}
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    {frontmatter?.author?.name && (
                                        <span className="font-medium">{frontmatter.author.name}</span>
                                    )}
                                    {isoDate && (
                                        <>
                                            <span>•</span>
                                            <time dateTime={isoDate}>
                                                {new Date(isoDate).toLocaleDateString("en-AU", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </>
                                    )}
                                    {frontmatter?.readingTime && (
                                        <>
                                            <span>•</span>
                                            <span>{frontmatter.readingTime}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* /Byline */}
                        </div>
                    </header>

                    <article className="bg-base-300 mx-auto mt-6 max-w-5xl rounded-2xl border-2 border-black p-6 shadow md:p-8">
                        <div className="overflow-x-auto">{TsxComponent ? <TsxComponent /> : Html}</div>
                    </article>

                    <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-between gap-3">
                        <Link href="/blog" className="btn btn-outline border-2 border-black">
                            ← All posts
                        </Link>
                        <button
                            type="button"
                            data-open-contact
                            data-message={defaultMessage}
                            className="btn btn-secondary border-2 border-black font-semibold">
                            Get in touch
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
