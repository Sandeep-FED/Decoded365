// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL and BASE_PATH are set by the deploy workflow (e.g. BASE_PATH=/decoded365 on GitHub Pages).
export default defineConfig({
	site: process.env.SITE_URL ?? 'http://localhost:4321',
	base: process.env.BASE_PATH ?? '/',
	output: 'static',
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// Explicit alias (mirrors tsconfig `paths`) instead of Vite's tsconfig lookup, which walks up
			// the directory tree and fails if an unrelated tsconfig.json sits above the repository.
			alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
			tsconfigPaths: false,
		},
		// Pin the bundler to this repo's tsconfig for the same reason.
		build: { rolldownOptions: { tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)) } },
	},
});
