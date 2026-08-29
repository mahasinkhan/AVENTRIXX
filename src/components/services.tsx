"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Cloud,
  Database,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Service = {
  index: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  span: string;
  points?: string[];
};

const services: Service[] = [
  {
    index: "01",
    title: "Product engineering",
    copy: "Web, mobile and internal platforms built by senior teams. Discovery, architecture, delivery and handover in one accountable line.",
    icon: Boxes,
    span: "lg:col-span-4",
    points: [
      "Next.js, React Native and native iOS",
      "Design systems built for scale",
      "Fixed-scope milestones, weekly demos",
    ],
  },
  {
    index: "02",
    title: "Data platforms",
    copy: "Warehouses, lakehouses and streaming pipelines that stay correct under load.",
    icon: Database,
    span: "lg:col-span-2",
  },
  {
    index: "03",
    title: "Applied AI",
    copy: "Retrieval systems, agents and models wired into the workflows people already use.",
    icon: BrainCircuit,
    span: "lg:col-span-2",
  },
  {
    index: "04",
    title: "Cloud and DevOps",
    copy: "Infrastructure as code, CI/CD and cost control across AWS, Azure and GCP. Deploy on a Friday without flinching.",
    icon: Cloud,
    span: "lg:col-span-4",
    points: ["Terraform and Kubernetes", "Zero-downtime release pipelines"],
  },
  {
    index: "05",
    title: "Legacy modernisation",
    copy: "Strangler-fig migrations off monoliths and end-of-life stacks, without pausing the business.",
    icon: RefreshCw,
    span: "lg:col-span-3",
  },
  {
    index: "06",
    title: "Reliability and security",
    copy: "SLOs, observability and audit-ready controls. We stay on call for what we ship.",
    icon: ShieldCheck,
    span: "lg:col-span-3",
  },
];

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".svc-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.95,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: { trigger: ".svc-head", start: "top 82%" },
      });

      gsap.set(".svc-card", { y: 36, opacity: 0 });

      ScrollTrigger.batch(".svc-card", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.09,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  const onCardMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };

  return (
    <section
      ref={root}
      id="services"
      className="relative scroll-mt-24 section-y"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="hairline-fade mb-20 h-px w-full" />

        <div className="svc-head grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <p className="svc-head-item type-eyebrow">
              Capabilities
            </p>
            <h2 className="svc-head-item mt-6 type-h2">
              Everything an enterprise needs to build, run and{" "}
              <span className="inkflow">evolve software.</span>
            </h2>
          </div>
          <div className="svc-head-item lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-muted">
              Six practices, one delivery model. Engage a single team or the
              whole stack &mdash; the standards, tooling and accountability stay
              identical either way.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-iris"
            >
              Book a technical review
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((s) => (
            <article
              key={s.index}
              onMouseMove={onCardMove}
              className={cn(
                "svc-card spotlight group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-7 transition-[transform,box-shadow,border-color] duration-500 ease-expo hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift",
                s.span
              )}
            >
              <div className="relative flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-line bg-veil text-ink transition-colors duration-500 ease-expo group-hover:border-iris/30 group-hover:bg-iris-tint group-hover:text-iris-deep">
                  <s.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.24em] text-muted">
                  {s.index}
                </span>
              </div>

              <h3 className="relative mt-7 type-h3">
                {s.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {s.copy}
              </p>

              {s.points && (
                <ul className="relative mt-6 space-y-2.5 border-t border-line pt-5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 font-mono text-xs text-ink-soft"
                    >
                      <span className="h-1 w-1 rounded-pill bg-iris" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative mt-auto pt-7">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Magnetic>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-pill bg-ink px-8 py-4 text-sm font-medium text-ground shadow-lift transition-colors duration-300 ease-expo hover:bg-iris"
            >
              Talk to an engineer, not a salesperson
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

