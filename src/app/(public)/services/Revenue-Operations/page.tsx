// src/app/services/revenue-operations/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import OurClients from "../../about/components/OurClients";
import { Footer } from "../../landing/components/Footer";
import RevenueOperations from "./components/RevenueOperations";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICE_PATH = "/services/revenue-operations";
const SERVICE_URL = `${SITE_URL}${SERVICE_PATH}`;
const ORG_ID = `${SITE_URL}/#organization`;

// Use a 1200×630 image. Place this file in your repo and update the path if needed.
const OG_IMAGE = `${SITE_URL}/images/og/image.png`;

export const metadata: Metadata = {
    // Ensures relative URLs (e.g., in images) resolve correctly.
    metadataBase: new URL(SITE_URL),

    title: "Revenue Operations / CRM (Australia): Lifecycle, Integrations & Reporting",
    description:
        "RevOps & CRM consulting for Australian teams—align lifecycle and funnel, implement integrations, clean data, and deliver reliable pipeline & retention reporting.",
    alternates: {
        canonical: SERVICE_URL,
    },

    // --- Open Graph (Facebook/LinkedIn/Slack/etc.)
    openGraph: {
        title: "Revenue Operations / CRM (Australia): Lifecycle, Integrations & Reporting",
        description:
            "RevOps & CRM consulting for Australian teams—align lifecycle and funnel, implement integrations, clean data, and deliver reliable pipeline & retention reporting.",
        url: SERVICE_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: OG_IMAGE, // absolute URL recommended
                width: 1200,
                height: 630,
                alt: "Revenue Operations & CRM for Australian teams",
                type: "image/png",
            },
        ],
    },

    // --- Twitter cards
    twitter: {
        card: "summary_large_image",
        title: "Revenue Operations / CRM (Australia): Lifecycle, Integrations & Reporting",
        description:
            "RevOps & CRM consulting for Australian teams—align lifecycle and funnel, implement integrations, clean data, and deliver reliable pipeline & retention reporting.",
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
    name: "Revenue Operations / CRM (Australia)",
    serviceType: "Revenue Operations / CRM",
    url: SERVICE_URL,
    description:
        "Design and implement modern RevOps: lifecycle and funnel governance, CRM architecture, integrations across go-to-market tools, data quality, and executive reporting.",
    areaServed: { "@type": "Country", name: "AU" },
    audience: { "@type": "BusinessAudience", name: "Australian B2B teams" },
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
            name: "How long does a typical RevOps engagement take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most projects ship in 4–6 weeks: discovery and audit, prototype in a sandbox, testing, then rolling out live. Ongoing improvements continue once foundations are in place.",
            },
        },
        {
            "@type": "Question",
            name: "Which systems do you support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We work with modern CRMs and GTM stacks, customer success tools, product analytics, and automation platforms. We design integrations via APIs or middleware to keep data consistent.",
            },
        },
        {
            "@type": "Question",
            name: "Can you align lifecycle stages and funnel definitions across teams?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We define shared lifecycle stages and funnel gates across Marketing, Sales and Customer Success, then encode them in CRM properties, workflows and reporting.",
            },
        },
        {
            "@type": "Question",
            name: "How do you manage data quality and governance?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We implement validation, enrichment, deduplication and audit trails. Schema and process changes are versioned, documented and rolled out with checks.",
            },
        },
        {
            "@type": "Question",
            name: "Do you provide training and operating procedures?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We train users, document playbooks and provide runbooks for common tasks so the team can operate confidently day-to-day.",
            },
        },
    ],
};

export default function RevenueOperationsPage() {
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

            <div className="bg-base-200">
                <RevenueOperations />
                <div className="mx-auto max-w-10/12">
                    <OurClients />
                </div>
            </div>

            <Footer />
        </>
    );
}
