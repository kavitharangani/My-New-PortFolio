import Image from 'next/image';
import heroImg from '../image/hero.jpg';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen max-w-6xl mx-auto px-6 text-slate-900 dark:text-white flex flex-col md:flex-row items-center justify-center gap-12 pt-16 transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative animated glow blobs */}
      <div
        className="absolute -top-20 -left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-blob"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 dark:bg-indigo-400/10 rounded-full blur-[110px] pointer-events-none animate-blob [animation-delay:2s]"
        aria-hidden="true"
      />

      {/* Left Content with Fade-In Animation */}
      <div className="relative z-10 flex-1 space-y-6 animate-fade-in-up">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60 rounded-full border border-indigo-200 dark:border-indigo-800 shadow-sm">
          Available for Hire
        </span>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
          Hi, I&apos;m <span className="text-indigo-600 dark:text-indigo-400">Kavindya Tharangani</span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400">
          Software Engineering Student & Web Developer
        </p>

        <div className="flex gap-4 pt-2">
          <a
            href="https://github.com/kavitharangani"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            GitHub Profile
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 rounded-lg font-medium transition duration-300 hover:scale-105 active:scale-95"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Image Block with Scale-up Animation, then a gentle continuous float */}
      <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 shrink-0 animate-fade-in-scale">
        <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-indigo-500/40 flex items-center justify-center overflow-hidden relative shadow-2xl shadow-indigo-500/10 animate-float">
          <Image
            src={heroImg}
            alt="Kavindya Tharangani"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
