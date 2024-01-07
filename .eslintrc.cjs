module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './components'],
          ['@assets', './assets'],
          ['@pages', './pages'],
          ['@hooks', './hooks'],
          ['@utils', './utils'],
          ['@enums', './enums'],
          ['@models', './models'],
          ['@context', './context'],
          ['@constants', './constants'],
          ['@data', './data'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    }
  },
  plugins: ['import', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type', 'unknown'],
        'pathGroups': [
          {
            'pattern': '{.,..}/*.scss',
            'group': 'sibling',
            'position': 'after',
          },
        ],
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
        'newlines-between': 'always',
      }
    ]
  }
}
