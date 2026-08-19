"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    setStatusMessage("");

    emailjs
      .sendForm(
        'service_2lt4o4u',
        'template_mticf4a',
        form.current,
        'Rz2-mwEM6mOY6JXtJ'
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setStatusMessage("Message sent successfully! I'll get back to you soon.");
          setLoading(false);
          form.current?.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatusMessage("Failed to send message. Please try again later.");
          setLoading(false);
        }
      );
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
        {/* Recipient (fixed - all messages are delivered to this inbox) */}
        <input type="hidden" name="to_email" value="tharanganikavi08@gmail.com" />

        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="user_name"
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
            name="user_email"
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