/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E2E8F0",
        secondary: "#BBF7D0",
        tettiary: "#FDA4AF",
        text_red: "#E11D48",
        text_primary: "#6B7280",
        text_secondary: "#1d4ed8",
        text_tertiaary: "#22C55E",
        text_quaternary: "#BE123C",
        btn_primary: "#1d4ed8",
        btn_secondary: "#F8FAFC",
        text_black: "#030712",
        text_orange: "#FFA500",
        text_purple: "#7E22CE",
      },
      boxShadow: {
        main_card: "0px 6px 8px 0px rgba(0, 0, 0, 0.20)",
        main_card_hover: "8px 8px 12px 0px rgba(33, 92, 221, 0.25)",
        table_shadow: "2px 2px 12px rgba(0, 0, 0, 0.10)",
        member_card: "2px 2px 12px 0px rgba(0, 0, 0, 0.10)",
        btn_shadow: "-2px 2px 16px 0px rgba(59, 130, 246, 0.20)",
        danger_shadow: "-2px 2px 16px 0px rgba(225, 29, 72, 0.20)",
        sidebar_shadow: "2px 1px 8px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      spacing: {
        15: "3.75rem",
        17: "4.5rem",
        30: "7.5rem",
        40: "9.416rem",
        13: "50px",
      },
      padding: {
        2.5: "0.6rem",
        25: "6.25rem",
        62: "15.625rem",
      },
      gap: {
        1.5: "0.375rem",
      },
      width: {
        150: "591px",
        120: "32rem",
        57: "232px",
        "10xl": "200px",
        195: "822px",
        117: "450px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
