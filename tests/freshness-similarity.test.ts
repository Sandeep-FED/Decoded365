import { describe, expect, it } from 'vitest';
import { freshnessReport, staleTerms } from '@/lib/content/freshness';
import { containment } from '@/lib/content/similarity';

const term = (id: string, reviewed: string) => ({ id, term: id.toUpperCase(), product: 'sharepoint', lastReviewed: new Date(reviewed) });

describe('staleTerms', () => {
	const now = new Date('2027-11-15T00:00:00Z');

	it('lists terms not reviewed in 12 months, oldest first', () => {
		const stale = staleTerms([term('fresh', '2027-06-01'), term('old', '2026-01-10'), term('edge', '2026-11-15'), term('almost', '2026-11-16')], now);
		expect(stale.map((t) => t.id)).toEqual(['old', 'edge']);
		expect(stale[0].monthsSince).toBe(22);
	});

	it('writes a checklist, or says all is well', () => {
		expect(freshnessReport([])).toMatch(/Every term/);
		expect(freshnessReport(staleTerms([term('old', '2026-01-10')], now))).toContain('- [ ] `sharepoint/old`');
	});
});

describe('containment', () => {
	const source = 'A hub site links related SharePoint sites together so they feel like one connected area for everyone';

	it('is high when wording is copied and low when it is original', () => {
		expect(containment('A hub site links related SharePoint sites together so they feel like one connected area', source)).toBeGreaterThan(0.9);
		expect(containment('Hubs tie several team spaces into a single neighbourhood with a shared menu', source)).toBe(0);
	});

	it('returns 0 for very short text', () => {
		expect(containment('too short', source)).toBe(0);
	});
});
