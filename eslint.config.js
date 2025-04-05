import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { absPath } from './gulp/path.js';

const compat = new FlatCompat({
  baseDirectory: absPath.root,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'build',
      'coverage',
      'docs',
      'dist',
      'dist-ssr',
      'node_modules',
    ],
  },
  ...compat.extends('airbnb-base'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
        },
      },
    },

    files: ['**/*.{js,jsx,cjs,mjs}'],

    rules: {
      'consistent-return': 0,
      'import/extensions': 0,
      'import/no-extraneous-dependencies': 0,
      'max-len': 0,
      'no-param-reassign': 0,
      'no-unneeded-ternary': 0,
      'no-use-before-define': 0,
    },
  },
];
