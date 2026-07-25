"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Project } from "@/lib/data";
import { LivePreview } from "@/components/LivePreview";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard3D({ project, index }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 24 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 24 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 45%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const previewSrc = project.previewUrl ?? project.live;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f16]/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_40px_100px_rgba(94,234,212,0.12)] sm:p-5"
      >
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl"
          style={{ background: `${project.accent}33` }}
        />

        <div className="relative z-[1]" style={{ transform: "translateZ(24px)" }}>
          <LivePreview
            url={previewSrc}
            displayUrl={project.live}
            title={project.title}
          />

          <div className="mt-5 flex items-start justify-between gap-3 px-1">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
                {project.tagline}
              </p>
              <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-text">
                {project.title}
              </h3>
            </div>
            {project.featured && (
              <span
                className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#041016]"
                style={{ background: project.accent }}
              >
                Featured
              </span>
            )}
          </div>

          <p className="mt-3 px-1 text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2 px-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 px-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Open site →
            </span>
            {project.github && (
              <span
                role="link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.github, "_blank", "noopener,noreferrer");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.github, "_blank", "noopener,noreferrer");
                  }
                }}
                className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:border-accent hover:text-accent"
              >
                GitHub
              </span>
            )}
          </div>
        </div>
      </motion.a>
    </motion.article>
  );
}
