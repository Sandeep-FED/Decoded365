import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LEVELS, LEVEL_LABELS, type Level } from '@/lib/content/levels';
import { PREF_KEYS, applyLevel, readPref, writePref } from '@/lib/preferences';

const isLevel = (value: string | null): value is Level => !!value && (LEVELS as readonly string[]).includes(value);

/** Beginner / Maker / Architect switch; remembers the choice on this device (UC-1). */
export default function LevelSwitch() {
	const [level, setLevel] = useState<Level>('beginner');

	useEffect(() => {
		const stored = readPref(PREF_KEYS.level);
		const initial = isLevel(stored) ? stored : 'beginner';
		setLevel(initial);
		applyLevel(initial);
	}, []);

	return (
		<ToggleGroup
			type="single"
			value={level}
			aria-label="Explanation level"
			onValueChange={(value) => {
				if (!isLevel(value)) return; // clicking the active item would deselect it
				setLevel(value);
				applyLevel(value);
				writePref(PREF_KEYS.level, value);
			}}
		>
			{LEVELS.map((l) => (
				<ToggleGroupItem key={l} value={l}>
					{LEVEL_LABELS[l]}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
