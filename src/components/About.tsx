import Image from "next/image";
import aboutImg from "../image/about.jpg";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300"
    >
      <div className="space-y-12">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            About Me
          </h2>
        </Reveal>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Profile Image */}
          <Reveal delay={100} className="shrink-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center overflow-hidden relative shadow-2xl shadow-indigo-500/10 transition-transform duration-500 hover:scale-[1.03]">
              <Image
                src={aboutImg}
                alt="Kavindya Tharangani"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Detailed Paragraphs */}
          <Reveal delay={200} className="flex-1">
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>
                Hi, I&apos;m{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  Kavindya Tharangani
                </span>
                , a passionate Full-Stack Software Engineer with hands-on
                experience designing and developing real-world web applications. I
                have completed internships at{" "}
                <span className="text-slate-900 dark:text-white font-medium">HCode Solution</span> and{" "}
                <span className="text-slate-900 dark:text-white font-medium">
                  BizSoft Software Solutions
                </span>
                , where I worked on building scalable, user-focused software and
                gained practical experience across the full development lifecycle.
              </p>
              <p>
                My technical expertise includes Java, Spring Boot, Angular, React,
                Next.js, NestJS, the MERN Stack, and Machine Learning.
              </p>

              {/* Download CV Button */}
              <div className="pt-4">
                <a
                  href="/cv.pdf"
                  download="Kavindya_Tharangani_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition duration-300 shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
                >
                  Download CV
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
