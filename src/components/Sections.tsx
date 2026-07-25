"use client";

import { projects, skills, profile } from "@/lib/data";
import { ProjectCard3D } from "@/components/ProjectCard3D";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="section-pad mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Selected work</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
            Projects from GitHub
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            A curated set of builds — AI platforms, brand sites, automation, and systems work.
            Hover the cards for 3D tilt.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard3D key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-y border-white/5 py-20 md:py-24">
      <div className="section-pad mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Capabilities</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
          Stack & craft
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="glass rounded-full px-4 py-2 text-sm text-text"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-28">
      <div className="section-pad mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">About</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
            Building products that feel alive
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            Under {profile.brand}, I ship AI agents, automation CRMs, trading systems, and premium
            web experiences. The focus is always the same: modern visuals, real product depth, and
            deployments that land.
          </p>
        </div>
        <div className="glass relative overflow-hidden rounded-2xl p-8">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
          <dl className="relative space-y-5 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">Studio</dt>
              <dd className="mt-1 text-lg font-semibold">{profile.brand}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">Based</dt>
              <dd className="mt-1 text-lg font-semibold">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">GitHub</dt>
              <dd className="mt-1">
                <a href={profile.github} className="text-lg font-semibold text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  @EAGLEVISIONDEV
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 pb-28 pt-10">
      <div className="section-pad mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-14 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,212,0.12),transparent_60%)]" />
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">Contact</p>
          <h2 className="relative mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
            Let&apos;s build the next one
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm text-muted">
            Open for AI products, brand sites, and automation systems.
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#041016] transition hover:bg-accent-2"
          >
            Connect on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="section-pad mx-auto flex max-w-6xl flex-col gap-3 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.brand}</p>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          github.com/EAGLEVISIONDEV
        </a>
      </div>
    </footer>
  );
}
