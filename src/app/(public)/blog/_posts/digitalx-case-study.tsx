// src/app/blog/_posts/digitalx-product-build-case-study.tsx
import Image from "next/image";
import Link from "next/link";

export const frontmatter = {
    title: "DigitalX Case Study",
    description:
        "How we designed and shipped an investment research & digital asset analytics product with DigitalX, an ASX-listed digital asset manager.",
    date: "2025-10-18",
    readingTime: "5 min",
    canonical: "https://www.kalisoftware.io/blog/digitalx-case-study",
    // NEW: mark this post as a case study so the header shows "Case Study"
    postType: "case-study" as const,
    // NEW: card-only image for the blog index (not rendered inside the post)
    cardImage: "/images/caseStudies/digitalx.png",
    cardImageAlt: "DigitalX product build case study",
    author: {
        name: "Connor L",
        image: "/images/blogs/connor_lane.png",
    },
};

// Per-post header badge: white circle container, logo content rendered in black via CSS mask
export function HeroBadge() {
    return (
        <a
            href="https://www.digitalx.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit DigitalX website (opens in a new tab)"
            className="relative inline-grid h-48 w-48 place-items-center overflow-hidden rounded-full bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition-transform hover:scale-[1.03] dark:bg-white dark:ring-neutral-700"
            title="DigitalX — Digital Asset Manager">
            {/* Black logo content using the image as a mask (keeps the circle bg white) */}
            <span
                aria-hidden
                className="absolute inset-0 scale-95 bg-black [mask-image:url('/images/investors/digital.png')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [-webkit-mask-image:url('/images/investors/digital.png')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            />
            <span className="sr-only">DigitalX</span>
        </a>
    );
}

