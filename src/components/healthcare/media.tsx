"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import type { MediaManifest } from "@/lib/healthcare-media";

/* ----------------------------------------------------------------- grain */

export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[url(/media/noise.png)] bg-repeat opacity-[0.16] mix-blend-overlay",
        className
      )}
    />
  );
}

/* ---------------------------------------------------------- aurora art */

const palettes = [
  ["bg-teal-400/50", "bg-indigo-500/45", "bg-violet-500/35"],
  ["bg-sky-400/50", "bg-violet-500/45", "bg-teal-400/30"],
  ["bg-emerald-400/45", "bg-teal-500/45", "bg-indigo-500/35"],
  ["bg-indigo-400/50", "bg-sky-500/40", "bg-fuchsia-500/25"],
  ["bg-cyan-400/50", "bg-blue-600/45", "bg-violet-500/30"],
  ["bg-teal-300/45", "bg-emerald-600/40", "bg-sky-500/30"],
];

export function AuroraFallback({ index = 0, slot }: { index?: number; slot?: string }) {
  const reduce = useReducedMotion();
  const [a, b, c] = palettes[index % palettes.length];
  const drift = reduce ? {} : { x: [0, 50, 0], y: [0, 30, 0] };
  const driftAlt = reduce ? {} : { x: [0, -40, 0], y: [0, -50, 0] };

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <motion.span
        aria-hidden="true"
        className={cn("absolute -left-[15%] -top-[20%] h-[75%] w-[65%] rounded-full blur-3xl", a)}
        animate={drift}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className={cn("absolute -bottom-[25%] -right-[10%] h-[80%] w-[60%] rounded-full blur-3xl", b)}
        animate={driftAlt}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.span
        aria-hidden="true"
        className={cn("absolute left-[35%] top-[30%] h-[50%] w-[40%] rounded-full blur-3xl", c)}
        animate={reduce ? {} : { scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[38%] w-full text-teal-200"
      >
        <motion.path
          d="M0 260 L120 260 L150 260 L170 220 L190 300 L210 200 L235 320 L255 260 L300 260 L800 260"
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
        />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,transparent,rgba(0,0,0,0.55))]" />

      {process.env.NODE_ENV === "development" && slot ? (
        <span className="absolute bottom-2 right-3 rounded-pill bg-ground/10 px-2 py-0.5 text-[10px] text-ground/70">
          add /media/healthcare/{slot}.mp4
        </span>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- demo mocks */

const bedTiles = [
  ["12", "occ"], ["13", "occ"], ["14", "clean"], ["15", "ready"],
  ["16", "occ"], ["17", "block"], ["18", "occ"], ["19", "ready"],
  ["20", "occ"], ["21", "clean"], ["22", "occ"], ["23", "occ"],
];

const tileTone: Record<string, string> = {
  occ: "bg-ground/10 text-ground/80",
  clean: "bg-amber-400/25 text-amber-200",
  ready: "bg-emerald-400/25 text-emerald-200",
  block: "bg-rose-400/25 text-rose-200",
};

const claimRows = [
  { id: "CLM-20481", score: 92, tag: "Clean", tone: "emerald" },
  { id: "CLM-20482", score: 41, tag: "Fix", tone: "rose" },
  { id: "CLM-20483", score: 77, tag: "Review", tone: "amber" },
  { id: "CLM-20484", score: 95, tag: "Clean", tone: "emerald" },
];

function tagTone(tone: string) {
  if (tone === "emerald") return "bg-emerald-500/12 text-emerald-700";
  if (tone === "rose") return "bg-rose-500/12 text-rose-700";
  return "bg-amber-500/15 text-amber-700";
}

export function DemoMock({ kind }: { kind: "flow-board" | "claims" | "intake" }) {
  if (kind === "flow-board") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-ink p-5 text-ground">
        <div className="flex items-center justify-between text-[11px] text-ground/60">
          <span>Ward 3B</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> 18 of 24 occupied
          </span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {bedTiles.map(([bed, state]) => (
            <div
              key={bed}
              className={cn("rounded-[10px] px-2 py-2.5 text-[11px] font-medium", tileTone[state])}
            >
              {bed}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3 text-[10px] text-ground/50">
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />Ready</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />Cleaning</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-rose-300" />Blocked</span>
        </div>
      </div>
    );
  }

  if (kind === "claims") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-surface p-5">
        <div className="flex items-center justify-between text-[11px] text-ink-soft">
          <span>Pre-submission queue</span>
          <span>Today</span>
        </div>
        <ul className="mt-3 divide-y divide-line rounded-[12px] border border-line">
          {claimRows.map((row) => (
            <li key={row.id} className="flex items-center gap-3 px-3 py-2.5">
              <span className="w-20 text-[11px] text-ink">{row.id}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-veil">
                <span
                  className={cn(
                    "block h-full rounded-full",
                    row.tone === "emerald" ? "bg-emerald-500" : row.tone === "rose" ? "bg-rose-500" : "bg-amber-500"
                  )}
                  style={{ width: row.score + "%" }}
                />
              </span>
              <span className={cn("rounded-pill px-2 py-0.5 text-[10px] font-medium", tagTone(row.tone))}>
                {row.tag}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-[12px] border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-800">
          CLM-20482: modifier 25 missing on line 2. Payer denies 84% of these.
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(90%_70%_at_50%_0%,rgba(45,212,191,0.28),transparent)] bg-ink">
      <div className="absolute left-1/2 top-6 w-[58%] -translate-x-1/2 rounded-[22px] border border-ground/15 bg-surface p-4 shadow-lift">
        <div className="flex items-center justify-between text-[10px] text-ink-soft">
          <span>Step 3 of 4</span>
          <span>Coverage</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-veil">
          <span className="block h-full w-3/4 rounded-full bg-teal-500" />
        </div>
        <div className="mt-4 space-y-2.5">
          <div className="rounded-[10px] border border-line px-3 py-2 text-[11px] text-ink">Insurer: Apex Health</div>
          <div className="rounded-[10px] border border-line px-3 py-2 text-[11px] text-ink">Member ID: 88 1042 7</div>
          <div className="flex items-center justify-between rounded-[10px] bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-700">
            <span>Eligibility</span>
            <span className="font-medium">Verified</span>
          </div>
        </div>
        <div className="mt-4 rounded-pill bg-ink py-2 text-center text-[11px] font-medium text-ground">
          Continue
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- smart media */

export function SmartMedia({
  manifest,
  slot,
  alt,
  index = 0,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority = false,
  fallback,
}: {
  manifest: MediaManifest;
  slot: string;
  alt: string;
  index?: number;
  sizes?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const asset = manifest[slot];
  const video = asset?.video;
  const poster = asset?.poster;

  if (video && !reduce) {
    return (
      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={video} />
      </video>
    );
  }

  if (poster) {
    return (
      <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    );
  }

  if (fallback) return <>{fallback}</>;
  return <AuroraFallback index={index} slot={slot} />;
}

/* -------------------------------------------------------------- parallax */

export function Parallax({ children, amount = 40 }: { children: React.ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  if (reduce) {
    return (
      <div ref={ref} className="absolute inset-0">
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div style={{ y, top: -amount, bottom: -amount }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------- marquee */

export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface py-4">
      <motion.div
        className="flex w-max items-center gap-12 pr-12"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-ink-soft">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-teal-500" />
            {item}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface to-transparent" />
    </div>
  );
}

/* -------------------------------------------------------- compare slider */

export function CompareSlider({
  left,
  right,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="relative min-h-[27rem] overflow-hidden rounded-card border border-line bg-surface">
      <div className="absolute inset-0">{left}</div>
      <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 " + value + "%)" }}>
        {right}
      </div>

      <span aria-hidden="true" className="absolute inset-y-0 w-px bg-teal-500" style={{ left: value + "%" }} />
      <span
        aria-hidden="true"
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal-500/40 bg-surface text-xs text-teal-700 shadow-lift"
        style={{ left: value + "%" }}
      >
        &#8596;
      </span>

      <span className="pointer-events-none absolute left-4 top-4 rounded-pill bg-surface/90 px-3 py-1 text-xs text-ink-soft">
        {leftLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-pill bg-surface/90 px-3 py-1 text-xs text-ink-soft">
        {rightLabel}
      </span>

      <input
        type="range"
        min={4}
        max={96}
        value={value}
        aria-label="Compare inbound document with structured record"
        onChange={(event) => onChange(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
