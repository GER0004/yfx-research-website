import Container from "@/components/ui/Container";

const footerLinks = [
  "Research",
  "Solutions",
  "Technology",
  "About",
  "Careers",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8 sm:py-10">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          {/* Logo */}
          <a href="#" className="flex items-baseline gap-1.5 shrink-0">
            <span className="text-base font-bold tracking-[0.08em] text-text-primary">
              YFX
            </span>
            <span className="text-[8px] font-medium tracking-[0.18em] text-text-muted uppercase">
              Research
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
            {footerLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200 py-1"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5">
            <span className="text-xs text-text-faint">
              © 2025 YFX Research. All rights reserved.
            </span>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-xs text-text-faint hover:text-text-muted transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs text-text-faint hover:text-text-muted transition-colors duration-200"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
