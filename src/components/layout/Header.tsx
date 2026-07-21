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
  FaMapMarkerAlt,
  FaClock,
  FaSun,
  FaMoon,
  FaGem,
  FaHeart,
} from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { getBusinessData } from "@/lib/getBusinessData";
import menuData from "@/data/menu.json";

const Header: React.FC = () => {
  const business = getBusinessData();
  const { cart, toggleDrawer } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/menu", label: "Menu", icon: FaUtensils },
    { href: "/about", label: "About", icon: FaHeart },
    { href: "/custom-order", label: "Custom Order", icon: FaGem },
    { href: "/contact", label: "Contact", icon: FaEnvelope },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-border shadow-lg"
            : "bg-background/40 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MOBILE TOP BAR */}
          <div className="md:hidden">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-2">
                {business.logo && (
                  <Image src={business.logo} alt={business.name} width={40} height={40} className="object-contain rounded-lg" />
                )}
                <span className="text-lg font-black uppercase tracking-tight text-foreground">{business.name}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className="text-subtext p-2 rounded-lg hover:bg-surface2 transition cursor-pointer" aria-label="Toggle theme">
                  {isLight ? <FaMoon size={16} /> : <FaSun size={16} />}
                </button>
                <button onClick={() => toggleDrawer(true)} className="relative flex items-center bg-green text-background px-3 py-2 rounded-lg shadow-glow cursor-pointer">
                  <FaShoppingCart />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <button onClick={() => setMobileMenuOpen(true)} className="flex items-center gap-2 bg-green text-background px-3 py-2 rounded-lg font-black text-xs uppercase tracking-widest cursor-pointer">
                <FaBars size={14} /> Menu
              </button>

              <div className="flex space-x-2">
                <a href={`https://wa.me/${business.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 bg-whatsapp text-white rounded-lg shadow text-sm font-bold">
                  <FaWhatsapp className="mr-2" /> Chat
                </a>
                <a href={`tel:${business.phone}`} className="flex items-center px-3 py-2 bg-green-strong text-white rounded-lg shadow text-sm font-bold">
                  <FaPhoneAlt className="mr-2" /> Call
                </a>
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3 shrink-0">
              {business.logo && (
                <div className="p-1 bg-surface2 rounded-xl border border-border">
                  <Image src={business.logo} alt={business.name} width={44} height={44} className="object-contain rounded-lg" />
                </div>
              )}
              <span className="text-2xl font-black uppercase tracking-tighter text-foreground">{business.name}</span>
            </Link>

            <nav className="flex items-center gap-7">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-subtext hover:text-green transition-colors group">
                  <Icon size={15} className="group-hover:scale-110 transition-transform" />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <button onClick={toggleTheme} className="text-subtext p-2.5 rounded-xl border border-border bg-surface2 hover:border-green hover:text-green transition cursor-pointer" aria-label="Toggle theme">
                {isLight ? <FaMoon size={15} /> : <FaSun size={15} />}
              </button>
              <button onClick={() => toggleDrawer(true)} className="group flex items-center gap-3 bg-surface2 border border-border px-5 py-2.5 rounded-2xl hover:bg-green hover:text-background hover:border-green transition-all cursor-pointer">
                <div className="relative">
                  <FaShoppingCart className="text-green group-hover:text-background transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-3 -right-3 bg-green text-background text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">{totalItems}</span>
                  )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Cart ({totalItems})</span>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-[85%] max-w-xs bg-surface shadow-2xl z-[70] flex flex-col overflow-hidden"
              >
                <div className="relative w-full h-52 shrink-0">
                  <Image src={business.drawerBanner || business.banner} alt="Banner" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-white bg-black/20 p-2 rounded-full backdrop-blur-md cursor-pointer">
                    <FaTimes size={18} />
                  </button>
                  <div className="absolute bottom-5 left-5 text-white">
                    <h2 className="text-2xl font-black uppercase tracking-tighter drop-shadow-lg">{business.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="h-[2px] w-4 bg-green rounded-full" />
                      <p className="text-xs font-semibold italic text-white/90 tracking-wide drop-shadow-md">{business.slogan}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-5 space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted mb-3 tracking-[0.2em]">Main Menu</p>
                    <div className="space-y-1">
                      <DrawerLink href="/" icon={<FaHome />} label="Home" onClick={() => setMobileMenuOpen(false)} />
                      <DrawerLink href="/menu" icon={<FaUtensils />} label="Explore Menu" onClick={() => setMobileMenuOpen(false)} />
                      <DrawerLink href="/about" icon={<FaHeart />} label="Our Story" onClick={() => setMobileMenuOpen(false)} />
                      <DrawerLink href="/custom-order" icon={<FaGem />} label="Custom Order" onClick={() => setMobileMenuOpen(false)} />
                      <DrawerLink href="/contact" icon={<FaEnvelope />} label="Contact Us" onClick={() => setMobileMenuOpen(false)} />
                    </div>
                  </div>

                  <div className="pt-5 border-t border-border">
                    <p className="text-[10px] font-black uppercase text-muted mb-3 tracking-[0.2em]">Business Info</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-surface2 p-3 rounded-xl">
                        <div className="flex items-center text-subtext text-sm font-semibold">
                          <FaClock className="mr-3 text-green" /> Status
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
                          </span>
                          <span className="text-green text-xs font-black uppercase tracking-tighter">{menuData.hero.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-surface2 p-3 rounded-xl">
                        <div className="flex items-center text-subtext text-sm font-semibold">
                          <FaMapMarkerAlt className="mr-3 text-green" /> Location
                        </div>
                        <span className="text-foreground text-xs font-bold">{menuData.hero.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-surface2 border-t border-border space-y-3">
                  <a href={`tel:${business.phone}`} className="flex items-center justify-center w-full py-3 bg-green-strong text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95">
                    <FaPhoneAlt className="mr-3" /> Call to Order Now
                  </a>
                  <a href={`https://wa.me/${business.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-3 bg-whatsapp text-white rounded-xl font-bold shadow-glow transition-transform active:scale-95">
                    <FaWhatsapp className="mr-3 text-xl" /> Order via WhatsApp
                  </a>
                  <p className="text-[9px] text-center text-muted mt-2 font-medium tracking-widest uppercase italic">
                    {business.tagline || "Crafted Moments The Jaby Way"}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
      <div className="h-20 md:h-24"></div>
    </>
  );
};

const DrawerLink = ({ href, icon, label, onClick }: any) => (
  <Link href={href} onClick={onClick} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-green-soft text-foreground font-bold transition group">
    <div className="bg-surface2 p-2 rounded-lg group-hover:bg-green-soft transition text-green">{icon}</div>
    <span className="text-sm">{label}</span>
  </Link>
);

export default Header;
