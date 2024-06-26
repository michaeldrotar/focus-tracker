/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{mdx,tsx}'],
  corePlugins: {
    container: false, // prefer docusaurus container that works with sidebars
    preflight: false,
  },
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',

      background: 'rgb(var(--theme-color-background) / <alpha-value>)',
      foreground: 'rgb(var(--theme-color-foreground) / <alpha-value>)',

      neutral: {
        50: 'rgb(var(--theme-color-neutral-50) / <alpha-value>)',
        100: 'rgb(var(--theme-color-neutral-100) / <alpha-value>)',
        200: 'rgb(var(--theme-color-neutral-200) / <alpha-value>)',
        300: 'rgb(var(--theme-color-neutral-300) / <alpha-value>)',
        400: 'rgb(var(--theme-color-neutral-400) / <alpha-value>)',
        500: 'rgb(var(--theme-color-neutral-500) / <alpha-value>)',
        600: 'rgb(var(--theme-color-neutral-600) / <alpha-value>)',
        700: 'rgb(var(--theme-color-neutral-700) / <alpha-value>)',
        800: 'rgb(var(--theme-color-neutral-800) / <alpha-value>)',
        900: 'rgb(var(--theme-color-neutral-900) / <alpha-value>)',
        950: 'rgb(var(--theme-color-neutral-950) / <alpha-value>)',
      },

      primary: {
        100: 'rgb(var(--theme-color-primary-100) / <alpha-value>)',
        300: 'rgb(var(--theme-color-primary-300) / <alpha-value>)',
        500: 'rgb(var(--theme-color-primary-500) / <alpha-value>)',
        700: 'rgb(var(--theme-color-primary-700) / <alpha-value>)',
        900: 'rgb(var(--theme-color-primary-900) / <alpha-value>)',
      },

      secondary: {
        100: 'rgb(var(--theme-color-secondary-100) / <alpha-value>)',
        300: 'rgb(var(--theme-color-secondary-300) / <alpha-value>)',
        500: 'rgb(var(--theme-color-secondary-500) / <alpha-value>)',
        700: 'rgb(var(--theme-color-secondary-700) / <alpha-value>)',
        900: 'rgb(var(--theme-color-secondary-900) / <alpha-value>)',
      },

      tertiary: {
        100: 'rgb(var(--theme-color-tertiary-100) / <alpha-value>)',
        300: 'rgb(var(--theme-color-tertiary-300) / <alpha-value>)',
        500: 'rgb(var(--theme-color-tertiary-500) / <alpha-value>)',
        700: 'rgb(var(--theme-color-tertiary-700) / <alpha-value>)',
        900: 'rgb(var(--theme-color-tertiary-900) / <alpha-value>)',
      },

      web: {
        foreground: 'rgb(var(--theme-color-web-foreground) / <alpha-value>)',
        background: 'rgb(var(--theme-color-web-background) / <alpha-value>)',
      },

      nodejs: {
        foreground: 'rgb(var(--theme-color-nodejs-foreground) / <alpha-value>)',
        background: 'rgb(var(--theme-color-nodejs-background) / <alpha-value>)',
      },

      react: {
        foreground: 'rgb(var(--theme-color-react-foreground) / <alpha-value>)',
        background: 'rgb(var(--theme-color-react-background) / <alpha-value>)',
      },
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
}
