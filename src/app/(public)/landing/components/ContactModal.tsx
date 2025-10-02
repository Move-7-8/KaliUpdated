"use client";

import { type Transition, type Variants, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

    const [name, setName] = useState(initial?.name ?? "");
    const [email, setEmail] = useState(initial?.email ?? "");
    const [company, setCompany] = useState(initial?.company ?? "");
    const [message, setMessage] = useState(initial?.message ?? "");
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
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => {
        const d = dialogRef.current;
        setIsOpen(false);
        if (d?.open) d.close();
    }, []);

    // Global open/close events (your existing pattern)
    useEffect(() => {
        const onOpen = (e: Event) => {
            const detail = (e as CustomEvent).detail as
                | {
                      initial?: Partial<{ name: string; email: string; company: string; message: string }>;
                  }
                | undefined;

            if (detail?.initial) {
                if (typeof detail.initial.name === "string") setName(detail.initial.name);
                if (typeof detail.initial.email === "string") setEmail(detail.initial.email);
                if (typeof detail.initial.company === "string") setCompany(detail.initial.company);
                if (typeof detail.initial.message === "string") setMessage(detail.initial.message);
            }
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
                <div className="modal-box bg-base-100 max-w-xl rounded-2xl border-2 border-black shadow-xl">
                    <form method="dialog">
                        <button
                            type="submit"
                            className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
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
                                <h2 className="text-2xl font-semibold">Get a 15-minute consult</h2>
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
                                        placeholder="name@company.com"
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
                                        placeholder="Acme Pty Ltd"
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
                                        placeholder="e.g. invoice automation, data dashboards, custom web app, quoting workflow…"
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
                                <h2 className="text-2xl font-semibold">Thanks—you're in.</h2>
                                <p className="text-base-content/70 text-base">
                                    We’ll reply within <strong>1 business day</strong>
                                    {/* {success.ticketId ? <>. Your reference: <code>{success.ticketId}</code>.</> : "."} */}
                                </p>
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
