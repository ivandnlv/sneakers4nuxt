// .eslintrc.js
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
  plugins: ['unused-imports', 'boundaries'],
  // ---- settings: тут описываем "элементы" (zones / layers) ----
  settings: {
    // используем glob-совместимые шаблоны; для безопасности можно указать с **
    // если ESLint запускается из корня monorepo, можно заменить на '**/src/entities/**'
    'boundaries/elements': [
      { type: 'entities', pattern: '**/app/src/entities/**' },
      { type: 'features', pattern: '**/app/src/features/**' },
      { type: 'shared', pattern: '**/app/src/shared/**' },
      { type: 'widgets', pattern: '**/app/src/widgets/**' },
      { type: 'pages', pattern: '**/app/src/pages/**' },
      { type: 'nuxt-layouts', pattern: '**/app/layouts/**' },
      { type: 'nuxt-pages', pattern: '**/app/pages/**' }
    ]
  },
  rules: {
    'fun-call-spacing': 0,
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'no-multi-spaces': 'error',
    'no-console': 0,
    'unused-imports/no-unused-imports': 'error',

    // --- зависимости между слоями (element-types)
    // здесь описываем, какие слои могут импортировать какие слои
    'boundaries/element-types': ['error', {
      default: 'disallow',
      rules: [
        { from: 'entities', allow: ['shared'] },
        { from: 'features', allow: ['shared', 'entities'] },
        { from: 'widgets', allow: ['shared', 'entities', 'features'] },
        { from: 'pages', allow: ['shared', 'entities', 'features', 'widgets'] },
        { from: 'nuxt-layouts', allow: ['shared', 'entities', 'features', 'widgets', 'pages'] },
        { from: 'nuxt-pages', allow: ['shared', 'entities', 'features', 'widgets', 'pages'] }
      ]
    }],

    // --- entry-point: требуем, чтобы внешние импорты шли через entry (index)
    // формат: default + rules с target/allow micromatch паттернами
    'boundaries/entry-point': ['error', {
      default: 'disallow',
      rules: [
        { target: ['entities'], allow: ['**/index.ts'] },
        { target: ['features'], allow: ['**/index.ts'] },
        { target: ['widgets'], allow: ['**/index.ts'] },
        { target: ['pages'], allow: ['**/index.ts'] },
        { target: ['shared'], allow: ['**/*.{ts,js,vue,tsx,jsx}'] }
      ]
    }],

    // --- запасной/дополнительный guard: запрет на глубокие абсолютные/алиасные импорты
    // (полезно если у вас алиас @ или ~; адаптируйте под ваш alias)
    'no-restricted-imports': ['error', {
      patterns: [
        // если вы используете алиас '@' -> 'src', раскомментируйте соответствующие строки:
        // '@/entities/*',
        // '@/features/*',
        // '@/widgets/*',
        // '@/pages/*'
        //
        // Или — общие шаблоны (если ESLint видит пути как src/...)
        '**/app/src/entities/*/**',
        '**/app/src/features/*/**',
        '**/app/src/widgets/*/**',
        '**/app/src/pages/*/**'
      ]
    }]
  }
}
