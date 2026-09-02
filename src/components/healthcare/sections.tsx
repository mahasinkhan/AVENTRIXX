"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { aiCapabilities, careSettings, carePathway, moduleGroups } from "@/lib/healthcare";
import { productDemos, type MediaManifest } from "@/lib/healthcare-media";
import { CompareSlider, DemoMock, Grain, Parallax, SmartMedia } from "@/components/healthcare/media";

const ease = [0.16, 1, 0.3, 1] as const;

/* ----------------------------------------------------------- ward board */

const wardRows = [
  { bed: "3B-12", task: "Discharge summary", states: ["Drafted", "Signed", "Sent to GP"] },
  { bed: "3B-14", task: "Bloods ordered", states: ["Collected", "In lab", "Resulted"] },
  { bed: "3B-15", task: "Bed turnaround", states: ["Cleaning", "Ready", "Assigned"] },
  { bed: "3B-18", task: "Medication round", states: ["Due 14:00", "Given", "Signed"] },
];

const amberStates = ["Drafted", "Collected", "Cleaning", "Due 14:00"];
const violetStates = ["Signed", "In lab", "Ready", "Given"];

function toneClass(state: string) {
  if (amberStates.includes(state)) return "bg-amber-400/20 text-amber-200";
  if (violetStates.includes(state)) return "bg-sky-400/20 text-sky-200";
  return "bg-emerald-400/20 text-emerald-200";
}

