// src/app/(public)/landing/components/SmoothScroll.tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// src/app/(public)/landing/components/SmoothScroll.tsx

// src/app/(public)/landing/components/SmoothScroll.tsx

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { children: React.ReactNode };

/**
 * Layout-safe smooth scroll:
 * - Wrapper stays in normal flow (position: relative) with a real height.
 * - Inner content is sticky and translated for the smooth effect.
 * - No scrollerProxy and no fixed, full-screen wrapper -> footer can pin.
 */
export default function SmoothScroll({ children }: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current!;
        const content = contentRef.current!;

        const ctx = gsap.context(() => {
            let current = 0;
            let target = 0;
            let raf = 0;

            // Keep elements in document flow.
            gsap.set(wrapper, { position: "relative", width: "100%" });
            gsap.set(content, {
                position: "sticky",
                top: 0,
                willChange: "transform",
                width: "100%",
            });

            const setWrapperHeight = () => {
                // Temporarily clear transform to measure natural height
                const prev = content.style.transform;
                content.style.transform = "";
                const h = content.scrollHeight;
                wrapper.style.height = `${h}px`;
                // Restore transform
                content.style.transform = prev;
            };

            // Initial measurement
            setWrapperHeight();

            // Update height BEFORE ST measures (avoids recursion)
            const onRefreshInit = () => setWrapperHeight();
            ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

            // Also update on resize
            const onResize = () => setWrapperHeight();
            window.addEventListener("resize", onResize);

            // Smooth follow
            const tick = () => {
                target = window.scrollY || window.pageYOffset || 0;
                // lower factor = looser; higher = snappier
                current += (target - current) * 0.12;
                gsap.set(content, { y: -current });
                // Update ST positions without triggering a refresh loop
                ScrollTrigger.update();
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);

            // One refresh after first layout is fine
            ScrollTrigger.refresh();

            return () => {
                cancelAnimationFrame(raf);
                window.removeEventListener("resize", onResize);
                ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
                // Cleanup styles
                gsap.set(content, { clearProps: "position,top,willChange,transform,width" });
                gsap.set(wrapper, { clearProps: "position,height,width" });
            };
        }, wrapper);

        return () => ctx.revert();
    });

    return (
        <div ref={wrapperRef} id="smooth-wrapper">
            <div ref={contentRef} id="smooth-content">
                {children}
            </div>
        </div>
    );
}
