"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type ResultItem = {
    metric: string;
    title: string;
    summary: string;
    client: string;
    href?: string;
    tags?: string[];
    imageSrc?: string;
    imageAlt?: string;
};

type ResultsCardProps = {
    item: ResultItem;
    index?: number;
};

export default function ResultsCard({ item, index = 0 }: ResultsCardProps) {
    return (
        <article
            className={[
                "card bg-base-100 text-base-content",
                "rounded-2xl border-2 border-black shadow-xl",
                "overflow-hidden",
            ].join(" ")}>
            {/* Visual */}
            <div className="relative aspect-[16/9]">
                {item.imageSrc ? (
                    <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 90vw"
                        className="object-cover"
                        priority={index === 0}
                    />
                ) : (
                    <div className="bg-base-200 absolute inset-0 grid place-items-center">
                        <div className="rounded-xl border-2 border-black px-3 py-1 text-xs opacity-70">Screenshot</div>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="card-body gap-3">
                <div className="flex items-center justify-between">
                    <div className="text-xl leading-tight font-extrabold">{item.metric}</div>
                    <span className="badge badge-neutral border-2 border-black text-[10px]">{item.client}</span>
                </div>

                <h3 className="font-heading text-lg leading-snug font-bold">{item.title}</h3>

                <p className="text-sm opacity-90">{item.summary}</p>

                {item.tags && item.tags.length > 0 ? (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {item.tags.map((t, idx) => (
                            <span key={idx} className="badge border-2 border-black">
                                {t}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="mt-2">
                    {item.href ? (
                        <Link href={item.href} className="btn btn-secondary border-2 border-black">
                            Read case study
                        </Link>
                    ) : (
                        <button className="btn btn-secondary border-2 border-black" aria-disabled>
                            Read case study
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
