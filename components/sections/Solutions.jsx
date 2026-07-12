"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

/* ── Particle System (Canvas) ─────────────────────────────── */

function ParticleCanvas({ cardRefs, hoveredCard }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    transfers: [],
    lastTransfer: 0,
    dpr: 1,
    isMobile: false,
    cachedBounds: [],
  });

  const updateBoundsCache = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    const cRect = canvas.getBoundingClientRect();
    const bounds = cardRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cRect.left,
        y: r.top - cRect.top,
        w: r.width,
        h: r.height,
        cx: r.left - cRect.left + r.width / 2,
        cy: r.top - cRect.top + r.height / 2,
      };
    });
    stateRef.current.cachedBounds = bounds;
    return bounds;
  }, [cardRefs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    s.dpr = Math.min(window.devicePixelRatio || 1, 2);
    s.isMobile = window.innerWidth < 640;

    let raf;
    let running = true;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.width = w * s.dpr;
      canvas.height = h * s.dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      updateBoundsCache();
      initParticles();
    }

    function initParticles() {
      const bounds = s.cachedBounds;
      s.particles = [];
      const countPer = s.isMobile ? 25 : 50;
      bounds.forEach((b, ci) => {
        if (!b) return;
        for (let i = 0; i < countPer; i++) {
          s.particles.push({
            x: b.x + Math.random() * b.w,
            y: b.y + Math.random() * b.h,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.12,
            r: Math.random() * 0.8 + 0.3,
            a: Math.random() * 0.25 + 0.05,
            card: ci,
          });
        }
      });
      s.transfers = [];
      s.lastTransfer = performance.now();
    }

    function spawnTransfer(bounds, now) {
      const from = Math.floor(Math.random() * 4);
      let to = from;
      while (to === from) to = Math.floor(Math.random() * 4);
      const bFrom = bounds[from];
      const bTo = bounds[to];
      if (!bFrom || !bTo) return;

      const count = s.isMobile ? 3 : 5;
      for (let i = 0; i < count; i++) {
        const sx = bFrom.cx + (Math.random() - 0.5) * bFrom.w * 0.3;
        const sy = bFrom.cy + (Math.random() - 0.5) * bFrom.h * 0.3;
        const ex = bTo.cx + (Math.random() - 0.5) * bTo.w * 0.3;
        const ey = bTo.cy + (Math.random() - 0.5) * bTo.h * 0.3;

        const mx = (sx + ex) / 2 + (Math.random() - 0.5) * 80;
        const my = (sy + ey) / 2 + (Math.random() - 0.5) * 60;

        s.transfers.push({
          sx, sy, ex, ey, mx, my,
          t: 0,
          speed: 0.004 + Math.random() * 0.003,
          delay: i * 0.06,
          startTime: now,
          trail: [],
          r: Math.random() * 0.6 + 0.8,
        });
      }
    }

    function bezier(t, p0, p1, p2) {
      const u = 1 - t;
      return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    }

    function tick(now) {
      if (!running) return;
      const w = canvas.width / s.dpr;
      const h = canvas.height / s.dpr;
      ctx.clearRect(0, 0, w, h);

      const bounds = s.cachedBounds;
      const hovered = hoveredCard.current;

      // Internal particles
      for (const p of s.particles) {
        const b = bounds[p.card];
        if (!b) continue;

        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce within card
        if (p.x < b.x + 4) { p.x = b.x + 4; p.vx = Math.abs(p.vx); }
        if (p.x > b.x + b.w - 4) { p.x = b.x + b.w - 4; p.vx = -Math.abs(p.vx); }
        if (p.y < b.y + 4) { p.y = b.y + 4; p.vy = Math.abs(p.vy); }
        if (p.y > b.y + b.h - 4) { p.y = b.y + b.h - 4; p.vy = -Math.abs(p.vy); }

        let alpha = p.a;
        if (hovered === p.card) alpha = Math.min(alpha * 2.5, 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${alpha})`;
        ctx.fill();
      }

      // Hovered card glow
      if (hovered !== -1 && bounds[hovered]) {
        const b = bounds[hovered];
        const grd = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, Math.max(b.w, b.h) * 0.6);
        grd.addColorStop(0, "rgba(37,99,235,0.04)");
        grd.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }

      // Spawn transfers
      const interval = s.isMobile ? 5000 : 3500;
      if (now - s.lastTransfer > interval) {
        spawnTransfer(bounds, now);
        s.lastTransfer = now;
      }

      // Draw transfers
      for (let i = s.transfers.length - 1; i >= 0; i--) {
        const tr = s.transfers[i];
        const elapsed = (now - tr.startTime) / 1000 - tr.delay;
        if (elapsed < 0) continue;

        tr.t += tr.speed;
        if (tr.t > 1) {
          s.transfers.splice(i, 1);
          continue;
        }

        const px = bezier(tr.t, tr.sx, tr.mx, tr.ex);
        const py = bezier(tr.t, tr.sy, tr.my, tr.ey);
        tr.trail.push({ x: px, y: py, born: now });

        // Draw trail
        for (let j = tr.trail.length - 1; j >= 0; j--) {
          const age = (now - tr.trail[j].born) / 1000;
          if (age > 0.8) { tr.trail.splice(j, 1); continue; }
          const ta = (1 - age / 0.8) * 0.35;
          ctx.beginPath();
          ctx.arc(tr.trail[j].x, tr.trail[j].y, tr.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96,165,250,${ta})`;
          ctx.fill();
        }

        // Head particle
        ctx.beginPath();
        ctx.arc(px, py, tr.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${0.6 * (1 - tr.t * 0.5)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [updateBoundsCache, hoveredCard]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}

/* ── DiagonalLines ────────────────────────────────────────── */

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

/* ── SolutionCard ─────────────────────────────────────────── */

function SolutionCard({ card, index, onRef, onHover }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    onRef(index, el);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onRef]);

  return (
    <div
      ref={ref}
      className="group relative bg-yfx-base border border-border-subtle rounded-card p-5 sm:p-7 flex flex-col transition-all duration-500 hover:border-yfx-brand/25 hover:-translate-y-1 hover:shadow-[0_4px_40px_rgba(37,99,235,0.10)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, border-color 0.5s, box-shadow 0.5s`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
    >
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(37,99,235,0.05) 0%, transparent 70%)" }}
      />
      <div className="relative z-[1]">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] border border-border bg-yfx-card flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-yfx-brand/30 group-hover:bg-yfx-elevated group-hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
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
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export default function Solutions() {
  const cardRefs = useRef([null, null, null, null]);
  const hoveredCard = useRef(-1);

  const handleRef = useCallback((index, el) => {
    cardRefs.current[index] = el;
  }, []);

  const handleHover = useCallback((index) => {
    hoveredCard.current = index;
  }, []);

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

        <div className="relative">
          <ParticleCanvas cardRefs={cardRefs} hoveredCard={hoveredCard} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card, i) => (
              <SolutionCard
                key={i}
                card={card}
                index={i}
                onRef={handleRef}
                onHover={handleHover}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
