import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

const bullets = [
  "Algorithm-first architecture",
  "Modular development",
  "Secure infrastructure",
  "Long-term scalability",
];

const stack = [
  "Python", "FastAPI", "Docker", "PostgreSQL",
  "TradingView", "MetaTrader", "OpenAI", "Binance API",
];

export default function Technology() {
  return (
    <section id="technology" className="section-padding section-border relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "-10%", right: "10%", width: "50%", height: "60%", background: "radial-gradient(ellipse 100% 100% at 60% 40%, rgba(37,99,235,0.04) 0%, transparent 65%)", filter: "blur(40px)" }} />
      {/* Architecture grid lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1280 800" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tech-vfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="0" stopColor="#2563EB" />
            <stop offset="20%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="80%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="100%" stopOpacity="0" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="tech-hfade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopOpacity="0" stopColor="#2563EB" />
            <stop offset="15%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="85%" stopOpacity="1" stopColor="#2563EB" />
            <stop offset="100%" stopOpacity="0" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <line x1="320" y1="0" x2="320" y2="800" stroke="url(#tech-vfade)" strokeWidth="0.5" opacity="0.04" />
        <line x1="640" y1="0" x2="640" y2="800" stroke="url(#tech-vfade)" strokeWidth="0.5" opacity="0.05" />
        <line x1="960" y1="0" x2="960" y2="800" stroke="url(#tech-vfade)" strokeWidth="0.5" opacity="0.04" />
        <line x1="0" y1="200" x2="1280" y2="200" stroke="url(#tech-hfade)" strokeWidth="0.5" opacity="0.035" />
        <line x1="0" y1="400" x2="1280" y2="400" stroke="url(#tech-hfade)" strokeWidth="0.5" opacity="0.04" />
        <line x1="0" y1="600" x2="1280" y2="600" stroke="url(#tech-hfade)" strokeWidth="0.5" opacity="0.035" />
      </svg>
      <Container>
        <SectionLabel number="03" text="Technology" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-h1 font-medium text-text-primary">
              Built for reliability.
              <br />
              Engineered for performance.
              <br />
              Designed to scale.
            </h2>
            <ul className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-3.5">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-yfx-brand shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[240px] sm:h-[300px] md:h-[380px]">
            {/* Ambient glow behind 3D model */}
            <div
              className="absolute pointer-events-none"
              aria-hidden="true"
              style={{
                top: "15%",
                left: "20%",
                width: "60%",
                height: "60%",
                background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              src="/videos/technology-blueprint.mp4"
              style={{
                mask: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
                WebkitMask: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Technology stack */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-border-subtle">
          <p className="text-xs text-text-muted tracking-wide uppercase mb-6 sm:mb-8">
            Technology Stack
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {stack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-button border border-border-subtle bg-yfx-base text-xs sm:text-sm text-text-secondary font-medium tracking-[0.01em]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
