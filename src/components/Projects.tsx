import { portfolioData } from '@/data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline">
                GitHub Repo
              </a>
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline">
                  Live Demo
                </a>
              ) : (
                <span className="text-slate-500 dark:text-slate-500">No live demo</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}