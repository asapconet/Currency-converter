/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{jsx,tsx,js,ts,mdx}",
    "./pages/**/*.{jsx,tsx,js,ts,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-hero": "url('../public/sean1.jpg')",
      },
      
    },
  },
  plugins: [],
};
