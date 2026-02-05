// src/app/services/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import Services from "./components/Services";

const SITE_URL = "https://www.kalisoftware.io";
const SERVICES_PATH = "/services";
const SERVICES_URL = `${SITE_URL}${SERVICES_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/og/image.png`; // 1200×630 recommended

// List your individual service pages here for ItemList JSON-LD
const servicesList = [
    {
        url: `${SITE_URL}/services/hubspot-xero-integration`,
        name: "HubSpot Xero Integration (Australia)",
    },
    // Add more services as you publish them:
    // { url: `${SITE_URL}/services/<slug>`, name: "Service Name" },
];

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Services — Kali Software",
    description:
        "Consulting, Dashboards & Analytics, Workflow Automation, and Product Development services. Deeper detail on scope, outcomes, timelines, and pricing signals.",
    alternates: { canonical: SERVICES_URL },
    openGraph: {
        title: "Services — Kali Software",
        description: "Consulting, Dashboards & Analytics, Workflow Automation, and Product Development services.",
        url: SERVICES_URL,
        siteName: "Kali Software",
        locale: "en_AU",
        type: "website",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Kali Software Services" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Services — Kali Software",
        description: "Consulting, Dashboards & Analytics, Workflow Automation, and Product Development services.",
        images: [OG_IMAGE],
        // site: "@yourhandle", creator: "@yourhandle",
    },
};

export const revalidate = 86400;

export default function ServicesPage() {
    // BreadcrumbList JSON-LD
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: SERVICES_URL },
        ],
    };

    // ItemList JSON-LD of service detail pages
    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: servicesList.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: s.url,
            name: s.name,
        })),
    };

    return (
        <>
            {/* Structured data */}
            <Script
                id="ld-breadcrumbs"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <Script
                id="ld-services-itemlist"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />

            {/* <Topbar /> */}
            <div className="bg-base-200 pt-18">
                <Services />
            </div>
            <Footer />
        </>
    );
}
