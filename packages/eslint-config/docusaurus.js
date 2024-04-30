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
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/react',
      'eslint-config-turbo',
    ].map(require.resolve),
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
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off', // is reporting on @site, @theme, @docusaurus
    'no-undef': 'off', // Pick<> is not defined for some reason
    'no-useless-escape': 'off',
    'react/no-array-index-key': 'off',
    'unicorn/filename-case': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/', 'build/'],
}
