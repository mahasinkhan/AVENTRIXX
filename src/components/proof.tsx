"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 140, decimals: 0, suffix: "+", label: "Systems shipped", sub: "across 9 sectors" },
  { value: 99.98, decimals: 2, suffix: "%", label: "Fleet uptime", sub: "trailing 12 months" },
  { value: 4.2, decimals: 1, suffix: "x", label: "Median throughput gain", sub: "after migration" },
  { value: 11, decimals: 0, suffix: " yrs", label: "Average engineer experience", sub: "no juniors on lead" },
];

const cases = [
  {
    sector: "Financial services",
    title: "Reconciliation cut from 9 hours to 6 minutes",
    copy: "Replaced a nightly batch job with an event-sourced ledger and a streaming matcher. Close moved from Tuesday to same-day.",
    metric: "94x",
    metricLabel: "faster close",
    feature: true,
  },
  {
    sector: "Healthcare",
    title: "Triage assistant cleared 41% of inbound",
    copy: "A retrieval system over clinical protocols, with every answer traceable to a source document and a clinician in the loop.",
    metric: "41%",
    metricLabel: "deflected",
  },
  {
    sector: "Logistics",
    title: "Route engine rebuilt on real-time telemetry",
    copy: "Migrated a monolith to event-driven services without a freeze window, then cut cloud spend while doubling load.",
    metric: "-38%",
    metricLabel: "cloud spend",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Kubernetes",
  "Terraform",
  "Kafka",
  "dbt",
  "Snowflake",
  "PyTorch",
  "AWS",
  "Azure",
  "GCP",
];

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const values = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.from(".proof-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      stats.forEach((s, i) => {
        const el = values.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 1.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(s.decimals);
          },
        });
      });

      gsap.set(".proof-case", { y: 34, opacity: 0 });
      ScrollTrigger.batch(".proof-case", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.1,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="relative scroll-mt-24 section-y">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="proof-head-item type-eyebrow">
              Proof
            </p>
            <h2 className="proof-head-item mt-6 max-w-2xl type-h2">
              Outcomes we can <span className="inkflow">put a number on.</span>
            </h2>
          </div>
          <Link
            href="#contact"
            className="proof-head-item inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-iris"
          >
            Request the full case studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-surface p-7">
              <p className="font-display text-4xl font-semibold tracking-tight tabular-nums">
                <span
                  ref={(el) => {
                    values.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-iris">{s.suffix}</span>
              </p>
              <p className="mt-4 text-sm font-medium text-ink">{s.label}</p>
              <p className="mt-1 font-mono text-xs text-muted">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.sector}
              className={
                "proof-case group relative flex flex-col overflow-hidden rounded-card border border-line p-8 transition-[transform,border-color,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift " +
                (c.feature ? "bg-iris-tint" : "bg-surface")
              }
            >
              <p className="type-eyebrow">
                {c.sector}
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                <span
                  className={
                    "font-display text-5xl font-semibold tracking-tight " +
                    (c.feature ? "text-iris-deep" : "text-ink")
                  }
                >
                  {c.metric}
                </span>
                <span className="font-mono text-xs text-muted">
                  {c.metricLabel}
                </span>
              </div>

              <h3 className="mt-8 font-display text-lg leading-snug font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.copy}</p>

              <div className="mt-auto pt-8">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Read the write-up
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="marquee mask-x relative mt-24 overflow-hidden py-2">
        <div className="marquee-track flex w-max items-center gap-14">
          {[...stack, ...stack].map((s, i) => (
            <span
              key={s + i}
              className="font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-muted transition-colors duration-500 hover:text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

