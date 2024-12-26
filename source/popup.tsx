import "@/global.css";
import optionsStorage from "@/options-storage";
import { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { ColorPicker } from "@/components/common/color-picker";
import { NoticeContent } from "@/components/common/notice-content";

function PopupPage() {
	const [colors, setColors] = useState({
		colorRed: "255",
		colorGreen: "255",
		colorBlue: "255",
	});
	const [text, setText] = useState("");

	useEffect(() => {
		optionsStorage.getAll().then((options) => {
			setColors({
				colorRed: options.colorRed?.toString() || "0",
				colorGreen: options.colorGreen?.toString() || "0",
				colorBlue: options.colorBlue?.toString() || "0",
			});
			setText(options.text || "");
		});
	}, []);

	const saveOptions = useCallback(
		async (updates: Partial<typeof colors & { text?: string }>) => {
			try {
				await optionsStorage.set(
					Object.fromEntries(
						Object.entries(updates).map(([key, value]) =>
							key.startsWith("color") ? [key, Number(value)] : [key, value],
						),
					),
				);
			} catch (error) {
				console.error("Failed to save options:", error);
			}
		},
		[],
	);

	const handleColorChange = useCallback(
		(color: string, value: string) => {
			setColors((prev) => {
				const newColors = { ...prev, [color]: value };
				void saveOptions(newColors);
				return newColors;
			});
		},
		[saveOptions],
	);

	const handleTextChange = useCallback(
		(newText: string) => {
			setText(newText);
			void saveOptions({ text: newText });
		},
		[saveOptions],
	);

	return (
		<div className="w-[500px] p-4">
			<div className="space-y-0.5">
				<h1 className="text-2xl font-bold tracking-tight">Extension Popup</h1>
				<p className="text-sm text-muted-foreground">
					Note: required to reload the page to see the changes.
				</p>
			</div>
			<div
				data-orientation="horizontal"
				role="none"
				className="my-4 h-px w-full shrink-0 bg-border"
			></div>
			<form id="popup-form" className="space-y-6">
				<ColorPicker colors={colors} onColorChange={handleColorChange} />
				<NoticeContent text={text} onChange={handleTextChange} />
			</form>
		</div>
	);
}

// Initialize React
const root = createRoot(document.getElementById("root")!);
root.render(<PopupPage />);
