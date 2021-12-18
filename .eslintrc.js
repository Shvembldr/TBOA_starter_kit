module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'p5js'],
  rules: {},
  settings: {},
  plugins: [],
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  globals: {
    p5: true,
  },
}
