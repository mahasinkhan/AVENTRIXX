"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Clock, Lock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const types = ["Product engineering", "Data platform", "Applied AI", "Not sure yet"];

const assurances = [
  { icon: Clock, title: "Reply within one business day", copy: "A senior engineer reads it, not a queue." },
  { icon: Users, title: "You talk to the builders", copy: "No account managers relaying requirements." },
  { icon: Lock, title: "NDA before anything sensitive", copy: "We sign yours; ours is one page." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [type, setType] = useState(types[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useGSAP(
    () => {
      gsap.from(".ct-item", {
        y: 28,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });
    },
    { scope: root }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative scroll-mt-24 border-t border-line bg-veil/40 section-y"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <p className="ct-item type-eyebrow">
              Start here
            </p>
            <h2 className="ct-item mt-6 type-h2">
              Tell us what is <span className="inkflow">actually broken.</span>
            </h2>
            <p className="ct-item mt-6 max-w-md text-base leading-relaxed text-muted">
              Send the problem, not a brief. We will come back with the
              questions that matter and an honest read on whether we are the
              right team for it.
            </p>

            <ul className="ct-item mt-12 space-y-7">
              {assurances.map((a) => (
                <li key={a.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-line bg-surface text-iris">
                    <a.icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{a.title}</p>
                    <p className="mt-1 text-sm text-muted">{a.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ct-item">
            <div className="relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-lift sm:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex min-h-96 flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-iris-tint text-iris-deep">
                      <Check className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                      Message received
                    </h3>
                    <p className="mt-3 max-w-xs text-sm text-muted">
                      A senior engineer will reply within one business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease }}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block">
                        <span className="type-eyebrow">
                          Name
                        </span>
                        <input
                          required
                          name="name"
                          className="mt-3 w-full rounded-[14px] border border-line bg-ground px-4 py-3 text-sm text-ink transition-colors duration-300 outline-none placeholder:text-muted focus:border-iris"
                          placeholder="Jordan Ellis"
                        />
                      </label>
                      <label className="block">
                        <span className="type-eyebrow">
                          Work email
                        </span>
                        <input
                          required
                          type="email"
                          name="email"
                          className="mt-3 w-full rounded-[14px] border border-line bg-ground px-4 py-3 text-sm text-ink transition-colors duration-300 outline-none placeholder:text-muted focus:border-iris"
                          placeholder="jordan@company.com"
                        />
                      </label>
                    </div>

                    <div>
                      <span className="type-eyebrow">
                        What do you need
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {types.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className={cn(
                              "rounded-pill border px-4 py-2 text-sm transition-colors duration-300 ease-expo",
                              type === t
                                ? "border-iris bg-iris-tint text-iris-deep"
                                : "border-line bg-ground text-ink-soft hover:border-line-strong"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block">
                      <span className="type-eyebrow">
                        The problem
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        className="mt-3 w-full resize-none rounded-[14px] border border-line bg-ground px-4 py-3 text-sm leading-relaxed text-ink transition-colors duration-300 outline-none placeholder:text-muted focus:border-iris"
                        placeholder="Our nightly reconciliation takes nine hours and blocks month-end close."
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-6 py-4 text-sm font-medium text-ground transition-colors duration-300 ease-expo hover:bg-iris disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending" : "Send it over"}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                    </button>

                    <p className="text-center font-mono text-[11px] text-muted">
                      Selected: {type} &middot; No sales sequence, no newsletter
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

