import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["distribution"],
	},
	{
		languageOptions: {
			globals: {
				...globals.webextensions,
				...globals.browser,
			},
		},
	},
	pluginJs.configs.recommended,
	eslintConfigPrettier,
];
