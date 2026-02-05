// src/app/services/data-integration/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import OurClients from "../../about/components/OurClients";
import { Footer } from "../../landing/components/Footer";
import { Topbar } from "../../landing/components/Topbar";
import DataIntegration from "./components/DataIntegration";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICE_PATH = "/services/data-integration";
const SERVICE_URL = `${SITE_URL}${SERVICE_PATH}`;
const ORG_ID = `${SITE_URL}/#organization`;

// Use a 1200×630 image. Place this file in your repo and update the path if needed.
const OG_IMAGE = `${SITE_URL}/images/og/image.png`;

export const metadata: Metadata = {
    // Ensures relative URLs (e.g., in images) resolve correctly.
    metadataBase: new URL(SITE_URL),

    title: "Data Integration (Australia): ODS, ELT Pipelines & Trusted Analytics",
    description:
        "Data integration for Australian SMEs—stand up an Operational Data Store, build reliable ELT pipelines, and sync clean data to your CRM, finance, and BI tools.",
    alternates: {
        canonical: SERVICE_URL,
    },

    // --- Open Graph (Facebook/LinkedIn/Slack/etc.)
    openGraph: {
        title: "Data Integration (Australia): ODS, ELT Pipelines & Trusted Analytics",
        description:
            "Data integration for Australian SMEs—stand up an Operational Data Store, build reliable ELT pipelines, and sync clean data to your CRM, finance, and BI tools.",
        url: SERVICE_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: OG_IMAGE, // absolute URL recommended
                width: 1200,
                height: 630,
                alt: "Operational Data Store & ELT pipelines for Australian SMEs",
                type: "image/png",
            },
        ],
    },

    // --- Twitter cards
    twitter: {
        card: "summary_large_image",
        title: "Data Integration (Australia): ODS, ELT Pipelines & Trusted Analytics",
        description:
            "Data integration for Australian SMEs—stand up an Operational Data Store, build reliable ELT pipelines, and sync clean data to your CRM, finance, and BI tools.",
        // If you have a Twitter handle, you can add:
        // site: "@yourhandle",
        // creator: "@yourhandle",
        images: [OG_IMAGE], // can be absolute or relative when metadataBase is set
    },
};

export const revalidate = 86400;

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_URL + "#service",
    name: "Data Integration (Australia)",
    serviceType: "Data Integration",
    url: SERVICE_URL,
    description:
        "Design and implement an Operational Data Store (ODS) with reliable ELT pipelines to unify SaaS and database sources, ensure data quality, and publish trusted datasets to downstream systems.",
    areaServed: { "@type": "Country", name: "AU" },
    audience: { "@type": "BusinessAudience", name: "Australian SMEs" },
    provider: { "@id": ORG_ID },
    offers: {
        "@type": "Offer",
        priceCurrency: "AUD",
        price: "10000",
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
            name: "How long does a typical data integration take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most projects ship in 4–6 weeks: discovery, prototype, testing, then rolling out live. Subsequent sources and models go faster once the ODS and patterns are in place.",
            },
        },
        {
            "@type": "Question",
            name: "What tools and platforms do you support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We integrate SaaS apps and databases into an ODS/warehouse and can work with tools such as Airbyte/Fivetran, dbt, and orchestrators. We also build bespoke connectors for edge cases.",
            },
        },
        {
            "@type": "Question",
            name: "Can you push curated data back into my operational tools?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We publish modeled, trusted data back to CRMs, finance systems, and other apps with idempotent writes, retries, and auditing so teams get consistent, current information.",
            },
        },
        {
            "@type": "Question",
            name: "How do you handle data quality and schema changes?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We validate inputs, track lineage, and add tests/alerts for freshness and nulls. Schema drift is managed via versioned models and guarded rollouts to avoid breaking downstream consumers.",
            },
        },
        {
            "@type": "Question",
            name: "What happens if a sync fails or data changes mid-run?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The ODS keeps state and every write is auditable. We retry safely without duplicates and surface human-readable errors, with runbooks for remediation.",
            },
        },
    ],
};

export default function DataIntegrationPage() {
    return (
        <>
            {/* Structured data */}
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

            {/* <Topbar /> */}
            <div className="bg-base-200">
                <DataIntegration />
                <div className="mx-auto max-w-10/12">
                    <OurClients />
                </div>
            </div>
            <Footer />
        </>
    );
}
