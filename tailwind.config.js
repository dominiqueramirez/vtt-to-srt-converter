/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VA Design System (VADS) semantic color tokens
        va: {
          primary: '#005ea2',
          'primary-dark': '#1a4480',
          'primary-darker': '#162e51',
          'primary-light': '#73b3e7',
          'primary-lighter': '#d9e8f6',
          link: '#005ea2',
          'link-active': '#0b4778',
          ink: '#1b1b1b',
          'text-muted': '#71767a',
          'base-dark': '#565c65',
          'base-darker': '#3d4551',
          'base-light': '#a9aeb1',
          'base-lighter': '#dfe1e2',
          'base-lightest': '#f0f0f0',
          'inset-bg': '#e7f6f8',
          error: '#d54309',
          'error-bg': '#f4e3db',
          'error-darker': '#6f3331',
          focus: '#face00',
        },
      },
      fontFamily: {
        sans: ["'Source Sans 3'", "'Source Sans Pro'", "'Helvetica Neue'", 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        serif: ['Bitter', 'Georgia', 'Cambria', "'Times New Roman'", 'Times', 'serif'],
        mono: ["'Roboto Mono'", "'Bitstream Vera Sans Mono'", 'Consolas', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
