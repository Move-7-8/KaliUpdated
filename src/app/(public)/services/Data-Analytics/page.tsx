// src/app/services/data-analytics/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import OurClients from "../../about/components/OurClients";
import { Footer } from "../../landing/components/Footer";
import { Topbar } from "../../landing/components/Topbar";
import DataAnalytics from "./components/DataAnalytics";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICE_PATH = "/services/data-analytics";
const SERVICE_URL = `${SITE_URL}${SERVICE_PATH}`;
const ORG_ID = `${SITE_URL}/#organization`;

// Use a 1200×630 image. Place this file in your repo and update the path if needed.
const OG_IMAGE = `${SITE_URL}/images/og/image.png`;

export const metadata: Metadata = {
    // Ensures relative URLs (e.g., in images) resolve correctly.
    metadataBase: new URL(SITE_URL),

    title: "Data Analytics (Australia): KPI Models, Dashboards & Decision Support",
    description:
        "Data analytics for Australian SMEs—define KPIs, build a semantic layer, and deliver reliable dashboards and decision support across the business.",
    alternates: {
        canonical: SERVICE_URL,
    },

    // --- Open Graph (Facebook/LinkedIn/Slack/etc.)
    openGraph: {
        title: "Data Analytics (Australia): KPI Models, Dashboards & Decision Support",
        description:
            "Data analytics for Australian SMEs—define KPIs, build a semantic layer, and deliver reliable dashboards and decision support across the business.",
        url: SERVICE_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: OG_IMAGE, // absolute URL recommended
                width: 1200,
                height: 630,
                alt: "Reliable KPI models and dashboards for Australian SMEs",
                type: "image/png",
            },
        ],
    },

    // --- Twitter cards
    twitter: {
        card: "summary_large_image",
        title: "Data Analytics (Australia): KPI Models, Dashboards & Decision Support",
        description:
            "Data analytics for Australian SMEs—define KPIs, build a semantic layer, and deliver reliable dashboards and decision support across the business.",
        // site: "@yourhandle",
        // creator: "@yourhandle",
        images: [OG_IMAGE],
    },
};

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_URL + "#service",
    name: "Data Analytics (Australia)",
    serviceType: "Data Analytics",
    url: SERVICE_URL,
    description:
        "Design KPI definitions, model metrics in a semantic layer, and deliver fast, trustworthy dashboards and decision support for go-to-market, finance, and operations.",
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
            name: "How long does a typical analytics engagement take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most projects ship in 4–6 weeks: discovery, KPI design, prototype dashboards, testing, then rolling out live. Further domains and metrics are faster once the semantic layer is in place.",
            },
        },
        {
            "@type": "Question",
            name: "Which BI tools and platforms do you support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We work with Looker/Looker Studio, Power BI, Metabase, and Superset. We also model metrics with dbt/semantic layers and support common warehouses.",
            },
        },
        {
            "@type": "Question",
            name: "Can you build a governed metric layer so KPIs are consistent?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We define KPIs once and expose them consistently across dashboards and teams. Changes are versioned and rolled out safely.",
            },
        },
        {
            "@type": "Question",
            name: "How do you handle data freshness and quality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We set freshness targets, add tests for nulls and referential integrity, and surface data-status in dashboards so users trust the numbers.",
            },
        },
        {
            "@type": "Question",
            name: "What happens when a source or metric changes?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We manage drift with versioned models, clearly communicated changes, and checks to ensure downstream consumers don’t break unexpectedly.",
            },
        },
    ],
};

export default function DataAnalyticsPage() {
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
                <DataAnalytics />
                <div className="mx-auto max-w-10/12">
                    <OurClients />
                </div>
            </div>
            <Footer />
        </>
    );
}
