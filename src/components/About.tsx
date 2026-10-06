"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import aboutImg from "../image/about-optimized.jpg";
import Reveal from "./Reveal";

// Paragraph segments; `strong` ones get the accent colour once lit.
const story: { text: string; strong?: boolean }[] = [
  { text: "Hi, I'm" },
  { text: "Kavindya Tharangani,", strong: true },
  { text: "a passionate Full-Stack Software Engineer with hands-on experience designing and developing real-world web applications. I have completed internships at" },
  { text: "HCode Solution", strong: true },
  { text: "and" },
  { text: "BizSoft Software Solutions,", strong: true },
  { text: "where I worked on building scalable, user-focused software and gained practical experience across the full development lifecycle." },
];

const words = story.flatMap((seg) => seg.text.split(" ").map((word) => ({ word, strong: !!seg.strong })));

const cvHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv.pdf`;

function Word({
  children,
  strong,
  progress,
  range,
}: {
  children: string;
  strong: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] ${strong ? "text-indigo-600 dark:text-indigo-400 font-semibold" : ""}`}
    >
      {children}
    </motion.span>
  );
}

function TiltPhoto() {
  // Observed on the unclipped wrapper: the photo itself starts fully clipped, so it never "intersects".
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(wrapRef, { once: true, amount: 0.3 });
  // Pointer position over the card, -0.5..0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`;

  return (
    <motion.div
      ref={wrapRef}
      className="relative w-60 h-80 sm:w-72 sm:h-96 [perspective:1000px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Gradient frame behind the photo */}
        <div
          className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-transparent blur-md"
          style={{ transform: "translateZ(-40px)" }}
          aria-hidden="true"
        />

        {/* Photo, revealed with a wipe as it scrolls into view */}
        <motion.div
          className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/20 bg-slate-200 dark:bg-slate-800"
          initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
          animate={revealed ? { clipPath: "inset(0% 0% 0% 0% round 28px)" } : undefined}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={revealed ? { scale: 1 } : undefined}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={aboutImg}
              alt="Kavindya Tharangani"
              fill
              className="object-cover"
              sizes="(min-width: 640px) 288px, 240px"
            />
          </motion.div>
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glare }} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Floating badges at different depths */}
        <motion.div
          className="absolute -right-6 sm:-right-10 top-8"
          style={{ z: 60 }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 18 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"
          >
            <span className="text-indigo-500">✦</span> Full-Stack Engineer
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -left-6 sm:-left-10 bottom-10"
          style={{ z: 80 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 18 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-xl whitespace-nowrap"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">Currently</span>
              <span className="block text-xs font-semibold text-slate-800 dark:text-slate-100">Intern @ BizSoft</span>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.5"] });

  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300"
    >
      <div className="space-y-14">
        <Reveal className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Get To Know Me
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight pt-1">
            About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-14 md:gap-16">
          <div className="shrink-0 pt-2">
            <TiltPhoto />
          </div>

          <div className="flex-1 space-y-8">
            {/* Words light up as the paragraph scrolls through the viewport */}
            <p
              ref={textRef}
              className="text-xl sm:text-2xl leading-relaxed font-medium text-slate-800 dark:text-slate-100 flex flex-wrap"
            >
              {words.map((w, i) => (
                <Word
                  key={i}
                  strong={w.strong}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                >
                  {w.word}
                </Word>
              ))}
            </p>

            <Reveal delay={100}>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                My technical expertise includes{" "}
                {["Java", "Spring Boot", "Angular", "React", "Next.js", "NestJS", "the MERN Stack", "Machine Learning"].map(
                  (tech, i, arr) => (
                    <span key={tech}>
                      <motion.span
                        whileHover={{ y: -2 }}
                        className="inline-block font-medium text-slate-900 dark:text-white underline decoration-indigo-500/40 decoration-2 underline-offset-4 hover:decoration-indigo-500 transition-colors"
                      >
                        {tech}
                      </motion.span>
                      {i < arr.length - 2 ? ", " : i === arr.length - 2 ? ", and " : "."}
                    </span>
                  )
                )}
              </p>
            </Reveal>

            {/* Download CV with a sweeping sheen */}
            <Reveal delay={150}>
              <motion.a
                href={cvHref}
                download="Kavindya_Tharangani_CV.pdf"
                className="relative inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors duration-300 shadow-lg shadow-indigo-600/30 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                  animate={{ x: ["0%", "400%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span className="relative">Download CV</span>
                <motion.span
                  className="relative"
                  aria-hidden="true"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </motion.a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
