"use client";

import Sidebar from "@/components/sidebar";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const designTips: string[] = [
  "🎨 Designs done with purpose and precision.",
  "🧩 Function and form in harmony.",
  "🛠️ We craft bold brand identities.",
];

type ImageType = {
  folder: string;
  type: string;
  count: number;
};

type GalleryImage = {
  src: string;
  alt: string;
  type: string;
};

const imageTypes: ImageType[] = [
  { folder: "banners", type: "Banners", count: 12 },
  { folder: "designs", type: "Design", count: 12 },
  { folder: "flyer", type: "Flyers", count: 12 },
  { folder: "logos", type: "Logos", count: 12 },
];

const SkeletonCard: React.FC = () => (
  <div className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md animate-pulse aspect-[4/3] w-full shadow-md" />
);

const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  return imageTypes.flatMap(({ folder, type, count }) =>
    Array.from({ length: count }, (_, i) => ({
      src: `/clientale/${folder}/${folder}-${i + 1}.jpg`,
      alt: `${type} ${i + 1}`,
      type,
    }))
  );
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const DesignsDonePage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [filteredType, setFilteredType] = useState("All");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setTransitionComplete(true), 800);
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % designTips.length);
    }, 3000);

    const loadImages = async () => {
      const images = await fetchGalleryImages();
      setGalleryImages(images);
      setIsLoading(false);
    };

    loadImages();

    return () => {
      clearTimeout(timer);
      clearInterval(tipInterval);
    };
  }, []);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSidebar(false);
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, []);

  const filteredImages =
    filteredType === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.type === filteredType);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-neutral-50 transition-all duration-1000 ease-in-out relative">
      {/* Overlay for closing sidebar */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 z-10 bg-transparent"
        />
      )}

      {/* 🔧 Fixed: sidebar closes properly now */}
      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

      <main
        className={`min-h-screen flex-1 font-sans relative overflow-hidden px-6 py-10 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete ? "opacity-100" : "opacity-0"
        }`}>
        {/* Tip Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 bg-opacity-70 text-white px-4 py-2 rounded-lg z-20 text-center max-w-[90vw] shadow-md backdrop-blur-md"
          aria-live="polite"
          role="status">
          {designTips[currentTip]}
        </div>

        {/* Hero */}
        <div className="relative z-10 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-extrabold leading-none text-gray-900 drop-shadow-lg tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Designs Done
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent font-extrabold tracking-wide text-[clamp(1rem,3vw,2rem)] drop-shadow-lg animate-pulse">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Gallery Filter */}
        <section className="mt-8 max-w-screen-lg w-full relative z-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
              Designs Gallery
            </h3>
            <select
              value={filteredType}
              onChange={(e) => setFilteredType(e.target.value)}
              className="bg-white/10 backdrop-blur-md border border-yellow-400 text-yellow-200 font-semibold px-4 py-2 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300">
              <option value="All">All</option>
              {imageTypes.map(({ type }) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 text-yellow-900 font-semibold text-xl">
              🚧 Coming Soon...
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-0">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.alt}
                  variants={cardVariants}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 bg-white/10 backdrop-blur-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover aspect-[4/3] rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-700 text-sm py-8 relative z-10">
          © {currentYear} Tinotenda James — All rights reserved
          <br />
          <span>Don’t hesitate to reach out</span>
        </footer>
      </main>
    </div>
  );
};

export default DesignsDonePage;
