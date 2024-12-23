import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
	},
	{
		ignores: ["distribution"],
	},
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.webextensions,
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	reactPlugin.configs.flat.recommended,
	eslintConfigPrettier,
];
