"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const shots = [
  {
    src: "/img/studio-standup.jpg",
    alt: "Engineering team discussing work at a desk",
    cls: "sm:col-span-7 h-72 lg:h-[26rem]",
    drift: 9,
  },
  {
    src: "/img/studio-pair.jpg",
    alt: "Developers pair programming at one laptop",
    cls: "sm:col-span-5 h-72 lg:h-[26rem]",
    drift: -8,
  },
  {
    src: "/img/studio-whiteboard.jpg",
    alt: "Two engineers working through a design at a whiteboard",
    cls: "sm:col-span-5 h-64 lg:h-[22rem]",
    drift: 11,
  },
  {
    src: "/img/studio-desk.jpg",
    alt: "Desk with a laptop and a notebook of sketches",
    cls: "sm:col-span-3 h-64 lg:h-[22rem]",
    drift: -6,
  },
  {
    src: "/img/studio-detail.jpg",
    alt: "Quiet studio interior in morning light",
    cls: "sm:col-span-4 h-64 lg:h-[22rem]",
    drift: 8,
  },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".st-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.utils.toArray<HTMLElement>(".st-shot").forEach((el) => {
        const drift = Number(el.dataset.drift ?? 8);
        gsap.fromTo(
          el.querySelector("img"),
          { yPercent: -drift, scale: 1.16 },
          {
            yPercent: drift,
            scale: 1.16,
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

      gsap.set(".st-shot", { y: 40, opacity: 0 });
      ScrollTrigger.batch(".st-shot", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.11,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="studio" className="section-y relative scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="st-head-item type-eyebrow">Inside the studio</p>
            <h2 className="st-head-item mt-6 max-w-2xl type-h2">
              Small teams, <span className="inkflow">senior hands.</span>
            </h2>
          </div>
          <p className="st-head-item max-w-sm type-body">
            You get the people in these rooms. No offshore handoff after the
            pitch, no rotating bench, no name on a slide you never meet.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-12">
          {shots.map((s) => (
            <figure
              key={s.src}
              data-drift={s.drift}
              className={"st-shot img-frame img-warm relative " + s.cls}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="img-grade object-cover object-center"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
