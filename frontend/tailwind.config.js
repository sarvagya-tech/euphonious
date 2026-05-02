/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#0d0d0d',
        'bg-card': '#111111',
        'accent': '#c8f55a', // lime green
        'text-primary': '#e8e8e2',
        'text-muted': '#444444',
        'border-primary': '#1a1a1a',
        'border-hover': '#252525',
      },
      fontFamily: {
        'sans': ['"DM Sans"', 'sans-serif'],
        'mono': ['"DM Mono"', 'monospace'],
      },
      spacing: {
        'sidebar-width': '220px',
        'player-height': '80px',
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'accent-glow': '0 0 12px rgba(200, 245, 90, 0.15)',
      },
      borderRadius: {
        'md': '6px',
        'lg': '8px',
      }
    },
  },
  plugins: [],
}
