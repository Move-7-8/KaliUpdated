import { type Variants, motion } from "motion/react";
import Image from "next/image";

type CaseStudyProps = {
    id: string;
    label: string;
    title: string;
    summary: string;
    metrics?: Array<{ k: string; v: string }>;
    bullets?: string[];
    ctaHref?: string;
    ctaLabel?: string;
    image?: { src: string; alt: string };
    orientation?: "image-left" | "image-right";
    imageCta?: boolean; // NEW: render CTA button under the image
};

export default function CaseStudy({
    id,
    label,
    title,
    summary,
    metrics: _metrics = [],
    bullets = [],
    ctaHref,
    ctaLabel = "Read case study",
    image,
    orientation = "image-right",
    imageCta = false,
}: CaseStudyProps) {
    const imageFirst = orientation === "image-left";

    // Motion variants (different to the Services page):
    const viewport = { once: true, amount: 0.25 };

    const card: Variants = {
        hidden: { opacity: 0, y: 28, scale: 0.98, rotate: -0.4 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 85, damping: 14 },
        },
    };

    const block: Variants = {
        hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const list: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
    };

    const listItem: Variants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
    };

    const imageReveal: Variants = {
        hidden: { clipPath: "inset(0 0 100% 0 round 12px)", scale: 1.02 },
        show: {
            clipPath: "inset(0 0 0% 0 round 12px)",
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.article
            id={id}
            className="bg-secondary/10 mt-10 scroll-mt-28 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] md:mt-12"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={card}>
            {/* <div className="from-secondary via-secondary/70 to-secondary/30 h-2 w-full rounded-t-2xl bg-gradient-to-r" /> */}

            <div className="p-5 md:p-6">
                <div className="flex items-center gap-2">
                    {/* Replaced badge with subdued typographic label */}
                    {label && (
                        <motion.p
                            variants={block}
                            className="font-ocr text-base-content/60 text-[11px] tracking-[.18em] uppercase">
                            {label}
                        </motion.p>
                    )}
                    {/* <span className="badge badge-secondary font-ocr border-2 border-black text-sm font-semibold tracking-wide">
                        {label}
                    </span> */}
                </div>

                <motion.h2
                    variants={block}
                    className="font-ocr mt-3 text-3xl leading-[0.95] font-extrabold tracking-tight md:text-4xl">
                    {title}
                </motion.h2>

                <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {imageFirst && (
                        <motion.div variants={block} className="lg:col-span-4">
                            <div className="bg-base-100 relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-black">
                                {image ? (
                                    <motion.div className="absolute inset-0" variants={imageReveal}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, 100vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                ) : (
                                    <div className="grid h-full w-full place-content-center p-6 text-center text-sm opacity-70">
                                        [ Project visual ]
                                    </div>
                                )}
                            </div>

                            {/* NEW: CTA under image (left/image-first) */}
                            {imageCta && ctaHref && (
                                <div className="mt-3">
                                    <a
                                        href={ctaHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                        {ctaLabel}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    )}

                    <motion.div variants={block} className="lg:col-span-8">
                        <p className="text-base opacity-90 md:text-lg">{summary}</p>

                        {bullets.length > 0 && (
                            <motion.div variants={block} className="mt-6">
                                <h3 className="font-ocr text-sm font-bold tracking-wide uppercase opacity-80">
                                    What we did
                                </h3>
                                <motion.ul className="mt-2 space-y-2" variants={list}>
                                    {bullets.map((b, i) => (
                                        <motion.li
                                            key={i}
                                            variants={listItem}
                                            className="bg-base-100/70 relative rounded-lg border-2 border-dashed border-black/60 px-3 py-2 pl-3 text-sm md:text-base">
                                            <span className="mr-2 select-none">▸</span>
                                            {b}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}

                        {/* <div className="mt-6 flex flex-wrap gap-3">
                            {ctaHref && (
                                <a
                                    href={ctaHref}
                                    className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                    {ctaLabel}
                                </a>
                            )}
                        </div> */}
                    </motion.div>

                    {!imageFirst && (
                        <motion.div variants={block} className="lg:col-span-4">
                            <div className="bg-base-100 relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-black">
                                {image ? (
                                    <motion.div className="absolute inset-0" variants={imageReveal}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, 100vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                ) : (
                                    <div className="grid h-full w-full place-content-center p-6 text-center text-sm opacity-70">
                                        [ Project visual ]
                                    </div>
                                )}
                            </div>

                            {/* NEW: CTA under image (right/image-last) */}
                            {imageCta && ctaHref && (
                                <div className="mt-3">
                                    <a
                                        href={ctaHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline bg-base-100 text-base-content border-2 border-black">
                                        {ctaLabel}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
