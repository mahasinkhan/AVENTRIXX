"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

const solutions = [
  {
    index: "01",
    name: "SaaS products",
    tagline: "Multi-tenant platforms, launched and monetised",
    summary:
      "We take a SaaS idea from zero to paying customers: tenancy model, billing, roles and permissions, admin tooling and the operational layer you need before the first enterprise buyer asks for it.",
    deliverables: [
      "Multi-tenant architecture and data isolation",
      "Subscription billing and metering",
      "Role-based access and audit trails",
      "Admin console and customer onboarding",
    ],
    stack: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    timeline: "10 to 16 weeks to launch",
    engagement: "Fixed-scope build",
  },
  {
    index: "02",
    name: "AI software",
    tagline: "Models and agents wired into real workflows",
    summary:
      "Retrieval systems, assistants and agents that sit inside the tools your team already uses. Every answer is traceable to a source, and quality is measured against an evaluation set before anything ships.",
    deliverables: [
      "Retrieval pipelines over your own data",
      "Agent and tool-calling orchestration",
      "Evaluation harness and quality gates",
      "Human-in-the-loop review surfaces",
    ],
    stack: ["Python", "LangGraph", "pgvector", "OpenTelemetry"],
    timeline: "6 to 12 weeks to production",
    engagement: "Pilot then scale",
  },
  {
    index: "03",
    name: "Data solutions",
    tagline: "Warehouses, pipelines and reporting that reconcile",
    summary:
      "Batch and streaming pipelines feeding a modelled warehouse, with tests and lineage attached. The number in the board pack matches the number in the source system, and you can prove why.",
    deliverables: [
      "Ingestion from operational systems",
      "Dimensional models and semantic layer",
      "Data quality tests and lineage",
      "Executive dashboards and self-serve BI",
    ],
    stack: ["dbt", "Snowflake", "Kafka", "Airflow"],
    timeline: "8 to 14 weeks",
    engagement: "Phased delivery",
  },
  {
    index: "04",
    name: "Cloud and infrastructure",
    tagline: "Migration, automation and cost that stays flat",
    summary:
      "Lift a workload off ageing infrastructure, or bring an existing cloud estate under control. Everything is codified, so environments are reproducible and spend stops drifting upward each quarter.",
    deliverables: [
      "Landing zone and network design",
      "Infrastructure as code, end to end",
      "CI/CD with zero-downtime releases",
      "FinOps review and cost guardrails",
    ],
    stack: ["Terraform", "Kubernetes", "AWS", "GitHub Actions"],
    timeline: "6 to 20 weeks by estate size",
    engagement: "Migration programme",
  },
  {
    index: "05",
    name: "Web and mobile apps",
    tagline: "Customer-facing products on every screen",
    summary:
      "Marketing sites, portals, internal tools and native apps built on one design system, so the brand holds together and a change made once does not need making three more times.",
    deliverables: [
      "Design system and component library",
      "Responsive web and native mobile",
      "Accessibility to WCAG 2.2 AA",
      "Analytics and performance budgets",
    ],
    stack: ["Next.js", "React Native", "Swift", "Figma"],
    timeline: "6 to 14 weeks",
    engagement: "Fixed-scope build",
  },
  {
    index: "06",
    name: "Integration and automation",
    tagline: "Systems that finally talk to each other",
    summary:
      "API layers, event buses and workflow automation across ERP, CRM and the spreadsheet nobody admits is load-bearing. Manual handoffs become traceable, retryable steps.",
    deliverables: [
      "API gateway and contract testing",
      "Event-driven integration layer",
      "Workflow automation and approvals",
      "Monitoring, retries and dead letters",
    ],
    stack: ["TypeScript", "Kafka", "Temporal", "OpenAPI"],
    timeline: "4 to 10 weeks",
    engagement: "Retainer or fixed scope",
  },
];

export default function Solutions() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = solutions[active];

  useGSAP(
    () => {
      gsap.from(".sol-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".sol-body", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sol-body", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="solutions"
      className="section-y relative scroll-mt-24 border-y border-line bg-veil/40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="sol-head-item type-eyebrow">Solutions</p>
            <h2 className="sol-head-item mt-6 max-w-2xl type-h2">
              One partner for the whole{" "}
              <span className="inkflow">software estate.</span>
            </h2>
          </div>
          <p className="sol-head-item max-w-sm type-body">
            Pick a line to see what ships, what it is built on, and how long it
            takes. No two engagements are identical, but the shape is public.
          </p>
        </div>

        <div className="sol-body mt-14 grid gap-4 lg:grid-cols-[minmax(0,21rem)_1fr]">
          <div
            role="tablist"
            aria-label="Solutions"
            className="flex flex-col gap-1 rounded-card border border-line bg-surface p-2"
          >
            {solutions.map((s, i) => (
              <button
                key={s.index}
                role="tab"
                type="button"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "relative flex items-center gap-4 rounded-[14px] px-4 py-4 text-left transition-colors duration-300 ease-expo",
                  active === i ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="sol-active"
                    className="absolute inset-0 rounded-[14px] bg-iris-tint"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span
                  className={cn(
                    "relative font-mono text-[11px] tracking-[0.2em]",
                    active === i ? "text-iris-deep" : "text-muted"
                  )}
                >
                  {s.index}
                </span>
                <span className="relative flex-1 text-sm font-medium">
                  {s.name}
                </span>
                <ArrowUpRight
                  className={cn(
                    "relative h-4 w-4 transition-opacity duration-300",
                    active === i ? "opacity-100 text-iris-deep" : "opacity-0"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-lift sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
              >
                <p className="type-eyebrow">{current.tagline}</p>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">
                  {current.name}
                </h3>
                <p className="mt-4 max-w-xl type-body">{current.summary}</p>

                <p className="mt-9 type-eyebrow">What ships</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {current.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-iris" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-2">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-pill border border-line bg-ground px-3 py-1 font-mono text-[11px] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-x-10 gap-y-4">
                    <div>
                      <p className="type-eyebrow">Timeline</p>
                      <p className="mt-2 text-sm font-medium">
                        {current.timeline}
                      </p>
                    </div>
                    <div>
                      <p className="type-eyebrow">Engagement</p>
                      <p className="mt-2 text-sm font-medium">
                        {current.engagement}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#contact"
                    className="sheen group inline-flex items-center justify-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-medium text-ground transition-colors duration-300 ease-expo hover:bg-iris"
                  >
                    Scope this
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
