import { Linter } from "eslint";

declare const config: Linter.Config[];
export const globals: typeof import("globals");

export default config;

export function defineConfig(config: Linter.Config): Linter.Config;
export function docsConfig(override?: Linter.Config): Linter.Config;
