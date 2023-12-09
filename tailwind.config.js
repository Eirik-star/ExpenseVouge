/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './src/**/**/*.{ts,tsx,js,jsx}',
    './src/**/**/*.{ts,tsx,js,jsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "xs": "320px",
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateRows: {
        'layout': 'repeat(8, minmax(0, 77px))',
      },
      colors: {
        'border': "hsl(var(--border))",
        'input': "hsl(var(--input))",
        'ring': "hsl(var(--ring))",
        'background-sui': "hsl(var(--background))",
        'foreground': "hsl(var(--foreground))",
        'off-white' : 'var(--off-white)',    
      },
      fontFamily: {
        'poppins': 'Poppins',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}