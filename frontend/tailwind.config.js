/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          950: '#020817',
          900: '#050d1a',
          800: '#071120',
          700: '#0c1930',
        },
        brand: {
          cyan: '#00d4ff',
          violet: '#7c3aed',
          'cyan-dim': 'rgba(0,212,255,0.15)',
          'violet-dim': 'rgba(124,58,237,0.15)',
        }
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.55s cubic-bezier(0.22,1,0.36,1)',
        'fade-in': 'fadeIn 0.6s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 15px rgba(0,212,255,0.25)' },
          '50%': { boxShadow: '0 0 35px rgba(0,212,255,0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
