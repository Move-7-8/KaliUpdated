"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTopOnRouteChange() {
    const pathname = usePathname();

    useEffect(() => {
        // Next frame so the new page has mounted
        const id = requestAnimationFrame(() => {
            // If GSAP ScrollSmoother is present, prefer it
            const smoother = (window as any)?.ScrollSmoother?.get?.();
            if (smoother?.scrollTo) {
                smoother.scrollTo(0, false); // no smoothing
            } else {
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                document.documentElement.scrollTop = 0; // hard reset fallback
            }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    return null;
}
