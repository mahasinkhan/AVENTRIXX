"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;
const DWELL = 8000;

const voices = [
  {
    quote:
      "They rebuilt the part of our platform nobody else would touch, and did it without a single freeze window. Month-end went from a two-day event to something we stopped talking about.",
    name: "Priya Raghavan",
    role: "VP Engineering",
    company: "Atlas Pay",
    initials: "AP",
  },
  {
    quote:
      "The discovery brief was worth the fee on its own. Two of our assumptions were wrong, and we found out in week two rather than month seven.",
    name: "Daniel Okonkwo",
    role: "Chief Technology Officer",
    company: "Northwind",
    initials: "NW",
  },
  {
    quote:
      "What stood out was the handover. Runbooks, tests, and a team that could actually run the thing. No dependency, no retainer we could not leave.",
    name: "Marta Lindqvist",
    role: "Director of Platform",
    company: "Heliograph",
    initials: "HG",
  },
  {
    quote:
      "We had been sold AI three times before. This was the first time someone insisted on an evaluation set before writing a line of production code.",
    name: "Sam Whitfield",
    role: "Head of Data",
    company: "Meridian",
    initials: "MD",
  },
];

export default function Voices() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = voices[i];

  const go = useCallback((n: number) => setI(((n % voices.length) + voices.length) % voices.length), []);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(i + 1), DWELL);
    return () => window.clearTimeout(t);
  }, [i, paused, go]);

  useGSAP(
    () => {
      gsap.from(".vo-item", {
        y: 28,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-y relative overflow-hidden">
      <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <div
        className="mx-auto max-w-4xl px-6 text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <p className="vo-item type-eyebrow">In their words</p>

        <div className="vo-item relative mt-10 min-h-72 sm:min-h-64">
          <Quote className="mx-auto h-7 w-7 text-iris" strokeWidth={1.5} />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.name}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease }}
              className="mt-8"
            >
              <p className="font-display text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
                {current.quote}
              </p>
              <footer className="mt-8 flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-ink font-mono text-[11px] tracking-widest text-ground">
                  {current.initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium">
                    {current.name}
                  </span>
                  <span className="block font-mono text-xs text-muted">
                    {current.role}, {current.company}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="vo-item mt-12 flex items-center justify-center gap-3">
          {voices.map((v, n) => (
            <button
              key={v.name}
              type="button"
              onClick={() => go(n)}
              aria-label={"Show quote from " + v.company}
              aria-current={n === i}
              className={cn(
                "relative h-1 overflow-hidden rounded-pill transition-all duration-500 ease-expo",
                n === i ? "w-16 bg-line-strong" : "w-6 bg-line hover:bg-line-strong"
              )}
            >
              {n === i && (
                <motion.span
                  key={String(i) + String(paused)}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: paused ? 0 : DWELL / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-iris"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
