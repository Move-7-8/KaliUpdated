// src/components/TrafficLightDecisionHeatmap.tsx
"use client";

import ReactECharts from "echarts-for-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

// src/components/TrafficLightDecisionHeatmap.tsx

/*
  Install once if you haven't:
  pnpm add echarts echarts-for-react
*/

type Tone = 0 | 1 | 2; // 0=red, 1=amber, 2=green

type Props = {
    className?: string;
};

export default function TrafficLightDecisionHeatmap({ className }: Props) {
    const columns = ["Official Xero App", "3rd-Party Apps", "Custom Integration (ODS)"];
    const rows = [
        "Deposits / progress billing (30/50/20)",
        "Line-by-line AccountCode, TaxType, Tracking",
        "Reliable write-backs (Sent / Part-Paid / Paid)",
        "High volume: idempotency / retries / observability",
        "Multi-entity / multi-currency & audit trail",
        "Expand to more platforms + analytics/warehouse",
        "Ocassional duplicates / errors aren't a problem",
        "Fastest, cheapest setup",
        "Solo / simple use-case",
    ];

    const matrix: Tone[][] = [
        [0, 1, 2],
        [0, 2, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [0, 1, 2],
        [2, 1, 0],
        [2, 1, 1],
        [2, 1, 0],
    ];

    const labels = { 0: "Not recommended", 1: "Caveats", 2: "Best fit" } as const;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState<number>(800);

    useEffect(() => {
        if (!rootRef.current) return;
        const ro = new ResizeObserver((entries) => {
            for (const e of entries) setWidth(e.contentRect.width);
        });
        ro.observe(rootRef.current);
        return () => ro.disconnect();
    }, []);

    // Simple breakpoints derived from container width
    const isXS = width < 480;
    const isSM = width >= 480 && width < 640;
    const isMD = width >= 640 && width < 768;

    // Layout paddings
    const gridLeft = isXS ? 8 : isSM ? 120 : 180; // space for long y labels
    const gridRight = isXS ? 8 : 12;
    const gridTop = isXS ? 40 : 52; // room for column headers at top
    const gridBottom = 8;
    const rotateX = isXS ? 30 : isSM ? 15 : 0;

    // Compute square cell size from container width (minus grid paddings)
    const usableW = Math.max(0, width - gridLeft - gridRight);
    const idealCell = Math.floor(usableW / columns.length);

    // Keep cells slimmer without increasing height
    const maxCell = isXS ? 20 : isSM ? 24 : isMD ? 26 : 28;
    const cellSize = Math.max(16, Math.min(idealCell, maxCell));

    // Final chart height = headers/top padding + rows*square + bottom padding
    const height = gridTop + rows.length * cellSize + gridBottom;

    // Axis label shortening for small widths
    const shortCol = (s: string) => {
        if (isXS) {
            if (s.startsWith("Official")) return "Official";
            if (s.startsWith("3rd-Party")) return "3rd-Party";
            if (s.startsWith("Custom")) return "Custom (ODS)";
        }
        if (isSM) {
            if (s.startsWith("Custom")) return "Custom ODS";
        }
        return s;
    };

    const shortRow = (s: string) => {
        if (isXS) {
            return s
                .replace("Line-by-line AccountCode, TaxType, Tracking", "Line rules (Acct/Tax/Track)")
                .replace("Reliable write-backs (Sent / Part-Paid / Paid)", "Reliable write-backs")
                .replace("High volume: idempotency / retries / observability", "High vol + idempotency")
                .replace("Multi-entity / multi-currency & audit trail", "Multi-entity/currency & audit")
                .replace("Ocassional duplicates / errors aren't a problem", "Okay w/ some duplicates")
                .replace("Fastest, cheapest setup", "Fastest & cheapest")
                .replace("Expand to more platforms + analytics/warehouse", "Expand + analytics");
        }
        return s;
    };

    const data = useMemo(
        () =>
            rows
                .map((_, y) =>
                    columns.map((_, x) => {
                        const v = matrix[y][x];
                        return [x, y, v] as [number, number, Tone];
                    }),
                )
                .flat(),
        [],
    );

    const option = useMemo(
        () => ({
            tooltip: {
                show: false,
                triggerOn: "none",
            },
            grid: {
                top: gridTop,
                right: gridRight,
                bottom: gridBottom,
                left: gridLeft,
                containLabel: true,
                height: rows.length * cellSize,
            },
            xAxis: {
                type: "category",
                position: "top",
                data: columns.map(shortCol),
                axisLine: { lineStyle: { color: "rgba(0,0,0,0.22)" } },
                axisTick: { show: false },
                axisLabel: {
                    fontSize: isXS ? 11 : 12,
                    color: "currentColor",
                    rotate: rotateX,
                    interval: 0,
                },
                splitLine: { show: false },
            },
            yAxis: {
                type: "category",
                data: rows.map(shortRow),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { fontSize: isXS ? 11 : 12, color: "currentColor" },
            },

            // Softer, glassy pastel fills
            visualMap: {
                show: false,
                min: 0,
                max: 2,
                type: "piecewise",
                pieces: [
                    { value: 0, color: "rgba(239,68,68,0.30)" }, // red glass
                    { value: 1, color: "rgba(251,191,36,0.28)" }, // amber glass
                    { value: 2, color: "rgba(34,197,94,0.28)" }, // green glass
                ],
            },

            series: [
                {
                    type: "heatmap",
                    data,
                    label: {
                        show: true,
                        position: "inside",
                        formatter: (p: any) => {
                            const v: Tone = p.value[2];
                            if (v === 2) return "{ok|✓}";
                            if (v === 0) return "{bad|✕}";
                            return "";
                        },
                        rich: {
                            ok: {
                                fontSize: Math.round(cellSize * 0.75),
                                fontWeight: 700,
                                lineHeight: cellSize,
                                color: "rgb(16,120,57)",
                                textShadowBlur: 4,
                                textShadowColor: "rgba(255,255,255,0.8)",
                            },
                            bad: {
                                fontSize: Math.round(cellSize * 0.75),
                                fontWeight: 700,
                                lineHeight: cellSize,
                                color: "rgb(178,34,34)",
                                textShadowBlur: 4,
                                textShadowColor: "rgba(255,255,255,0.8)",
                            },
                        },
                    },
                    itemStyle: {
                        borderColor: "rgba(255,255,255,0.55)",
                        borderWidth: 0,
                        shadowBlur: 0,
                        shadowColor: "rgba(255,255,255,0.35)",
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: "",
                            borderWidth: 0,
                            shadowBlur: 0,
                            shadowColor: "",
                        },
                    },
                },
            ],
        }),
        [width, cellSize],
    );

    return (
        <div ref={rootRef} className={className}>
            {/* Legend */}
            <div className="mb-2 flex flex-wrap items-center gap-4 text-xs opacity-80 sm:text-sm">
                <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-[rgba(34,197,94,0.6)] ring-1 ring-[rgba(34,197,94,0.45)]" />
                    Best fit (✓)
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-[rgba(251,191,36,0.5)] ring-1 ring-[rgba(251,191,36,0.4)]" />
                    Caveats
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-[rgba(239,68,68,0.55)] ring-1 ring-[rgba(239,68,68,0.45)]" />
                    Not recommended (✕)
                </span>
            </div>

            {/* Frosted container */}
            <div className="bg-primary overflow-hidden rounded-xl">
                <ReactECharts option={option} style={{ width: "100%", height }} notMerge lazyUpdate />
            </div>
        </div>
    );
}
