"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TELEGRAM_URL = "https://t.me/yfxresearch";

const benefits = [
  "Early Platform Access",
  "Product Updates",
  "Research Releases",
  "Priority Invitations",
];

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-faint">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function EarlyAccess() {
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setError("Connection error. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="early-access" className="section-padding section-border relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "10%",
          left: "30%",
          width: "40%",
          height: "60%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <Container>
        <SectionLabel number="09" text="Early Access" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Left — Info */}
          <ScrollReveal className="lg:col-span-5">
            <div className="bg-yfx-base/40 border border-border-subtle rounded-card p-6 sm:p-8 h-full">
              <h2 className="text-h1 font-medium text-text-primary">
                Request Early
                <br />
                Access
              </h2>
              <p className="text-sm sm:text-base font-medium text-text-secondary mt-3">
                Be among the first to access the YFX Platform.
              </p>
              <p className="text-xs sm:text-sm text-text-muted leading-[1.7] mt-3 max-w-[400px]">
                Leave your details to receive early access, platform updates,
                research publications and company announcements.
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="w-[5px] h-[5px] rounded-full bg-yfx-brand shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Center — Form */}
          <ScrollReveal delay={0.1} className="lg:col-span-4">
            <div className="bg-yfx-base/40 border border-border-subtle rounded-card p-6 sm:p-8 h-full flex flex-col justify-center">
              {status === "success" ? (
                <div className="text-center py-4">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "rgba(37,99,235,0.12)", boxShadow: "0 0 30px rgba(37,99,235,0.1)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary mb-2">
                    Request received
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-1">
                    Thank you for your interest in YFX.
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-1">
                    Your request has been successfully received.
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                    We&apos;ll contact you when Early Access becomes available.
                  </p>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button border border-border-subtle bg-yfx-base text-sm font-medium text-text-secondary hover:border-border-strong hover:bg-white/[0.03] transition-all duration-200"
                  >
                    <TelegramIcon className="w-4 h-4 text-yfx-brand-light" />
                    Join Telegram
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-yfx-black/60 border border-border-subtle rounded-card px-4 pl-11 py-3.5 text-sm text-text-primary placeholder:text-text-faint/60 outline-none focus:border-yfx-brand/40 transition-colors duration-200"
                      disabled={status === "loading"}
                    />
                  </div>

                  <div className="relative">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-yfx-black/60 border border-border-subtle rounded-card px-4 pl-11 py-3.5 text-sm text-text-primary placeholder:text-text-faint/60 outline-none focus:border-yfx-brand/40 transition-colors duration-200"
                      disabled={status === "loading"}
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400/90 px-1">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-yfx-brand text-white font-medium text-sm rounded-card px-6 py-3.5 hover:bg-yfx-brand-hover hover:shadow-glow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Request Early Access
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <LockIcon />
                    <span className="text-[10px] sm:text-[11px] text-text-faint/60 font-mono">
                      We respect your privacy. No spam. Ever.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Right — Telegram */}
          <ScrollReveal delay={0.2} className="md:col-span-2 lg:col-span-3">
            <div className="bg-yfx-base/40 border border-border-subtle rounded-card p-6 sm:p-8 h-full flex flex-col items-center text-center justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(37,99,235,0.1)", boxShadow: "0 0 30px rgba(37,99,235,0.08)" }}
              >
                <TelegramIcon className="w-7 h-7 text-yfx-brand-light" />
              </div>

              <h3 className="text-sm sm:text-base font-medium text-text-primary mb-2">
                Join our Telegram
                <br />
                Community
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6 max-w-[200px]">
                Receive company updates, market insights and development progress in real time.
              </p>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-button border border-border-subtle bg-transparent text-sm font-medium text-text-secondary hover:border-border-strong hover:bg-white/[0.03] transition-all duration-200"
              >
                <TelegramIcon className="w-4 h-4 text-yfx-brand-light" />
                Join Telegram
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-faint">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
