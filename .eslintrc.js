module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'no-console': 'off'
    'consistent-return': 'off'
  }
};
