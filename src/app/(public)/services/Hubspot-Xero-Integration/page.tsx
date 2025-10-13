// src/app/services/hubspot/xeroIntegration/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "../../landing/components/Footer";
import { Topbar } from "../../landing/components/Topbar";
import XeroIntegration from "./components/XeroIntegration";

export const metadata: Metadata = {
    title: "HubSpot Xero Integration (Australia): GST, Tracking Categories & Deal → Invoice",
    description:
        "HubSpot Xero integration for Australian SMEs—create invoices from deals, map GST & Tracking Categories, and sync payment status to HubSpot.",
    alternates: {
        canonical: "https://www.kalisoftware.io/services/hubspot-xero-integration",
    },
};

const ORG_ID = "https://www.kalisoftware.io/#organization";
const SERVICE_URL = "https://www.kalisoftware.io/services/hubspot-xero-integration";

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_URL + "#service",
    name: "HubSpot Xero Integration (Australia)",
    serviceType: "HubSpot Xero Integration",
    url: SERVICE_URL,
    description:
        "HubSpot Xero integration for Australian SMEs—create invoices from deals, map GST & Tracking Categories, and sync payment status back to HubSpot.",
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
            name: "How long does a typical integration take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most projects ship in 4–6 weeks: discovery, prototype, testing, then rolling out live. Additional integrations can be added faster as the ODS (source of truth database) is already set up.",
            },
        },
        {
            "@type": "Question",
            name: "Do you handle GST, Tracking Categories, and multi-entity?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We map GST (incl./excl.), apply Tracking Categories (e.g., Region/Dept), and support multiple Xero orgs/brands with routing rules in the ODS.",
            },
        },
        {
            "@type": "Question",
            name: "Will payment status land back in HubSpot automatically?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We write Sent / Part-Paid / Paid / Overdue and Payment Date to Deal properties with retries and idempotency, so Sales has a live view without asking Finance.",
            },
        },
        {
            "@type": "Question",
            name: "Can you push HubSpot Quotes into Xero and keep line-item data?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Quotes convert to Xero draft/authorised invoices with line items, tax, SKUs, and Tracking preserved. Enter information once, and ensure it flows to every place it needs to go.",
            },
        },
        {
            "@type": "Question",
            name: "What happens if data changes or something fails mid-sync?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The ODS keeps state and every write is auditable. We validate inputs, retry safely without duplicates, and surface human-readable errors in HubSpot.",
            },
        },
    ],
};

export default function HubSpotXeroIntegrationPage() {
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
            <div className="bg-base-200 pt-18">
                <XeroIntegration />
            </div>
            <Footer />
        </>
    );
}
