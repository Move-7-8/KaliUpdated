// app/sitemap.ts
import type { MetadataRoute } from "next";

import { loadTsxPost, tsxSlugs } from "@/app/(public)/blog/_posts/index";
// Reuse your real helpers so the sitemap stays in sync with content
import { getAllPostSlugs, getPostBySlug } from "@/app/lib/markdown";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = "https://www.kalisoftware.io";
    const nowIso = new Date().toISOString();

    // 1) Core pages
    const core: MetadataRoute.Sitemap = [
        {
            url: `${base}/`,
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${base}/about`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${base}/services`,
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        // Known service detail pages
        {
            url: `${base}/services/Hubspot-Xero-Integration`,
            lastModified: nowIso,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${base}/services/AI-Solutions`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/services/Data-Integration`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/services/Data-Analytics`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/services/Revenue-Operations`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/services/Digital`,
            lastModified: nowIso,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    // 2) Blog posts — Markdown + TSX
    const mdSlugs = await getAllPostSlugs(); // e.g. ['post-a', 'post-b']
    const mdEntries = await Promise.all(
        mdSlugs.map(async (slug) => {
            // best-effort: read frontmatter.date to use as lastModified if present
            try {
                const { frontmatter } = await getPostBySlug(slug);
                const lm = (frontmatter?.date && new Date(frontmatter.date).toISOString()) || nowIso;
                return {
                    url: `${base}/blog/${slug}`,
                    lastModified: lm,
                    changeFrequency: "monthly" as const,
                    priority: 0.6,
                };
            } catch {
                // if a file fails to parse, still include it with nowIso
                return {
                    url: `${base}/blog/${slug}`,
                    lastModified: nowIso,
                    changeFrequency: "monthly" as const,
                    priority: 0.6,
                };
            }
        }),
    );

    const tsxEntries = await Promise.all(
        tsxSlugs.map(async (slug) => {
            try {
                const mod = await loadTsxPost(slug);
                const fm: any = mod?.frontmatter || {};
                const lm = (fm.date && new Date(fm.date).toISOString()) || nowIso;
                return {
                    url: `${base}/blog/${slug}`,
                    lastModified: lm,
                    changeFrequency: "monthly" as const,
                    priority: 0.6,
                };
            } catch {
                return {
                    url: `${base}/blog/${slug}`,
                    lastModified: nowIso,
                    changeFrequency: "monthly" as const,
                    priority: 0.6,
                };
            }
        }),
    );

    // 3) De-duplicate blog URLs if a slug exists in both MD and TSX
    const map = new Map<string, MetadataRoute.Sitemap[number]>();
    [...mdEntries, ...tsxEntries].forEach((e) => {
        const key = e.url;
        // prefer the entry with an older (authoritative) date if they differ
        if (!map.has(key)) map.set(key, e);
    });

    return [...core, ...Array.from(map.values())];
}
