import { fileURLToPath } from "node:url";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import legacyConfig from "./index.cjs";

/**
 * @typedef {import("eslint").Linter.Config} Config
 */

/**
 * @param {Config} config
 * @returns {Config}
 */
function defineConfig(config) {
    return config;
}

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

    defineConfig({
        name: "@forsakringskassan/eslint-config/ecma-version",
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: "module",
        },
    }),

    defineConfig({
        /* ensure cjs and mjs files are linted too */
        name: "@forsakringskassan/eslint-config/extensions",
        files: ["**/*.cjs", "**/*.mjs"],
    }),

    defineConfig({
        /* mjs requires file extension */
        name: "@forsakringskassan/eslint-config/esm",
        files: ["**/*.mjs"],
        rules: {
            "import/extensions": ["error", "always"],
        },
    }),
];
