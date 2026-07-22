"use client";

import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "whatsapp"
  | "outline";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;

  variant?: ButtonVariant;
  size?: ButtonSize;

  fullWidth?: boolean;
  className?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  iconOnly?: boolean;
  "aria-label"?: string;

  // When href is provided, Button renders as an <a> tag instead of <button>,
  // keeping identical variant/size styling. Used for tel:, wa.me, and mailto: CTAs.
  href?: string;
  target?: string;
  rel?: string;
};

// House of Jaby brand: green is primary (not gold — that's PDK's palette).
// text-background flips correctly between dark/light mode automatically,
// unlike a hardcoded text-black which breaks contrast in light mode.
const variants: Record<ButtonVariant, string> = {
  primary: "bg-green text-background hover:bg-green-strong shadow-glow",
  secondary: "bg-surface2 text-foreground border border-border hover:border-green hover:text-green",
  ghost: "bg-transparent text-foreground hover:bg-surface2",
  danger: "bg-danger text-background hover:opacity-90",
  whatsapp: "bg-whatsapp text-white hover:brightness-110",
  outline: "border-2 border-border-strong text-foreground hover:border-green hover:text-green bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[10px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-xs",
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  leftIcon,
  rightIcon,
  iconOnly = false,
  "aria-label": ariaLabel,
  href,
  target,
  rel,
}: ButtonProps) {
  const sharedClassName = `
        inline-flex items-center justify-center gap-2.5
        font-black uppercase tracking-widest rounded-2xl
        transition-all duration-200 active:scale-95
        ${!(disabled || loading) ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${iconOnly ? "p-3 aspect-square rounded-xl" : ""}
        ${className}
      `;

  const content_ = (
    <>
      {leftIcon && !loading && <span className="flex items-center">{leftIcon}</span>}

      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        !iconOnly && children
      )}

      {rightIcon && !loading && <span className="flex items-center">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {content_}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      className={sharedClassName}
    >
      {content_}
    </button>
  );
}
