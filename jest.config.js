module.exports = {
  verbose: true,
  modulePaths: ['<rootDir>/src/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  globals: {
    __PATH_PREFIX__: ``,
    'ts-jest': {
      diagnostics: false,
    },
  },
  // coverageThreshold: {
  //   global: {
  //     statements: 80,
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //   },
  // },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
