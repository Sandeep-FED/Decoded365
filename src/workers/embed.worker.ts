import { env, pipeline } from '@huggingface/transformers';

// Runs the embedding model off the main thread. Messages in: init, embed. Messages out: progress, ready, error, result.
interface Scope {
	postMessage(message: unknown): void;
	onmessage: ((event: MessageEvent) => void) | null;
}
const scope = self as unknown as Scope;

type Extractor = (text: string, options: { pooling: 'mean'; normalize: boolean }) => Promise<{ data: Float32Array }>;
let extractor: Extractor | null = null;

scope.onmessage = async (event) => {
	const message = event.data;

	if (message.type === 'init') {
		try {
			// Everything is served from our own origin: no CDN, no Hugging Face. `base` is a site path such as /whatsitcalled/.
			env.allowRemoteModels = false;
			env.allowLocalModels = true;
			env.localModelPath = `${message.base}models/`;
			// Transformers.js keeps its own persistent copy in the Cache API, so skip the browser's HTTP disk cache for
			// these large files: it can fail to store a 23 MB response (ERR_CACHE_WRITE_FAILURE) and break the download.
			env.fetch = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, { ...init, cache: 'no-store' });
			const wasm = env.backends.onnx.wasm;
			if (wasm) {
				wasm.wasmPaths = { mjs: `${message.base}ort/ort-wasm-simd-threaded.mjs`, wasm: `${message.base}ort/ort-wasm-simd-threaded.wasm` };
				wasm.numThreads = 1; // multi-threading needs cross-origin isolation, which static hosting can't provide
			}
			extractor = (await pipeline('feature-extraction', message.model, {
				dtype: message.dtype,
				device: 'wasm',
				progress_callback: (p: unknown) => scope.postMessage({ type: 'progress', ...(p as object) }),
			})) as unknown as Extractor;
			scope.postMessage({ type: 'ready' });
		} catch (error) {
			scope.postMessage({ type: 'error', message: String(error) });
		}
	}

	if (message.type === 'embed') {
		try {
			if (!extractor) throw new Error('Model is not loaded yet');
			const output = await extractor(message.text, { pooling: 'mean', normalize: true });
			scope.postMessage({ type: 'result', id: message.id, vector: Float32Array.from(output.data) });
		} catch (error) {
			scope.postMessage({ type: 'error', id: message.id, message: String(error) });
		}
	}
};
