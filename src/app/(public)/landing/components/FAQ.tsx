"use client";

// src/app/components/FAQ.tsx
import Link from "next/link";
import Script from "next/script";
import { useId, useState } from "react";

type FAQItem = { q: string; a: string | React.JSX.Element };

export const FAQ = () => {
    const [open, setOpen] = useState<number | null>(null);
    const ns = useId();

    const faqs: FAQItem[] = [
        {
            q: "What AI services do you offer?",
            a: (
                <>
                    We build production-ready AI systems including:
                    <ul>
                        <li>
                            <strong>Multi-agent systems</strong> — orchestrating specialised agents for complex
                            workflows like research, analysis, and validation.
                        </li>
                        <li>
                            <strong>RAG & semantic search</strong> — connecting LLMs to your private documents and data
                            with citations.
                        </li>
                        <li>
                            <strong>LLM integration</strong> — prompt engineering, model selection, and deployment with
                            proper guardrails.
                        </li>
                        <li>
                            <strong>Evaluation frameworks</strong> — automated testing to catch issues before they reach
                            production.
                        </li>
                    </ul>
                    We focus on AI that works reliably in production, not just impressive demos.
                </>
            ),
        },
        {
            q: "What is RAG and how can it help my business?",
            a: "RAG (Retrieval-Augmented Generation) connects AI models to your private data—documents, databases, or APIs—so the AI can answer questions grounded in your specific context. This reduces hallucinations and means you get accurate, citable responses about your business rather than generic answers. It's particularly useful for internal knowledge bases, customer support, and research workflows.",
        },
        {
            q: "How do you ensure AI systems are safe and reliable?",
            a: (
                <>
                    We implement multiple layers: input validation and guardrails to filter problematic queries, output
                    filtering to catch issues before they reach users, automated evaluation suites that run on every
                    change, and human-in-the-loop review for sensitive actions. We also test specifically for prompt
                    injection and data leakage vulnerabilities, and set up observability so you can monitor what the AI
                    is actually doing in production.
                </>
            ),
        },
        {
            q: "Which systems can you integrate for businesses in Australia?",
            a: (
                <>
                    We specialise in custom operational data integrations, but also integrate with the usual SME
                    platforms. Examples include:
                    <ul>
                        <li>Finance & ERP: Xero, MYOB</li>
                        <li>Commerce & POS: Shopify, Square.</li>
                        <li>
                            Files, lakes & cloud storage: SharePoint/OneDrive, Google Drive, S3, IMAP email attachments.
                        </li>
                        <li>
                            Custom sources: REST/GraphQL services, webhooks, Postgres/SQL Server, CSV/PDF parsing & OCR,
                            and internal databases.
                        </li>
                    </ul>
                    Whether your data is on paper, in a PDF, represents spatial coordinates or transactions, we can help
                    you integrate it.
                </>
            ),
        },
        {
            q: "Can you connect Xero to Power BI, BigQuery or Snowflake?",
            a: (
                <>
                    Yes. We build robust pipelines for <strong>Xero → Power BI</strong>,{" "}
                    <strong>MYOB → Power BI</strong>, <strong>Xero/MYOB → BigQuery</strong> or{" "}
                    <strong>Snowflake</strong>. You’ll get refreshed datasets, documented metrics (e.g., Gross Margin,
                    AR/AP ageing, GST), and row-level security if required.
                </>
            ),
        },
        {
            q: "ETL vs ELT — which approach is best ?",
            a: (
                <>
                    In general, in 2025, <strong>ELT</strong> (land raw data then transform in-warehouse with SQL/dbt)
                    offers faster iteration and auditability. We still use <strong>ETL</strong> where pre-processing or
                    third-party constraints require it. We’ll choose the simplest option that meets governance and
                    freshness needs.
                </>
            ),
        },
        {
            q: "Do I need a data warehouse before dashboards?",
            a: "Not always. For one or two sources we can stand up reliable metrics quickly. If you have multiple systems, need history, or want governance and speed at scale, we add a warehouse (BigQuery / Snowflake / Postgres) plus models to create a single source of truth.",
        },
        {
            q: "How long until we see value?",
            a: "First integrations and insights typically land well before the end of a project. We prioritise the two or three highest-value questions and ship a usable integration or dashboard early, then iterate.",
        },
        {
            q: "Will my data stay in Australia? (Data residency & privacy)",
            a: (
                <>
                    Yes. On request we host and process in Australian cloud regions and design to align with the{" "}
                    <strong>Australian Privacy Principles (APPs)</strong>. We use least-privilege access, audit logs,
                    encrypted secrets and retention controls.
                </>
            ),
        },
        {
            q: "How do you ensure data quality and a single source of truth?",
            a: "We define business-ready metrics with you (e.g., Gross Margin, CAC, On-time-in-full), add validation tests, handle late/changed data, and version SQL models so calculations are consistent across dashboards. We document lineage and set role-based access.",
        },
        {
            q: "What ROI can we expect from data integration?",
            a: "The largest ROI here comes from the reduction in mistakes (incorrect data entry, re-entry errors, incorrect reconciliation), the times saved by manual data re-entry, and the power of having a universal source of truth. Once your data is integrated, you can access advanced analytics, and AI systems.",
        },

        {
            q: "What ROI can we expect from better data analysis?",
            a: "A decision maker is only as good as the information they have. Once your data is integrated, you can access analytics across your entire organisation. Whether its live dashboards or a specialised report, if you don't have the data, (or worse, you do but it's incorrect), you're at a fundamental disadvantage.",
        },
        {
            q: "Can you work with spreadsheets and legacy systems?",
            a: "Yes. We safely read/write spreadsheets, build adapters around legacy apps, and progressively replace brittle steps with robust pipelines and APIs at the right pace for your team.",
        },
        {
            q: "How do you make integrations reliable?",
            a: "We use idempotent ELT/ETL patterns, retries & alerting, change-data capture where possible, and monitoring with logs and metrics. Syncs can run hourly or daily based on freshness needs.",
        },
        {
            q: "How do you handle security?",
            a: "Least-privilege access, onshore data residency, secrets management, encryption in transit & at rest, optional SSO, and audit logs. We’re happy to align to your policies and complete security questionnaires.",
        },
        {
            q: "What industries do you serve?",
            a: "We have particular expertise in the Finance industry. We excel in custom and novel data sources, if you have unique and complex operational data, or simply want your Salesforce data to flow into Xero, we can help.",
        },
        {
            q: "What does a typical engagement look like?",
            a: (
                <>
                    <ul>
                        <li>
                            <strong>Discover:</strong> Free audit, success metrics, data map.
                        </li>
                        <li>
                            <strong>Design:</strong> Integration plan, metrics definitions, dashboard mocks.
                        </li>
                        <li>
                            <strong>Deliver:</strong> Pipelines + model + v1 dashboards.
                        </li>
                        <li>
                            <strong>Improve:</strong> Monthly enhancements, new questions, cost tuning.
                        </li>
                    </ul>
                </>
            ),
        },
        {
            q: "Do you offer maintenance and support?",
            a: "Yes—SLA support, proactive monitoring, and monthly improvement sprints. We can also train your team to self-serve.",
        },
        {
            q: "Can we start with a free assessment?",
            a: (
                <>
                    Yes. Get in touch to book a free <strong>data audit</strong>. We’ll map your sources, identify quick
                    wins, estimate ROI, and propose the fastest path to value with a simple plan.
                </>
            ),
        },
        {
            q: "Do you work only in Sydney and Perth?",
            a: "We work Australia-wide (with a physical presence in Perth and Sydney). Remote delivery is our default; on-site where it helps (Melbourne, Brisbane, Adelaide and beyond).",
        },
        {
            q: "What tech stack do you use?",
            a: "Next.js/TypeScript for custom web applications and dashboards, Python for custom data & orchestration, dbt/SQL for models, Fivetran for integration where needed, Power BI/Tableau for BI, and BigQuery/Snowflake/Postgres/MongoDB on the data side. We deploy to Vercel, AWS, Azure or GCP based on your needs.",
        },
    ];

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: typeof f.a === "string" ? f.a : stripJsx(String(f.a)) },
        })),
    };

    return (
        <section className="mx-auto mt-10 w-[85%] py-8 md:py-12 xl:py-16 2xl:py-24" id="faqs">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Stacked layout: header on top, dropdowns below */}
            <div className="flex flex-col gap-6">
                <div>
                    {/* <div className="inline-flex items-center rounded border border-purple-500/10 bg-purple-500/5 p-2">
                        <span className="iconify lucide--messages-square size-5 text-purple-600" />
                    </div> */}
                    <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-base-content/70 inline-block max-w-lg font-sans">
                        Questions Australian businesses ask about <strong>AI solutions</strong>,{" "}
                        <strong>data integration</strong>, and <strong>analytics consulting</strong>.
                    </p>
                </div>

                <div>
                    <div className="elementor-toggle border-base-300 rounded-xl border">
                        {faqs.map((item, i) => {
                            const isOpen = open === i;
                            const titleId = `elementor-tab-title-${ns}-${i + 1}`;
                            const contentId = `elementor-tab-content-${ns}-${i + 1}`;
                            return (
                                <div
                                    key={i}
                                    className="elementor-toggle-item border-base-300 border-b last:border-none">
                                    <div
                                        id={titleId}
                                        className="elementor-tab-title flex cursor-pointer items-center gap-3 px-4 py-4"
                                        role="button"
                                        aria-controls={contentId}
                                        aria-expanded={isOpen}
                                        tabIndex={0}
                                        aria-selected={isOpen}
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setOpen(isOpen ? null : i);
                                            }
                                        }}>
                                        <span
                                            className="elementor-toggle-icon elementor-toggle-icon-left text-secondary"
                                            aria-hidden="true">
                                            {!isOpen ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="size-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M8 12h8" />
                                                    <path d="M12 8v8" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="size-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M8 12h8" />
                                                </svg>
                                            )}
                                        </span>
                                        <a
                                            className="elementor-toggle-title text-left text-base font-bold sm:text-lg"
                                            tabIndex={-1}>
                                            {item.q}
                                        </a>
                                    </div>

                                    <div
                                        id={contentId}
                                        className="elementor-tab-content elementor-clearfix px-4 pt-0 pb-5 text-sm sm:text-base"
                                        role="region"
                                        aria-labelledby={titleId}
                                        style={{ display: isOpen ? "block" : "none" }}
                                        hidden={!isOpen}>
                                        <div className="font-sans [&>p]:mb-2 [&>ul]:list-disc [&>ul]:ps-5">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Minimal helper to stringify JSX answers for JSON-LD text (keeps SEO valid)
function stripJsx(s: string) {
    return s
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export default FAQ;
