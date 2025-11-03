"use client";

import Link from "next/link";
import { useCallback } from "react";

// src/app/services/data-analytics/components/DataAnalytics.tsx

export default function DataAnalytics() {
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    return (
        <main className="bg-base-200 text-base-content">
            <section className="mx-auto w-11/12 max-w-7xl px-4 pt-10 pb-16 md:w-10/12 md:px-6 lg:px-8">
                {/* Header band on primary */}
                <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                    {/* subtle texture grid */}
                    <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                    <div className="relative p-6 md:p-10">
                        <span className="badge badge-ghost badge-lg border-2 border-black">Analytics</span>
                        <h1 className="mt-4 font-sans text-4xl font-extrabold tracking-tight md:text-5xl">
                            Data Analytics for Australian SMEs
                        </h1>

                        {/* Definition box for snippet targeting */}
                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>Data analytics</strong> that turns raw numbers into decisions. Whether you need
                                Power BI set up the right way, or require bespoke custom dashboards and reports, we can
                                help you make sense of your numbers so that you can make decisions with confidence.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 font-sans shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>
                            Make the <strong>numbers that matter</strong> obvious. We curate KPIs, model them once, and
                            present them in clear dashboards and reports your teams actually use.
                        </p>
                        <p>
                            Our builds emphasise <strong>speed</strong>, <strong>trust</strong>, and{" "}
                            <strong>security</strong>: refreshes are fast and reliable, calculations are consistent, and
                            audiences see what they should. Nothing more, nothing less.
                        </p>
                        {/* Full-width lead-in */}
                        <p className="mt-6">Common analytics pain points we fix:</p>
                        {/* Bullets left, image right */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                            <div className="space-y-4 md:col-span-7">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>“Why don’t these numbers match?” Decisions are only as sound as your data.</li>
                                    <li>Slow or manual reports; repetitive data collection and cleaning waste time.</li>
                                    <li>data re-written across platforms; this wastes time and creates errors.</li>
                                    <li>Manual Excel exports, copy-paste workflows, and version sprawl headaches.</li>
                                    <li>No row-level security or access controls; security remains weak.</li>
                                </ul>
                            </div>

                            <figure className="self-start md:col-span-5 md:justify-self-end">
                                <img
                                    src="/images/caseStudies/dashboards.png"
                                    alt="Analytics architecture diagram—governed semantic layer serving dashboards and reports."
                                    loading="lazy"
                                    className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                                />
                                <figcaption className="text-base-content/80 mt-2 text-sm">
                                    Our custom ecommerce dashboard.
                                </figcaption>
                            </figure>
                        </div>
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="why-you-need-data-analytics"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                Why analytics needs to be done right
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>
                        <p>
                            In modern business, all decisions at all levels are data-driven. If you don't have the data
                            readily available, or worse, if the data is incorrect, you're at a fundamental disadvantage.
                            Best practice teams run on clarity, not guesswork. If teams are debating numbers, waiting
                            days for updates, or juggling conflicting spreadsheets, you probably need to re-think how
                            your data strategy.
                        </p>
                        <p>
                            Data analytics should create one trusted view of performance so leaders can prioritise,
                            teams can focus, and issues are caught early. It cuts busywork, builds accountability, and
                            turns everyday activity into measurable outcomes. The result is faster decisions, less
                            waste, and a business that learns and adapts before competitors do.
                        </p>
                        {/* Full-width follow-up paragraph (moved out of grid) */}
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                How we can help
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>
                        <p>
                            We start with a short discovery to understand your goals, the decisions you need to make,
                            and who needs to see what. Together we prioritise quick wins and a clear plan.
                        </p>
                        <p>
                            Next, we connect the tools you already use and clean the data so it’s accurate and
                            consistent. No duplicates, no conflicting numbers. From there we decide the best way to
                            present it, whether that’s <strong>Power BI</strong>, <strong>custom dashboards</strong>, or{" "}
                            <strong>regular reporting</strong>, then we build it and train your team to use it
                            confidently.
                        </p>
                        <p>
                            <strong>The result:</strong> clear, trustworthy reporting that speeds up decision-making,
                            cuts manual work, and keeps everyone aligned on the numbers that matter.
                        </p>{" "}
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                [
                                    "BI platforms, your way",
                                    "Give your team the power of tools like Power BI or Tableau. Set up properly in one simple, trusted environment. With clear how-to’s so everyone can self-serve.",
                                ],
                                [
                                    "Custom dashboards (Next.js)",
                                    "Bespoke web dashboards built in Next.js. Fast, branded, and tailored to your workflows and KPIs.",
                                ],
                                [
                                    "Leadership-ready reports",
                                    "Specialised reports that get to the bottom of specific questions leaders ask. Clear, defensible, and delivered fast.",
                                ],
                            ].map(([title, body]) => (
                                <div key={title} className="card bg-base-100 border border-black shadow-sm">
                                    <div className="card-body text-base-content">
                                        <h3 className="card-title font-ocr text-base">{title}</h3>
                                        <p className="text-sm opacity-90">{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>{" "}
                    </div>

                    {/* FAQ */}
                    <div className="mx-auto mt-10 max-w-5xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl">Frequently Asked Questions</h2>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                How long does a typical analytics engagement take?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                It will depend on the amount and complexity of the data. But typically we will deliver
                                the high-value data quickly and iterate from there. You won't wait until the end of the
                                project to see value.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">Which tools do you support?</div>
                            <div className="collapse-content text-sm md:text-base">
                                We're the experts in custom, we can work with any tool you're already using or create
                                one if required. But
                                <strong>Power BI</strong> or <strong>Tableau</strong> is what we would usually recommend
                                if you're unsure.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Can you create custom dashboards and paginated reports?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. We've built many role-based dashboards, forms, and beautiful visualisations for
                                larger teams who require something too complex for an off-the-shelf solution.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Do you offer forecasting or predictive analytics?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. We can add forecasting and predictive analytics to help you plan for the future.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">How do you ensure data quality?</div>
                            <div className="collapse-content text-sm md:text-base">
                                The first step in any analytics engagement is to ensure your data is accurate and
                                consistent. If needed, we can first integrate your data from multiple platforms into a
                                single, source of truth.
                            </div>
                        </div>

                        {/* <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">What if a metric changes?</div>
                            <div className="collapse-content text-sm md:text-base">
                                Changes are reviewed, versioned, and communicated—dashboards adopt new logic safely.
                            </div>
                        </div> */}
                    </div>

                    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "Data Analytics — free audit. Context: KPIs, tools, warehouse, stakeholders, deadlines.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                            Get in touch
                        </button>

                        {/* <button
              type="button"
              onClick={() =>
                openContact({
                  initial: {
                    message: "Data Analytics — book a 30-min solution design call.",
                  },
                })
              }
              className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
              Talk to a consultant
            </button> */}
                    </div>
                </div>
            </section>
        </main>
    );
}
