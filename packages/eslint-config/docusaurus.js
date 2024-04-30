const { resolve } = require('node:path')
const project = resolve(process.cwd(), 'tsconfig.json')

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:@docusaurus/recommended',
    require.resolve('eslint-config-turbo'),
  ],
  plugins: ['only-warn', 'unused-imports'],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'import/no-default-export': 'off',
    'no-useless-escape': 'off',
    'unicorn/filename-case': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
}
