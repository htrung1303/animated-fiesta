module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // Requires explicit return types on functions
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Requires explicit return and parameter types on functions exported from modules
    '@typescript-eslint/no-explicit-any': 'error', // Disallows the use of `any` as a type declaration
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Disallows unused variables
    '@typescript-eslint/no-empty-function': 'off', // Disallows empty functions

    // General rules
    'prettier/prettier': 'error', // Enforces consistent code formatting using Prettier
    'no-console': 'warn', // Disallows the use of `console`
    'no-debugger': 'warn', // Disallows the use of `debugger`
    'no-alert': 'error', // Disallows the use of `alert`, `confirm`, and `prompt`
    'no-unused-vars': 'off', // Disallows unused variables (we use '@typescript-eslint/no-unused-vars' for TypeScript files)
    'comma-dangle': ['error', 'always-multiline'], // Requires trailing commas in multiline object and array literals
    'object-curly-spacing': ['error', 'always'], // Requires spaces inside of curly braces in object literals
    'array-bracket-spacing': ['error', 'never'], // Disallows spaces inside of brackets in array literals
    'arrow-spacing': 'error', // Requires consistent spacing before and after arrow functions' arrow
    'quote-props': ['error', 'consistent-as-needed'], // Requires quotes around object literal property names only if they are required
    'quotes': ['error', 'single'], // Requires the consistent use of single quotes
    'semi': ['error', 'always'], // Requires semicolons at the end of statements
  },
};
