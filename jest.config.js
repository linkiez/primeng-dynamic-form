/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests', '<rootDir>/packages'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: String.raw`\.html$`,
      },
    ],
  },
  moduleNameMapper: {
    '@primeng-dynamic-form/core': '<rootDir>/packages/dynamic-form/src/public-api.ts',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  collectCoverageFrom: [
    'packages/dynamic-form/src/**/*.ts',
    '!packages/dynamic-form/src/public-api.ts',
  ],
};
