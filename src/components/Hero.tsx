"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

const HeroScene3D = dynamic(
  () => import("@/components/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false },
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLocale();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-aurora" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-noise opacity-[0.35]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-mask opacity-40" />

      <motion.div
        style={{ y: sceneY, opacity: sceneOpacity }}
        className="absolute inset-0 z-0"
      >
        <HeroScene3D />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05070b] via-[#05070b]/55 to-transparent lg:via-[#05070b]/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070b] to-transparent"
        />
      </motion.div>

      <motion.div
        style={{ y: copyY }}
        className="section-pad relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end pb-20 pt-28 lg:justify-center lg:pb-16"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
              {t.hero.role}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.4rem,12vw,7.5rem)] font-extrabold leading-[0.86] tracking-[-0.05em]"
          >
            <span className="gradient-text drop-shadow-[0_0_40px_rgba(94,234,212,0.25)]">
              {profile.brand}
            </span>
            <span className="mt-3 block text-[0.28em] font-semibold tracking-[0.42em] text-text/75">
              {t.hero.portfolio}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg"
          >
            {t.hero.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#work" className="hero-cta-primary">
              {t.hero.ctaWork}
            </a>
            <a href="#demos" className="hero-cta-ghost">
              {t.hero.ctaDemos}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
