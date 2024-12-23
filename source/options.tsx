import "webext-base-css";
import "@/options.css";
import optionsStorage from "@/options-storage";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function OptionsPage() {
	const [colors, setColors] = useState({
		colorRed: "0",
		colorGreen: "0",
		colorBlue: "0",
	});
	const [text, setText] = useState("");

	useEffect(() => {
		// Sync form with storage on component mount
		optionsStorage.getAll().then((options) => {
			setColors({
				colorRed: options.colorRed?.toString() || "0",
				colorGreen: options.colorGreen?.toString() || "0",
				colorBlue: options.colorBlue?.toString() || "0",
			});
			setText(options.text || "");
		});
	}, []);

	// Update storage when values change
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

	const handleColorChange =
		(color: keyof typeof colors) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setColors((prev) => ({ ...prev, [color]: value }));
		};

	return (
		<form id="options-form" className="detail-view-container">
			<h3>Color Picker</h3>
			<div className="color-picker">
				<div className="color-inputs">
					{(["Red", "Green", "Blue"] as const).map((color) => (
						<label key={color} className="color-input">
							<span>{color[0]}</span>
							<input
								type="range"
								min="0"
								max="255"
								name={`color${color}`}
								value={colors[`color${color}` as keyof typeof colors]}
								onChange={handleColorChange(
									`color${color}` as keyof typeof colors,
								)}
							/>
							<input
								type="number"
								min="0"
								max="255"
								name={`color${color}`}
								value={colors[`color${color}` as keyof typeof colors]}
								onChange={handleColorChange(
									`color${color}` as keyof typeof colors,
								)}
							/>
						</label>
					))}
				</div>
				<div
					className="color-output"
					style={{
						backgroundColor: `rgb(${colors.colorRed}, ${colors.colorGreen}, ${colors.colorBlue})`,
					}}
				/>
			</div>
			<h3>Notice Content</h3>
			<div className="text-inputs">
				<label className="text-input">
					<span>Text</span>
					<input
						type="text"
						name="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</label>
			</div>
		</form>
	);
}

// Initialize React
const root = createRoot(document.getElementById("root")!);
root.render(<OptionsPage />);
