"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const clients = ["NORTHWIND", "ATLAS PAY", "VECTRA", "HELIOGRAPH", "MERIDIAN"];

const bars = [34, 52, 41, 68, 57, 79, 62, 88, 71, 94, 83, 100];

const pipeline = [
  { name: "ingest.stream", state: "live", tone: "bg-iris" },
  { name: "feature.store", state: "live", tone: "bg-iris" },
  { name: "model.serve", state: "warm", tone: "bg-apricot" },
  { name: "audit.ledger", state: "live", tone: "bg-iris" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-line-inner", {
        yPercent: 118,
        duration: 1.2,
        stagger: 0.09,
      })
        .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.8 }, 0.1)
        .from(".hero-sub", { y: 22, opacity: 0, duration: 0.9 }, 0.5)
        .from(".hero-cta", { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.62)
        .from(".hero-trust", { y: 16, opacity: 0, duration: 0.8 }, 0.78)
        .from(
          ".hero-panel",
          { y: 60, opacity: 0, duration: 1.3, ease: "power3.out" },
          0.7
        )
        .from(".hero-bar", { scaleY: 0, duration: 0.7, stagger: 0.035 }, 1.1);

      gsap.to(".hero-panel", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-panel",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate pt-32">
      <div className="px-4 sm:px-6">
        <div className="hero-shot relative h-[calc(100vh-9rem)] min-h-[34rem] overflow-hidden rounded-[28px]">
          <Image
            src="/img/hero-bg.jpg"
            alt="A laptop showing a code editor on a working desk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
              <span className="hero-eyebrow inline-flex items-center gap-3 type-eyebrow text-ground/80">
                <span className="h-px w-8 bg-ground/50" />
                AI-native software engineering
              </span>

              <h1 className="mt-7 max-w-3xl type-h1 text-ground">
                <span className="hero-line block overflow-hidden pb-[0.1em]">
                  <span className="hero-line-inner block">We design and ship</span>
                </span>
                <span className="hero-line block overflow-hidden pb-[0.1em]">
                  <span className="hero-line-inner block">
                    the <span className="text-sky">systems</span> your
                  </span>
                </span>
                <span className="hero-line block overflow-hidden pb-[0.1em]">
                  <span className="hero-line-inner block">business runs on.</span>
                </span>
              </h1>

              <p className="hero-sub mt-7 max-w-lg type-lead text-ground/85">
                Product engineering, data platforms and applied AI for companies
                that have outgrown off-the-shelf. Senior teams, fixed-scope
                delivery, and code you own outright.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="#contact"
                  className="hero-cta sheen group inline-flex items-center gap-2 rounded-pill bg-ground px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-300 ease-expo hover:bg-iris hover:text-ground"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#solutions"
                  className="hero-cta inline-flex items-center rounded-pill border border-ground/35 px-6 py-3.5 text-sm font-medium text-ground backdrop-blur-sm transition-colors duration-300 ease-expo hover:border-ground/70"
                >
                  See our capabilities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="hero-trust flex flex-wrap items-center gap-x-7 gap-y-4 py-12">
          <p className="type-eyebrow">Trusted by teams at</p>
          {clients.map((c) => (
            <span
              key={c}
              className="font-display text-sm font-semibold tracking-tight text-muted transition-colors duration-300 hover:text-ink"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="hero-panel relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 right-6 z-10 hidden rounded-pill border border-line bg-surface px-4 py-2 font-mono text-xs shadow-lift sm:block"
          >
            <span className="text-muted">p95</span>{" "}
            <span className="text-ink">142ms</span>
          </motion.div>

          <div className="overflow-hidden rounded-card border border-line bg-surface shadow-glow">
            <div className="flex items-center gap-3 border-b border-line bg-veil/60 px-5 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
              </span>
              <span className="font-mono text-xs text-muted">
                lumina / platform / observability
              </span>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.65fr_1fr]">
              <div className="rounded-[16px] border border-line bg-ground p-5">
                <div className="flex items-baseline justify-between">
                  <p className="type-eyebrow">Throughput</p>
                  <p className="font-display text-2xl font-semibold tracking-tight">
                    2.41M
                    <span className="ml-1 text-sm font-normal text-muted">
                      events/hr
                    </span>
                  </p>
                </div>
                <div className="mt-6 flex h-36 items-end gap-2">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="hero-bar w-full origin-bottom rounded-t-[6px] bg-gradient-to-t from-iris/25 to-iris"
                      style={{ height: h + "%" }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[16px] border border-line bg-ground p-5">
                  <p className="type-eyebrow">Pipelines</p>
                  <ul className="mt-4 space-y-3">
                    {pipeline.map((p) => (
                      <li
                        key={p.name}
                        className="flex items-center justify-between"
                      >
                        <span className="font-mono text-xs text-ink-soft">
                          {p.name}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                          <span
                            className={"h-1.5 w-1.5 rounded-pill " + p.tone}
                          />
                          {p.state}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[16px] border border-line bg-iris-tint p-5">
                  <p className="type-eyebrow">Model accuracy</p>
                  <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-iris-deep">
                    98.6%
                  </p>
                  <p className="mt-1 font-mono text-xs text-iris-deep/70">
                    +2.4 pts since retrain
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
