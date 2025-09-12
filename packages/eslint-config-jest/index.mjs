import jestPlugin from "eslint-plugin-jest";

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
    return {
        ...result,
        ...it,
        languageOptions: { ...result.languageOptions, ...it.languageOptions },
        plugins: { ...result.plugins, ...it.plugins },
        rules: { ...result.rules, ...it.rules },
    };
}

const recommended = jestPlugin.configs["flat/recommended"];
const style = jestPlugin.configs["flat/style"];

const config = defineConfig({
    name: "@forsakringskassan/eslint-config-jest",
    files: ["**/*.spec.[jt]s"],
    ignores: ["cypress/**", "tests/e2e/**"],

    languageOptions: {
        globals: {
            ...recommended.languageOptions.globals,
        },
    },

    plugins: {
        jest: jestPlugin,
    },

    rules: {
        ...recommended.rules,
        ...style.rules,

        "@typescript-eslint/no-non-null-assertion": "off",
        "jest/consistent-test-it": ["error", { fn: "it" }],
        "jest/no-alias-methods": "error",
        "jest/no-disabled-tests": "warn",
        "jest/no-duplicate-hooks": "error",
        "jest/no-focused-tests": "warn",
        "jest/no-large-snapshots": [
            "error",
            { maxSize: 25, inlineMaxSize: 10 },
        ],
        "jest/no-test-prefixes": "warn",
        "jest/prefer-hooks-on-top": "error",
        "jest/prefer-todo": "error",

        /* jest uses @jest-* tags for per-file configuration */
        "tsdoc/syntax": "off",
    },
});

/**
 * @param {Config} [override]
 * @returns {Config}
 */
export default (override) => merge(config, override ?? {});
