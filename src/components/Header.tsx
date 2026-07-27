"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#demos", label: t.nav.demos },
    { href: "#skills", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled || open
          ? "border-b border-white/8 bg-[#05070b]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="section-pad mx-auto flex h-full max-w-6xl items-center justify-between">
        <a href="#" className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.22em]">
          {profile.brand}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted transition hover:text-accent"
            >
              {l.label}
            </a>
          ))}

          <div className="flex items-center overflow-hidden rounded-full border border-white/15 text-[10px] font-bold uppercase tracking-[0.14em]">
            <button
              type="button"
              onClick={() => setLocale("ro")}
              className={`px-2.5 py-1.5 transition ${
                locale === "ro" ? "bg-accent text-[#041016]" : "text-muted hover:text-accent"
              }`}
              aria-pressed={locale === "ro"}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1.5 transition ${
                locale === "en" ? "bg-accent text-[#041016]" : "text-muted hover:text-accent"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#041016]"
          >
            {t.nav.github}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center overflow-hidden rounded-full border border-white/15 text-[10px] font-bold uppercase tracking-[0.14em]">
            <button
              type="button"
              onClick={() => setLocale("ro")}
              className={`px-2 py-1 transition ${
                locale === "ro" ? "bg-accent text-[#041016]" : "text-muted"
              }`}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2 py-1 transition ${
                locale === "en" ? "bg-accent text-[#041016]" : "text-muted"
              }`}
            >
              EN
            </button>
          </div>
          <button type="button" aria-label={t.nav.menu} onClick={() => setOpen((v) => !v)}>
            <div className="flex w-5 flex-col gap-1.5">
              <span className={`h-px w-full bg-text transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-text transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-text transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[var(--header-h)] z-40 bg-[#05070b]/98 backdrop-blur-xl md:hidden"
          >
            <nav className="section-pad flex flex-col gap-6 pt-10">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-display)] text-3xl tracking-tight"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
