module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['only-warn', '@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  reportUnusedDisableDirectives: true,
  env: {
    browser: true,
    es6: true,
    jquery: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    componentWrapperFunctions: [{ property: 'styled' }],
    linkComponents: [{ name: 'Link', linkAttribute: ['to', 'href'] }],
  },
};
