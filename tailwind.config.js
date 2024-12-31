module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        bg: {
          100: "#FCFCFC",
          200: "#F7F7F7",
          300: "#EFEFEF",
          400: "#F4F7FB",
        },
        black: {
          100: "#6B6B6B",
          200: "#525252",
          300: "#373737",
          400: "#1F1F1F",
          500: "#040404",
        },
        gray: {
          50: "#000000",
          100: "#DEDEDE",
          200: "#C4C4C4",
          300: "#ABABAB",
          400: "#999999",
          500: "#808080",
        },
        blue: {
          50: "#F5FAFF",
          100: "#E9F4FF",
          200: "#4DA9FF",
          300: "#1B92FF",
          400: "#242945",
        },
        yellow: {
          100: "#FFC149",
        },
        red: {
          100: "#FFEEF0",
          200: "#FF4F64",
        },
        line: {
          100: "#F2F2F2",
          200: "#E6E6E6",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        "3xl": ["32px", { lineHeight: "42px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2lg": ["18px", { lineHeight: "26px" }],
        lg: ["16px", { lineHeight: "26px" }],
        md: ["14px", { lineHeight: "24px" }],
        sm: ["13px", { lineHeight: "22px" }],
        xs: ["12px", { lineHeight: "18px" }],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      screens: {
        mobile: "375px",
        tablet: "744px",
        pc: "1200px",
      },
      boxShadow: {
        card: "2px 2px 10px 0px rgba(220, 220, 220, 0.14), -2px -2px 10px 0px rgba(220, 220, 220, 0.14)",
        border: "4px 4px 16px 0px rgba(233, 233, 233, 0.1)",
        bar: "0px 2px 10px 0px rgba(248, 248, 248, 0.1)",
      },
    },
  },
  plugins: [],
};
