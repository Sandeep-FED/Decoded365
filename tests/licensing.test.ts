import { describe, expect, it } from 'vitest';
import { isOsiApproved } from '@/lib/licensing/spdx';

describe('isOsiApproved', () => {
	it('accepts OSI licences and common spellings', () => {
		for (const id of ['MIT', 'Apache-2.0', 'ISC', 'BSD-3-Clause', 'MPL-2.0', 'OFL-1.1', 'Apache 2.0', 'GPL-3.0+']) {
			expect(isOsiApproved(id), id).toBe(true);
		}
	});

	it('rejects licences that are not OSI-approved', () => {
		for (const id of ['CC-BY-NC-4.0', 'Llama-3-Community', 'UNLICENSED', 'SEE LICENSE IN LICENSE.md', 'CC0-1.0', 'BlueOak-1.0.0', '']) {
			expect(isOsiApproved(id), id).toBe(false);
		}
	});

	it('handles OR, AND and parentheses', () => {
		expect(isOsiApproved('(MIT OR CC-BY-NC-4.0)')).toBe(true);
		expect(isOsiApproved('MIT AND CC-BY-NC-4.0')).toBe(false);
		expect(isOsiApproved('(MIT AND ISC) OR Proprietary')).toBe(true);
		expect(isOsiApproved('Proprietary OR (CC-BY-NC-4.0 AND MIT)')).toBe(false);
	});
});
