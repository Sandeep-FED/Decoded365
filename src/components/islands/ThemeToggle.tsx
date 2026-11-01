import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PREF_KEYS, applyTheme, writePref, type Theme } from '@/lib/preferences';

const OPTIONS: { value: Theme; label: string }[] = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'system', label: 'System' },
];

export default function ThemeToggle() {
	const choose = (theme: Theme) => {
		applyTheme(theme);
		writePref(PREF_KEYS.theme, theme);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" aria-label="Change theme">
					<SunIcon className="dark:hidden" />
					<MoonIcon className="hidden dark:block" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{OPTIONS.map((o) => (
					<DropdownMenuItem key={o.value} onSelect={() => choose(o.value)}>
						{o.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
