import { createConfig } from "eslint-config-nick2bad4u";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line unicorn/prefer-import-meta-properties -- Keep compatibility with the declared Node >=22.0.0 engine.
const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...createConfig({
        rootDirectory,
        tsconfigPaths: ["./tsconfig.json"],
    }),
];

export default config;
