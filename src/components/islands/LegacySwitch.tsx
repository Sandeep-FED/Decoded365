import { useEffect, useId, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { PREF_KEYS, applyLegacy, readPref, writePref } from '@/lib/preferences';

/** Show or hide legacy and SharePoint Server-only terms in the A–Z list (BRD F19). Off by default. */
export default function LegacySwitch() {
	const id = useId();
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(readPref(PREF_KEYS.legacy) === 'show');
	}, []);

	return (
		<div className="flex items-center gap-2">
			<Switch
				id={id}
				checked={show}
				onCheckedChange={(checked) => {
					setShow(checked);
					applyLegacy(checked);
					writePref(PREF_KEYS.legacy, checked ? 'show' : 'hide');
				}}
			/>
			<label htmlFor={id} className="text-sm">
				Show legacy and Server-only terms
			</label>
		</div>
	);
}
