/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx,md,mdx}", "./app/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {},
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
