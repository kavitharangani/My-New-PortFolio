"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Experience() {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "HCode Solution",
      period: "Sep 2024 - Mar 2025",
      isCurrent: false,
      description: "Worked on building scalable, user-focused web applications. Participated in the full software development lifecycle, collaborated with senior developers, and implemented modern frontend and backend solutions.",
      techStack: ["React", "Node.js", "JavaScript", "REST APIs", "Java", "Spring Boot", "MySQL", "Angular"]
    },
    {
      role: "Software Engineering Intern",
      company: "BizSoft Software Solutions",
      period: "Aug 2025 - Present",
      isCurrent: true,
      description: "Contributed to developing software systems with clean architecture. Solved complex technical challenges, integrated database solutions, and assisted in delivering high-quality client applications.",
      techStack: ["NestJS", "Next.js", "React", "Node.js", "Spring Boot", "MySQL"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="space-y-12">

        {/* Header Section */}
        <Reveal className="space-y-3">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
            Work <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
            A showcase of my hands-on industry experience, roles, and technical contributions.
          </p>
        </Reveal>

        {/* Work Experience Timeline Section */}
        <div className="relative ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
          {/* Timeline line that draws itself in on scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800/80" aria-hidden="true" />
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 to-purple-500 origin-top"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {experiences.map((exp, idx) => (
            <Reveal key={idx} delay={idx * 120} className="relative group">

              {/* Glowing Timeline Dot */}
              <motion.div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-300 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 + idx * 0.15 }}
              />

              {/* Experience Card */}
              <motion.div
                className="bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/40 hover:bg-slate-100 dark:hover:bg-slate-900/70 transition-colors duration-300 shadow-xl"
                whileHover={{ y: -4, x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-base sm:text-lg">
                        {exp.company}
                      </span>
                      <span className="text-xs text-slate-500">• Internship</span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {exp.isCurrent && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    )}
                    <span className={`text-xs font-medium px-3.5 py-1.5 rounded-full border ${
                      exp.isCurrent 
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" 
                        : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20"
                    }`}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech Badges */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="text-xs font-medium px-3 py-1.5 bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300/60 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/50 hover:bg-indigo-100 dark:hover:bg-indigo-950/30 transition-colors duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
