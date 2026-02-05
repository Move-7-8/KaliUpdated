"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

type LogoItem = {
    href: string;
    src: string;
    alt: string;
};

const LOGOS: LogoItem[] = [
    // Investors
    { href: "https://www.woodside.com/", src: "/images/investors/woodside.png", alt: "Woodside" },
    { href: "https://www.betterlabs.com.au/", src: "/images/investors/betterlabs.png", alt: "BetterLabs" },
    { href: "https://www.hawaiian.com.au/", src: "/images/investors/hawaiian.png", alt: "Hawaiian" },
    { href: "https://www.capricorn.coop/", src: "/images/investors/capricorn.png", alt: "Capricorn" },
    { href: "https://visagio.com/", src: "/images/investors/vici.png", alt: "Visagio" },
    { href: "https://eastcourt.com.au/", src: "/images/investors/eastcourt.png", alt: "Eastcourt" },
    { href: "https://spacecubed.com/", src: "/images/investors/space.png", alt: "Spacecubed" },
    // Partners
    { href: "https://betterlabs.com", src: "/images/investors/curtin.png", alt: "Curtin" },
    { href: "https://www.digitalx.com/", src: "/images/investors/digital.png", alt: "DigitalX" },
    { href: "https://dfcrc.com", src: "/images/investors/dfcrc.png", alt: "DFCRC" },
    { href: "https://labrys.io/", src: "/images/investors/labrys.png", alt: "Labrys" },
    { href: "https://www.iiaust.com.au/", src: "/images/investors/iia.png", alt: "IIA Australia" },
];

interface LogoMarqueeProps {
    className?: string;
    durationSec?: number;
    gapRem?: number;
    pauseOnHover?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
    className = "",
    durationSec = 42,
    gapRem = 2,
    pauseOnHover = true,
}) => {
    const items = [...LOGOS, ...LOGOS];

    const root = useRef<HTMLDivElement | null>(null);
    const overlay = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = root.current;
        const ol = overlay.current;
        if (!el || !ol) return;

        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

        const computeProgress = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const startY = vh * 0.95;
            const endY = vh * 0.45;
            const t = (startY - rect.top) / Math.max(1, startY - endY);
            return Math.min(1, Math.max(0, t));
        };

        const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

        const update = () => {
            const raw = mql.matches ? 1 : computeProgress();
            const p = easeOutQuad(raw);
            ol.style.opacity = String(p);
        };

        let rAF: number | null = null;
        const onScrollOrResize = () => {
            if (rAF != null) return;
            rAF = requestAnimationFrame(() => {
                rAF = null;
                update();
            });
        };

        update();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (rAF) cancelAnimationFrame(rAF);
        };
    }, []);

    return (
        <div ref={root} className={`bg-base-200 relative isolate mx-auto w-[90%] px-6 md:px-4 ${className}`}>
            {/* Scroll overlay to #DBE9FE */}
            <div
                ref={overlay}
                className="pointer-events-none absolute inset-0 z-0"
                // style={{ backgroundColor: "#DBE9FE", opacity: 0, willChange: "opacity" }}
                aria-hidden="true"
            />

            <div className="relative z-10">
                <h2 className="mt-10 mb-6 text-2xl font-semibold tracking-tight">Trusted by</h2>

                <div
                    className="relative w-full overflow-hidden"
                    aria-label="Trusted by marquee"
                    style={{
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 80%, transparent)",
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 80%, transparent)",
                    }}>
                    <ul
                        className="marquee m-0 flex list-none p-0"
                        style={
                            {
                                ["--marquee-duration"]: `${durationSec}s`,
                                ["--marquee-gap"]: `${gapRem}rem`,
                                ["--marquee-hover"]: pauseOnHover ? "paused" : "running",
                            } as React.CSSProperties
                        }>
                        {items.map((item, i) => {
                            const excludeBlack = item.alt === "Curtin" || item.alt === "Labrys";
                            return (
                                <li key={`${item.src}-${i}`} className="shrink-0">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-3 py-2 opacity-85 transition-opacity hover:opacity-100">
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            width={120}
                                            height={40}
                                            className={`${excludeBlack ? "" : "logo-black"} h-8 w-auto object-contain sm:h-10`}
                                            priority={i < LOGOS.length}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="pb-8 md:pb-10" />
            </div>

            <style jsx>{`
                .marquee {
                    gap: var(--marquee-gap, 2rem);
                    width: max-content;
                    animation: marquee-x var(--marquee-duration, 24s) linear infinite;
                }
                @keyframes marquee-x {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @media (prefers-reduced-motion: no-preference) {
                    .marquee:hover {
                        animation-play-state: var(--marquee-hover, paused);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee {
                        animation: none;
                        flex-wrap: wrap;
                        row-gap: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LogoMarquee;
