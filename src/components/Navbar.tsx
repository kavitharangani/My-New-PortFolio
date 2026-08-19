"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skill", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 text-slate-900 dark:text-white transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
          : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400 transition-transform duration-300 hover:scale-105"
        >
          Kavi Portfolio
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-indigo-500 rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
