import { CreateWebWorkerMLCEngine, hasModelInCache, type InitProgressReport } from '@mlc-ai/web-llm';
import models from '../../../config/models.json';
import type { ChatMessage } from './prompt';

export interface AskEngine {
	/** Streams the answer; `onText` receives the whole answer so far. Resolves with the final text. */
	generate(messages: ChatMessage[], onText: (answerSoFar: string) => void, signal?: AbortSignal): Promise<string>;
	dispose(): void;
}

/** True when the model is already in the browser cache, so no download is needed. */
export const isModelCached = () => hasModelInCache(models.chat.id).catch(() => false);

/** Downloads (first time only) and starts the model in a Web Worker. Call only after the visitor consents. */
export async function startAskEngine(onProgress: (report: InitProgressReport) => void): Promise<AskEngine> {
	const worker = new Worker(new URL('../../workers/ask.worker.ts', import.meta.url), { type: 'module' });
	const engine = await CreateWebWorkerMLCEngine(worker, models.chat.id, { initProgressCallback: onProgress });

	return {
		async generate(messages, onText, signal) {
			const stop = () => engine.interruptGenerate();
			signal?.addEventListener('abort', stop);
			try {
				const stream = await engine.chat.completions.create({ messages, stream: true, temperature: 0.2, max_tokens: 320 });
				let text = '';
				for await (const chunk of stream) {
					text += chunk.choices[0]?.delta?.content ?? '';
					onText(text);
				}
				return text;
			} finally {
				signal?.removeEventListener('abort', stop);
			}
		},
		dispose: () => worker.terminate(),
	};
}
