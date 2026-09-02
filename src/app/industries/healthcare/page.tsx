import type { Metadata } from "next";
import Link from "next/link";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import {
  AiLayer,
  CarePathway,
  CareSettingsScroll,
  HealthcareHero,
  ModuleMap,
  ProductDemos,
} from "@/components/healthcare/sections";
import { Grain, Marquee, SmartMedia } from "@/components/healthcare/media";
import { AiBento, SectionMedia } from "@/components/healthcare/bento";
import {
  BuildVsBuy,
  Commitments,
  Faq,
  Integrations,
  MagneticLink,
  ScreensGallery,
} from "@/components/healthcare/extra";
import { complianceItems, engagementSteps } from "@/lib/healthcare";
import {
  MEDIA_PUBLIC_PATH,
  mediaSlots,
  standardsMarquee,
  type MediaManifest,
} from "@/lib/healthcare-media";

export const metadata: Metadata = {
  title: "Healthcare software and clinical AI | AVENTRIXX",
  description:
    "Clinical, operational and revenue systems for hospitals, nursing homes, clinics, diagnostics, pharmacy and home care. Integrated with your existing estate and handed over as code you own.",
};

const videoExtensions = ["mp4", "webm"];
const imageExtensions = ["jpg", "jpeg", "png", "webp", "avif"];

function scanMedia(): MediaManifest {
  const manifest: MediaManifest = {};
  let files: string[] = [];

  try {
    files = readdirSync(join(process.cwd(), "public", "media", "healthcare"));
  } catch {
    return manifest;
  }

  for (const slot of mediaSlots) {
    const video = videoExtensions
      .map((extension) => slot + "." + extension)
      .find((name) => files.includes(name));
    const poster = imageExtensions
      .map((extension) => slot + "." + extension)
      .find((name) => files.includes(name));

    if (video || poster) {
      manifest[slot] = {
        video: video ? MEDIA_PUBLIC_PATH + "/" + video : undefined,
        poster: poster ? MEDIA_PUBLIC_PATH + "/" + poster : undefined,
      };
    }
  }

  return manifest;
}

export default function HealthcarePage() {
  const manifest = scanMedia();

  return (
    <main className="bg-ground">
      <HealthcareHero manifest={manifest} />

      <div className="mt-24">
        <Marquee items={standardsMarquee} />
      </div>

      <CareSettingsScroll manifest={manifest} />
      <CarePathway />
      <ScreensGallery manifest={manifest} />
      <ProductDemos manifest={manifest} />
      <ModuleMap />
      <Integrations />
      <AiLayer />
      <AiBento manifest={manifest} />
      <Commitments />
      <BuildVsBuy />

      <section className="border-y border-line bg-veil/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                Regulated data, handled like it.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">
                Security is not a slide at the end of our proposals. It shapes the data model, the
                hosting account and the access rules from the first sprint.
              </p>
              <SectionMedia
                manifest={manifest}
                slot="security"
                alt="Data centre corridor"
                index={3}
                className="mt-8 aspect-[4/3]"
                caption="Your cloud account, your region, your keys."
              />
            </div>
            <dl className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
              {complianceItems.map((item) => (
                <div key={item.name} className="bg-surface p-7">
                  <dt className="text-base font-medium text-ink">{item.name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            How a healthcare engagement actually runs.
          </h2>
          <SectionMedia
            manifest={manifest}
            slot="engagement"
            alt="Systems review workshop"
            index={5}
            className="aspect-[16/9]"
            caption="Week one of the systems review: the people doing the work, in the room."
          />
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3">
          {engagementSteps.map((step, index) => (
            <li key={step.step} className="bg-surface p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg tracking-tight text-ink">
                  <span className="mr-2 text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
                  {step.step}
                </h3>
                <span className="rounded-pill border border-line px-2.5 py-0.5 text-xs text-ink-soft">
                  {step.duration}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Faq />

      <section className="px-4 pb-24 pt-8 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-card border border-line">
          <div className="absolute inset-0">
            <SmartMedia
              manifest={manifest}
              slot="cta"
              alt="Clinical environment"
              index={4}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-ink/72" />
          <Grain className="opacity-[0.16]" />

          <div className="relative px-8 py-20 sm:px-14 sm:py-28">
            <h2 className="max-w-2xl text-3xl leading-tight tracking-tight text-ground sm:text-5xl">
              Tell us which part of the pathway is costing you most.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ground/80">
              Two weeks, your systems mapped, a costed build order at the end of it. If the answer
              is that you do not need new software, we will say so.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticLink
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-pill bg-ground px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Book a systems review <span aria-hidden="true">&#8594;</span>
              </MagneticLink>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 rounded-pill border border-ground/30 px-6 py-3 text-sm text-ground transition-colors hover:bg-ground/10"
              >
                Other industries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
