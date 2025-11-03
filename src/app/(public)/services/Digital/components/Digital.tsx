"use client";

import Link from "next/link";
import { useCallback } from "react";

// src/app/services/digital/components/Digital.tsx

export default function Digital() {
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    return (
        <main className="bg-base-200 text-base-content">
            <section className="mx-auto w-11/12 max-w-7xl px-4 pt-10 pb-16 md:w-10/12 md:px-6 lg:px-8">
                <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                    <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                    <div className="relative p-6 md:p-10">
                        <span className="badge badge-ghost badge-lg border-2 border-black">Web Apps</span>
                        <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Custom Web Apps
                        </h1>

                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>Custom web apps</strong> that load fast, look sharp, and integrate cleanly—built
                                for <em>external products</em> and <em>internal teams</em>. We design the component
                                system, wire up APIs, and ship production-grade UX with strong performance,
                                accessibility, and SEO.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 font-sans shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>Turn ideas into fast, resilient web apps your team can grow with.</p>
                        <p>
                            We architect clear routes and information hierarchy, build a reusable component library,
                            connect to your data and auth, and set up CI/CD so every release is safe and repeatable.
                            Performance and accessibility are baked in—not an afterthought.
                        </p>

                        <p className="mt-6">
                            Teams often struggle with slow pages, template sprawl, and brittle integrations.{" "}
                            <strong>Common issues include:</strong>
                        </p>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                            <div className="space-y-4 md:col-span-7">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Laggy pages and low Lighthouse/Core Web Vitals on key flows.</li>
                                    <li>Inconsistent UI and duplicated components across sections.</li>
                                    <li>Brittle forms and validations; unclear error handling and empty states.</li>
                                    <li>Ad-hoc API calls without caching, retries, idempotency, or observability.</li>
                                    <li>SEO and metadata misconfigured; social previews look broken.</li>
                                </ul>
                            </div>

                            <figure className="self-start md:col-span-5 md:justify-self-end">
                                <img
                                    src="/images/caseStudies/skimreader.png"
                                    alt="Next.js app architecture diagram—routes, components, API, and integrations."
                                    loading="lazy"
                                    className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                                />
                                <figcaption className="text-base-content/80 mt-2 text-sm">
                                    A recent custom web app build.
                                </figcaption>
                            </figure>
                        </div>

                        {/* External vs Internal focus */}
                        <div id="engagements" className="mt-10 md:mt-12">
                            <h2 className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                Built for external products and internal teams
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full" />
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">External products & portals</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Conversion-minded UX, SEO-ready routing and metadata.</li>
                                            <li>Payments, subscriptions, CRM, analytics, email, webhooks.</li>
                                            <li>Role-based access, audit logs, rate limits, abuse protection.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">Internal tools & ops apps</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Admin consoles, workflow automation, data entry at scale.</li>
                                            <li>Reliable forms, optimistic updates, offline/latency strategies.</li>
                                            <li>SSO (SAML/OIDC), granular permissions, environment controls.</li>
                                            <li>Observability: logs, traces, metrics with alerting/runbooks.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What's included */}
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                Next.js web apps — what’s included
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>

                        <p>
                            We start with goals, users, and critical paths. Then we prototype, build the component
                            library, wire integrations, and harden performance and accessibility. Launch is followed by
                            a tidy handover and roadmap for iterations.
                        </p>

                        <p>
                            Practically, that means routes and layouts, typed components, forms and validation,
                            server/client data flows with caching and revalidation, auth, error states, analytics,
                            secure environment management, and CI/CD. We treat integrations as first-class citizens with
                            idempotency, retries, and useful logs.
                        </p>

                        <p>
                            <strong>The result:</strong> a fast, accessible app with a maintainable codebase and
                            integrations you can trust.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                ["Fast & accessible", "Core Web Vitals-friendly and inclusive by design."],
                                ["Production-grade", "Typed components, CI/CD, and clear error handling."],
                                ["Integrated", "Clean APIs and resilient connections to your tools."],
                            ].map(([title, body]) => (
                                <div key={title} className="card bg-base-100 border border-black shadow-sm">
                                    <div className="card-body text-base-content">
                                        <h3 className="card-title font-ocr text-base">{title}</h3>
                                        <p className="text-sm opacity-90">{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How we deliver (paragraph form) */}
                    <div className="mx-auto mt-12 max-w-6xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl md:text-2xl">How we deliver</h2>
                        <div className="prose text-base-content/90 max-w-none">
                            <p>
                                We begin by aligning on goals, users, KPIs, and risks through short workshops. The
                                output is a concise brief, information architecture, and a high-level backlog that
                                focuses effort where it matters most.
                            </p>
                            <p>
                                Next, we design and prototype the critical paths. We define tokens, assemble a component
                                inventory, and create a clickable prototype so stakeholders can validate flow and
                                content early.
                            </p>
                            <p>
                                We then build: typed components, clear API contracts, and a data layer with caching and
                                revalidation. Forms are robust, empty and error states are explicit, and accessibility
                                is addressed as we go—not tacked on later.
                            </p>
                            <p>
                                Before launch, we harden the app with performance and accessibility passes, security
                                checks (including CSP and auth flows), and a pragmatic test suite for smoke and
                                regression coverage.
                            </p>
                            <p>
                                Finally, we launch with preview environments, a release plan, and observability in
                                place. Handover includes documentation, runbooks, training, and a clear roadmap for the
                                next iteration.
                            </p>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="mx-auto mt-10 max-w-5xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl">Frequently Asked Questions</h2>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                How long does a typical build take?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                If you're a start-up and you're just trying to get from 0-1, we can typically get you a
                                prototype in as little as 3 weeks. If you already have users, data and you're looking
                                for something a little more comprehensive, get in touch and we'll give you an estimate.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">What’s in scope?</div>
                            <div className="collapse-content text-sm md:text-base">
                                Component system and pages, forms, auth, API integration, analytics, performance and
                                accessibility passes, and deployment pipeline.
                            </div>
                        </div>
                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">What stack do you typically use?</div>
                            <div className="collapse-content text-sm md:text-base">
                                Next JS, Tailwind CSS, Vercel, Supabase, MongoDB, Python, are some of the tools we would
                                use if you want to launch quickly.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">Will it be SEO-friendly?</div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. Clean semantics, structured metadata, image optimisation, and fast responses for
                                key pages and previews.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Can you integrate with our tools?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Typically. We can integrate with your CRMs, auth, analytics, billing, and internal APIs.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">Do you provide handover?</div>
                            <div className="collapse-content text-sm md:text-base">
                                We document components and workflows, set up environments and CI/CD, and provide
                                runbooks for common tasks.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                How do you handle security and compliance?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We follow OWASP best practices, enforce CSP, protect against common web risks, and
                                integrate with your identity provider. For sensitive data, we align to least-privilege,
                                strong secrets management, and audit trails.
                            </div>
                        </div>
                    </div>

                    {/* Buttons removed in grey area */}
                    {/*
                    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "Next.js Web Apps — free scoping session. Context: goals, users, pages, integrations, timelines.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                            Free app audit
                        </button>
                    </div>
                    */}
                </div>
            </section>
        </main>
    );
}
