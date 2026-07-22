"use client";

import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

type ThemeToggleProps = {
  isLight: boolean;
  onToggle: () => void;
  className?: string;
};

export default function ThemeToggle({ isLight, onToggle, className = "" }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className={`relative inline-flex items-center w-14 h-8 rounded-full border border-border bg-surface2 transition-colors duration-300 cursor-pointer shrink-0 ${className}`}
    >
      {/* Track icons (dimmed, always visible) */}
      <span className="absolute left-2 text-subtext/40">
        <FaSun size={11} />
      </span>
      <span className="absolute right-2 text-subtext/40">
        <FaMoon size={10} />
      </span>

      {/* Sliding thumb */}
      <span
        className={`absolute top-1 w-6 h-6 rounded-full bg-green shadow-glow flex items-center justify-center transition-all duration-300 ease-out ${
          isLight ? "left-1" : "left-7"
        }`}
      >
        {isLight ? (
          <FaSun size={12} className="text-background" />
        ) : (
          <FaMoon size={11} className="text-background" />
        )}
      </span>
    </button>
  );
}
