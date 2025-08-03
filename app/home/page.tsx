"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen"; // Optional hook if needed
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const alerts: string[] = [
  "🟡 New portfolio updates coming soon!",
  "📸 Client showcase launching this week.",
  "🧠 Stay creative, stay curious — TY Designs.",
];

const Page: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(0);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar;

  useEffect(() => {
    const timer = setTimeout(() => setTransitionComplete(true), 800);
    const alertInterval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(alertInterval);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div
      className={`flex flex-col sm:flex-row min-h-screen transition-all duration-1000 ease-in-out ${
        transitionComplete
          ? ""
          : "bg-[url('/tinos.png')] bg-center bg-top bg-no-repeat bg-cover mix-blend-multiply"
      }`}>
      {!isSidebarVisible && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-4 left-4 z-30 bg-black text-white px-3 py-2 rounded"
          aria-label="Toggle sidebar">
          ☰
        </button>
      )}

      <Sidebar
        isOpen={isSidebarVisible}
        onClose={() => setShowSidebar(false)}
      />

      <main
        className={`min-h-screen flex-1 font-sans relative overflow-hidden px-4 py-8 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete
            ? "bg-[url('/tinos.png')] bg-center bg-top bg-no-repeat bg-cover mix-blend-multiply opacity-100"
            : "opacity-0"
        }`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Alert Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 bg-opacity-70 text-white px-4 py-2 rounded transition-opacity duration-500 z-20 text-center max-w-[90vw] break-words backdrop-blur-md shadow-md"
          aria-live="polite"
          aria-label="Site alerts"
          role="status">
          {alerts[currentAlert]}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col justify-center items-center max-w-screen-lg mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-extrabold leading-none text-white drop-shadow-lg tracking-tight"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              willChange: "opacity, transform",
            }}>
            {currentYear}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent font-extrabold tracking-wide text-[clamp(1.2rem,3vw,3rem)] drop-shadow-lg animate-pulse">
            Tinotenda James
          </motion.h2>

          <p className="text-gray-300 mt-2 text-lg italic font-light">
            Freelance Graphic Designer & Photographer
          </p>
        </div>

        {/* Portfolio Sections */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-4 sm:px-12 relative z-10">
          {[
            {
              title: "Services",
              description:
                "I offer customized creative services that bring ideas to life — from bold logo designs to captivating photography. My process is personalized, goal-oriented, and tailored to every client.",
            },
            {
              title: "Experiences",
              description:
                "I’ve collaborated across diverse industries, building expertise through hands-on design and storytelling. My approach is rooted in clear communication, trust, and creative vision.",
            },
            {
              title: "Design",
              description:
                "My philosophy blends simplicity with edge. Whether it's branding or layout, I push for clarity, elegance, and fresh perspectives — creating designs that connect visually and emotionally.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-md hover:scale-105 transition shadow-lg text-white">
              <h3 className="text-xl font-semibold uppercase text-yellow-400">
                {card.title}
              </h3>
              <p className="text-sm mt-2 text-gray-300">{card.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400 text-sm py-8 relative z-10">
          © {currentYear} Tinotenda James — All rights reserved
          <br />
          <a
            href="mailto:your@email.com"
            className="underline hover:text-white">
            Get in touch
          </a>
        </footer>
      </main>
    </div>
  );
};

export default Page;
