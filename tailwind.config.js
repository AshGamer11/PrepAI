/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0E",
        surface: "#14151A",
        surfaceBorder: "#272730",
        primary: "#8B5CF6", // Purple
        primaryHover: "#7C3AED",
        accent: "#3B82F6", // Blue
        success: "#10B981", // Green
        warning: "#F59E0B",
        danger: "#EF4444",
        textMain: "#F8FAFC",
        textMuted: "#94A3B8"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
