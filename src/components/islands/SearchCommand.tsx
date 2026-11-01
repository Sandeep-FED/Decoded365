import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import type { SearchDocument } from '@/lib/search/documents';
import type { SearchResult } from '@/lib/search/engine';
import { createHybridEngine, type HybridEngine, type HybridOptions } from '@/lib/search/hybrid';
import { loadVectorIndex, type VectorFile } from '@/lib/search/semantic';
import { createWorkerEmbedder, type DownloadProgress, type WorkerEmbedder } from '@/lib/search/worker-embedder';
import { formatYearMonth } from '@/lib/format-date';
import { STATUS_LABELS } from '@/lib/glossary/labels';
import { termPath, withBase } from '@/lib/paths';

type IndexState = 'idle' | 'loading' | 'ready' | 'error';
type Meaning = 'off' | 'loading' | 'ready' | 'unavailable';

const megabytes = (bytes: number) => (bytes / 1_000_000).toFixed(0);

/**
 * Search bar (`/` or Ctrl/⌘ K). Name matches are instant. The first time someone types, a small
 * embedding model downloads in a Web Worker so results can also match by meaning (BRD F4).
 */
export default function SearchCommand() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [indexState, setIndexState] = useState<IndexState>('idle');
	const [meaning, setMeaning] = useState<Meaning>('off');
	const [progress, setProgress] = useState<DownloadProgress | null>(null);

	const engine = useRef<HybridEngine | null>(null);
	const options = useRef<HybridOptions>({});
	const embedder = useRef<WorkerEmbedder | null>(null);

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

	// Load the name index (and chunk vectors, if the build produced them) the first time the palette opens.
	useEffect(() => {
		if (!open || indexState !== 'idle') return;
		setIndexState('loading');
		(async () => {
			try {
				const [docsResponse, vectorsResponse] = await Promise.all([fetch(withBase('search-index.json')), fetch(withBase('vectors.json'))]);
				if (!docsResponse.ok) throw new Error(String(docsResponse.status));
				const docs: SearchDocument[] = await docsResponse.json();
				if (vectorsResponse.ok) options.current.index = loadVectorIndex((await vectorsResponse.json()) as VectorFile);
				engine.current = await createHybridEngine(docs, options.current);
				setIndexState('ready');
			} catch {
				setIndexState('error');
			}
		})();
	}, [open, indexState]);

	// Start the model only when someone actually searches.
	useEffect(() => {
		if (indexState !== 'ready' || meaning !== 'off' || !query.trim()) return;
		if (!options.current.index || typeof WebAssembly === 'undefined') {
			setMeaning('unavailable');
			return;
		}
		setMeaning('loading');
		const started = createWorkerEmbedder(setProgress);
		embedder.current = started;
		started.ready
			.then(() => {
				options.current.embed = started.embed;
				setMeaning('ready');
			})
			.catch(() => setMeaning('unavailable'));
	}, [indexState, meaning, query]);

	useEffect(() => () => embedder.current?.dispose(), []);

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
