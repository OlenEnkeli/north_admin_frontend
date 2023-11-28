/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  important: true,
  theme: {
    extend: {
      colors: {
        'gray': '#2a2a2a',
        'gray-light': '#f8f8f8',
        'gray-100': '#f5f5f5',
        'gray-200': '#d2d2d2',
        'gray-500': '#818181',
        'gray-600': '#595959',
        'gray-800': '#414141',
        'gray-900': '#2a2a2a',
        'red': '#8d001a',
        'red-300': '#e3012d',
        'red-400': '#cb012a',
        'red-600': '#a10114',
        'red-700': '#790110',
        'red-800': '#54000d',
        'red-900': '#2a0005',
      },
    }
  },
  plugins: []
};