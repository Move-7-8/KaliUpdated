"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Logo } from "@/components/Logo";

// import { ThemeToggleDropdown } from "@/components/ThemeToggleDropdown";

// src/app/landing/components/Topbar.tsx

// src/app/landing/components/Topbar.tsx
// NEW: trigger the global ContactModal via a window event

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
        if (scrollPosition < 500) {
            setScrolling(undefined);
        } else {
            if (scrollPosition - prevScrollPosition > 0) {
                setScrolling("down");
            } else if (scrollPosition - prevScrollPosition < 0) {
                setScrolling("up");
            }
        }
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, scrollPosition, prevScrollPosition]);

    // Dispatch to open the global ContactModal mounted in RootLayout
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    // Desktop Services hover state
    const [servicesOpen, setServicesOpen] = useState(false);

    return (
        <>
            <div
                data-scrolling={scrolling}
                data-at-top={scrollPosition < 30}
                className="group fixed inset-x-0 top-0 z-[60] flex justify-center transition-[top] duration-500 data-[at-top=false]:top-3 data-[scrolling=down]:-top-full sm:container md:data-[at-top=false]:top-4">
                <div className="group-data-[at-top=false]:bg-primary group-data-[at-top=false]:dark:bg-primary /* keep a on always to prevent layout shift, then color it on scroll */ flex w-full items-center justify-between rounded-full border border-2 border-transparent px-6 py-3 transition-all duration-500 group-data-[at-top=false]:w-[800px] group-data-[at-top=false]:border-black group-data-[at-top=false]:shadow group-data-[at-top=false]:max-sm:mx-2 lg:py-1.5">
                    <div className="flex items-center gap-2">
                        <div className="flex-none lg:hidden">
                            <div className="drawer">
                                <input id="demo-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    <label
                                        htmlFor="demo-drawer"
                                        className="btn drawer-button btn-ghost btn-square btn-sm">
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
                                        {/* <li>
                                            <Link href="/industries">Industries</Link>
                                        </li> */}
                                        {/* Mobile Services with submenu */}
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
                                                    <li>
                                                        <Link
                                                            href="/services/Hubspot-Xero-Integration"
                                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                                            HubSpot ↔ Xero Integration
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <Link href="/blog">Insights</Link>
                                        </li>

                                        {/* <li>
                                            <Link href="/insights">Insights</Link>
                                        </li>
                                        <li>
                                            <Link href="/careers">Insights</Link>
                                        </li> */}
                                        <li className="mt-2">
                                            {/* Mobile CTA inside drawer */}
                                            {/* The wrapper applies your button look/size and ensures the hand cursor. */}
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
                            <Logo className="h-12 md:h-14" />{" "}
                        </Link>
                    </div>

                    {/* Center menu (desktop): intentionally empty so nothing appears in the middle */}
                    <div className="gap-3">
                        <ul className="menu menu-horizontal hidden gap-2 px-1 lg:inline-flex">
                            {/* <li>
                                <p>Home</p>
                            </li> */}
                            {/* <li>
                                <Link href="/industries">Industries</Link>
                            </li> */}
                            {/* <li>
                                <Link href="/insights">Insights</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li> */}
                            {/* Services moved to right cluster per request */}
                        </ul>
                    </div>

                    {/* <div className="inline-flex items-center gap-2.5">
                        <ThemeToggleDropdown
                            triggerClass="btn btn-square btn-sm border-transparent bg-transparent"
                            dropdownClass="dropdown-center dropdown-end"
                        />
                        <Link
                            href="https://daisyui.com/store/244268?aff=Db6q2"
                            target="_blank"
                            className="btn btn-primary btn-sm btn-square">
                            <span className="iconify lucide--shopping-cart size-4" />
                        </Link>
                    </div> */}

                    {/* Right cluster: About + Services (links) just left of CTA */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link href="/about" className="btn btn-ghost btn-sm">
                            About
                        </Link>

                        {/* Desktop Services with hover-controlled dropdown (stays open while hovering trigger or panel) */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}>
                            {/* Clicking the label goes to /services (best practice) */}
                            <Link
                                href="/services"
                                aria-haspopup="menu"
                                aria-expanded={servicesOpen}
                                className="btn btn-ghost btn-sm inline-flex items-center">
                                Services
                                <span className="iconify lucide--chevron-down ml-1 size-4" />
                            </Link>

                            <div
                                className={[
                                    "rounded-box bg-base-100 absolute right-0 mt-2 min-w-max border border-black/10 p-2 shadow transition",
                                    servicesOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0",
                                ].join(" ")}
                                role="menu">
                                <ul className="menu">
                                    {/* Pinned All services at the top — styled same as other links */}
                                    <li>
                                        <Link
                                            href="/services"
                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap">
                                            All services
                                        </Link>
                                    </li>

                                    {/* Featured label — visually distinct */}
                                    <li className="py-1 text-right">
                                        <span className="text-base-content/60 cursor-default text-xs tracking-wide uppercase select-none">
                                            Featured
                                        </span>
                                    </li>

                                    {/* Featured item(s) — styled same as other links */}
                                    <li>
                                        <Link
                                            className="hover:bg-base-200 rounded-md px-3 py-2 whitespace-nowrap"
                                            href="/services/Hubspot-Xero-Integration">
                                            HubSpot ↔ Xero Integration
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Link href="/blog" className="btn btn-ghost btn-sm">
                            Insights
                        </Link>

                        {/* Contact button triggers the global modal */}
                        <button
                            type="button"
                            onClick={() => openContact()}
                            className="btn btn-secondary btn-sm cursor-pointer rounded-full border-2 border-black shadow">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
