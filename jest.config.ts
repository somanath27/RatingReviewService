import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  detectOpenHandles: true,
  forceExit: true,
  // fakeTimers: {
  //   enableGlobally: true
  // },
  testTimeout: 50000,
  testMatch: ['**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: './dist/views/codeCoverage',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './dist/views/reportCoverage',
        filename: 'index.html',
        openReport: false,
        includeConsoleLog: true,
        inlineSource: true,
        pageTitle: 'RatingReview Service Test Report'
      }
    ]
  ]
};

export default config;
