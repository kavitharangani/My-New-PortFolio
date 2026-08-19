import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400"
        >
          Kavi Portfolio
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</a>
          <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</a>
          <a href="#skill" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Skills</a>
          <a href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Experience</a>
          <a href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Projects</a>
          <a href="#gallery" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Gallery</a>
          <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</a>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}