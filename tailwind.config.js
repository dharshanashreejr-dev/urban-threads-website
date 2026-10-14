/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        goldDeep: 'rgb(var(--c-goldDeep) / <alpha-value>)',
        rust: 'rgb(var(--c-rust) / <alpha-value>)',
        bone: 'rgb(var(--c-bone) / <alpha-value>)',
        boneDim: 'rgb(var(--c-boneDim) / <alpha-value>)',
        hairline: 'rgb(var(--c-hairline) / <alpha-value>)',
        /* Fixed (non-theme) near-black — always used as the label
           color on top of the gold/amber accent surface, since gold
           itself only shifts a little between themes but "ink" (the
           page-background token) flips all the way from black to
           near-white and breaks button-label contrast in light mode. */
        /* Fixed (non-theme) label color used on top of the burgundy accent
           surface — ivory reads clearly against burgundy in both themes. */
        onGold: '#F5F1EA'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serifAccent: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        lux: '0 20px 60px -20px rgba(123,28,48,0.35)',
        luxCard: '0 12px 40px -12px rgba(0,0,0,0.55)'
      }
    }
  },
  plugins: []
};
