"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaShoppingCart,
  FaHome,
  FaUtensils,
  FaEnvelope,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { getBusinessData } from "@/lib/getBusinessData";

const Header: React.FC = () => {
  const business = getBusinessData();
  const { cart, toggleDrawer } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔒 Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ========== MOBILE LAYOUT ========== */}
          <div className="md:hidden">
            {/* Row 1: Brand + Cart */}
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-2">
                {business.logo && (
                  <Image
                    src={business.logo}
                    alt={business.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                )}
                <span className="text-2xl font-bold text-gray-800 whitespace-nowrap">
                  {business.name}
                </span>
              </div>

              <button
                onClick={() => toggleDrawer(true)}
                className="relative flex items-center bg-green-900 text-white px-3 py-2 rounded-lg shadow-md"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Row 2: Hamburger + Chat + Call */}
            <div className="flex justify-between items-center pb-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-800 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <FaBars size={22} />
              </button>

              <div className="flex space-x-2">
                <a
                  href={`https://wa.me/${business.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg shadow"
                >
                  <FaWhatsapp className="mr-2" /> Chat
                </a>

                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center px-3 py-2 bg-green-700 text-white rounded-lg shadow"
                >
                  <FaPhoneAlt className="mr-2" /> Call
                </a>
              </div>
            </div>
          </div>

          {/* ========== DESKTOP LAYOUT ========== */}
          <div className="hidden md:flex items-center justify-between py-4">
            {/* Left: Brand */}
            <div className="flex items-center space-x-2">
              {business.logo && (
                <Image
                  src={business.logo}
                  alt={business.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              )}
              <span className="text-2xl font-bold text-gray-800 whitespace-nowrap">
                {business.name}
              </span>
            </div>

            {/* Center: Nav */}
            <nav className="flex items-center space-x-8 font-medium">
              <Link href="/" className="hover:text-green-700 transition">
                Home
              </Link>
              <Link href="/menu" className="hover:text-green-700 transition">
                Menu
              </Link>
              <Link href="/contact" className="hover:text-green-700 transition">
                Contact
              </Link>
            </nav>

            {/* Right: Chat + Call + Cart */}
            <div className="flex items-center space-x-3">
              <a
                href={`https://wa.me/${business.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg shadow"
              >
                <FaWhatsapp className="mr-2" /> Chat
              </a>

              <a
                href={`tel:${business.phone}`}
                className="flex items-center px-3 py-2 bg-green-700 text-white rounded-lg shadow"
              >
                <FaPhoneAlt className="mr-2" /> Call
              </a>

              <button
                onClick={() => toggleDrawer(true)}
                className="relative flex items-center bg-green-900 text-white px-3 py-2 rounded-lg shadow-md"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========== MOBILE SLIDE-OUT DRAWER ========== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col p-6"
              >
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <FaTimes size={22} />
                  </button>
                </div>

                {/* Brand */}
                <div className="flex items-center space-x-2 mb-8">
                  {business.logo && (
                    <Image
                      src={business.logo}
                      alt={business.name}
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="text-xl font-bold">{business.name}</span>
                </div>

                {/* Drawer Nav */}
                <nav className="flex flex-col space-y-6 text-lg font-medium">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 hover:text-green-700 transition"
                  >
                    <FaHome /> <span>Home</span>
                  </Link>

                  <Link
                    href="/menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 hover:text-green-700 transition"
                  >
                    <FaUtensils /> <span>Menu</span>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 hover:text-green-700 transition"
                  >
                    <FaEnvelope /> <span>Contact</span>
                  </Link>
                </nav>

                {/* Chat + Call at Bottom */}
                <div className="mt-auto flex flex-col space-y-3">
                  <a
                    href={`https://wa.me/${business.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                  >
                    <FaWhatsapp className="mr-2" /> Chat
                  </a>
                  <a
                    href={`tel:${business.phone}`}
                    className="flex items-center justify-center px-3 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
                  >
                    <FaPhoneAlt className="mr-2" /> Call
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <div className="h-20"></div>
    </>
  );
};

export default Header;