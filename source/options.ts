import "webext-base-css";
import "@/options.css";
import optionsStorage from "@/options-storage";

async function init() {
	await optionsStorage.syncForm("#options-form");

	const rangeInputs = [
		...document.querySelectorAll<HTMLInputElement>(
			'input[type="range"][name^="color"]',
		),
	];
	const numberInputs = [
		...document.querySelectorAll<HTMLInputElement>(
			'input[type="number"][name^="color"]',
		),
	];
	const output = document.querySelector(".color-output") as HTMLElement;
	if (!output) return;

	function updateOutputColor() {
		output.style.backgroundColor = `rgb(${rangeInputs[0].value}, ${rangeInputs[1].value}, ${rangeInputs[2].value})`;
	}

	for (const input of rangeInputs) {
		input.addEventListener("input", (event) => {
			const target = event.currentTarget as HTMLInputElement;
			numberInputs[rangeInputs.indexOf(input)].value = target.value;
			updateOutputColor();
		});
	}

	for (const input of numberInputs) {
		input.addEventListener("input", (event) => {
			const target = event.currentTarget as HTMLInputElement;
			rangeInputs[numberInputs.indexOf(input)].value = target.value;
			updateOutputColor();
		});
	}
}

init();
