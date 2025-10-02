import type { Metadata } from "next";

import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import About from "./components/About";

export const metadata: Metadata = {
    title: "About Us - Kali Software",
    description:
        "Kali Software is an Australian software & automation partner. We design and build practical systems—AI, dashboards, and workflow automation—tailored to your operations.",
};

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
