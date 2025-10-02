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
    submittedAt: z.string().optional(), // client-provided; not trusted for server time
});

export type ContactInput = z.infer<typeof contactSchema>;

type Meta = { ip?: string | null; userAgent?: string | null; referer?: string | null };

export async function createContact(input: ContactInput, meta: Meta) {
    await dbConnect();

    // Simple server-side rate limit: max ~5 submissions per 5 minutes per email/IP
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

    return { id: String(doc._id) };
}
