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
    if (!ruleset.languageOptions) {
        continue;
    }
    delete ruleset.languageOptions.ecmaVersion;
    delete ruleset.languageOptions.sourceType;
    if (Object.keys(ruleset.languageOptions).length === 0) {
        delete ruleset.languageOptions;
    }
}

export default [
    ...migrated,
    {
        name: "@forsakringskassan/eslint-config/ecma-version",
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
        },
    },
    {
        /* ensure cjs and mjs files are linted too */
        name: "@forsakringskassan/eslint-config/extensions",
        files: ["**/*.cjs", "**/*.mjs"],
    },
    {
        /* mjs requires file extension */
        name: "@forsakringskassan/eslint-config/esm",
        files: ["**/*.mjs"],
        rules: {
            "import/extensions": ["error", "always"],
        },
    },
];
