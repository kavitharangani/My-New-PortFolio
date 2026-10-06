"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finish = () => setLoading(false);

    if (document.readyState === "complete") {
      const timer = setTimeout(finish, 400);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
              transition={{
                opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.4 },
              }}
            >
              KT
            </motion.span>
            <motion.div
              className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
