"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Lottie from "react-lottie-player";

// NOTE: Removed ContactModal import — we now trigger the global one by event.
// import ContactModal from "./ContactModal";

type PillarCardProps = {
    label?: string; // small category label
    title: string;
    children: React.ReactNode; // one-line promise / description
    outcomes?: string[]; // 2–3 bullets
    proof?: string; // micro-proof metric/quote
    priceText?: string; // tiny price signal
    trustNote?: string; // tiny trust note

    className?: string; // extra classes for the outer <article>
    bgClassName?: string; // override bg/text (defaults to DaisyUI primary)
    imageSrc?: string;
    imageAlt?: string;

    // NEW: Lottie support (use lottieSrc OR imageSrc)
    lottieSrc?: string; // e.g. "/images/lottie/automation.json"
    lottieLoop?: boolean;

    primaryLabel?: string;
    primaryHref?: string;
    primaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;

    // Optional override: force secondary link to open in new tab
    secondaryNewTab?: boolean;

    // Make the primary button trigger the ContactModal
    primaryUsesContactModal?: boolean;
};

// Treat fully-qualified URLs as external
const isExternal = (href?: string) => !!href && (/^https?:\/\//i.test(href) || href.startsWith("//"));

export default function PillarCard({
    label,
    title,
    children,
    outcomes,
    proof,
    priceText,
    trustNote,

    className = "",
    bgClassName = "bg-primary text-primary-content",
    imageSrc,
    imageAlt,

    lottieSrc,
    lottieLoop = true,

    primaryLabel = "Learn more",
    primaryHref,
    primaryOnClick,
    secondaryLabel = "Contact",
    secondaryHref,
    secondaryOnClick,
    secondaryNewTab,
    primaryUsesContactModal,
}: PillarCardProps) {
    // Only open the secondary link in a new tab for external URLs (e.g., Interactive Demo),
    // unless explicitly overridden via `secondaryNewTab`.
    const secondaryShouldNewTab = (secondaryNewTab ?? false) || isExternal(secondaryHref);
    const secondaryTarget = secondaryShouldNewTab ? "_blank" : undefined;
    const secondaryRel = secondaryShouldNewTab ? "noopener noreferrer" : undefined;

    // Heuristics (kept minimal): allow label-based auto for primary/secondary
    const useContactModalSecondary =
        typeof secondaryLabel === "string" && secondaryLabel.toLowerCase().includes("contact");
    const useContactModalPrimary =
        !!primaryUsesContactModal ||
        (typeof primaryLabel === "string" && primaryLabel.toLowerCase().includes("consult"));

    // Dispatch an event that the global ContactModal listens to.
    const openContact = useCallback(
        (initial?: Partial<{ name: string; email: string; company: string; message: string }>) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(
                new CustomEvent("open-contact", {
                    detail: { initial },
                }),
            );
        },
        [],
    );

    // Provide a concise default message per card when opening the modal.
    const defaultInitial = {
        message: ``,
    };

    return (
        <article
            className={[
                "stacking__card",
                "card",
                "shadow-xl",
                "w-full",
                "max-w-[85%]",
                "mx-auto",
                "my-[18vh] first:mt-[1vh] last:mb-[20vh]",
                "rounded-3xl",
                // 20% smaller card min-heights (was 60/65/70vh)
                "min-h-[48vh] md:min-h-[52vh] lg:min-h-[56vh]",
                "border-[3px] border-black md:border-[4px]",
                "font-heading", // Eurostile for entire component by default
                bgClassName,
                className,
            ].join(" ")}>
            <div className="card-body h-full p-5 md:p-6">
                <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Left: copy & CTAs */}
                    {/* reduce left column minimum height roughly 20% (was 18rem ≈ 288px) */}
                    <div className="flex min-h-[232px] flex-col">
                        {label ? (
                            // Label uses OCR (body) explicitly
                            <span className="badge badge-neutral font-ocr border-2 border-black text-xs font-semibold tracking-wide">
                                {label}
                            </span>
                        ) : null}

                        {/* Title in OCR, bold, bigger — removed `card-title` to avoid DaisyUI size override */}
                        <h2 className="font-ocr mt-2 mb-4 text-2xl leading-[0.95] font-extrabold tracking-tight md:text-2xl lg:text-3xl">
                            {title}
                        </h2>

                        {/* Smaller, lighter description (kept Eurostile via wrapper) */}
                        <div className="mt-3 text-lg font-normal opacity-90 md:text-xl">{children}</div>

                        {/* Outcomes */}
                        {outcomes && outcomes.length ? (
                            <ul className="mt-4 list-disc pl-5 text-sm md:text-base">
                                {outcomes.map((o, idx) => (
                                    <li key={idx}>{o}</li>
                                ))}
                            </ul>
                        ) : null}

                        {/* Proof + trust */}
                        {/* <div className="mt-4 space-y-1 text-sm opacity-90">
                            {proof ? <div className="italic">“{proof}”</div> : null}
                            {trustNote ? <div className="opacity-80">{trustNote}</div> : null}
                        </div> */}

                        {/* Bottom section: CTAs + price pinned to bottom */}
                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-3 pt-5">
                                {/* PRIMARY: blue — either modal or link/button */}
                                {useContactModalPrimary ? (
                                    <div className="[&>button]:btn [&>button]:btn-secondary [&>button]:cursor-pointer [&>button]:border-2 [&>button]:border-black [&>button]:font-semibold [&>button]:shadow">
                                        <button
                                            type="button"
                                            onClick={() => openContact(defaultInitial)}
                                            aria-haspopup="dialog"
                                            aria-controls="contact-modal">
                                            {primaryLabel}
                                        </button>
                                    </div>
                                ) : primaryHref ? (
                                    <a
                                        href={primaryHref}
                                        onClick={primaryOnClick}
                                        className="btn btn-secondary border-2 border-black font-semibold">
                                        {primaryLabel}
                                    </a>
                                ) : (
                                    <button
                                        onClick={primaryOnClick}
                                        className="btn btn-secondary border-2 border-black font-semibold">
                                        {primaryLabel}
                                    </button>
                                )}

                                {/* SECONDARY: grey outline — case studies / demos / or modal fallback */}
                                {useContactModalSecondary ? (
                                    <div className="[&>button]:btn [&>button]:btn-outline [&>button]:bg-base-100 [&>button]:text-base-content [&>button]:cursor-pointer [&>button]:border-2 [&>button]:border-black [&>button]:shadow">
                                        <button
                                            type="button"
                                            onClick={() => openContact({ message: `${label ?? title} — Contact` })}
                                            aria-haspopup="dialog"
                                            aria-controls="contact-modal">
                                            {secondaryLabel}
                                        </button>
                                    </div>
                                ) : secondaryHref ? (
                                    <a
                                        href={secondaryHref}
                                        onClick={secondaryOnClick}
                                        target={secondaryTarget}
                                        rel={secondaryRel}
                                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                        {secondaryLabel}
                                    </a>
                                ) : (
                                    <button
                                        onClick={secondaryOnClick}
                                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                        {secondaryLabel}
                                    </button>
                                )}
                            </div>

                            {/* Price pinned at the very bottom of the left column */}
                            {/* {priceText ? (
                                <div className="mt-3 text-xs font-medium opacity-90 md:text-sm">Price: {priceText}</div>
                            ) : null} */}
                        </div>
                    </div>

                    {/* Right: visual */}
                    {/* Use a div instead of <figure> so DaisyUI's `.card figure { display:block }` can't override `hidden` */}
                    <div className="relative hidden overflow-hidden rounded-2xl lg:block lg:min-h-[256px]">
                        {lottieSrc ? (
                            // Wrapper lets us nudge the animation lower
                            <div className="absolute inset-0 flex translate-y-2 transform-gpu items-start justify-center lg:translate-y-5">
                                <Lottie
                                    play
                                    loop={lottieLoop}
                                    path={lottieSrc}
                                    rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                        pointerEvents: "none",
                                    }}
                                />
                            </div>
                        ) : imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={imageAlt ?? title}
                                fill
                                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 45vw, 90vw"
                                className="object-contain p-0"
                                priority={false}
                            />
                        ) : (
                            <div className="grid h-full w-full place-content-center opacity-80">
                                <div className="text-sm md:text-base">[ Graphic / Image ]</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
