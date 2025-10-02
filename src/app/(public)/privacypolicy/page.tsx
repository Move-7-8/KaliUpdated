// src/app/privacypolicy/page.tsx
// Route that imports and renders the reusable Privacy Policy component
import { Footer } from "../landing/components/Footer";
import { Topbar } from "../landing/components/Topbar";
import PrivacyPolicy from "./components/PrivacyPolicy";

export const metadata = {
    title: "Privacy Policy - Kali Software",
    description: "Privacy Policy for Kali Software (Kali Capital Pty Ltd).",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Topbar />
            <div className="bg-base-200 pt-18">
                <PrivacyPolicy />
            </div>
            <Footer />
        </>
    );
}
