export type LicenceStatus = 'open' | 'pending';

/** Whether a source's licence is confirmed open, or still to be confirmed (BRD 8.6 / open question 8). */
export function licenceStatus(licence: string): LicenceStatus {
	return /to be confirmed|not stated|unknown/i.test(licence) ? 'pending' : 'open';
}
