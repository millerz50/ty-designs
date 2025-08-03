"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPalette, FaRocket, FaUserFriends } from "react-icons/fa";

const alerts: string[] = [
  "💼 Our services empower your brand.",
  "🎯 Precision-crafted digital experiences.",
  "🌟 Creativity meets functionality — TY Designs.",
];

const ServicesPage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(0);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar;
  const currentYear = new Date().getFullYear();

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

  useEffect(() => {
    if (isLargeScreen) setShowSidebar(true);
  }, [isLargeScreen]);

  const services = [
    {
      title: "Web Design",
      description:
        "Stunning, responsive websites tailored to your brand's personality.",
      icon: <FaRocket className="text-yellow-400 text-3xl mb-4" />,
    },
    {
      title: "Brand Identity",
      description:
        "Logos, typography, and visual systems that leave lasting impressions.",
      icon: <FaPalette className="text-yellow-400 text-3xl mb-4" />,
    },
    {
      title: "UX/UI Consulting",
      description:
        "Optimized user journeys and delightful interactions across platforms.",
      icon: <FaUserFriends className="text-yellow-400 text-3xl mb-4" />,
    },
  ];

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
          className="fixed top-4 left-4 z-30 bg-black text-white px-3 py-2 rounded shadow-md hover:bg-gray-800 transition">
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
          role="status">
          {alerts[currentAlert]}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col justify-center items-center max-w-screen-lg mx-auto text-center animate-fadeIn mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-extrabold leading-none text-white drop-shadow-lg tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Services
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent font-extrabold tracking-wide text-[clamp(1rem,3vw,2rem)] drop-shadow-lg animate-pulse">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Services Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4 sm:px-12 relative z-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-md hover:scale-105 transition shadow-lg text-white hover:shadow-2xl">
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h2 className="text-xl font-semibold uppercase text-yellow-400 mb-2">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
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

export default ServicesPage;
