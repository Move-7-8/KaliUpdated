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
            q: "How do you automate business processes?",
            a: (
                <>
                    Start by mapping the manual steps (triggers, rules, approvers, systems). Then connect your tools
                    (Xero, Stripe, HubSpot, ClickUp, Slack, etc.) via APIs, build workflows with Python/Next.js, add
                    error handling and logs, and ship in weekly milestones so you see ROI fast.
                </>
            ),
        },
        {
            q: "What is workflow automation and how does it work?",
            a: "Triggers (e.g., new lead, payment, form submission) kick off actions like enrichment, approvals, document generation, notifications, and data sync—using rules and AI where it helps. This is the mundane work that cost teams time and energy.",
        },
        {
            q: "What are the limitations of AI and automation?",
            a: "There are a lot! AI is not a silver bullet and there are no great off the shelf solutions if you already have processes in place. Any AI or automation solution must consider your internal processes, workflows, staff training, the risks associated with hallucination (and how to prevent them). AI and automation are great tools for the right task, and we can tell you if the task is right - and the limitations of the implementation.",
        },
        {
            q: "Should I use Zapier/ no code solutions or build custom automation with code?",
            a: "No-code is great to validate. For scale, resilience, security, and anything but the simplest logic, API-first automation with code wins. Often we start no-code to brainstorm and map out the process with you, then migrate high-value flows to a TypeScript/Python service with tests and monitoring.",
        },
        {
            q: "How much does automation or an AI project cost in Australia?",
            a: (
                <>
                    Consultation and initial audit is completely free. The majority of our projects sit around $2,500 a
                    month, and that includes multiple workflow automations, ongoing support and optimisation. Anything
                    high value or particularly complex can be discussed on a case by case basis.
                </>
            ),
        },
        {
            q: "What ROI can I expect from automation?",
            a: "Most first-phase projects save 30–60% of admin time in the target process, reduce errors, and speed up reporting. We quantify the labour value of hours saved, cycle time, and accuracy, then reinvest wins into the next highest-ROI workflow.",
        },
        {
            q: "How long does it take to build an MVP or dashboard?",
            a: "Simple dashboards ship in 3 weeks once data sources are connected. Automations are usually 3–6 weeks. A scoped MVP web app is commonly 4-8 weeks, depending on integrations and security.",
        },
        {
            q: "Which analytics tool should I use: Power BI, Looker, Metabase, or custom?",
            a: "It depends on data sources, governance, and budget. SMBs often start with Metabase or Power BI; scale-ups like Looker or a custom Next.js data app for embedded analytics.",
        },
        {
            q: "Do I need a data warehouse before dashboards?",
            a: "Not always. If your data lives in a few systems, we can centralise just enough for reliable metrics. As you grow, we add a warehouse and models for speed, governance, and reuse.",
        },
        {
            q: "Can you integrate Xero, Stripe, HubSpot, ClickUp, Slack, and PandaDoc?",
            a: "Yes. We can make just about any kind of software integrate with our systems, and we have a lot of experience with all of the above.",
        },
        {
            q: "Will my data stay in Australia? (Data residency & privacy)",
            a: (
                <>
                    Yes. We can host in Australia and design for OAIC privacy compliance with least-privilege access,
                    audit logs, and retention controls.
                </>
            ),
        },
        {
            q: "Who owns the IP and source code for custom applications?",
            a: "You do. On completion and payment, IP is assigned to your company. We provide full source code access and handover documentation.",
        },
        {
            q: "How do I choose the right automation agency?",
            a: "Ensure they have strong technical expertise. Speak with their past clients, ask technical questions and read through their case studies. Ask for a small fixed-price pilot and prove your highest-value workflow first.",
        },
        {
            q: "Can you work with legacy systems and spreadsheets?",
            a: "Yes. We build adapters around legacy apps, read/write spreadsheets safely, and progressively replace fragile steps with APIs and durable services.",
        },
        {
            q: "Do you offer maintenance and support?",
            a: "Yes—SLA support, proactive monitoring, and monthly improvement sprints.",
        },
        {
            q: "Can we start with a free assessment?",
            a: (
                <>
                    Yes. Book a free workflow audit. We’ll identify quick wins, an ROI estimate, and the fastest path to
                    value with a simple plan.
                </>
            ),
        },
        {
            q: "Do you work only in Sydney and Perth?",
            a: "We’re able to work Australia-wide (though have a physical presence in Perth and Sydney).",
        },
        {
            q: "What tech stack do you use for automation and AI?",
            a: "We work with a range of cutting edge technologies. Most commonly,Next.js/TypeScript for apps, Python / n8n for data and automation, Vercel/AWS for cloud.",
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
        <section className="mx-auto w-[85%] py-8 md:py-12 xl:py-16 2xl:py-24" id="faqs">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Stacked layout: header on top, dropdowns below */}
            <div className="flex flex-col gap-12 lg:gap-16">
                <div>
                    {/* <div className="inline-flex items-center rounded border border-purple-500/10 bg-purple-500/5 p-2">
                        <span className="iconify lucide--messages-square size-5 text-purple-600" />
                    </div> */}
                    <h2 className="mb-2 text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-base-content/70 inline-block max-w-lg font-sans">
                        Questions our clients commonly ask about automation, data, and custom web applications.
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
