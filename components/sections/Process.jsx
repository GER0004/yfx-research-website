"use client";

import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  { title: "Research",                desc: "Market analysis, data exploration and hypothesis development." },
  { title: "Architecture",           desc: "System design, technology selection and infrastructure planning." },
  { title: "Development",            desc: "Modular implementation with clean, production-ready code." },
  { title: "Testing",                desc: "Backtesting, stress testing and comprehensive quality assurance." },
  { title: "Deployment",             desc: "Secure deployment with monitoring, logging and fail-safes." },
  { title: "Continuous Improvement", desc: "Ongoing optimization, research iteration and system refinement." },
];

export default function Process() {
  return (
    <section id="process" className="section-padding section-border relative overflow-hidden">
      {/* Flow lines connecting steps */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1280 800" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="proc-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="0" stopColor="#2563EB" />
            <stop offset="30%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="70%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="100%" stopOpacity="0" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <path d="M200 100 Q200 400 640 400 T1080 700" stroke="url(#proc-fade)" strokeWidth="0.7" opacity="0.045" fill="none" />
        <path d="M280 80 Q300 350 700 380 T1100 680" stroke="url(#proc-fade)" strokeWidth="0.7" opacity="0.035" fill="none" />
      </svg>
      <Container>
        <SectionLabel number="06" text="Development Process" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mb-10 sm:mb-14">
          <ScrollReveal>
            <h2 className="text-h1 font-medium text-text-primary">
              From research
              <br />to production.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[420px] self-end pb-1">
              Every system follows a disciplined workflow — from initial
              research through architecture, development, testing and
              deployment into continuous improvement.
            </p>
          </ScrollReveal>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-[15px] sm:left-[17px] top-6 bottom-6 w-[2px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.3) 8%, rgba(37,99,235,0.15) 50%, rgba(37,99,235,0.3) 92%, transparent)",
            }}
          />

          <div className="flex flex-col gap-3 sm:gap-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 sm:gap-6 items-start group">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center shrink-0 pt-5 sm:pt-6 relative z-10">
                    <div
                      className="w-[14px] h-[14px] rounded-full border-2 border-yfx-brand/40 bg-yfx-black relative group-hover:border-yfx-brand transition-colors duration-500"
                      style={{ boxShadow: "0 0 12px rgba(37,99,235,0.15)" }}
                    >
                      <div className="absolute inset-[3px] rounded-full bg-yfx-brand/40 group-hover:bg-yfx-brand transition-all duration-500" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 process-card bg-yfx-base border border-border-subtle rounded-card p-5 sm:p-6">
                    <span className="block font-mono text-[10px] sm:text-[11px] text-text-faint mb-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-text-primary mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-[400px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
