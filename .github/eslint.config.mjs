import defaultConfig from "./packages/eslint-config/flat.mjs";
import cliConfig from "./packages/eslint-config-cli/flat.mjs";
import cypressConfig from "./packages/eslint-config-cypress/flat.mjs";
import jestConfig from "./packages/eslint-config-jest/flat.mjs";
import svelteConfig from "./packages/eslint-config-svelte/flat.mjs";
import typescriptConfig from "./packages/eslint-config-typescript/flat.mjs";
import vueConfig from "./packages/eslint-config-vue/flat.mjs";

export default [
    {
        name: "Ignored files",
        ignores: [
            "**/coverage/**",
            "**/dist/**",
            "**/node_modules/**",
            "**/temp/**",
        ],
    },

    ...defaultConfig,

    cliConfig({
        files: ["packages/eslint-config-cli/example.js"],
    }),
    typescriptConfig(),
    vueConfig(),
    jestConfig(),
    cypressConfig(),
    svelteConfig(),

    {
        name: "local",
        rules: {
            /* cannot be tester easily in examples (as the files doesn't exist) */
            "import/no-unresolved": "off",
        },
    },
];
