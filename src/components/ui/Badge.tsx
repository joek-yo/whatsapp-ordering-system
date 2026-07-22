"use client";

import React from "react";

type BadgeVariant = "green" | "danger" | "muted" | "gold";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variants: Record<BadgeVariant, string> = {
  green: "bg-green-soft text-green border-green/30",
  danger: "bg-danger/10 text-danger border-danger/20",
  muted: "bg-surface2 text-subtext border-border",
  gold: "bg-gold-soft text-gold border-gold/30",
};

export default function Badge({ children, variant = "green", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
