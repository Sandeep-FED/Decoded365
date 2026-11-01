import { WebWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

// Runs the on-device chat model off the main thread (BRD 8.4 step 4).
const handler = new WebWorkerMLCEngineHandler();
(self as unknown as { onmessage: (message: MessageEvent) => void }).onmessage = (message) => handler.onmessage(message);
