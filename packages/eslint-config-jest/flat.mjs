import { fileURLToPath } from "node:url";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import legacyConfig from "./index.cjs";

/**
 * @typedef {import("eslint").Linter.Config} Config
 */

/**
 * @param {Config} result
 * @param {Config} it
 * @returns {Config}
 */
function merge(result, it) {
    return {
        ...result,
        ...it,
        languageOptions: { ...result.languageOptions, ...it.languageOptions },
        plugins: { ...result.plugins, ...it.plugins },
        rules: { ...result.rules, ...it.rules },
    };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

const migrated = compat.config(legacyConfig).reduce(merge, {});

migrated.name = "@forsakringskassan/eslint-config-jest";
migrated.files = ["**/*.spec.[jt]s"];
migrated.ignores = ["cypress/**", "tests/e2e/**"];

/**
 * @param {Config} [override]
 * @returns {Config}
 */
export default (override) => merge(migrated, override ?? {});
