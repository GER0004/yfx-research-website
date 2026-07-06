import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <section id="about" className="section-padding section-border relative overflow-hidden">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: "10%", left: "30%", width: "40%", height: "60%", background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(37,99,235,0.035) 0%, transparent 65%)", filter: "blur(50px)" }} />
      <Container>
        <SectionLabel number="01" text="About YFX Research" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16">
          <h2 className="text-h1 font-medium text-text-primary">
            Technology laboratory for intelligent digital systems.
          </h2>

          <div className="pt-0 md:pt-2">
            <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[440px]">
              YFX Research is a technology and research laboratory focused on
              building intelligent digital systems, algorithmic trading
              infrastructure, custom automation and digital products. We
              engineer production-grade solutions at the intersection of
              software, data and financial technology.
            </p>
            <div className="mt-6 sm:mt-7">
              <Button variant="outline">Learn more</Button>
            </div>
          </div>
        </div>

        {/* Cinematic video banner — 21:9 aspect */}
        <div
          className="mt-10 sm:mt-12 md:mt-16 relative rounded-[16px] sm:rounded-[20px] overflow-hidden"
          style={{
            boxShadow: "0 0 60px rgba(37,99,235,0.04), 0 0 20px rgba(37,99,235,0.015)",
          }}
        >
          <video
            className="w-full block"
            style={{
              aspectRatio: "21/9",
              objectFit: "cover",
              transform: "scale(1.06)",
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/videos/yfx-research-intro.mp4"
          />
          <div
            className="absolute inset-0 pointer-events-none rounded-[16px] sm:rounded-[20px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgb(5,6,8) 100%), " +
                "linear-gradient(to right, rgb(5,6,8), transparent 18%, transparent 82%, rgb(5,6,8)), " +
                "linear-gradient(to bottom, rgb(5,6,8), transparent 18%)",
            }}
          />
        </div>
      </Container>
    </section>
  );
}
