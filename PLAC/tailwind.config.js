/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#2D4A3E',
        secondary:  '#C4956A',
        accent:     '#F5ECD7',
        background: '#FAF7F2',
        text:       '#1A2E26',
        muted:      '#6B7F74',
        sage:       '#7A9E8E',
        cream:      '#FDF9F3',
        warm:       '#E8D5B7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
};