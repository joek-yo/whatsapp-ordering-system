"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getBusinessData } from "@/lib/getBusinessData";
import { FaWhatsapp, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import menuData from "@/data/menu.json";

const Hero: React.FC = () => {
  const business = getBusinessData();

  return (
    <section className="w-screen max-w-none min-h-[90vh] relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      {business.banner && (
        <Image
          src={business.banner}
          alt="Hero Banner"
          fill
          className="absolute inset-0 w-full h-full object-cover scale-105"
          priority
        />
      )}
      {/* Layered overlay for depth + legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Ambient glow accents */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 bg-surface2/80 backdrop-blur-md border border-border px-4 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
              {menuData.hero?.status || "Open Now"}
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-green mb-4"
        >
          {business.name || "House Of Jaby"}
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground leading-[0.95] mb-6 drop-shadow-xl"
        >
          {business.tagline || "Crafted Moments The Jaby Way"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-xl text-subtext mb-10 max-w-2xl mx-auto"
        >
          Fast Delivery • Fresh Ingredients • Hit Us Up
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10"
        >
          <Link href="/menu">
            <Button
              variant="primary"
              size="lg"
              className="group"
              rightIcon={<FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
            >
              View Menu
            </Button>
          </Link>
          <Button
            href={`https://wa.me/${business.phone}?text=Hello%20I%20would%20like%20to%20order`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            leftIcon={<FaWhatsapp size={16} />}
          >
            Order via WhatsApp
          </Button>
        </motion.div>

        {menuData.hero?.location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="inline-flex items-center gap-2 text-subtext text-xs font-semibold bg-surface2/60 backdrop-blur-md border border-border px-4 py-2 rounded-full"
          >
            <FaMapMarkerAlt className="text-green" size={12} />
            {menuData.hero.location}
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default Hero;
