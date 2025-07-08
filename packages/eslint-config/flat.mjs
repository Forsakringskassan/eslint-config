import { fileURLToPath } from "node:url";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import legacyConfig from "./index.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
    recommendedConfig: js.configs.recommended,
});

const migrated = compat.config(legacyConfig);

for (const ruleset of migrated) {
    if (
        ruleset.languageOptions &&
        typeof ruleset.languageOptions.ecmaVersion === "string"
    ) {
        ruleset.languageOptions.ecmaVersion = parseInt(
            ruleset.languageOptions.ecmaVersion,
            10,
        );
    }
}

export default [
    ...migrated,
    {
        /* ensure cjs and mjs files are linted too */
        files: ["*.cjs", "*.mjs"],
    },
    {
        /* mjs requires file extension */
        files: ["*.mjs"],
        rules: {
            "import/extensions": ["error", "always"],
        },
    },
];
