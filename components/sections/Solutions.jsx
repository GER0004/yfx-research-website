"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

const cards = [
  {
    title: "Algorithmic Trading Systems",
    desc: "Systematic strategies built on quantitative research, backtested and deployed on institutional-grade infrastructure.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="#334155" />
        <path d="M6 16l3.5-4.5 3.5 2.5 5-7" stroke="#60A5FA" />
        <circle cx="18" cy="7" r="1.2" fill="#60A5FA" />
      </svg>
    ),
  },
  {
    title: "Custom Automation",
    desc: "End-to-end automated workflows, integrations and pipelines tailored to operational and trading needs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" stroke="#60A5FA" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#334155" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#334155" />
      </svg>
    ),
  },
  {
    title: "Digital Platforms",
    desc: "Secure web applications, dashboards and client-facing products built for performance and reliability.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7l8-4 8 4" stroke="#60A5FA" />
        <path d="M4 12l8-4 8 4" stroke="#60A5FA" opacity="0.6" />
        <path d="M4 17l8-4 8 4" stroke="#60A5FA" opacity="0.35" />
      </svg>
    ),
  },
  {
    title: "Research & Intelligence",
    desc: "Data analysis, market research and AI-driven intelligence systems for informed decision-making.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="6" stroke="#60A5FA" />
        <path d="M21 21l-4.35-4.35" stroke="#334155" />
      </svg>
    ),
  },
];

function DiagonalLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 animate-diagonal-drift"
        viewBox="0 0 2000 1400"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="diag-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="20%" stopColor="#2563EB" stopOpacity="1" />
            <stop offset="80%" stopColor="#2563EB" stopOpacity="1" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[120, 260, 400, 540, 680, 820, 960, 1100, 1240].map((y, i) => (
          <line
            key={i}
            x1="-100" y1={y + 80} x2="2100" y2={y - 80}
            stroke="url(#diag-fade)"
            strokeWidth="0.6"
            opacity={0.03 + (i % 3) * 0.01}
          />
        ))}
      </svg>
    </div>
  );
}

function SolutionCard({ card, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative bg-yfx-base border border-border-subtle rounded-card p-5 sm:p-7 flex flex-col transition-all duration-300 hover:border-yfx-brand/25 hover:-translate-y-1 hover:bg-[#0d1222] hover:shadow-[0_4px_40px_rgba(37,99,235,0.10)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] border border-border bg-yfx-card flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-yfx-brand/30 group-hover:bg-yfx-elevated group-hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
        {card.icon}
      </div>
      <h3 className="mt-5 sm:mt-6 text-sm font-medium text-text-primary tracking-[0.005em]">
        {card.title}
      </h3>
      <div
        className={`mt-3 sm:mt-4 w-6 h-px line-draw ${visible ? "line-draw-visible" : ""}`}
        style={{
          background: "rgba(37,99,235,0.35)",
          animationDelay: `${index * 0.12 + 0.4}s`,
        }}
      />
      <p className="mt-3 sm:mt-4 text-xs text-text-muted leading-relaxed">
        {card.desc}
      </p>
    </div>
  );
}

export default function Solutions() {
  return (
    <section id="solutions" className="section-padding section-border relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-15%",
          left: "25%",
          width: "60%",
          height: "70%",
          background: "radial-gradient(ellipse 100% 100% at 50% 40%, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <DiagonalLines />
      <Container>
        <SectionLabel number="02" text="What We Build" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mb-10 sm:mb-14">
          <h2 className="text-h1 font-medium text-text-primary">
            Research.
            <br />
            Engineering.
            <br />
            Automation.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[420px] self-end pb-1">
            We design and build technology that operates autonomously —
            from algorithmic trading systems to custom digital platforms
            and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card, i) => (
            <SolutionCard key={i} card={card} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
