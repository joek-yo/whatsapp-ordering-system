"use client";

import React from "react";
import { getBusinessData } from "@/lib/getBusinessData";

const Footer: React.FC = () => {
  const business = getBusinessData();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* Business Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold">{business.name}</h3>
          <p className="text-gray-400">
            Phone: <a href={`tel:${business.phone}`} className="hover:text-yellow-500">{business.phone}</a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-yellow-500 transition-colors">Facebook</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">WhatsApp</a>
        </div>

        {/* Copyright */}
        <div className="mt-4 md:mt-0 text-gray-500 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;