import { describe, expect, it } from 'vitest';
import { licenceStatus } from '@/lib/credits/licence-status';
import { countSourceUsage } from '@/lib/credits/source-usage';

describe('licenceStatus', () => {
	it('flags unconfirmed licences', () => {
		expect(licenceStatus('To be confirmed')).toBe('pending');
		expect(licenceStatus('Not stated')).toBe('pending');
		expect(licenceStatus('CC BY 4.0 (sp-dev-docs repository)')).toBe('open');
	});
});

describe('countSourceUsage', () => {
	it('counts each source once per term', () => {
		const origin = (source: string) => ({ source, use: 'terms-only' as const });
		const counts = countSourceUsage([
			{ origins: [origin('a'), origin('a'), origin('b')] },
			{ origins: [origin('a')] },
		]);
		expect(counts.get('a')).toBe(2);
		expect(counts.get('b')).toBe(1);
	});
});
