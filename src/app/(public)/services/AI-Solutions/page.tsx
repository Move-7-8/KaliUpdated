// src/app/services/AI-Solutions/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import OurClients from "../../about/components/OurClients";
import { Footer } from "../../landing/components/Footer";
import AISolutions from "./components/AISolutions";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICE_PATH = "/services/AI-Solutions";
const SERVICE_URL = `${SITE_URL}${SERVICE_PATH}`;
const ORG_ID = `${SITE_URL}/#organization`;

const OG_IMAGE = `${SITE_URL}/images/og/image.png`;

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "AI Solutions (Australia): Multi-Agent Systems, RAG & LLM Integration",
    description:
        "Enterprise AI that works—multi-agent orchestration, RAG & semantic search, LLM integration, and evaluation frameworks for Australian businesses.",
    alternates: { canonical: SERVICE_URL },
    openGraph: {
        title: "AI Solutions (Australia): Multi-Agent Systems, RAG & LLM Integration",
        description:
            "Enterprise AI that works—multi-agent orchestration, RAG & semantic search, LLM integration, and evaluation frameworks for Australian businesses.",
        url: SERVICE_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "AI Solutions for Australian businesses",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Solutions (Australia): Multi-Agent Systems, RAG & LLM Integration",
        description:
            "Enterprise AI that works—multi-agent orchestration, RAG & semantic search, LLM integration, and evaluation frameworks for Australian businesses.",
        images: [OG_IMAGE],
    },
};

export const revalidate = 86400;

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_URL + "#service",
    name: "AI Solutions (Australia)",
    serviceType: "Artificial Intelligence Development",
    url: SERVICE_URL,
    description:
        "Build production-ready AI systems including multi-agent orchestration, RAG pipelines, LLM integration, and evaluation frameworks for Australian businesses.",
    areaServed: { "@type": "Country", name: "AU" },
    audience: { "@type": "BusinessAudience", name: "Australian product & enterprise teams" },
    provider: { "@id": ORG_ID },
    offers: {
        "@type": "Offer",
        priceCurrency: "AUD",
        price: "15000",
        url: SERVICE_URL,
        availability: "https://schema.org/InStock",
    },
};

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What AI services do you offer?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We build multi-agent systems, RAG pipelines with semantic search, LLM integration and deployment, and evaluation frameworks with guardrails for safe, reliable AI.",
            },
        },
        {
            "@type": "Question",
            name: "What is RAG and how can it help my business?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "RAG (Retrieval-Augmented Generation) connects LLMs to your private data—documents, databases, or APIs—so AI can answer questions grounded in your specific context with citations.",
            },
        },
        {
            "@type": "Question",
            name: "How do you ensure AI systems are safe?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We implement guardrails, automated evaluation suites, human-in-the-loop review for sensitive actions, and observability to monitor outputs, latency, and costs in production.",
            },
        },
        {
            "@type": "Question",
            name: "Can you integrate AI with our existing systems?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We connect AI pipelines to your CRMs, databases, APIs, and internal tools with proper auth, error handling, and audit trails.",
            },
        },
        {
            "@type": "Question",
            name: "How long does an AI project typically take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Timelines vary by complexity. A focused proof-of-concept can be delivered quickly, while production systems with full evaluation and integration take longer. We scope each project individually.",
            },
        },
    ],
};

export default function AISolutionsPage() {
    return (
        <>
            <Script
                id="ld-service"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <Script
                id="ld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />

            <div className="bg-base-200">
                <AISolutions />
                <div className="mx-auto max-w-10/12">
                    <OurClients />
                </div>
            </div>

            <Footer />
        </>
    );
}
