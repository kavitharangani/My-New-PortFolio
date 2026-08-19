"use client";

import { useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  category: "Certificates" | "Events" | "Hackathons" | "Projects" | "Personal" | "Family" | "Friends";
  imageUrl: string;
  description: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  // Gallery Data (ඔබේ Photos එකතු කරගන්න)
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Family Trip to Nuwara Eliya",
      category: "Family",
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800", // ඔබේ photo path එක දාන්න (eg: /images/family1.jpg)
      description: "A memorable vacation with family."
    },
    {
      id: 2,
      title: "University Friends Outing",
      category: "Friends",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
      description: "Weekend getaway with batchmates."
    },
    {
      id: 3,
      title: "Spring Boot Certification",
      category: "Certificates",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      description: "Successfully completed advanced backend development certification."
    },
    {
      id: 4,
      title: "Solo Travel Adventure",
      category: "Personal",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      description: "Exploring nature and taking a break from code."
    },
    {
      id: 5,
      title: "Hackathon Winner",
      category: "Hackathons",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      description: "Secured 1st place in the university annual hackathon."
    },
    {
      id: 6,
      title: "Tech Conference 2024",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      description: "Attended tech meetup as a speaker."
    }
  ];

  // Category Filter Tabs
  const categories = ["All", "Personal", "Family", "Friends", "Certificates", "Hackathons", "Events"];

  const filteredItems = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800/80 relative transition-colors duration-300">

      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="space-y-12 relative z-10">

        {/* Header Section */}
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20">
            Life & Milestones
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className="text-indigo-600 dark:text-indigo-400">Gallery</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg">
            A glance at my personal moments, family, friends, achievements, and tech journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-950 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Text Overlay Details */}
              <div className="p-5 space-y-1.5 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Click to View Full Image) */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-950/70 text-slate-300 hover:text-white rounded-full border border-slate-700/60 flex items-center justify-center transition-all"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Text Content */}
            <div className="p-6 space-y-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {activeImage.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeImage.title}</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{activeImage.description}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}