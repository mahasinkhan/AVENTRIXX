import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { industries, INDUSTRIES_HREF } from "../lib/industries";

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    items: ["Product engineering", "Data platforms", "Applied AI", "Cloud and DevOps"].map(
      (label) => ({ label, href: "#" }),
    ),
  },
  {
    title: "Industries",
    items: industries.map((i) => ({
      label: i.name,
      href: INDUSTRIES_HREF + "/" + i.slug,
    })),
  },
  {
    title: "Company",
    items: ["About", "Careers", "Insights", "Contact"].map((label) => ({
      label,
      href: "#",
    })),
  },
];

export default function SiteFooter() {
  return (
    <footer id="company" className="relative border-t border-line bg-veil">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <Image
                src="/img/aventrixx-logo.png"
                alt="Aventrixx"
                width={160}
                height={40}
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Enterprise software, data platforms and applied AI &mdash;
              delivered by senior engineers, owned outright by you.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-iris"
            >
              hello@aventrixx.dev
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="type-eyebrow">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-soft transition-colors duration-300 hover:text-iris"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            &copy; 2026 Aventrixx. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Engineered with Next.js &middot; Shipped globally
          </p>
        </div>
      </div>
    </footer>
  );
}
