"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { INDUSTRIES_HREF, industries } from "@/lib/industries";

const featured = industries.find((industry) => industry.featured) ?? industries[0];

/**
 * Desktop nav item. Opens on hover and on click, closes on Escape or
 * outside click. Drop <IndustriesMenu /> into the desktop nav row.
 */
export function IndustriesMenu() {
  const [open, setOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState(featured.slug);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preview = industries.find((industry) => industry.slug === previewSlug) ?? featured;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="industries-panel"
        onClick={() => setOpen((value) => !value)}
        className={
          "inline-flex items-center gap-1 rounded-pill px-4 py-2 text-sm transition-colors hover:bg-veil hover:text-ink " +
          (open ? "bg-veil text-ink" : "text-ink-soft")
        }
      >
        Industries
        <ChevronDown
          aria-hidden="true"
          className={
            "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </button>

      <div
        id="industries-panel"
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-[min(56rem,calc(100vw_-_2rem))] -translate-x-1/2 pt-3"
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-card border border-line bg-surface/95 shadow-lift backdrop-blur-xl lg:grid-cols-[1.1fr_1fr]">
          <ul className="p-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={INDUSTRIES_HREF + "/" + industry.slug}
                  onFocus={() => setPreviewSlug(industry.slug)}
                  onMouseEnter={() => setPreviewSlug(industry.slug)}
                  onClick={() => setOpen(false)}
                  className={
                    "block rounded-[14px] px-4 py-3 transition-colors hover:bg-veil " +
                    (previewSlug === industry.slug ? "bg-veil" : "")
                  }
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium text-ink">{industry.name}</span>
                    {industry.featured ? (
                      <span className="rounded-pill border border-line px-2 py-0.5 text-[11px] text-ink-soft">
                        Live now
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                    {industry.menuLine}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden border-l border-line bg-veil/60 p-6 lg:block">
            <p className="text-sm font-medium text-ink">{preview.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{preview.intro}</p>
            <ul className="mt-5 space-y-2">
              {preview.solutions.slice(0, 3).map((solution) => (
                <li key={solution.title} className="flex gap-2 text-sm text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  {solution.title}
                </li>
              ))}
            </ul>
            <Link
              href={INDUSTRIES_HREF + "/" + preview.slug}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-2 text-sm font-medium text-ground transition-opacity hover:opacity-90"
            >
              Explore {preview.name.toLowerCase()}
              <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile accordion. Drop <IndustriesMenuMobile onNavigate={() => setOpen(false)} />
 * into the mobile panel, above the Our Projects link.
 */
export function IndustriesMenuMobile({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-veil hover:text-ink"
      >
        Industries
        <ChevronDown
          aria-hidden="true"
          className={
            "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </button>
      <ul hidden={!open} className="pb-1 pl-3">
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={INDUSTRIES_HREF + "/" + industry.slug}
              onClick={onNavigate}
              className="block rounded-[14px] px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-veil hover:text-ink"
            >
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndustriesMenu;
