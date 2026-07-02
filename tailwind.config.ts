import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Navy - from site logo and dark sections
        navy: {
          50:  '#e8edf4',
          100: '#c5d1e4',
          200: '#9fb2d1',
          300: '#7893be',
          400: '#587daf',
          500: '#1e3a5f',
          600: '#1a3356',
          700: '#142847',
          800: '#0f1e37',
          900: '#091527',
          DEFAULT: '#1e3a5f',
        },
        // Brand Orange - from headings, buttons, accents
        brand: {
          50:  '#fef3ed',
          100: '#fde0cc',
          200: '#fbca9e',
          300: '#f8a96a',
          400: '#f48a3f',
          500: '#e8601c',
          600: '#d45318',
          700: '#b44413',
          800: '#93370f',
          900: '#6e270a',
          DEFAULT: '#e8601c',
        },
        // Neutral warm whites for backgrounds
        warm: {
          50:  '#fafaf9',
          100: '#f5f4f2',
          200: '#eeece9',
          300: '#e2dedd',
        },
      },
      fontFamily: {
        arabic: ['IBM Plex Sans Arabic', 'Tajawal', 'sans-serif'],
        latin:  ['Inter', 'sans-serif'],
      },
      // Fine typography scale
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2',  fontWeight: '700' }],
        'heading': ['1.75rem', { lineHeight: '1.3',  fontWeight: '600' }],
        'subheading': ['1.25rem', { lineHeight: '1.4',  fontWeight: '500' }],
      },
      // Consistent spacing for RTL layouts
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
      },
    },
  },
  plugins: [],
};

export default config;
