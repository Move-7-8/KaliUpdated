// src/app/landing/components/AuditGlassGlow.tsx
"use client";

import React from "react";

// src/app/landing/components/AuditGlassGlow.tsx

// src/app/landing/components/AuditGlassGlow.tsx

type KPI = { label: string; value: string; helper?: string };
type Opportunity = {
    title: string;
    category: "Automate" | "Instrument" | "Modernise" | string;
    impact: "High" | "Med" | "Low";
    effort: "Low" | "Med" | "High";
    note?: string;
};
type FlowStep = { label: string; status?: "manual" | "automated" | "gap" };
type NextStep = { label: string; owner?: string; due?: string };

type AuditGlassGlowProps = {
    title?: string;
    subtitle?: string;
    kpis?: KPI[];
    opportunities?: Opportunity[];
    flow?: FlowStep[];
    next?: NextStep[];
    className?: string;
};

const DEFAULT_KPIS: KPI[] = [
    { label: "Automation potential", value: "42%", helper: "Top 10 workflows" },
    { label: "Data completeness", value: "68%", helper: "Key fields at source" },
    { label: "Median cycle time", value: "3.4d", helper: "Across 5 stages" },
];

const DEFAULT_OPPS: Opportunity[] = [
    { title: "Invoice approvals", category: "Automate", impact: "High", effort: "Low", note: "SLA + exceptions" },
    { title: "Lead capture", category: "Instrument", impact: "Med", effort: "Low", note: "Events + UTM map" },
];

const DEFAULT_FLOW: FlowStep[] = [
    { label: "Intake", status: "manual" },
    { label: "Validate", status: "gap" },
    { label: "Approve", status: "manual" },
    { label: "Post", status: "automated" },
    { label: "Report", status: "gap" },
];

const DEFAULT_NEXT: NextStep[] = [
    { label: "Discovery & shadowing", owner: "You + Us", due: "Week 1" },
    { label: "Opportunity map & ROI", owner: "Us", due: "Week 2" },
    { label: "Prototype & demo", owner: "Us", due: "Week 3" },
];

