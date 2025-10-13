// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

// ✅ Use Link for internal navigation

// Existing markdown helpers (unchanged)
import { getAllPostSlugs, getPostBySlug } from "@/app/lib/markdown";

// TSX posts index (new)
import { loadTsxPost, tsxSlugs } from "../../blog/_posts/index";
import { Footer } from "../../landing/components/Footer";

// In your project, Next's PageProps expects params to be a Promise.
// So we model that and await it where needed.
type PageProps = { params: Promise<{ slug: string }> };

type Frontmatter = {
    title?: string;
    description?: string;
    date?: string;
    readingTime?: string;
    canonical?: string;
    author?: {
        name: string;
        image?: string; // e.g. "/images/blogs/connor_lowres.png"
    };
};

export async function generateStaticParams() {
    const mdSlugs = await getAllPostSlugs();
    const all = Array.from(new Set([...mdSlugs, ...tsxSlugs]));
    return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // 1) Try TSX first
    const tsx = await loadTsxPost(slug).catch(() => null);
    if (tsx?.frontmatter) {
        const f = tsx.frontmatter as Frontmatter;
        const title = f.title || "Blog";
        const description = f.description || "";
        const canonical = f.canonical || `https://www.kalisoftware.io/blog/${slug}`;
        return {
            title,
            description,
            alternates: { canonical },
            openGraph: { title, description, url: canonical, type: "article" },
        };
    }

    // 2) Fallback to Markdown
    try {
        const { frontmatter } = await getPostBySlug(slug);
        const f = frontmatter as Frontmatter;
        const title = f.title || "Blog";
        const description = f.description || "";
        const canonical = f.canonical || `https://www.kalisoftware.io/blog/${slug}`;
        return {
            title,
            description,
            alternates: { canonical },
            openGraph: { title, description, url: canonical, type: "article" },
        };
    } catch {
        return { title: "Blog", description: "Kali Software blog post" };
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    // Prefer TSX post
    const tsx = await loadTsxPost(slug).catch(() => null);

    let frontmatter: Frontmatter | undefined;
    let Html: React.ReactNode | null = null;
    let TsxComponent: React.ComponentType | null = null;

    if (tsx) {
        frontmatter = tsx.frontmatter as Frontmatter;
        TsxComponent = tsx.default ?? null;
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

    const articleLd = frontmatter?.title
        ? {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: frontmatter.title,
              datePublished: isoDate,
              description: frontmatter.description,
              mainEntityOfPage: `https://www.kalisoftware.io/blog/${slug}`,
              author: authorForLd,
              publisher: {
                  "@type": "Organization",
                  name: "Kali Software",
                  logo: { "@type": "ImageObject", url: "https://www.kalisoftware.io/logo.png" },
              },
          }
        : null;

    const defaultMessage =
        "HubSpot ↔ Xero Integration — free audit. Context: current flow, systems, volumes, deadlines.";

    return (
        <>
            {articleLd && (
                <Script
                    id="ld-article"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
                />
            )}

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

            {/* <Topbar /> */}
            <main className="bg-base-200 text-base-content">
                <section className="mx-auto w-11/12 max-w-7xl px-4 pt-10 pb-16 md:w-10/12 md:px-6 lg:px-8">
                    <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <span className="badge badge-ghost badge-lg border-2 border-black">Guide</span>
                            <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                {frontmatter?.title}
                            </h1>
                            {frontmatter?.description && (
                                <p className="prose-blog mt-3 max-w-3xl text-base md:text-lg">
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
                        {/* ✅ Internal nav must use Link */}
                        <Link href="/blog" className="btn btn-outline border-2 border-black">
                            ← All posts
                        </Link>

                        {/* Use a button for the click-capture CTA to avoid internal-link lint rules */}
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
