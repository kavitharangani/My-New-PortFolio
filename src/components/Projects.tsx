"use client";

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';
import Reveal from './Reveal';

type Project = (typeof portfolioData.projects)[number];

// One palette per card, cycled for any number of projects.
const themes = [
  { gradient: "from-indigo-600 via-violet-600 to-purple-700", accent: "text-indigo-600 dark:text-indigo-400" },
  { gradient: "from-sky-500 via-indigo-600 to-violet-700", accent: "text-sky-600 dark:text-sky-400" },
  { gradient: "from-fuchsia-600 via-purple-600 to-indigo-700", accent: "text-fuchsia-600 dark:text-fuchsia-400" },
  { gradient: "from-emerald-500 via-teal-600 to-indigo-700", accent: "text-emerald-600 dark:text-emerald-400" },
  { gradient: "from-amber-500 via-rose-500 to-purple-700", accent: "text-amber-600 dark:text-amber-400" },
];

const initials = (title: string) =>
  title
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = themes[index % themes.length];

  // Parallax for the artwork while this card scrolls into place.
  const { scrollYProgress: enter } = useScroll({ target: cardRef, offset: ["start end", "start start"] });
  const artScale = useTransform(enter, [0, 1], [1.35, 1]);
  const artRotate = useTransform(enter, [0, 1], [-6, 0]);

  // Once the next cards slide over it, this one shrinks back and dims.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.12]);

  return (
    <div ref={cardRef} className="h-screen sticky top-0 flex items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(-4vh + ${index * 26}px)` }}
        className="relative w-full origin-top rounded-[28px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-950/20 grid md:grid-cols-[1.05fr_1fr] min-h-[460px]"
      >
        {/* Content */}
        <div className="relative p-7 sm:p-10 flex flex-col">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-slate-500">
            <span className={`text-base font-black tabular-nums ${theme.accent}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-slate-300 dark:bg-slate-700" />
            <span>Project</span>
          </div>

          <h3 className="mt-6 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base max-w-md">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold shadow-lg"
            >
              GitHub Repo
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </motion.a>
            {project.demo ? (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                Live Demo
              </motion.a>
            ) : (
              <span className="text-xs text-slate-500">No live demo</span>
            )}
          </div>
        </div>

        {/* Artwork */}
        <div className="relative m-3 md:ml-0 rounded-[22px] overflow-hidden min-h-[220px]">
          <motion.div
            style={{ scale: artScale, rotate: artRotate }}
            className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <motion.div
              className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-black/25 blur-3xl" />
          </motion.div>

          {/* Mock app window */}
          <motion.div
            className="absolute inset-x-6 sm:inset-x-10 top-1/2 -translate-y-1/2 rounded-2xl bg-white/10 border border-white/25 backdrop-blur-md shadow-2xl overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/15">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
              <span className="ml-3 text-[10px] text-white/70 font-mono truncate">
                github.com/kavitharangani
              </span>
            </div>
            <div className="p-5 sm:p-6 flex items-center gap-5">
              <span className="text-5xl sm:text-6xl font-black text-white/90 tracking-tighter">
                {initials(project.title)}
              </span>
              <div className="flex-1 space-y-2">
                <div className="h-2 rounded-full bg-white/40 w-4/5" />
                <div className="h-2 rounded-full bg-white/25 w-3/5" />
                <div className="h-2 rounded-full bg-white/25 w-2/3" />
              </div>
            </div>
          </motion.div>

          {/* Darkens the card as later ones stack on top */}
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black pointer-events-none" />
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const projects = portfolioData.projects;
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="pt-24 px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      <Reveal className="space-y-4 text-center">
        <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
          Selected Work
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight pt-1">
          Featured <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
          Keep scrolling. Each project stacks on top of the last.
        </p>
      </Reveal>

      <div ref={stackRef} className="relative">
        {projects.map((project, i) => (
          <StackCard
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
