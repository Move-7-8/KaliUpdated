"use client";

import Link from "next/link";
import { useCallback } from "react";

// ✅ Internal link to the blog (SEO-friendly)

export default function RevenueOperations() {
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
                        <span className="badge badge-ghost badge-lg border-2 border-black">RevOps</span>
                        <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Revenue Operations for Australian Teams
                        </h1>

                        {/* Definition box for snippet targeting */}
                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>Revenue Operations</strong> requires a technical approach to data and a
                                commercially strategic approach to revenue. We have both, and can help your business
                                combine sales, marketing and customer success into a single, cohesive revenue engine.
                            </p>
                        </div>

                        {/* ✅ SEO-friendly internal link to the detailed blog guide */}
                        {/* <div className="mt-3">
                            <Link
                                href="/blog/revops-crm-australia-how-to"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover underline-offset-4">
                                Read the full guide:{" "}
                                <span className="whitespace-nowrap">How to Stand Up Modern RevOps</span>
                            </Link>
                        </div> */}
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 font-sans shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>The real outcome of great RevOps is generating valuable insights.</p>
                        <p>
                            To get there you need a strategy, an clear picture of where you are today, and a view of
                            where you want to be. We put the foundations in place so this is possible: integrated data,
                            a clean CRM, consistent tracking, and a single source of truth across your teams.
                        </p>
                        <p>Once you have a solid foundation, you can generate insights.</p>
                        <p>
                            For example: Imagine your Product usage, CRM, and billing tools are connected. When usage
                            crosses a threshold, the right salesperson in notified to follow up with the up-sell that
                            your data shows is the most likely to succeed.
                        </p>
                        <p>
                            Or: Your forecasts just became significantly more accurate because you now have granular
                            data about customer types, their behaviour and how this translates to revenue.
                        </p>
                        <figure className="self-start md:float-right md:ml-6">
                            {" "}
                            <img
                                src="/images/blogs/hubspotsolutions.png"
                                alt="Diagram showing clean connections across apps and databases."
                                loading="lazy"
                                className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                            />
                            <figcaption className="text-base-content/80 mt-2 text-sm">
                                We're a Hubspot Solutions Partner.
                            </figcaption>
                        </figure>
                        <p>
                            Our difference is technical depth. We build API first integrations with proper error
                            handling, retries, and logging. We clean and match data at the source so your CRM reflects
                            reality, then we publish consistent definitions to reports and dashboards.
                        </p>

                        <div className="text-base-content mx-auto max-w-5xl space-y-4 md:text-lg">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                What does Rev Ops include?
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>

                            <p>
                                Revenue Operations is the operating system for growth: it aligns marketing, sales, and
                                customer success with shared data, clear rules, and reliable automation. It's not purely
                                data analytics, and it covers a number of different workflows.
                            </p>
                            <p>
                                Automation: Connect your CRM, marketing, product, and billing tools to trigger alerts,
                                routing, and workflows (e.g. speed-to-lead pings, renewal/upsell workflows).
                            </p>
                            <p>
                                Analytics: Defines metrics, builds dashboards, and instruments the funnel (conversion
                                rates, cohort retention, pipeline health) so decisions come from one truth.
                            </p>
                            <p>
                                Process &amp; governance: Clear stages, data definitions, and CRM hygiene (ownership,
                                validation, deduplication) so everyone works the same way.
                            </p>
                        </div>
                        {/* Full-width follow-up paragraph (moved out of grid) */}
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                Our Process
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>
                        <p>
                            We start by ascertaining what your goals are, then providing an audit of your lifecycle,
                            CRM, data and reporting. Then we integrate the data and see what insights are possible
                            straight out of the gate.
                        </p>
                        <p>
                            We can offer input or ownership for improving your processes, such as implementing shared
                            lifecycle stages, CRM properties, and connecting your GTM stack through API or shared
                            database with idempotency and clear logs.
                        </p>
                        <p>
                            We standardise reporting across the funnel from lead to revenue to retention and expansion.
                        </p>
                        <p>
                            <strong>The result:</strong> a clean CRM, consistent processes, notifications, and executive
                            ready insights every month. Fewer manual steps, faster handoffs, and a single language
                            across your GTM teams.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                ["Unified lifecycle", "Shared stages and definitions across GTM teams."],
                                ["Clean and reliable CRM", "Governed fields, ownership, routing and SLAs that stick."],
                                [
                                    "Engineering grade integrations",
                                    "API first connections with retries, monitoring and clear logs.",
                                ],
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

                    {/* FAQ */}
                    <div className="mx-auto mt-10 max-w-5xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl">Frequently Asked Questions</h2>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                How long does a typical RevOps engagement take?
                            </div>
                            <div className="collapse-content space-y-3 text-sm md:text-base">
                                <p>
                                    You’ll see meaningful improvements early as we ship the easy fixes. Things like
                                    faster first response to enquiries, cleaner CRM fields, and identifying sources of
                                    errors.
                                </p>
                                <p>
                                    The foundational build typically depends on the amount of data and the complexity of
                                    the integrations, but once it's in place, we can generate insights very quickly.
                                </p>
                                <p>
                                    RevOps is an ongoing cycle of optimisation, iteration and improvement. We offer
                                    reviews of what’s working, updates to definitions and workflows as your business
                                    changes, and steady expansion of insights so performance keeps improving.
                                </p>
                            </div>
                        </div>
                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Which systems and tools typically fit into a RevOps stack?
                            </div>
                            <div className="collapse-content space-y-3 text-sm md:text-base">
                                <p>
                                    Critically, you'll want to connect modern CRMs like HubSpot, and Salesforce. Product
                                    analytics tools like GA4, Mixpanel, PostHog. Any tools you might use to interact
                                    with your customers, like Zendesk.
                                </p>
                                <p>
                                    After this foundation, you can also build in finance ops, data warehouses, Slack
                                    (for notifications), and dashboards so teams can see the critical rev ops insights
                                    they need.
                                </p>
                            </div>
                        </div>
                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Should a RevOps provider have a technical background?
                            </div>
                            <div className="collapse-content space-y-3 text-sm md:text-base">
                                <p className="">
                                    If your business or department consists of multiple salespeople, you have CRM data,
                                    marketing data, customer success data, or product usage data you're looking to
                                    connect, you should consider someone with a technical background to implement the
                                    solution.
                                </p>
                                <p className="">
                                    A half-baked implementation, moving data around without a technical understanding of
                                    databases, APIs, and data quality, can lead to mistakes that are not only very
                                    difficult to fix, but are very difficult to identify.
                                </p>
                                <p className="">
                                    At it's core, RevOps is a technical discipline. Though it definitely also requires a
                                    commercial understanding of business processes, and a consulting approach to its
                                    implementation. We are focused on providing both.
                                </p>
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Will you align lifecycle and funnel definitions?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. Shared definitions are encoded in CRM fields, workflows and dashboards so every
                                team speaks the same language. Taking a technical approach, we can ensure the data is
                                consistent and reliable across all tools.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">How do you keep data clean?</div>
                            <div className="collapse-content text-sm md:text-base">
                                Validation, idempotency, deduplication, audit logs and ownership rules, all keep data
                                trustworthy.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Do you train the team and document processes?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We provide training, documentation and data validation so that your team has time to get
                                into the new cadence, and insights make their way back to the people who use them.
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "RevOps / CRM — free audit. Context: lifecycle, CRM, integrations, reporting, timelines.",
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
                    message: "RevOps / CRM — book a 30-min solution design call.",
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
