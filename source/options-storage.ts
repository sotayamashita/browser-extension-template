import OptionsSync from "webext-options-sync";
import { defaultOptions as defaults } from "./option-default";

const optionsStorage = new OptionsSync({
	defaults,
	migrations: [OptionsSync.migrations.removeUnused],
	logging: true,
});

export default optionsStorage;
