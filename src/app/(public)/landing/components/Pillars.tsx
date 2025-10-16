"use client";

import React from "react";

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
        title: "Clarity, roadmap & ROI estimated in days",
        content: <p>Find the tasks to automate, the platforms to improve, and the insights hiding in your data.</p>,
        outcomes: ["Free workflow audit", "Free data audit"],
        priceText: "Starts free (30-min consult).",
        imageSrc: "/images/landing/consulting.png",
        imageAlt: "Consulting engagement roadmap",
        primaryLabel: "Contact Us",
        primaryUsesContactModal: true,
        secondaryLabel: "Case study",
        secondaryHref: "/services#consulting",
    },
    {
        label: "Dashboards & Analytics",
        title: "End spreadsheet chaos",
        content: <p>Centralise your data, define metrics, and own dashboards your team actually uses.</p>,
        outcomes: ["Data analysis", "Onshore data storage", "Live dashboards + alerts"],
        priceText: "From A$6–12k per function",
        imageSrc: "/images/landing/dashboards.png",
        primaryLabel: "Contact Us",
        primaryUsesContactModal: true,
        secondaryLabel: "Interactive Demo",
        secondaryHref: "https://demo-dashboard-phi.vercel.app/auth/login",
        secondaryNewTab: true,
    },
    {
        label: "Workflow Automation",
        title: "Cut manual work by 60%",
        content: <p>Automate tasks and processes across your business.</p>,
        outcomes: ["Rules as Code systems", "AI-powered workflows"],
        priceText: "From A$9–40k initial build + support",
        lottieSrc: "/images/lottie/automate.json",
        lottieLoop: true,
        primaryLabel: "Contact Us",
        primaryUsesContactModal: true,
        secondaryLabel: "Case study",
        secondaryHref: "blog/hubspot-xero-australia-how-to",
    },
    {
        label: "Product Development",
        title: "Ship secure apps - fast",
        content: <p>Prototype quickly, and ship an MVP to users with a dedicated team of developers.</p>,
        outcomes: ["UI/UX Design", "Full-stack Development"],
        priceText: "From A$9–40k initial build + support",
        imageSrc: "/images/landing/custom.png",
        primaryLabel: "Contact Us",
        primaryUsesContactModal: true,
        secondaryLabel: "Case study",
        secondaryHref: "/services#product-development",
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

    return (
        <section className="bg-base-200 text-base-content pt-0 pb-2" aria-labelledby="services-heading">
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
                                trustNote={item.trustNote}>
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
            `}</style>
        </section>
    );
}
