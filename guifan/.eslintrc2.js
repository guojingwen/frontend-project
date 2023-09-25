const prettierConfig = require('./.prettierrc.json')

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"],
  plugins: [ "@typescript-eslint", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": [2, prettierConfig],
  },
};
