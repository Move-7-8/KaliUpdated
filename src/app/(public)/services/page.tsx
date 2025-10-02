// src/app/services/page.tsx
import type { Metadata } from "next";

import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import Services from "./components/Services";

export const metadata: Metadata = {
    title: "Services — Kali Software",
    description:
        "Consulting, Dashboards & Analytics, Workflow Automation, and Product Development services. Deeper detail on scope, outcomes, timelines, and pricing signals.",
};

export default function ServicesPage() {
    return (
        <>
            {/* <Topbar /> */}
            <div className="bg-base-200 pt-18">
                <Services />
            </div>
            <Footer />
        </>
    );
}
