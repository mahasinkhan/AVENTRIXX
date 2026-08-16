"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sectors = [
  {
    name: "Financial services",
    copy: "Ledgers, reconciliation and reporting that survive audit and month-end.",
    src: "/img/sector-finance.jpg",
    tall: true,
  },
  {
    name: "Healthcare",
    copy: "Clinical tooling with traceability built into every answer.",
    src: "/img/sector-health.jpg",
  },
  {
    name: "Industrial and logistics",
    copy: "Telemetry, routing and planning at fleet scale.",
    src: "/img/sector-logistics.jpg",
  },
];

export default function Sectors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".sec-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>(".sec-media").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8, scale: 1.14 },
          {
            yPercent: 8,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });

      gsap.set(".sec-card", { y: 34, opacity: 0 });
      ScrollTrigger.batch(".sec-card", {
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
    <section ref={root} id="sectors" className="section-y relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="sec-head-item type-eyebrow">Sectors</p>
            <h2 className="sec-head-item mt-6 max-w-2xl type-h2">
              Regulated, high-volume, <span className="inkflow">unforgiving.</span>
            </h2>
          </div>
          <p className="sec-head-item max-w-sm type-body">
            The work we do best is where correctness is not negotiable and the
            data does not stop arriving.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {sectors.map((s) => (
            <Link
              href="#contact"
              key={s.name}
              className={
                "sec-card group relative flex flex-col justify-end overflow-hidden rounded-card border border-line p-7 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift " +
                (s.tall ? "min-h-[30rem] lg:row-span-2" : "min-h-80")
              }
            >
              <div className="img-tint img-grid absolute inset-0 overflow-hidden">
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="sec-media object-cover"
                  priority={false}
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent" />

              <div className="relative z-[3]">
                <h3 className="type-h3 text-ground">{s.name}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ground/75">
                  {s.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ground">
                  Discuss a project
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}



