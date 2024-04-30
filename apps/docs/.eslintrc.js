/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/docusaurus.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {},
}
