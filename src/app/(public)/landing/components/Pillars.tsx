"use client";

import React, { useEffect } from "react";

import PillarCard from "./PillarCard";

type Pillar = {
    title: string;
    content: React.ReactNode;
    className?: string;
    bg?: string;
    imageSrc?: string;
    imageAlt?: string;
    lottieSrc?: string;
    lottieLoop?: boolean;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryNewTab?: boolean;
    label?: string;
    outcomes?: string[];
    proof?: string;
    priceText?: string;
    trustNote?: string;
    primaryUsesContactModal?: boolean;
};

type Props = {
    items?: Pillar[];
    spacer?: number;
    raisePx?: number;
    scaleBase?: number;
    scaleStep?: number;
    peekVh?: number;
    headerGuardVh?: number;
    tailVh?: number;
};

const DEFAULT_ITEMS: Pillar[] = [
    {
        label: "Consulting",
        title: "Find out what's possible for your business",
        content: <p>Identify the benefits of becoming data-driven.</p>,
        outcomes: [
            "Data-driven decision making",
            "Optimise your business operations",
            "Data secured against attacks and accidents",
        ],
        priceText: "",
        imageSrc: "/images/landing/consulting.png",
        imageAlt: "Consulting engagement roadmap",
        primaryLabel: "View Service",
        primaryHref: "/services",
        primaryUsesContactModal: false,
        secondaryLabel: "Read Blog",
        secondaryHref: "/services#consulting",
    },
    {
        label: "Data Integration",
        title: "Gain a Single Source of Truth ",
        content: <p>Unify your data across your platforms.</p>,
        outcomes: [
            "Advance beyond spreadsheets",
            "All of your platforms talking to each other",
            "Regular data backups",
        ],
        priceText: "",
        imageSrc: "/images/caseStudies/data_integration.png",
        primaryLabel: "View Service",
        primaryHref: "/services",
        primaryUsesContactModal: false,
        secondaryLabel: "Read Blog",
        secondaryHref: "https://demo-dashboard-phi.vercel.app/auth/login",
        secondaryNewTab: true,
    },
    {
        label: "Data Analysis",
        title: "Make Informed Decisions",
        content: <p>Dashboards and reporting built for your business.</p>,
        outcomes: ["Live Dashboards", "Automated Reporting", "Predictive Analytics"],
        priceText: "",
        imageSrc: "/images/landing/dashboards.png",
        lottieLoop: true,
        primaryLabel: "View Service",
        primaryHref: "/services",
        primaryUsesContactModal: false,
        secondaryLabel: "Read Blog",
        secondaryHref: "blog/hubspot-xero-australia-how-to",
    },
    {
        label: "Digital",
        title: "The Experts in Custom",
        content: <p>Harness data and AI to build something new. </p>,
        outcomes: ["UI/UX Design", "Full-stack development", "AI integration"],
        priceText: "",
        imageSrc: "/images/landing/custom.png",
        primaryLabel: "View Service",
        primaryHref: "/services",
        primaryUsesContactModal: false,
        secondaryLabel: "Read Insights",
        secondaryHref: "/blog",
    },
];

