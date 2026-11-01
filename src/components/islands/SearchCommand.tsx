import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import type { SearchEngine, SearchResult } from '@/lib/search/engine';
import { formatYearMonth } from '@/lib/format-date';
import { STATUS_LABELS } from '@/lib/glossary/labels';
import { termPath, withBase } from '@/lib/paths';

/** Search bar (`/` or Ctrl/⌘ K). Keyword results are instant; the index loads on first open. */
export default function SearchCommand() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
	const engine = useRef<SearchEngine | null>(null);

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			const typing = (event.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
			if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
				event.preventDefault();
				setOpen((o) => !o);
			}
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => {
		if (!open || engine.current || state === 'loading') return;
		setState('loading');
		(async () => {
			try {
				const [{ createSearchEngine }, response] = await Promise.all([
					import('@/lib/search/engine'),
					fetch(withBase('search-index.json')),
				]);
				if (!response.ok) throw new Error(String(response.status));
				engine.current = await createSearchEngine(await response.json());
				setState('ready');
			} catch {
				setState('error');
			}
		})();
	}, [open, state]);

	useEffect(() => {
		if (state !== 'ready' || !engine.current) return;
		let current = true;
		engine.current.search(query).then((found) => current && setResults(found));
		return () => {
			current = false;
		};
	}, [query, state]);

	const terms = results.filter((r) => r.matchedName?.kind !== 'old-name');
	const oldNames = results.filter((r) => r.matchedName?.kind === 'old-name');

	const row = (r: SearchResult) => (
		<CommandItem
			key={r.doc.id}
			value={r.doc.id}
			onSelect={() => {
				window.location.href = termPath(r.doc.id);
			}}
			className="flex-col items-start gap-0.5"
		>
			<div className="flex w-full items-center gap-2">
				<span className="font-medium">{r.doc.term}</span>
				{r.doc.status !== 'ga' && <Badge variant="secondary">{STATUS_LABELS[r.doc.status]}</Badge>}
			</div>
			{r.matchedName && (
				<span className="text-xs text-muted-foreground">
					{r.matchedName.kind === 'old-name'
						? `Formerly "${r.matchedName.name}"${r.matchedName.rename?.date ? `, renamed ${formatYearMonth(r.matchedName.rename.date)}` : ''}`
						: `Also known as "${r.matchedName.name}"`}
				</span>
			)}
			<span className="line-clamp-1 text-xs text-muted-foreground">{r.doc.summary}</span>
		</CommandItem>
	);

	return (
		<>
			<Button variant="outline" size="sm" onClick={() => setOpen(true)} aria-label="Search the glossary" className="gap-2 text-muted-foreground">
				<SearchIcon />
				<span className="hidden sm:inline">Search</span>
				<kbd className="hidden rounded border px-1.5 text-xs sm:inline">/</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command shouldFilter={false}>
					<CommandInput value={query} onValueChange={setQuery} placeholder="Type a term, an old name, or what you mean…" />
					<CommandList>
						{state === 'loading' && <div className="py-6 text-center text-sm text-muted-foreground">Loading…</div>}
						{state === 'error' && <div className="py-6 text-center text-sm">Search could not load. Try the A–Z list instead.</div>}
						{state === 'ready' && !query.trim() && (
							<div className="py-6 text-center text-sm text-muted-foreground">
								Try “recycle bin”, “app for SharePoint” or “deleted files”.
							</div>
						)}
						{state === 'ready' && query.trim() && results.length === 0 && <CommandEmpty>No matching terms.</CommandEmpty>}
						{terms.length > 0 && <CommandGroup heading="Terms">{terms.map(row)}</CommandGroup>}
						{oldNames.length > 0 && <CommandGroup heading="Old names">{oldNames.map(row)}</CommandGroup>}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
