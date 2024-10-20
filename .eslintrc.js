module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'off', // 这个是eslint的bug，不关掉一直会报错
    'import/no-unresolved': 'off', // 这个是eslint的bug，不关掉一直会报错
    'import/extensions': 'off',

    // 最大行长度
    'max-len': ['error', {
      code: 100, // 最大行长
      ignoreUrls: true, // 忽略包含 URL 的行
      ignoreStrings: true, // 忽略包含双引号或单引号字符串的行
      ignoreTemplateLiterals: true, // 忽略包含模板文字的行
      ignoreRegExpLiterals: true, // 忽略包含 RegExp 文字的行
    }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    'import/prefer-default-export': 'off',
  },
};
