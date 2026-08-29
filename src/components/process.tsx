"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    index: "01",
    title: "Discover",
    copy: "A fixed-fee sprint that ends in a technical brief: the real constraints, the risky assumptions, and a scope your finance team can sign.",
    meta: ["2 weeks", "Technical brief", "Fixed fee"],
  },
  {
    index: "02",
    title: "Architect",
    copy: "Data model, service boundaries and integration contracts agreed up front. Decisions get written down with the trade-offs attached.",
    meta: ["ADRs", "Threat model", "Cost envelope"],
  },
  {
    index: "03",
    title: "Build",
    copy: "Two-week increments, demoed live against your own data. Trunk-based, reviewed by a second senior engineer, shipped behind flags.",
    meta: ["Weekly demo", "Feature flags", "Trunk-based"],
  },
  {
    index: "04",
    title: "Harden",
    copy: "Load, chaos and penetration testing before launch, not after. SLOs and dashboards exist on day one, not the first incident.",
    meta: ["Load tested", "SLOs defined", "Pen tested"],
  },
  {
    index: "05",
    title: "Operate",
    copy: "We stay on call through stabilisation, then hand over a system your team can run: runbooks, tests, and no private knowledge.",
    meta: ["On call", "Runbooks", "Full handover"],
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.from(".proc-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const t = track.current;
        const h = holder.current;
        if (!t || !h) return;

        const distance = () => t.scrollWidth - (h.clientWidth - 48);

        gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + (distance() + window.innerHeight * 0.4),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(".proc-bar", { scaleX: self.progress });
              const i = Math.min(
                steps.length,
                Math.floor(self.progress * steps.length) + 1
              );
              if (counter.current) {
                counter.current.textContent = String(i).padStart(2, "0");
              }
            },
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="platform"
      className="relative scroll-mt-24 border-y border-line py-24 lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div className="absolute inset-0 overflow-hidden"><Image src="/img/studio-whiteboard.jpg" alt="" fill sizes="100vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-b from-ground/88 via-ground/72 to-ground/88" /></div>
      <div
        ref={holder}
        className="relative mx-auto flex h-full max-w-6xl flex-col px-6 lg:justify-center"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="proc-head-item type-eyebrow">
              Delivery model
            </p>
            <h2 className="proc-head-item mt-6 max-w-2xl type-h2">
              Five stages. No surprises at the{" "}
              <span className="inkflow">invoice.</span>
            </h2>
          </div>

          <div className="proc-head-item w-full sm:w-56">
            <div className="flex items-baseline justify-between font-mono text-xs text-muted">
              <span>
                <span ref={counter} className="text-ink">
                  01
                </span>{" "}
                / 05
              </span>
              <span className="hidden lg:inline">scroll</span>
            </div>
            <div className="mt-3 h-px w-full bg-line-strong">
              <div className="proc-bar h-px w-full origin-left scale-x-0 bg-iris" />
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="mt-12 flex flex-col gap-4 lg:mt-16 lg:w-max lg:flex-row lg:gap-6"
        >
          {steps.map((s) => (
            <article
              key={s.index}
              className="flex w-full shrink-0 flex-col rounded-card border border-line bg-surface p-8 transition-colors duration-500 ease-expo hover:border-line-strong lg:w-[26rem]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-6xl font-semibold tracking-tight text-line-strong">
                  {s.index}
                </span>
                <span className="h-2 w-2 rounded-pill bg-iris" />
              </div>

              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted lg:min-h-28">
                {s.copy}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6">
                {s.meta.map((m) => (
                  <li
                    key={m}
                    className="rounded-pill border border-line bg-ground px-3 py-1 font-mono text-[11px] text-ink-soft"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
















