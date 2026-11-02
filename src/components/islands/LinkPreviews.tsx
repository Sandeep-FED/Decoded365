import { useEffect } from 'react';
import { initLinkPreviews } from '@/scripts/link-previews';

/** Adds hover previews to links between terms. Renders nothing itself. */
export default function LinkPreviews() {
	useEffect(() => initLinkPreviews(), []);
	return null;
}
