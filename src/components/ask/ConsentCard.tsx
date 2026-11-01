import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import models from '../../../config/models.json';

interface Props {
	onAccept: () => void;
	onDecline: () => void;
}

/** One-time download consent (BRD 8.4 step 1): what is downloaded, how big, from where, and that the question stays on the device. */
export default function ConsentCard({ onAccept, onDecline }: Props) {
	return (
		<Card className="bg-card/70 backdrop-blur-sm">
			<CardHeader>
				<CardTitle>One-time download</CardTitle>
				<CardDescription>Ask runs a small open language model on your device.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 text-sm">
				<ul className="list-disc space-y-1 pl-5 text-muted-foreground">
					<li>
						Model: <span className="text-foreground">{models.chat.id.replace('-q4f16_1-MLC', '')}</span> ({models.chat.licence}).
					</li>
					<li>
						Size: about <span className="text-foreground">{models.chat.downloadMB} MB</span>, then kept in your browser. It needs about {(models.chat.vramMB / 1000).toFixed(1)} GB of graphics memory.
					</li>
					<li>The files come from Hugging Face and GitHub. Your question is never sent anywhere; it is answered on this device.</li>
				</ul>
				<div className="flex flex-wrap gap-2">
					<Button onClick={onAccept}>
						<DownloadIcon /> Download and ask
					</Button>
					<Button variant="outline" onClick={onDecline}>
						Just show matching entries
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
