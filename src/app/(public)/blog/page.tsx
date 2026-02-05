// src/app/blog/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { getAllPosts } from "@/app/lib/markdown";

import { Footer } from "../landing/components/Footer";
import { loadTsxPost, tsxSlugs } from "./_posts";

// import { Topbar } from "../landing/components/Topbar";

export const metadata: Metadata = {
    title: "Blog — Kali Software",
    description:
        "Guides on HubSpot, Xero, workflow automation, and professional services automation for Australian businesses.",
    alternates: {
        canonical: "https://www.kalisoftware.io/blog",
    },
    openGraph: {
        title: "Blog — Kali Software",
        description:
            "Guides on HubSpot, Xero, workflow automation, and professional services automation for Australian businesses.",
        url: "https://www.kalisoftware.io/blog",
        images: [{ url: "/images/og/image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog — Kali Software",
        description:
            "Guides on HubSpot, Xero, workflow automation, and professional services automation for Australian businesses.",
        images: ["/images/og/image.png"],
    },
};

export const revalidate = 3600;

type FM = {
    title?: string;
    description?: string;
    date?: string;
    readingTime?: string;
    // NEW: image used only on the blog index card
    cardImage?: string;
    cardImageAlt?: string;
    // (optional) if you want to surface the badge on the card later
    postType?: "guide" | "case-study";
};
type Entry = { slug: string; frontmatter: FM };

export default async function BlogIndexPage() {
    const md = (await getAllPosts()) as Entry[];

    const tsx: Entry[] = (
        await Promise.all(
            tsxSlugs.map(async (slug) => {
                const mod = await loadTsxPost(slug).catch(() => null);
                if (!mod?.frontmatter) return null;
                return { slug, frontmatter: mod.frontmatter as FM };
            }),
        )
    ).filter(Boolean) as Entry[];

    // --- De-duplicate by slug and prefer TSX over MD.
    // Also drop items that don't have a title (prevents "empty" cards).
    const bySlug = new Map<string, Entry>();

    // Prefer TSX versions when both exist
    for (const e of tsx) {
        if (e?.frontmatter?.title) bySlug.set(e.slug, e);
    }
    // Add MD only if no TSX exists for that slug
    for (const e of md) {
        if (!bySlug.has(e.slug) && e?.frontmatter?.title) bySlug.set(e.slug, e);
    }

    const posts: Entry[] = Array.from(bySlug.values()).sort((a, b) => {
        const ad = a.frontmatter.date ? Date.parse(a.frontmatter.date) : 0;
        const bd = b.frontmatter.date ? Date.parse(b.frontmatter.date) : 0;
        return bd - ad;
    });

    // JSON-LD: ItemList of posts for richer blog SERP
    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.kalisoftware.io/blog/${p.slug}`,
            name: p.frontmatter.title || `Post ${i + 1}`,
        })),
    };

    return (
        <>
            {/* <Topbar /> */}
            <main className="bg-base-200 text-base-content">
                <Script
                    id="ld-itemlist"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
                />
                <section className="mx-auto w-full max-w-screen-2xl px-4 pt-10 pb-16 md:px-6 lg:px-8">
                    <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <span className="badge badge-ghost badge-lg border-2 border-black">Insights</span>
                            <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                Kali Insights
                            </h1>
                            <p className="mt-3 max-w-3xl text-base md:text-lg">
                                Playbooks for automation, integration, and data for Australian businesses.
                            </p>
                        </div>
                    </header>

                    {/* 4-up at max width; slightly tighter gaps */}
                    <div className="mx-auto mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.map(({ slug, frontmatter }) => (
                            <article
                                key={slug}
                                className="card bg-base-100 overflow-hidden rounded-xl border-2 border-black shadow-sm transition hover:shadow-md">
                                {/* NEW: index-only image */}
                                {frontmatter.cardImage && (
                                    <div className="bg-base-300 relative aspect-[16/9] w-full overflow-hidden rounded-t-xl border-b-2 border-black">
                                        <Image
                                            src={frontmatter.cardImage}
                                            alt={frontmatter.cardImageAlt || frontmatter.title || "Blog cover image"}
                                            fill
                                            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                            className="object-cover"
                                            priority={false}
                                        />
                                    </div>
                                )}

                                <div className="card-body p-4 md:p-5">
                                    <h2 className="card-title font-ocr text-sm leading-snug">
                                        <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
                                    </h2>
                                    {frontmatter.description && (
                                        <p className="text-xs opacity-80">{frontmatter.description}</p>
                                    )}
                                    <div className="mt-1.5 text-[11px] opacity-70">
                                        {frontmatter.date && (
                                            <time dateTime={frontmatter.date}>
                                                {new Date(frontmatter.date).toLocaleDateString("en-AU", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        )}
                                        {frontmatter.readingTime && (
                                            <span className="ml-2">{frontmatter.readingTime}</span>
                                        )}
                                    </div>
                                    <div className="card-actions mt-3">
                                        <Link
                                            href={`/blog/${slug}`}
                                            className="btn btn-secondary btn-sm border-2 border-black">
                                            Read
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
