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
 * Layout-safe smooth scroll with robust sizing:
 * - Wrapper stays in normal flow with real height.
 * - Content is sticky and translated for the smooth effect.
 * - Height stays in sync via ResizeObserver/refresh/resize/load.
 * - Throttled ScrollTrigger updates and rAF that sleeps when idle.
 */
export default function SmoothScroll({ children }: Props) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current!;
        const content = contentRef.current!;

        // Helps on mobile (URL bar resize spam)
        ScrollTrigger.config({ ignoreMobileResize: true });

        const ctx = gsap.context(() => {
            let current = 0;
            let target = 0;
            let raf = 0;
            let running = false;
            let lastY = -1;

            gsap.set(wrapper, { position: "relative", width: "100%" });
            gsap.set(content, {
                position: "sticky",
                top: 0,
                willChange: "transform",
                width: "100%",
            });

            const setWrapperHeight = () => {
                // Clear transform to measure natural height
                const prev = content.style.transform;
                content.style.transform = "";
                const h = content.scrollHeight;
                wrapper.style.height = `${h}px`;
                content.style.transform = prev;
            };

            // Keep height in sync with any content changes (images, hydration, FAQ toggles, etc.)
            const ro = new ResizeObserver(() => setWrapperHeight());
            ro.observe(content);

            const onLoad = () => setWrapperHeight();
            window.addEventListener("load", onLoad, { passive: true });

            const onRefreshInit = () => setWrapperHeight();
            const onRefresh = () => setWrapperHeight();
            ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
            ScrollTrigger.addEventListener("refresh", onRefresh);

            const onResize = () => setWrapperHeight();
            window.addEventListener("resize", onResize, { passive: true });

            const start = () => {
                if (running) return;
                running = true;
                tick();
            };
            const stop = () => {
                running = false;
                cancelAnimationFrame(raf);
            };

            const tick = () => {
                target = window.scrollY || window.pageYOffset || 0;
                // easing factor: lower = looser, higher = snappier
                current += (target - current) * 0.12;

                // Only update when the value actually moved enough
                if (Math.abs(current - lastY) > 0.25) {
                    gsap.set(content, { y: -current });
                    ScrollTrigger.update();
                    lastY = current;
                }

                // Sleep when close enough to the target
                if (Math.abs(target - current) < 0.1) {
                    stop();
                } else if (running) {
                    raf = requestAnimationFrame(tick);
                }
            };

            // Initial pass
            setWrapperHeight();
            ScrollTrigger.refresh();
            start();

            // Wake the loop on user input
            const onUserScroll = () => start();
            window.addEventListener("scroll", onUserScroll, { passive: true });
            window.addEventListener("wheel", onUserScroll, { passive: true });
            window.addEventListener("touchmove", onUserScroll, { passive: true });

            return () => {
                stop();
                ro.disconnect();
                window.removeEventListener("load", onLoad);
                window.removeEventListener("resize", onResize);
                window.removeEventListener("scroll", onUserScroll);
                window.removeEventListener("wheel", onUserScroll);
                window.removeEventListener("touchmove", onUserScroll);
                ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
                ScrollTrigger.removeEventListener("refresh", onRefresh);
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
