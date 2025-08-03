"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionComplete(true);
      router.push("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Glow swirl */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(circle,_#facc15_0%,_transparent_70%)] z-0"
      />

      {/* Splash content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center z-10">
        {/* Logo 1 */}
        <motion.img
          src="/Millerz-logo.png"
          alt="Millerz Logo"
          initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-32 h-32 mb-4"
        />

        {/* Spinner */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full mb-4"
        />

        {/* Logo 2 */}
        <motion.img
          src="/tino-logo.jpg"
          alt="TY Designs Logo"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-24 h-24"
        />

        {/* Branding badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 text-center text-gray-400 text-sm tracking-wide">
          <span>
            by <span className="font-bold text-yellow-400">Millerz</span> with{" "}
            <span className="font-bold text-white">TY Designs</span>
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Page;
