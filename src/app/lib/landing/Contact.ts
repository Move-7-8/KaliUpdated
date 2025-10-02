import { z } from "zod";

import { ContactSubmission } from "@/app/lib/models/ContactSubmission";
import { dbConnect } from "@/app/lib/mongoose";

export const contactSchema = z.object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Please enter a valid email like name@company.com."),
    company: z.string().min(2, "Please enter your company."),
    message: z.string().min(5, "Tell us briefly what you need.").max(5000),
    marketingOptIn: z.boolean().optional().default(false),
    pageUrl: z.string().url().optional().or(z.literal("")).optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    submittedAt: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

type Meta = { ip?: string | null; userAgent?: string | null; referer?: string | null };

export async function createContact(input: ContactInput, meta: Meta) {
    await dbConnect();

    const windowStart = new Date(Date.now() - 5 * 60 * 1000);
    const orFilters: any[] = [{ email: input.email.toLowerCase() }];
    if (meta.ip) orFilters.push({ ip: meta.ip });

    const recentCount = await ContactSubmission.countDocuments({
        $and: [{ createdAt: { $gte: windowStart } }, { $or: orFilters }],
    });

    if (recentCount > 5) {
        const err: any = new Error("Too many submissions. Please try again later.");
        err.status = 429;
        throw err;
    }

    const doc = await ContactSubmission.create({
        ...input,
        email: input.email.toLowerCase(),
        ip: meta.ip ?? undefined,
        userAgent: meta.userAgent ?? undefined,
        referer: meta.referer ?? undefined,
    });

    // 🔔 Tell n8n about the new record (insert)
    try {
        const url = process.env.N8N_WEBHOOK_URL;
        if (url) {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET || "",
                },
                body: JSON.stringify({
                    op: "insert",
                    collection: "ContactSubmission",
                    id: String(doc._id),
                    createdAt: doc.createdAt,
                    doc, // full doc; trim later if you want
                }),
                // keepalive avoids dropped requests on short-lived serverless invocations
                keepalive: true,
            });
        }
    } catch {
        // Non-blocking: if notification fails, still return to caller
    }

    return { id: String(doc._id) };
}
