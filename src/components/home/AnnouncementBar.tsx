"use client";
import React from "react";
import { getUIConfig } from "@/lib/getBusinessData";

const AnnouncementBar: React.FC = () => {
  const { announcement } = getUIConfig();
  if (!announcement?.active || !announcement?.text) return null;
  return (
    <div className="bg-green-strong text-background py-2.5 px-4 relative z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-background/5 animate-pulse" />
      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-center leading-none">{announcement.text}</p>
      </div>
    </div>
  );
};
export default AnnouncementBar;
