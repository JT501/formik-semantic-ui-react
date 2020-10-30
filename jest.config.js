const { createJestConfig } = require('tsdx/dist/createJestConfig');
const { paths } = require('tsdx/dist/constants');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const defaultConfig = createJestConfig(undefined, paths.appRoot);

module.exports = {
  ...defaultConfig,
  setupFilesAfterEnv: ['./test/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
};
