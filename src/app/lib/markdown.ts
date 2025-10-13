// src/lib/markdown.ts
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type Frontmatter = {
    title: string;
    description?: string;
    date?: string; // ISO date like "2025-10-06"
    readingTime?: string; // e.g., "10 min"
    tags?: string[];
    coverImage?: string; // /images/blog/cover.png
    canonical?: string;
};

export async function getAllPostSlugs(): Promise<string[]> {
    const files = await fs.readdir(BLOG_DIR);
    return files.filter((f) => f.endsWith(".md") || f.endsWith(".mdx")).map((f) => f.replace(/\.mdx?$/, ""));
}

export async function getPostBySlug(slug: string): Promise<{
    slug: string;
    frontmatter: Frontmatter;
    html: string;
}> {
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const existsMd = await fileExists(mdPath);
    const filePath = existsMd ? mdPath : mdxPath;

    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);

    const processed = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug) // keep IDs for deep-linking, but no clickable anchors
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

    return {
        slug,
        frontmatter: (data || {}) as Frontmatter,
        html: processed.toString(),
    };
}

export async function getAllPosts(): Promise<{ slug: string; frontmatter: Frontmatter }[]> {
    const slugs = await getAllPostSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const { frontmatter } = await getPostBySlug(slug);
            return { slug, frontmatter };
        }),
    );

    // newest first if date provided
    return posts.sort((a, b) => {
        const da = a.frontmatter.date ? Date.parse(a.frontmatter.date) : 0;
        const db = b.frontmatter.date ? Date.parse(b.frontmatter.date) : 0;
        return db - da;
    });
}

async function fileExists(p: string) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}
