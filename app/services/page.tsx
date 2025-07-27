"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPalette, FaRocket, FaUserFriends } from "react-icons/fa";

const alerts: string[] = [
  "💼 Our services empower your brand.",
  "🎯 Precision-crafted digital experiences.",
  "🌟 Creativity meets functionality — TY Designs.",
];

// Card animation variants with rotation
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ServicesPage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [currentAlert, setCurrentAlert] = useState<number>(0);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar || (isLargeScreen && transitionComplete);
  const currentYear = new Date().getFullYear();

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

  const services = [
    {
      title: "Web Design",
      description:
        "Stunning, responsive websites tailored to your brand's personality.",
      icon: <FaRocket className="text-yellow-500 text-3xl mb-4" />,
    },
    {
      title: "Brand Identity",
      description:
        "Logos, typography, and visual systems that leave lasting impressions.",
      icon: <FaPalette className="text-yellow-500 text-3xl mb-4" />,
    },
    {
      title: "UX/UI Consulting",
      description:
        "Optimized user journeys and delightful interactions across platforms.",
      icon: <FaUserFriends className="text-yellow-500 text-3xl mb-4" />,
    },
  ];

  return (
    <div
      className={`flex flex-col sm:flex-row min-h-screen transition-all duration-1000 ease-in-out ${
        transitionComplete
          ? "bg-yellow-300"
          : "bg-yellow-300 bg-[url('/tinos.png')] bg-[position:center_top] bg-cover bg-no-repeat mix-blend-multiply"
      }`}>
      {/* Sidebar Toggle */}
      {!isLargeScreen && (
        <button
          onClick={() => setShowSidebar(true)}
          className="sm:hidden fixed top-4 left-4 z-30 bg-black text-white px-3 py-2 rounded shadow-md hover:bg-gray-800 transition">
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
        className={`min-h-screen flex items-center justify-center flex-col font-sans relative overflow-hidden px-4 py-8 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete
            ? "bg-[url('/tinos.png')] bg-[position:center_top] bg-cover bg-no-repeat mix-blend-multiply opacity-100"
            : "opacity-0"
        }`}>
        {/* Alert Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg transition-opacity duration-500 z-20 text-center max-w-[90vw] break-words shadow-md backdrop-blur-md"
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
            className="font-bold leading-none text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Services
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 md:mt-8 text-white drop-shadow-md text-[clamp(1rem, 3vw, 2rem)]">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Services Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 text-black">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ rotate: 3 }}
              className="p-6 border border-yellow-500 rounded-xl shadow-lg bg-white bg-opacity-90 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 hover:border-black">
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h2 className="text-xl font-semibold mb-2 text-yellow-800">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-800">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;
