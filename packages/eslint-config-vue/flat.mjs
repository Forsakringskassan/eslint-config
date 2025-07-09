import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginVue from "eslint-plugin-vue";
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";
import deepmerge from "deepmerge";

function flatten(result, it) {
    return {
        ...result,
        ...it,
        languageOptions: deepmerge(
            result.languageOptions ?? {},
            it.languageOptions ?? {},
        ),
        plugins: {
            ...result.plugins,
            ...it.plugins,
        },
        rules: {
            ...result.rules,
            ...it.rules,
        },
    };
}

function filterRules(rules, predicate) {
    return Object.fromEntries(
        Object.entries(rules).filter(([key]) => predicate(key)),
    );
}

const config = defineConfigWithVueTs(
    eslintPluginVue.configs["flat/recommended"],
    vueTsConfigs.strict,
    vueTsConfigs.stylistic,
    vueTsConfigs.disableTypeChecked,
    {
        rules: filterRules(eslintConfigPrettier.rules, (rule) =>
            rule.startsWith("vue/"),
        ),
    },
    {
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    /* this is set globally somewhere but something in Vue chokes on
                     * this an starts reporting everything as unused variables when
                     * enabled */
                    globalReturn: false,
                },
            },
        },
    },
    {
        rules: {
            /* Disabled as it is better to let typescript deal with this. For
             * instance, ESLint cannot detect when exhaustive checks are made and
             * the rest of the function is dead thus yielding false positives */
            "consistent-return": "off",

            /* prefer T[] for simple types, Array<T> for complex types (unions, etc) */
            "@typescript-eslint/array-type": [
                "error",
                { default: "array-simple" },
            ],

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

            /* documentation for vue components does not adhere with tsdoc syntax */
            "tsdoc/syntax": "off",

            /* this rule warns about the order of the top-level tags */
            "vue/block-order": [
                "error",
                {
                    order: ["script", "template", "style"],
                },
            ],
        },
    },
).reduce(flatten, {});

config.name = "@forsakringskassan/eslint-config-vue";
config.files = ["**/*.vue"];


export default config;
