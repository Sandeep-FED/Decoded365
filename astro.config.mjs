// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL and BASE_PATH are set by the deploy workflow (e.g. BASE_PATH=/decoded365 on GitHub Pages).
export default defineConfig({
	site: process.env.SITE_URL ?? 'http://localhost:4321',
	base: process.env.BASE_PATH ?? '/',
	output: 'static',
	integrations: [react()],
	vite: { plugins: [tailwindcss()] },
});
