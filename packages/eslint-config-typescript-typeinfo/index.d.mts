import { Linter } from "eslint";

declare const config: (
    tsconfigRootDir?: string | URL,
    config?: Linter.Config,
) => Linter.Config;

export default config;
