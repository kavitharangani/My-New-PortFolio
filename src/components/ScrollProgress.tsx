"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin progress bar along the top of the page that tracks scroll position.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
