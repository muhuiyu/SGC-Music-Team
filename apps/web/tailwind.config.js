/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: (theme) => ({
        primary: theme.colors.indigo['500'],
      }),
    },
  },
  plugins: [],
}
