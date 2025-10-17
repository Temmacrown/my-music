/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        army: "#4B5320", // Army green
        darkblue: "#1E3A8A", // Tailwind's blue-900
        headerblue: "#1E40AF", // Slightly lighter for header
        footerblue: "#172554", // Darker for footer/player bar
      },
    },
  },
  plugins: [],
};
