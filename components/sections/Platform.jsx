"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ── Data ──────────────────────────────────────────────────── */

const sidebarItems = [
  { label: "Dashboard", active: true },
  { label: "Portfolio" },
  { label: "Strategies" },
  { label: "Positions" },
  { label: "Analytics" },
  { label: "Reports" },
  { label: "Market Intel" },
  { label: "Settings" },
];

const signals = [
  { pair: "EURUSD",  action: "BUY",  color: "#4ADE80", price: "1.08540", time: "2m ago" },
  { pair: "XAUUSD",  action: "WAIT", color: "#FACC15", price: "2,345.60", time: "15m ago" },
  { pair: "BTCUSDT", action: "SELL", color: "#F87171", price: "64,320.00", time: "1h ago" },
];

const marketItems = [
  { sym: "US100",  val: "+1.12%", up: true },
  { sym: "GER40",  val: "+0.48%", up: true },
  { sym: "GOLD",   val: "+0.73%", up: true },
  { sym: "BTC",    val: "−0.35%", up: false },
  { sym: "EURUSD", val: "+0.22%", up: true },
];

const healthItems = [
  { label: "Connection",  status: "Excellent", color: "#4ADE80" },
  { label: "Data Feed",   status: "Stable",    color: "#4ADE80" },
  { label: "Execution",   status: "Optimal",   color: "#4ADE80" },
  { label: "Risk Engine", status: "Active",    color: "#4ADE80" },
];

const features = [
  {
    title: "Subscription Access",
    desc: "Flexible membership plans with full access to platform features and premium tools.",
    badge: "Secure Membership",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#60A5FA" strokeWidth="1.3">
        <path d="M14 3l9 5v6c0 5.5-3.8 10.6-9 12-5.2-1.4-9-6.5-9-12V8l9-5z" />
        <path d="M10 14l3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "Secure Connection",
    desc: "Connect your exchange accounts via encrypted API with read-only permissions.",
    badge: "Bank-Grade Security",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#60A5FA" strokeWidth="1.3">
        <rect x="5" y="12" width="18" height="12" rx="3" />
        <path d="M9 12V9a5 5 0 0 1 10 0v3" />
        <circle cx="14" cy="18" r="1.5" fill="#60A5FA" />
      </svg>
    ),
  },
  {
    title: "Personal Dashboard",
    desc: "Monitor portfolio, positions, performance and system status in real-time.",
    badge: "Full Visibility",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#60A5FA" strokeWidth="1.3">
        <rect x="3" y="3" width="10" height="10" rx="2" /><rect x="15" y="3" width="10" height="6" rx="2" />
        <rect x="3" y="15" width="10" height="10" rx="2" /><rect x="15" y="11" width="10" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: "Market Intelligence",
    desc: "AI-powered market insights, news analysis and actionable opportunities.",
    badge: "Stay Ahead",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#60A5FA" strokeWidth="1.3">
        <polygon points="14,2 17,10 26,10 19,16 21,25 14,20 7,25 9,16 2,10 11,10" />
      </svg>
    ),
  },
];

const card = "bg-yfx-card/50 border border-border-subtle rounded-xl p-3.5";

const mobileNavItems = ["Dashboard", "Portfolio", "Strategies", "Positions", "More"];

const realisticCurve = "M0,135 C8,134 15,132 22,131 C30,129 35,130 42,128 C50,125 55,127 62,124 C70,120 75,122 82,118 C90,114 95,116 102,112 C110,108 115,110 122,106 C128,103 133,105 140,100 C148,96 152,98 160,93 C165,90 170,92 178,87 C185,83 190,86 198,80 C205,76 208,79 215,74 C220,71 225,73 232,68 C238,65 242,67 250,62 C255,59 260,61 268,56 C275,52 278,55 285,50 C290,47 295,49 302,44 C308,41 312,43 318,39 C324,36 328,38 335,33 C340,31 345,34 352,30 C358,27 362,30 368,26 C375,22 380,25 388,20 C395,16 400,19 408,15 C415,12 420,14 428,11 C435,9 440,11 448,8 C455,6 460,9 468,7 C475,5 482,7 490,5 C498,4 505,6 512,4 C520,3 528,5 535,4 C542,3 548,4 555,3 C562,3 568,4 575,3 C582,2 588,3 595,2 L600,2";

