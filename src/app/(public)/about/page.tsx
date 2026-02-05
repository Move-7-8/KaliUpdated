import type { Metadata } from "next";

import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import About from "./components/About";

export const metadata: Metadata = {
    title: "About Us - Kali Software",
    description:
        "Kali Software is an Australian software & automation partner. We design and build practical systems—AI, dashboards, and workflow automation—tailored to your operations.",
    alternates: {
        canonical: "https://www.kalisoftware.io/about",
    },
    openGraph: {
        title: "About Us - Kali Software",
        description:
            "Kali Software is an Australian software & automation partner. We design and build practical systems—AI, dashboards, and workflow automation—tailored to your operations.",
        url: "https://www.kalisoftware.io/about",
        images: [{ url: "/images/og/image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us - Kali Software",
        description:
            "Australian software & automation partner. AI, dashboards, and workflow automation.",
        images: ["/images/og/image.png"],
    },
};

export const revalidate = 86400;

export default function AboutPage() {
    return (
        <>
            {/* <Topbar /> */}
            <div className="bg-base-200 pt-18">
                <About />
                <Footer />
            </div>
        </>
    );
}
