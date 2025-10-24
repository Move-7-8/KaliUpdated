"use client";

import { useCallback, useEffect, useRef } from "react";

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
                        message: "",
                    },
                },
            }),
        );
    }, []);

    // Autoplay video and slow playback
    useEffect(() => {
        const v = vidRef.current;
        if (!v) return;
        const tryPlay = async () => {
            try {
                v.defaultPlaybackRate = 0.8;
                v.playbackRate = 0.8;
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
                "mx-auto min-h-[70vh] w-[98%] rounded-2xl border-[3px] border-black md:border-[3px]",
            ].join(" ")}>
            {/* Background layer (video + blue tint that does NOT affect text) */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={vidRef}
                    className="will-change-filter absolute inset-0 h-full w-full object-cover blur-[0.5px] will-change-transform"
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

            {/* Full-hero glass overlay (light strength) */}
            <div
                aria-hidden="true"
                className={[
                    "pointer-events-none absolute inset-0 z-10 rounded-2xl",
                    "bg-white/5 ring-1 ring-white/10",
                    "backdrop-blur-sm backdrop-contrast-110 backdrop-saturate-125",
                    "supports-[backdrop-filter]:bg-white/5 supports-[backdrop-filter]:backdrop-blur-sm",
                ].join(" ")}
            />

            {/* Wipe layer kept (hidden) */}
            <div
                className="hero-wipe pointer-events-none absolute inset-0 z-30 hidden bg-black/80"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="hero-content relative z-20 container px-4 py-20 text-center sm:px-6 sm:py-24 sm:text-left lg:px-10 lg:py-28 xl:py-32">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center sm:items-start">
                    <h1 className="hero-h1 max-w-5xl [font-family:var(--font-display)] text-4xl leading-[0.95] font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        <span className="line block">Data Consulting</span>
                        <span className="line block">for Australian Businesses</span>
                    </h1>

                    <p className="hero-subheading mt-4 max-w-3xl [font-family:var(--font-display)] text-lg font-medium text-white/90 sm:text-xl md:text-2xl">
                        Data integration · Data analysis · Custom software
                    </p>

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
