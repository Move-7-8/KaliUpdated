// src/app/blog/_posts/skimreader-ai-product-build-case-study.tsx
import Image from "next/image";
import Link from "next/link";

export const frontmatter = {
    title: "Skimreader.ai Product Build Case Study",
    description:
        "How we designed and shipped Skimreader.ai — an AI-powered eReader that summarises textbooks and articles as you read, with page-level quizzes and note exports.",
    date: "2025-10-01",
    readingTime: "5 min",
    canonical: "https://www.kalisoftware.io/blog/skimreader-ai-case-study",
    postType: "case-study" as const,
    cardImage: "/images/caseStudies/skimreader2.png",
    cardImageAlt: "Skimreader.ai product build case study",
    author: {
        name: "Connor L",
        image: "/images/blogs/connor_lane.png",
    },
    // NEW: header badge inputs (the template renders the standard circle)
    heroBadgeSrc: "/images/caseStudies/skimreader2.png",
    heroBadgeHref: "https://skimreader.ai/",
    heroBadgeAlt: "Skimreader.ai",
};

export default function Post() {
    return (
        <div className="blog-content">
            {/* CASE SNAPSHOT / WHAT YOU'LL LEARN */}
            <blockquote>
                <p>
                    Skimreader.ai is an AI-powered eReader that summarises and helps you learn textbooks and long-form
                    articles while you read — with page-level quizzes that reinforce recall and quick note export for
                    revision. The product proposition: save hours per week and improve retention for students and
                    researchers, directly inside a distraction-free reader.
                </p>
                <br />
            </blockquote>
            <hr />
            {/* END GOAL / OBJECTIVES */}
            <h2 id="end-goal">Objectives &amp; outcomes</h2>
            <p>
                The skimreader.ai build was focused on the end of the data integration tunnel. It didn't require much
                integration or modelling to develop, but rather the work was focused on how a novel AI system could
                interact with written data to provide something useful.
            </p>
            <p>
                <strong>Key outcomes targeted:</strong>
            </p>
            <ul>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    “Summarise while you read” flow with page-level concepts, questions and quick reviews.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    A study model based on the SQ3R education model with live generated quizzes to reinforce recall;
                    optional text-to-speech mode.
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    Frictionless export of highlights/notes (Markdown) and simple onboarding (email or Google sign-in).
                </li>
            </ul>
            <hr />
            {/* YOUR OPTIONS / CONTEXT & CONSTRAINTS */}
            <h2 id="your-options">Context, constraints &amp; success criteria</h2>
            <p>
                Content varies widely (scanned PDFs, academic PDFs with math, long HTML articles). Constraints included
                maintaining low latency for page-level analysis, grounding summaries to avoid hallucination, predictable
                operating cost per page, and accessibility for neurodiverse users (short chunks, quiz cadence, optional
                audio).
            </p>
            <p>
                Building an entirely original model for interacting with AI. Typically we interact with AI in the form
                of a chatbot, but for this project we needed to build a custom model that was tailored to be interacted
                with as if it were a page on a book.
            </p>
            {/* OPTIONAL VISUAL SLOT — now “zoomed out” via CSS only for this post */}
            {/* <div className="mt-6 flex justify-center">
                <div className="relative aspect-[16/9] w-full max-w-3xl rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 shadow-xl ring-1 ring-black/5 dark:border-slate-700/60 dark:from-slate-900 dark:to-slate-900/60">
                    <div className="absolute inset-x-0 top-0 hidden h-9 items-center gap-2 border-b border-slate-200/70 bg-white/80 px-3 backdrop-blur sm:flex dark:bg-slate-900/60">
                        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                        <span className="ml-2 text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
                            skimreader.ai
                        </span>
                    </div>
                    <div className="absolute inset-0 p-2 pt-10 sm:p-3">
                        <div className="relative h-full w-full overflow-hidden rounded-xl">
                            <Image
                                src="/images/caseStudies/skimimage.png"
                                alt="Skimreader.ai screenshot"
                                fill
                                sizes="(min-width:1024px) 768px, (min-width:768px) 720px, 92vw"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div> */}
            {/* </div>{" "} */}
            {/* APPROACH OVERVIEW */}
            <h3 className="mt-8 text-xl font-semibold">Approach</h3>
            <p className="mt-2">
                <strong>Engagement model</strong>
                <br />
                <em>Discovery with students/researchers → architecture &amp; prototypes → guided delivery.</em>
            </p>
            <p>
                We mapped study behaviours (skim → deep-read → review) and built a thin slice: PDF/HTML ingestion →
                layout-aware chunking → page-level concept extraction → SQ3R-style questions → notes export. We added an
                evaluation harness for grounding and latency and iterated UI patterns (inline quiz, highlights, and
                “explain like I’m 5” toggles) to keep the reader focused.
            </p>
            <ul>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    Automate data-to-insight at the page level: reproducible pipelines and consistent prompts per
                    content type (PDF vs HTML).
                </li>
                <li>
                    <span role="img" aria-label="bullet point" className="mr-2">
                        •
                    </span>
                    Ssearch across the open doc + prior notes, with citations back to the page/section.
                </li>
            </ul>
            {/* WORKSTREAMS / PHASES */}
            <h3 className="mt-6 text-xl font-semibold">Build &amp; phases</h3>
            <p>Three concurrent tracks produced quick wins while laying a scalable foundation.</p>
            <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-semibold">Discovery</h4>
                    <p className="opacity-80">User research, content inventory, grounding &amp; latency targets.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Identify primary content types (textbooks, research PDFs, long-form articles).</li>
                        <li>Define evaluation criteria (precision, recall, grounding, latency, cost).</li>
                        <li>Baseline parsing quality: headings, figures, math, footnotes.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Design</h4>
                    <p className="opacity-80">Reader architecture and study model.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Layout-aware chunking; embeddings for context windows; prompt contracts per page type.</li>
                        <li>SQ3R interaction model: survey prompts, page questions, periodic quick reviews.</li>
                        <li>Governance: RBAC for saved docs, testing, lineage of generated notes.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Delivery</h4>
                    <p className="opacity-80">Ship the thin slice, then scale by template.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Priority features: summaries, quizzes, highlights, Markdown export, Google sign-in.</li>
                        <li>Performance budget per page; streaming responses for perceived speed.</li>
                        <li>Human-in-the-loop: quick “fix/cite” actions to correct or ground outputs.</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold">Iteration</h4>
                    <p className="opacity-80">Scale to more sources and modes.</p>
                    <ul className="list-inside list-disc space-y-1">
                        <li>Richer PDF heuristics; web article readability; mobile-first interactions.</li>
                        <li>Prompt library versioning; red-team evaluation; notes export integrations.</li>
                        <li>Text-to-speech mode and spaced-repetition review sets.</li>
                    </ul>
                </div>
            </div>
            <p>
                <strong>Selected results</strong>
            </p>
            <ul className="list-disc pl-6">
                <li>Inline summaries and quizzes reduce context-switching; students stay in the reader.</li>
                <li>Markdown exports plug into Notion/Obsidian; research notes stay portable.</li>
                <li>Users can semantically search within the active document and their saved notes with citations.</li>
                <li>Support for large PDFs with predictable per-page latency and cost controls.</li>
            </ul>
            <hr className="my-6" />
            {/* SOLUTION / ARCHITECTURE SUMMARY */}
            <h3 className="text-xl font-semibold">Solution overview</h3>
            <p className="mt-2">
                <strong>Reader platform.</strong> Web app as the system of study; ingestion for PDFs/HTML; layout-aware
                parsing; automated tests; latency/cost monitors. A governed semantic layer indexes pages, notes and
                citations for retrieval.
            </p>
            <p>
                <strong>AI-enhanced learning.</strong>
                page-level question generation aligned to SQ3R; templated summaries with links back to page locations.
            </p>
            <p>
                <strong>Custom dashboard.</strong> Role-based access control (RBAC) ensures each user only sees their
                documents and notes. Built with Next.js, the app is fast, secure, and includes a custom library section
                for storage of books and quizzes.
            </p>
            <h4 className="mt-4 font-semibold">Notable benefits</h4>
            <p>What this means for students &amp; researchers:</p>
            <ul className="list-disc pl-6">
                <li>
                    <strong>Trustworthy learning:</strong> summaries cite sections; questions tie back to the page.
                </li>
                <li>
                    <strong>Faster comprehension:</strong> key concepts are extracted as you read, not after.
                </li>
                <li>
                    <strong>Explainable AI:</strong> every answer can be traced to a page span with controls to refine.
                </li>
                <li>
                    <strong>Consistency:</strong> a shared study model (SQ3R) across textbooks and articles.
                </li>
                <li>
                    <strong>Accessibility:</strong> short chunks, quiz cadence; optional text-to-speech “listen” mode.
                </li>
                <li>
                    <strong>Portability:</strong> Markdown exports drop into your note system.
                </li>
            </ul>
            <p>
                <em>AI is an accelerant, not a substitute.</em> Skimreader keeps you in the loop — seeing more, sooner,
                with evidence at every step.
            </p>
            <p>The Kali Software team</p>
        </div>
    );
}
