/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT.js";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Your project's source files
  ],
  theme: {
    extend: {}, // Customize your theme here if needed
  },
  plugins: [],
});

