"use client";

import { AnimatePresence, type Variants, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";

// --- Services lists (edit here to add/remove pages) ---
type ServiceLink = { label: string; href: string };
const CORE_SERVICES: ServiceLink[] = [
    { label: "AI Solutions", href: "/services/AI-Solutions" },
    { label: "Data Integration", href: "/services/Data-Integration" },
    { label: "Data Analytics", href: "/services/Data-Analytics" },
    { label: "Revenue Operations", href: "/services/Revenue-Operations" },
    { label: "Digital", href: "/services/Digital" },
];
const FEATURED_SERVICE: ServiceLink = {
    label: "HubSpot ↔ Xero Integration",
    href: "/services/Hubspot-Xero-Integration",
};

// Window-pop frame (lighter shadow)
const frameVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.92, pointerEvents: "none" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        transition: { duration: 0.22, ease: [0.215, 0.61, 0.355, 1] },
    },
} as const satisfies Variants;

// Inner layer: classic “window opens downward” vibe
const revealVariants = {
    hidden: { scaleY: 0, rotateX: -12, filter: "blur(6px)" },
    visible: {
        scaleY: [0, 1.02, 1],
        rotateX: [-12, -2, 0],
        filter: ["blur(6px)", "blur(1.5px)", "blur(0px)"],
        transition: {
            duration: 0.32,
            times: [0, 0.7, 1],
            ease: ["easeOut", "easeOut", "easeOut"],
            when: "beforeChildren",
            staggerChildren: 0.02,
        },
    },
} as const satisfies Variants;

// Neon/glow background
const glowVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
} as const satisfies Variants;

// Items
const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } },
} as const satisfies Variants;

