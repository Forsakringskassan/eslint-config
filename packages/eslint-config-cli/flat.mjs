import globals from "globals";

/**
 * @param {import("eslint").Linter.Config} config
 * @returns {import("eslint").Linter.Config}
 */
function defineConfig(config) {
    return config;
}

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
 * @param {{ files?: string[], ignores?: string[]}} [override]
 */
export default (override) => merge(config, override ?? {});
