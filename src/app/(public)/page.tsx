import type { Metadata } from "next";

import AuditReport from "./landing/components/AuditReport";
import { BundleOffer } from "./landing/components/BundleOffer";
import { CTA } from "./landing/components/CTA";
import { FAQ } from "./landing/components/FAQ";
import { Features } from "./landing/components/Features";
import { Footer } from "./landing/components/Footer";
import { Hero } from "./landing/components/Hero";
import LogoMarquee from "./landing/components/LogoMarcquee";
import PillarsSticky from "./landing/components/Pillars";
import Results from "./landing/components/Results";
import { Showcase } from "./landing/components/Showcase";
import SmoothScroll from "./landing/components/SmoothScroll";
import { Testimonial } from "./landing/components/Testimonial";
import { Topbar } from "./landing/components/Topbar";

export const metadata: Metadata = {
    title: "Kali Software | AI & Data Solutions for Australian Businesses",
    description:
        "Enterprise AI, data integration, and analytics consulting for Australian businesses. Multi-agent systems, RAG, semantic search, and custom software.",
    alternates: {
        canonical: "https://www.kalisoftware.io/",
    },
    openGraph: {
        title: "Kali Software | AI & Data Solutions",
        description:
            "Enterprise AI, data integration, and analytics consulting for Australian businesses. Multi-agent systems, RAG, semantic search, and custom software.",
        url: "https://www.kalisoftware.io/",
        images: [{ url: "/images/og/image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kali Software | AI & Data Solutions",
        description:
            "Enterprise AI, data integration, and analytics consulting for Australian businesses.",
        images: ["/images/og/image.png"],
    },
};

export const revalidate = 86400;

const LandingPage = () => {
    return (
        <>
            <div className="bg-base-200 pt-2 mix-blend-normal filter-none">
                <Hero />
                <div className="">
                    <LogoMarquee />
                </div>

                <PillarsSticky raisePx={100} headerGuardVh={6} />

                <div>
                    <Results />
                    <FAQ />
                    <Footer />
                </div>
            </div>
            {/* </SmoothScroll> */}
        </>
    );
};

export default LandingPage;
