import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        h1: '64px',
        h2: '50px', 
        h3: '32px', 
        h2M: '40px',
        pMain: '24px',
        pMobile: '20px',
      },
      keyframes: {
        // Define a new bounce animation for left-right motion
        "bounce-x": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        ping: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '2.5' },
        },
      },
      animation: {
        "bounce-x": "bounce-x 1s infinite",
        'pulse-once': 'pulse 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
