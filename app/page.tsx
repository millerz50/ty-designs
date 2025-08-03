"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Motion wrapper for optimized Next.js Image
const MotionImage = motion(Image);

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Swirl background */}
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
        {/* Logo #1: Millerz */}
        <MotionImage
          src="/Millerz-logo.png"
          alt="Millerz Logo"
          width={128}
          height={128}
          initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-4"
        />

        {/* Spinner animation */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full mb-4"
        />

        {/* Logo #2: TY Designs */}
        <MotionImage
          src="/tino-logo.png"
          alt="TY Designs Logo"
          width={96}
          height={96}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />

        {/* Brand badge */}
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
