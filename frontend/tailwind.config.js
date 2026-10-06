/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#08080a',
        'bg-secondary': '#0f0f13',
        'bg-card': '#14141a',
        'bg-elevated': '#1a1a23',
        'accent': '#c8f55a', // vibrant electric lime
        'accent-hover': '#b5e347',
        'accent-cyan': '#00f2fe',
        'accent-purple': '#7928ca',
        'text-primary': '#f4f4f6',
        'text-muted': '#8e8e99',
        'text-dim': '#52525b',
        'border-primary': 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(255, 255, 255, 0.18)',
      },
      fontFamily: {
        'sans': ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['"DM Mono"', 'monospace'],
      },
      spacing: {
        'sidebar-width': '240px',
        'player-height': '88px',
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'elevated': '0 12px 40px rgba(0, 0, 0, 0.6)',
        'accent-glow': '0 0 20px rgba(200, 245, 90, 0.25)',
        'accent-glow-lg': '0 0 35px rgba(200, 245, 90, 0.35)',
        'cyan-glow': '0 0 20px rgba(0, 242, 254, 0.25)',
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
