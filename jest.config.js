module.exports = {
  testMatch: [
    '**/(__tests__|tests)/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
    'src/(.*)': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}']
};
