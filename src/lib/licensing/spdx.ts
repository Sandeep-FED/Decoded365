/** SPDX identifiers of OSI-approved licences that dependencies in this project may use. */
export const OSI_APPROVED = new Set([
	'0BSD',
	'AFL-3.0',
	'AGPL-3.0-only',
	'AGPL-3.0-or-later',
	'Apache-2.0',
	'Artistic-2.0',
	'BSD-1-Clause',
	'BSD-2-Clause',
	'BSD-3-Clause',
	'BSL-1.0',
	'EPL-1.0',
	'EPL-2.0',
	'EUPL-1.2',
	'GPL-2.0-only',
	'GPL-2.0-or-later',
	'GPL-3.0-only',
	'GPL-3.0-or-later',
	'ISC',
	'LGPL-2.1-only',
	'LGPL-2.1-or-later',
	'LGPL-3.0-only',
	'LGPL-3.0-or-later',
	'MIT',
	'MIT-0',
	'MPL-2.0',
	'NCSA',
	'OFL-1.1',
	'PostgreSQL',
	'Python-2.0',
	'Unlicense',
	'Zlib',
]);

/** Common spellings that package.json files use instead of the SPDX id. */
const ALIASES: Record<string, string> = {
	'Apache2': 'Apache-2.0',
	'BSD': 'BSD-3-Clause',
	'GPL-2.0': 'GPL-2.0-only',
	'GPL-3.0': 'GPL-3.0-only',
	'LGPL-2.1': 'LGPL-2.1-only',
	'LGPL-3.0': 'LGPL-3.0-only',
	'AGPL-3.0': 'AGPL-3.0-only',
};

const normalise = (id: string) => ALIASES[id.trim()] ?? id.trim().replace(/\+$/, '-or-later');

/**
 * Whether an SPDX expression is acceptable: `A OR B` needs one approved side,
 * `A AND B` needs both. Parentheses are supported.
 */
export function isOsiApproved(expression: string): boolean {
	const tokens = expression
		.replace(/Apache 2\.0/gi, 'Apache-2.0')
		.replace(/[()]/g, ' $& ')
		.split(/\s+/)
		.filter(Boolean);
	let position = 0;

	const parseOr = (): boolean => {
		let result = parseAnd();
		while (tokens[position]?.toUpperCase() === 'OR') {
			position++;
			result = parseAnd() || result;
		}
		return result;
	};
	const parseAnd = (): boolean => {
		let result = parseTerm();
		while (tokens[position]?.toUpperCase() === 'AND') {
			position++;
			result = parseTerm() && result;
		}
		return result;
	};
	const parseTerm = (): boolean => {
		const token = tokens[position++];
		if (token === '(') {
			const inner = parseOr();
			position++; // ')'
			return inner;
		}
		return !!token && OSI_APPROVED.has(normalise(token));
	};

	return tokens.length > 0 && parseOr();
}
