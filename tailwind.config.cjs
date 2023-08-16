/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "520px",
            },
            fontFamily: {
                sans: ["var(--font-inter)"], // override default font
            },
            backgroundSize: {
                "100%": "100%",
            },
            keyframes: {
                "fade-out": {
                    "0%": {
                        opacity: 100,
                    },
                    "100%": {
                        opacity: 0,
                    },
                },
            },
            animation: {
                "fade-out-delayed": "150ms ease-out 4s forwards fade-out",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
