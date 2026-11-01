import type { Level } from '@/lib/content/levels';

/** localStorage keys, shared by the page script and the islands. Nothing leaves the device. */
export const PREF_KEYS = {
	level: 'decoded365:level',
	legacy: 'decoded365:show-legacy',
	theme: 'decoded365:theme',
} as const;

export type Theme = 'light' | 'dark' | 'system';

export function readPref(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

export function writePref(key: string, value: string): void {
	try {
		localStorage.setItem(key, value);
	} catch {
		/* storage unavailable (private mode): the preference just isn't remembered */
	}
}

export function applyLevel(level: Level): void {
	document.documentElement.dataset.level = level;
}

export function applyLegacy(show: boolean): void {
	document.documentElement.dataset.legacy = show ? 'show' : 'hide';
}

export function applyTheme(theme: Theme): void {
	const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.classList.toggle('dark', dark);
}
