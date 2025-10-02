"use client";

import { type Variants, motion } from "motion/react";
import Image from "next/image";

export default function OurStory() {
    const viewport = { once: true, amount: 0.2 };
    const sectionEnter: Variants = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
    };

    return (
        <motion.section
            id="our-story"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={sectionEnter}
            className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 py-8 md:grid-cols-12 md:px-6 lg:px-8">
            <div className="md:col-span-7">
                <h2 className="font-ocr text-3xl font-extrabold tracking-tight md:text-4xl">Our Story</h2>
                <p className="mt-4 text-base opacity-90 md:text-lg">
                    Kali Software was born out of a Perth based startup in 2022. After implementing our own web app and
                    AI systems, we received requests from other companies to help with their workflows, spreadsheets,
                    custom agents, etc. Since then, we've seen our offering progress from a novelty for already
                    technical companies, to an operational efficiency best practice for businesses across all
                    industries.
                </p>
                <p className="mt-4 text-base opacity-90 md:text-lg">
                    Today, we've established a presence in Sydney, and we partner with finance, operations, and product
                    leaders to design and ship practical systems.
                </p>
            </div>

            <div className="md:col-span-5">
                <div className="relative h-64 min-h-64 w-full overflow-hidden rounded-2xl border-2 border-black shadow-lg md:h-full">
                    <Image
                        src="/images/caseStudies/PlusEight.png" // replace with your asset
                        alt="Kali Software team collaborating"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        priority={false}
                    />
                </div>

                <div className="card bg-base-100 mt-4 rounded-2xl border-2 border-black shadow-xl">
                    <div className="card-body">
                        <p className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">Why us?</p>
                        <ul className="mt-2 space-y-2 text-sm md:text-base">
                            <li>• Australian owned & onshore delivery & data storage options</li>
                            <li>• Deep technical expertise, we're not limited to low code solutions</li>
                            <li>• Free consultations, month-to-month pricing options</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
