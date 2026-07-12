/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        yfx: {
          black:    "#050608",
          base:     "#0B0E1A",
          card:     "#111B27",
          elevated: "#1A2130",
          brand:    "#2563EB",
          "brand-light": "#60A5FA",
          "brand-hover": "#3B82F6",
        },
        text: {
          primary:  "#F8FAFC",
          secondary:"#94A3B8",
          muted:    "#64748B",
          faint:    "#334155",
        },
        border: {
          subtle:   "rgba(148,163,184,0.08)",
          DEFAULT:  "rgba(148,163,184,0.12)",
          strong:   "rgba(148,163,184,0.18)",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono:  ["var(--font-space-grotesk)", "SF Mono", "monospace"],
      },
      fontSize: {
        "hero":    ["clamp(3rem, 6.5vw, 5rem)",    { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "h1":      ["clamp(2rem, 3.5vw, 3rem)",     { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "h2":      ["clamp(1.75rem, 3vw, 2.5rem)",  { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h3":      ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.3" }],
      },
      spacing: {
        "section": "clamp(80px, 10vw, 140px)",
      },
      maxWidth: {
        "container": "1280px",
      },
      borderRadius: {
        "card": "14px",
        "button": "9999px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        "glow": "0 0 40px rgba(37,99,235,0.15)",
        "glow-strong": "0 0 60px rgba(37,99,235,0.25)",
      },
    },
  },
  plugins: [],
};
