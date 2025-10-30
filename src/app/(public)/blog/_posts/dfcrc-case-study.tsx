// src/app/blog/_posts/dfcrc-consultation-case-study.tsx
import Image from "next/image";
import Link from "next/link";

export const frontmatter = {
    title: "DFCRC Case Study",
    description: "The Digital Finance Cooperative Research Centre Consultation.",
    date: "2025-10-12",
    readingTime: "5 min",
    canonical: "https://www.kalisoftware.io/blog/dfcrc-case-study",
    // NEW: mark this post as a case study so the header shows "Case Study"
    postType: "case-study" as const,
    // NEW: card-only image for the blog index (not rendered inside the post)
    cardImage: "/images/caseStudies/dfcrc.png",
    cardImageAlt: "DFCRC consultation case study",
    author: {
        name: "Connor L",
        image: "/images/blogs/connor_lane.png",
    },
};

export function HeroBadge() {
    return (
        <a
            href="https://dfcrc.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit DFCRC website (opens in a new tab)"
            className="relative inline-grid h-48 w-48 place-items-center overflow-hidden rounded-full bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition-transform hover:scale-[1.03] dark:bg-white dark:ring-neutral-700"
            title="DFCRC — Digital Finance Cooperative Research Centre">
            {/* Black logo content using the image as a mask (keeps the circle bg white) */}
            <span
                aria-hidden
                className="absolute inset-0 scale-95 bg-black [mask-image:url('/images/investors/dfcrc.png')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [-webkit-mask-image:url('/images/investors/dfcrc.png')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            />
            <span className="sr-only">DFCRC</span>
        </a>
    );
}

