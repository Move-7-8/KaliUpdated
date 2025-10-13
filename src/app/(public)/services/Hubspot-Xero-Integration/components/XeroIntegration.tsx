"use client";

import Link from "next/link";
import { useCallback } from "react";

// ✅ Internal link to the blog (SEO-friendly)

export default function XeroIntegration() {
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
                        <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                            HubSpot Xero Integration for Australian SMEs
                        </h1>

                        {/* Definition box for snippet targeting */}
                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>HubSpot Xero integration</strong> connects HubSpot deals, quotes and contacts to
                                Xero to create invoices, map GST and Tracking Categories, and write payment status back
                                to the CRM.
                            </p>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    openContact({
                                        initial: {
                                            message:
                                                "HubSpot ↔ Xero Integration — free audit. Context: current flow, systems, volumes, deadlines.",
                                        },
                                    })
                                }
                                className="btn btn-secondary border-2 border-black font-semibold">
                                Integrate HubSpot and Xero
                            </button>

                            {/* <button
                type="button"
                onClick={() =>
                  openContact({
                    initial: {
                      message:
                        "HubSpot ↔ Xero Integration — book a 30-min solution design call.",
                    },
                  })
                }
                className="btn btn-outline bg-primary-content text-primary border-2 border-black">
                Talk to a consultant
              </button> */}
                        </div>

                        {/* ✅ SEO-friendly internal link to the detailed blog guide */}
                        <div className="mt-3">
                            <Link
                                href="/blog/hubspot-xero-australia-how-to"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover underline-offset-4">
                                Read the full guide:{" "}
                                <span className="whitespace-nowrap">How to Connect HubSpot and Xero (properly)</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>Make HubSpot and Xero work together, reliably.</p>
                        <p>
                            We unify HubSpot records with Xero&apos;s finance data across contacts, companies, deals,
                            quotes, and invoices. Our guardrails prevent duplicates, maintain correct links, and
                            continuously write back billing and payment status to HubSpot.
                        </p>

                        {/* Full-width lead-in */}
                        <p className="mt-6">
                            Off-the-shelf integrations often lead to manual re-entry and missing payment signals between
                            HubSpot and Xero.<strong> App integrations are limited to:</strong>
                        </p>

                        {/* Bullets left, image right */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                            <div className="space-y-4 md:col-span-7">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>One-way sync, with no reliable bi-directional flow.</li>
                                    <li>Invoices associate to contacts only. Missing companies and deals.</li>
                                    <li>Limited field mapping (addresses, tax/SKU, tracking categories).</li>
                                    <li>Duplicates on retries and inconsistent dates/status updates.</li>
                                    <li>Quotes and HubSpot-created invoices may not sync correctly.</li>
                                </ul>
                            </div>

                            <figure className="self-start md:col-span-5 md:justify-self-end">
                                <img
                                    src="/images/services/hubspotfail.png"
                                    alt="HubSpot Xero integration problem diagram — sales closes in HubSpot, finance invoices in Xero, but payment status doesn’t flow back to CRM."
                                    loading="lazy"
                                    className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                                />
                                <figcaption className="text-base-content/80 mt-2 text-sm">
                                    HubSpot Xero integration problem.
                                </figcaption>
                            </figure>
                        </div>

                        {/* Full-width follow-up paragraph (moved out of grid) */}
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                HubSpot Xero integration — what’s included
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>
                        <p>
                            We run a short discovery to understand your data, exceptions, and goals, then prototype the
                            flow you&apos;ll use day to day. You&apos;ll see and test it in a safe environment before we
                            switch it on. After go-live, we monitor, refine, and support—so the integration keeps pace
                            as your business changes.
                        </p>

                        <p>
                            Technically, our approach adds a lightweight Operational Data Store (ODS) between HubSpot
                            and Xero as the single source of truth. The ODS handles identity matching
                            (Contacts/Companies/Deals ↔ Xero entities), idempotency to stop duplicates, field and
                            tax/SKU mappings, and reliable write-backs for invoice and payment status. Our custom code
                            orchestrates the flows; the ODS keeps state, so syncs are consistent, auditable, and easy to
                            extend.
                        </p>

                        <p>
                            <strong>The result:</strong> one source of truth, and a sales-to-cash flow you can trust.
                        </p>
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                ["Zero re-entry", "Deals → invoices without inputting data twice."],
                                ["Single source of truth", "ODS keeps data clean across CRM & Xero."],
                                ["Custom system", "Edge cases and custom solutions handled by our team."],
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
                                How long does a typical integration take?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Most projects ship in <strong>4-6 weeks</strong>: discovery, prototype, testing, then
                                rolling out live. Additional integrations can be added faster as the ODS (source of
                                truth database) is already set up.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Do you handle GST, Tracking Categories, and multi-entity?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. We map <strong>GST</strong> (incl./excl.), apply{" "}
                                <strong>Tracking Categories</strong> (e.g., Region/Dept), and support{" "}
                                <strong>multiple Xero orgs/brands</strong> with routing rules in the ODS.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Will payment status land back in HubSpot automatically?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We write <em>Sent / Part-Paid / Paid / Overdue</em> and <strong>Payment Date</strong> to
                                Deal properties with retries and idempotency, so Sales has a live view without asking
                                Finance.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Can you push HubSpot Quotes into Xero and keep line-item data?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Absolutely. Quotes convert to <strong>Xero draft/authorised invoices</strong> with line
                                items, tax, SKUs, and Tracking preserved. Enter information once, and ensure it flows to
                                every place it needs to go.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                What happens if data changes or something fails mid-sync?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                The <strong>ODS keeps state</strong> and every write is <strong>auditable</strong>. We
                                validate inputs, retry safely without duplicates, and surface human-readable errors in
                                HubSpot.
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
                                            "HubSpot ↔ Xero Integration — free audit. Context: current flow, systems, volumes, deadlines.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                            Free integration audit
                        </button>

                        {/* <button
              type="button"
              onClick={() =>
                openContact({
                  initial: {
                    message: "HubSpot ↔ Xero Integration — book a 30-min solution design call.",
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
