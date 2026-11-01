import { defineConfig, devices } from '@playwright/test';

const PORT = 4329;

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	reporter: [['list']],
	use: { baseURL: `http://localhost:${PORT}`, ...devices['Desktop Chrome'] },
	// Tests run against the built site: `npm run build` first.
	webServer: { command: `npx astro preview --port ${PORT} --ignore-lock`, port: PORT, reuseExistingServer: !process.env.CI },
});
