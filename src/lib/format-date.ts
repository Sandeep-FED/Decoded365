const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-04-02" → "2 April 2026" */
export function formatDate(iso: string | Date): string {
	const d = typeof iso === 'string' ? new Date(`${iso}T00:00:00Z`) : iso;
	return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** "2025-10" → "October 2025"; null means the source gives no date. */
export function formatYearMonth(value: string | null): string {
	if (!value) return 'Date not stated';
	const [year, month] = value.split('-');
	return `${MONTHS[Number(month) - 1]} ${year}`;
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-04-02" → "2 Apr 2026", "2025-10" → "Oct 2025", null → "No date": the short form timelines use. */
export function formatShortDate(value: string | null): string {
	if (!value) return 'No date';
	const [year, month, day] = value.split('-');
	const monthName = SHORT_MONTHS[Number(month) - 1];
	return day ? `${Number(day)} ${monthName} ${year}` : `${monthName} ${year}`;
}
