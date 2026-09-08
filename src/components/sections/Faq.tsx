"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { CONTACT, FAQ } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    /*
       The gold half of the page's last pair. Retiring the Car Lovers Club
       took a dark row out from between the testimonials and the map, so the
       tail was re-balanced: map black, questions gold. The cards stay dark
       tiles — `surface-on-gold` is the system's answer to a panel on a band.
    */
    <section className="bg-gold-wash w-full py-16 lg:py-[104px]">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHead title="FAQs" tone="gold" />
              {/* Two rows, each with its own mark. Run together as one
                  sentence the number and the address were the smallest thing
                  in the column and the email wrapped mid-domain. */}
              <Reveal delay={3}>
                <p className="mt-6 text-[15px] leading-[25px] font-normal text-ink/75">
                  Something not covered here?
                </p>
              </Reveal>

              <Reveal delay={4}>
                <ul className="mt-6 flex flex-col gap-4">
                  <li>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="group flex items-center gap-3.5 text-[19px] leading-none font-semibold text-ink transition-colors hover:text-ink/70 lg:text-[21px]"
                    >
                      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-ink/10 ring-1 ring-ink/25 transition-colors group-hover:bg-ink/20">
                        <Icon name="phone" size={20} className="text-ink" />
                      </span>
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="group flex items-center gap-3.5 text-[16px] leading-tight font-semibold break-all text-white transition-colors hover:text-gold lg:text-[17px]"
                    >
                      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-ink/10 ring-1 ring-ink/25 transition-colors group-hover:bg-ink/20">
                        <Icon name="mail" size={20} className="text-ink" />
                      </span>
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>

          <ul className="flex flex-col gap-3 lg:col-span-8">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  key={item.q}
                  as="li"
                  delay={Math.min(i, 4)}
                  className={`surface-on-gold block overflow-hidden rounded-[12px] transition-colors duration-300 ${
                    isOpen ? "ring-1 ring-gold/45" : ""
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 p-5 text-left text-[16px] leading-[25px] font-semibold text-white transition-colors hover:text-gold lg:text-[17px]"
                    >
                      <span>{item.q}</span>
                      <span
                        className={`mt-1 shrink-0 text-gold transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <Icon name="plus" size={18} strokeWidth={2} />
                      </span>
                    </button>
                  </h3>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        {item.a.map((p, j) => (
                          <p
                            key={j}
                            className="measure mt-2 text-[15px] leading-[25px] font-normal text-white/70"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
