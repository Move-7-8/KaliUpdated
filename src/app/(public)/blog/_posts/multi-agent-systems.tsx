// src/app/blog/_posts/multi-agent-systems.tsx
import Link from "next/link";

export const frontmatter = {
    title: "Multi-Agent AI Systems: When and How to Use Them",
    description:
        "A practical guide to multi-agent AI—when they make sense, how they work, and lessons from building them.",
    date: "2026-02-05",
    readingTime: "8 min",
    canonical: "https://www.kalisoftware.io/blog/multi-agent-systems",
    postType: "guide" as const,
    cardImage: "/images/caseStudies/dfcrc.png",
    cardImageAlt: "Multi-agent AI system architecture",
    author: {
        name: "Connor L",
        image: "/images/blogs/connor_lane.png",
    },
};

export default function Post() {
    return (
        <div className="blog-content">
            <blockquote>
                <p>
                    Multi-agent AI systems are one of the most powerful patterns for complex tasks—but they're also one
                    of the most over-applied. This guide covers when multi-agent architectures make sense, how to
                    implement them, and lessons learned from building them in production.
                </p>
            </blockquote>

            <hr />

            <h2 id="what-are-multi-agent-systems">What are multi-agent systems?</h2>
            <p>
                A multi-agent system uses multiple AI "agents" that each have specialised roles, tools, and
                responsibilities. Instead of one monolithic prompt trying to do everything, you decompose the problem
                into discrete steps handled by purpose-built agents.
            </p>
            <p>
                Each agent typically has its own system prompt defining its role, access to specific tools (APIs,
                databases, search), and a focused objective. An orchestrator coordinates the agents—routing tasks,
                managing state, and combining outputs.
            </p>
            <p>
                <strong>Key components:</strong>
            </p>
            <ul>
                <li>
                    <strong>Agents</strong> — Specialised LLM instances with defined roles and tool access.
                </li>
                <li>
                    <strong>Orchestrator</strong> — Coordinates agent execution, manages state, routes information.
                </li>
                <li>
                    <strong>Shared state</strong> — Context and intermediate results passed between agents.
                </li>
                <li>
                    <strong>Tools</strong> — APIs, databases, search, code execution that agents can invoke.
                </li>
            </ul>

            <hr />

            <h2 id="single-vs-multi-agent">Single agent vs multi-agent: when to use each</h2>
            <p>
                The default should be a single agent. Multi-agent systems add complexity—more prompts to maintain, more
                failure modes, higher costs, and harder debugging. Only reach for multi-agent when single-agent
                approaches hit real limitations.
            </p>

            <h3 className="mt-6 text-xl font-semibold">Use a single agent when:</h3>
            <ul>
                <li>The task has clear, linear steps.</li>
                <li>One persona/expertise is sufficient.</li>
                <li>You can fit necessary context in one prompt.</li>
                <li>Simple tool use (search, calculate, lookup).</li>
                <li>Latency matters more than thoroughness.</li>
            </ul>
            <p>
                <em>Examples:</em> Customer support Q&A, document summarisation, code explanation, simple data lookups.
            </p>

            <h3 className="mt-6 text-xl font-semibold">Use multi-agent when:</h3>
            <ul>
                <li>Different steps require genuinely different expertise or reasoning styles.</li>
                <li>You need adversarial validation (one agent checks another's work).</li>
                <li>Parallel processing would significantly speed up the task.</li>
                <li>The task involves research → analysis → synthesis as distinct phases.</li>
                <li>You want to isolate failures—one agent failing shouldn't crash everything.</li>
            </ul>
            <p>
                <em>Examples:</em> Complex research reports, code review with multiple perspectives, financial analysis
                with validation, multi-step planning with execution.
            </p>

            <hr />

            <h2 id="case-study">Case study: DFCRC research system</h2>
            <p>
                We built a multi-agent system for the{" "}
                <Link href="/blog/dfcrc-case-study" className="link">
                    Digital Finance Cooperative Research Centre
                </Link>{" "}
                to analyse financial data and generate research reports. The system needed to integrate diverse data
                sources, apply domain expertise, and produce auditable outputs.
            </p>

            <p>
                <strong>Why multi-agent?</strong> A single prompt couldn't handle the breadth: searching documents,
                querying databases, applying financial reasoning, and validating conclusions required different tools
                and reasoning patterns. We also needed validation—having one agent check another's analysis caught
                errors that single-pass approaches missed.
            </p>

            <h3 className="mt-6 text-xl font-semibold">Agent roles</h3>
            <ul>
                <li>
                    <strong>Research Agent</strong> — Searches documents, retrieves relevant context, summarises
                    findings.
                </li>
                <li>
                    <strong>Analysis Agent</strong> — Applies financial reasoning, identifies patterns, generates
                    insights.
                </li>
                <li>
                    <strong>Validation Agent</strong> — Checks claims against sources, flags inconsistencies, verifies
                    calculations.
                </li>
                <li>
                    <strong>Synthesis Agent</strong> — Combines validated insights into coherent reports with citations.
                </li>
            </ul>

            <p>
                The orchestrator routed tasks sequentially (research → analysis → validation → synthesis), with the
                validation agent able to send work back for revision. This created natural checkpoints and audit trails.
            </p>

            <hr />

            <h2 id="implementation-patterns">Implementation patterns</h2>
            <p>There are several common patterns for structuring multi-agent systems. Choose based on your task.</p>

            <h3 className="mt-6 text-xl font-semibold">Supervisor pattern</h3>
            <p>
                A central supervisor agent decides which worker agent to invoke next. Good for tasks where the path
                isn't predetermined—the supervisor adapts based on intermediate results.
            </p>
            <ul>
                <li>
                    <strong>Pros:</strong> Flexible, handles branching logic, can recover from failures.
                </li>
                <li>
                    <strong>Cons:</strong> Supervisor becomes a bottleneck, harder to parallelise.
                </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold">Pipeline pattern</h3>
            <p>
                Agents execute in a fixed sequence: Agent A → Agent B → Agent C. Each agent transforms the output of the
                previous. Simple and predictable.
            </p>
            <ul>
                <li>
                    <strong>Pros:</strong> Easy to debug, clear data flow, straightforward to implement.
                </li>
                <li>
                    <strong>Cons:</strong> Rigid, can't adapt to edge cases mid-flow.
                </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold">Parallel pattern</h3>
            <p>
                Multiple agents work simultaneously on different aspects, then results are merged. Great for tasks that
                decompose into independent subtasks.
            </p>
            <ul>
                <li>
                    <strong>Pros:</strong> Fast, scales well, isolates failures.
                </li>
                <li>
                    <strong>Cons:</strong> Merging results can be tricky, harder to maintain coherence.
                </li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold">Debate pattern</h3>
            <p>
                Two or more agents take opposing perspectives and argue. Useful for decisions requiring balanced
                consideration of trade-offs.
            </p>
            <ul>
                <li>
                    <strong>Pros:</strong> Surfaces counterarguments, reduces bias, improves decision quality.
                </li>
                <li>
                    <strong>Cons:</strong> Expensive (multiple full reasoning passes), can be slow.
                </li>
            </ul>

            <hr />

            <h2 id="lessons-learned">Lessons learned</h2>
            <p>After building several multi-agent systems, here's what we've learned:</p>

            <h3 className="mt-6 text-xl font-semibold">1. Start with a single agent, then split</h3>
            <p>
                Build the single-agent version first. Run it on real examples. Only split into multiple agents when you
                can point to specific failures that decomposition would solve. Premature multi-agent design wastes time.
            </p>

            <h3 className="mt-6 text-xl font-semibold">2. Evaluate each agent independently</h3>
            <p>
                Don't just evaluate the final output. Build test cases for each agent's specific task. If the research
                agent can't find relevant documents, no amount of downstream processing will save you.
            </p>

            <h3 className="mt-6 text-xl font-semibold">3. State management is critical</h3>
            <p>
                Define exactly what state passes between agents. Keep it minimal and structured. Unstructured "context
                blobs" lead to confusion and errors. Use schemas.
            </p>

            <h3 className="mt-6 text-xl font-semibold">4. Watch the costs</h3>
            <p>
                Multi-agent systems multiply token usage. A 4-agent pipeline might cost 4-10x a single agent. Profile
                costs early. Consider caching intermediate results, using smaller models for simpler agents, and
                short-circuiting when possible.
            </p>

            <h3 className="mt-6 text-xl font-semibold">5. Observability is non-negotiable</h3>
            <p>
                Log every agent invocation: inputs, outputs, latency, tokens, tool calls. When something goes wrong (it
                will), you need to trace exactly what happened. Tools like LangSmith, Phoenix, or custom logging are
                essential.
            </p>

            <h3 className="mt-6 text-xl font-semibold">6. Handle failures gracefully</h3>
            <p>
                What happens when one agent fails? Have fallbacks: retry with different prompts, use a simpler model,
                return partial results, or escalate to human review. Don't let one failure cascade into complete system
                failure.
            </p>

            <hr />

            <h2 id="getting-started">Getting started checklist</h2>
            <p>If you're considering a multi-agent system:</p>
            <ul>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Can you articulate why single-agent won't work?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Have you defined clear, distinct roles for each agent?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Is the state schema between agents well-defined?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Do you have evaluation criteria for each agent?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Have you estimated costs and latency?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Is observability set up from day one?
                </li>
                <li>
                    <input type="checkbox" className="mr-2" disabled />
                    Do you have a fallback strategy for failures?
                </li>
            </ul>

            <hr />

            <h2 id="tools-and-frameworks">Tools and frameworks</h2>
            <p>
                We typically use <strong>LangGraph</strong> for complex orchestration—it handles state management,
                conditional routing, and cycles well. For simpler pipelines, <strong>LangChain</strong> or even plain
                Python with structured prompts works fine.
            </p>
            <p>Other options worth considering:</p>
            <ul>
                <li>
                    <strong>CrewAI</strong> — Good for role-based agent teams with built-in delegation.
                </li>
                <li>
                    <strong>AutoGen</strong> — Microsoft's framework for conversational agents.
                </li>
                <li>
                    <strong>Custom</strong> — Sometimes the simplest approach is just functions calling LLMs with good
                    logging.
                </li>
            </ul>

            <hr />

            <h2 id="conclusion">Conclusion</h2>
            <p>
                Multi-agent systems are powerful when applied to the right problems—complex tasks that benefit from
                specialised reasoning, validation, or parallelisation. But they come with real costs: complexity,
                latency, and dollars.
            </p>
            <p>
                Start simple. Split when you have evidence it helps. Evaluate each piece. Instrument everything. With
                that approach, multi-agent architectures can handle problems that single agents can't touch.
            </p>

            <p className="mt-8">— The Kali Software team</p>
        </div>
    );
}
