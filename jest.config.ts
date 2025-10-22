export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
   moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
};
