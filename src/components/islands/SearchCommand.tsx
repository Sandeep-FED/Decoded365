import { useEffect, useRef, useState } from 'react';
import { MessageCircleQuestionIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useHybridSearch } from '@/components/hooks/use-hybrid-search';
import type { SearchResult } from '@/lib/search/engine';
import { formatYearMonth } from '@/lib/format-date';
import { STATUS_LABELS } from '@/lib/glossary/labels';
import { askPath, termPath } from '@/lib/paths';

const megabytes = (bytes: number) => (bytes / 1_000_000).toFixed(0);

/**
 * Search bar (`/` or Ctrl/⌘ K). Name matches are instant. The first time someone types, a small
 * embedding model downloads in a Web Worker so results can also match by meaning (BRD F4).
 */
export default function SearchCommand() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const { engine, indexState, meaning, progress, startMeaning } = useHybridSearch(open);

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

	// Start the model only when someone actually searches.
	useEffect(() => {
		if (indexState === 'ready' && query.trim()) void startMeaning();
	}, [indexState, query, startMeaning]);

	// Run the search (debounced). Re-runs when the model finishes loading.
	useEffect(() => {
		if (indexState !== 'ready' || !engine.current) return;
		let current = true;
		const timer = setTimeout(() => {
			engine.current?.search(query).then((found) => current && setResults(found));
		}, 120);
		return () => {
			current = false;
			clearTimeout(timer);
		};
	}, [query, indexState, meaning]);

	const terms = results.filter((r) => r.matchedName?.kind !== 'old-name');
	const oldNames = results.filter((r) => r.matchedName?.kind === 'old-name');
	const percent = progress && progress.total > 0 ? Math.round((progress.loaded / progress.total) * 100) : 0;

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
			<Button variant="outline" size="sm" onClick={() => setOpen(true)} aria-label="Search the glossary" className="gap-2 rounded-full text-muted-foreground">
				<SearchIcon />
				<span className="hidden sm:inline">Search</span>
				<kbd className="hidden rounded border px-1.5 text-xs sm:inline">/</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command shouldFilter={false}>
					<CommandInput value={query} onValueChange={setQuery} placeholder="Type a term, an old name, or what you mean…" />
					<CommandList>
						{indexState === 'loading' && <div className="py-6 text-center text-sm text-muted-foreground">Loading…</div>}
						{indexState === 'error' && <div className="py-6 text-center text-sm">Search could not load. Try the A–Z list instead.</div>}
						{indexState === 'ready' && !query.trim() && (
							<div className="py-6 text-center text-sm text-muted-foreground">Try “recycle bin”, “app for SharePoint” or “where do deleted files go”.</div>
						)}
						{indexState === 'ready' && query.trim() && results.length === 0 && <CommandEmpty>No matching terms.</CommandEmpty>}
						{terms.length > 0 && <CommandGroup heading="Terms">{terms.map(row)}</CommandGroup>}
						{oldNames.length > 0 && <CommandGroup heading="Old names">{oldNames.map(row)}</CommandGroup>}
						{query.trim() && (
							<CommandGroup heading="Ask Decoded365">
								<CommandItem
									value={`ask:${query}`}
									onSelect={() => {
										window.location.href = `${askPath()}?q=${encodeURIComponent(query.trim())}`;
									}}
								>
									<MessageCircleQuestionIcon /> Ask: “{query.trim()}”
								</CommandItem>
							</CommandGroup>
						)}
					</CommandList>
					<div className="border-t px-3 py-2 text-xs text-muted-foreground" aria-live="polite">
						{meaning === 'loading' && (
							<div className="space-y-1.5">
								<p>
									Preparing search by meaning (one-time download{progress && progress.total > 0 ? `, ${megabytes(progress.loaded)} of ${megabytes(progress.total)} MB` : ''}). Name matches work meanwhile.
								</p>
								<Progress value={percent} aria-label="Model download progress" />
							</div>
						)}
						{meaning === 'ready' && <p>Searching by name and meaning, on your device.</p>}
						{meaning === 'unavailable' && <p>Searching by name. Meaning search is not available on this device.</p>}
						{meaning === 'off' && <p>Searches run on your device. Nothing is sent anywhere.</p>}
					</div>
				</Command>
			</CommandDialog>
		</>
	);
}
