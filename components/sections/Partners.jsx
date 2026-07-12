/*
 * ── Partners marquee ──────────────────────────────────────────
 *
 * To add a new partner:
 *   1. Drop a white/light logo into /public/images/partners/
 *   2. Add one entry to the `partners` array below.
 *   3. Set `maxH` and `maxW` so the logo matches others visually.
 *   Done.
 *
 * Sizing guide:
 *   maxH  — rendered max-height in px (controls visual weight)
 *   maxW  — rendered max-width in px  (prevents wide logos from dominating)
 *   Both use object-fit: contain — no stretching, aspect ratio preserved.
 */

const partners = [
  { name: "GRAMM.",   logo: "/images/partners/gramm.png",    h: 34 },
  { name: "TK GROUP", logo: "/images/partners/tk-group.svg", h: 48 },
];

function PartnerLogo({ partner }) {
  return (
    <div
      className="
        shrink-0 flex items-center justify-center
        h-[50px] sm:h-[60px]
        opacity-[0.55] hover:opacity-100
        transition-all duration-300 cursor-default select-none
      "
      style={{ width: 200 }}
      title={partner.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={partner.logo}
        alt={partner.name}
        className="object-contain"
        style={{ height: partner.h, width: "auto" }}
        loading="eager"
        draggable={false}
      />
    </div>
  );
}

export default function Partners() {
  const strip = [...partners, ...partners, ...partners, ...partners,
                 ...partners, ...partners];

  return (
    <section
      className="relative mt-8 sm:mt-10 h-[70px] sm:h-[80px] lg:h-[90px] flex items-center overflow-hidden group"
      aria-label="Partners"
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(148,163,184,0.04) 0%, rgba(37,99,235,0.15) 50%, rgba(148,163,184,0.04) 100%)",
        }}
      />

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(148,163,184,0.04) 0%, rgba(37,99,235,0.15) 50%, rgba(148,163,184,0.04) 100%)",
        }}
      />

      {/* Left edge fade */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050608, transparent)" }}
      />

      {/* Right edge fade */}
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050608, transparent)" }}
      />

      {/* Marquee track — pauses on hover */}
      <div className="flex partners-track">
        {strip.map((partner, i) => (
          <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>

      <style>{`
        .partners-track {
          animation: partnersScroll 35s linear infinite;
          width: max-content;
          will-change: transform;
          contain: layout style;
        }
        .group:hover .partners-track {
          animation-play-state: paused;
        }
        @keyframes partnersScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
