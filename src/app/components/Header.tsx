"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { getBusinessData } from "@/lib/getBusinessData";

const Header: React.FC = () => {
  const business = getBusinessData();
  const { cart, toggleDrawer } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo + Business Name */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          {business.logo && (
            <Image
              src={business.logo}
              alt={business.name}
              width={50}
              height={50}
              className="object-contain"
            />
          )}
          <span className="text-2xl font-bold text-gray-800">
            {business.name}
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-green-700 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link href="/menu" className="text-green-700 hover:text-gray-900 font-medium">
            Menu
          </Link>
          <Link href="/contact" className="text-green-700 hover:text-gray-900 font-medium">
            Contact
          </Link>

          {/* Desktop Cart Button */}
          <button
            onClick={() => toggleDrawer(true)}
            className="relative flex items-center space-x-2 bg-green-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Phone CTA */}
        <motion.a
          href={`tel:${business.phone}`}
          className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Call Us
        </motion.a>

        {/* Mobile Cart Button */}
        <div className="md:hidden">
          <button
            onClick={() => toggleDrawer(true)}
            className="relative flex items-center bg-green-900 text-white px-3 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;