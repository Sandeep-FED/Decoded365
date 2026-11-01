import { useCallback, useEffect, useRef, useState } from 'react';
import type { SearchDocument } from '@/lib/search/documents';
import { createHybridEngine, type HybridEngine, type HybridOptions } from '@/lib/search/hybrid';
import { loadVectorIndex, type VectorFile } from '@/lib/search/semantic';
import { createWorkerEmbedder, type DownloadProgress, type WorkerEmbedder } from '@/lib/search/worker-embedder';
import { withBase } from '@/lib/paths';

export type IndexState = 'idle' | 'loading' | 'ready' | 'error';
export type Meaning = 'off' | 'loading' | 'ready' | 'unavailable';

/**
 * Loads the name index when `enabled`, and starts the on-device embedding model only when
 * `startMeaning()` is called (BRD: models download only when a feature needs them).
 * `version` changes whenever the engine gains meaning search, so callers can re-run a search.
 */
export function useHybridSearch(enabled: boolean) {
	const [indexState, setIndexState] = useState<IndexState>('idle');
	const [meaning, setMeaning] = useState<Meaning>('off');
	const [progress, setProgress] = useState<DownloadProgress | null>(null);

	const engine = useRef<HybridEngine | null>(null);
	const options = useRef<HybridOptions>({});
	const embedder = useRef<WorkerEmbedder | null>(null);
	const meaningReady = useRef<Promise<void> | null>(null);

	useEffect(() => {
		if (!enabled || indexState !== 'idle') return;
		setIndexState('loading');
		(async () => {
			try {
				const [docsResponse, vectorsResponse] = await Promise.all([fetch(withBase('search-index.json')), fetch(withBase('vectors.json'))]);
				if (!docsResponse.ok) throw new Error(String(docsResponse.status));
				const docs: SearchDocument[] = await docsResponse.json();
				if (vectorsResponse.ok) options.current.index = loadVectorIndex((await vectorsResponse.json()) as VectorFile);
				engine.current = await createHybridEngine(docs, options.current);
				setIndexState('ready');
			} catch {
				setIndexState('error');
			}
		})();
	}, [enabled, indexState]);

	useEffect(() => () => embedder.current?.dispose(), []);

	/** Start the model if it isn't running. The promise resolves when meaning search is ready, or gives up quietly. */
	const startMeaning = useCallback((): Promise<void> => {
		if (meaningReady.current) return meaningReady.current;
		if (!options.current.index || typeof WebAssembly === 'undefined') {
			setMeaning('unavailable');
			return Promise.resolve();
		}
		setMeaning('loading');
		// One retry: a dropped connection while downloading the model shouldn't switch meaning search off for the whole visit.
		const attempt = (triesLeft: number): Promise<void> => {
			const started = createWorkerEmbedder(setProgress);
			embedder.current = started;
			return started.ready.then(
				() => {
					options.current.embed = started.embed;
					setMeaning('ready');
				},
				() => {
					started.dispose();
					if (triesLeft > 0) return attempt(triesLeft - 1);
					setMeaning('unavailable');
				},
			);
		};
		meaningReady.current = attempt(1);
		return meaningReady.current;
	}, []);

	return { engine, indexState, meaning, progress, startMeaning };
}
