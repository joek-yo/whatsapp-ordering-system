/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        surface2: "var(--color-surface2)",
        foreground: "var(--color-foreground)",
        subtext: "var(--color-subtext)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        green: "var(--color-green)",
        "green-strong": "var(--color-green-strong)",
        "green-soft": "var(--color-green-soft)",
        gold: "var(--color-gold)",
        "gold-soft": "var(--color-gold-soft)",
        danger: "var(--color-danger)",
        whatsapp: "var(--color-whatsapp)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      spacing: {
        section: "4rem",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        glow: "0 0 24px var(--color-green-soft)",
      },
    },
  },
  plugins: [],
};
