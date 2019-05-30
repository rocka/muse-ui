module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: 'plugin:vue/recommended',
  globals: {
    expect: true,
    describe: true,
    it: true,
    jest: true
  },
  rules: {
    'quotes': [2, 'single', { 'allowTemplateLiterals': true }],
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'always'],
    'eqeqeq': [2, 'always'],
    'strict': [2, 'global'],
    'key-spacing': [2, { 'afterColon': true }]
  }
};
