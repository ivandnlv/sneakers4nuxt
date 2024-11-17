module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: ['unused-imports'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'no-multi-spaces': 'error',
    'no-console': 0
    // 'unused-imports/no-unused-imports-ts': 1
  }
}