/* ── Mobile Equity Curve ──────────────────────────────────── */

function MobileEquityCurve() {
  const svgRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      line.style.transition = "stroke-dashoffset 3.5s cubic-bezier(0.22, 1, 0.36, 1)";
      line.style.strokeDashoffset = "0";
    });
  }, [visible]);

  useEffect(() => {
    if (!visible || drawn) return;
    const id = setInterval(() => {
      const line = lineRef.current;
      if (!line) return;
      const offset = parseFloat(getComputedStyle(line).strokeDashoffset);
      if (offset < 1) {
        setDrawn(true);
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, [visible, drawn]);

  useEffect(() => {
    if (!drawn) return;
    const dot = dotRef.current;
    if (!dot) return;
    let t = 0;
    const baseY = 2;
    const tick = () => {
      t += 0.015;
      const dy = Math.sin(t * 2.1) * 1.8 + Math.sin(t * 5.3) * 0.6;
      dot.setAttribute("cy", String(baseY + dy));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [drawn]);

  return (
    <div className="h-[80px] relative">
      <svg ref={svgRef} viewBox="0 0 600 140" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mob-eq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
          <clipPath id="mob-reveal">
            <rect x="0" y="0" width={visible ? 600 : 0} height="140" style={{ transition: "width 3.5s cubic-bezier(0.22, 1, 0.36, 1)" }} />
          </clipPath>
          <filter id="mob-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={`${realisticCurve} L600,140 L0,140Z`} fill="url(#mob-eq-fill)" clipPath="url(#mob-reveal)" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease-out 0.5s" }} />
        <path
          ref={lineRef}
          d={realisticCurve}
          fill="none" stroke="#2563EB" strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round" strokeLinecap="round"
          filter="url(#mob-glow)"
        />
        <circle
          ref={dotRef}
          cx="600" cy="2" r="3"
          fill="#2563EB" stroke="#0c1120" strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.5s ease-out" }}
        />
      </svg>
      <div className="flex justify-between text-[7px] text-text-faint/50 font-mono mt-1 px-0.5">
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </div>
  );
}

/* ── Mobile Dashboard ─────────────────────────────────────── */

function MobileDashboard() {
  return (
    <div
      className="rounded-2xl border border-border-subtle overflow-hidden shadow-card"
      style={{ background: "linear-gradient(145deg, #080b14 0%, #0c1120 100%)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-yfx-black/60">
        <span className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]/80" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#febc2e]/80" />
        <span className="w-[7px] h-[7px] rounded-full bg-[#28c840]/80" />
        <span className="ml-3 text-[9px] text-text-faint font-mono">platform.yfxresearch.com</span>
      </div>

      {/* App nav bar */}
      <div className="flex items-center border-b border-border-subtle bg-yfx-black/40">
        {mobileNavItems.map((item, i) => (
          <span
            key={item}
            className={`flex-1 text-center py-2 text-[9px] font-medium leading-none ${
              i === 0
                ? "text-yfx-brand-light border-b border-yfx-brand"
                : "text-text-muted"
            }`}
          >{item}</span>
        ))}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-xs font-semibold text-text-primary leading-none">Dashboard</span>
            <span className="block text-[9px] text-text-muted mt-1">Trading system overview</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-[5px] h-[5px] rounded-full bg-[#4ADE80] animate-status-pulse" />
            <span className="text-[9px] text-[#4ADE80] font-medium">Live</span>
          </div>
        </div>

        {/* Stats 2x2 */}
        <div className="grid grid-cols-2 gap-2">
          <div className={card}>
            <span className="block text-[9px] text-text-muted mb-1.5">Portfolio</span>
            <span className="block text-sm font-semibold text-text-primary font-mono leading-none">$127,540</span>
            <span className="inline-block mt-1.5 text-[8px] font-mono font-medium leading-none px-1.5 py-[2px] rounded-md bg-[#4ADE80]/10 text-[#4ADE80]">+3.28%</span>
          </div>
          <div className={card}>
            <span className="block text-[9px] text-text-muted mb-1.5">Today P&L</span>
            <span className="block text-sm font-semibold text-text-primary font-mono leading-none">+$1,842</span>
            <span className="inline-block mt-1.5 text-[8px] font-mono font-medium leading-none px-1.5 py-[2px] rounded-md bg-[#4ADE80]/10 text-[#4ADE80]">+1.47%</span>
          </div>
        </div>

        {/* Equity Curve */}
        <div className={card}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-text-secondary font-medium">Equity Curve</span>
            <span className="text-[8px] text-text-faint border border-border-subtle rounded-md px-1.5 py-[2px] leading-none">YTD ▾</span>
          </div>
          <MobileEquityCurve />
        </div>

        {/* Signals */}
        <div className={card}>
          <span className="block text-[9px] text-text-secondary font-medium mb-2">Recent Signals</span>
          <div className="flex flex-col gap-1.5">
            {signals.map((s, i) => (
              <div key={i} className="flex items-center text-[9px]">
                <span className="text-text-primary font-medium font-mono w-[50px] shrink-0">{s.pair}</span>
                <span
                  className="font-semibold text-center rounded-md px-1.5 py-[2px] w-9 shrink-0 leading-none"
                  style={{ color: s.color, background: `${s.color}12` }}
                >{s.action}</span>
                <span className="text-text-secondary font-mono flex-1 text-right px-1.5">{s.price}</span>
                <span className="text-text-faint text-right w-10 shrink-0">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Market + Health row */}
        <div className="grid grid-cols-2 gap-2">
          <div className={card}>
            <span className="block text-[9px] text-text-secondary font-medium mb-2">Markets</span>
            <div className="flex flex-col gap-1.5">
              {marketItems.slice(0, 4).map((m, i) => (
                <div key={i} className="flex items-center justify-between text-[8px]">
                  <span className="text-text-muted font-mono">{m.sym}</span>
                  <span className="font-mono font-medium" style={{ color: m.up ? "#4ADE80" : "#F87171" }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={card}>
            <span className="block text-[9px] text-text-secondary font-medium mb-2">System</span>
            <div className="flex flex-col gap-1.5">
              {healthItems.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[8px] text-text-muted">{h.label}</span>
                  <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: h.color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop Dashboard ────────────────────────────────────── */

function DesktopDashboard() {
  return (
    <div
      className="rounded-2xl sm:rounded-[20px] border border-border-subtle overflow-hidden shadow-card"
      style={{ background: "linear-gradient(145deg, #080b14 0%, #0c1120 100%)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-border-subtle bg-yfx-black/60">
        <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]/80" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]/80" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]/80" />
        <span className="ml-4 text-[10px] text-text-faint font-mono flex items-center gap-1.5">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none" stroke="#334155" strokeWidth="1.2">
            <rect x="1" y="3" width="6" height="6" rx="1" />
            <path d="M2 3V2a2 2 0 0 1 4 0v1" />
          </svg>
          platform.yfxresearch.com
        </span>
      </div>

      {/* App layout */}
      <div className="flex min-h-[500px]">
        {/* Sidebar */}
        <aside className="flex flex-col w-[140px] lg:w-[156px] border-r border-border-subtle py-5 px-3 shrink-0">
          <div className="flex items-baseline gap-1 mb-6 px-2">
            <span className="text-xs font-bold tracking-[0.06em] text-text-primary">YFX</span>
            <span className="text-[7px] tracking-[0.1em] text-text-muted uppercase">Research</span>
          </div>
          <nav className="flex flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`px-2.5 py-[7px] rounded-lg text-[11px] leading-none ${
                  item.active
                    ? "bg-yfx-brand/10 text-yfx-brand-light font-medium"
                    : "text-text-muted"
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-5 overflow-hidden flex flex-col gap-2.5">
          {/* Dashboard header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-text-primary leading-none">Dashboard</span>
              <span className="block text-[10px] text-text-muted mt-1.5">Overview of your trading system</span>
            </div>
            <div className="hidden lg:flex items-center gap-2.5">
              <span className="text-[10px] text-text-muted border border-border-subtle rounded-lg px-2.5 py-1.5 leading-none">All Accounts ▾</span>
              <span className="w-7 h-7 rounded-full bg-yfx-card border border-border-subtle flex items-center justify-center text-[9px] text-text-muted font-semibold">YF</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className={card}>
              <span className="block text-[10px] text-text-muted mb-2">Portfolio Value</span>
              <span className="block text-base font-semibold text-text-primary font-mono leading-none">$127,540</span>
              <span className="inline-block mt-2 text-[9px] font-mono font-medium leading-none px-1.5 py-[3px] rounded-md bg-[#4ADE80]/10 text-[#4ADE80]">+3.28%</span>
            </div>
            <div className={card}>
              <span className="block text-[10px] text-text-muted mb-2">Open Positions</span>
              <span className="block text-base font-semibold text-text-primary font-mono leading-none">7</span>
              <span className="block mt-2 text-[9px] text-text-muted leading-none">Active</span>
            </div>
            <div className={card}>
              <span className="block text-[10px] text-text-muted mb-2">Today P&L</span>
              <span className="block text-base font-semibold text-text-primary font-mono leading-none">+$1,842</span>
              <span className="inline-block mt-2 text-[9px] font-mono font-medium leading-none px-1.5 py-[3px] rounded-md bg-[#4ADE80]/10 text-[#4ADE80]">+1.47%</span>
            </div>
            <div className={card}>
              <span className="block text-[10px] text-text-muted mb-2">System Status</span>
              <div className="flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-[#4ADE80] animate-status-pulse shrink-0" />
                <span className="text-base font-semibold text-[#4ADE80] leading-none">Running</span>
              </div>
              <span className="block mt-2 text-[9px] text-text-muted leading-none">All systems operational</span>
            </div>
          </div>

          {/* Equity curve + System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_176px] gap-2.5">
            <div className={card}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-text-secondary font-medium">Equity Curve</span>
                <span className="text-[9px] text-text-faint border border-border-subtle rounded-lg px-2 py-1 leading-none">All Time ▾</span>
              </div>
              <div className="h-[150px] relative">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="absolute left-6 right-0 h-px bg-border-subtle" style={{ top: `${i * 25}%` }} />
                ))}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between text-[7px] text-text-faint font-mono">
                  <span>120K</span><span>100K</span><span>80K</span><span>60K</span><span>40K</span>
                </div>
                <svg viewBox="0 0 600 150" className="w-full h-full pl-7" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,130 C20,128 40,125 60,120 C80,118 100,115 120,110 C140,108 160,105 180,98 C200,95 220,100 240,90 C260,85 280,88 300,78 C320,72 340,75 360,65 C380,58 400,55 420,48 C440,45 460,50 480,42 C500,35 520,30 540,22 C560,18 580,15 600,10"
                    fill="none" stroke="#2563EB" strokeWidth="2"
                    className="animate-chart-draw"
                  />
                  <path
                    d="M0,130 C20,128 40,125 60,120 C80,118 100,115 120,110 C140,108 160,105 180,98 C200,95 220,100 240,90 C260,85 280,88 300,78 C320,72 340,75 360,65 C380,58 400,55 420,48 C440,45 460,50 480,42 C500,35 520,30 540,22 C560,18 580,15 600,10 L600,150 L0,150Z"
                    fill="url(#eqFill)" opacity="0.6"
                  />
                </svg>
                <div className="flex justify-between text-[7px] text-text-faint font-mono mt-1.5 pl-7">
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className={`${card} flex-1`}>
                <span className="block text-[10px] text-text-secondary font-medium mb-3">System Health</span>
                <div className="flex flex-col gap-2.5">
                  {healthItems.map((h,i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: h.color }} />
                        <span className="text-[9px] text-text-muted">{h.label}</span>
                      </div>
                      <span className="text-[9px] font-medium" style={{ color: h.color }}>{h.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={card}>
                <span className="block text-[10px] text-text-muted mb-1">Next Report</span>
                <span className="block text-[11px] font-medium text-text-primary leading-snug">Weekly Performance</span>
                <span className="block text-[8px] text-text-faint mt-1 mb-3">Monday, 12 May 2025</span>
                <div className="flex gap-3">
                  {[{v:"02",u:"Days"},{v:"14",u:"Hours"},{v:"37",u:"Min"}].map(t => (
                    <div key={t.u} className="text-center">
                      <span className="block text-base font-semibold text-text-primary font-mono leading-none">{t.v}</span>
                      <span className="block text-[7px] text-text-muted mt-1">{t.u}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Signals + Market Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
            <div className={card}>
              <span className="block text-xs text-text-secondary font-medium mb-3">Recent Signals</span>
              <div className="flex flex-col gap-2">
                {signals.map((s,i) => (
                  <div key={i} className="flex items-center text-[10px]">
                    <span className="text-text-primary font-medium font-mono w-[52px] shrink-0">{s.pair}</span>
                    <span
                      className="font-semibold text-center rounded-md px-1.5 py-[2px] w-10 shrink-0 leading-none"
                      style={{ color: s.color, background: `${s.color}12` }}
                    >{s.action}</span>
                    <span className="text-text-secondary font-mono flex-1 text-right px-2">{s.price}</span>
                    <span className="text-text-muted w-[60px] shrink-0">{s.status || ""}</span>
                    <span className="text-text-faint text-right w-10 shrink-0">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={card}>
              <span className="block text-xs text-text-secondary font-medium mb-3">Market Snapshot</span>
              <div className="flex items-start gap-4">
                <svg width="56" height="56" viewBox="0 0 60 60" className="shrink-0">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="5" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#2563EB" strokeWidth="5"
                    strokeDasharray="60 150" strokeLinecap="round" transform="rotate(-90 30 30)" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#4ADE80" strokeWidth="5"
                    strokeDasharray="40 150" strokeLinecap="round" transform="rotate(50 30 30)" />
                </svg>
                <div className="flex flex-col gap-2 flex-1">
                  {marketItems.map((m,i) => (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="text-text-secondary font-mono">{m.sym}</span>
                      <span className="font-mono font-medium" style={{ color: m.up ? "#4ADE80" : "#F87171" }}>{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Component ─────────────────────────────────────────────── */

export default function Platform() {
  return (
    <section id="platform" className="section-padding section-border relative overflow-hidden">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "15%", left: "20%", width: "60%", height: "70%", background: "radial-gradient(ellipse 80% 80% at 50% 45%, rgba(37,99,235,0.04) 0%, transparent 65%)", filter: "blur(60px)" }} />
      <Container>
        <SectionLabel number="05" text="YFX Trading Platform" />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Left copy ─────────────────────────────────────── */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-32">
              <h2 className="text-h1 font-medium text-text-primary">
                One platform.
                <br />Full visibility.
                <br />Complete control.
              </h2>
              <div className="mt-5 sm:mt-6">
                <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-button border border-yfx-brand/30 bg-yfx-brand/[0.08] text-xs font-semibold text-yfx-brand-light tracking-[0.08em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-yfx-brand-light animate-status-pulse" />
                  Coming Soon
                </span>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[360px] mt-6">
                The YFX Trading Platform will unite algorithmic execution,
                account management and market intelligence in one seamless
                experience.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { t: "Secure",      d: "Bank-grade security and encrypted connections." },
                  { t: "Real-time",   d: "Real-time data, execution and monitoring." },
                  { t: "Intelligent", d: "AI-driven insights and automated analytics." },
                  { t: "Unified",     d: "Everything in one platform. No fragmentation." },
                ].map((v, i) => (
                  <div key={i}>
                    <span className="block text-sm font-medium text-text-primary mb-1">{v.t}</span>
                    <span className="block text-xs text-text-muted leading-relaxed">{v.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Dashboard mockup ──────────────────────────────── */}
          <ScrollReveal delay={0.15}>
            {/* Mobile dashboard */}
            <div className="sm:hidden">
              <MobileDashboard />
            </div>
            {/* Desktop dashboard */}
            <div className="hidden sm:block">
              <DesktopDashboard />
            </div>
          </ScrollReveal>
        </div>

        {/* ── Feature cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="bg-yfx-base border border-border-subtle rounded-card p-6 sm:p-7 flex flex-col gap-4 h-full eco-node">
                <div className="w-12 h-12 rounded-xl border border-yfx-brand/20 bg-yfx-brand/[0.06] flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-medium text-text-primary">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed flex-1">
                  {f.desc}
                </p>
                <span className="inline-block self-start text-[10px] font-semibold text-yfx-brand-light tracking-[0.06em] uppercase border border-yfx-brand/25 rounded-button px-3 py-1.5">
                  {f.badge}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
