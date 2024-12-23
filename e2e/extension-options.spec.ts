import { test, expect } from "./extention-fixtures";

test.describe("Chrome Extension Options Page", () => {
	test("should update color picker values", async ({
		page,
		extensionId,
		optionsPage,
	}) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);

		// Expected values
		const expectedRedRange = 255;
		const expectedGreenRange = 128;
		const expectedBlueRange = 64;

		// Test range inputs
		const redRange = page.locator('input[type="range"][name="colorRed"]');
		const greenRange = page.locator('input[type="range"][name="colorGreen"]');
		const blueRange = page.locator('input[type="range"][name="colorBlue"]');

		await redRange.fill(expectedRedRange.toString());
		await greenRange.fill(expectedGreenRange.toString());
		await blueRange.fill(expectedBlueRange.toString());

		// Verify number inputs are synchronized
		await expect(
			page.locator('input[type="number"][name="colorRed"]'),
		).toHaveValue(expectedRedRange.toString());
		await expect(
			page.locator('input[type="number"][name="colorGreen"]'),
		).toHaveValue(expectedGreenRange.toString());
		await expect(
			page.locator('input[type="number"][name="colorBlue"]'),
		).toHaveValue(expectedBlueRange.toString());

		// Verify color output
		const colorOutput = page.locator(".color-output");
		await expect(colorOutput).toHaveCSS(
			"background-color",
			"rgb(255, 128, 64)",
		);
	});

	test("should update number input values", async ({
		page,
		extensionId,
		optionsPage,
	}) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);

		// Test number inputs
		const redNumber = page.locator('input[type="number"][name="colorRed"]');
		const greenNumber = page.locator('input[type="number"][name="colorGreen"]');
		const blueNumber = page.locator('input[type="number"][name="colorBlue"]');

		await redNumber.fill("128");
		await greenNumber.fill("64");
		await blueNumber.fill("32");

		// Verify range inputs are synchronized
		await expect(
			page.locator('input[type="range"][name="colorRed"]'),
		).toHaveValue("128");
		await expect(
			page.locator('input[type="range"][name="colorGreen"]'),
		).toHaveValue("64");
		await expect(
			page.locator('input[type="range"][name="colorBlue"]'),
		).toHaveValue("32");

		// Verify color output
		const colorOutput = page.locator(".color-output");
		await expect(colorOutput).toHaveCSS("background-color", "rgb(128, 64, 32)");
	});

	test("should handle text input", async ({
		page,
		extensionId,
		optionsPage,
	}) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);

		// Test text input
		const textInput = page.locator('input[type="text"][name="text"]');
		await textInput.fill("Test notice content");
		await expect(textInput).toHaveValue("Test notice content");
	});
});
