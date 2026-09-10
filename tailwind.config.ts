import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF8F7',
          100: '#FFF1F3',
          200: '#FDE7EC',
          300: '#F8A6BC',
          400: '#F27AA2',
          500: '#E94F83',
          600: '#D93670',
        },
        charcoal: {
          DEFAULT: '#242124',
          soft: '#3A3034',
        },
        cream: '#FFFDF9',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'serif'],
        handwritten: ['var(--font-handwritten)', 'Caveat', 'cursive'],
        sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
      rotate: {
        slight: '-1.5deg',
        'slight-r': '1.5deg',
        polaroid: '-2deg',
      },
    },
  },
  plugins: [],
};

export default config;
