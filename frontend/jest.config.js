module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup.jest.ts"],

  // Enable coverage collection
  collectCoverage: true,

  // Specify which files to collect coverage from
  collectCoverageFrom: [
    "src/**/*.ts", // Include TypeScript files
    "!src/**/*.module.ts", // Exclude Angular modules
    "!src/test.ts", // Exclude test setup file
    "!src/environments/**", // Exclude environment files
  ],

  // Coverage reporters (optional)
  coverageReporters: ["json", "lcov", "text", "clover"],

  // Configure thresholds (optional)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
