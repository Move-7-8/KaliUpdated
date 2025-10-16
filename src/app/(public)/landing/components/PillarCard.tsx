"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Lottie from "react-lottie-player";

type PillarCardProps = {
    label?: string;
    title: string;
    children: React.ReactNode;
    outcomes?: string[];
    proof?: string;
    priceText?: string;
    trustNote?: string;

    className?: string;
    bgClassName?: string;
    imageSrc?: string;
    imageAlt?: string;

    lottieSrc?: string;
    lottieLoop?: boolean;

    primaryLabel?: string;
    primaryHref?: string;
    primaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    secondaryNewTab?: boolean;

    inStack?: boolean;
    style?: React.CSSProperties;
    primaryUsesContactModal?: boolean;
};

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
    inStack = true,

    style,
}: PillarCardProps) {
    const secondaryShouldNewTab = (secondaryNewTab ?? false) || isExternal(secondaryHref);
    const secondaryTarget = secondaryShouldNewTab ? "_blank" : undefined;
    const secondaryRel = secondaryShouldNewTab ? "noopener noreferrer" : undefined;

    const useContactModalSecondary =
        typeof secondaryLabel === "string" && secondaryLabel.toLowerCase().includes("contact");
    const useContactModalPrimary =
        !!primaryUsesContactModal ||
        (typeof primaryLabel === "string" && primaryLabel.toLowerCase().includes("consult"));

    const openContact = useCallback(
        (initial?: Partial<{ name: string; email: string; company: string; message: string }>) => {
            if (typeof window === "undefined") return;
            window.dispatchEvent(new CustomEvent("open-contact", { detail: { initial } }));
        },
        [],
    );

    const defaultInitial = { message: `` };

    const spacingClasses = inStack
        ? "my-0 first:mt-0 last:mb-0"
        : "my-2 first:mt-0 last:mb-0 md:my-[18vh] md:first:mt-[1vh] md:last:mb-[20vh]";

    return (
        <article
            style={style}
            className={[
                "stacking__card",
                "card",
                "shadow-xl",
                "w-full",
                "max-w-[85%]",
                "mx-auto",
                spacingClasses,
                "rounded-3xl",
                "min-h-[48vh] md:min-h-[52vh] lg:min-h-[56vh]",
                "border-[3px] border-black md:border-[4px]",
                "font-heading",
                "mix-blend-normal filter-none",
                bgClassName,
                className,
            ].join(" ")}>
            <div className="card-body h-full p-5 md:p-6">
                <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex min-h-[232px] flex-col">
                        {label ? (
                            <span className="badge badge-neutral font-ocr border-2 border-black text-xs font-semibold tracking-wide">
                                {label}
                            </span>
                        ) : null}

                        <h2 className="font-ocr mt-2 mb-4 text-2xl leading-[0.95] font-extrabold tracking-tight md:text-2xl lg:text-3xl">
                            {title}
                        </h2>

                        <div className="mt-3 text-lg font-normal md:text-xl">{children}</div>

                        {outcomes && outcomes.length ? (
                            <ul className="mt-4 list-disc pl-5 text-sm md:text-base">
                                {outcomes.map((o, idx) => (
                                    <li key={idx}>{o}</li>
                                ))}
                            </ul>
                        ) : null}

                        <div className="mt-auto">
                            <div className="flex flex-wrap gap-3 pt-5">
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
                        </div>
                    </div>

                    {/* Right: visual — now shows down to md, hidden below */}
                    <div
                        className={[
                            "relative",
                            "hidden md:block",
                            "overflow-hidden",
                            "rounded-2xl",
                            "md:min-h-[240px] lg:min-h-[256px]",
                            "bg-primary",
                            "isolate",
                            "mix-blend-normal",
                            "filter-none",
                            "opacity-100",
                        ].join(" ")}>
                        {lottieSrc ? (
                            <div className="absolute inset-0 flex translate-y-2 transform-gpu items-start justify-center opacity-100 mix-blend-normal md:translate-y-4 lg:translate-y-5">
                                <Lottie
                                    play
                                    loop={lottieLoop}
                                    path={lottieSrc}
                                    rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                                    style={{ width: "90%", height: "90%", pointerEvents: "none" }}
                                />
                            </div>
                        ) : imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={imageAlt ?? title}
                                fill
                                sizes="(min-width: 768px) 45vw, 90vw"
                                className="object-contain p-0 opacity-100 filter-none"
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