export default function Post() {
    return (
        <div className="blog-content">
            {/* CASE SNAPSHOT / WHAT YOU'LL LEARN (structure preserved, content removed) */}
            <blockquote>
                <p>
                    The Digital Finance Cooperative Research Centre (DFCRC) is a 10 year $180 million research programme
                    funded by the Australian Government and industry. Their role is to research and trial
                    next-generation financial infrastructure (e.g. asset tokenisation, CBDC, and market design). We were
                    engaged to consult on data strategy and AI-augmented analytics for novel financial use cases drawing
                    on large datasets.
                </p>
                <br />
            </blockquote>
            {/* <p>
                <em>About DFCRC:</em> The Digital Finance Cooperative Research Centre brings together regulators,
                industry, fintech and researchers to explore the digitisation of financial assets and markets in
                Australia, including the RBA–DFCRC CBDC pilots and tokenised asset experiments. Learn more at{" "}
                <a href="https://dfcrc.com.au/" className="link" target="_blank" rel="noreferrer">
                    dfcrc.com.au
                </a>{" "}
                and the{" "}
                <a
                    href="https://www.rba.gov.au/payments-and-infrastructure/central-bank-digital-currency/"
                    className="link"
                    target="_blank"
                    rel="noreferrer">
                    RBA CBDC program
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
                The DFCRC engaged us over the span of a year to design and deliver the data architecture for financial
                decision makers of the future. The brief: work with PHD researchers and industry partners to integrate
                data so that AI can sit on top of it to safely enhance decision making.
            </p>
            <p>
                <strong>Key outcomes targeted:</strong>
            </p>
            <ul>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    Single, governed data foundation to integrate internal, partner and public datasets.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    AI systems sitting on top of the data foundation capable of safely enhancing decision making.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    The ability to build reports from financial data in an automated way.
                </li>
            </ul>

            <hr />

            {/* YOUR OPTIONS / CONTEXT & CONSTRAINTS */}
            <h2 id="your-options">Context, constraints &amp; success criteria</h2>
            <p>
                The programme spanned multiple institutions with different data formats, and research priorities. Data
                included internal decision making criteria, external financial data, macroeconomic data, and live market
                data.
            </p>
            <p>
                It became apparent that the project would have to deal with a rapidly changing landscape for AI
                integration, and so we needed the data to be designed in a way that would allow for interchangeable
                integration of whatever new models and techniques were developed. We experimented with a variety of
                approaches from training models, to RAG, and novel ways of structuring the input data.
            </p>
            <p>
                The primary constraint was the need to work with stakeholders across multiple institutions, with
                different data formats, and research priorities. We handles this by building for scalability from the
                start. This enabled us to quickly iterate, test new ideas and research different approaches with very
                little re-engineering of the data.
            </p>

            {/* OPTIONAL VISUAL SLOT (kept for layout parity) */}
            <div className="mt-6 hidden place-items-center [text-align:initial] md:grid">
                <div className="mx-auto w-full max-w-5xl">
                    {" "}
                    <div>
                        <Image src="/images/caseStudies/dfcrc.png" alt="DFCRC" width={400} height={225} />
                    </div>
                </div>
            </div>

            {/* APPROACH OVERVIEW */}
            <h3 className="mt-8 text-xl font-semibold">Approach</h3>
            <p className="mt-2">
                <strong>Engagement model</strong>
                <br />
                <em>Discovery + Consultation with researchers and industry partners.</em>
            </p>
            <p>
                We started by understanding the landscape and needs of the decision makers, in this case investment
                committees. After understanding the data that would be needed, we found two benefits to a best-practice,
                modern data architecture approach.
            </p>

            <ul>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    The ability to automate much of the process from data to insights. This allows for much faster
                    insights and less labour hours to be spent on manually finding and converting data.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    The ability to search for insights semantically, i.e. with AI assistance. This allows for extremely
                    fast discovery of supporting information and had the ability to drastically improve decision making.
                </li>
            </ul>

            {/* WORKSTREAMS / PHASES */}
            <h3 className="mt-6 text-xl font-semibold">Build &amp; phases</h3>
            <p>Three concurrent tracks produced quick wins while laying a scalable foundation.</p>

            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-semibold">Discovery</h4>
                    <p className="opacity-80">
                        Stakeholder mapping, data inventory, governance &amp; risk review, success metrics.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Catalogue sources (internal, partner, public) </li>
                        <li>Agree evaluation criteria (accuracy, freshness, explainability, cost, latency).</li>
                        <li>Baseline current state: lineage, data quality, reporting gaps and duplication.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Design</h4>
                    <p className="opacity-80">
                        Architecture, standards and operating model for repeatable research pilots and iterations.
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>
                            Target architecture: cloud data platform, fact/dimension tables, analytics and AI layer.
                        </li>
                        <li>Governance: RBAC, testing, lineage and cost guardrails.</li>
                        <li>AI patterns: RAG, anomaly detection, structured JSON outputs.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Delivery</h4>
                    <p className="opacity-80">Building the “thin slice”, then scale by template.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Quickly standing up the priority datasets and low hanging fruit.</li>
                        <li>Meeting initial model accuracy benchmarks.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Iteration</h4>
                    <p className="opacity-80">Scaling out to additional datasets and use cases.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Idempotency and retries for data ingestion and model training.</li>
                        <li>Evaluation, backtesting and human-in-the-loop review of model accuracy.</li>
                        <li>Documentation of the data and model for transparency and auditability.</li>
                    </ul>
                </div>
            </div>

            <p>
                <strong>Selected results</strong>
            </p>
            <ul className="list-disc pl-6">
                <li>
                    Successfully showed that integrated data and AI can be used to enhance decision making for
                    investment committees.
                </li>
                <li>
                    Integrated data from internal decision making criteria, external financial data, macroeconomic data,
                    and live market data into a single, governed data foundation.
                </li>
                <li>
                    Successfully demonstrated the ability to search for insights semantically, i.e. with AI assistance.
                </li>
                <li>Successfully demonstrated the ability to build reports from financial data in an automated way.</li>
            </ul>

            <hr className="my-6" />

            {/* SOLUTION / ARCHITECTURE SUMMARY */}
            <h3 className="text-xl font-semibold">Solution overview</h3>
            <p className="mt-2">
                <strong>Data platform.</strong> Cloud warehouse as the system of analysis; ingestion via ELT; modeling
                with dbt; automated tests; lineage capture; cost/freshness monitors. A governed semantic layer exposes
                certified metrics to BI tools and notebooks.
            </p>
            <p>
                <strong>AI-enhanced analysis.</strong> Retrieval-augmented generation and data documentation;
                anomaly/outlier detection for time-series; templated executive summaries that include links to
                underlying models, assumptions and sources.
            </p>
            <p>
                <strong>Custom dashboard.</strong> Role-based access control (RBAC) to ensure each user only sees the
                data and actions appropriate to their role. Built with Next.js, the dashboard is fast, secure, and
                includes custom chatbots for guided analysis.{" "}
            </p>

            <h4 className="mt-4 font-semibold">Notable benefits</h4>
            <p>What this means for financial decision-makers:</p>
            <ul className="list-disc pl-6">
                <li>
                    <strong>Trustworthy numbers:</strong> consistent definitions with tests and lineage embedded.
                </li>
                <li>
                    <strong>Faster insight:</strong> analysts spend time evaluating hypotheses, not wrangling data.
                </li>
                <li>
                    <strong>Explainable AI:</strong> every AI-assisted answer includes citations and guardrails.
                </li>
                <li>
                    <strong>Comparability:</strong> pilots use the same metrics, enabling apples-to-apples assessment.
                </li>
                <li>
                    <strong>Scalability:</strong> new datasets and partners plug into contracts and standards.
                </li>
                <li>
                    <strong>Security by design:</strong> RBAC ensures least-privilege access to sensitive data.
                </li>
                <li>
                    <strong>Lower total cost:</strong> reusable assets and automated quality checks reduce run costs.
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
