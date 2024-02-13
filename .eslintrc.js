/* eslint-disable-next-line import/no-extraneous-dependencies -- monorepo package, will be resolvable */
require("@forsakringskassan/eslint-config/patch/modern-module-resolution");

module.exports = {
    extends: ["@forsakringskassan"],

    rules: {
        /* cannot be tester easily in examples (as the files doesn't exist) */
        "import/no-unresolved": "off",
    },

    overrides: [
        {
            files: "*.ts",
            extends: ["@forsakringskassan/typescript"],
        },
        {
            files: "*.vue",
            extends: ["@forsakringskassan/vue"],
        },
        {
            files: "./packages/eslint-config-cli/*.[jt]s",
            extends: ["@forsakringskassan/cli"],
        },
        {
            files: "./packages/eslint-config-jest/*.spec.[jt]s",
            extends: ["@forsakringskassan/jest"],
        },
        {
            files: "./packages/eslint-config-cypress/*.spec.[jt]s",
            extends: ["@forsakringskassan/cypress"],
        },
    ],
};
