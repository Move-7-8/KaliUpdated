// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts } from "@/app/lib/markdown";

import { Footer } from "../landing/components/Footer";
import { loadTsxPost, tsxSlugs } from "./_posts";

// import { Topbar } from "../landing/components/Topbar";

export const metadata: Metadata = {
    title: "Blog — Kali Software",
    description:
        "Guides on HubSpot, Xero, workflow automation, and professional services automation for Australian businesses.",
};

type FM = {
    title?: string;
    description?: string;
    date?: string;
    readingTime?: string;
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

    return (
        <>
            {/* <Topbar /> */}
            <main className="bg-base-200 text-base-content">
                <section className="mx-auto w-full max-w-screen-2xl px-4 pt-10 pb-16 md:px-6 lg:px-8">
                    <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <span className="badge badge-ghost badge-lg border-2 border-black">Insights</span>
                            <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                                Kali Software Blog
                            </h1>
                            <p className="mt-3 max-w-3xl text-base md:text-lg">
                                Playbooks for automation, integration, and data for Australian businesses.
                            </p>
                        </div>
                    </header>

                    <div className="mx-auto mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map(({ slug, frontmatter }) => (
                            <article
                                key={slug}
                                className="card bg-base-100 border-2 border-black shadow-sm transition hover:shadow-md">
                                <div className="card-body">
                                    <h2 className="card-title font-ocr text-base">
                                        <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
                                    </h2>
                                    {frontmatter.description && (
                                        <p className="text-sm opacity-80">{frontmatter.description}</p>
                                    )}
                                    <div className="mt-2 text-xs opacity-70">
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
                                    <div className="card-actions mt-4">
                                        <Link
                                            href={`/blog/${slug}`}
                                            className="btn btn-secondary border-2 border-black">
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
