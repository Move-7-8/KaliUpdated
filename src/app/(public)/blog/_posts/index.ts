// src/app/blog/_posts/index.ts
import type { ComponentType } from "react";

export type Frontmatter = {
    title?: string;
    description?: string;
    date?: string;
    readingTime?: string;
    canonical?: string;
    // NEW: unify with page.tsx so TSX posts can label themselves
    postType?: "guide" | "case-study";
};

export type TsxPostModule = {
    default: ComponentType;
    frontmatter: Frontmatter;
};

// Helper to cast dynamic imports so TS knows about `frontmatter`
const asPost = (p: Promise<unknown>) => p as Promise<TsxPostModule>;

// Register TSX posts here by *route slug*
const registry: Record<string, () => Promise<TsxPostModule>> = {
    "hubspot-xero-australia-how-to": () => asPost(import("./hubspot-xero-australia-how-to")),
    "dfcrc-case-study": () => asPost(import("./dfcrc-case-study")),
    "digitalx-case-study": () => asPost(import("./digitalx-case-study")),
    "skimreader-ai-case-study": () => asPost(import("./skimreader-ai-case-study")),
};

export const tsxSlugs = Object.keys(registry);

export async function loadTsxPost(slug: string): Promise<TsxPostModule | null> {
    const loader = registry[slug];
    if (!loader) return null;
    const mod = await loader();
    // guard in case a post forgets to export frontmatter
    if (!("frontmatter" in (mod as any))) (mod as any).frontmatter = {};
    return mod;
}
