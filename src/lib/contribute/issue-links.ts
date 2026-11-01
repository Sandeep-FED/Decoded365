/** Prefilled repository links for contributing (BRD UC-6). Site-level only, never part of entry content. */
export function editTermUrl(repoUrl: string, product: string, id: string): string {
	return `${repoUrl}/edit/main/content/terms/${product}/${id}.md`;
}

export function reportErrorUrl(repoUrl: string, termName: string, id: string): string {
	const params = new URLSearchParams({
		template: 'report-error.yml',
		title: `Error in "${termName}"`,
		term: id,
	});
	return `${repoUrl}/issues/new?${params}`;
}

export function suggestTermUrl(repoUrl: string): string {
	return `${repoUrl}/issues/new?${new URLSearchParams({ template: 'suggest-term.yml' })}`;
}

/** Prefilled issue for feedback on an Ask answer. Nothing is sent until the visitor submits it on GitHub. */
export function askFeedbackUrl(repoUrl: string, feedback: { question: string; answer: string; helpful: boolean }): string {
	const params = new URLSearchParams({
		template: 'report-error.yml',
		title: `Ask answer ${feedback.helpful ? 'feedback' : 'was not helpful'}: ${feedback.question.slice(0, 60)}`,
		problem: `Question: ${feedback.question}\n\nAnswer I got:\n${feedback.answer}`,
	});
	return `${repoUrl}/issues/new?${params}`;
}
