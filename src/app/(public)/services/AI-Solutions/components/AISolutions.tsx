"use client";

import { useCallback } from "react";

export default function AISolutions() {
    const openContact = useCallback((detail?: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new CustomEvent("open-contact", { detail }));
    }, []);

    return (
        <main className="bg-base-200 text-base-content">
            <section className="mx-auto w-11/12 max-w-7xl px-4 pt-10 pb-16 md:w-10/12 md:px-6 lg:px-8">
                <header className="bg-primary text-primary-content relative overflow-hidden rounded-2xl border-2 border-black shadow">
                    <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,_white_1px,_transparent_1px)] [background-size:16px_16px] opacity-10" />
                    <div className="relative p-6 md:p-10">
                        <span className="badge badge-ghost badge-lg border-2 border-black">AI Solutions</span>
                        <h1 className="font-ocr mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                            Enterprise AI That Works
                        </h1>

                        <div className="mt-3 max-w-3xl rounded-xl p-4 text-base md:text-lg">
                            <p>
                                <strong>Production-ready AI</strong> that goes beyond prototypes—multi-agent systems,
                                RAG pipelines, and LLM integration built for reliability, observability, and real
                                business value.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="bg-base-300 blog text-secondary-content mx-auto mt-6 rounded-2xl border-2 border-black p-6 font-sans shadow md:p-8">
                    <div className="text-base-content mx-auto max-w-5xl space-y-5 md:text-lg">
                        <p>Move from AI experiments to production systems your team can trust.</p>
                        <p>
                            We design AI architectures that handle real-world complexity—orchestrating multiple agents,
                            grounding outputs in your data, and building evaluation frameworks so you know when things
                            work and when they don't.
                        </p>

                        <p className="mt-6">
                            Most AI projects stall between prototype and production.{" "}
                            <strong>Common challenges include:</strong>
                        </p>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                            <div className="space-y-4 md:col-span-7">
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Demos that impress but fail on edge cases and real data.</li>
                                    <li>Hallucinations and incorrect outputs with no way to detect them.</li>
                                    <li>No observability—latency, costs, and errors are invisible.</li>
                                    <li>Prompts that break when models update or context changes.</li>
                                    <li>Security gaps: prompt injection, data leakage, unsafe tool calls.</li>
                                </ul>
                            </div>

                            <figure className="self-start md:col-span-5 md:justify-self-end">
                                <img
                                    src="/images/caseStudies/dfcrc.png"
                                    alt="Multi-agent AI system architecture diagram"
                                    loading="lazy"
                                    className="bg-base-100 w-full max-w-sm rounded-xl border-2 border-black md:ml-auto md:max-w-[420px]"
                                />
                                <figcaption className="text-base-content/80 mt-2 text-sm">
                                    A multi-agent research system built for DFCRC.
                                </figcaption>
                            </figure>
                        </div>

                        {/* Service categories */}
                        <div id="services" className="mt-10 md:mt-12">
                            <h2 className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                AI capabilities we deliver
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full" />
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">Multi-Agent Systems</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Orchestrate specialised agents for complex workflows.</li>
                                            <li>Supervisor, pipeline, and parallel agent patterns.</li>
                                            <li>Built with LangGraph, CrewAI, or custom frameworks.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">RAG & Semantic Search</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Ground LLM outputs in your private documents and data.</li>
                                            <li>Vector databases with hybrid search and reranking.</li>
                                            <li>Citation tracking and source attribution.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">LLM Integration & Deployment</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Model selection, prompt engineering, and context management.</li>
                                            <li>Streaming, caching, and cost optimisation.</li>
                                            <li>Self-hosted or cloud deployment with fallbacks.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card bg-base-100 border border-black">
                                    <div className="card-body">
                                        <h3 className="card-title font-ocr text-base">Evaluation & Guardrails</h3>
                                        <ul className="list-disc pl-5 text-sm md:text-base">
                                            <li>Automated eval suites to catch regressions.</li>
                                            <li>Input/output guardrails and content filtering.</li>
                                            <li>Human-in-the-loop review for sensitive actions.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What's included */}
                        <div className="mt-8 md:mt-10">
                            <h2
                                id="whats-included"
                                className="font-ocr text-base-content mt-2 text-xl leading-tight tracking-tight md:text-3xl">
                                AI projects — what's included
                            </h2>
                            <div className="bg-base-content/20 mt-2 h-1 w-16 rounded-full"></div>
                        </div>

                        <p>
                            We start with discovery: understanding your use case, data sources, success criteria, and
                            risks. Then we design the architecture, build a working prototype, iterate based on
                            evaluation results, and harden for production.
                        </p>

                        <p>
                            That includes agent design and orchestration, data pipelines and vector stores, prompt
                            engineering and context management, evaluation frameworks, observability and monitoring,
                            security review, and documentation for your team.
                        </p>

                        <p>
                            <strong>The result:</strong> AI systems that work reliably, explain their reasoning, and
                            integrate cleanly with your existing tools.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {[
                                ["Production-ready", "Beyond demos—systems that handle edge cases and scale."],
                                ["Explainable", "Traceable reasoning, citations, and audit trails."],
                                ["Integrated", "Clean connections to your data, APIs, and workflows."],
                            ].map(([title, body]) => (
                                <div key={title} className="card bg-base-100 border border-black shadow-sm">
                                    <div className="card-body text-base-content">
                                        <h3 className="card-title font-ocr text-base">{title}</h3>
                                        <p className="text-sm opacity-90">{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How we deliver */}
                    <div className="mx-auto mt-12 max-w-6xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl md:text-2xl">How we deliver</h2>
                        <div className="prose text-base-content/90 max-w-none">
                            <p>
                                We begin with discovery—understanding your use case, data landscape, and what success
                                looks like. The output is a clear problem statement, architecture diagram, and
                                evaluation criteria.
                            </p>
                            <p>
                                Next, we design the AI system: agent roles and interactions, data pipelines, prompt
                                structures, and integration points. We validate the architecture against your edge cases
                                before building.
                            </p>
                            <p>
                                We then build iteratively: starting with the core pipeline, adding agents and tools,
                                instrumenting for observability, and running evaluation suites to catch issues early.
                            </p>
                            <p>
                                Before production, we harden with security review (prompt injection, data leakage),
                                guardrails, fallback handling, and load testing. We set up monitoring for latency,
                                costs, and output quality.
                            </p>
                            <p>
                                Finally, we deploy with clear documentation, runbooks, and training. Post-launch, we
                                help you iterate based on real usage patterns and evolving requirements.
                            </p>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="mx-auto mt-10 max-w-5xl">
                        <h2 className="font-ocr text-base-content mb-3 text-xl">Frequently Asked Questions</h2>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">What AI services do you offer?</div>
                            <div className="collapse-content text-sm md:text-base">
                                We build multi-agent systems, RAG pipelines with semantic search, LLM integration and
                                deployment, and evaluation frameworks with guardrails. We focus on production-ready AI
                                that works reliably, not just impressive demos.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                What is RAG and how can it help my business?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                RAG (Retrieval-Augmented Generation) connects LLMs to your private data—documents,
                                databases, or APIs—so AI can answer questions grounded in your specific context. This
                                reduces hallucinations and enables accurate, citable responses about your business.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                How do you ensure AI systems are safe?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We implement multiple layers: input validation and guardrails, output filtering,
                                automated evaluation suites, human-in-the-loop review for sensitive actions, and
                                comprehensive observability. We also test for prompt injection and data leakage
                                vulnerabilities.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                When should I use multi-agent systems vs a single agent?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Single agents work well for focused tasks with clear inputs and outputs. Multi-agent
                                systems shine when you need specialised reasoning (research + analysis + validation),
                                parallel processing, or complex workflows with multiple decision points.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                Can you integrate AI with our existing systems?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                Yes. We connect AI pipelines to your CRMs, databases, APIs, and internal tools. We
                                handle auth, error handling, rate limiting, and audit trails to ensure reliable,
                                secure integrations.
                            </div>
                        </div>

                        <div className="collapse-arrow bg-base-100 text-base-content collapse mt-3 border border-black">
                            <input type="checkbox" />
                            <div className="collapse-title text-base font-medium">
                                What does AI observability include?
                            </div>
                            <div className="collapse-content text-sm md:text-base">
                                We instrument pipelines to track latency, token usage, costs, error rates, and output
                                quality metrics. This includes tracing through multi-step pipelines, logging inputs and
                                outputs for debugging, and alerting on anomalies.
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                openContact({
                                    initial: {
                                        message:
                                            "AI Solutions — interested in discussing a project. Context: use case, current state, goals.",
                                    },
                                })
                            }
                            className="btn btn-secondary cursor-pointer border-2 border-black font-semibold">
                            Discuss a project
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
