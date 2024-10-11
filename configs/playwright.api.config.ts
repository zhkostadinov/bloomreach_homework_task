// @ts-check
/* eslint-disable */
const { defineConfig, devices } = require('@playwright/test');
import baseConfig from './playwright.default.config.ts';

export default defineConfig({
  ...baseConfig,
  use: {
    trace: 'off',
    actionTimeout: 90000,
  },
});
