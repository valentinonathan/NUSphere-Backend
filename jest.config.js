module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.api.test.js'],
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['<rootDir>/tests/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
