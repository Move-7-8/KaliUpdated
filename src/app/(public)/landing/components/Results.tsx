"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type CaseStudy = {
    id: string;
    client: string;
    industry: string;
    title: string;
    blurb: string;
    image: string;
    headlineMetric: string;
    href: string;
};

const CASE_STUDIES: CaseStudy[] = [
    {
        id: "DFCRC",
        client: "DFCRC",
        industry: "Government Policy",
        title: "DFCRC",
        blurb: "Consultation for the role of AI in the future of digital finance",
        image: "/images/investors/dfcrc.png",
        headlineMetric: "",
        href: "/services#consulting",
    },
    {
        id: "DigitalX",
        client: "DigitalX (DCC:ASX)",
        industry: "Fund Management",
        title: "DigitalX (DCC:ASX)",
        blurb: "Data unification and analytics software for investment management.",
        image: "/images/investors/digital.png",
        headlineMetric: "",
        href: "/services#dashboards",
    },
    {
        id: "Skimreader",
        client: "Skimreader",
        industry: "AI",
        title: "Skimreader",
        blurb: "AI-powered reading tool startup.",
        image: "/images/investors/skimread.png",
        headlineMetric: "",
        href: "/services#product-development",
    },
];

function Stars() {
    return (
        <span className="text-warning inline-flex items-center gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </span>
    );
}

export default function Results() {
    return (
        <section className="mx-auto w-[85%]">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Recent Case Studies</h2>

            {/* Use spacing instead of dividers so the row border is clean */}
            <ul role="list" className="space-y-4">
                {CASE_STUDIES.map((c) => (
                    <li key={c.id} className="bg-base-300 rounded-lg border border-black px-4 py-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="shrink-0">
                                <Image
                                    src={c.image}
                                    alt={`${c.client} case study`}
                                    width={160}
                                    height={100}
                                    className={`${c.id === "Skimreader" ? "" : "logo-black"} rounded-md object-cover`}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="badge badge-neutral">{c.industry}</span>
                                    {/* <span className="badge badge-outline">{c.client}</span> */}
                                    <Stars />
                                </div>

                                <h3 className="mt-1 text-base leading-tight font-medium">{c.title}</h3>
                                <p className="text-base-content/70 text-sm">{c.blurb}</p>
                            </div>

                            <div className="flex flex-col items-start gap-2 sm:items-end">
                                <div className="text-sm">
                                    <span className="font-medium">{c.headlineMetric}</span>
                                </div>
                                <Link href={c.href} className="btn btn-primary btn-sm">
                                    Read case study
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
