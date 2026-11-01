import { describe, expect, it } from 'vitest';
import { formatDate, formatYearMonth } from '@/lib/format-date';

describe('format-date', () => {
	it('formats ISO dates without time zone drift', () => {
		expect(formatDate('2026-04-02')).toBe('2 April 2026');
		expect(formatDate(new Date('2026-11-01T00:00:00Z'))).toBe('1 November 2026');
	});

	it('formats year-month and unknown dates', () => {
		expect(formatYearMonth('2025-10')).toBe('October 2025');
		expect(formatYearMonth(null)).toBe('Date not stated');
	});
});
