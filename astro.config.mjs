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
			// One copy of React for islands and libraries built on it (motion, radix-ui, cmdk).
			dedupe: ['react', 'react-dom'],
		},
		// Pre-bundle everything the islands and workers import at start-up. Without this, Vite discovers
		// them one by one while a page loads, re-optimises mid-session and reloads the page (losing input).
		optimizeDeps: {
			include: [
				'react',
				'react-dom',
				'react-dom/client',
				'react/jsx-runtime',
				'radix-ui',
				'cmdk',
				'sonner',
				'lucide-react',
				'motion/react',
				'cytoscape',
				'@orama/orama',
				'@huggingface/transformers',
				'@mlc-ai/web-llm',
			],
		},
		// Pin the bundler to this repo's tsconfig for the same reason.
		build: { rolldownOptions: { tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)) } },
	},
});
