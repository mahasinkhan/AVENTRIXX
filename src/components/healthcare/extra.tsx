"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaManifest } from "@/lib/healthcare-media";
import { buildVsBuy, commitments, faqs, galleryScreens, integrationGroups } from "@/lib/healthcare-extra";
import { DemoMock, Grain, SmartMedia } from "@/components/healthcare/media";

const ease = [0.16, 1, 0.3, 1] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700">
      <span aria-hidden="true" className="h-px w-6 bg-teal-500" />
      {children}
    </p>
  );
}

/* ------------------------------------------------ pinned screen gallery */

const galleryMocks: Record<string, "flow-board" | "claims" | "intake" | undefined> = {
  "gallery-intake": "intake",
  "gallery-ward": "flow-board",
  "gallery-claims": "claims",
};

export function ScreensGallery({ manifest }: { manifest: MediaManifest }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        if (!wrap.current || !track.current) return;
        const distance = () => track.current!.scrollWidth - wrap.current!.clientWidth;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 96px",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: wrap }
  );

  return (
    <section className="border-y border-line bg-ink text-ground">
      <div ref={wrap} className="overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-300">
            <span aria-hidden="true" className="h-px w-6 bg-teal-300" />
            One patient, five screens
          </p>
          <h2 className="max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            The pathway, as the people running it see it.
          </h2>
        </div>

        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-20 pt-12 lg:snap-none lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-24"
        >
          {galleryScreens.map((screen, index) => {
            const mock = galleryMocks[screen.slot];
            return (
              <article
                key={screen.slot}
                className="w-[82vw] shrink-0 snap-start sm:w-[34rem]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-ground/15">
                  <SmartMedia
                    manifest={manifest}
                    slot={screen.slot}
                    alt={screen.title}
                    index={index + 1}
                    sizes="(min-width: 640px) 34rem, 82vw"
                    fallback={mock ? <DemoMock kind={mock} /> : undefined}
                  />
                  <Grain className="opacity-[0.12]" />
                  <span className="absolute left-4 top-4 rounded-pill bg-ink/60 px-2.5 py-1 text-[11px] text-ground/80 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg tracking-tight">{screen.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ground/65">{screen.caption}</p>
              </article>
            );
          })}
          <div aria-hidden="true" className="w-6 shrink-0 lg:w-[20vw]" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- spotlight integrations */

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onPointerLeave={() => setPos({ x: -400, y: -400 })}
      className={cn("group relative overflow-hidden bg-surface", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at " + pos.x + "px " + pos.y + "px, rgba(20,184,166,0.16), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Eyebrow>Integrations</Eyebrow>
      <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        Built at the seams of what you already run.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        The value in healthcare software is rarely the new screen. It is the interface behind it
        that finally makes two systems agree. These are the ones we work with most.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {integrationGroups.map((group) => (
          <SpotlightCard key={group.group} className="p-7">
            <h3 className="text-sm font-medium text-ink">{group.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.systems.map((system) => (
                <li
                  key={system}
                  className="rounded-pill border border-line bg-surface px-3 py-1 text-xs text-ink-soft transition-colors group-hover:border-teal-500/30"
                >
                  {system}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-soft">
        Product names belong to their owners. Listing here means we have built against the
        interface, not that a partnership exists.
      </p>
    </section>
  );
}

/* ------------------------------------------------------- commitments */

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

export function Commitments() {
  return (
    <section className="border-y border-line bg-veil/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow>Pilot commitments</Eyebrow>
        <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Numbers we put in the contract, not the brochure.
        </h2>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => (
            <div key={item.label} className="bg-surface p-7">
              <dt className="text-4xl tracking-tight text-ink">
                <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- build vs buy */

export function BuildVsBuy() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Eyebrow>Build, buy, or both</Eyebrow>
      <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        Sometimes the honest answer is to buy.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        We will tell you when an off-the-shelf system is the right call. This is how we think about
        it, and what we say in the systems review.
      </p>

      <div className="mt-12 overflow-x-auto rounded-card border border-line">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-veil/60 text-xs text-ink-soft">
              <th className="px-5 py-4 font-medium">Criterion</th>
              <th className="px-5 py-4 font-medium">Off the shelf</th>
              <th className="px-5 py-4 font-medium text-teal-700">Built with us</th>
              <th className="px-5 py-4 font-medium">Hybrid</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-surface">
            {buildVsBuy.map((row) => (
              <tr key={row.criterion} className="transition-colors hover:bg-veil/50">
                <td className="px-5 py-4 font-medium text-ink">{row.criterion}</td>
                <td className="px-5 py-4 text-ink-soft">{row.offTheShelf}</td>
                <td className="px-5 py-4 text-ink">{row.custom}</td>
                <td className="px-5 py-4 text-ink-soft">{row.hybrid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ faq */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Questions buyers ask</Eyebrow>
          <h2 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            The things procurement will want in writing.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Every answer here goes into the proposal verbatim. If something is missing, ask and we
            will add it.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className={cn("text-base transition-colors", isOpen ? "text-ink" : "text-ink-soft hover:text-ink")}>
                    {item.q}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300",
                      isOpen ? "rotate-180 text-teal-700" : ""
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- magnetic link */

export function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.span
      animate={reduce ? undefined : offset}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.4 }}
      onPointerMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: (event.clientX - rect.left - rect.width / 2) * 0.25,
          y: (event.clientY - rect.top - rect.height / 2) * 0.35,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.span>
  );
}
