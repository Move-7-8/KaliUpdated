// src/app/services/digital/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import OurClients from "../../about/components/OurClients";
import { Footer } from "../../landing/components/Footer";
import Digital from "./components/Digital";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICE_PATH = "/services/digital";
const SERVICE_URL = `${SITE_URL}${SERVICE_PATH}`;
const ORG_ID = `${SITE_URL}/#organization`;

const OG_IMAGE = `${SITE_URL}/images/og/image.png`;

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Next.js Web Apps (Australia): Design, Build & Integrations",
    description:
        "Design and build production-grade Next.js web apps for Australian teams—fast UX, clean component systems, robust APIs, and reliable integrations.",
    alternates: { canonical: SERVICE_URL },
    openGraph: {
        title: "Next.js Web Apps (Australia): Design, Build & Integrations",
        description:
            "Design and build production-grade Next.js web apps for Australian teams—fast UX, clean component systems, robust APIs, and reliable integrations.",
        url: SERVICE_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Next.js web apps for Australian teams",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Web Apps (Australia): Design, Build & Integrations",
        description:
            "Design and build production-grade Next.js web apps for Australian teams—fast UX, clean component systems, robust APIs, and reliable integrations.",
        images: [OG_IMAGE],
    },
};

const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_URL + "#service",
    name: "Next.js Web Apps (Australia)",
    serviceType: "Web Application Development",
    url: SERVICE_URL,
    description:
        "Plan, design, and deliver modern Next.js applications with accessible UX, strong performance, clean component systems, and reliable integrations.",
    areaServed: { "@type": "Country", name: "AU" },
    audience: { "@type": "BusinessAudience", name: "Australian product & marketing teams" },
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
            name: "How long does a typical Next.js build take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most projects ship in 4–6 weeks: discovery, UX/IA, component system, integrations, testing, and launch. Post-launch iterations continue on a roadmap.",
            },
        },
        {
            "@type": "Question",
            name: "What’s included in the build?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Design system, routes and pages, forms and validation, authentication, API integration, performance and accessibility passes, analytics, and CI/CD.",
            },
        },
        {
            "@type": "Question",
            name: "How do you ensure performance and SEO?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We ship fast by default: server components where sensible, caching and revalidation, image optimisation, clean HTML semantics, and structured metadata.",
            },
        },
        {
            "@type": "Question",
            name: "Can you integrate with our existing systems?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We connect CRMs, auth providers, data APIs, and back-office tools with idempotent writes, rate-limit handling, and resilient retries.",
            },
        },
        {
            "@type": "Question",
            name: "Do you provide handover and support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We document the component library and workflows, set up CI/CD and environments, and provide runbooks for changes and incident response.",
            },
        },
    ],
};

export default function DigitalPage() {
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
                <Digital />
                <div className="mx-auto max-w-10/12">
                    <OurClients />
                </div>
            </div>

            <Footer />
        </>
    );
}
