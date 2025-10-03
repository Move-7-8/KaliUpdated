// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://www.kalisoftware.io";
    const now = new Date().toISOString();

    return [
        {
            url: `${base}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${base}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${base}/services`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];
}
