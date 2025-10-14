"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import HowWeWork from "./HowWeWork";
import OurStory from "./OurStory";

export default function About() {
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    return (
        <main className="bg-base-200 text-base-content">
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:px-6 lg:px-8">
                <p className="font-ocr text-base-content/70 mb-3 text-[11px] tracking-[.18em] uppercase">
                    About Kali Software
                </p>
                <h1 className="font-ocr text-4xl leading-[0.95] font-extrabold tracking-tight md:text-5xl">
                    Nearly every business in Australia will be affected by AI and automation in the next 3 years.
                </h1>
                <p className="mt-4 max-w-3xl text-lg opacity-90 md:text-xl">
                    Yet off-the-shelf solutions are far too blunt for the modern complexity and unique nature of each
                    business. Kali's purpose is to take a consulting mindset to building technical solutions that fit
                    your needs, processes and workflows.
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

            {/* Values */}
            {/* <motion.section
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container}
                className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
                <h2 className="font-ocr text-3xl font-extrabold tracking-tight md:text-4xl">Values</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <div className="card-body">
                            <h3 className="font-ocr text-xl font-bold">Outcome over output</h3>
                            <p className="opacity-90">
                                Ship the smallest thing that proves value, then grow it deliberately.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <div className="card-body">
                            <h3 className="font-ocr text-xl font-bold">Secure by default</h3>
                            <p className="opacity-90">
                                Least-privilege access, auditable changes, and production-ready patterns.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <div className="card-body">
                            <h3 className="font-ocr text-xl font-bold">Systems fit people</h3>
                            <p className="opacity-90">Tools serve your workflow—not the other way around.</p>
                        </div>
                    </motion.div>
                </div>
            </motion.section> */}

            {/* Team */}
            {/* <motion.section
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container}
                className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
                <h2 className="font-ocr text-3xl font-extrabold tracking-tight md:text-4xl">Team</h2>
                <p className="mt-3 max-w-3xl opacity-90">
                    A compact, senior team with engineering, data and product experience. We plug into your
                    workflows and collaborate with your SMEs and IT for smooth delivery.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <figure className="bg-base-300 relative h-40 w-full overflow-hidden rounded-t-2xl">
                            <Image
                                src="/images/team/leader-1.jpg"
                                alt="Delivery Lead"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 33vw, 100vw"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="font-ocr text-lg font-bold">Delivery Lead</h3>
                            <p className="opacity-90">Ops-first delivery across data, automation and product.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <figure className="bg-base-300 relative h-40 w-full overflow-hidden rounded-t-2xl">
                            <Image
                                src="/images/team/engineer-1.jpg"
                                alt="Senior Engineer"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 33vw, 100vw"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="font-ocr text-lg font-bold">Senior Engineer</h3>
                            <p className="opacity-90">Secure integrations, resilient services, clean APIs.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={sectionEnter}
                        className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                        <figure className="bg-base-300 relative h-40 w-full overflow-hidden rounded-t-2xl">
                            <Image
                                src="/images/team/data-1.jpg"
                                alt="Data & Analytics"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 33vw, 100vw"
                            />
                        </figure>
                        <div className="card-body">
                            <h3 className="font-ocr text-lg font-bold">Data & Analytics</h3>
                            <p className="opacity-90">
                                Metrics that matter, lineage checks, alerting and dashboards.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section> */}

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-4 pt-6 pb-16 md:px-6 lg:px-8">
                <div className="bg-primary text-primary-content rounded-3xl border-2 border-black p-6 shadow md:p-8">
                    <h2 className="font-ocr text-2xl font-extrabold tracking-tight md:text-3xl">
                        Ready to cut busywork and ship faster?
                    </h2>
                    <p className="mt-2 max-w-3xl opacity-90">
                        Book a quick consult. We’ll map ROI, surface risks, and propose a lightweight first increment.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "About page — please contact me to discuss automation/data/product scope.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer rounded-full border-2 border-black font-semibold shadow"
                            aria-haspopup="dialog"
                            aria-controls="contact-modal">
                            Talk to an expert
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
