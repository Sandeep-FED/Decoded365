import type { TermData } from '@/schema/term';
import { extractLevels, missingLevels, LEVELS } from './levels';
import { findWikiLinks } from './wikilinks';
import { findExternalLinks } from './external-links';

export interface CorpusEntry {
	data: TermData;
	body: string;
	/** Where the entry came from (file path), for error messages. */
	where: string;
}

export interface Issue {
	where: string;
	message: string;
}

const norm = (value: string) => value.trim().toLowerCase();

/**
 * Cross-entry rules that a per-file schema can't express: unique ids,
 * duplicate names, relation targets, `[[links]]`, required levels, external
 * links and known sources. Pure so it can run in CI, at build and in tests.
 */
export function validateCorpus(entries: CorpusEntry[], knownSourceIds: Set<string>): Issue[] {
	const issues: Issue[] = [];
	const report = (entry: CorpusEntry, message: string) => issues.push({ where: entry.where, message });

	const ids = new Map<string, CorpusEntry>();
	const names = new Map<string, CorpusEntry>();

	for (const entry of entries) {
		const { id, term, aliases } = entry.data;

		const sameId = ids.get(id);
		if (sameId) report(entry, `Duplicate id "${id}" (also in ${sameId.where}).`);
		else ids.set(id, entry);

		for (const name of [term, ...aliases]) {
			const key = norm(name);
			const other = names.get(key);
			if (other && other.data.id !== id) {
				report(entry, `"${name}" is already used as a name or alias by "${other.data.id}" (possible duplicate).`);
			} else {
				names.set(key, entry);
			}
		}
	}

	for (const entry of entries) {
		const { data, body } = entry;

		const sections = extractLevels(body);
		if (data.levels === 'complete') {
			const missing = missingLevels(sections);
			if (missing.length) {
				report(entry, `Missing level section(s): ${missing.join(', ')} (add them or set "levels: partial").`);
			}
		} else if (LEVELS.every((l) => !sections[l]?.trim())) {
			report(entry, 'A partial entry still needs at least one level section.');
		}

		for (const link of findExternalLinks(body)) {
			report(entry, `External link not allowed in an entry: ${link}`);
		}

		for (const target of findWikiLinks(body)) {
			if (!ids.has(target)) report(entry, `[[${target}]] does not match any term id.`);
		}

		for (const relation of data.related) {
			if (relation.id === data.id) report(entry, 'A term cannot be related to itself.');
			else if (!ids.has(relation.id)) report(entry, `Relation target "${relation.id}" does not exist.`);
		}

		if (data.retired?.replacedBy && !ids.has(data.retired.replacedBy)) {
			report(entry, `retired.replacedBy "${data.retired.replacedBy}" does not exist.`);
		}
		if (data.status === 'retired' && !data.retired) {
			report(entry, 'A retired term needs a "retired" block (date, where).');
		}

		for (const origin of data.origins) {
			if (!knownSourceIds.has(origin.source)) {
				report(entry, `Unknown source "${origin.source}" (add it to content/sources.yml).`);
			}
		}
	}

	return issues;
}
