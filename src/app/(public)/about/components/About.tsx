"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import HowWeWork from "./HowWeWork";
import OurClients from "./OurClients";
import OurStory from "./OurStory";

export default function About() {
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    return (
        <main className="bg-base-200 text-base-content font-sans">
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:px-6 lg:px-8">
                <p className="text-base-content/70 mb-3 text-[11px] tracking-[.18em] uppercase">About Kali Software</p>
                <h1 className="font-ocr text-4xl leading-[0.95] font-extrabold tracking-tight md:text-5xl">
                    Australian businesses need their data to make sense.
                </h1>
                <p className="mt-4 max-w-3xl text-lg opacity-90 md:text-xl">
                    Off-the-shelf tools are too blunt for the reality of your finance, sales, ops and marketing. We take
                    a consulting mindset to design <em>fit-for-purpose</em> data integrations, models and dashboards.
                    This way, leaders get trusted metrics, teams spend less time reconciling, and decisions move faster.
                </p>

                {/* <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            openContact({
                                initial: {
                                    message:
                                        "About page — I’d like a 15-min consult. Context: (goals, tools, timeline)",
                                },
                            })
                        }
                        className="btn btn-secondary cursor-pointer rounded-full border-2 border-black font-semibold shadow"
                        aria-haspopup="dialog"
                        aria-controls="contact-modal">
                        Free 15-min consult
                    </button>
                    <Link
                        href="/services"
                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                        Explore services
                    </Link>
                </motion.div> */}
            </section>

            {/* Our Story (image + copy) */}
            <OurStory />

            {/* How We Work (process + timelines/SLAs/tools/handover) */}
            <HowWeWork />

            {/* Our Clients */}
            <OurClients />
            {/* CTA */}
            <section className="mx-auto max-w-6xl px-4 pt-6 pb-16 md:px-6 lg:px-8">
                <div className="bg-primary text-primary-content rounded-3xl border-2 border-black p-6 shadow md:p-8">
                    <h2 className="font-ocr text-2xl font-extrabold tracking-tight md:text-3xl">
                        Have questions about data integration?
                    </h2>
                    <p className="mt-2 max-w-3xl opacity-90">
                        Reach out to us. We’ll help you find the right solution for your business.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "About page — please contact me to discuss data integration/analytics scope.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer rounded-full border-2 border-black font-semibold shadow"
                            aria-haspopup="dialog"
                            aria-controls="contact-modal">
                            Get in touch
                        </button>
                        <Link
                            href="/services"
                            className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                            See what we deliver
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
