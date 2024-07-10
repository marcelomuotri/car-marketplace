module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Si estás usando React
    'plugin:@typescript-eslint/recommended', // Si estás usando TypeScript
    'plugin:prettier/recommended', // Asegura la integración con Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
  },
}
