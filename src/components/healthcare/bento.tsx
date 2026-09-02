"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { aiTiles, type MediaManifest } from "@/lib/healthcare-media";
import { Grain, SmartMedia } from "@/components/healthcare/media";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------- section image */

export function SectionMedia({
  manifest,
  slot,
  alt,
  index = 0,
  className,
  caption,
}: {
  manifest: MediaManifest;
  slot: string;
  alt: string;
  index?: number;
  className?: string;
  caption?: string;
}) {
  return (
    <figure>
      <div className={cn("relative overflow-hidden rounded-card border border-line", className)}>
        <SmartMedia manifest={manifest} slot={slot} alt={alt} index={index} sizes="(min-width: 1024px) 40vw, 100vw" />
        <Grain className="opacity-[0.12]" />
      </div>
      {caption ? <figcaption className="mt-3 text-xs text-ink-soft">{caption}</figcaption> : null}
    </figure>
  );
}

/* ---------------------------------------------------------- ai bento */

export function AiBento({ manifest }: { manifest: MediaManifest }) {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-teal-700">
          <span aria-hidden="true" className="h-px w-6 bg-teal-500" />
          Where AI earns its place
        </p>
        <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
          Five jobs we hand to a model. None of them is diagnosis.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Each one removes typing, chasing or re-keying from a person who should be doing
          something else. Each one keeps a human signature on the output.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiTiles.map((tile, index) => (
            <motion.article
              key={tile.slot}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.07, ease }}
              className={cn(
                "group relative overflow-hidden rounded-card border border-line bg-ink text-ground",
                tile.wide ? "sm:col-span-2" : "",
                tile.wide ? "min-h-[22rem]" : "min-h-[24rem]"
              )}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <SmartMedia
                  manifest={manifest}
                  slot={tile.slot}
                  alt={tile.tag}
                  index={index + 1}
                  sizes={tile.wide ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, 100vw"}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
              <Grain className="opacity-[0.14]" />

              <div className="relative flex h-full flex-col justify-end p-6 sm:p-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-ground/20 bg-ink/40 px-2.5 py-1 text-[11px] text-teal-200 backdrop-blur">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-teal-300" />
                  {tile.tag}
                </span>
                <h3 className={cn("mt-4 tracking-tight", tile.wide ? "max-w-lg text-2xl sm:text-3xl" : "text-xl")}>
                  {tile.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ground/75">{tile.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-soft">
          Models run inside your account. No patient data is used to train anything, ours or anyone
          else's.
        </p>
      </div>
    </section>
  );
}
