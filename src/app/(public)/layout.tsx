import { type ReactNode } from "react";

import { Footer } from "./landing/components/Footer";
import { Topbar } from "./landing/components/Topbar";

/**
 * Persistent layout for public pages. Footer is pinned to bottom via flex column.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Topbar />
            <div className="bg-base-200 flex min-h-dvh min-h-screen flex-col pt-18">
                <main id="page" className="flex flex-1 flex-col">
                    {children}
                </main>
            </div>
        </>
    );
}
