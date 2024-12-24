import { test, expect } from "./extention-fixtures";
import { defaultOptions } from "@/option-default";

test.describe("Chrome Extension Options Page", () => {
	test.beforeEach(async ({ page, extensionId, optionsPage }) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);
	});

	test("should have default input values", async ({ page }) => {
		const colorRedInput = page.locator('input[type="number"][name="colorRed"]');
		await expect(colorRedInput).toHaveValue(defaultOptions.colorRed.toString());

		const colorGreenInput = page.locator(
			'input[type="number"][name="colorGreen"]',
		);
		await expect(colorGreenInput).toHaveValue(
			defaultOptions.colorGreen.toString(),
		);

		const colorBlueInput = page.locator(
			'input[type="number"][name="colorBlue"]',
		);
		await expect(colorBlueInput).toHaveValue(
			defaultOptions.colorBlue.toString(),
		);

		const textInput = page.locator('input[type="text"][name="text"]');
		await expect(textInput).toHaveValue(defaultOptions.text);
	});

	test("should update color input values", async ({ page }) => {
		const colorRedInput = page.locator('input[type="number"][name="colorRed"]');
		await colorRedInput.fill("255");
		await expect(colorRedInput).toHaveValue("255");

		const colorGreenInput = page.locator(
			'input[type="number"][name="colorGreen"]',
		);
		await colorGreenInput.fill("255");
		await expect(colorGreenInput).toHaveValue("255");

		const colorBlueInput = page.locator(
			'input[type="number"][name="colorBlue"]',
		);
		await colorBlueInput.fill("255");
		await expect(colorBlueInput).toHaveValue("255");
	});

	test("should update text input value", async ({ page }) => {
		const textInput = page.locator('input[type="text"][name="text"]');
		await textInput.fill("Test notice content");
		await expect(textInput).toHaveValue("Test notice content");
	});
});
