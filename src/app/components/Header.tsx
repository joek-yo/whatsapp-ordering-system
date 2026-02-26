"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getBusinessData } from "@/lib/getBusinessData";

const Header: React.FC = () => {
  const business = getBusinessData();

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Business Name */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-800"
        >
          {business.name}
        </motion.h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link href="/menu" className="text-gray-700 hover:text-gray-900 font-medium">
            Menu
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
            Contact
          </Link>
        </nav>

        {/* Phone CTA */}
        <motion.a
          href={`tel:${business.phone}`}
          className="ml-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Call Us
        </motion.a>

        {/* Mobile Placeholder */}
        <div className="md:hidden" />
      </div>
    </header>
  );
};

export default Header;