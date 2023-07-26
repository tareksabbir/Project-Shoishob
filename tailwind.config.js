/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      // {
      //   light: {
      //     primary: "#417af6",
      //     secondary: "#19D3AE",
      //     accent: "#3A4256",
      //     neutral: "#3d4451",
      //     "base-100": "#ffffff",
      //   },
      // },

      "night"


    ],
  },
  plugins: [require("daisyui")],

}

