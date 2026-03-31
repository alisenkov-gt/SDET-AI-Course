import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    headless: true,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

