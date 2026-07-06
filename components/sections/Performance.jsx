"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 1, duration = 900 }) {
  const [display, setDisplay] = useState(null);
  const ref = useRef(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!visible || value == null) return;
    const target = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(target)) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(ease * target);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, value, duration]);

  if (display == null) return <span ref={ref}>{prefix}0{suffix}</span>;

  const abs = Math.abs(display);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const sign = display >= 0 ? prefix : prefix.replace("+", "-") || "-";
  return <span ref={ref}>{sign}{formatted}{suffix}</span>;
}

function EquityCurveChart({ data, startingBalance }) {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const visible = useInView(ref);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!visible || drawn) return;
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      line.style.transition = "stroke-dashoffset 4.8s cubic-bezier(0.22, 1, 0.36, 1)";
      line.style.strokeDashoffset = "0";
    });
    const timer = setTimeout(() => setDrawn(true), 5000);
    return () => clearTimeout(timer);
  }, [visible, drawn]);

  if (!data || data.length === 0) {
    return (
      <div ref={ref} className="h-[190px] sm:h-[220px] lg:h-[250px] relative flex items-center justify-center">
        <span className="text-xs text-text-faint font-mono">Awaiting data</span>
      </div>
    );
  }

  const values = data.map((d) => d.equity);
  const min = Math.min(...values, 0);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = range * 0.15;
  const yMin = min - pad;
  const yMax = max + pad;

  const w = 900;
  const h = 340;

  const points = data.map((d, i) => {
    const x = data.length === 1 ? w / 2 : (i / (data.length - 1)) * w;
    const y = h - ((d.equity - yMin) / (yMax - yMin)) * h;
    return [x, y];
  });

  const polyline = points.map((p) => p.join(",")).join(" ");
  const areaPoints = [`0,${h}`, ...points.map((p) => p.join(",")), `${w},${h}`].join(" ");
  const lastPt = points[points.length - 1];

  const base = startingBalance || 100000;
  const ySteps = 6;
  const yLabels = [];
  for (let i = 0; i <= ySteps; i++) {
    const eqVal = yMin + ((yMax - yMin) * (ySteps - i)) / ySteps;
    const pct = (eqVal / base) * 100;
    yLabels.push({ pct, top: `${(i / ySteps) * 100}%` });
  }

  const monthSet = new Map();
  data.forEach((d, i) => {
    const m = d.date.substring(0, 7);
    if (!monthSet.has(m)) monthSet.set(m, i);
  });
  const xLabels = [...monthSet.entries()].map(([m, idx]) => {
    const parts = m.split("-");
    const mi = parseInt(parts[1], 10) - 1;
    const yr = parts[0];
    const x = data.length === 1 ? w / 2 : (idx / (data.length - 1)) * w;
    return { label: `${MONTH_LABELS[mi]} ${yr}`, x: (x / w) * 100 };
  });

  const drawDuration = 4.8;

  return (
    <div ref={ref} className="h-[190px] sm:h-[220px] lg:h-[250px] relative pl-10 sm:pl-12">
      {yLabels.map((yl, i) => (
        <div key={i} className="absolute left-0 right-0" style={{ top: yl.top }}>
          <div className="absolute left-10 sm:left-12 right-0 h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
        </div>
      ))}

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none w-10 sm:w-12">
        {yLabels.map((yl, i) => (
          <span key={i} className="text-[9px] sm:text-[10px] text-text-faint/60 font-mono leading-none text-right pr-2 -translate-y-[5px]">
            {yl.pct >= 0 ? "+" : ""}{yl.pct.toFixed(0)}%
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="absolute top-0 bottom-0 right-0"
        style={{ left: "3rem" }}
      >
        <defs>
          <linearGradient id="eq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(37,99,235,0.20)" />
            <stop offset="60%" stopColor="rgba(37,99,235,0.06)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
          </linearGradient>
          <clipPath id="reveal-clip">
            <rect x="0" y="0" width={visible ? w : 0} height={h} style={{ transition: `width ${drawDuration}s cubic-bezier(0.22, 1, 0.36, 1)` }} />
          </clipPath>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="endpoint-glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon points={areaPoints} fill="url(#eq-fill)" clipPath="url(#reveal-clip)" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease-out ${drawDuration * 0.15}s` }} />
        <polyline
          ref={lineRef}
          points={polyline}
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#line-glow)"
        />
        {lastPt && (
          <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.8s ease-out" }}>
            <circle
              cx={lastPt[0]} cy={lastPt[1]} r="8"
              fill="#2563EB" opacity="0.15"
              vectorEffect="non-scaling-stroke"
              filter="url(#endpoint-glow)"
            />
            <circle
              cx={lastPt[0]} cy={lastPt[1]} r="4"
              fill="#2563EB" stroke="#0B0E1A" strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        )}
      </svg>

      <div className="absolute -bottom-6 left-10 sm:left-12 right-0 flex pointer-events-none">
        {xLabels.map((xl, i) => (
          <span
            key={i}
            className={`absolute text-[9px] sm:text-[10px] text-text-faint/50 font-mono -translate-x-1/2 ${i % 2 !== 0 && xLabels.length > 2 ? "hidden sm:inline" : ""}`}
            style={{ left: `${xl.x}%` }}
          >
            {xl.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniBar({ value, max, positive }) {
  const pct = Math.min(Math.abs(value) / max, 1) * 100;
  return (
    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.06)" }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${pct}%`,
          background: positive
            ? "linear-gradient(to right, rgba(37,99,235,0.4), rgba(37,99,235,0.7))"
            : "linear-gradient(to right, rgba(239,68,68,0.3), rgba(239,68,68,0.55))",
        }}
      />
    </div>
  );
}

function MonthlyCard({ month, pct, trades, winRate, absMax, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);
  const parts = month.split("-");
  const mi = parseInt(parts[1], 10) - 1;
  const yr = parts[0];
  const isPos = pct >= 0;

  return (
    <div
      ref={ref}
      className="bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-2.5 sm:px-5 sm:py-3 transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-[10px] text-text-muted/60 uppercase tracking-wider font-mono">
        {MONTH_LABELS[mi]} {yr}
      </span>

      <div className="mt-1">
        <span className={`text-lg sm:text-xl font-mono font-semibold tracking-tight leading-none ${isPos ? "text-text-primary" : "text-red-400/90"}`}>
          {isPos ? "+" : ""}{pct.toFixed(2)}%
        </span>
      </div>

      <div className="mt-2">
        <MiniBar value={pct} max={absMax} positive={isPos} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] text-text-faint font-mono">{trades} trades</span>
        <span className="text-[10px] text-text-faint font-mono">{winRate}% win</span>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-1.5 sm:py-2">
      <span className="text-[11px] sm:text-xs text-text-muted/60">{label}</span>
      <span className={`text-xs sm:text-sm font-mono font-medium ${accent || "text-text-secondary"}`}>
        {value}
      </span>
    </div>
  );
}

export default function Performance() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/performance")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const s = data?.stats;
  const has = !!s;
  const base = s?.startingBalance || 1;

  const totalReturnPct = has ? (s.netProfit / base) * 100 : 0;
  const maxDDPct = has ? (s.maxDrawdown / base) * 100 : 0;
  const avgTradePct = has ? (s.avgTrade / base) * 100 : 0;
  const largestWinPct = has ? (s.largestWin / base) * 100 : 0;
  const largestLossPct = has ? (s.largestLoss / base) * 100 : 0;
  const grossProfitPct = has ? (s.grossProfit / base) * 100 : 0;
  const grossLossPct = has ? (s.grossLoss / base) * 100 : 0;

  const monthlyStats = useMemo(() => {
    if (!data?.equityCurve || !data?.monthlyPerformance) return [];
    const curve = data.equityCurve;
    const monthWins = {};
    const monthTotal = {};
    let prevEq = 0;
    for (const pt of curve) {
      const m = pt.date.substring(0, 7);
      if (!monthWins[m]) { monthWins[m] = 0; monthTotal[m] = 0; }
      monthTotal[m]++;
      if (pt.equity > prevEq) monthWins[m]++;
      prevEq = pt.equity;
    }
    return data.monthlyPerformance.map((mp) => ({
      ...mp,
      winRate: monthTotal[mp.month] > 0
        ? Math.round((monthWins[mp.month] / monthTotal[mp.month]) * 100)
        : 0,
    }));
  }, [data]);

  const monthlyAbsMax = useMemo(
    () => Math.max(...(monthlyStats.map((d) => Math.abs(d.pct))), 0.1),
    [monthlyStats],
  );

  return (
    <section id="performance" className="section-padding section-border" style={{ paddingBlock: "clamp(36px, 4.5vw, 64px)" }}>
      <Container>
        <SectionLabel number="04" text="Performance" />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-4 sm:mb-5">
          <div>
            <h2 className="text-h1 font-medium text-text-primary">
              Transparent. Verifiable. Data&#8209;driven.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[480px] mt-3">
              Verified performance of the YFX automated trading bot. All statistics are calculated
              from verified broker data.
            </p>
          </div>
          {has && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] sm:text-[11px] text-text-muted/70 font-mono">
                Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          )}
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
          {/* Total Return */}
          <div className="bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300 hover:border-border-strong/40">
            <div className="flex items-center gap-2 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#60A5FA">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span className="text-[10px] text-text-muted/60 uppercase tracking-wider">Total Return</span>
            </div>
            <span className={`block font-mono text-xl sm:text-2xl font-semibold tracking-tight leading-none ${totalReturnPct >= 0 ? "text-text-primary" : "text-red-400"}`}>
              {has ? <AnimatedNumber value={totalReturnPct} prefix={totalReturnPct >= 0 ? "+" : ""} suffix="%" decimals={2} /> : "—"}
            </span>
          </div>

          {/* Win Rate */}
          <div className="bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300 hover:border-border-strong/40">
            <div className="flex items-center gap-2 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#60A5FA">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-5" />
              </svg>
              <span className="text-[10px] text-text-muted/60 uppercase tracking-wider">Win Rate</span>
            </div>
            <span className="block font-mono text-xl sm:text-2xl font-semibold tracking-tight leading-none text-text-primary">
              {has ? <AnimatedNumber value={s.winRate} suffix="%" decimals={1} /> : "—"}
            </span>
          </div>

          {/* Trading Days */}
          <div className="bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300 hover:border-border-strong/40">
            <div className="flex items-center gap-2 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#64748B">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M3 10h18" />
                <path d="M8 2v4M16 2v4" />
              </svg>
              <span className="text-[10px] text-text-muted/60 uppercase tracking-wider">Trading Days</span>
            </div>
            <span className="block font-mono text-xl sm:text-2xl font-semibold tracking-tight leading-none text-text-primary">
              {has ? <AnimatedNumber value={s.tradingDays} decimals={0} /> : "—"}
            </span>
          </div>

          {/* Profit Factor */}
          <div className="bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300 hover:border-border-strong/40">
            <div className="flex items-center gap-2 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="#22C55E">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
              </svg>
              <span className="text-[10px] text-text-muted/60 uppercase tracking-wider">Profit Factor</span>
            </div>
            <span className="block font-mono text-xl sm:text-2xl font-semibold tracking-tight leading-none text-emerald-400/80">
              {has ? <AnimatedNumber value={s.profitFactor} decimals={2} /> : "—"}
            </span>
          </div>
        </div>

        {/* Equity Curve + Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
          <div className="lg:col-span-8 bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4" style={{ boxShadow: "0 0 180px 40px rgba(37,99,235,0.07)" }}>
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[10px] sm:text-[11px] text-text-muted/60 uppercase tracking-wider font-mono">
                Equity Curve
              </span>
              {has && (
                <div className="text-right">
                  <span className="block text-[9px] text-text-faint/60 uppercase tracking-wider mb-0.5">Total Return</span>
                  <span className={`block text-lg sm:text-xl font-mono font-semibold tracking-tight ${totalReturnPct >= 0 ? "text-yfx-brand-light" : "text-red-400"}`}>
                    {totalReturnPct >= 0 ? "+" : ""}{totalReturnPct.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <EquityCurveChart data={data?.equityCurve} startingBalance={base} />
          </div>

          <div className="lg:col-span-4 bg-yfx-base/40 border border-border-subtle rounded-card px-4 py-3.5 sm:px-5 sm:py-4">
            <span className="text-[10px] sm:text-[11px] text-text-muted/60 uppercase tracking-wider font-mono">
              Performance Summary
            </span>
            <div className="mt-2.5 sm:mt-3">
              <SummaryRow
                label="Total Return"
                value={has ? `${totalReturnPct >= 0 ? "+" : ""}${totalReturnPct.toFixed(2)}%` : "—"}
                accent={totalReturnPct >= 0 ? "text-yfx-brand-light" : "text-red-400"}
              />
              <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
              <SummaryRow
                label="Gross Profit"
                value={has ? `+${grossProfitPct.toFixed(2)}%` : "—"}
                accent="text-yfx-brand-light"
              />
              <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
              <SummaryRow
                label="Gross Loss"
                value={has ? `-${grossLossPct.toFixed(2)}%` : "—"}
                accent="text-red-400/80"
              />
              <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
              <SummaryRow
                label="Average Trade"
                value={has ? `${avgTradePct >= 0 ? "+" : ""}${avgTradePct.toFixed(3)}%` : "—"}
              />
              <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
              <SummaryRow
                label="Largest Win"
                value={has ? `+${largestWinPct.toFixed(2)}%` : "—"}
                accent="text-yfx-brand-light"
              />
              <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
              <SummaryRow
                label="Largest Loss"
                value={has ? `${largestLossPct.toFixed(2)}%` : "—"}
                accent="text-red-400/80"
              />

              <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(148,163,184,0.06)" }}>
                <SummaryRow label="Total Trades" value={has ? s.totalTrades : "—"} />
                <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
                <SummaryRow
                  label="Winning Trades"
                  value={has ? `${s.winCount} (${s.winRate}%)` : "—"}
                  accent="text-yfx-brand-light"
                />
                <div className="h-px" style={{ background: "rgba(148,163,184,0.04)" }} />
                <SummaryRow
                  label="Losing Trades"
                  value={has ? `${s.lossCount} (${(100 - s.winRate).toFixed(1)}%)` : "—"}
                  accent="text-red-400/80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Performance Cards */}
        <div className="mb-3 sm:mb-4">
          <div className="mb-3 sm:mb-3.5">
            <span className="text-[10px] sm:text-[11px] text-text-muted/60 uppercase tracking-wider font-mono">
              Monthly Performance
            </span>
          </div>
          <style>{`.perf-carousel::-webkit-scrollbar { display: none; }`}</style>
          <div
            className="perf-carousel flex gap-3 sm:gap-4 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {monthlyStats.map((m, i) => (
              <div key={m.month} className="shrink-0 w-[280px] sm:w-[300px]">
                <MonthlyCard
                  month={m.month}
                  pct={m.pct}
                  trades={m.trades}
                  winRate={m.winRate}
                  absMax={monthlyAbsMax}
                  delay={i * 100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span className="text-[10px] sm:text-[11px] text-text-faint/50 font-mono">
            All performance data is verified and sourced directly from OANDA.
          </span>
        </div>
      </Container>
    </section>
  );
}
