import { InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/** Shown when the glossary does not cover the question (BRD UC-3). */
export default function NotCovered({ message }: { message: string }) {
	return (
		<Alert variant="warning">
			<InfoIcon aria-hidden="true" />
			<AlertTitle>Not covered by the glossary</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
}
