/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0e1624',
        text: '#e6edf3',
        muted: '#93a4b8',
        card: 'rgba(255,255,255,0.07)',
        primary: '#06b6d4', // cyan
        accent: '#8b5cf6', // purple-500 for richer accent
        success: '#22c55e',
        danger: '#ef4444',
        overlay: 'rgba(2,6,23,0.6)',
        ring: '#22d3ee',
        chip: 'rgba(255,255,255,0.08)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(2, 6, 23, 0.35)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 8px 20px rgba(34, 211, 238, 0.12)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}