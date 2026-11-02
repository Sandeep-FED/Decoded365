import { PRODUCT_LABELS, STATUS_LABELS } from '@/lib/glossary/labels';
import { withBase } from '@/lib/paths';

interface Preview {
	term: string;
	product: keyof typeof PRODUCT_LABELS;
	status: keyof typeof STATUS_LABELS;
	summary: string;
}

const LINKS = '.entry-prose a[href*="/terms/"]';
const TERM_ID = /\/terms\/([a-z0-9-]+)\/?$/;
const SHOW_DELAY = 250;

let previews: Promise<Record<string, Preview>> | undefined;
const loadPreviews = () => (previews ??= fetch(withBase('previews.json')).then((r) => (r.ok ? r.json() : Promise.reject(r.status))));

/**
 * Hover (or keyboard focus) a link to another term to read its plain-words summary without leaving the page.
 * Links stay ordinary links, so this is an extra: nothing changes without JavaScript or on touch screens.
 */
export function initLinkPreviews(): () => void {
	if (!document.querySelector(LINKS) || matchMedia('(hover: none)').matches) return () => {};

	const card = document.createElement('div');
	card.id = 'term-preview';
	card.role = 'tooltip';
	card.hidden = true;
	card.className = 'pointer-events-none absolute z-50 w-72 space-y-1 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg';
	document.body.append(card);

	let timer: number | undefined;
	let current: HTMLAnchorElement | null = null;

	const hide = () => {
		window.clearTimeout(timer);
		card.hidden = true;
		current?.removeAttribute('aria-describedby');
		current = null;
	};

	const show = async (link: HTMLAnchorElement) => {
		const id = TERM_ID.exec(new URL(link.href).pathname)?.[1];
		if (!id) return;
		let data: Record<string, Preview>;
		try {
			data = await loadPreviews();
		} catch {
			return; // the link still works; the preview is optional
		}
		const preview = data[id];
		if (!preview || current !== link) return; // the pointer may have moved on while the data loaded

		card.replaceChildren();
		const title = document.createElement('p');
		title.className = 'font-medium';
		title.textContent = preview.term;
		const meta = document.createElement('p');
		meta.className = 'text-xs text-muted-foreground';
		meta.textContent = `${PRODUCT_LABELS[preview.product]} · ${STATUS_LABELS[preview.status]}`;
		const body = document.createElement('p');
		body.textContent = preview.summary;
		card.append(title, meta, body);

		const rect = link.getBoundingClientRect();
		const width = 288;
		const left = Math.min(Math.max(8, rect.left + window.scrollX), window.scrollX + document.documentElement.clientWidth - width - 8);
		card.style.left = `${left}px`;
		card.style.top = `${rect.bottom + window.scrollY + 6}px`;
		card.hidden = false;
		link.setAttribute('aria-describedby', card.id);
	};

	const start = (link: HTMLAnchorElement) => {
		hide();
		current = link;
		timer = window.setTimeout(() => void show(link), SHOW_DELAY);
	};

	const links = [...document.querySelectorAll<HTMLAnchorElement>(LINKS)];
	const handlers = links.map((link) => {
		const onStart = () => start(link);
		link.addEventListener('mouseenter', onStart);
		link.addEventListener('focus', onStart);
		link.addEventListener('mouseleave', hide);
		link.addEventListener('blur', hide);
		return { link, onStart };
	});
	const onKey = (event: KeyboardEvent) => event.key === 'Escape' && hide();
	document.addEventListener('keydown', onKey);
	window.addEventListener('scroll', hide, { passive: true });

	return () => {
		hide();
		for (const { link, onStart } of handlers) {
			link.removeEventListener('mouseenter', onStart);
			link.removeEventListener('focus', onStart);
			link.removeEventListener('mouseleave', hide);
			link.removeEventListener('blur', hide);
		}
		document.removeEventListener('keydown', onKey);
		window.removeEventListener('scroll', hide);
		card.remove();
	};
}
