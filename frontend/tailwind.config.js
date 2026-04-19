/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C8941A',
          light: '#E0A820',
          pale: '#FDF3DC',
        },
        forest: {
          DEFAULT: '#1B4332',
          mid: '#2D6A4F',
          pale: '#EAF5EE',
        },
        cream: '#FAF6EE',
        bark: {
          DEFAULT: '#1C0E05',
          mid: '#5C3D1E',
          light: '#8B6343',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
