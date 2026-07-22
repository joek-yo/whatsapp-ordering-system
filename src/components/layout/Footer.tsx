"use client";

import React from "react";
import { getBusinessData } from "@/lib/getBusinessData";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  const business = getBusinessData();

  return (
    <footer className="bg-surface2 border-t border-border text-foreground pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-tight text-green mb-1">{business.name}</h3>
          <p className="text-subtext italic mb-4">{business.tagline || "Crafted Moments The Jaby Way"}</p>

          <p className="text-subtext mb-1">
            Phone:
            <a href={`tel:${business.phone}`} className="hover:text-green ml-1 transition">{business.phone}</a>
          </p>

          <p className="text-subtext">
            Email:
            <a href={`mailto:${business.email}`} className="hover:text-green ml-1 transition">{business.email}</a>
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-subtext">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-foreground">Quick Links</span>
          <a href="/" className="hover:text-green transition">Home</a>
          <a href="/about" className="hover:text-green transition">Our Story</a>
          <a href="/menu" className="hover:text-green transition">Menu</a>
          <a href="/custom-order" className="hover:text-green transition">Custom Order</a>
          <a href="/contact" className="hover:text-green transition">Contact</a>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-foreground">Connect With Us</span>
          <div className="flex space-x-3 mb-1">
            <a href="#" className="bg-surface border border-border p-2.5 rounded-lg text-subtext hover:text-green hover:border-green transition"><FaFacebookF size={16} /></a>
            <a href="#" className="bg-surface border border-border p-2.5 rounded-lg text-subtext hover:text-green hover:border-green transition"><FaInstagram size={16} /></a>
            <a href={`https://wa.me/${business.phone}`} className="bg-surface border border-border p-2.5 rounded-lg text-subtext hover:text-green hover:border-green transition"><FaWhatsapp size={16} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8" />

      <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-muted text-sm px-6 max-w-7xl mx-auto gap-2">
        <span>&copy; {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        <span className="text-xs text-muted text-center">
          Powered by <span className="font-semibold text-subtext">Builnex</span> — Digital Systems for Local Businesses •
          <a href="tel:0729724433" className="hover:text-green ml-1 transition">0729724433</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
