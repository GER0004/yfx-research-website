"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const navItems = [
  "Research",
  "Solutions",
  "Technology",
  "About",
  "Careers",
  "Contact",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle"
      style={{
        background: "#050608dd",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="#" className="flex items-baseline gap-1.5 shrink-0">
            <span className="text-base sm:text-lg font-bold tracking-[0.08em] text-text-primary">
              YFX
            </span>
            <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.18em] text-text-secondary uppercase">
              Research
            </span>
          </a>

          {/* Desktop nav — visible from lg (1024px) up */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex gap-7">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            <Button variant="outline" className="!py-[7px] !px-[18px] !text-sm">
              Explore
            </Button>
          </nav>

          {/* Mobile / tablet toggle — visible below lg */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden bg-transparent border-none text-text-primary cursor-pointer p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile / tablet menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-1 pb-6 pt-3 border-t border-border-subtle">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base text-text-secondary hover:text-text-primary transition-colors py-2.5 px-1"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-3">
              <Button variant="outline" className="w-full sm:w-auto justify-center">
                Explore
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
