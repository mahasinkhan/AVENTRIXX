import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES_HREF, industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries | AVENTRIXX",
  description:
    "Product engineering, data platforms and applied AI for healthcare, finance, logistics, education, tourism, hotels and restaurants.",
};

export default function IndustriesPage() {
  return (
    <main className="bg-ground">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pt-36">
        <p className="text-xs tracking-[0.2em] text-ink-soft">INDUSTRIES</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          We learn the operations first, then write the software.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every sector below runs on a different set of constraints: regulators, margins, shift
          patterns, peak load. Pick yours and see what we build for it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug} className="bg-surface">
              <Link
                href={INDUSTRIES_HREF + "/" + industry.slug}
                className="flex h-full flex-col justify-between gap-8 p-8 transition-colors hover:bg-veil"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl tracking-tight text-ink">{industry.name}</h2>
                    {industry.featured ? (
                      <span className="rounded-pill border border-line px-2 py-0.5 text-[11px] text-ink-soft">
                        Live now
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{industry.menuLine}</p>
                </div>
                <span className="text-sm text-ink">
                  View sector <span aria-hidden="true">&#8594;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
