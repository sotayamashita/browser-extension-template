import "@/global.css";
import optionsStorage from "@/options-storage";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ColorPicker } from "@/components/common/color-picker";
import { NoticeContent } from "@/components/common/notice-content";

function OptionsPage() {
	const [colors, setColors] = useState({
		colorRed: "0",
		colorGreen: "0",
		colorBlue: "0",
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

	useEffect(() => {
		optionsStorage.set({
			colorRed: Number(colors.colorRed),
			colorGreen: Number(colors.colorGreen),
			colorBlue: Number(colors.colorBlue),
		});
	}, [colors]);

	useEffect(() => {
		optionsStorage.set({ text });
	}, [text]);

	return (
		<div className="container mx-auto max-w-2xl p-4">
			<div className="space-y-0.5">
				<h1 className="text-2xl font-bold tracking-tight">Extension Options</h1>
			</div>
			<div
				data-orientation="horizontal"
				role="none"
				className="my-6 h-px w-full shrink-0 bg-border"
			></div>
			<form id="options-form" className="space-y-6">
				<ColorPicker
					colors={colors}
					onColorChange={(color, value) =>
						setColors((prev) => ({ ...prev, [color]: value }))
					}
				/>
				<NoticeContent text={text} onChange={setText} />
			</form>
		</div>
	);
}

// Initialize React
const root = createRoot(document.getElementById("root")!);
root.render(<OptionsPage />);
