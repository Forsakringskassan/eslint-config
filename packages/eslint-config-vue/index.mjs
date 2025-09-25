import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import { parser as tseParser } from "typescript-eslint";

/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
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

/**
 * @param {RulesRecord} rules
 * @param {(rule: string) => boolean} predicate
 * @returns {RulesRecord}
 */
function filterRules(rules, predicate) {
    return Object.fromEntries(
        Object.entries(rules).filter(([key]) => predicate(key)),
    );
}

const recommended = eslintPluginVue.configs["flat/recommended"].reduce(
    merge,
    {},
);

const config = defineConfig({
    name: "@forsakringskassan/eslint-config-vue",
    files: ["**/*.vue"],

    languageOptions: {
        parser: recommended.languageOptions.parser,
        parserOptions: {
            extraFileExtensions: [".svelte", ".vue"],
            parser: tseParser,
        },
        sourceType: "module",
        ecmaVersion: "latest",
        globals: {
            ...globals.browser,
        },
    },

    processor: eslintPluginVue.processors.vue,

    plugins: {
        vue: eslintPluginVue,
    },

    rules: {
        ...recommended.rules,
        ...filterRules(eslintConfigPrettier.rules, (rule) => {
            return rule.startsWith("vue/");
        }),

        "@typescript-eslint/no-object-literal-type-assertion": ["off"],

        "sonarjs/different-types-comparison": "off", // does not play well with vue

        /* documentation for vue components does not adhere with tsdoc syntax */
        "tsdoc/syntax": "off",

        /* this rule warns about the order of the top-level tags */
        "vue/block-order": [
            "error",
            {
                order: ["script", "template", "style"],
            },
        ],

        /* underlying custom elements have started to expose native slots */
        "vue/no-deprecated-slot-attribute": "off",
    },
});

/**
 * @param {Config} [override]
 * @returns {Config}
 */
export default (override) => merge(config, override ?? {});
