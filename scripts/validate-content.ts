import { loadSourceIds, loadTermFiles } from '../src/lib/content/load-term-files';
import { validateCorpus } from '../src/lib/content/validate';

const root = process.cwd();
const { entries, issues: fileIssues } = await loadTermFiles(root);
const issues = [...fileIssues, ...validateCorpus(entries, await loadSourceIds(root))];

if (issues.length) {
	console.error(`Content validation failed (${issues.length} issue${issues.length === 1 ? '' : 's'}):\n`);
	for (const issue of issues) console.error(`  ${issue.where}\n    ${issue.message}`);
	process.exit(1);
}
console.log(`Content OK: ${entries.length} terms validated.`);
