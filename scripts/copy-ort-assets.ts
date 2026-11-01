import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT } from './lib/models';

// ONNX Runtime's WebAssembly files, served from our own origin instead of a CDN.
const FILES = ['ort-wasm-simd-threaded.mjs', 'ort-wasm-simd-threaded.wasm'];
const from = join(ROOT, 'node_modules/onnxruntime-web/dist');
const to = join(ROOT, 'public/ort');

await mkdir(to, { recursive: true });
for (const file of FILES) await copyFile(join(from, file), join(to, file));
console.log(`Copied ${FILES.length} ONNX Runtime files to public/ort`);