export default function AuditGlassGlow({
    title = "Audit",
    subtitle = "Workflow & data assessment",
    kpis = DEFAULT_KPIS,
    opportunities = DEFAULT_OPPS,
    flow = DEFAULT_FLOW,
    next = DEFAULT_NEXT,
    className = "",
}: AuditGlassGlowProps) {
    return (
        <section
            aria-label="Audit report"
            className={[
                // slimmer than cards
                "mx-auto w-full max-w-[38rem] md:max-w-[44rem]",
                // glass base
                "relative overflow-hidden rounded-3xl border border-white/20",
                "bg-white/10 supports-[backdrop-filter]:bg-white/15 supports-[backdrop-filter]:backdrop-blur-2xl",
                "shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10",
                "p-5 md:p-7",
                "font-heading",
                className,
            ].join(" ")}>
            {/* animated glow layers */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* soft radial blobs */}
                <div className="bg-primary/30 absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl" />
                <div className="bg-secondary/30 absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl" />
                <div className="bg-accent/25 absolute top-1/3 -right-20 h-56 w-56 rounded-full blur-3xl" />

                {/* slow rotating conic sheen */}
                <div className="absolute inset-[-40%] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_70%)] opacity-50">
                    <div className="[background:conic-gradient(from_0deg,theme(colors.primary.DEFAULT)_0deg,theme(colors.secondary.DEFAULT)_120deg,theme(colors.accent.DEFAULT)_240deg,theme(colors.primary.DEFAULT)_360deg)] h-full w-full animate-[glowRotate_18s_linear_infinite] opacity-30 mix-blend-screen blur-2xl" />
                </div>
            </div>

            {/* header */}
            <header className="relative z-10">
                <div className="inline-flex items-center gap-2">
                    <span className="badge text-base-content/90 font-ocr border border-white/30 bg-white/20">
                        Report
                    </span>
                    <span className="badge text-base-content/90 border border-white/30 bg-white/30">Audit</span>
                </div>
                <h2 className="font-ocr mt-2 text-2xl leading-tight font-extrabold md:text-3xl lg:text-4xl">{title}</h2>
                <p className="text-base-content/80 mt-1 text-sm md:text-base">{subtitle}</p>
            </header>

            {/* KPIs */}
            <div className="relative z-10 mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {kpis.map((kpi, i) => (
                    <div
                        key={i}
                        className={[
                            "rounded-2xl border border-white/25 p-4",
                            "bg-white/10 supports-[backdrop-filter]:bg-white/15 supports-[backdrop-filter]:backdrop-blur-md",
                            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                        ].join(" ")}>
                        <div className="text-base-content/70 text-[11px] tracking-wide uppercase">{kpi.label}</div>
                        <div className="mt-1 text-2xl font-extrabold md:text-3xl">{kpi.value}</div>
                        {kpi.helper ? <div className="text-base-content/70 mt-1 text-xs">{kpi.helper}</div> : null}
                    </div>
                ))}
            </div>

            {/* Opportunities */}
            <div className="relative z-10 mt-6">
                <h3 className="text-base font-semibold md:text-lg">Top opportunities</h3>
                <ul className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {opportunities.map((o, i) => (
                        <li
                            key={i}
                            className={[
                                "rounded-2xl border border-white/25 p-4",
                                "bg-white/10 supports-[backdrop-filter]:bg-white/15 supports-[backdrop-filter]:backdrop-blur-md",
                                "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                            ].join(" ")}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold md:text-base">{o.title}</div>
                                    {o.note ? <div className="text-base-content/70 mt-1 text-xs">{o.note}</div> : null}
                                </div>
                                <span className="badge text-base-content/90 border border-white/30 bg-white/20">
                                    {o.category}
                                </span>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] md:text-xs">
                                <span className="badge bg-success/30 text-success-content border border-white/30">
                                    Impact: {o.impact}
                                </span>
                                <span className="badge bg-warning/30 text-warning-content border border-white/30">
                                    Effort: {o.effort}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Flow */}
            <div className="relative z-10 mt-6">
                <h3 className="text-base font-semibold md:text-lg">Current workflow</h3>
                <div
                    className={[
                        "mt-3 rounded-2xl border border-white/25 p-4",
                        "bg-white/10 supports-[backdrop-filter]:bg-white/15 supports-[backdrop-filter]:backdrop-blur-md",
                        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                    ].join(" ")}>
                    <div className="flex flex-wrap items-center gap-3">
                        {flow.map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div
                                    className={[
                                        "rounded-xl border px-3 py-2",
                                        "text-base-content/90 border-white/30 bg-white/20",
                                        step.status === "automated" && "bg-success/30 text-success-content",
                                        step.status === "manual" && "bg-warning/30 text-warning-content",
                                        step.status === "gap" && "bg-error/30 text-error-content",
                                    ].join(" ")}>
                                    <span className="text-xs md:text-sm">{step.label}</span>
                                </div>
                                {i < flow.length - 1 && <span className="font-ocr text-base-content/60">→</span>}
                            </div>
                        ))}
                    </div>
                    <div className="text-base-content/70 mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="badge bg-warning/30 text-warning-content border border-white/30">Manual</span>
                        <span className="badge bg-success/30 text-success-content border border-white/30">
                            Automated
                        </span>
                        <span className="badge bg-error/30 text-error-content border border-white/30">Gap</span>
                    </div>
                </div>
            </div>

            {/* Next steps */}
            <div className="relative z-10 mt-6">
                <h3 className="text-base font-semibold md:text-lg">Next steps</h3>
                <ol className="mt-3 grid grid-cols-1 gap-3">
                    {next.map((n, i) => (
                        <li
                            key={i}
                            className={[
                                "rounded-2xl border border-white/25 p-4",
                                "bg-white/10 supports-[backdrop-filter]:bg-white/15 supports-[backdrop-filter]:backdrop-blur-md",
                                "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                            ].join(" ")}>
                            <div className="flex items-center justify-between gap-3">
                                <div className="text-sm font-semibold md:text-base">{n.label}</div>
                                {n.due ? (
                                    <span className="badge text-base-content/90 border border-white/30 bg-white/20">
                                        {n.due}
                                    </span>
                                ) : null}
                            </div>
                            {n.owner ? <div className="text-base-content/70 mt-1 text-xs">{n.owner}</div> : null}
                        </li>
                    ))}
                </ol>
            </div>

            {/* local keyframes for the glow rotation */}
            <style jsx>{`
                @keyframes glowRotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </section>
    );
}
