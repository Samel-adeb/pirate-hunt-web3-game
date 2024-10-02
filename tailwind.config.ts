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
        'black': '#000000',
        'brown-dark': '#502D0A',
      },

      keyframes: {
        bounceUp: {
          '0%, 100%': { transform: 'translateY(0)' },  // Starting and ending position
          '50%': { transform: 'translateY(-10px)' },   // Move up by 10px
        },
      },
      animation: {
        'bounce-up': 'bounceUp 1.5s ease-in-out infinite', // Custom animation name
      },

      

      
    },
  },
  plugins: [],
};
export default config;
