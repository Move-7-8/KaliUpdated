import { Analytics } from "@vercel/analytics/next";
import { type Metadata } from "next";
import Script from "next/script";
import { type ReactNode } from "react";

import ContactModal from "@/app/(public)/landing/components/ContactModal";
import ScrollToTopOnRouteChange from "@/components/ScrollToTop";
import { ConfigProvider } from "@/contexts/config";
import "@/styles/app.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RWYV9J31R6";

export const metadata: Metadata = {
    // Keep a clear, keyword-rich default; page components can still override `title` with a specific one.
    title: {
        template: "%s - Kali Data Consulting",
        default: "Data Consulting, Integration & Analysis for Australian Businesses | Kali Software",
    },
    description:
        "Australian data consulting, integration and analytics. Turn data into decisions. We help ecommerce, finance, marketing and ops. Sydney & Perth.",
    metadataBase: new URL("https://www.kalisoftware.io"),
    keywords: [
        "data consultants Australia",
        "data integration Australia",
        "data analytics Australia",
        "Australian business",
        "Sydney",
        "Perth",
    ],
    applicationName: "Kali Data Consulting",
    authors: [{ name: "Kali Data Consulting" }],
    creator: "Kali Data Consulting",
    publisher: "Kali Data Consulting",
    category: "Data Consulting",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    alternates: {
        canonical: "/",
        languages: { "en-AU": "/" },
    },
    openGraph: {
        type: "website",
        locale: "en_AU",
        url: "https://www.kalisoftware.io/",
        siteName: "Kali Software",
        title: "Software & Automation Services for Australian Businesses | Kali Software",
        description:
            "Workflow automation, AI copilots, and custom web apps that cut busywork and boost margins. Book a 15-min automation consult.",
        images: [
            {
                url: "/images/og/image.png",
                width: 1200,
                height: 630,
                alt: "Kali Software — Software & Automation Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@kalisoftware",
        creator: "@kalisoftware",
        title: "Software & Automation Services for Australian Businesses | Kali Software",
        description: "Workflow automation, AI integrations, and custom web apps for Australian businesses.",
        images: ["/images/og/kali-software-og.png"],
    },
    icons: {
        icon: [{ url: "/favicon.ico" }],
        apple: [{ url: "/images/favicon.png", sizes: "500x500" }],
        shortcut: ["/favicon.png"],
    },
    manifest: "/site.webmanifest",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
    ],
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
        viewportFit: "cover",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en-AU" suppressHydrationWarning className="group/html">
            <head>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script type="text/javascript" src="/js/prefetch-config.js"></script>

                {/* Minimal Organization JSON-LD for richer brand results */}
                <script
                    type="application/ld+json"
                    // Keeping inline JSON for SEO; safe since it's static and not user-generated.
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Kali Software",
                            url: "https://www.kalisoftware.io/",
                            logo: "https://www.kalisoftware.io/images/og/kali-software-og.png",
                        }),
                    }}
                />

                {/* Google Analytics 4 (gtag.js) via next/script */}
                <Script
                    id="ga4-src"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script
                    id="ga4-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${GA_MEASUREMENT_ID}');
                        `,
                    }}
                />
            </head>
            <body>
                <ConfigProvider>{children}</ConfigProvider>

                {/* Always start new pages at scrollTop 0 */}
                <ScrollToTopOnRouteChange />

                {/* Global singleton ContactModal (no built-in trigger) */}
                <ContactModal id="contact-modal" renderTrigger={false} />

                {/* Vercel Analytics */}
                <Analytics />
            </body>
        </html>
    );
}
