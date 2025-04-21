import defaultConfig from "./packages/eslint-config/flat.mjs";
import typescriptConfig from "./packages/eslint-config-typescript/flat.mjs";
import vueConfig from "./packages/eslint-config-vue/flat.mjs";
import cliConfig from "./packages/eslint-config-cli/flat.mjs";
import jestConfig from "./packages/eslint-config-jest/flat.mjs";
import cypressConfig from "./packages/eslint-config-cypress/flat.mjs";
import svelteConfig from "./packages/eslint-config-svelte/flat.mjs";

export default [
    {
        name: "Ignored files",
        ignores: ["**/node_modules/**"],
    },

    ...defaultConfig,

    {
        name: "@forsakringskassan/eslint-config-typescript",
        files: ["**/*.ts"],
        ...typescriptConfig,
    },

    {
        name: "@forsakringskassan/eslint-config-vue",
        files: ["**/*.vue"],
        ...vueConfig,
    },

    {
        name: "@forsakringskassan/eslint-config-cli",
        files: ["packages/eslint-config-cli/*.[jt]s"],
        ...cliConfig,
    },

    {
        name: "@forsakringskassan/eslint-config-jest",
        files: ["**/*.spec.[jt]s"],
        ...jestConfig,
    },

    {
        name: "@forsakringskassan/eslint-config-cypress",
        files: ["**/*.cy.[jt]s"],
        ...cypressConfig,
    },

    {
        name: "@forsakringskassan/eslint-config-svelte",
        files: ["**/*.svelte", "**/*.svelte.js", "**/*.svelte.ts"],
        ...svelteConfig,
    },

    {
        name: "local",
        rules: {
            /* cannot be tested easily in examples (as the files doesn't exist) */
            "import/no-unresolved": "off",
        },
    },
];
