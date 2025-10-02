// src/app/landing/components/Hero.tsx
"use client";

import { useCallback, useEffect, useRef } from "react";

// src/app/landing/components/Hero.tsx

// src/app/landing/components/Hero.tsx

// src/app/landing/components/Hero.tsx

export const Hero = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const vidRef = useRef<HTMLVideoElement | null>(null);

    // Open the global ContactModal mounted in RootLayout
    const openContact = useCallback(() => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(
            new CustomEvent("open-contact", {
                detail: {
                    initial: {
                        message: "Homepage — I’d like a free 15-min consult. Context: (goals, tools, timeline)",
                    },
                },
            }),
        );
    }, []);

    // Autoplay video (no scroll effects)
    useEffect(() => {
        const v = vidRef.current;
        if (!v) return;
        const tryPlay = async () => {
            try {
                if (v.paused) await v.play();
            } catch {}
        };
        tryPlay();
        v.addEventListener("loadedmetadata", tryPlay);
        return () => v.removeEventListener("loadedmetadata", tryPlay);
    }, []);

    return (
        <section
            ref={root}
            className={[
                "hero relative isolate overflow-hidden bg-black/80",
                "mx-auto w-[98%] rounded-2xl border-[3px] border-black md:border-[3px]",
            ].join(" ")}>
            {/* Background layer (video + blue tint that does NOT affect text) */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={vidRef}
                    className="will-change-filter absolute inset-0 h-full w-full object-cover blur-[2px] will-change-transform"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/landing/hero-poster.jpg"
                    aria-hidden="true">
                    <source src="/images/landing/hero4.mp4" type="video/mp4" />
                </video>

                {/* Subtle static blue tint over the video only */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(11,30,57,0.5), rgba(11,30,57,0.4) 50%, rgba(11,30,57,0.55))",
                    }}
                    aria-hidden="true"
                />
            </div>

            {/* Wipe layer kept (hidden) */}
            <div
                className="hero-wipe pointer-events-none absolute inset-0 z-30 hidden bg-black/80"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="hero-content relative z-20 container px-4 py-20 text-center sm:px-6 sm:py-24 sm:text-left lg:px-10 lg:py-28 xl:py-32">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center sm:items-start">
                    <h1 className="hero-h1 max-w-5xl text-4xl leading-[0.95] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        <span className="line block">Software &amp; Automation</span>
                        <span className="line block">for Australian Businesses</span>
                    </h1>

                    {/* CTA block */}
                    <div className="mt-10 flex flex-col justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:justify-start">
                        <button
                            type="button"
                            onClick={openContact}
                            aria-haspopup="dialog"
                            aria-controls="contact-modal"
                            className="btn btn-secondary cursor-pointer rounded-full border-2 border-black font-semibold shadow">
                            Contact Us
                        </button>
                        {/* Optional: tiny trust logos row (uncomment if you want to keep this visual) */}
                        {/*
                        <div className="flex items-center gap-4 opacity-80">
                            <img src="/images/logos/woodside.svg" alt="Woodside" className="h-6" />
                            <img src="/images/logos/dfcrc.svg" alt="DFCRC" className="h-6" />
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </section>
    );
};
