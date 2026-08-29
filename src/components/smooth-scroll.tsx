"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      if (reduced.matches) {
        lenis.stop();
        gsap.globalTimeline.timeScale(120);
      } else {
        lenis.start();
        gsap.globalTimeline.timeScale(1);
      }
    };

    applyMotionPreference();
    reduced.addEventListener("change", applyMotionPreference);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.length < 2 || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -96,
        duration: reduced.matches ? 0 : 1.4,
        immediate: reduced.matches,
      });
    };

    document.addEventListener("click", onClick);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
      reduced.removeEventListener("change", applyMotionPreference);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.09, smoothWheel: true, touchMultiplier: 1.6 }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
