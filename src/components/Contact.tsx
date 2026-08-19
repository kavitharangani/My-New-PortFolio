"use client";

import { useRef, useState } from "react";

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
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
          Let&apos;s Connect
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Get In <span className="text-indigo-600 dark:text-indigo-400">Touch</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm sm:text-base">
          Feel free to reach out if you want to collaborate, have a question, or just want to connect.
        </p>
      </div>

      {/* Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md"
      >
        {/* Web3Forms access key - routes every submission to tharanganikavi08@gmail.com */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="from_name" value="Kavi Portfolio Contact Form" />
        {/* Honeypot spam-trap field: kept hidden from real users, bots tend to fill it in */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Subject
          </label>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Your Message
          </label>
          <textarea
            placeholder="Your Message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white rounded-xl font-semibold transition shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Status Notification */}
        {statusMessage && (
          <p
            className={`text-center text-sm mt-4 ${
              statusMessage.includes("successfully")
                ? "text-emerald-400"
                : "text-rose-400"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
