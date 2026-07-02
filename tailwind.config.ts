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
        // Deep navy — authority, scholarship
        navy: {
          50: '#eef2f7',
          100: '#d3dcea',
          200: '#a9bbd4',
          300: '#7793b7',
          400: '#4d6c98',
          500: '#31507a',
          600: '#243c5e',
          700: '#1b2e49',
          800: '#132339',
          900: '#0c1728',
          DEFAULT: '#1b2e49',
        },
        // Warm amber/orange — accent, calligraphic
        brand: {
          50: '#fdf4ec',
          100: '#fbe3cf',
          200: '#f6c69f',
          300: '#efa268',
          400: '#e77f3d',
          500: '#d9631f',
          600: '#c04f17',
          700: '#9e3e15',
          800: '#7d3315',
          900: '#652b14',
          DEFAULT: '#c04f17',
        },
        // Muted gold — refined highlights, dividers
        gold: {
          200: '#e9d9b0',
          300: '#dcc487',
          400: '#c9a95a',
          500: '#b08d3e',
          DEFAULT: '#b08d3e',
        },
        // Warm paper backgrounds
        paper: {
          50: '#fbfaf7',
          100: '#f6f3ec',
          200: '#efe9dd',
          300: '#e5dccb',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#3d3d3d',
          muted: '#6b6b6b',
          faint: '#9a958c',
        },
      },
      fontFamily: {
        display: ['Amiri', 'Georgia', 'serif'],
        arabic: ['IBM Plex Sans Arabic', 'Tajawal', 'sans-serif'],
        latin: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1.15', fontWeight: '700' }],
        display: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', fontWeight: '700' }],
      },
      spacing: { '18': '4.5rem', '22': '5.5rem', '26': '6.5rem' },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '4px', md: '6px', lg: '10px' },
      boxShadow: {
        soft: '0 1px 3px rgba(27,46,73,0.06), 0 8px 24px rgba(27,46,73,0.06)',
        lift: '0 4px 12px rgba(27,46,73,0.08), 0 16px 40px rgba(27,46,73,0.10)',
      },
      maxWidth: { prose: '46rem' },
    },
  },
  plugins: [],
};

export default config;
