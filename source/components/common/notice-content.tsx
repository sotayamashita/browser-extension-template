import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NoticeContentProps {
	text: string;
	onChange: (text: string) => void;
}

export function NoticeContent({ text, onChange }: NoticeContentProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Notice Content</h3>
			<div className="space-y-2">
				<Label htmlFor="notice-text">Text</Label>
				<Input
					id="notice-text"
					type="text"
					name="text"
					value={text}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		</div>
	);
}
