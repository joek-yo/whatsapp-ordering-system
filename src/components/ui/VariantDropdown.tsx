"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface VariantDropdownOption {
  label: string;
  [key: string]: any;
}

interface VariantDropdownProps {
  options: VariantDropdownOption[];
  value: string;
  onChange: (option: VariantDropdownOption) => void;
  renderOption: (option: VariantDropdownOption) => string;
}

const VariantDropdown: React.FC<VariantDropdownProps> = ({ options, value, onChange, renderOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.label === value) || options[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-surface2 border border-border-strong rounded-xl p-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-green cursor-pointer"
      >
        <span className="truncate">{selected ? renderOption(selected) : ""}</span>
        <FaChevronDown
          size={10}
          className={`text-muted shrink-0 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-surface border border-border-strong rounded-xl shadow-xl overflow-hidden py-1">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
                option.label === value
                  ? "bg-green/10 text-green"
                  : "text-foreground hover:bg-surface2"
              }`}
            >
              {renderOption(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariantDropdown;
