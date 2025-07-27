"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const designTips: string[] = [
  "🎨 Designs done with purpose and precision.",
  "🧩 Function and form in harmony.",
  "🛠️ We craft bold brand identities.",
];

// 🔁 Simulate a database fetch
const fetchGalleryImages = async (): Promise<
  { src: string; alt: string; type: string }[]
> => {
  // Replace with actual fetch logic
  return [
    {
      src: "/projects/sneakcity.png",
      alt: "SneakCity Footwear",
      type: "Design",
    },
    {
      src: "/projects/munchies.png",
      alt: "Munchies Branding",
      type: "Business Cards",
    },
    {
      src: "/projects/campaign-2024.png",
      alt: "Campaign Poster",
      type: "Posters",
    },
    { src: "/projects/logo-star.png", alt: "Star Logo", type: "Logos" },
    {
      src: "/projects/studio-shot.png",
      alt: "Photographic Studio",
      type: "Photographic",
    },
  ];
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const DesignsDonePage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [filteredType, setFilteredType] = useState("All");
  const [galleryImages, setGalleryImages] = useState<
    { src: string; alt: string; type: string }[]
  >([]);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar || (isLargeScreen && transitionComplete);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setTransitionComplete(true), 800);
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % designTips.length);
    }, 3000);

    // Fetch gallery images from "database"
    const loadImages = async () => {
      const data = await fetchGalleryImages();
      setGalleryImages(data); // if data is empty, fallback logic triggers
    };

    loadImages();

    return () => {
      clearTimeout(timer);
      clearInterval(tipInterval);
    };
  }, []);

  const filteredImages =
    filteredType === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.type === filteredType);

  return (
    <div
      className={`flex flex-col sm:flex-row min-h-screen transition-all duration-1000 ease-in-out ${
        transitionComplete ? "bg-yellow-300" : "bg-yellow-300"
      }`}>
      {!isLargeScreen && (
        <button
          onClick={() => setShowSidebar(true)}
          className="sm:hidden fixed top-4 left-4 z-30 bg-black text-white px-3 py-2 rounded shadow-md hover:bg-gray-800 transition">
          ☰
        </button>
      )}
      <Sidebar
        isOpen={isSidebarVisible}
        onClose={() => setShowSidebar(false)}
      />

      <main
        className={`min-h-screen flex items-center justify-center flex-col font-sans relative overflow-hidden px-4 py-8 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete ? "opacity-100" : "opacity-0"
        }`}>
        {/* Tip Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg z-20 text-center max-w-[90vw] shadow-md backdrop-blur-md"
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
            className="font-bold leading-none text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Designs Done
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-white drop-shadow-md text-[clamp(1rem, 3vw, 2rem)]">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Gallery Filter & Display */}
        <section className="mt-8 max-w-screen-lg w-full relative z-10 text-black">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-yellow-800 mb-4">
              Designs Gallery
            </h3>
            <select
              value={filteredType}
              onChange={(e) => setFilteredType(e.target.value)}
              className="bg-white border border-yellow-500 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
              <option value="All">All</option>
              <option value="Design">Design</option>
              <option value="Business Cards">Business Cards</option>
              <option value="Posters">Posters</option>
              <option value="Logos">Logos</option>
              <option value="Photographic">Photographic</option>
            </select>
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-20 text-yellow-900 font-semibold text-xl">
              🚧 Coming Soon...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, i) => (
                <motion.div
                  key={image.alt}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={cardVariants}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DesignsDonePage;
