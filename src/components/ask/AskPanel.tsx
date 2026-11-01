import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SendIcon, SquareIcon } from 'lucide-react';
import AnswerView from './AnswerView';
import ConsentCard from './ConsentCard';
import FallbackEntries from './FallbackEntries';
import FeedbackButtons from './FeedbackButtons';
import NotCovered from './NotCovered';
import { useHybridSearch } from '@/components/hooks/use-hybrid-search';
import LevelSwitch from '@/components/islands/LevelSwitch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/sonner';
import { REASON_TEXT, checkOnDeviceModel } from '@/lib/ask/capabilities';
import { drawsOn } from '@/lib/ask/attribution';
import { citedIds } from '@/lib/ask/citations';
import { isModelCached, startAskEngine, type AskEngine } from '@/lib/ask/engine-client';
import { fallbackAnswer, type FallbackItem } from '@/lib/ask/fallback';
import { buildMessages } from '@/lib/ask/prompt';
import { retrieveEntries, type AskEntry } from '@/lib/ask/retrieval';
import { checkScope } from '@/lib/ask/scope';
import { LEVELS, type Level } from '@/lib/content/levels';
import { AVAILABLE_PRODUCTS } from '@/lib/glossary/labels';
import { PREF_KEYS, readPref } from '@/lib/preferences';
import { termPath, withBase } from '@/lib/paths';

type Phase = 'idle' | 'retrieving' | 'needs-consent' | 'loading-model' | 'generating';
type Result =
	| { kind: 'not-covered'; message: string }
	| { kind: 'entries'; items: FallbackItem[]; note?: string }
	| { kind: 'answer'; text: string; grounded: boolean; inferred: string[]; items: FallbackItem[] };

const EXAMPLES = ['Can I still use SharePoint Add-ins in SharePoint Online?', 'Where do deleted files go?', 'What is the difference between a team site and a communication site?'];

const currentLevel = (): Level => {
	const stored = readPref(PREF_KEYS.level);
	return (LEVELS as readonly string[]).includes(stored ?? '') ? (stored as Level) : 'beginner';
};

