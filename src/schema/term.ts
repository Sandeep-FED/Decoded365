import { z } from 'zod';

export const RELATION_TYPES = [
	'part-of',
	'requires',
	'used-by',
	'alternative-to',
	'often-confused-with',
	'replaced-by',
] as const;
export const RelationType = z.enum(RELATION_TYPES);

export const PRODUCTS = ['sharepoint', 'power-platform', 'copilot', 'cross-platform'] as const;
export const Product = z.enum(PRODUCTS);

export const STATUSES = ['ga', 'preview', 'legacy', 'retired'] as const;
export const Status = z.enum(STATUSES);

export const APPLIES_TO = ['sharepoint-online', 'sharepoint-server'] as const;
export const AppliesTo = z.enum(APPLIES_TO);

export const ORIGIN_USES = ['adapted', 'terms-only', 'facts-only'] as const;

/** Front matter of one term file: `content/terms/<product>/<slug>.md`. */
export const Term = z.object({
	id: z.string().regex(/^[a-z0-9-]+$/),
	term: z.string().min(2),
	aliases: z.array(z.string()).default([]),
	product: Product,
	category: z.string(),
	status: Status,
	appliesTo: z.array(AppliesTo).optional(),
	retired: z
		.object({
			date: z.string(),
			where: z.string(),
			replacedBy: z.string().optional(),
		})
		.optional(),
	renamed: z
		.array(
			z.object({
				from: z.string(),
				to: z.string(),
				// null when the source gives no date
				date: z
					.string()
					.regex(/^\d{4}-\d{2}$/)
					.nullable(),
			}),
		)
		.default([]),
	related: z.array(z.object({ id: z.string(), type: RelationType })).default([]),
	origins: z
		.array(
			z.object({
				source: z.string(),
				use: z.enum(ORIGIN_USES),
			}),
		)
		.min(1),
	/** `partial` lets an entry ship before all three levels are written. */
	levels: z.enum(['complete', 'partial']).default('complete'),
	/**
	 * Where the text stands: `drafted` = written with AI and not yet read by a person, `reviewed` = a person has
	 * checked it. Left out for entries nobody has marked yet.
	 */
	review: z.enum(['drafted', 'reviewed']).optional(),
	lastReviewed: z.coerce.date(),
	reviewers: z.array(z.string()).min(1),
});

export const REVIEW_STATES = ['reviewed', 'drafted'] as const;
export type ReviewState = (typeof REVIEW_STATES)[number];
export type TermData = z.infer<typeof Term>;
export type RelationTypeName = z.infer<typeof RelationType>;
export type ProductName = z.infer<typeof Product>;
export type StatusName = z.infer<typeof Status>;
export type AppliesToName = z.infer<typeof AppliesTo>;
