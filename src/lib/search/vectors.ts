/** Embeddings are unit vectors, so each value is in [-1, 1] and fits in one signed byte. */
export function encodeVector(vector: ArrayLike<number>): string {
	const bytes = new Int8Array(vector.length);
	for (let i = 0; i < vector.length; i++) bytes[i] = Math.max(-127, Math.min(127, Math.round(vector[i] * 127)));
	let binary = '';
	for (const byte of new Uint8Array(bytes.buffer)) binary += String.fromCharCode(byte);
	return btoa(binary);
}

export function decodeVector(encoded: string): Float32Array {
	const binary = atob(encoded);
	const result = new Float32Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		const byte = binary.charCodeAt(i);
		result[i] = (byte > 127 ? byte - 256 : byte) / 127;
	}
	return result;
}

/** Cosine similarity. */
export function cosine(a: ArrayLike<number>, b: ArrayLike<number>): number {
	let dot = 0;
	let na = 0;
	let nb = 0;
	for (let i = 0; i < a.length; i++) {
		dot += a[i] * b[i];
		na += a[i] * a[i];
		nb += b[i] * b[i];
	}
	return na && nb ? dot / Math.sqrt(na * nb) : 0;
}
