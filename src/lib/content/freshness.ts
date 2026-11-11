export interface Reviewable {
	id: string;
	term: string;
	product: string;
	lastReviewed: Date;
}

export interface StaleTerm extends Reviewable {
	/** Whole months since the last review. */
	monthsSince: number;
}

/** Terms not reviewed within `months` months, oldest first. */
export function staleTerms(terms: Reviewable[], now: Date, months = 12): StaleTerm[] {
	const monthsBetween = (from: Date) =>
		(now.getUTCFullYear() - from.getUTCFullYear()) * 12 +
		(now.getUTCMonth() - from.getUTCMonth()) -
		(now.getUTCDate() < from.getUTCDate() ? 1 : 0);

	return terms
		.map((t) => ({ ...t, monthsSince: monthsBetween(t.lastReviewed) }))
		.filter((t) => t.monthsSince >= months)
		.sort((a, b) => b.monthsSince - a.monthsSince || a.term.localeCompare(b.term));
}

/** Markdown body for the weekly "stale terms" issue. */
export function freshnessReport(stale: StaleTerm[], months = 12): string {
	if (stale.length === 0) return `Every term has been reviewed in the last ${months} months.`;
	const rows = stale.map((t) => `- [ ] \`${t.product}/${t.id}\` ${t.term} (last reviewed ${t.monthsSince} months ago)`);
	return [
		`These ${stale.length} term(s) have not been reviewed in ${months} months or more.`,
		'Check the entry against current sources, then update `lastReviewed` (and `reviewers`).',
		'',
		...rows,
	].join('\n');
}
