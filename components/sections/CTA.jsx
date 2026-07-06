"use client";

import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const topics = [
  "Custom development projects",
  "Algorithmic trading infrastructure",
  "Technology partnerships",
  "Future collaboration",
];

export default function CTA() {
  return (
    <section id="contact" className="section-padding section-border relative overflow-hidden">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "20%", left: "40%", width: "20%", height: "30%", background: "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.015) 0%, transparent 60%)", filter: "blur(40px)" }} />
      <Container>
        <SectionLabel number="08" text="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 items-start">
          <ScrollReveal>
            <div>
              <h2 className="text-h1 font-medium text-text-primary">
                Let&apos;s build
                <br />something together.
              </h2>
              <div className="mt-7 sm:mt-9">
                <Button variant="primary" className="w-full sm:w-auto justify-center sm:justify-start !px-7 !py-3 !text-sm">
                  Get in touch
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="pt-0 md:pt-2">
              <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[420px] mb-5 sm:mb-6">
                We are open to discussing new projects, custom development
                needs and strategic partnerships. If you are building
                something ambitious, we would like to hear about it.
              </p>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {topics.map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-muted">
                    <span className="w-[5px] h-[5px] rounded-full bg-yfx-brand shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
