"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

// ✅ Tip banner content
const designTips: string[] = [
  "🎨 Designs done with purpose and precision.",
  "🧩 Function and form in harmony.",
  "🛠️ We craft bold brand identities.",
];

// ✅ Folder definitions and expected image counts
type ImageType = {
  folder: string;
  type: string;
  count: number;
};

const imageTypes: ImageType[] = [
  { folder: "banners", type: "Banners", count: 12 },
  { folder: "designs", type: "Design", count: 12 },
  { folder: "flyer", type: "Flyers", count: 12 },
  { folder: "logos", type: "Logos", count: 12 },
];

// ✅ Gallery item definition
type GalleryImage = {
  src: string;
  alt: string;
  type: string;
};

// ✅ Skeleton placeholder
const SkeletonCard: React.FC = () => (
  <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse aspect-[4/3] w-full" />
);

// ✅ Simulated fetch logic for static assets
const fetchGalleryImages = async (): Promise<GalleryImage[]> => {
  return imageTypes.flatMap(({ folder, type, count }) =>
    Array.from({ length: count }, (_, i) => {
      const index = i + 1;
      return {
        src: `/clientale/${folder}/${folder}-${index}.jpg`,
        alt: `${type} ${index}`,
        type,
      };
    })
  );
};

// ✅ Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const DesignsDonePage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [currentTip, setCurrentTip] = useState<number>(0);
  const [filteredType, setFilteredType] = useState<string>("All");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar || (isLargeScreen && transitionComplete);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % designTips.length);
    }, 3000);

    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 800);

    const loadImages = async () => {
      const images = await fetchGalleryImages();
      setGalleryImages(images);
      setIsLoading(false);
    };

    loadImages();

    return () => {
      clearInterval(tipInterval);
      clearTimeout(timer);
    };
  }, []);

  const filteredImages: GalleryImage[] =
    filteredType === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.type === filteredType);

  return (
    <div
      className={`flex flex-col sm:flex-row min-h-screen transition-all duration-1000 ease-in-out ${
        transitionComplete ? "bg-neutral-50" : "bg-neutral-50"
      }`}>
      {!isLargeScreen && (
        <button
          onClick={() => setShowSidebar(true)}
          aria-label="Open Sidebar"
          className="sm:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white px-3 py-2 rounded shadow-md hover:bg-gray-700 transition">
          ☰
        </button>
      )}
      <Sidebar
        isOpen={isSidebarVisible}
        onClose={() => setShowSidebar(false)}
      />

      <main
        className={`min-h-screen flex items-center justify-center flex-col font-sans relative overflow-hidden px-6 py-10 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete ? "opacity-100" : "opacity-0"
        }`}>
        {/* Tip Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg z-20 text-center max-w-[90vw] shadow-md backdrop-blur-md"
          aria-live="polite"
          role="status">
          {designTips[currentTip]}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-bold leading-none text-gray-900 drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Designs Done
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-gray-700 drop-shadow-md text-[clamp(1rem, 3vw, 2rem)]">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Gallery Filter & Display */}
        <section className="mt-8 max-w-screen-lg w-full relative z-10 text-black">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
              Designs Gallery
            </h3>
            <label htmlFor="filter-select" className="sr-only">
              Filter Design Type
            </label>
            <select
              id="filter-select"
              value={filteredType}
              onChange={(e) => setFilteredType(e.target.value)}
              className="bg-white border border-yellow-500 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
              <option value="All">All</option>
              {imageTypes.map(({ type }) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

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
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 bg-white">
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
      </main>
    </div>
  );
};

export default DesignsDonePage;
