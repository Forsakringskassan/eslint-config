import { fileURLToPath } from "node:url";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import legacyConfig from "./index.cjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

const migrated = compat.config(legacyConfig);
const flat = migrated.reduce((result, it) => {
    return {
        languageOptions: {
            ...result.languageOptions,
            ...it.languageOptions,
        },
        plugins: {
            ...result.plugins,
            ...it.plugins,
        },
        rules: {
            ...result.rules,
            ...it.rules,
        },
    };
}, {});

flat.name = "@forsakringskassan/eslint-config-angular";
flat.files = ["**/*.[jt]s"];

export default flat;
