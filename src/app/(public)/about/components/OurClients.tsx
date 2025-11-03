"use client";

import { motion as m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import React from "react";

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
    // Clients (new)
    { href: "https://neomi.wtf", src: "/images/investors/neomi.png", alt: "Neomi" },
    { href: "https://www.fableration.com/", src: "/images/investors/fableration.png", alt: "Fableration" },
    { href: "https://www.pro-logic.au/#", src: "/images/investors/prologic.png", alt: "Prologic" },
    { href: "https://loomiofficial.com/", src: "/images/investors/loomi.png", alt: "Loomi" },
    { href: "https://skimreader.ai", src: "/images/investors/skimreader.png", alt: "Skimreader" },
    { href: "https://idm.org.au", src: "/images/investors/idm.png", alt: "IDM" },
    { href: "#", src: "/images/investors/remi2.png", alt: "Remi" },
    { href: "#", src: "/images/investors/artifai.png", alt: "Artifai" },
];

interface OurClientsProps {
    className?: string;
    title?: string;
}

const OurClients: React.FC<OurClientsProps> = ({ className = "", title = "Trusted by" }) => {
    const prefersReduced = useReducedMotion();

    const container: Variants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.1,
            },
        },
    };

    const reducedItem: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
    };

    const standardItem: Variants = {
        hidden: { opacity: 0, y: 8, scale: 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

    const itemVariants: Variants = prefersReduced ? reducedItem : standardItem;

    const classForLogo = (alt: string) => {
        if (alt === "Skimreader") return "logo-grey";
        const excludeBlack = alt === "Curtin" || alt === "Labrys";
        return excludeBlack ? "" : "logo-black";
    };

    return (
        <section className={`mx-auto max-w-6xl px-4 pt-6 pb-12 md:px-6 lg:px-8 ${className}`} aria-label="Our clients">
            <h2 className="font-ocr mb-4 text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>

            <m.ul
                className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}>
                {LOGOS.map((logo) => (
                    <m.li key={logo.src} className="flex items-center justify-center" variants={itemVariants}>
                        <div className="block w-full">
                            <div className="flex h-12 items-center justify-center opacity-85 transition-opacity hover:opacity-100 sm:h-14 md:h-16">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className={`${classForLogo(logo.alt)} ${
                                        logo.alt === "Remi" ? "remi-scale" : ""
                                    } max-h-full w-auto object-contain`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </m.li>
                ))}
            </m.ul>

            <style jsx>{`
                .logo-grey {
                    filter: grayscale(1) brightness(1.12) contrast(0.88);
                }
                .remi-scale {
                    transform: scale(1.12);
                    transform-origin: center;
                }
                @media (min-width: 768px) {
                    .remi-scale {
                        transform: scale(1.18);
                    }
                }
            `}</style>
        </section>
    );
};

export default OurClients;
