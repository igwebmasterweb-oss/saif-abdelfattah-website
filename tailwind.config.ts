import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#1a365d',
          600: '#163056',
          700: '#12294a',
          900: '#0a1929',
        },
        accent: {
          400: '#d4a853',
          500: '#c9a84c',
          600: '#b8973d',
        },
        gold: '#c9a84c',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        ibm: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            direction: 'rtl',
            lineHeight: '1.8',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
