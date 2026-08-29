"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  index: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: { label: string; items: string[] }[];
  image: string;
  imageAlt: string;
  imageSize: { width: number; height: number };
  chrome: string;
  url: string;
};

const projects: Project[] = [
  {
    index: "01",
    name: "TrainifyHub",
    category: "EdTech — Learning Management System",
    tagline:
      "One platform for individual course sales and company-wide compliance training.",
    summary:
      "TrainifyHub runs both sides of professional training from a single system: learners browse, buy and complete accredited courses, while organisations manage employees, license seats and track certification from a central admin console.",
    highlights: [
      "Video and document lessons, quizzes, mock tests and auto-issued certificates",
      "Organisation, manager, employee, instructor and super-admin roles with seat-based course licensing",
      "Stripe checkout with coupons, VAT handling, orders and invoicing",
      "Server-side rendering and dynamic sitemaps built for course-page SEO at scale",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Vike SSR", "Tailwind CSS", "TanStack Query", "Zustand"],
      },
      { label: "Backend", items: ["Django", "Django REST Framework"] },
      { label: "Data & infra", items: ["PostgreSQL", "Redis", "Celery", "AWS S3"] },
      { label: "Payments", items: ["Stripe"] },
    ],
    image: "/img/Trainifyhub.png",
    imageAlt: "TrainifyHub course platform landing page",
    imageSize: { width: 1907, height: 861 },
    chrome: "trainifyhub / courses / home",
    url: "https://trainifyhub.co.uk/",
  },
  {
    index: "02",
    name: "SpinDine",
    category: "RestaurantTech — Customer Engagement",
    tagline:
      "Turns first-time diners into repeat customers, without a third-party app.",
    summary:
      "SpinDine gives restaurants a direct line to their own customers: a QR-triggered spin-to-win reward loop, a self-growing customer database, and WhatsApp campaigns to bring people back — with an owner dashboard tracking every visit and redemption.",
    highlights: [
      "QR-based spin-and-reward loop with configurable cooldowns and redemption tracking",
      "Customer database with Excel/CSV import and automatic phone-number linking",
      "WhatsApp Business Cloud API campaigns with per-message delivery tracking",
      "Restaurant-level data isolation with role-based staff permissions",
    ],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript"] },
      { label: "Backend", items: ["Django", "Django REST Framework"] },
      { label: "Data", items: ["PostgreSQL"] },
      { label: "Integrations", items: ["WhatsApp Cloud API", "OpenPyXL"] },
    ],
    image: "/img/Spindine.png",
    imageAlt: "SpinDine restaurant owner dashboard",
    imageSize: { width: 1897, height: 867 },
    chrome: "spindine / owner / dashboard",
    url: "https://www.spindine.in/",
  },
];

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".proj-head-item", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "expo.out",
      });

      gsap.set(".proj-row", { y: 40, opacity: 0 });
      ScrollTrigger.batch(".proj-row", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            overwrite: true,
          }),
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative pt-32 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="proj-head-item type-eyebrow">Our projects</p>
        <h1 className="proj-head-item mt-6 max-w-2xl type-h1">
          Software we&rsquo;ve <span className="inkflow">designed and shipped.</span>
        </h1>
        <p className="proj-head-item mt-6 max-w-xl type-lead">
          A running record of platforms we&rsquo;ve built end-to-end &mdash;
          architecture, engineering and the parts that keep them alive in
          production. Two so far, with more landing as they ship.
        </p>
        <div className="hairline-fade proj-head-item mt-14 h-px w-full" />
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-24 px-6 md:mt-28 md:gap-32">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="proj-row grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <span className="font-mono text-xs tracking-[0.24em] text-muted">
                {p.index}
              </span>
              <p className="type-eyebrow mt-4">{p.category}</p>
              <h2 className="mt-4 type-h2">{p.name}</h2>
              <p className="mt-4 type-lead">{p.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {p.summary}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-pill bg-iris" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-7 space-y-3.5">
                {p.stack.map((g) => (
                  <div key={g.label} className="flex flex-wrap items-center gap-2">
                    <span className="type-eyebrow">{g.label}</span>
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-pill border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-iris"
                >
                  Visit live site
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-300 hover:text-iris"
                >
                  Start a project like this
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name} in a new tab`}
                className="group block overflow-hidden rounded-card border border-line bg-surface shadow-glow transition-[border-color,box-shadow] duration-500 ease-expo hover:border-line-strong hover:shadow-lift"
              >
                <div className="flex items-center gap-3 border-b border-line bg-veil/60 px-5 py-3">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-pill bg-line-strong" />
                  </span>
                  <span className="font-mono text-xs text-muted">{p.chrome}</span>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-iris" />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={p.imageSize.width}
                    height={p.imageSize.height}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full transition-transform duration-700 ease-expo group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-6 md:mt-32">
        <div className="hairline-fade h-px w-full" />
        <div className="mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md type-body">
            More case studies land here as they ship. If you&rsquo;re building
            something in this shape, we&rsquo;d like to hear about it.
          </p>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-ink px-6 py-3.5 text-sm font-medium text-ground transition-colors duration-300 ease-expo hover:bg-iris"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
