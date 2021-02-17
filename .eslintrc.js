module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
};
