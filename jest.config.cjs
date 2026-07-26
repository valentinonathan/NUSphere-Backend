module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/tests/integration'],
  testMatch: ['**/*.api.test.js'],
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['<rootDir>/tests/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