export default function Post() {
    return (
        <div className="blog-content">
            {/* CASE SNAPSHOT / WHAT YOU'LL LEARN (structure preserved, content kept concise) */}
            <blockquote>
                <p>
                    DigitalX is an ASX-listed digital asset manager offering funds and a spot Bitcoin ETF. We partnered
                    to design and ship an investment analytics product that brings fragmented data into one place for
                    investment research work.
                </p>
                <br />
            </blockquote>
            {/* <p>
                <em>About DigitalX:</em> DigitalX Ltd (ASX: DCC) manages digital asset investment products and
                operates Australia’s spot Bitcoin ETF (BTXX). Learn more at{" "}
                <a href="https://www.digitalx.com/" className="link" target="_blank" rel="noreferrer">
                    digitalx.com
                </a>{" "}
                and the{" "}
                <a
                    href="https://www.digitalx.com/funds/bitcoin-etf/"
                    className="link" target="_blank" rel="noreferrer">
                    Bitcoin ETF page
                </a>
                .
            </p>
 */}
            {/* <div className="mt-4 mb-4">
                <a
                    href="#contact"
                    data-open-contact
                    data-message="Consultation — free audit. Context: scope, systems, stakeholders, deadlines."
                    className="btn btn-primary border-2 border-black">
                    Get in Touch
                </a>
            </div> */}

            <hr />

            {/* END GOAL / OBJECTIVES */}
            <h2 id="end-goal">Objectives &amp; outcomes</h2>
            <p>
                DigitalX engaged us to deliver a production-grade platform for fund operations: consolidate on-chain,
                digital asset data; standardise metrics and calculations; auto-generate recurring factsheets and
                dashboards; and enable safe AI-assisted Q&amp;A across digital assets, economic data and semantic
                research notes.
            </p>
            <p>
                <strong>Key outcomes targeted:</strong>
            </p>
            <ul>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    A governed data flow connecting digital asset data, investment research and public datasets.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    AI search functionality, live dashboards, and ad-hoc report building capabilities.
                </li>
            </ul>

            <hr />

            {/* YOUR OPTIONS / CONTEXT & CONSTRAINTS */}
            <h2 id="your-options">Context, constraints &amp; success criteria</h2>
            <p>
                The platform needed to serve investment analysts with different goals, fields, levels of research.
                Datasets ranged from API data, to on-chain transactions and internal pricing and risk criteria.
            </p>
            <p>
                Because the digital asset environment shifts quickly, the solution had to support swap-in models, new
                data vendors and evolving compliance language without rewiring pipelines. We validated approaches across
                trained models, retrieval-augmented generation (RAG), and structured prompting with an evaluation
                harness tracking precision, grounding and latency.
            </p>

            <div className="mt-6 hidden place-items-center [text-align:initial] md:grid">
                <div className="mx-auto w-full max-w-5xl">
                    <div>
                        <Image src="/images/caseStudies/digitalx.png" alt="DigitalX" width={400} height={225} />
                    </div>
                </div>
            </div>

            {/* APPROACH OVERVIEW */}
            <h3 className="mt-8 text-xl font-semibold">Approach</h3>
            <p className="mt-2">
                <strong>Engagement model</strong>
                <br />
                <em>Discovery with portfolio teams and investment analysts</em>
            </p>
            <p>
                We mapped digital asset data types → investment research report flows end-to-end, and understood the
                manual processes engaged in by analysts. We learned what the best use of analyst time was, and where
                their tasks could be abstracted away.
            </p>

            <h3 className="mt-6 text-xl font-semibold">Build &amp; phases</h3>
            <p>
                Four coordinated tracks delivered quick analytics for the high priority work, while laying a scalable
                foundation.
            </p>

            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-semibold">Discovery</h4>
                    <p>
                        We built a report that covered the practical benefits of analytics, data integration, AI and
                        automation for the investment research use-cases that DigitalX were experiencing. We estimated
                        ROI and cost savings for abstracting away manual data collection tasks.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Catalogued sources (on-chain, market, registry, research).</li>
                        <li>Define evaluation criteria (accuracy, freshness, explainability, latency, cost).</li>
                        <li>Baseline current state: lineage, data quality, reporting gaps and duplication.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Design</h4>
                    <p className="opacity-80">
                        Target architecture, standards and operating model for multi-product reporting.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Cloud data platform; event/object schemas; models &amp; tests; AI layer.</li>
                        <li>Governance: RBAC, cost guardrails.</li>
                        <li>AI patterns: RAG anomaly detection, templated narratives.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Delivery</h4>
                    <p className="opacity-80">
                        Building for the high priority work, then scaling out to additional datasets and use cases.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Priority datasets ingested and modeled; quality tests and lineage in place.</li>
                        <li>Publish governed metrics; generate baseline factsheets and investor updates.</li>
                        <li>Implement AI Q&amp;A with citations.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Iteration</h4>
                    <p className="opacity-80">Scale to additional datasets and use cases.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Idempotent ingestion; retries; backfilling; change-data-capture where available.</li>
                        <li>Evaluation/backtesting; red-team prompts; prompt-library versioning.</li>
                        <li>Documentation for transparency and auditability.</li>
                    </ul>
                </div>
            </div>

            <p>
                <strong>Results</strong>
            </p>
            <ul className="list-disc pl-6">
                <li>Enhanced asset selection capabilities for speed and breadth of selection.</li>
                <li>Dashboards for key metrics and trends.</li>
                <li>AI-assisted Q&amp;A for semantic discovery with source-level citations.</li>
                <li>Less manual collation and fewer one-off spreadsheets across research teams.</li>
            </ul>

            <hr className="my-6" />

            {/* SOLUTION / ARCHITECTURE SUMMARY */}
            <h3 className="text-xl font-semibold">Solution overview</h3>
            <p className="mt-2">
                <strong>Data platform.</strong> Cloud warehouse as the analytical system of record; ingestion; models
                with automated tests; lineage capture; freshness and cost monitors. A governed AI layer exposes key
                metrics for search.
            </p>
            <p>
                <strong>AI-enhanced analysis.</strong> templated research dashboards displaying key standardised metrics
                and trends across different data sources.
            </p>
            <p>
                <strong>Custom web app to house the analytics and AI.</strong> Role-based access control (RBAC) ensured
                each user only sees the data and actions appropriate to their role. Built with Next.js, the dashboard is
                fast, secure, and includes custom chatbots for guided analysis.
            </p>

            <h4 className="mt-4 font-semibold">Notable benefits</h4>
            <p>What this means for investment &amp; operations teams:</p>
            <ul className="list-disc pl-6">
                <li>
                    <strong>Reliable numbers:</strong> consistent definitions with tests and lineage embedded.
                </li>
                <li>
                    <strong>Faster analysis:</strong> analysts evaluate hypotheses instead of wrangling data.
                </li>
                <li>
                    <strong>Explainable AI:</strong> every AI-assisted answer includes citations and guardrails.
                </li>
                <li>
                    <strong>Elastic scale:</strong> new datasets and vendors plug into standards easily.
                </li>
                <li>
                    <strong>Security by design:</strong> RBAC ensures least-privilege access.
                </li>
                <li>
                    <strong>Lower total cost:</strong> Automation of tasks reduces manual hours spent on data
                    collection.
                </li>
            </ul>

            <p>
                <em>AI is an accelerant, not a substitute.</em> In this context it helps domain experts see more,
                sooner.
            </p>

            <p>The Kali Software team</p>

            {/* FINAL CTA */}
            {/* <div className="flex flex-wrap gap-3">
                <Link href="/services/consulting" className="btn btn-outline border-2 border-black">
                    Consulting services
                </Link>
            </div> */}
        </div>
    );
}
