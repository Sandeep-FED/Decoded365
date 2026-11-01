import { defineConfig, devices } from '@playwright/test';

const PORT = 4329;

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	// The meaning-search test downloads a 23 MB model; fewer parallel browsers avoids cache write failures.
	workers: process.env.CI ? 2 : 3,
	retries: process.env.CI ? 2 : 0,
	reporter: [['list']],
	use: { baseURL: `http://localhost:${PORT}`, ...devices['Desktop Chrome'] },
	// Tests run against the built site: `npm run build` first.
	webServer: { command: `npx astro preview --port ${PORT} --ignore-lock`, port: PORT, reuseExistingServer: !process.env.CI },
});
