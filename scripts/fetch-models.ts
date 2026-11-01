import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { ROOT, readModels } from './lib/models';

// Self-host the embedding model so visitors never contact a third party for it (BRD 8.4, spike S3).
// Files are downloaded once into public/models (git-ignored) and published with the site.
const FILES = ['config.json', 'tokenizer.json', 'tokenizer_config.json', 'special_tokens_map.json'];
const WEIGHTS: Record<string, string> = { q8: 'onnx/model_quantized.onnx', fp32: 'onnx/model.onnx', fp16: 'onnx/model_fp16.onnx' };

const { embedding } = await readModels();
const weights = WEIGHTS[embedding.dtype];
if (!weights) throw new Error(`Unsupported dtype "${embedding.dtype}" for ${embedding.id}`);

for (const file of [...FILES, weights]) {
	const target = join(ROOT, 'public/models', embedding.id, file);
	if (await stat(target).then(() => true, () => false)) continue;

	const response = await fetch(`https://huggingface.co/${embedding.id}/resolve/main/${file}`);
	if (!response.ok) throw new Error(`Could not download ${file}: ${response.status}`);
	await mkdir(dirname(target), { recursive: true });
	await writeFile(target, Buffer.from(await response.arrayBuffer()));
	console.log(`Downloaded ${embedding.id}/${file}`);
}
console.log(`Model ready: ${embedding.id} (${embedding.licence})`);
