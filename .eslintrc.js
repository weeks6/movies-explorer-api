module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': [1, { allow: ['_id', '_doc'] }],
    // игнорирование неиспользуемой next() в централизованной обработке ошибок
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
