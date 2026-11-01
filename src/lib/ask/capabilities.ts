export interface NavigatorLike {
	gpu?: { requestAdapter(): Promise<unknown | null> };
	deviceMemory?: number;
}

export type Capability = { ok: true } | { ok: false; reason: 'no-webgpu' | 'no-adapter' | 'low-memory' };

/** Whether this device can run the on-device model. Otherwise Ask falls back to showing entries. */
export async function checkOnDeviceModel(nav: NavigatorLike, minMemoryGB = 4): Promise<Capability> {
	if (!nav.gpu) return { ok: false, reason: 'no-webgpu' };
	try {
		if (!(await nav.gpu.requestAdapter())) return { ok: false, reason: 'no-adapter' };
	} catch {
		return { ok: false, reason: 'no-adapter' };
	}
	if (nav.deviceMemory !== undefined && nav.deviceMemory < minMemoryGB) return { ok: false, reason: 'low-memory' };
	return { ok: true };
}

export const REASON_TEXT = {
	'no-webgpu': 'This browser does not support WebGPU, which the on-device model needs.',
	'no-adapter': 'No graphics adapter is available for the on-device model.',
	'low-memory': 'This device does not have enough memory for the on-device model.',
} as const;