export const Topbar = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [scrolling, setScrolling] = useState<"up" | "down" | undefined>(undefined);
    const [prevScrollPosition, setPrevScrollPosition] = useState<number>(0);

    const handleScroll = useCallback(() => {
        setTimeout(() => {
            setPrevScrollPosition(scrollPosition);
            setScrollPosition(window.scrollY);
        }, 200);
    }, [scrollPosition]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        if (scrollPosition < 500) setScrolling(undefined);
        else setScrolling(scrollPosition - prevScrollPosition > 0 ? "down" : "up");
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, scrollPosition, prevScrollPosition]);

    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    // Hover open/close with grace period to avoid flicker between trigger and panel
    const [servicesOpen, setServicesOpen] = useState(false);
    const closeTimerRef = useRef<number | null>(null);
    const openMenu = useCallback(() => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        setServicesOpen(true);
    }, []);
    const scheduleClose = useCallback(() => {
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 160);
    }, []);

    return (
        <>
            <div
                data-scrolling={scrolling}
                data-at-top={scrollPosition < 30}
                className="group fixed inset-x-0 top-0 z-[60] flex justify-center transition-[top] duration-500 data-[at-top=false]:top-3 data-[scrolling=down]:-top-full sm:container md:data-[at-top=false]:top-4">
                <div className="group-data-[at-top=false]:bg-primary group-data-[at-top=false]:dark:bg-primary flex w-full items-center justify-between rounded-full border border-2 border-transparent px-7 py-4 transition-all duration-500 group-data-[at-top=false]:w-[800px] group-data-[at-top=false]:border-black group-data-[at-top=false]:shadow group-data-[at-top=false]:max-sm:mx-2 lg:px-8 lg:py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-none lg:hidden">
                            <div className="drawer">
                                <input id="demo-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    <label
                                        htmlFor="demo-drawer"
                                        className="btn drawer-button btn-ghost btn-square min-h-[44px] min-w-[44px]">
                                        <span className="iconify lucide--menu size-4.5" />
                                    </label>
                                </div>
                                <div className="drawer-side z-[50]">
                                    <label
                                        htmlFor="demo-drawer"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"></label>
                                    <ul className="menu bg-primary text-base-content min-h-full w-80 p-4">
                                        <li>
                                            <Link href="/about">About</Link>
                                        </li>
                                        <li>
                                            <details>
                                                <summary>Services</summary>
                                                <ul>
                                                    <li>
                                                        <Link
                                                            href="/services"
                                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                                            All services
                                                        </Link>
                                                    </li>
                                                    <li className="mt-2 py-1">
                                                        <span className="text-base-content/60 cursor-default text-xs tracking-wide uppercase select-none">
                                                            Services
                                                        </span>
                                                    </li>
                                                    {CORE_SERVICES.map((s) => (
                                                        <li key={s.href}>
                                                            <Link
                                                                href={s.href}
                                                                className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                                                {s.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li className="mt-2 py-1">
                                                        <span className="text-base-content/60 cursor-default text-xs tracking-wide uppercase select-none">
                                                            Featured
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href={FEATURED_SERVICE.href}
                                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                                            {FEATURED_SERVICE.label}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <Link href="/blog">Insights</Link>
                                        </li>
                                        <li className="mt-2">
                                            <div className="[&>button]:btn [&>button]:btn-secondary [&>button]:btn-sm [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border-2 [&>button]:border-black [&>button]:shadow">
                                                <button type="button" onClick={() => openContact()}>
                                                    Contact
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <Link href="/">
                            <Logo className="h-12 md:h-14" />
                        </Link>
                    </div>

                    <div className="gap-3">
                        <ul className="menu menu-horizontal hidden gap-2 px-1 lg:inline-flex"></ul>
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link href="/about" className="btn btn-ghost min-h-[44px]">
                            About
                        </Link>

                        {/* Wrapper handles hover with a grace period; panel also binds enter/leave */}
                        <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                            <Link
                                href="/services"
                                aria-haspopup="menu"
                                aria-expanded={servicesOpen}
                                className="btn btn-ghost min-h-[44px] inline-flex items-center"
                                onMouseEnter={openMenu}>
                                Services
                                <span className="iconify lucide--chevron-down ml-1 size-4" />
                            </Link>

                            {/* Hover buffer to bridge the small gap under the trigger */}
                            <div className="absolute top-full right-0 left-0 h-2" onMouseEnter={openMenu} />

                            <AnimatePresence>
                                {servicesOpen && (
                                    <motion.div
                                        key="services-frame"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={frameVariants}
                                        onMouseEnter={openMenu}
                                        onMouseLeave={scheduleClose}
                                        style={{ transformOrigin: "top right" }}
                                        className={[
                                            "bg-base-100 absolute right-0 mt-1.5 min-w-max rounded-[20px]",
                                            "border-2 border-black p-2",
                                            "shadow-[3px_3px_0_#000]", // gentler shadow
                                        ].join(" ")}
                                        role="menu">
                                        <motion.div
                                            variants={revealVariants}
                                            style={{ transformOrigin: "top", transformPerspective: 1000 }}
                                            className="relative overflow-hidden rounded-[18px]">
                                            <motion.div
                                                aria-hidden
                                                variants={glowVariants}
                                                className={[
                                                    "pointer-events-none absolute -inset-1 rounded-[20px]",
                                                    "bg-[radial-gradient(120%_80%_at_10%_-10%,rgba(255,0,204,.18),transparent_50%),",
                                                    "radial-gradient(120%_80%_at_110%_120%,rgba(0,255,255,.18),transparent_52%)]",
                                                    "opacity-70 mix-blend-screen blur-xl",
                                                ].join(" ")}
                                            />
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 rounded-[20px] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:100%_3px] opacity-20"
                                            />

                                            <ul className="menu relative">
                                                <motion.li variants={itemVariants}>
                                                    <Link
                                                        href="/services"
                                                        className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                                        All services
                                                    </Link>
                                                </motion.li>

                                                <motion.li className="mt-2 py-1 text-right" variants={itemVariants}>
                                                    <span className="text-base-content/60 cursor-default text-xs tracking-wide uppercase select-none">
                                                        Services
                                                    </span>
                                                </motion.li>

                                                {CORE_SERVICES.map((s) => (
                                                    <motion.li key={s.href} variants={itemVariants}>
                                                        <Link
                                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap"
                                                            href={s.href}>
                                                            {s.label}
                                                        </Link>
                                                    </motion.li>
                                                ))}

                                                <motion.li className="mt-2 py-1 text-right" variants={itemVariants}>
                                                    <span className="text-base-content/60 cursor-default text-xs tracking-wide uppercase select-none">
                                                        Featured
                                                    </span>
                                                </motion.li>

                                                <motion.li variants={itemVariants}>
                                                    <Link
                                                        className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap"
                                                        href={FEATURED_SERVICE.href}>
                                                        {FEATURED_SERVICE.label}
                                                    </Link>
                                                </motion.li>
                                            </ul>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/blog" className="btn btn-ghost min-h-[44px]">
                            Insights
                        </Link>

                        <button
                            type="button"
                            onClick={() => openContact()}
                            className="btn btn-secondary min-h-[44px] cursor-pointer rounded-full border-2 border-black">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
