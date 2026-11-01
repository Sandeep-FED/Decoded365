import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SITE } from '@/config/site';
import { askFeedbackUrl } from '@/lib/contribute/issue-links';

interface Props {
	question: string;
	answer: string;
}

/** Feedback without tracking: a thumbs-down opens a prefilled issue that the visitor can edit or discard. */
export default function FeedbackButtons({ question, answer }: Props) {
	return (
		<div className="flex items-center gap-1" role="group" aria-label="Was this answer helpful?">
			<Button variant="ghost" size="icon" aria-label="Helpful" onClick={() => toast.success('Glad it helped. Nothing was recorded.')}>
				<ThumbsUpIcon />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Not helpful"
				onClick={() => {
					toast('Opening a pre-filled issue. Nothing is sent until you submit it.');
					window.open(askFeedbackUrl(SITE.repoUrl, { question, answer, helpful: false }), '_blank', 'noopener');
				}}
			>
				<ThumbsDownIcon />
			</Button>
		</div>
	);
}
