import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import {
    configs as tseConfig,
    parser as tseParser,
    plugin as tsePlugin,
} from "typescript-eslint";
import tsdocPlugin from "eslint-plugin-tsdoc";

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

const strict = tseConfig.strict.reduce(merge, {});
const stylistic = tseConfig.stylistic.reduce(merge, {});

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
        "@typescript-eslint": tsePlugin,
        vue: eslintPluginVue,
        prettier: eslintPluginPrettier,
        tsdoc: tsdocPlugin,
    },

    rules: {
        ...strict.rules,
        ...stylistic.rules,

        /* Disabled as it is better to let typescript deal with this. For
         * instance, ESLint cannot detect when exhaustive checks are made and
         * the rest of the function is dead thus yielding false positives */
        "consistent-return": "off",

        /* prefer T[] for simple types, Array<T> for complex types (unions, etc) */
        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

        /* require all regular functions and methods to explicitly declare
         * return value type */
        "@typescript-eslint/explicit-function-return-type": [
            "error",
            {
                allowExpressions: true,
                allowHigherOrderFunctions: true,
                allowTypedFunctionExpressions: true,
            },
        ],

        /* require all members to specify "public", "private", etc */
        "@typescript-eslint/explicit-member-accessibility": "error",

        /* replace base max-params rule with @typescript-eslint/max-params */
        "max-params": "off",
        "@typescript-eslint/max-params": ["error", { max: 5 }],

        /* allow "const foo: number = 0" */
        "@typescript-eslint/no-inferrable-types": "off",

        /* allow function(this: void, ...) */
        "@typescript-eslint/no-invalid-void-type": [
            "error",
            {
                allowAsThisParameter: true,
            },
        ],

        /* allow constructs such as `unknown | null`, while `unknown` does override
         * `null` it can still serve as a self-documenting type to signal that
         * `null` has a special meaning. It also helps when the type is to be
         * replaced with a better type later. */
        "@typescript-eslint/no-redundant-type-constituents": "off",

        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                /* allow `foo` to be unused when `{ foo, ...spread} = bar` is
                 * used to extract members from objects */
                ignoreRestSiblings: true,

                /* allow _ as prefix for intentionally unused variables */
                argsIgnorePattern: "^_",
            },
        ],

        /* allow overloading only if the parameters have different names */
        "@typescript-eslint/unified-signatures": [
            "error",
            {
                ignoreDifferentlyNamedParameters: true,
            },
        ],

        ...recommended.rules,
        ...eslintConfigPrettier.rules,
        ...eslintPluginPrettier.configs.recommended.rules,

        curly: "error" /* disabled by prettier/recommended, reenabled again */,

        "@typescript-eslint/no-object-literal-type-assertion": ["off"],

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
