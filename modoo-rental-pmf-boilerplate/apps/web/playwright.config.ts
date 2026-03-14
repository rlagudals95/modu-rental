import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3101'
  },
  webServer: {
    command: 'pnpm exec next dev -p 3101',
    port: 3101,
    timeout: 120_000,
    reuseExistingServer: false
  }
});
