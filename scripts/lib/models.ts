import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface ModelRegistry {
	embedding: { id: string; licence: string; dimensions: number; dtype: string };
}

export const ROOT = process.cwd();

export async function readModels(): Promise<ModelRegistry> {
	return JSON.parse(await readFile(join(ROOT, 'config/models.json'), 'utf8'));
}