/** Ask in plain English, answered on the device from glossary entries only (BRD F10, UC-3). */
export default function AskPanel() {
	const { engine, indexState, startMeaning } = useHybridSearch(true);
	const [entries, setEntries] = useState<AskEntry[]>([]);
	const [question, setQuestion] = useState('');
	const [asked, setAsked] = useState('');
	const [phase, setPhase] = useState<Phase>('idle');
	const [result, setResult] = useState<Result | null>(null);
	const [streamed, setStreamed] = useState('');
	const [downloadPercent, setDownloadPercent] = useState(0);

	const askEngine = useRef<AskEngine | null>(null);
	const abort = useRef<AbortController | null>(null);
	const pending = useRef<{ question: string; entries: AskEntry[] } | null>(null);
	const autoAsked = useRef(false);

	const terms = useMemo(() => new Map(entries.map((e) => [e.id, e.term])), [entries]);

	useEffect(() => {
		fetch(withBase('glossary.json'))
			.then((r) => r.json())
			.then((data: { terms: (Omit<AskEntry, 'levels'> & { levels: AskEntry['levels'] })[] }) => setEntries(data.terms));
		return () => askEngine.current?.dispose();
	}, []);

	const showEntries = useCallback((q: string, found: AskEntry[], note?: string) => {
		setResult({ kind: 'entries', items: fallbackAnswer(found, currentLevel()), note });
		setPhase('idle');
	}, []);

	const generate = useCallback(
		async (q: string, found: AskEntry[]) => {
			try {
				if (!askEngine.current) {
					setPhase('loading-model');
					askEngine.current = await startAskEngine((report) => setDownloadPercent(Math.round(report.progress * 100)));
				}
				setPhase('generating');
				setStreamed('');
				abort.current = new AbortController();
				const text = await askEngine.current.generate(buildMessages(q, currentLevel(), found), setStreamed, abort.current.signal);
				const known = new Set(found.map((e) => e.id));
				const cited = citedIds(text, known).length > 0;
				// Small models sometimes skip the citations; fall back to the entries whose wording the answer reuses.
				const inferred = cited ? [] : drawsOn(text, found);
				setResult({ kind: 'answer', text, grounded: cited || inferred.length > 0, inferred, items: fallbackAnswer(found, currentLevel()) });
			} catch {
				showEntries(q, found, 'The on-device model could not run here, so these are the best-matching entries instead.');
			} finally {
				setPhase('idle');
			}
		},
		[showEntries],
	);

	const submit = useCallback(
		async (raw: string) => {
			const q = raw.trim();
			if (!q || !engine.current) return;
			setAsked(q);
			setResult(null);
			setStreamed('');

			const scope = checkScope(q, AVAILABLE_PRODUCTS);
			if (scope) return setResult({ kind: 'not-covered', message: scope.message });

			setPhase('retrieving');
			await startMeaning(); // best effort: keyword-only if the model can't start
			const found = await retrieveEntries(q, entries, async (query, limit) => (await engine.current!.search(query, limit)).map((r) => r.doc.id));
			if (found.length === 0) {
				setPhase('idle');
				return setResult({ kind: 'not-covered', message: 'The glossary has no entries about this yet. Try different words, or browse A–Z.' });
			}

			const capability = await checkOnDeviceModel(navigator);
			if (!capability.ok) return showEntries(q, found, REASON_TEXT[capability.reason]);

			if (!askEngine.current && !(await isModelCached())) {
				pending.current = { question: q, entries: found };
				return setPhase('needs-consent');
			}
			await generate(q, found);
		},
		[engine, entries, generate, showEntries, startMeaning],
	);

	// A question in the address (`/ask/?q=…`, e.g. from the search palette) is asked once the index is ready.
	useEffect(() => {
		if (autoAsked.current || indexState !== 'ready' || entries.length === 0) return;
		const q = new URLSearchParams(location.search).get('q');
		autoAsked.current = true;
		if (q) {
			setQuestion(q);
			void submit(q);
		}
	}, [indexState, entries, submit]);

	const busy = phase === 'retrieving' || phase === 'loading-model' || phase === 'generating';
	const ready = indexState === 'ready' && entries.length > 0;

	return (
		<div className="space-y-6">
			<Toaster />
			<div className="flex flex-wrap items-center gap-3">
				<span className="text-sm text-muted-foreground">Answer at</span>
				<LevelSwitch />
			</div>

			<form
				className="space-y-3"
				onSubmit={(e) => {
					e.preventDefault();
					void submit(question);
				}}
			>
				<label htmlFor="ask-question" className="sr-only">
					Your question
				</label>
				<Textarea
					id="ask-question"
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							void submit(question);
						}
					}}
					placeholder="Ask a question about SharePoint terms…"
					disabled={busy}
				/>
				<div className="flex flex-wrap items-center gap-2">
					{phase === 'generating' ? (
						<Button type="button" variant="outline" onClick={() => abort.current?.abort()}>
							<SquareIcon /> Stop
						</Button>
					) : (
						<Button type="submit" disabled={!ready || busy || !question.trim()}>
							<SendIcon /> Ask
						</Button>
					)}
					{!ready && indexState !== 'error' && <span className="text-sm text-muted-foreground">Loading the glossary…</span>}
				</div>
				{!asked && (
					<ul className="flex flex-wrap gap-2" aria-label="Example questions">
						{EXAMPLES.map((example) => (
							<li key={example}>
								<Button type="button" variant="outline" size="sm" className="h-auto whitespace-normal rounded-full py-1.5 text-left" disabled={!ready} onClick={() => { setQuestion(example); void submit(example); }}>
									{example}
								</Button>
							</li>
						))}
					</ul>
				)}
			</form>

			{indexState === 'error' && (
				<Alert variant="destructive">
					<AlertTitle>The glossary could not load</AlertTitle>
					<AlertDescription>Try again later, or browse the A–Z list.</AlertDescription>
				</Alert>
			)}

			<div aria-live="polite" className="space-y-4">
				{phase === 'retrieving' && <p className="text-sm text-muted-foreground">Finding the right entries…</p>}

				{phase === 'needs-consent' && (
					<ConsentCard
						onAccept={() => pending.current && void generate(pending.current.question, pending.current.entries)}
						onDecline={() => pending.current && showEntries(pending.current.question, pending.current.entries)}
					/>
				)}

				{phase === 'loading-model' && (
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">Downloading the model (first time only)… {downloadPercent}%</p>
						<Progress value={downloadPercent} aria-label="Model download progress" />
					</div>
				)}

				{phase === 'generating' && <AnswerView text={streamed} terms={terms} streaming />}

				{phase === 'idle' && result?.kind === 'not-covered' && <NotCovered message={result.message} />}

				{phase === 'idle' && result?.kind === 'entries' && (
					<div className="space-y-3">
						{result.note && <p className="text-sm text-muted-foreground">{result.note}</p>}
						<FallbackEntries items={result.items} />
					</div>
				)}

				{phase === 'idle' && result?.kind === 'answer' && (
					<div className="space-y-4">
						<AnswerView text={result.text} terms={terms} streaming={false} />
						{result.inferred.length > 0 && (
							<p className="text-sm text-muted-foreground" data-testid="draws-on">
								The model did not cite its sources, so these are the entries whose wording the answer draws on:{' '}
								{result.inferred.map((id, i) => (
									<span key={id}>
										{i > 0 && ', '}
										<a href={termPath(id)} data-term-id={id} className="font-medium text-foreground underline underline-offset-4">
											{terms.get(id)}
										</a>
									</span>
								))}
								.
							</p>
						)}
						{!result.grounded && (
							<Alert variant="warning">
								<AlertTitle>This answer cites no glossary entry</AlertTitle>
								<AlertDescription>Treat it with care and check the entries below.</AlertDescription>
							</Alert>
						)}
						<FeedbackButtons question={asked} answer={result.text} />
						<div className="space-y-2">
							<h2 className="text-sm font-medium">Entries used</h2>
							<FallbackEntries items={result.items} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
