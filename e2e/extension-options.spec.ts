import { test, expect } from "./extention-fixtures";
import { defaultOptions } from "@/option-default";

test.describe("Chrome Extension Options Page", () => {
	test.beforeEach(async ({ page, extensionId, optionsPage }) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);
	});

	test("should display the popup title", async ({ page }) => {
		const title = page.locator("h1");
		await expect(title).toHaveText("Extension Options");
	});

	test("should have default color values", async ({ page }) => {
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
	});

	test("should have default text value", async ({ page }) => {
		const textInput = page.locator('input[type="text"][name="text"]');
		await expect(textInput).toHaveValue(defaultOptions.text);
	});

	test("should persist values after reload", async ({ page }) => {
		const testValues = {
			colorRed: "0",
			colorGreen: "0",
			colorBlue: "0",
			text: "Persistence test",
		};

		// Magic number
		await page.waitForTimeout(2000);

		// Update all input values
		for (const [name, value] of Object.entries(testValues)) {
			const input = page.locator(`input[name="${name}"]`);
			await input.fill(value);
			// Wait for storage to be updated
			await page.waitForTimeout(2000);
		}

		// Reload the page to see the changes
		await page.reload();

		// Verify all values persist after reload
		for (const [name, value] of Object.entries(testValues)) {
			const input = page.locator(`input[name="${name}"]`);
			await expect(input).toHaveValue(value);
		}
	});
});
