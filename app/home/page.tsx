"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen"; // adjust path if needed
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const alerts: string[] = [
  "🔥 New portfolio updates coming soon!",
  "📣 Client showcase launching this week.",
  "🧠 Stay creative, stay curious — TY Designs.",
];

const Page: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [currentAlert, setCurrentAlert] = useState<number>(0);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar || (isLargeScreen && transitionComplete);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 800);

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
          ? "bg-yellow-300"
          : "bg-yellow-300 bg-[url('/tinos.png')] bg-[position:center_top] bg-cover bg-no-repeat mix-blend-multiply"
      }`}>
      {/* Sidebar Toggle (Mobile Only) */}
      {!isLargeScreen && (
        <button
          onClick={() => setShowSidebar(true)}
          className="sm:hidden fixed top-4 left-4 z-30 bg-black text-white px-3 py-2 rounded">
          ☰
        </button>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarVisible}
        onClose={() => setShowSidebar(false)}
      />

      {/* Main Content */}
      <main
        className={`min-h-screen flex-1 font-sans relative overflow-hidden px-4 py-8 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete
            ? "bg-[url('/tinos.png')] bg-[position:center_top] bg-cover bg-no-repeat mix-blend-multiply opacity-100"
            : "opacity-0"
        }`}>
        {/* Alert Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded transition-opacity duration-500 z-20 text-center max-w-[90vw] break-words"
          aria-live="polite"
          role="status">
          {alerts[currentAlert]}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col justify-center items-center max-w-screen-lg mx-auto text-center animate-fadeIn">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-bold leading-none text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 10rem)" }}>
            {currentYear}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 md:mt-8 text-white drop-shadow-md text-[clamp(1rem, 3vw, 3rem)]">
            Tinotenda James
          </motion.h2>
        </div>
      </main>
    </div>
  );
};

export default Page;
