import { NextResponse } from "next/server";

import { contactSchema, createContact } from "@/app/lib/landing/Contact";

// Avoid any caching of API responses
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Httpish = { status?: number; message?: string };
function isHttpish(e: unknown): e is Httpish {
    return typeof e === "object" && e !== null && ("status" in e || "message" in e);
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
        }

        // Proxy-aware best-effort IP detection
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("cf-connecting-ip") ||
            req.headers.get("x-real-ip") ||
            null;

        const userAgent = req.headers.get("user-agent") || null;
        const referer = req.headers.get("referer") || null;

        const { id } = await createContact(parsed.data, { ip, userAgent, referer });

        // Front-end expects either ticketId or id
        return NextResponse.json({ ok: true, id, ticketId: id }, { status: 201 });
    } catch (err) {
        // No `any` — safely narrow unknown
        const status = isHttpish(err) && typeof err.status === "number" ? err.status : 500;
        const message = isHttpish(err) && typeof err.message === "string" ? err.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status });
    }
}

// Optional: allow preflight if you ever POST cross-origin
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
