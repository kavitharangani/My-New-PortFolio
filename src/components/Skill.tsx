"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const skillCategories = [
  {
    category: "Languages & Core",
    icon: "⚡",
    blurb: "The languages I think and build in every day.",
    color: "from-amber-400 to-orange-500",
    skills: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "C++", "HTML5 / CSS3"],
  },
  {
    category: "Frameworks & Backend",
    icon: "⚙️",
    blurb: "Scalable APIs and services with clean architecture.",
    color: "from-sky-400 to-indigo-500",
    skills: ["Spring Boot", "NestJS", "Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"],
  },
  {
    category: "Frontend Web & Mobile",
    icon: "🎨",
    blurb: "Responsive, animated interfaces people enjoy using.",
    color: "from-fuchsia-400 to-purple-500",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS", "Redux", "Bootstrap"],
  },
  {
    category: "Databases & ORM",
    icon: "🗄️",
    blurb: "Modelling, querying and keeping data consistent.",
    color: "from-emerald-400 to-teal-500",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Hibernate"],
  },
  {
    category: "DevOps & Tools",
    icon: "🛠️",
    blurb: "Shipping reliably from commit to production.",
    color: "from-rose-400 to-pink-500",
    skills: ["Git & GitHub", "Docker", "Postman", "CI/CD", "AWS Basics", "Vercel"],
  },
  {
    category: "Concepts & AI/ML",
    icon: "🧠",
    blurb: "Foundations that make the code hold up.",
    color: "from-violet-400 to-indigo-500",
    skills: ["OOP", "Data Structures", "Agile/Scrum", "Machine Learning", "System Design"],
  },
];

const allSkills = skillCategories.flatMap((group) => group.skills);

// Point on a circle, as % of the orbit box (0,0 = top-left, 50,50 = centre).
const polar = (index: number, count: number, radius: number, offsetDeg = -90) => {
  const a = ((index / count) * 360 + offsetDeg) * (Math.PI / 180);
  return { left: `${50 + radius * Math.cos(a)}%`, top: `${50 + radius * Math.sin(a)}%` };
};

/** A ring whose angle is a MotionValue, so items mounted at any time can counter-rotate in sync. */
function useRingRotation(degPerSecond: number, paused: boolean) {
  const rotation = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion) return;
    rotation.set(rotation.get() + (degPerSecond * delta) / 1000);
  });
  return rotation;
}

function Upright({ ring, children }: { ring: MotionValue<number>; children: React.ReactNode }) {
  const rotate = useTransform(ring, (r) => -r);
  return <motion.div style={{ rotate }}>{children}</motion.div>;
}

function SkillOrbit({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  const outer = useRingRotation(8, paused);
  const inner = useRingRotation(-14, paused);
  const group = skillCategories[active];

  return (
    <div
      className="relative w-full max-w-[520px] aspect-square mx-auto select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ring guides */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-slate-300 dark:border-slate-700/80" />
      <div className="absolute inset-[22%] rounded-full border border-slate-200 dark:border-slate-800" />
      <motion.div
        className="absolute inset-[22%] rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(99,102,241,0.35)_15%,transparent_30%)]"
        style={{ rotate: inner }}
        aria-hidden="true"
      />

      {/* Glowing core */}
      <div className="absolute inset-[36%] flex items-center justify-center">
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${group.color} blur-2xl opacity-40`}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative w-full h-full rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center text-center p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-3xl sm:text-4xl">{group.icon}</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 leading-tight">
                {group.skills.length} skills
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Inner ring: skills of the selected category */}
      <motion.div className="absolute inset-0" style={{ rotate: inner }}>
        <AnimatePresence>
          {group.skills.map((skill, i) => (
            <motion.div
              key={`${active}-${skill}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={polar(i, group.skills.length, 28)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05, type: "spring", stiffness: 260, damping: 18 } }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.15 } }}
            >
              <Upright ring={inner}>
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  className="block whitespace-nowrap px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur"
                >
                  {skill}
                </motion.span>
              </Upright>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Outer ring: category planets */}
      <motion.div className="absolute inset-0" style={{ rotate: outer }}>
        {skillCategories.map((g, i) => {
          const isActive = i === active;
          return (
            <div
              key={g.category}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={polar(i, skillCategories.length, 46)}
            >
              <Upright ring={outer}>
                <motion.button
                  type="button"
                  onClick={() => onSelect(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  aria-label={g.category}
                  aria-pressed={isActive}
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl border shadow-xl transition-colors ${
                    isActive
                      ? "bg-indigo-600 border-indigo-400 shadow-indigo-500/40"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="orbit-active-glow"
                      className="absolute -inset-1.5 rounded-[20px] border-2 border-indigo-400/60"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {g.icon}
                </motion.button>
              </Upright>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Marquee({ items, reverse = false, duration = 40 }: { items: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-3 py-1.5"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((skill, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
          >
            <span className="text-indigo-500 mr-2">✦</span>
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skill() {
  const [active, setActive] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const group = skillCategories[active];

  // Tour the categories automatically until the visitor picks one.
  useEffect(() => {
    if (userPicked || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % skillCategories.length), 4000);
    return () => clearInterval(id);
  }, [userPicked, inView]);

  const select = (index: number) => {
    setUserPicked(true);
    setActive((index + skillCategories.length) % skillCategories.length);
  };

  return (
    <section
      ref={sectionRef}
      id="skill"
      className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -ml-[250px] -mt-[250px] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="space-y-14 relative z-10">
        {/* Header Section */}
        <Reveal className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & <span className="text-indigo-600 dark:text-indigo-400">Technologies</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Tap a planet to explore. Each orbit holds the tools I use to craft scalable applications.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <Reveal>
            <SkillOrbit active={active} onSelect={select} />
          </Reveal>

          {/* Detail panel */}
          <Reveal delay={150}>
            <div className="relative rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-7 sm:p-8 shadow-xl backdrop-blur-md overflow-hidden">
              <motion.div
                key={group.color}
                className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${group.color} opacity-20 blur-3xl`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.6 }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-5"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {group.icon}
                    </span>
                    <div>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {String(active + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold">{group.category}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400">{group.blurb}</p>

                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="px-3.5 py-1.5 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400/60 hover:shadow-[0_0_14px_rgba(99,102,241,0.25)] transition-[border-color,box-shadow] cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Category stepper */}
              <div className="relative mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex gap-1.5">
                  {skillCategories.map((g, i) => (
                    <button
                      key={g.category}
                      type="button"
                      onClick={() => select(i)}
                      aria-label={g.category}
                      className="relative h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden transition-[width] duration-300"
                      style={{ width: i === active ? 32 : 10 }}
                    >
                      {i === active && (
                        <motion.span
                          key={`${active}-${userPicked}`}
                          className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                          initial={{ width: userPicked ? "100%" : "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: userPicked ? 0 : 4, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {[-1, 1].map((dir) => (
                    <motion.button
                      key={dir}
                      type="button"
                      onClick={() => select(active + dir)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={dir < 0 ? "Previous category" : "Next category"}
                      className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-indigo-500 transition-colors"
                    >
                      {dir < 0 ? "←" : "→"}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Infinite skill marquee */}
        <Reveal delay={100} className="space-y-3">
          <Marquee items={allSkills.slice(0, Math.ceil(allSkills.length / 2))} duration={45} />
          <Marquee items={allSkills.slice(Math.ceil(allSkills.length / 2))} reverse duration={50} />
        </Reveal>
      </div>
    </section>
  );
}
