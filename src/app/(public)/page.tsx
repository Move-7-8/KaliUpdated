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
    title: "Software & Automation Services",
};

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
