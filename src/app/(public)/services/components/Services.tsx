"use client";

import { MotionConfig, type Variants, motion } from "motion/react";
import { useCallback } from "react";

import CaseStudy from "./CaseStudy";

export default function Services() {
    // Fire a window event that ContactModal listens for.
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    // Smooth scroll to a section by id
    const scrollToId = useCallback((id: string) => {
        if (typeof window === "undefined") return;
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Optional: update the hash without jump
        history.replaceState(null, "", `#${id}`);
    }, []);

    // Motion presets
    const viewport = { once: true, amount: 0.2 };

    // Generic container for stagger
    const container: Variants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.08 },
        },
    };

    // Hero fade (unused at top now; retained for parity if needed later)
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            // NOTE: 'ease' must be an Easing or cubic-bezier tuple (not a string)
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    // NEW: Service section entrances (alternate directions)
    const serviceEnterL: Variants = {
        hidden: { opacity: 0, x: -62 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
    };

    const serviceEnterR: Variants = {
        hidden: { opacity: 0, x: 62 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 110, damping: 16 } },
    };

    const serviceChild: Variants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <MotionConfig reducedMotion="user">
            <main className="bg-base-200 text-base-content">
                {/* TOP SECTION: no motion on header/nav */}
                <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="font-ocr text-4xl font-extrabold tracking-tight md:text-5xl">Our Services</h1>

                        <p className="mt-4 text-lg opacity-90 md:text-xl">
                            Strategy-led and personalised implementation is the only way to build custom software and
                            automations. We design, build and ship practical systems that fit your current workflows and
                            needs.
                        </p>

                        <nav className="mt-6 mb-20 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
                            <button
                                type="button"
                                onClick={() => scrollToId("consulting")}
                                aria-controls="consulting"
                                className="btn btn-primary btn-md w-full cursor-pointer border-2 border-black sm:w-auto">
                                Consulting
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToId("dashboards")}
                                aria-controls="dashboards"
                                className="btn btn-primary btn-md w-full cursor-pointer border-2 border-black sm:w-auto">
                                Dashboards &amp; Analytics
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToId("automation")}
                                aria-controls="automation"
                                className="btn btn-primary btn-md w-full cursor-pointer border-2 border-black sm:w-auto">
                                Automation
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToId("product-development")}
                                aria-controls="product-development"
                                className="btn btn-primary btn-md w-full cursor-pointer border-2 border-black sm:w-auto">
                                Product Development
                            </button>
                        </nav>
                    </div>
                </section>

                <section className="mx-auto max-w-5xl px-4 pb-20 md:px-6 lg:px-8">
                    {/* Group the 4 service + case study pairs and space between each pair */}
                    <div className="space-y-28 md:space-y-40">
                        {/* Pair 1: Consulting — NO motion on this pair */}
                        <div>
                            <article id="consulting" className="scroll-mt-28">
                                <p className="font-ocr text-base-content/60 text-[11px] tracking-[.18em] uppercase">
                                    <span className="text-base-content/80">Consulting</span>
                                </p>

                                <h2 className="font-ocr mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight md:text-4xl">
                                    Clarity, roadmap & ROI in days
                                </h2>

                                <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-8">
                                        <p className="text-base opacity-90 md:text-lg">
                                            Identify automation possibilities in your business, learn what&apos;s
                                            possible with your data, and quantify the ROI before you commit.
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* <div>
                                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                                    Key outcomes
                                                </h3>
                                                <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                                    <li>Prioritised roadmap with ROI estimates</li>
                                                    <li>Architecture + platform recommendations</li>
                                                    <li>Proof-of-value pilots you can extend</li>
                                                </ul>
                                            </div> */}
                                            <div className="md:col-span-2">
                                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                                    Deliverables
                                                </h3>
                                                <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                                    <li>Automation audit</li>
                                                    <li>Solutions Roadmap (phases, effort, risks, costs)</li>
                                                    <li>Ongoing consultation and support options</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openContact({
                                                        initial: {
                                                            message:
                                                                "Consulting — I’d like a free 30-min consult. Context: (add any goals, tools, deadlines)",
                                                        },
                                                    })
                                                }
                                                className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                                                Get in touch
                                            </button>
                                            <a
                                                href="/insights/dfcrc-consultation"
                                                className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                                View insights
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right column: text-only spec card (kept commented) */}
                                    {/* ... */}
                                </div>
                            </article>

                            {/* No motion wrapper around CaseStudy */}
                            <div>
                                <CaseStudy
                                    id="cs-consulting"
                                    label="Consulting Case Study"
                                    title="DFCRC Consultation"
                                    summary="We ran a year long consultation to identify the role of AI in the future of digital finance."
                                    metrics={[
                                        { k: "Time to clarity", v: "10 business days" },
                                        { k: "Identified savings", v: "18–26 hrs/month" },
                                        { k: "Risk reduction", v: "Fewer reworks via rules-as-code" },
                                    ]}
                                    bullets={[
                                        "Designed novel AI powered financial analysis methods to handle investment data",
                                        "Built algorithms to enable investment decision making across boards ",
                                        "Partnered with researchers and industry via the DFCRC to deliver cutting edge software for financial services",
                                    ]}
                                    ctaHref="/work/granny-flat-discovery"
                                    ctaLabel="Open case study"
                                    image={{ src: "/images/caseStudies/dfcrc.png", alt: "Discovery outputs overview" }}
                                />
                            </div>
                        </div>

                        {/* Pair 2: Dashboards & Analytics (slides in from RIGHT) */}
                        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container}>
                            <motion.article id="dashboards" className="scroll-mt-28" variants={serviceEnterR}>
                                <motion.p
                                    variants={serviceChild}
                                    className="font-ocr text-base-content/60 text-[11px] tracking-[.18em] uppercase">
                                    <span className="text-base-content/80">Dashboards &amp; Analytics</span>
                                </motion.p>

                                <motion.h2
                                    variants={serviceChild}
                                    className="font-ocr mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight md:text-4xl">
                                    End spreadsheet chaos with fit for purpose dashboards.
                                </motion.h2>

                                <motion.div
                                    variants={serviceChild}
                                    className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-8">
                                        <p className="text-base opacity-90 md:text-lg">
                                            We centralise your data across multiple platforms and ship dashboards your
                                            team actually uses, with guardrails for data quality, user access and
                                            alerts.
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* <div>...Key outcomes...</div> */}
                                            <div className="md:col-span-2">
                                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                                    Deliverables
                                                </h3>
                                                <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                                    <li>Onshore data storage (OAIC compliant)</li>
                                                    <li>One source of truth for your business or department</li>
                                                    <li>Data analysis and alerts predict and inform immediately</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openContact({
                                                        initial: {
                                                            message:
                                                                "Dashboards & Analytics — I’d like a quick estimate. Context: (what metrics, data sources, users)",
                                                        },
                                                    })
                                                }
                                                className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                                                Get in touch
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.article>

                            <motion.div variants={serviceChild}>
                                <CaseStudy
                                    id="cs-dashboards"
                                    label="Dashboards & Analytics Case Study"
                                    title="Multi-channel retailer dashboard"
                                    summary="We work with a retailer who sells items across physical and online channels. They had disconnected data sources across multiple platforms that resulted in inventory errors and vagueness in planning, now they have a single source of truth."
                                    metrics={[
                                        { k: "Build time", v: "8 weeks" },
                                        { k: "Reporting time saved", v: "12 hrs/week" },
                                        { k: "Data quality incidents", v: "↓ via lineage checks & alerts" },
                                    ]}
                                    bullets={[
                                        "Orders, products, marketing, inventory, and customers in one place",
                                        "Analytics to predict sales and inventory levels",
                                        "Automated alerts to Slack",
                                    ]}
                                    ctaHref="https://demo-dashboard-phi.vercel.app"
                                    ctaLabel="View project"
                                    image={{ src: "/images/caseStudies/dashboards.png", alt: "Retail dashboards" }}
                                    imageCta
                                />
                            </motion.div>
                        </motion.div>

                        {/* Pair 3: Workflow Automation (slides in from LEFT) */}
                        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container}>
                            <motion.article id="automation" className="scroll-mt-28" variants={serviceEnterL}>
                                <motion.p
                                    variants={serviceChild}
                                    className="font-ocr text-base-content/60 text-[11px] tracking-[.18em] uppercase">
                                    <span className="text-base-content/80">Rev Ops & Automation</span>
                                </motion.p>

                                <motion.h2
                                    variants={serviceChild}
                                    className="font-ocr mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight md:text-4xl">
                                    Replace manual work flows with automation
                                </motion.h2>

                                <motion.div
                                    variants={serviceChild}
                                    className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-8">
                                        <p className="text-base opacity-90 md:text-lg">
                                            Our automation and integration services covers building, ongoing
                                            optimisation and maintenance of your workflows whatever platforms they're
                                            are built on.
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* <div>...Key outcomes...</div> */}
                                            <div className="md:col-span-2">
                                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                                    Deliverables
                                                </h3>
                                                <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                                    <li>CRM specific workflows</li>
                                                    <li>ERP & finance reconciliation</li>
                                                    <li>Sales & marketing workflows</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openContact({
                                                        initial: {
                                                            message:
                                                                "Rev Ops & Automation — 15-min fit call. Context: (systems, pain points, desired outcomes)",
                                                        },
                                                    })
                                                }
                                                className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                                                Contact us
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    (window.location.href = "/services/Hubspot-Xero-Integration")
                                                }
                                                className="btn btn-ghost cursor-pointer border-2 border-black font-semibold">
                                                Hubspot ↔ Xero Integration
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.article>

                            <motion.div variants={serviceChild}>
                                <CaseStudy
                                    id="cs-automation"
                                    label="Revenue Operations Case Study"
                                    title="Quote → invoice → reconciliation"
                                    summary="A professional services firm required a way to onboard a customer on one platform, and automatically generate invoices, accounts and project management codes across other platforms."
                                    metrics={[
                                        { k: "Manual steps removed", v: "22 per engagement" },
                                        { k: "Error rate", v: "↓ significant via validations & retries" },
                                        { k: "Staff time saved", v: "6–9 hrs/week" },
                                    ]}
                                    bullets={[
                                        "New Hubspot deal triggers actions in ClickUp, and Stripe",
                                        "ClickUp task completions trigger invoice generation in Stripe with Email / Slack approval",
                                        "Unpaid and paid invoices are reconciled with Xero",
                                    ]}
                                    ctaHref="/work/psa-automation"
                                    ctaLabel="Open case study"
                                    image={{
                                        src: "/images/caseStudies/automation.png",
                                        alt: "Automation flow overview",
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Pair 4: Product Development (slides in from RIGHT) */}
                        <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={container}>
                            <motion.article id="product-development" className="scroll-mt-28" variants={serviceEnterR}>
                                <motion.p
                                    variants={serviceChild}
                                    className="font-ocr text-base-content/60 text-[11px] tracking-[.18em] uppercase">
                                    <span className="text-base-content/80">Product Development</span>
                                </motion.p>

                                <motion.h2
                                    variants={serviceChild}
                                    className="font-ocr mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight md:text-4xl">
                                    From MVP to production.
                                </motion.h2>

                                <motion.div
                                    variants={serviceChild}
                                    className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-8">
                                        <p className="text-base opacity-90 md:text-lg">
                                            Dedicated team to design, build and launch your app, with modern tooling,
                                            CI/CD, and best-practice security.
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* <div>...Key outcomes...</div> */}
                                            <div className="md:col-span-2">
                                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                                    Deliverables
                                                </h3>
                                                <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                                    <li>Dedicated UI/UX designers</li>
                                                    <li>Full-stack developers</li>
                                                    <li>Dedicated project managers</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openContact({
                                                        initial: {
                                                            message:
                                                                "Product Development — Start scoping an MVP. Context: (problem, users, key flows, budget, timeline)",
                                                        },
                                                    })
                                                }
                                                className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                                                Get an estimate
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.article>

                            <motion.div variants={serviceChild}>
                                <CaseStudy
                                    id="cs-product"
                                    label="Product Development Case Study"
                                    title="SkimReader AI"
                                    summary="We designed and built a novel AI-powered eReader, with a custom agentic model, Stripe billing, org/user roles, and audit logs."
                                    metrics={[
                                        { k: "MVP time", v: "8 weeks" },
                                        { k: "Support load", v: "↓ via self-serve features" },
                                        { k: "Churn risk", v: "↓ with in-app onboarding & analytics" },
                                    ]}
                                    bullets={[
                                        "Next.js fullstack app, MongoDB, Stripe billing",
                                        "Custom agentic model built specifically for the eReader use case",
                                        "MVP shipped in 8 weeks",
                                    ]}
                                    ctaHref="https://www.skimreader.ai"
                                    ctaLabel="View project"
                                    image={{ src: "/images/caseStudies/skimreader.png", alt: "SkimReader AI" }}
                                    imageCta
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Render the modal once on this page; hidden trigger inside the component is disabled via prop */}
            </main>
        </MotionConfig>
    );
}
