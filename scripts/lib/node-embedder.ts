import { join } from 'node:path';
import { env, pipeline } from '@huggingface/transformers';
import type { Embed } from '../../src/lib/search/semantic';
import { ROOT, readModels } from './models';

/** Embedder that runs the self-hosted model in Node (build time and evaluation). */
export async function createNodeEmbedder(): Promise<{ embed: Embed; model: string; dimensions: number }> {
	const { embedding } = await readModels();
	env.allowRemoteModels = false;
	env.allowLocalModels = true;
	env.localModelPath = join(ROOT, 'public/models') + '/';

	const extractor = await pipeline('feature-extraction', embedding.id, { dtype: embedding.dtype as 'q8' });
	const embed: Embed = async (text) => {
		const output = await extractor(text, { pooling: 'mean', normalize: true });
		return Float32Array.from(output.data as Float32Array);
	};
	return { embed, model: embedding.id, dimensions: embedding.dimensions };
}
