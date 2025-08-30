import globals from "globals";

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

/**
 * @param {Config} result
 * @param {Config} it
 * @returns {Config}
 */
function merge(result, it) {
    const merged = { ...result };
    if (it.files) {
        merged.files = it.files;
    }
    if (it.ignores) {
        merged.ignores = it.ignores;
    }
    return merged;
}

const config = defineConfig({
    name: "@forsakringskassan/eslint-config-cli",
    files: ["*.{js,ts,cjs,mjs}", "**/scripts/*.{js,ts,cjs,mjs}"],
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
    rules: {
        "no-console": "off",
    },
});

/**
 * @param {Config} [override]
 * @returns {Config}
 */
export default (override) => merge(config, override ?? {});
