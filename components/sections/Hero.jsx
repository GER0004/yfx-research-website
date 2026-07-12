import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen min-h-[100dvh] sm:min-h-[100dvh] flex flex-col relative pt-14 sm:pt-16 overflow-hidden"
      style={{ minHeight: "max(100dvh, 680px)" }}
    >
      {/* ── Video background layer ─────────────────────────────── */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.png"
          src="/videos/hero-wave.mp4"
        />
      </div>

      {/* ── Cinematic vignette ─────────────────────────────────── */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content ────────────────────────────────────────────── */}
      <Container className="relative z-10 flex-1 flex flex-col">
        {/* Desktop: center vertically */}
        <div className="hidden sm:flex items-center flex-1">
          <div className="max-w-[600px] py-16 lg:py-0">
            <h1 className="text-hero font-semibold text-text-primary">
              Intelligence.
              <br />
              Data.
              <br />
              Execution.
            </h1>

            <p className="text-base text-text-secondary leading-relaxed max-w-[400px] mt-7">
              Research-driven trading systems powered by artificial
              intelligence and real market edge.
            </p>

            <div className="mt-9">
              <Button variant="outline">Explore</Button>
            </div>
          </div>
        </div>

        {/* Mobile: content at bottom, AI figure visible above */}
        <div className="sm:hidden flex-1 flex flex-col justify-end pb-10">
          <h1 className="text-[clamp(2.5rem,10vw,3.5rem)] font-semibold text-text-primary leading-[1.08] tracking-[-0.03em]">
            Intelligence.
            <br />
            Data.
            <br />
            Execution.
          </h1>

          <p className="text-sm text-text-secondary leading-relaxed max-w-[300px] mt-4">
            Research-driven trading systems powered by artificial
            intelligence and real market edge.
          </p>

          <div className="mt-6">
            <Button variant="outline">Explore</Button>
          </div>
        </div>

        {/* Scroll indicator — hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-10 left-6 md:left-8 items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
            >
              <path d="M6 2v8M3 7l3 3 3-3" />
            </svg>
          </div>
          <span className="text-xs text-text-muted tracking-wide">
            Scroll to explore
          </span>
        </div>
      </Container>
    </section>
  );
}
