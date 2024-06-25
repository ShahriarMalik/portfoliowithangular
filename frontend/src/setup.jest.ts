import 'jest-preset-angular/setup-jest';
import 'jest-canvas-mock';
import 'web-animations-js';

// Mocking the animate function to avoid errors in tests
if (!global.Element.prototype.animate) {
  global.Element.prototype.animate = jest.fn();
}

// Suppress console output
const originalConsole = global.console;

global.console = {
  ...originalConsole,
  log: jest.fn(), // Suppress console.log
  info: jest.fn(), // Suppress console.info
  warn: jest.fn(), // Suppress console.warn
  error: jest.fn(), // Suppress console.error
};

Error.stackTraceLimit = 2; // Limit stack trace to 2 frames
