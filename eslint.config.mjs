// @ts-check

import path from 'node:path'

import eslint from '@eslint/js'
import { includeIgnoreFile } from '@eslint/compat'
import tseslint from 'typescript-eslint'

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile}
 */
export default [
  // NOTE: Global ignores must be defined first without any other keys
  // https://eslint.org/docs/latest/use/configure/ignore
  includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore')),
  {
    ignores: [
      // JS config files
      '**/.*rc.js',
      '**/.*rc.mjs',
      '**/.*rc.cjs',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.cjs',
      // Distribution files
      'packages/*/dist/',
      'packages/*/build/',
    ],
  },
  eslint.configs.recommended,
  // TODO: Switch to `strictTypeChecked` and enable `stylisticTypeChecked`
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      eqeqeq: 'error',
    },
  },
]
