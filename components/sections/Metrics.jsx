import Container from "@/components/ui/Container";

const metrics = [
  { value: "250+", label: "Data Sources" },
  { value: "99.99%", label: "System Uptime" },
  { value: "<1ms", label: "Execution Latency" },
  { value: "24/7", label: "Monitoring" },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-10 sm:py-14 border-y border-border-subtle">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={[
                "text-center py-4 sm:py-5 px-3 sm:px-4 flex flex-col items-center gap-1.5 sm:gap-2",
                /* Right column border on 2-col layout */
                i % 2 === 1 ? "border-l border-border-subtle" : "",
                /* Top border for bottom row on 2-col layout */
                i >= 2 ? "max-lg:border-t max-lg:border-border-subtle" : "",
                /* Vertical dividers on 4-col layout */
                i > 0 ? "max-lg:border-l-0 lg:border-l lg:border-border-subtle" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yfx-brand" />
                <span className="font-mono text-[clamp(1.25rem,2.5vw,2rem)] font-semibold text-text-primary tracking-tight">
                  {m.value}
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-text-muted tracking-wide">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
