import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // KRAVA brand palette
        ink: "#0A0A0A", // near-black background
        bone: "#F5F0E8", // warm off-white text
        sand: "#C8A96E", // warm gold / sand accent
        "sand-soft": "#D8BE8C",
        coal: "#141414", // raised surface
        carbon: "#1A1A1A", // cards / sections
        seam: "#2A2A2A", // borders
        ash: "#8A857B", // muted text
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.22em",
        wide2: "0.32em",
      },
      maxWidth: {
        shell: "1400px",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-2%, 3%)" },
          "40%": { transform: "translate(-3%, -2%)" },
          "60%": { transform: "translate(2%, 2%)" },
          "80%": { transform: "translate(3%, -3%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "indicator-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(6px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        scanline: "scanline 7s linear infinite",
        "grain-shift": "grain-shift 8s steps(4) infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "indicator-pulse": "indicator-pulse 2.2s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
