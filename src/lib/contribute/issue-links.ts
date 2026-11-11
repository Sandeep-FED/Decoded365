/** Prefilled repository links for contributing. Site-level only, never part of entry content. */
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
