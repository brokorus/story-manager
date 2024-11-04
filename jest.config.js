module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',         // Transforms TypeScript files
  },
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      isolatedModules: true,        // Speeds up TypeScript compilation
    },
  },
  transformIgnorePatterns: ['/node_modules/'],
};
