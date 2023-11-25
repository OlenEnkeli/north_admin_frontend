/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'gray': '#2a2a2a',
        'gray-light': '#cbcbcb',
      },
    }
  },
  plugins: []
};