"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const finish = () => {
      setLoading(false);
      setTimeout(() => setMounted(false), 500);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(finish, 400);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 animate-pulse">
          KT
        </span>
        <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin" />
      </div>
    </div>
  );
}
