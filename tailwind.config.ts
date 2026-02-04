import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#D4AF37",
          goldLight: "#E8D5A3",
          goldDark: "#B8960C",
          navy: "#1A2A3A",
          navyLight: "#2D4A5E",
          cream: "#FDF8F3",
          sand: "#E8DED1",
        },
        dubai: {
          50: "#FDF8F3",
          100: "#F5EDE3",
          200: "#E8DED1",
          300: "#D4C4B0",
          400: "#B8A082",
          500: "#9C8060",
          600: "#7A6248",
          700: "#5C4A38",
          800: "#3E3228",
          900: "#1A1610",
        },
      },
      fontFamily: {
        sans: ["Inter", "SF Pro", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 20px 60px rgba(0, 0, 0, 0.12)",
        gold: "0 4px 20px rgba(212, 175, 55, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "progress-fill": "progressFill 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        progressFill: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "var(--progress-offset)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
