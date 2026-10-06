"use client";

import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "./Reveal";

const fieldContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const field: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const badge: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const headingLetters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const touchWord: Variants = {
  hidden: { opacity: 0, x: 40, rotate: 6 },
  show: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 16 } },
};

const underline: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { delay: 0.35, duration: 0.8, ease: "easeInOut" } },
};

const plane: Variants = {
  hidden: { opacity: 0, x: -160, y: 50, rotate: 25 },
  show: {
    opacity: [0, 1, 1, 0],
    x: [-160, -20, 120, 260],
    y: [50, 0, -30, -80],
    rotate: [25, 5, -10, -25],
    transition: { duration: 2, ease: "easeInOut", delay: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ContactHeader() {
  const ref = useRef<HTMLDivElement>(null);
  // Not `once`: replays every time the section scrolls back into view.
  const inView = useInView(ref, { amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      variants={headerContainer}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative text-center space-y-4 mb-12"
    >
      <motion.span
        variants={badge}
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20"
      >
        <motion.span
          aria-hidden="true"
          animate={{ rotate: [0, -15, 15, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        >
          ✉
        </motion.span>
        Let&apos;s Connect
      </motion.span>

      <div className="relative">
        {/* Paper plane flying across the heading */}
        <motion.span
          variants={plane}
          className="pointer-events-none absolute left-1/2 top-0 text-2xl sm:text-3xl"
          aria-hidden="true"
        >
          ✈️
        </motion.span>

        <motion.h2
          variants={headingLetters}
          aria-label="Get In Touch"
          className="text-3xl sm:text-5xl font-extrabold tracking-tight"
        >
          {["Get", "In"].map((word) => (
            <span key={word} aria-hidden="true" className="inline-block whitespace-nowrap mr-[0.25em]">
              {word.split("").map((char, i) => (
                <motion.span key={i} variants={letter} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            variants={touchWord}
            aria-hidden="true"
            className="relative inline-block text-indigo-600 dark:text-indigo-400"
          >
            Touch
            {/* Hand-drawn underline */}
            <svg
              className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-3 sm:h-4 overflow-visible"
              viewBox="0 0 200 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M3 11 C 40 3, 80 3, 110 8 S 170 14, 197 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                variants={underline}
              />
            </svg>
          </motion.span>
        </motion.h2>
      </div>

      <motion.p
        variants={fadeUp}
        className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm sm:text-base pt-2"
      >
        Feel free to reach out if you want to collaborate, have a question, or just want to connect.
      </motion.p>
    </motion.div>
  );
}

const WEB3FORMS_ACCESS_KEY = "2a85620e-d829-4d90-92c7-b302605c92ee";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    setStatusMessage("");

    const formData = new FormData(form.current);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        form.current?.reset();
      } else {
        console.log("FAILED...", result);
        setStatusMessage("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.log("FAILED...", error);
      setStatusMessage("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <ContactHeader />

      {/* Form */}
      <Reveal delay={150}>
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={fieldContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          {/* Web3Forms access key - routes every submission to tharanganikavi08@gmail.com */}
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="from_name" value="Kavi Portfolio Contact Form" />
          {/* Honeypot spam-trap field: kept hidden from real users, bots tend to fill it in */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          {/* Name */}
          <motion.div variants={field} className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
              className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={field} className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </motion.div>

          {/* Subject */}
          <motion.div variants={field} className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={field} className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Your Message
            </label>
            <textarea
              placeholder="Your Message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            variants={field}
            whileHover={loading ? undefined : { scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}
            whileTap={loading ? undefined : { scale: 0.98 }}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white rounded-xl font-semibold transition-colors duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </motion.button>

          {/* Status Notification */}
          <AnimatePresence>
          {statusMessage && (
            <motion.p
              key={statusMessage}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-center text-sm mt-4 ${
                statusMessage.includes("successfully")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {statusMessage}
            </motion.p>
          )}
          </AnimatePresence>
        </motion.form>
      </Reveal>
    </section>
  );
};

export default Contact;
