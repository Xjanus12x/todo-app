/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-light": "url('./assets/background-img/bg-mobile-light.jpg')",
        "mobile-dark": "url('./assets/background-img/bg-mobile-dark.jpg')",
        "desktop-light": "url('./assets/background-img/bg-desktop-light.jpg')",
        "desktop-dark": "url('./assets/background-img/bg-desktop-dark.jpg')",
      },
      colors: {
        primary: {
          "bright-blue": "hsl(220, 98%, 61%)",
          "check-background-start": "hsl(192, 100%, 67%)",
          "check-background-end": "hsl(280, 87%, 65%)",
        },
        neutral: {
          "very-light-gray": "hsl(0, 0%, 98%)",
          "very-light-grayish-blue": "hsl(236, 33%, 92%)",
          "light-grayish-blue": "hsl(233, 11%, 84%)",
          "dark-grayish-blue": "hsl(236, 9%, 61%)",
          "very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        },
        dark: {
          "very-dark-blue": "hsl(235, 21%, 11%)",
          "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
          "light-grayish-blue": "hsl(234, 39%, 85%)",
          "light-grayish-blue-hover": "hsl(236, 33%, 92%)",
          "dark-grayish-blue": "hsl(234, 11%, 52%)",
          "very-dark-grayish-blue": "hsl(233, 14%, 35%)",
          "very-dark-grayish-blue": "hsl(237, 14%, 26%)",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
