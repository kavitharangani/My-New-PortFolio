import Reveal from "./Reveal";

export default function Skill() {
  const skillCategories = [
    {
      category: "Languages & Core",
      icon: "⚡",
      skills: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "C++", "HTML5 / CSS3"]
    },
    {
      category: "Frameworks & Backend",
      icon: "⚙️",
      skills: ["Spring Boot", "NestJS", "Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"]
    },
    {
      category: "Frontend Web & Mobile",
      icon: "🎨",
      skills: ["React", "Next.js", "Angular", "Tailwind CSS", "Redux", "Bootstrap"]
    },
    {
      category: "Databases & ORM",
      icon: "🗄️",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Hibernate"]
    },
    {
      category: "DevOps & Tools",
      icon: "🛠️",
      skills: ["Git & GitHub", "Docker", "Postman", "CI/CD", "AWS Basics", "Vercel"]
    },
    {
      category: "Concepts & AI/ML",
      icon: "🧠",
      skills: ["OOP", "Data Structures", "Agile/Scrum", "Machine Learning", "System Design"]
    }
  ];

  return (
    <section id="skill" className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">

      {/* Background Subtle Radial Glow for High-Tech feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full animate-blob" />

      <div className="space-y-16 relative z-10">

        {/* Header Section */}
        <Reveal className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills & <span className="text-indigo-600 dark:text-indigo-400">Technologies</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            A comprehensive list of programming languages, frameworks, databases, and tools I use to craft scalable applications.
          </p>
        </Reveal>

        {/* Skills Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, idx) => (
            <Reveal key={idx} delay={idx * 90}>
              <div className="group relative bg-slate-50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1.5">
                {/* Subtle Card Top Border Highlight */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="text-xl p-2.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/60 dark:border-slate-700/60 text-indigo-600 dark:text-indigo-400 shadow-inner group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
                      {group.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 tracking-wide transition-colors">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium rounded-xl border border-slate-300/50 dark:border-slate-700/50 hover:text-slate-900 dark:hover:text-white hover:border-indigo-400/60 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)] hover:scale-105 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
