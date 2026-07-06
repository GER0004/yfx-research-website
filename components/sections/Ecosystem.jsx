"use client";

import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ── Node data ─────────────────────────────────────────────── */

const nodes = [
  {
    id: "research",
    title: "YFX Research",
    desc: "Market analysis, algorithm development and next-generation research methodologies.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  },
  {
    id: "dev",
    title: "Custom Development",
    desc: "Tailored solutions and automation systems built around your unique needs.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.3"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>,
  },
  {
    id: "platform",
    title: "YFX Trading Platform",
    desc: "Unified platform for algorithmic trading, account management and performance analytics.",
    coming: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 21h10M12 17v4"/><path d="M7 10l3-3 2 2 3-4 2 3"/></svg>,
  },
  {
    id: "intel",
    title: "Market Intelligence",
    desc: "AI-powered insights, real-time market context and intelligent data processing.",
    coming: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3.6 4.7 7.7 4.7 10S15 21.4 12 22c-3-3.6-4.7-7.7-4.7-10S9 5.6 12 2z"/></svg>,
  },
  {
    id: "dashboard",
    title: "Dashboard & Analytics",
    desc: "Advanced dashboards, performance reporting and system analytics in one interface.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
];

/*
 * ── Geometry (mathematically exact) ───────────────────────────
 *
 * Container:    760 × 650
 * Engine:       230 × 240   center = (380, 325)
 * Cards:        200 × 175   (all identical)
 * Gap:          35px        (uniform between every card edge and engine edge)
 *
 * Card positions (top-left):
 *   Research    (280,   0)   center = (380,  87)   ← directly above
 *   Dev         ( 30, 237)   center = (130, 325)   ← directly left
 *   Platform    (530, 237)   center = (630, 325)   ← directly right  (mirror of Dev)
 *   Intel       ( 90, 480)   center = (190, 567)   ← bottom-left
 *   Dashboard   (470, 480)   center = (570, 567)   ← bottom-right    (mirror of Intel)
 *
 * Connection lines (card-edge-center → engine-edge-center):
 *   1. (380, 175) → (380, 205)        vertical
 *   2. (230, 325) → (265, 325)        horizontal
 *   3. (530, 325) → (495, 325)        horizontal
 *   4. (190, 480) → (315, 445)        diagonal  (dx=+125, dy=-35)
 *   5. (570, 480) → (445, 445)        diagonal  (dx=-125, dy=-35)  ← mirror of 4
 *
 * Orbits (centered on engine):
 *   r = 155     inner
 *   r = 220     outer
 */

const G = {
  W: 760, H: 650,
  CX: 380, CY: 325,
  EW: 230, EH: 240,
  CW: 200, CH: 175,
};

const cardStyle = {
  background: "rgba(11,14,26,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(37,99,235,0.10)",
};

const engineStyle = {
  background: "rgba(6,8,14,0.92)",
  border: "1.5px solid rgba(37,99,235,0.22)",
  animation: "engineBreath 6s ease-in-out infinite",
};

const positions = [
  { left: 280, top: 0 },     // Research
  { left: 30,  top: 237 },   // Dev
  { left: 530, top: 237 },   // Platform
  { left: 90,  top: 480 },   // Intel
  { left: 470, top: 480 },   // Dashboard
];

const connLines = [
  { x1: 380, y1: 175, x2: 380, y2: 205 },
  { x1: 230, y1: 325, x2: 265, y2: 325 },
  { x1: 530, y1: 325, x2: 495, y2: 325 },
  { x1: 190, y1: 480, x2: 315, y2: 445 },
  { x1: 570, y1: 480, x2: 445, y2: 445 },
];

/* ── Card component (fixed size, centered content) ─────────── */

function NodeCard({ node, style: posStyle }) {
  return (
    <div
      className="absolute eco-node rounded-2xl text-center flex flex-col items-center justify-center"
      style={{ width: G.CW, height: G.CH, ...cardStyle, ...posStyle }}
    >
      <div className="w-10 h-10 rounded-[10px] border border-yfx-brand/20 bg-yfx-brand/[0.05] flex items-center justify-center mb-3">
        {node.icon}
      </div>
      <h3 className="text-[13px] font-semibold text-text-primary leading-snug mb-1">
        {node.title}
      </h3>
      {node.coming && (
        <span className="inline-block text-[7px] font-bold text-yfx-brand-light tracking-[0.12em] uppercase border border-yfx-brand/20 rounded-full px-2.5 py-0.5 mb-1.5">
          Coming Soon
        </span>
      )}
      <p className="text-[10px] text-text-muted leading-[1.55] max-w-[170px]">
        {node.desc}
      </p>
    </div>
  );
}

/* ── Mobile card (horizontal layout) ───────────────────────── */

function MobileCard({ node }) {
  return (
    <div
      className="eco-node rounded-2xl p-5 flex items-start gap-4"
      style={cardStyle}
    >
      <div className="w-10 h-10 rounded-[10px] border border-yfx-brand/20 bg-yfx-brand/[0.05] flex items-center justify-center shrink-0">
        {node.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-text-primary leading-snug">
          {node.title}
        </h3>
        {node.coming && (
          <span className="inline-block text-[7px] font-bold text-yfx-brand-light tracking-[0.12em] uppercase border border-yfx-brand/20 rounded-full px-2 py-0.5 mt-0.5 mb-0.5">
            Coming Soon
          </span>
        )}
        <p className="text-[11px] text-text-muted leading-[1.5] mt-1">{node.desc}</p>
      </div>
    </div>
  );
}

/* ── Engine block ──────────────────────────────────────────── */

function EngineBlock({ className = "", w, h }) {
  return (
    <div
      className={`rounded-2xl text-center flex flex-col items-center justify-center ${className}`}
      style={{ width: w, height: h, ...engineStyle }}
    >
      <div className="w-12 h-12 rounded-xl border border-yfx-brand/25 bg-yfx-brand/[0.06] flex items-center justify-center mb-3">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#60A5FA" strokeWidth="1.1">
          <path d="M11 1l9 5v10l-9 5-9-5V6l9-5z" />
          <path d="M11 11l9-5M11 11v10M11 11L2 6" />
        </svg>
      </div>
      <span className="block text-[7px] font-bold text-yfx-brand-light/60 tracking-[0.2em] uppercase mb-1">
        Core Intelligence
      </span>
      <span className="block text-[22px] font-semibold text-text-primary leading-tight">
        Algorithmic
        <br />Engine
      </span>
      <p className="text-[9px] text-text-muted leading-relaxed mt-2 max-w-[160px]">
        Proprietary algorithms, execution logic and risk management in harmony.
      </p>
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────── */

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="section-padding section-border overflow-hidden relative">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ bottom: "5%", left: "35%", width: "30%", height: "40%", background: "radial-gradient(ellipse 100% 100% at 50% 60%, rgba(37,99,235,0.02) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <Container>
        <SectionLabel number="07" text="Inside YFX" />

        <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr] gap-6 xl:gap-0 items-start">

          {/* ── Left copy ────────────────────────────────────── */}
          <ScrollReveal>
            <div className="xl:sticky xl:top-32 xl:pr-6 xl:pt-[190px]">
              <h2 className="text-h1 font-medium text-text-primary leading-[1.1]">
                One engine.
                <br />
                <span className="font-semibold">Endless possibilities.</span>
              </h2>
              <p className="text-sm text-text-secondary leading-[1.7] max-w-[240px] mt-4">
                Our ecosystem is built around a single core engine that powers
                research, development, intelligence and trading solutions.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Desktop diagram (lg+) ────────────────────────── */}
          <ScrollReveal delay={0.1} className="hidden xl:block">
            <div className="relative mx-auto" style={{ width: G.W, height: G.H }}>

              {/* SVG: orbits + connections */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${G.W} ${G.H}`}
              >
                <defs>
                  <filter id="dg">
                    <feGaussianBlur stdDeviation="2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Orbit circles — perfectly centered on Engine */}
                <circle cx={G.CX} cy={G.CY} r="155" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
                <circle cx={G.CX} cy={G.CY} r="220" fill="none" stroke="rgba(37,99,235,0.04)" strokeWidth="1" strokeDasharray="5 10" />

                {/* Ambient glow */}
                <circle cx={G.CX} cy={G.CY} r="90" fill="rgba(37,99,235,0.02)" />

                {/* Connection lines — all 1px, identical style */}
                {connLines.map((l, i) => (
                  <g key={i}>
                    <line
                      x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                      stroke="rgba(37,99,235,0.25)"
                      strokeWidth="1"
                    />
                    <circle cx={l.x1} cy={l.y1} r="3.5" fill="#2563EB" filter="url(#dg)" className="animate-glow-breath" />
                    <circle cx={l.x2} cy={l.y2} r="3.5" fill="#2563EB" filter="url(#dg)" className="animate-glow-breath" />
                  </g>
                ))}
              </svg>

              {/* Engine — centered */}
              <div
                className="absolute z-10"
                style={{ left: G.CX - G.EW / 2, top: G.CY - G.EH / 2 }}
              >
                <EngineBlock w={G.EW} h={G.EH} />
              </div>

              {/* Satellite cards — all identical size */}
              {nodes.map((node, i) => (
                <NodeCard key={node.id} node={node} style={positions[i]} />
              ))}
            </div>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-2.5 mt-5">
              <span className="w-[6px] h-[6px] rounded-full bg-yfx-brand/50" />
              <span className="text-xs text-text-muted">
                All modules are connected. All systems work as one.
              </span>
            </div>
          </ScrollReveal>

          {/* ── Tablet (sm–lg) ───────────────────────────────── */}
          <ScrollReveal delay={0.1} className="hidden sm:block xl:hidden">
            <div className="max-w-[440px] mx-auto">
              <EngineBlock w="100%" h={200} className="max-w-[240px] mx-auto mb-6 px-6" />
              <div className="grid grid-cols-2 gap-3">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className="eco-node rounded-2xl p-5 text-center flex flex-col items-center justify-center"
                    style={{ ...cardStyle, minHeight: 170 }}
                  >
                    <div className="w-10 h-10 rounded-[10px] border border-yfx-brand/20 bg-yfx-brand/[0.05] flex items-center justify-center mb-3">
                      {node.icon}
                    </div>
                    <h3 className="text-[13px] font-semibold text-text-primary leading-snug mb-1">{node.title}</h3>
                    {node.coming && (
                      <span className="inline-block text-[7px] font-bold text-yfx-brand-light tracking-[0.12em] uppercase border border-yfx-brand/20 rounded-full px-2.5 py-0.5 mb-1.5">Coming Soon</span>
                    )}
                    <p className="text-[10px] text-text-muted leading-[1.55]">{node.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2.5 mt-6">
                <span className="w-[5px] h-[5px] rounded-full bg-yfx-brand/50" />
                <span className="text-xs text-text-muted">All modules are connected. All systems work as one.</span>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Mobile (< sm) ────────────────────────────────── */}
          <div className="sm:hidden">
            <ScrollReveal>
              <EngineBlock w="100%" h={180} className="px-6" />
            </ScrollReveal>

            <div className="relative mt-3 pl-[18px]">
              <div
                className="absolute left-[7px] top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.25), rgba(37,99,235,0.06) 50%, rgba(37,99,235,0.25))" }}
              />
              <div className="flex flex-col gap-3">
                {nodes.map((node, i) => (
                  <ScrollReveal key={node.id} delay={i * 0.05}>
                    <div className="relative">
                      <div className="absolute -left-[18px] top-5 w-[7px] h-[7px] rounded-full bg-yfx-brand/50 z-10" />
                      <MobileCard node={node} />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="w-[5px] h-[5px] rounded-full bg-yfx-brand/50" />
              <span className="text-[11px] text-text-muted">All modules are connected.</span>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes engineBreath {
          0%, 100% { box-shadow: 0 0 50px rgba(37,99,235,0.05), 0 0 25px rgba(37,99,235,0.02); }
          50% { box-shadow: 0 0 70px rgba(37,99,235,0.10), 0 0 35px rgba(37,99,235,0.05); }
        }
      `}</style>
    </section>
  );
}
