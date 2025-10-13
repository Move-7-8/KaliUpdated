// src/app/landing/components/Pillars.tsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

import PillarCard from "./PillarCard";

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

// src/app/landing/components/Pillars.tsx

gsap.registerPlugin(ScrollTrigger);

// Anti-bounce defaults: reduce mobile resize ripple + pre-position pins.
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.defaults({ anticipatePin: 1 });

type Pillar = {
    title: string;
    content: React.ReactNode;
    className?: string;
    bg?: string;

    imageSrc?: string;
    imageAlt?: string;

    // NEW: Lottie support (use for Workflow Automation)
    lottieSrc?: string; // e.g. "/images/lottie/automate.json"
    lottieLoop?: boolean;

    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;

    // >>> NEW: opt-in open-in-new-tab for secondary action
    secondaryNewTab?: boolean;

    // New content fields for higher-converting cards:
    label?: string; // small category label e.g. "AI Copilots"
    outcomes?: string[]; // 2–3 bullet outcomes
    proof?: string; // micro-proof: "3.1× faster support at FreightCo."
    priceText?: string; // tiny price signal e.g. "From A$6–15k"
    trustNote?: string; // tiny trust line e.g. "No data leaves AU"

    // NEW: make primary use the ContactModal
    primaryUsesContactModal?: boolean;
};

type PillarsProps = {
    items?: Pillar[];
    spacer?: number;
    scaleBase?: number;
    scaleStep?: number;
    after?: React.ReactNode;
    raisePx?: number; // how much higher (in px) to pin/animate vs viewport center
    headingOffset?: number; // visual nudge down for the section heading (px)
    topTrimPx?: number; // pulls the whole section upwards to reduce space above heading
};

// >>> UPDATED DEFAULTS: primary = blue "Free 15-min consult" (ContactModal), secondary = grey case studies / demo
const DEFAULT_ITEMS: Pillar[] = [
    {
        label: "Consulting",
        title: "Clarity, roadmap & ROI estimated in days",
        content: <p>Find the tasks to automate, the platforms to improve, and the insights hiding in your data.</p>,
        outcomes: ["Free workflow audit", "Free data audit"],
        proof: "Example: DFCRC consultation for fund-manager research tooling.",
        priceText: "Starts free (30-min consult).",
        trustNote: "",
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
        proof: "−8 hrs/week in finance ops at MintLane.",
        priceText: "From A$6–12k per function",
        trustNote: "Data hosted in AU regions available",
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
        proof: "Invoice cycle time ↓58% at SolarWest.",
        priceText: "From A$9–40k initial build + support",
        trustNote: "SOC2-friendly patterns; least-privilege access",
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
        proof: "Invoice cycle time ↓58% at SolarWest.",
        priceText: "From A$9–40k initial build + support",
        trustNote: "SOC2-friendly patterns; least-privilege access",
        imageSrc: "/images/landing/custom.png",
        primaryLabel: "Contact Us",
        primaryUsesContactModal: true,
        secondaryLabel: "Case study",
        secondaryHref: "/services#product-development",
    },
];

const DEFAULT_AFTER = <div className="space-y-5" />;

export default function Pillars({
    items = DEFAULT_ITEMS,
    spacer = 50,
    scaleBase = 0.85,
    scaleStep = 0.05,
    after = DEFAULT_AFTER,
    raisePx = 60,
    headingOffset = 124,
    topTrimPx = 64,
}: PillarsProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let smoother: any | null = null;
        let alive = true;
        (async () => {
            try {
                const { ScrollSmoother } = await import("gsap/ScrollSmoother");
                if (!alive) return;
                gsap.registerPlugin(ScrollSmoother);
                smoother = ScrollSmoother.create({
                    smooth: 0.4,
                    effects: false,
                    normalizeScroll: true,
                });
            } catch {}
        })();
        return () => {
            alive = false;
            if (smoother) smoother.kill();
        };
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".stacking__card");
            if (!cards.length) return;

            cards.forEach((card, i) => {
                card.style.willChange = "transform";
                card.style.backfaceVisibility = "hidden";
                card.style.transformStyle = "preserve-3d";
                card.style.zIndex = String(100 + i);
            });

            cards.forEach((card, index) => {
                const st = ScrollTrigger.create({
                    trigger: card,
                    start: `center-=${index * spacer} center-=${raisePx}`,
                    endTrigger: ".stacking",
                    end: `bottom center-=${raisePx}`,
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                });

                const scaleValue = scaleBase + index * scaleStep;

                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: `top center-=${raisePx}`,
                        end: `bottom center-=${raisePx}`,
                        scrub: 0.3,
                        invalidateOnRefresh: true,
                    },
                    ease: "none",
                    scale: scaleValue,
                    force3D: true,
                });

                if (index === 0) {
                    const spacerEl = (st as any).pinSpacer as HTMLElement | undefined;
                    if (spacerEl) spacerEl.style.marginTop = "0px";
                }
            });

            const fixFirstSpacer = () => {
                const firstSpacer = root.querySelector<HTMLElement>(".stacking > .pin-spacer:first-of-type");
                if (firstSpacer) firstSpacer.style.marginTop = "0px";
            };
            fixFirstSpacer();
            ScrollTrigger.addEventListener("refresh", fixFirstSpacer);

            const onLoad = () => ScrollTrigger.refresh();
            window.addEventListener("load", onLoad, { once: true });
        }, root);

        return () => {
            ctx.revert();
            ScrollTrigger.refresh();
        };
    }, [spacer, scaleBase, scaleStep, raisePx]);

    const data = items && items.length ? items : DEFAULT_ITEMS;

    // Pull the whole section upward (reduces space above heading while keeping translateY on the h2)
    const stackingMarginTop = -(raisePx / 3 + 12 + topTrimPx);

    return (
        <main ref={rootRef} className="bg-base-200 text-base-content pt-0 pb-8">
            <div
                className={"stacking relative [&>.pin-spacer:first-of-type]:!mt-0"}
                style={{ marginTop: stackingMarginTop }}>
                <h2
                    className="mb-6 ml-19 w-[87%] text-2xl font-semibold tracking-tight will-change-transform"
                    style={{ transform: `translateY(${headingOffset}px)` }}>
                    Our Services
                </h2>

                {/* Spacer between heading and first card (not affected by GSAP pin-spacer) */}
                <div className="h-6 sm:h-8 md:h-10" aria-hidden="true" />

                {data.map((item, i) => (
                    <PillarCard
                        key={i}
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
                        // >>> forward the opt-in flag
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

            <section className="mx-auto mt-6 max-w-3xl px-4 md:px-0">{after}</section>
        </main>
    );
}
