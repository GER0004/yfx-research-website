/**
 * YFX Research — Design Tokens
 *
 * Canonical values for anything not easily expressed in Tailwind classes.
 * Used by components that need inline style access to the token system.
 * The Tailwind config mirrors these values for class-based usage.
 */

const tokens = {
  colors: {
    bg: {
      black:    "#050608",
      base:     "#0B0E1A",
      card:     "#111B27",
      elevated: "#1A2130",
    },
    brand: {
      primary:  "#2563EB",
      light:    "#60A5FA",
      hover:    "#3B82F6",
    },
    text: {
      primary:  "#F8FAFC",
      secondary:"#94A3B8",
      muted:    "#64748B",
      faint:    "#334155",
    },
    border: {
      subtle:   "rgba(148,163,184,0.08)",
      default:  "rgba(148,163,184,0.12)",
      strong:   "rgba(148,163,184,0.18)",
    },
  },

  font: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'Space Grotesk', 'SF Mono', monospace",
  },
};

export default tokens;
