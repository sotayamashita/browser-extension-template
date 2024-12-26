import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
	colors: {
		colorRed: string;
		colorGreen: string;
		colorBlue: string;
	};
	onColorChange: (
		color: "colorRed" | "colorGreen" | "colorBlue",
		value: string,
	) => void;
}

export function ColorPicker({ colors, onColorChange }: ColorPickerProps) {
	const handleSliderChange =
		(color: keyof typeof colors) => (value: number[]) => {
			onColorChange(color, value[0].toString());
		};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Color Picker</h3>
			<div className="space-y-4">
				{(["Red", "Green", "Blue"] as const).map((color) => (
					<div key={color} className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>{color}</Label>
							<Input
								type="number"
								name={`color${color}`}
								min="0"
								max="255"
								className="w-20"
								value={colors[`${color}` as keyof typeof colors]}
								onChange={(e) =>
									onColorChange(
										`color${color}` as keyof typeof colors,
										e.target.value,
									)
								}
							/>
						</div>
						<Slider
							min={0}
							max={255}
							step={1}
							value={[Number(colors[`color${color}` as keyof typeof colors])]}
							onValueChange={handleSliderChange(
								`color${color}` as keyof typeof colors,
							)}
						/>
					</div>
				))}
				<div
					className="mt-4 h-20 w-full rounded-md"
					style={{
						backgroundColor: `rgb(${colors.colorRed}, ${colors.colorGreen}, ${colors.colorBlue})`,
					}}
				/>
			</div>
		</div>
	);
}
