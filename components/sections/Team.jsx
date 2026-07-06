import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";

const MEMBER_COUNT = 5;

export default function Team() {
  return (
    <section id="team" className="section-padding section-border relative overflow-hidden">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ bottom: "5%", left: "35%", width: "30%", height: "40%", background: "radial-gradient(ellipse 100% 100% at 50% 60%, rgba(37,99,235,0.02) 0%, transparent 60%)", filter: "blur(60px)" }} />
      <Container>
        <SectionLabel number="06" text="Team" />

        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 mb-10 sm:mb-14">
          <h2 className="text-h1 font-medium text-text-primary">
            Researchers.
            <br />
            Engineers.
            <br />
            Market experts.
          </h2>
          <div className="self-end pb-1">
            <p className="text-sm sm:text-base text-text-secondary leading-[1.7] max-w-[420px]">
              A team of quantitative researchers, ML engineers and trading
              professionals, driven by curiosity and performance.
            </p>
            <div className="mt-5 sm:mt-6">
              <Button variant="ghost">Join the team</Button>
            </div>
          </div>
        </div>

        {/* Avatar grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: MEMBER_COUNT }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-[12px] sm:rounded-card bg-yfx-card border border-border-subtle relative overflow-hidden"
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[60%]"
                style={{
                  background:
                    "radial-gradient(ellipse at center bottom, #1A2130 0%, transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
