# `eslint-config-fk`

> Försäkringskassan ESLint [shareable](http://eslint.org/docs/developer-guide/shareable-configs.html) konfiguration

## Installation

```
npm install --save-dev @forsakringskassan/eslint-config
```

## Innehåll

Detta NPM paket innehåller en grundkonfiguration för ESLint anpassad för FK.

Vissa regler är konfigurerade som varningar och släpps igenom i lokala byggen.
Byggjobb som körs från CI/CD släpper inte igenom varningar.

För att använda ska din `package.json` innehålla två script:

```json
{
    "scripts": {
        "eslint": "eslint --cache .",
        "eslint:fix": "eslint --fix ."
    }
}
```

Kataloger och filer som ska ignoreras läggs in i `.eslintignore` eller med `excludedFiles` i `overrides`.

## Användande

`@forsakringskassan/eslint-config` inkluderar `eslint` så din applikation behöver inte själv hålla ett eget beroende mot `eslint`, om du har ett sen tidigare kan du med fördel ta bort det.

I din `.eslintrc.cjs` fil:

```js
require("@forsakringskassan/eslint-config/patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["@forsakringskassan"],

    overrides: [
        {
            /* ensure we lint *.cjs and *.mjs files as well */
            files: ["*.cjs", "*.mjs"],
        },
        {
            files: ["./*.{js,ts,cjs,mjs}", "**/scripts/*.{js,ts,cjs,mjs}"],
            extends: ["@forsakringskassan/cli"],
        },
        {
            files: "*.ts",
            extends: ["@forsakringskassan/typescript"],
        },
        {
            files: "*.vue",
            extends: ["@forsakringskassan/vue"],
        },
        {
            files: "*.spec.[jt]s",
            extends: ["@forsakringskassan/jest"],
        },
        {
            files: "*.cy.[jt]s",
            extends: ["@forsakringskassan/cypress"],
        },
        {
            files: ["*.svelte", "*.svelte.js", "*.svelte.ts"],
            extends: ["@forsakringskassan/svelte"],
        },
    ],
};
```

If you are using Cypress 9 or earlier and using the file extension `*.spec.[jt]s` the following modifications are required:

```diff
         {
             files: "*.spec.[jt]s",
+            excludedFiles: ["cypress/**", "tests/**"],
             extends: ["@forsakringskassan/jest"],
         },
         {
-            files: "*.cy.[jt]s",
+            files: ["./tests/**/*.spec.[jt]s", "./tests/support/*.[jt]s", "*.ct.[jt]s"],
             extends: ["@forsakringskassan/cypress"],
         },
```

All inställningar kan men bör inte skrivas över i din `.eslintrc.cjs` fil.

### Flat config

Experimentellt stöd för Flat config:

```ts
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

    cliConfig(),
    typescriptConfig(),
    vueConfig(),
    jestConfig(),
    cypressConfig(),
    svelteConfig(),
];
```

Konfigurationsfabriker tar ett optional object för att anpassa filer som ska matchas:

```ts
export default [
    cliConfig({
        files: ["..."],
    }),
];
```

Behöver man skriva över regler använder man ett nytt block under fabriker:

```ts
export default [
    {
        name: "local",
        rules: {
            /* ... */
        },
    },
];
```

### CLI

For pure CLI packages the best is to extend both base and cli presets right away:

```diff
 module.exports = {
-   extends: ["@forsakringskassan"],
+   extends: ["@forsakringskassan", "@forsakringskassan/cli"],
 };
```

If the package contains mixed sources (such as build configuration files mixed with application source) add only the cli preset for the specific files, e.g. only the files directly in the root directory:

```diff
 module.exports = {
     overrides: [
+        {
+            files: ["./*.js", "scripts/*.[jt]s"],
+            extends: ["@forsakringskassan/cli"],
+        },
     ],
 };
```

### Typescript

Add the following override:

```diff
 module.exports = {
     overrides: [
+        {
+            files: "*.ts",
+            extends: ["@forsakringskassan/typescript"],
+        },
     ],
 };
```

### vue.js

Add the following override:

```diff
 module.exports = {
     overrides: [
+        {
+            files: "*.vue",
+            extends: ["@forsakringskassan/vue"],
+        },
     ],
 };
```

### Jest

Add the following override:

```diff
 module.exports = {
     overrides: [
+        {
+            files: "*.spec.[jt]s",
+            excludedFiles: ["cypress/**", "tests/**"],
+            extends: ["@forsakringskassan/jest"],
+        },
     ],
 };
```

### Cypress

Add the following override:

```diff
 module.exports = {
     overrides: [
+        {
+            files: "*.cy.[jt]s",
+            extends: ["@forsakringskassan/cypress"],
+        },
     ],
 };
```

Alternative if you use Cypress 9 or earlier with the `*.spec.[jt]s` extension:

```diff
 module.exports = {
     overrides: [
+        {
+            files: ["./tests/**/*.spec.[jt]s", "./tests/support/*.[jt]s", "*.ct.[jt]s"],
+            extends: ["@forsakringskassan/cypress"],
+        },
     ],
 };
```

### AngularJS

Add the following extend:

```diff
 module.exports = {
-    extends: ["@forsakringskassan"],
+    extends: ["@forsakringskassan", "@forsakringskassan/angular"],
 };
```
