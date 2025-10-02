// src/app/services/components/ServiceCard.tsx
"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Lottie from "react-lottie-player";

// src/app/services/components/ServiceCard.tsx

// src/app/services/components/ServiceCard.tsx

// src/app/services/components/ServiceCard.tsx

// src/app/services/components/ServiceCard.tsx

// src/app/services/components/ServiceCard.tsx

type Props = {
    id: string;
    label?: string;
    title: string;
    description: string;
    outcomes?: string[];
    deliverables?: string[];
    timeline?: string;
    priceText?: string;

    primaryLabel?: string;
    primaryHref?: string;
    primaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    secondaryLabel?: string;
    secondaryHref?: string;
    secondaryOnClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    secondaryNewTab?: boolean;

    imageSrc?: string;
    imageAlt?: string;
    lottieSrc?: string;
    lottieLoop?: boolean;

    className?: string;
    bgClassName?: string; // defaults below
};

const isExternal = (href?: string) => !!href && (/^https?:\/\//i.test(href) || href.startsWith("//"));

export default function ServiceCard({
    id,
    label,
    title,
    description,
    outcomes,
    deliverables,
    timeline,
    priceText,

    primaryLabel = "Learn more",
    primaryHref,
    primaryOnClick,
    secondaryLabel = "Contact",
    secondaryHref,
    secondaryOnClick,
    secondaryNewTab,

    imageSrc,
    imageAlt,
    lottieSrc,
    lottieLoop = true,

    className = "",
    bgClassName = "bg-base-100 text-base-content",
}: Props) {
    const secondaryShouldNewTab = (secondaryNewTab ?? false) || isExternal(secondaryHref);
    const secondaryTarget = secondaryShouldNewTab ? "_blank" : undefined;
    const secondaryRel = secondaryShouldNewTab ? "noopener noreferrer" : undefined;

    // When no onClick is provided for the secondary button and there's no href,
    // mirror Topbar behavior: dispatch a window event "open-contact" that ContactModal listens for.
    const defaultSecondaryOnClick = useCallback<React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>>(
        (e) => {
            if (typeof window === "undefined") return;
            // Prevent form-submit defaults if this sits inside a <form>.
            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent("open-contact", {
                    detail: { source: "service-card", id, title },
                }),
            );
        },
        [id, title],
    );

    const handleSecondaryClick = secondaryOnClick ?? defaultSecondaryOnClick;

    return (
        <article
            id={id}
            className={[
                "card",
                "w-full",
                "max-w-[85%]",
                "mx-auto",
                "rounded-3xl",
                "shadow-xl",
                "border-[3px] border-black md:border-[4px]",
                "overflow-hidden",
                "font-heading",
                bgClassName,
                className,
            ].join(" ")}>
            <div className="card-body p-6 md:p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left */}
                    <div className="flex min-h-[240px] flex-col">
                        {label ? (
                            <span className="badge badge-neutral font-ocr border-2 border-black text-xs font-semibold tracking-wide">
                                {label}
                            </span>
                        ) : null}

                        <h2 className="font-ocr mt-3 text-2xl leading-[0.95] font-extrabold tracking-tight md:text-3xl">
                            {title}
                        </h2>

                        <p className="mt-3 text-base opacity-90 md:text-lg">{description}</p>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            {outcomes && outcomes.length ? (
                                <div>
                                    <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                        Key outcomes
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                        {outcomes.map((o, i) => (
                                            <li key={i}>{o}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}

                            {deliverables && deliverables.length ? (
                                <div>
                                    <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                        Deliverables
                                    </h3>
                                    <ul className="mt-2 list-disc pl-5 text-sm md:text-base">
                                        {deliverables.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                            {timeline ? (
                                <div className="bg-base-100/60 text-base-content rounded-xl border-2 border-black px-3 py-2 text-sm">
                                    <span className="font-bold">Timeline:</span> {timeline}
                                </div>
                            ) : null}
                            {priceText ? (
                                <div className="bg-base-100/60 text-base-content rounded-xl border-2 border-black px-3 py-2 text-sm">
                                    <span className="font-bold">Price:</span> {priceText}
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-auto pt-6">
                            <div className="flex flex-wrap gap-3">
                                {primaryHref ? (
                                    <a
                                        href={primaryHref}
                                        onClick={primaryOnClick}
                                        className="btn btn-secondary border-2 border-black font-semibold">
                                        {primaryLabel}
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={primaryOnClick}
                                        className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                                        {primaryLabel}
                                    </button>
                                )}

                                {secondaryHref ? (
                                    <a
                                        href={secondaryHref}
                                        onClick={handleSecondaryClick}
                                        target={secondaryTarget}
                                        rel={secondaryRel}
                                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                        {secondaryLabel}
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSecondaryClick}
                                        className="btn btn-outline bg-base-100 text-base-content cursor-pointer border-2 border-black">
                                        {secondaryLabel}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="relative hidden overflow-hidden rounded-2xl border-2 border-black lg:block">
                        {lottieSrc ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Lottie
                                    play
                                    loop={lottieLoop}
                                    path={lottieSrc}
                                    rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                                    style={{ width: "92%", height: "92%", pointerEvents: "none" }}
                                />
                            </div>
                        ) : imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={imageAlt ?? title}
                                fill
                                sizes="(min-width: 1024px) 48vw, 90vw"
                                className="object-contain p-3"
                                priority={false}
                            />
                        ) : (
                            <div className="grid h-full w-full place-content-center">
                                <div className="text-sm opacity-70">[ Visual ]</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
