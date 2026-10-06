"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import DNACarousel from "./DNACarousel";

import convocation1 from "../image/gallery/convocation1.jpg";
import convocation2 from "../image/gallery/convocation2.jpg";
import convocation3 from "../image/gallery/convocation3.jpg";
import convocation4 from "../image/gallery/convocation4.jpg";
import convocation5 from "../image/gallery/convocation5.jpg";
import convocation6 from "../image/gallery/convocation6.jpg";
import convocation7 from "../image/gallery/convocation7.jpg";
import convocation8 from "../image/gallery/convocation8.jpg";
import convocation9 from "../image/gallery/convocation9.jpg";
import convocation10 from "../image/gallery/convocation10.jpg";
import personal1 from "../image/gallery/personal1.jpg";
import personal2 from "../image/gallery/personal2.jpg";
import personal3 from "../image/gallery/personal3.jpg";
import personal4 from "../image/gallery/personal4.jpg";
import personal5 from "../image/gallery/personal5.jpg";
import personal6 from "../image/gallery/personal6.jpg";
import personal7 from "../image/gallery/personal7.jpg";
import personal8 from "../image/gallery/personal8.jpg";
import personal9 from "../image/gallery/personal9.jpg";
import family1 from "../image/gallery/family1.jpg";
import family2 from "../image/gallery/family2.jpg";
import family3 from "../image/gallery/family3.jpg";
import family4 from "../image/gallery/family4.jpg";
import friend1 from "../image/gallery/friend1.jpg";
import friend2 from "../image/gallery/friend2.jpg";
import friend3 from "../image/gallery/friend3.jpg";
import friend4 from "../image/gallery/friend4.jpg";
import event1 from "../image/gallery/event1.jpg";

type Category = "Convocation" | "Personal" | "Family" | "Friends" | "Events";

interface GalleryItem {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  description: string;
}

// To add a photo: put a resized copy in src/image/gallery/, import it above and add a row here.
const galleryItems: GalleryItem[] = [
  { image: convocation1, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation2, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation3, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation4, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation5, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation6, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation7, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation8, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation9, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: convocation10, category: "Convocation", title: "Convocation Day", description: "Celebrating my graduation, a proud milestone in my journey." },
  { image: personal1, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal2, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal3, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal4, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal5, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal6, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal7, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal8, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: personal9, category: "Personal", title: "Personal Moments", description: "A moment from my own story." },
  { image: family1, category: "Family", title: "Family Time", description: "Precious time with the people who matter most." },
  { image: family2, category: "Family", title: "Family Time", description: "Precious time with the people who matter most." },
  { image: family3, category: "Family", title: "Family Time", description: "Precious time with the people who matter most." },
  { image: family4, category: "Family", title: "Family Time", description: "Precious time with the people who matter most." },
  { image: friend1, category: "Friends", title: "With Friends", description: "Good times and great memories with friends." },
  { image: friend2, category: "Friends", title: "With Friends", description: "Good times and great memories with friends." },
  { image: friend3, category: "Friends", title: "With Friends", description: "Good times and great memories with friends." },
  { image: friend4, category: "Friends", title: "With Friends", description: "Good times and great memories with friends." },
  { image: event1, category: "Events", title: "Event Day", description: "Capturing a special event." },
].map((item, i) => ({ id: i + 1, title: item.title, category: item.category as Category, imageUrl: item.image.src, description: item.description }));

// Filter tabs: "All" plus every category that has at least one photo, in order of first appearance.
const categories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const activeItem = filteredItems[activeIndex] ?? filteredItems[0];

  return (
    <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 relative transition-colors duration-300">

      {/* Background Soft Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -ml-[200px] w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="space-y-12 relative z-10">

        {/* Header Section */}
        <Reveal className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Life & Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className="text-indigo-600 dark:text-indigo-400">Gallery</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
            A glance at my personal moments, family, friends, achievements, and tech journey.
          </p>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={100} className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(0);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-300 border ${
                selectedCategory === cat
                  ? "text-white border-indigo-500"
                  : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {selectedCategory === cat && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  className="absolute inset-0 -z-0 rounded-xl bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </Reveal>

        {/* DNA Helix Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <DNACarousel
              items={filteredItems}
              getKey={(item) => item.id}
              onActiveChange={setActiveIndex}
              onSelect={(item) => setActiveImage(item)}
              cardWidth={320}
              cardHeight={420}
              autoplay
              ariaLabel="Gallery"
              renderItem={(item, { isActive }) => (
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-200 dark:bg-slate-900 shadow-2xl shadow-black/30 ring-1 ring-black/5 dark:ring-white/10">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full"
                      >
                        {item.category}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )}
            />

            {/* Caption for the centred photo */}
            <div className="min-h-[92px] text-center">
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {activeItem.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                      {activeItem.description}
                    </p>
                    <p className="text-[11px] uppercase tracking-widest text-slate-500">
                      Drag, swipe or use ← → keys · Click to view
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Lightbox Modal (Click to View Full Image) */}
      <AnimatePresence>
      {activeImage && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setActiveImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-950/70 text-slate-300 hover:text-white rounded-full border border-slate-700/60 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              ✕
            </motion.button>

            {/* Modal Image */}
            <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Text Content */}
            <motion.div
              className="p-6 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {activeImage.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeImage.title}</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{activeImage.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </section>
  );
}
