"use client";

import Sidebar from "@/components/sidebar";
import { useIsLargeScreen } from "@/hooks/useIsLargeScreen";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const contactMessages = [
  "📩 Let's collaborate on your next big idea.",
  "📞 Reach out — we're just a message away.",
  "📍 TY Designs, connecting visions worldwide.",
];

const ContactPage: React.FC = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const isLargeScreen = useIsLargeScreen();
  const isSidebarVisible = showSidebar || (isLargeScreen && transitionComplete);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setTransitionComplete(true), 800);
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % contactMessages.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div
      className={`flex flex-col sm:flex-row min-h-screen transition-all duration-1000 ease-in-out ${
        transitionComplete
          ? "bg-yellow-300"
          : "bg-yellow-300 bg-[url('/tinos.png')] bg-center bg-cover bg-no-repeat mix-blend-multiply"
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
        className={`min-h-screen w-full flex flex-col items-center justify-center font-sans relative overflow-hidden px-4 py-8 sm:px-12 sm:py-16 transition-opacity duration-1000 ease-in-out ${
          transitionComplete
            ? "bg-[url('/tinos.png')] bg-center bg-cover bg-no-repeat mix-blend-multiply opacity-100"
            : "opacity-0"
        }`}>
        {/* Rotating Message Banner */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg transition-opacity duration-500 z-20 text-center max-w-[90vw] shadow-md backdrop-blur-md"
          aria-live="polite"
          role="status">
          {contactMessages[currentMessage]}
        </div>

        {/* Hero Section */}
        <div className="relative z-10 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-bold leading-none text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Contact
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 sm:mt-6 md:mt-8 text-white drop-shadow-md text-[clamp(1rem, 3vw, 2rem)]">
            TY Designs | {currentYear}
          </motion.h2>
        </div>

        {/* Contact Info Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 text-black">
          {[
            {
              title: "Email",
              value: "contact@tydesigns.com",
              icon: <FaEnvelope className="text-yellow-500 text-3xl mb-4" />,
            },
            {
              title: "Phone",
              value: "+263 78 061 8259",
              icon: <FaPhoneAlt className="text-yellow-500 text-3xl mb-4" />,
            },
            {
              title: "Location",
              value: "Harare, Zimbabwe",
              icon: (
                <FaMapMarkerAlt className="text-yellow-500 text-3xl mb-4" />
              ),
            },
          ].map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ rotate: 3 }}
              className="p-6 border border-yellow-500 rounded-xl shadow-lg bg-white bg-opacity-90 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 hover:border-black">
              <div className="flex flex-col items-center text-center">
                {info.icon}
                <h2 className="text-xl font-semibold mb-2 text-yellow-800">
                  {info.title}
                </h2>
                <p className="text-sm text-gray-800">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Contact Form */}
        <section className="mt-16 w-full max-w-2xl px-4 sm:px-0 relative z-10 text-black">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 border border-yellow-500"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
            }}>
            <h3 className="text-2xl font-semibold text-yellow-800 mb-4 text-center">
              Send Us a Message
            </h3>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white font-medium px-6 py-2 rounded hover:bg-yellow-600 transition shadow-md">
                Submit
              </button>
            </div>
          </motion.form>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
