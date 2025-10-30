"use client";

import { type Variants, motion } from "motion/react";

export default function HowWeWork() {
    const viewport = { once: true, amount: 0.2 };

    const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

    const cardIn: Variants = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
    };

    const steps = [
        {
            num: "01",
            title: "Discover",
            desc: "Find the commercial feasibility and value of the project. Estimate the ROI and timeline for implementation.",
        },
        {
            num: "02",
            title: "Design",
            desc: "Target architecture, access controls and data governance. Scope finalised.",
        },
        {
            num: "03",
            title: "Build",
            desc: "Iterative delivery with ongoing demos.",
        },
        {
            num: "04",
            title: "Embed",
            desc: "Documentation, and change management. Training for your team.",
        },
        {
            num: "05",
            title: "Optimize",
            desc: "Ongoing maintenance, improvements, and advice.",
        },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
            <h2 className="font-ocr text-3xl font-extrabold tracking-tight md:text-4xl">How we work</h2>

            {/* Process */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container}
                className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
                {steps.map((s) => (
                    <motion.div
                        key={s.num}
                        variants={cardIn}
                        className="bg-base-100 rounded-2xl border-2 border-black p-5 shadow">
                        <p className="badge badge-neutral font-ocr border-2 border-black">{s.num}</p>
                        <h3 className="font-ocr mt-2 text-xl font-bold">{s.title}</h3>
                        <p className="mt-2 opacity-90">{s.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Delivery details */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container}
                className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Timelines */}
                {/* <motion.div variants={cardIn} className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                    <div className="card-body">
                        <h3 className="font-ocr text-xl font-bold">Typical timelines</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <strong>Discover:</strong> 3–10 business days (availability-dependent)
                            </li>
                            <li>
                                <strong>Design:</strong> 1–2 weeks (scope, architecture, runbooks)
                            </li>
                            <li>
                                <strong>Build:</strong> 3–8 weeks per increment (complexity-dependent)
                            </li>
                            <li>
                                <strong>Embed:</strong> 3–7 days (UAT, training, rollout)
                            </li>
                            <li>
                                <strong>Optimize:</strong> ongoing micro-iterations on a monthly cadence
                            </li>
                        </ul>
                    </div>
                </motion.div> */}

                {/* SLAs */}
                {/* <motion.div variants={cardIn} className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                    <div className="card-body">
                        <h3 className="font-ocr text-xl font-bold">SLAs</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <strong>P1 (Prod down):</strong> response <em>2 hours</em>, mitigation ASAP, updates
                                hourly
                            </li>
                            <li>
                                <strong>P2 (Degraded):</strong> response <em>4 business hours</em>, updates daily
                            </li>
                            <li>
                                <strong>P3 (Minor/feature):</strong> response <em>1 business day</em>, scheduled into
                                next sprint
                            </li>
                        </ul>
                        <p className="mt-2 text-sm opacity-80">Custom SLAs available with support plans.</p>
                    </div>
                </motion.div> */}

                {/* Collaboration tools */}
                {/* <motion.div variants={cardIn} className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                    <div className="card-body">
                        <h3 className="font-ocr text-xl font-bold">Collaboration</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <strong>Comms:</strong> Slack/Teams channel with shared triage
                            </li>
                            <li>
                                <strong>PM:</strong> Linear/Jira for backlog, milestones & demos
                            </li>
                            <li>
                                <strong>Code:</strong> GitHub/GitLab with PR reviews & CI
                            </li>
                            <li>
                                <strong>Docs:</strong> Notion/Confluence, runbooks, architecture notes
                            </li>
                            <li>
                                <strong>Access:</strong> least-privilege, per-env roles, audit trail
                            </li>
                        </ul>
                    </div>
                </motion.div> */}

                {/* Handover & maintenance */}
                {/* <motion.div variants={cardIn} className="card bg-base-100 rounded-2xl border-2 border-black shadow">
                    <div className="card-body">
                        <h3 className="font-ocr text-xl font-bold">Handover & maintenance</h3>
                        <ul className="mt-3 space-y-2">
                            <li>Structured handover: docs, runbooks, dashboards, alert routing</li>
                            <li>Training: short role-based sessions and Q&A</li>
                            <li>Stabilisation: 30–60 day warranty window</li>
                            <li>Support plans: break/fix, enhancements, and monthly reviews</li>
                        </ul>
                    </div>
                </motion.div> */}
            </motion.div>
        </section>
    );
}
