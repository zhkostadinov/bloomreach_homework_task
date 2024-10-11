// @ts-check
/* eslint-disable */
const { defineConfig } = require('@playwright/test');

export default defineConfig({
  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 450000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  testDir: '../tests/',
});
