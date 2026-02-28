"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getBusinessData } from "@/lib/getBusinessData";

const Hero: React.FC = () => {
  const business = getBusinessData();

  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${business.banner})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        className="text-center text-white px-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {business.tagline}
        </h2>

        <Link
          href="/menu"
          className="mt-6 inline-block px-8 py-4 bg-green-900 text-white font-semibold rounded-lg shadow-lg hover:bg-green-800 transition-colors"
        >
          View Menu
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;