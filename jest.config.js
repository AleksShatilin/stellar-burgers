module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@components$': '<rootDir>/src/components',
    '^@pages$': '<rootDir>/src/pages',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};