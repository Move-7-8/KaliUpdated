"use client";

import Link from "next/link";
import { useCallback } from "react";

// src/app/services/data-integration/components/DataIntegration.tsx

export default function DataIntegration() {
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
                        <span className="badge badge-ghost badge-lg border-2 border-black">Workflow Automation</span>
                        <h1 className="mt-4 font-sans text-4xl font-extrabold tracking-tight md:text-5xl">
                            Data Integration for Australian SMEs
                        </h1>

                        {/* Definition box for snippet targeting */}
                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>Data integration</strong> connects the systems you already use and keeps the
                                same customer, product, and finance data in sync everywhere. We remove double entry, fix
                                mismatched records, and make sure information flows to the right teams in CRM, support,
                                finance, and analytics.
                            </p>
                        </div>

                        {/* ✅ SEO-friendly internal link to the detailed blog guide */}
                        {/* <div className="mt-3">
                            <Link
                                href="/blog/data-integration-australia-how-to"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover underline-offset-4">
                                Read the full guide:{" "}
                                <span className="whitespace-nowrap">How to Build a Robust Data Integration Stack</span>
                            </Link>
                        </div> */}
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 font-sans shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>Make your systems speak the same language, reliably.</p>
                        <p>
                            We map your data across apps, clean and reconcile it, and set up reliable syncs on a clear
                            schedule. You get fewer errors, faster updates, and a single picture of what is happening
                            across the business.
                        </p>

                        {/* Full-width lead-in */}
                        <p className="mt-6">
                            Off the shelf connectors often create manual re entry, drift, and missed signals between
                            systems. Common problems include:
                        </p>

                        {/* Bullets left, image right */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                            <div className="space-y-4 md:col-span-7">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Data entered twice in different tools and never fully matching.</li>
                                    <li>Contacts and companies that do not align across CRM, billing, and support.</li>
                                    <li>Field names and formats that do not map cleanly between systems.</li>
                                    <li>Syncs that create duplicates or fail without notice.</li>
                                    <li>No simple way to see where a value came from or who changed it.</li>
                                </ul>
                            </div>

                            <figure className="self-start md:col-span-5 md:justify-self-end">
                                <img
                                    src="/images/blogs/hubspotintegration.png"
                                    alt="Diagram showing clean connections across apps and databases."
                                    loading="lazy"
                                    className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                                />
                                <figcaption className="text-base-content/80 mt-2 text-sm">
                                    A single source of truth for your business.
                                </figcaption>
                            </figure>
                        </div>

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
                            We start with discovery. Together we list your systems, the records that matter, and the
                            outcomes you want. We agree on owners and a simple plan that delivers value quickly.
                        </p>

                        <p>
                            Next we connect your apps, clean and match the data, and design clear mappings between
                            fields. We build reliable syncs with sensible schedules, alerts when something needs
                            attention, and a simple way to track what changed. If you need information to flow both ways
                            we make that work safely.
                        </p>

                        <p>
                            When you need scale we add the right tools without making things complex. That can include
                            managed connectors like <strong>Fivetran</strong> and a cloud data warehouse such as{" "}
                            <strong>BigQuery</strong> or <strong>Snowflake</strong> to centralise data for reporting and
                            analytics. We can recommend the right tools for your needs or work within your existing
                            ecosystem.
                        </p>

                        <p>
                            <strong>The result:</strong> up to date, trustworthy data in every tool your teams use. Less
                            copy and paste, fewer mistakes, and faster handoffs between sales, finance, support, and
                            analytics.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                [
                                    "Trustworthy data",
                                    "Accurate, deduplicated records that teams can rely on for day to day work.",
                                ],
                                [
                                    "One view of the truth",
                                    "Consistent customers, products, and transactions across CRM, finance, support, and analytics.",
                                ],
                                [
                                    "Reliable automations",
                                    "Syncs that run on time with monitoring and clear logs so issues are easy to spot and fix.",
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
                                How long does a typical data integration take?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Timelines depend on the number of systems and the quality of the data. We deliver the
                                most valuable connections first so you see progress quickly and then build from there.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                What tools and platforms do you support?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We work with the tools you already have and the ones that make sense for your goals. If
                                you are unsure we will recommend options that fit your size, budget, and team.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Can you sync data back into my operational tools?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. We can publish cleaned data back to CRM, support, finance, or marketing so each
                                team works with the same picture and data doesn't need to be entered twice.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">How do you manage data quality?</div>
                            <div className="collapse-content text-sm md:text-base">
                                We put checks in place for freshness and completeness, reconcile key fields, and set
                                alerts so small issues do not turn into big ones. We also agree ownership so fixes are
                                fast.
                            </div>
                        </div>
                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">Where is the data stored?</div>
                            <div className="collapse-content text-sm md:text-base">
                                We prefer to domicile the data onshore, right here in Australia. This provides you with
                                data sovereignty and privacy, and the peace of mind that your data is safe and secure.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                What happens if I want to use a new platform or my data changes?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Our data integration service is designed to be flexible and scalable. We can add new
                                platforms or change the data flow with relative simplicity. We can also help you with
                                the data migration if you need to move your data to a new platform.
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
                                            "Data Integration — free audit. Context: sources, warehouse, volumes, stakeholders, deadlines.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                            Free data audit
                        </button>

                        <button
              type="button"
              onClick={() =>
                openContact({
                  initial: {
                    message: "Data Integration — book a 30-min solution design call.",
                  },
                })
              }
              className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
              Talk to a consultant
            </button>
                    </div>
                    */}
                </div>
            </section>
        </main>
    );
}
