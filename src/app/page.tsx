import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skill from "@/components/Skill";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-x-clip">
      <Navbar />
      <Hero />
      <About />
      <Skill />
      <Experience />
      <Projects />
      <Gallery />
      <Contact />
      <footer className="py-6 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-950">
        © {new Date().getFullYear()} Kavitha Rangani. All rights reserved.
      </footer>
    </main>
  );
}