export default function PillarsSticky({
    items = DEFAULT_ITEMS,
    spacer = -20,
    raisePx = 50,
    scaleBase = 0.85,
    scaleStep = 0.05,
    peekVh = 8,
    headerGuardVh = 30,
    tailVh = 0,
}: Props) {
    const count = items.length;

    // Mark the card nearest the sticky target as "active" so only it receives pointer events.
    useEffect(() => {
        if (typeof window === "undefined") return;

        const cards = Array.from(document.querySelectorAll<HTMLElement>(".stack__card"));
        if (!cards.length) return;

        let raf = 0;
        const computeActive = () => {
            raf = 0;
            const stackTop = window.innerHeight * 0.5 - raisePx; // matches calc(50svh - ${raisePx}px)
            let best: HTMLElement | null = null;
            let bestDist = Infinity;

            for (const el of cards) {
                const rect = el.getBoundingClientRect();
                const dist = Math.abs(rect.top - stackTop);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = el;
                }
            }

            for (const el of cards) {
                if (el === best) el.setAttribute("data-active", "true");
                else el.removeAttribute("data-active");
            }
        };

        const onScroll = () => {
            if (!raf) raf = window.requestAnimationFrame(computeActive);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        computeActive(); // initial

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [raisePx, count]);

    return (
        <section className="bg-base-200 text-base-content pt-6 pb-2" aria-labelledby="services-heading">
            {/* Match LogoMarquee container (w-[90%] px-6 md:px-4) so headings align */}
            <div className="mx-auto w-[90%] px-6 md:px-4">
                <div
                    className="stack relative"
                    style={
                        {
                            ["--stack-top" as any]: `calc(50svh - ${raisePx}px)`,
                            ["--stack-gap" as any]: `${spacer}px`,
                            ["--card-scale-base" as any]: scaleBase,
                            ["--card-scale-step" as any]: scaleStep,
                            ["--card-count" as any]: count,
                            ["--peek" as any]: `${peekVh}svh`,
                            ["--header-guard" as any]: `${headerGuardVh}svh`,
                            ["--tail-vh" as any]: `${tailVh}svh`,
                        } as React.CSSProperties
                    }>
                    <h2 id="services-heading" className="relative -mt-20 text-2xl font-semibold tracking-tight">
                        Our Services
                    </h2>

                    {/* <div style={{ height: "var(--header-guard)" }} aria-hidden="true" /> */}

                    <div className="stack__cards flex flex-col gap-2">
                        {items.map((item, i) => (
                            <PillarCard
                                key={i}
                                className="stack__card"
                                style={
                                    {
                                        ["--i" as any]: i,
                                        ["--rev" as any]: count - 1 - i,
                                    } as React.CSSProperties
                                }
                                label={item.label}
                                title={item.title}
                                imageSrc={item.imageSrc}
                                imageAlt={item.imageAlt}
                                lottieSrc={item.lottieSrc}
                                lottieLoop={item.lottieLoop}
                                primaryLabel={item.primaryLabel}
                                primaryHref={item.primaryHref}
                                secondaryLabel={item.secondaryLabel}
                                secondaryHref={item.secondaryHref}
                                secondaryNewTab={item.secondaryNewTab}
                                primaryUsesContactModal={item.primaryUsesContactModal}
                                outcomes={item.outcomes}
                                proof={item.proof}
                                priceText={item.priceText}
                                trustNote={item.trustNote}
                                showActions={i === count - 1}>
                                {item.content}
                            </PillarCard>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .stack {
                    padding-bottom: calc((var(--card-count) - 1) * (var(--stack-gap) + var(--peek)) + var(--tail-vh));
                }
                .stack__cards {
                    position: relative;
                    padding-top: calc((var(--card-count) - 1) * var(--peek));
                }
                .stack__card {
                    position: sticky;
                    top: var(--stack-top);
                    z-index: calc(100 + var(--i));
                    margin-top: calc(var(--i) * var(--stack-gap)) !important;
                    margin-bottom: 0 !important;
                    will-change: transform;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                    transform-origin: top center;
                    transform: translateY(calc(-1 * var(--rev) * var(--peek)));
                }
                .stack__card:last-child {
                    transform: translateY(0);
                }
                @supports (animation-timeline: view()) {
                    .stack__card {
                        --scale-target: calc(var(--card-scale-base) + var(--i) * var(--card-scale-step));
                        animation-name: card-scale;
                        animation-timing-function: linear;
                        animation-fill-mode: both;
                        animation-timeline: view();
                        animation-range: entry 0% cover 60%;
                    }
                    @keyframes card-scale {
                        from {
                            scale: 1;
                        }
                        to {
                            scale: var(--scale-target);
                        }
                    }
                }
                @media (max-width: 479px) {
                    .stack {
                        --tail-vh: 8svh;
                    }
                }

                /* >>> Interactivity gating so only the focused card can receive clicks <<< */
                .stack__card {
                    pointer-events: none;
                }
                .stack__card[data-active="true"] {
                    pointer-events: auto;
                }
            `}</style>
        </section>
    );
}
