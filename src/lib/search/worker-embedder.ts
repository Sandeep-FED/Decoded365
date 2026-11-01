import models from '../../../config/models.json';
import type { Embed } from './semantic';
import { withBase } from '@/lib/paths';

export interface DownloadProgress {
	loaded: number;
	total: number;
}

export interface WorkerEmbedder {
	embed: Embed;
	/** Resolves once the model is downloaded and loaded; rejects if the browser can't run it. */
	ready: Promise<void>;
	dispose(): void;
}

/** Starts the model in a Web Worker. Call it only when the visitor first needs meaning search (BRD NFR: lazy models). */
export function createWorkerEmbedder(onProgress: (progress: DownloadProgress) => void): WorkerEmbedder {
	const worker = new Worker(new URL('../../workers/embed.worker.ts', import.meta.url), { type: 'module' });
	const pending = new Map<number, { resolve: (v: Float32Array) => void; reject: (e: Error) => void }>();
	const files = new Map<string, DownloadProgress>();
	let nextId = 0;

	let markReady!: () => void;
	let markFailed!: (error: Error) => void;
	const ready = new Promise<void>((resolve, reject) => {
		markReady = resolve;
		markFailed = reject;
	});

	worker.onmessage = (event) => {
		const m = event.data;
		if (m.type === 'progress' && typeof m.total === 'number' && typeof m.loaded === 'number') {
			files.set(m.file, { loaded: m.loaded, total: m.total });
			const all = [...files.values()];
			onProgress({ loaded: all.reduce((s, f) => s + f.loaded, 0), total: all.reduce((s, f) => s + f.total, 0) });
		} else if (m.type === 'ready') markReady();
		else if (m.type === 'result') pending.get(m.id)?.resolve(m.vector), pending.delete(m.id);
		else if (m.type === 'error') {
			const error = new Error(m.message);
			if (m.id === undefined) markFailed(error);
			else pending.get(m.id)?.reject(error), pending.delete(m.id);
		}
	};
	worker.onerror = (event) => markFailed(new Error(event.message));

	const base = new URL(withBase('/'), location.href).href;
	worker.postMessage({ type: 'init', base, model: models.embedding.id, dtype: models.embedding.dtype });

	return {
		ready,
		embed: (text) =>
			ready.then(
				() =>
					new Promise<Float32Array>((resolve, reject) => {
						const id = nextId++;
						pending.set(id, { resolve, reject });
						worker.postMessage({ type: 'embed', id, text });
					}),
			),
		dispose: () => worker.terminate(),
	};
}
