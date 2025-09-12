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

I din `eslint.config.mjs`:

```ts
import defaultConfig from "@forsakringskassan/eslint-config";
import cliConfig from "@forsakringskassan/eslint-config-cli";
import cypressConfig from "@forsakringskassan/eslint-config-cypress";
import jestConfig from "@forsakringskassan/eslint-config-jest";
import svelteConfig from "@forsakringskassan/eslint-config-svelte";
import typescriptConfig from "@forsakringskassan/eslint-config-typescript";
import vueConfig from "@forsakringskassan/eslint-config-vue";

export default [
    {
        name: "Ignored files",
        ignores: [
            "**/coverage/**",
            "**/dist/**",
            "**/node_modules/**",
            "**/public/**",
            "**/temp/**",
            "**/typedoc/**",
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

`@forsakringskassan/eslint-config` reexports [`globals`][npm:globals], if you need to overwrite global variables for a set of files:

[npm:globals]: https://www.npmjs.com/package/globals

```ts
import defaultConfig, { globals } from "@forsakringskassan/eslint-config";

export default [
    ...defaultConfig,

    {
        name: "local/browser",
        files: ["src/browser/**/*.{js,ts}"],
        languageOptions: {
            globals: { ...globals.browser },
        },
    },
];
```
