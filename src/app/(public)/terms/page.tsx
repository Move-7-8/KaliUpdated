// src/app/terms/page.tsx
// Route that imports and renders the reusable Terms of Service component
import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import TermsOfService from "./components/TermsOfService";

export const metadata = {
    title: "Terms of Service - Kali Software",
    description: "Terms governing the use of Kali Software’s website and professional services (Kali Capital Pty Ltd).",
};

export default function TermsOfServicePage() {
    return (
        <>
            <Topbar />
            <div className="bg-base-200 pt-18">
                <TermsOfService />
            </div>
            <Footer />
        </>
    );
}
