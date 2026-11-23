/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff', 100: '#dbe6fe', 200: '#bfd3fe', 300: '#93b4fd',
          400: '#6090fa', 500: '#3b6cf6', 600: '#2550eb', 700: '#1d3fd8',
          800: '#1e36af', 900: '#1e348a',
        },
        ink: { 900: '#0a1020', 800: '#0f172a', 700: '#1a2236', 600: '#26304a' },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,108,246,.15), 0 10px 30px -10px rgba(59,108,246,.55)',
        card: '0 1px 2px rgba(16,24,40,.04), 0 4px 16px -4px rgba(16,24,40,.08)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRing: { '0%': { transform: 'scale(.8)', opacity: 1 }, '100%': { transform: 'scale(2.2)', opacity: 0 } },
        slideIn: { '0%': { transform: 'translateY(8px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        fadeUp: { '0%': { transform: 'translateY(16px) scale(.98)', opacity: 0 }, '100%': { transform: 'translateY(0) scale(1)', opacity: 1 } },
        gradientShift: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-20px) scale(1.1)' }, '66%': { transform: 'translate(-20px,15px) scale(.95)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(200%)' } },
        wiggle: { '0%,100%': { transform: 'rotate(0)' }, '20%': { transform: 'rotate(-12deg)' }, '40%': { transform: 'rotate(10deg)' }, '60%': { transform: 'rotate(-6deg)' }, '80%': { transform: 'rotate(4deg)' } },
        popIn: { '0%': { transform: 'scale(.6)', opacity: 0 }, '70%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 1.6s ease-out infinite',
        slideIn: 'slideIn .35s ease-out both',
        fadeUp: 'fadeUp .55s cubic-bezier(.2,.8,.2,1) both',
        gradient: 'gradientShift 8s ease infinite',
        blob: 'blob 12s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out',
        popIn: 'popIn .45s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
