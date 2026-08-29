"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "#services" },
  { label: "Platform", href: "#platform" },
  { label: "Work", href: "#work" },
  { label: "Company", href: "#company" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive("#" + hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const marked = hovered ?? active;

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-pill px-4 transition-all duration-500 ease-expo",
          scrolled
            ? "mt-3 border border-line bg-surface/75 py-2 shadow-lift backdrop-blur-xl"
            : "mt-5 border border-transparent py-3"
        )}
      >
<<<<<<< HEAD
        <Link href="/" className="group flex items-center shrink-0">
  <Image
    src="/img/Aventrix logo.png"
    alt="Aventrixx"
    width={220}
    height={70}
    priority
    className="h-14 w-auto object-contain"
  />
</Link>
=======
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[11px] bg-ink text-ground">
            <span className="absolute inset-0 bg-gradient-to-br from-iris via-iris-deep to-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative font-display text-sm font-bold">L</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Lumina
          </span>
        </Link>
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              className={cn(
                "relative rounded-pill px-4 py-2 text-sm transition-colors duration-300",
                marked === l.href ? "text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {marked === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className={cn(
                    "absolute inset-0 rounded-pill",
                    hovered === l.href ? "bg-veil" : "bg-iris-tint"
                  )}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden items-center gap-1.5 rounded-pill bg-ink px-5 py-2.5 text-sm font-medium text-ground transition-colors duration-300 ease-expo hover:bg-iris sm:inline-flex"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-surface text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="mx-auto mt-2 max-w-6xl rounded-card border border-line bg-surface/95 p-2 shadow-lift backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-[14px] px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-veil hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-[14px] bg-ink px-4 py-3 text-center text-sm font-medium text-ground"
            >
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
<<<<<<< HEAD
}
=======
}

>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
