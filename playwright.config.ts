import { defineConfig, devices } from '@playwright/test';

const PORT = 4329;
const GPU = !!process.env.ASK_GPU;

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	// The meaning-search tests each download a 23 MB model; fewer parallel browsers avoids cache write failures.
	workers: process.env.CI ? 2 : 3,
	retries: process.env.CI ? 2 : 0,
	reporter: [['list']],
	use: { baseURL: `http://localhost:${PORT}`, ...devices['Desktop Chrome'] },
	projects: [
		{ name: 'chromium', testIgnore: /ask-generation/ },
		// Opt-in (ASK_GPU=1): runs the real on-device model, which needs a WebGPU adapter and an 880 MB download.
		...(GPU
			? [
					{
						name: 'gpu',
						testMatch: /ask-generation/,
						use: {
							...devices['Desktop Chrome'],
							channel: 'chromium',
							launchOptions: { args: ['--enable-unsafe-webgpu', '--enable-features=Vulkan,WebGPU', '--ignore-gpu-blocklist'] },
						},
					},
				]
			: []),
	],
	// Tests run against the built site: `npm run build` first.
	webServer: { command: `npx astro preview --port ${PORT} --ignore-lock`, port: PORT, reuseExistingServer: !process.env.CI },
});
