import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES_HREF, getIndustry, industries, industrySlugs } from "@/lib/industries";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industries | AVENTRIXX" };
  return {
    title: industry.name + " software and AI | AVENTRIXX",
    description: industry.intro,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const others = industries.filter((item) => item.slug !== industry.slug);

  return (
    <main className="bg-ground">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <Link href={INDUSTRIES_HREF} className="transition-colors hover:text-ink">
            Industries
          </Link>
          <span aria-hidden="true" className="px-2">
            /
          </span>
          <span className="text-ink">{industry.name}</span>
        </nav>

        <h1 className="mt-8 max-w-4xl text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {industry.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{industry.intro}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-medium text-ground transition-opacity hover:opacity-90"
          >
            Start a project <span aria-hidden="true">&#8594;</span>
          </Link>
          <Link
            href={INDUSTRIES_HREF}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-6 py-3 text-sm text-ink transition-colors hover:bg-veil"
          >
            All industries
          </Link>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
          {industry.facts.map((fact) => (
            <div key={fact.label} className="bg-surface p-6">
              <dt className="text-2xl tracking-tight text-ink">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-line bg-veil/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">What usually breaks first</h2>
          <ul className="divide-y divide-line border-t border-line">
            {industry.problems.map((problem) => (
              <li key={problem} className="py-4 text-base leading-relaxed text-ink-soft">
                {problem}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">What we build</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {industry.solutions.map((solution) => (
            <article key={solution.title} className="bg-surface p-8">
              <h3 className="text-lg tracking-tight text-ink">{solution.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{solution.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl tracking-tight text-ink">Typical stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {industry.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl tracking-tight text-ink">How we handle your data</h2>
            <ul className="mt-6 space-y-3">
              {industry.standards.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-veil/50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl tracking-tight text-ink">Other sectors we work in</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={INDUSTRIES_HREF + "/" + item.slug}
                  className="inline-flex rounded-pill border border-line bg-surface px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-veil hover:text-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
