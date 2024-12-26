import { test, expect } from "./extention-fixtures";
import { defaultOptions } from "@/option-default";

test.describe("Chrome Extension Popup Page", () => {
	test.beforeEach(async ({ page, extensionId, popupPage }) => {
		await page.goto(`chrome-extension://${extensionId}/${popupPage}`);
	});

	test("should display the popup title", async ({ page }) => {
		const title = page.locator("h1");
		await expect(title).toHaveText("Extension Popup");
	});

	test("should have default color values", async ({ page }) => {
		const colorRedInput = page.locator('input[type="range"][name="colorRed"]');
		await expect(colorRedInput).toHaveValue(defaultOptions.colorRed.toString());

		const colorGreenInput = page.locator(
			'input[type="range"][name="colorGreen"]',
		);
		await expect(colorGreenInput).toHaveValue(
			defaultOptions.colorGreen.toString(),
		);

		const colorBlueInput = page.locator(
			'input[type="range"][name="colorBlue"]',
		);
		await expect(colorBlueInput).toHaveValue(
			defaultOptions.colorBlue.toString(),
		);
	});

	test("should have default text value", async ({ page }) => {
		const textInput = page.locator('input[type="text"][name="text"]');
		await expect(textInput).toHaveValue(defaultOptions.text);
	});

	test("should persist values after reload", async ({ page }) => {
		// Update values
		const colorRedInput = page.locator('input[type="range"][name="colorRed"]');
		const colorGreenInput = page.locator(
			'input[type="range"][name="colorGreen"]',
		);
		const colorBlueInput = page.locator(
			'input[type="range"][name="colorBlue"]',
		);
		const textInput = page.locator('input[type="text"][name="text"]');

		await colorRedInput.fill("200");
		await colorGreenInput.fill("150");
		await colorBlueInput.fill("100");
		await textInput.fill("Persistence test");

		// Reload the page to see the changes
		await page.reload();

		// Verify values persist
		await expect(colorRedInput).toHaveValue("200");
		await expect(colorGreenInput).toHaveValue("150");
		await expect(colorBlueInput).toHaveValue("100");
		await expect(textInput).toHaveValue("Persistence test");
	});
});
