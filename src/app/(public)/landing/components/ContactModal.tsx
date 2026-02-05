"use client";

import { type Transition, type Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ======================== Contact Modal ========================

type ContactModalProps = {
    trustLogos?: { src: string; alt: string }[];
    calendlyHref?: string;
    onSubmitted?: (payload: Record<string, unknown>) => void;
    initial?: Partial<{
        name: string;
        email: string;
        company: string;
        message: string;
    }>;
    apiEndpoint?: string;
    id?: string;
    renderTrigger?: boolean;
};

type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

export default function ContactModal({
    trustLogos = [],
    calendlyHref,
    onSubmitted,
    initial,
    apiEndpoint = "/api/landing/contact",
    id = "contact-modal",
    renderTrigger = true,
}: ContactModalProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    // Start empty; do not seed from props
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    // Never seed message from outside; always start empty.
    const [message, setMessage] = useState("");
    const [marketingOptIn, setMarketingOptIn] = useState(false);

    // Honeypot field (should remain empty).
    const [website, setWebsite] = useState("");

    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<null | { ticketId?: string }>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    // Open/close flag for content-only animations
    const [isOpen, setIsOpen] = useState(false);

    const pageUrl = useMemo(() => {
        if (typeof window === "undefined") return "";
        return window.location.href;
    }, []);

    // Keep state in sync with native dialog events.
    useEffect(() => {
        const d = dialogRef.current;
        if (!d) return;

        // ESC key path (native)
        const onCancel = (e: Event) => {
            // Let us control the close so we can cleanly unlock the page.
            e.preventDefault();
            if (d.open) d.close();
            setIsOpen(false);
            // No manual .modal-open toggling; <dialog> already handles inert/scroll.
        };

        // Any close (X button, backdrop, method="dialog")
        const onClose = () => {
            setIsOpen(false);
        };

        d.addEventListener("cancel", onCancel);
        d.addEventListener("close", onClose);
        return () => {
            d.removeEventListener("cancel", onCancel);
            d.removeEventListener("close", onClose);
        };
    }, []);

    // Only show native modal when transitioning to open and not already open.
    useEffect(() => {
        const d = dialogRef.current;
        if (!d) return;
        if (isOpen && !d.open) {
            d.showModal();
            // Important: do not add/remove html/body classes here.
        }
    }, [isOpen]);

    // Make sure we never strand an open dialog across route changes/unmounts.
    const pathname = usePathname();
    useEffect(() => {
        const d = dialogRef.current;
        if (!d) return;
        if (d.open) d.close();
        setIsOpen(false);
        // Cleanup on unmount too.
        return () => {
            const dd = dialogRef.current;
            if (dd?.open) dd.close();
        };
    }, [pathname]);

    // Basic validators (polite, specific).
    const validateName = (v: string) => (v.trim().length < 2 ? "Please enter your name." : "");
    const validateEmail = (v: string) => {
        const value = v.trim();
        if (!value) return "Please enter your work email.";
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) return "Please enter a valid email like name@company.com.";
        return "";
    };
    const validateCompany = (v: string) => (v.trim().length < 2 ? "Please enter your company." : "");
    const validateMessage = (v: string) => (v.trim().length < 5 ? "Tell us briefly what you need." : "");

    const runValidation = () => {
        const next: Errors = {};
        const n = validateName(name);
        if (n) next.name = n;
        const e = validateEmail(email);
        if (e) next.email = e;
        const c = validateCompany(company);
        if (c) next.company = c;
        const m = validateMessage(message);
        if (m) next.message = m;
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        // Honeypot
        if (website.trim().length > 0) {
            setSuccess({ ticketId: undefined });
            return;
        }

        if (!runValidation()) return;

        setSubmitting(true);
        try {
            const payload = {
                name: name.trim(),
                email: email.trim(),
                company: company.trim(),
                message: message.trim(),
                marketingOptIn,
                pageUrl,
                utm_source: getQuery("utm_source"),
                utm_medium: getQuery("utm_medium"),
                utm_campaign: getQuery("utm_campaign"),
                submittedAt: new Date().toISOString(),
            };

            const res = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await tryText(res);
                throw new Error(text || `Request failed with ${res.status}`);
            }

            let ticketId: string | undefined;
            try {
                const data = await res.json();
                ticketId = data?.ticketId ?? data?.id ?? undefined;
            } catch {
                /* ignore bad JSON */
            }

            setSuccess({ ticketId });
            onSubmitted?.(payload);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setServerError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    // Imperative open/close
    const open = useCallback(() => {
        // Always clear message and other fields on open to avoid any external prefill.
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setIsOpen(true);
    }, []);
    const close = useCallback(() => {
        const d = dialogRef.current;
        setIsOpen(false);
        if (d?.open) d.close();
    }, []);

    // Global open/close events (your existing pattern)
    useEffect(() => {
        const onOpen = () => {
            // Intentionally ignore any external .initial; keep all fields blank
            open();
        };
        const onCloseEvt = () => close();

        window.addEventListener("open-contact", onOpen as EventListener);
        window.addEventListener("close-contact", onCloseEvt as EventListener);
        return () => {
            window.removeEventListener("open-contact", onOpen as EventListener);
            window.removeEventListener("close-contact", onCloseEvt as EventListener);
        };
    }, [open, close]);

    // Content-only stagger
    const containerV: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.05 },
        },
    };

    const itemSpring: Transition = {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.6,
    };

    const itemV: Variants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: itemSpring,
        },
    };

    return (
        <>
            {/* Trigger (can be hidden with renderTrigger={false}) */}
            {renderTrigger && (
                <button
                    type="button"
                    className="btn btn-primary cursor-pointer"
                    onClick={open}
                    aria-haspopup="dialog"
                    aria-controls={id}>
                    Contact Us
                </button>
            )}

            <dialog id={id} ref={dialogRef} className="modal">
                {/* Do not animate the wrapper. DaisyUI animates .modal/.modal-box. */}
                <div className="modal-box bg-base-100 max-w-xl rounded-2xl border-2 border-black shadow-[3px_3px_0_#000]">
                    <form method="dialog">
                        <button
                            type="submit"
                            className="btn btn-circle btn-ghost absolute top-3 right-3 min-h-[44px] min-w-[44px]"
                            aria-label="Close">
                            ✕
                        </button>
                    </form>

                    {!success ? (
                        <motion.div
                            className="space-y-6"
                            variants={containerV}
                            initial="hidden"
                            animate={isOpen ? "visible" : "hidden"}>
                            <motion.header variants={itemV} className="space-y-2">
                                <h2 className="text-2xl font-semibold">Get in touch</h2>
                                <p className="text-base-content/70 text-base">
                                    Tell us what you’re trying to build or improve—{" "}
                                    <strong>we’ll reply within 1 business day.</strong>
                                </p>
                            </motion.header>

                            <motion.form
                                variants={itemV}
                                className="grid grid-cols-1 items-start gap-x-6 gap-y-4 md:grid-cols-2"
                                onSubmit={handleSubmit}
                                noValidate>
                                <motion.div variants={itemV} className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`input input-bordered h-12 w-full ${errors.name ? "input-error" : ""}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={() => setErrors((p) => ({ ...p, name: validateName(name) }))}
                                        placeholder=""
                                        autoComplete="name"
                                        required
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby="name_error"
                                    />
                                    <span
                                        id="name_error"
                                        className={`label-text-alt block h-5 ${errors.name ? "text-error" : "invisible"}`}>
                                        {errors.name || "placeholder"}
                                    </span>
                                </motion.div>

                                <motion.div variants={itemV} className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        className={`input input-bordered h-12 w-full ${errors.email ? "input-error" : ""}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setErrors((p) => ({ ...p, email: validateEmail(email) }))}
                                        placeholder=""
                                        autoComplete="email"
                                        required
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby="email_error"
                                    />
                                    <span
                                        id="email_error"
                                        className={`label-text-alt block h-5 ${errors.email ? "text-error" : "invisible"}`}>
                                        {errors.email || "placeholder"}
                                    </span>
                                </motion.div>

                                <motion.div variants={itemV} className="form-control md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">Company</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`input input-bordered h-12 w-full ${errors.company ? "input-error" : ""}`}
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        onBlur={() =>
                                            setErrors((p) => ({
                                                ...p,
                                                company: validateCompany(company),
                                            }))
                                        }
                                        placeholder=""
                                        autoComplete="organization"
                                        required
                                        aria-invalid={Boolean(errors.company)}
                                        aria-describedby="company_error"
                                    />
                                    <span
                                        id="company_error"
                                        className={`label-text-alt block h-5 ${errors.company ? "text-error" : "invisible"}`}>
                                        {errors.company || "placeholder"}
                                    </span>
                                </motion.div>

                                <motion.div variants={itemV} className="form-control md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">What do you need?</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered min-h-28 w-full ${errors.message ? "textarea-error" : ""}`}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onBlur={() =>
                                            setErrors((p) => ({
                                                ...p,
                                                message: validateMessage(message),
                                            }))
                                        }
                                        placeholder=""
                                        required
                                        aria-invalid={Boolean(errors.message)}
                                        aria-describedby="message_error"
                                    />
                                    <span
                                        id="message_error"
                                        className={`label-text-alt block h-5 ${errors.message ? "text-error" : "invisible"}`}>
                                        {errors.message || "placeholder"}
                                    </span>
                                </motion.div>

                                {/* Honeypot - hidden from users, traps bots */}
                                <div className="hidden md:col-span-2">
                                    <label>
                                        Website
                                        <input
                                            type="text"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </label>
                                </div>

                                <motion.div variants={itemV} className="flex items-center gap-3 pt-1 md:col-span-2">
                                    <button
                                        type="submit"
                                        className={`btn btn-secondary ${submitting ? "btn-disabled" : ""}`}
                                        disabled={submitting}>
                                        {submitting ? "Sending…" : "Send request"}
                                    </button>

                                    {/* {calendlyHref && (
                                        <a className="btn btn-ghost" href={calendlyHref} target="_blank" rel="noreferrer">
                                            Or book a time
                                        </a>
                                    )} */}
                                </motion.div>

                                {serverError && (
                                    <motion.div variants={itemV} className="alert alert-error mt-2 md:col-span-2">
                                        <span>{serverError}</span>
                                    </motion.div>
                                )}
                            </motion.form>

                            {/* {trustLogos?.length > 0 && (
                                <motion.div variants={itemV} className="flex flex-wrap items-center gap-4 pt-2 opacity-80">
                                    {trustLogos.map((l, i) => (
                                        <img key={i} src={l.src} alt={l.alt} className="h-6" />
                                    ))}
                                </motion.div>
                            )} */}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="space-y-6"
                            variants={containerV}
                            initial="hidden"
                            animate={isOpen ? "visible" : "hidden"}>
                            <motion.header variants={itemV} className="space-y-2">
                                <h2 className="text-2xl font-semibold">Thanks, we'll get back to you soon.</h2>
                                {/* <p className="text-base-content/70 text-base">
                                    We’ll reply within <strong>1 business day</strong> */}
                                {/* {success.ticketId ? <>. Your reference: <code>{success.ticketId}</code>.</> : "."} */}
                                {/* </p> */}
                            </motion.header>

                            <motion.div variants={itemV} className="flex items-center gap-3">
                                <button className="btn btn-secondary" onClick={close}>
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Backdrop: rely on native method="dialog" to close; our 'close' listener syncs state */}
                <form method="dialog" className="modal-backdrop">
                    <button aria-label="Close" />
                </form>
            </dialog>
        </>
    );
}

// Helpers
function getQuery(key: string): string | undefined {
    if (typeof window === "undefined") return undefined;
    const u = new URL(window.location.href);
    return u.searchParams.get(key) ?? undefined;
}

async function tryText(res: Response) {
    try {
        return await res.text();
    } catch {
        return null;
    }
}

// ======================== Results (named export) ========================

type CaseStudy = {
    id: string;
    client: string;
    industry: string;
    title: string;
    blurb: string;
    image: string;
    headlineMetric: string;
    href: string;
};

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "DFCRC",
        client: "DFCRC",
        industry: "Government Policy",
        title: "DFCRC",
        blurb: "Consultation for the role of AI in the future of digital finance",
        image: "/images/investors/dfcrc.png",
        headlineMetric: "",
        href: "/blog/dfcrc-case-study",
    },
    {
        id: "DigitalX",
        client: "DigitalX (DCC:ASX)",
        industry: "Fund Management",
        title: "DigitalX (DCC:ASX)",
        blurb: "Data unification and analytics software for investment management.",
        image: "/images/investors/digital.png",
        headlineMetric: "",
        href: "/blog/digitalx-case-study",
    },
    {
        id: "Skimreader",
        client: "Skimreader",
        industry: "AI",
        title: "Skimreader",
        blurb: "AI-powered reading tool startup.",
        image: "/images/investors/skimread.png",
        headlineMetric: "",
        href: "/blog/skimreader-ai-case-study",
    },
];

function Stars() {
    return (
        <span className="text-warning inline-flex items-center gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </span>
    );
}

export function Results() {
    return (
        <section className="mx-auto w-[85%]">
            <h2 className="-mt-10 mb-6 text-2xl font-semibold tracking-tight">Recent Case Studies</h2>

            {/* Use spacing instead of dividers so the row border is clean */}
            <ul role="list" className="space-y-4">
                {CASE_STUDIES.map((c) => (
                    <li
                        key={c.id}
                        className={[
                            "bg-base-300", // keep your original background
                            "rounded-[20px]", // match services dropdown frame radius
                            "border-2 border-black", // match thickness
                            "px-4 py-5",
                            "shadow-[3px_3px_0_#000]", // same drop shadow as services dropdown
                        ].join(" ")}>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="shrink-0">
                                <Image
                                    src={c.image}
                                    alt={`${c.client} case study`}
                                    width={160}
                                    height={100}
                                    className={`${c.id === "Skimreader" ? "" : "logo-black"} rounded-[12px] object-cover`}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="badge badge-neutral">{c.industry}</span>
                                    {/* <span className="badge badge-outline">{c.client}</span> */}
                                    <Stars />
                                </div>

                                <h3 className="mt-1 text-base leading-tight font-medium">{c.title}</h3>
                                <p className="text-base-content/70 text-sm">{c.blurb}</p>
                            </div>

                            <div className="flex flex-col items-start gap-2 sm:items-end">
                                <div className="text-sm">
                                    <span className="font-medium">{c.headlineMetric}</span>
                                </div>
                                <Link href={c.href} className="btn btn-primary btn-sm">
                                    Read case study
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
