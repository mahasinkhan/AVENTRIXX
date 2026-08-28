import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Services",
    items: ["Product engineering", "Data platforms", "Applied AI", "Cloud and DevOps"],
  },
  {
    title: "Industries",
    items: ["Financial services", "Healthcare", "Retail", "Logistics"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Insights", "Contact"],
  },
];

export default function SiteFooter() {
  return (
    <footer id="company" className="relative border-t border-line bg-veil">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
<<<<<<< HEAD
            <div className="flex items-center">
              <Image
                src="/img/Aventrix logo.png"
                alt="Aventrixx"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
              />
=======
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-ink font-display text-sm font-bold text-ground">
                L
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Lumina
              </span>
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Enterprise software, data platforms and applied AI &mdash;
              delivered by senior engineers, owned outright by you.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-iris"
            >
<<<<<<< HEAD
              hello@aventrixx.dev
=======
              hello@lumina.dev
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
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
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-ink-soft transition-colors duration-300 hover:text-iris"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
<<<<<<< HEAD
            &copy; 2026 Aventrixx. All rights reserved.
=======
            &copy; 2026 Lumina. All rights reserved.
>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
          </p>
          <p className="font-mono text-xs text-muted">
            Engineered with Next.js &middot; Shipped globally
          </p>
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}
=======
}

>>>>>>> 93973e12078eae33579f343645cef6763e3f806b
