/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--color-bg-soft) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-soft': 'rgb(var(--color-text-soft) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['Pacifico', 'cursive']
      },
      boxShadow: {
        card: '0 20px 40px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
}

