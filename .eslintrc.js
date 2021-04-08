module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['off', 2],
    'space-before-function-paren': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'space-before-blocks': 0,
    'eol-last': 0,
    'vue/no-unused-vars': 0,
    'dot-notation': 0,
    'padded-blocks': 0,
    'quote-props': 0,
    'no-prototype-builtins': 0,
    'comma-spacing': 0,
    'standard/no-callback-literal': 0,
    'quotes': 0,
    'operator-linebreak': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-side-effects-in-computed-properties': 0,
    'vue/return-in-computed-property': 0,
    'comma-dangle': 0
  }
}
