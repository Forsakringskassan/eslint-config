import angularConfig from "eslint-config-angular";
import angularPlugin from "eslint-plugin-angular";
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
    return {
        ...result,
        ...it,
        languageOptions: { ...result.languageOptions, ...it.languageOptions },
        plugins: { ...result.plugins, ...it.plugins },
        rules: { ...result.rules, ...it.rules },
    };
}

const config = defineConfig({
    name: "@forsakringskassan/eslint-config-angular",
    files: ["**/*.[jt]s"],
    languageOptions: {
        globals: {
            ...globals.angular,
        },
    },
    plugins: {
        angular: angularPlugin,
    },
    rules: {
        ...angularConfig.rules,
        "consistent-this": ["error", "$ctrl", "provider"],
        "angular/component-name": ["error", "/^(exp|fk)[A-Z].*/"],
        "angular/controller-as-vm": ["error", "$ctrl"],
        "angular/di-unused": "error",
        "angular/directive-name": ["error", "/^(exp|fk)[A-Z].*/"],
    },
});

/**
 * @param {Config} [override]
 * @returns {Config}
 */
export default (override) => merge(config, override ?? {});
