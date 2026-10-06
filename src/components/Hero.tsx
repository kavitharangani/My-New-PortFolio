"use client";

import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import heroImg from '../image/hero-optimized.jpg';
import HeroWeather from './HeroWeather';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const greeting = ["Hi,", "I'm"];
const nameWords = ["Kavindya", "Tharangani"];

const heading: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const nameWord: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Start the hero entrance only once the Preloader has faded out, so it isn't hidden behind it.
function useAfterPreloader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const start = (wait: number) => {
      timer = setTimeout(() => setReady(true), wait);
    };

    if (document.readyState === "complete") {
      start(700);
      return () => clearTimeout(timer);
    }

    const onLoad = () => start(300);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
    };
  }, []);

  return ready;
}

export default function Hero() {
  const ready = useAfterPreloader();
  const sectionRef = useRef<HTMLElement>(null);
  // Not `once`: the entrance replays every time the hero scrolls back into view (e.g. clicking "Home").
  const inView = useInView(sectionRef, { amount: 0.4 });
  const show = ready && inView;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen max-w-6xl mx-auto px-6 text-slate-900 dark:text-white flex flex-col md:flex-row items-center justify-center gap-12 pt-16 transition-colors duration-300"
    >
      {/* Decorative animated glow blobs */}
      <motion.div
        className="absolute -top-20 -left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 dark:bg-indigo-400/10 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
        animate={{ scale: [1, 1.25, 1], x: [0, -25, 0], y: [0, 15, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Snow + lightning background */}
      <HeroWeather active={show} />

      {/* Left Content: staggered entrance */}
      <motion.div
        className="relative z-10 flex-1 space-y-6"
        variants={container}
        initial="hidden"
        animate={show ? "show" : "hidden"}
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60 rounded-full border border-indigo-200 dark:border-indigo-800 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for Hire
        </motion.span>

        <motion.h1
          variants={heading}
          className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight [perspective:600px]"
          aria-label="Hi, I'm Kavindya Tharangani"
        >
          {/* "Hi, I'm" — letters flip up one by one */}
          {greeting.map((word, wi) => (
            <span key={wi} aria-hidden="true">
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  variants={letter}
                  whileHover={{ y: -8, color: "#818cf8" }}
                  className="inline-block origin-bottom cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </span>{" "}
            </span>
          ))}

          {/* Name — each word slides up from behind a mask, then the gradient shimmers */}
          {nameWords.map((word, wi) => (
            <span
              key={wi}
              aria-hidden="true"
            >
              <span className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
              <motion.span variants={nameWord} className="inline-block">
                <motion.span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ["0% center", "200% center"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  {word}
                </motion.span>
              </motion.span>
              </span>
              {wi < nameWords.length - 1 && " "}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={item} className="text-lg text-slate-600 dark:text-slate-400">
          Software Engineering Student & Web Developer
        </motion.p>

        <motion.div variants={item} className="flex gap-4 pt-2">
          <motion.a
            href="https://github.com/kavitharangani"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors duration-300 shadow-lg shadow-indigo-600/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub Profile
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 rounded-lg font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Image Block: scale-up entrance, then a gentle continuous float */}
      <motion.div
        className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 shrink-0"
        initial={{ opacity: 0, y: 30 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Rotating gradient ring */}
        <motion.div
          className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,var(--color-indigo-500),transparent_40%,var(--color-purple-500),transparent_80%,var(--color-indigo-500))] opacity-60 blur-[2px]"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-indigo-500/40 flex items-center justify-center overflow-hidden relative shadow-2xl shadow-indigo-500/10"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={heroImg}
            alt="Kavindya Tharangani"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 288px, 224px"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