function WardBoard() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((value) => value + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="rounded-card border border-ground/15 bg-ground/10 p-5 text-ground shadow-lift backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-ground/15 pb-3.5">
        <div>
          <p className="text-sm font-medium">Ward 3B</p>
          <p className="text-xs text-ground/60">Flow board</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-pill bg-ground/10 px-3 py-1 text-xs text-ground/80">
          <span
            aria-hidden="true"
            className={cn("h-1.5 w-1.5 rounded-full bg-teal-300", reduce ? "" : "animate-pulse")}
          />
          Live
        </span>
      </div>

      <ul className="divide-y divide-ground/10">
        {wardRows.map((row, index) => {
          const state = row.states[(tick + index) % row.states.length];
          return (
            <li key={row.bed} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-sm">{row.task}</p>
                <p className="text-xs text-ground/55">Bed {row.bed}</p>
              </div>
              <div className="relative h-7 w-28 shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={state}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.34, ease }}
                    className={cn(
                      "absolute inset-0 inline-flex items-center justify-center rounded-pill px-3 text-xs font-medium",
                      toneClass(state)
                    )}
                  >
                    {state}
                  </motion.span>
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

export function HealthcareHero({ manifest }: { manifest: MediaManifest }) {
  const reduce = useReducedMotion();
  const headline = ["The ward does not stop", "for your software."];

  return (
    <section className="px-4 pt-24 sm:px-6 sm:pt-28">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-card bg-ink text-ground"
      >
        <div className="absolute inset-0">
          <Parallax amount={40}>
            <div className="relative h-full min-h-[46rem] w-full">
              <SmartMedia manifest={manifest} slot="hero" alt="Clinical team at work" priority sizes="100vw" />
            </div>
          </Parallax>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <Grain className="opacity-[0.14]" />

        <div className="relative grid min-h-[46rem] gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:p-16">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="text-sm text-ground/55">
              <Link href="/industries" className="transition-colors hover:text-ground">
                Industries
              </Link>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              <span className="text-ground/85">Healthcare</span>
            </nav>

            <motion.p
              className="mt-10 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-300"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span aria-hidden="true" className="h-px w-6 bg-teal-300" />
              Clinical, operational and revenue systems
            </motion.p>

            <h1 className="mt-5 text-[clamp(2.6rem,6.2vw,4.75rem)] font-medium leading-[0.96] tracking-tight">
              {headline.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.15 + index * 0.09, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-xl text-lg leading-relaxed text-ground/80"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease }}
            >
              Built for hospitals, care homes, clinics, labs and pharmacies. Integrated with the
              estate you already run, delivered one site at a time, handed over as code you own.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease }}
            >
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-pill bg-ground px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Book a systems review <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                href="#modules"
                className="inline-flex items-center gap-2 rounded-pill border border-ground/30 px-6 py-3 text-sm text-ground transition-colors hover:bg-ground/10"
              >
                Module map
              </Link>
            </motion.div>

            <motion.p
              className="mt-10 text-sm text-ground/55"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            >
              Hospitals &middot; Nursing homes &middot; Clinics &middot; Diagnostics &middot; Pharmacy
              &middot; Home care
            </motion.p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="lg:max-w-[24rem] lg:justify-self-end"
          >
            <WardBoard />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------- settings */

export function CareSettingsScroll({ manifest }: { manifest: MediaManifest }) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const index = Number(visible[0].target.getAttribute("data-index"));
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = careSettings[activeIndex] ?? careSettings[0];

  return (
    <section className="border-t border-line bg-veil/40">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700"><span aria-hidden="true" className="h-px w-6 bg-teal-500" />Where we work</p>
        <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Six settings. One platform underneath.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          A 400 bed hospital and a 20 resident care home do not need the same product, but they
          need the same spine: one record, one identity model, one audit trail.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0"
                >
                  <SmartMedia
                    manifest={manifest}
                    slot={active.id}
                    alt={active.name}
                    index={activeIndex}
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
              <Grain />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm font-medium text-ground">{active.name}</p>
                <p className="text-xs text-ground/80">{active.line}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-1.5">
              {careSettings.map((setting, index) => (
                <span
                  key={setting.id}
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-500",
                    index === activeIndex ? "bg-teal-500" : "bg-line"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16 lg:space-y-28">
          {careSettings.map((setting, index) => (
            <div
              key={setting.id}
              data-index={index}
              ref={(node) => {
                blockRefs.current[index] = node;
              }}
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-card border border-line lg:hidden">
                <SmartMedia
                  manifest={manifest}
                  slot={setting.id}
                  alt={setting.name}
                  index={index}
                  sizes="100vw"
                />
                <Grain />
              </div>

              <p className="text-xs text-ink-soft">
                {String(index + 1).padStart(2, "0")} / {String(careSettings.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl tracking-tight text-ink sm:text-3xl">{setting.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink">{setting.reality}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {setting.builds.map((build) => (
                  <li key={build} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-500"
                    />
                    {build}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- pathway */

export function CarePathway() {
  const scope = useRef<HTMLDivElement | null>(null);
  const line = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.registerPlugin(ScrollTrigger);
      if (!line.current) return;
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top 65%", end: "bottom 75%", scrub: 0.4 },
        }
      );
    },
    { scope }
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700"><span aria-hidden="true" className="h-px w-6 bg-teal-500" />The pathway</p>
        <h2 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Follow one patient from referral to paid claim.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Most healthcare software is sold as modules. Patients do not experience modules, they
          experience a pathway, and every handover on it is where the work gets lost.
        </p>
      </div>

      <div ref={scope} className="relative mt-14 pl-8 sm:pl-12">
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-[15px]"
        />
        <span
          ref={line}
          aria-hidden="true"
          className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-teal-500 sm:left-[15px]"
        />

        <ol className="space-y-10">
          {carePathway.map((item, index) => (
            <motion.li
              key={item.stage}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, ease }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 h-[7px] w-[7px] rounded-full bg-teal-500 sm:-left-12 sm:ml-3"
              />
              <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <p className="text-sm font-medium text-ink">
                  <span className="mr-2 text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
                  {item.stage}
                </p>
                <div>
                  <p className="text-base leading-relaxed text-ink">{item.system}</p>
                  <p className="mt-1.5 text-sm text-ink-soft">Removes: {item.removes}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- product loops */

export function ProductDemos({ manifest }: { manifest: MediaManifest }) {
  return (
    <section className="border-y border-line bg-veil/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700"><span aria-hidden="true" className="h-px w-6 bg-teal-500" />Product</p>
        <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            The screens your staff will actually live in.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Interfaces designed for gloves, corridors and a shift that started nine hours ago.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {productDemos.map((demo, index) => (
            <motion.article
              key={demo.slot}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease }}
              className="group overflow-hidden rounded-card border border-line bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <SmartMedia
                  manifest={manifest}
                  slot={demo.slot}
                  alt={demo.name}
                  index={index + 2}
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  fallback={<DemoMock kind={demo.slot.replace("demo-", "") as "flow-board" | "claims" | "intake"} />}
                />
                <Grain className="opacity-[0.12]" />
              </div>
              <div className="p-7">
                <p className="text-xs text-ink-soft">{demo.meta}</p>
                <h3 className="mt-2 text-lg tracking-tight text-ink">{demo.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{demo.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- modules */

export function ModuleMap() {
  return (
    <section id="modules" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700"><span aria-hidden="true" className="h-px w-6 bg-teal-500" />Module map</p>
        <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Eighteen modules. You start with two.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Nobody replaces a hospital estate in one project. We build the module that is costing you
          most, prove it on one site, then extend along the pathway.
        </p>

        <div className="mt-14 space-y-14">
          {moduleGroups.map((group) => (
            <div key={group.group}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
                <h3 className="text-xl tracking-tight text-ink">{group.group}</h3>
                <p className="text-sm text-ink-soft">{group.note}</p>
              </div>
              <div className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease }}
                    className="bg-surface p-7 transition-colors hover:bg-veil"
                  >
                    <h4 className="text-base font-medium text-ink">{item.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- ai */

const extractedFields = [
  { label: "Patient", value: "Redacted, M, 67" },
  { label: "Referred by", value: "Dr A. Basu, Cardiology" },
  { label: "Reason", value: "Exertional chest pain, 3 weeks" },
  { label: "Priority", value: "Urgent, 2 week target" },
  { label: "Requested", value: "Stress echo, lipid panel" },
];

export function AiLayer() {
  const [split, setSplit] = useState(48);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700"><span aria-hidden="true" className="h-px w-6 bg-teal-500" />Applied AI</p>
        <h2 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
              AI where the paperwork is, not where the diagnosis is.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We do not build systems that make clinical decisions. We build systems that remove
              the typing, chasing and re-keying around them, and every output is reviewed by a
              person before it counts.
            </p>
            <dl className="mt-10 divide-y divide-line border-t border-line">
              {aiCapabilities.map((capability) => (
                <div
                  key={capability.name}
                  className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-ink">{capability.name}</dt>
                  <dd className="text-sm leading-relaxed text-ink-soft">{capability.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <CompareSlider
              value={split}
              onChange={setSplit}
              leftLabel="Inbound referral"
              rightLabel="Structured record"
              left={
                <div className="h-full bg-veil p-8 pt-16">
                  <div className="space-y-2.5">
                    {[92, 78, 96, 64, 88, 52, 84, 70, 90, 46].map((width, index) => (
                      <span
                        key={index}
                        className="block h-2.5 rounded-full bg-ink/10"
                        style={{ width: width + "%" }}
                      />
                    ))}
                  </div>
                </div>
              }
              right={
                <div className="h-full bg-surface p-8 pt-16">
                  <ul className="divide-y divide-line rounded-[14px] border border-line">
                    {extractedFields.map((field) => (
                      <li
                        key={field.label}
                        className="flex items-center justify-between gap-4 px-4 py-3.5"
                      >
                        <span className="text-xs text-ink-soft">{field.label}</span>
                        <span className="whitespace-nowrap text-sm text-ink">{field.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <p className="mt-4 text-xs text-ink-soft">
              Drag to compare. Nothing is written to the record until a person confirms it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
