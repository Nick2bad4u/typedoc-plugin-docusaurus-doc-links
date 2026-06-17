import { execFileSync } from "node:child_process";
import {
    mkdir,
    readdir,
    readFile,
    rm,
    symlink,
    writeFile,
} from "node:fs/promises";
import * as nodePath from "node:path";
import { describe, expect, it } from "vitest";

import { prefixBareMarkdownFileLinksInMarkdown } from "../docusaurus-doc-links-core.mjs";

const packageName = "typedoc-plugin-docusaurus-doc-links";
const fixtureDirectory = nodePath.join(".cache", "typedoc-fixture");
const typedocCliPath = nodePath.join(
    "node_modules",
    "typedoc",
    "bin",
    "typedoc"
);
const rootPluginLink = nodePath.join("node_modules", packageName);

describe("typedoc-plugin-docusaurus-doc-links", () => {
    it("prefixes bare Markdown file links without touching external links or code", () => {
        expect.assertions(1);

        expect(
            prefixBareMarkdownFileLinksInMarkdown(
                [
                    "[API](api/index.md)",
                    "[Already relative](./api/index.md)",
                    "[Parent](../api/index.md)",
                    "[External](https://example.com/api.md)",
                    '[With title](api/index.md "API")',
                    "[Angle](<api/index.md>)",
                    "[Query](api/index.md?x=1#section)",
                    "`[Code](api/index.md)`",
                    "```",
                    "[Fenced](api/index.md)",
                    "```",
                ].join("\n")
            )
        ).toStrictEqual(
            [
                "[API](./api/index.md)",
                "[Already relative](./api/index.md)",
                "[Parent](../api/index.md)",
                "[External](https://example.com/api.md)",
                '[With title](./api/index.md "API")',
                "[Angle](<./api/index.md>)",
                "[Query](./api/index.md?x=1#section)",
                "`[Code](api/index.md)`",
                "```",
                "[Fenced](api/index.md)",
                "```",
            ].join("\n")
        );
    });

    it("preserves CRLF input", () => {
        expect.assertions(1);

        expect(
            prefixBareMarkdownFileLinksInMarkdown(
                "[API](api/index.md)\r\n[Other](guide.mdx)"
            )
        ).toBe("[API](./api/index.md)\r\n[Other](./guide.mdx)");
    });

    it("loads in a real TypeDoc markdown run from a consumer-style fixture", async () => {
        expect.assertions(3);

        await rm(fixtureDirectory, {
            force: true,
            recursive: true,
        });
        await mkdir(nodePath.join(fixtureDirectory, "src"), {
            recursive: true,
        });
        await mkdir(nodePath.join(fixtureDirectory, "node_modules"), {
            recursive: true,
        });
        await symlink(
            process.cwd(),
            nodePath.join(fixtureDirectory, "node_modules", packageName),
            "junction"
        );
        await symlink(
            nodePath.resolve("node_modules", "typedoc"),
            nodePath.join(fixtureDirectory, "node_modules", "typedoc"),
            "junction"
        );
        await symlink(
            nodePath.resolve("node_modules", "typedoc-plugin-markdown"),
            nodePath.join(
                fixtureDirectory,
                "node_modules",
                "typedoc-plugin-markdown"
            ),
            "junction"
        );
        await rm(rootPluginLink, {
            force: true,
            recursive: true,
        });
        await symlink(process.cwd(), rootPluginLink, "junction");

        try {
            await Promise.all([
                writeFile(
                    nodePath.join(fixtureDirectory, "package.json"),
                    `${JSON.stringify({ name: "fixture", version: "1.0.0" }, null, 4)}\n`
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "src", "index.ts"),
                    [
                        "/** Source docs. */",
                        "export function source(): void {}",
                        "/** Target docs. */",
                        "export function target(): void {}",
                        "",
                    ].join("\n")
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "tsconfig.json"),
                    `${JSON.stringify(
                        {
                            compilerOptions: {
                                module: "ESNext",
                                moduleResolution: "bundler",
                                skipLibCheck: true,
                                strict: true,
                                target: "ES2024",
                            },
                            include: ["src/**/*.ts"],
                        },
                        null,
                        4
                    )}\n`
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "typedoc.json"),
                    `${JSON.stringify(
                        {
                            entryPoints: ["src/index.ts"],
                            out: "api",
                            plugin: ["typedoc-plugin-markdown", packageName],
                            readme: "none",
                            theme: "markdown",
                            tsconfig: "tsconfig.json",
                        },
                        null,
                        4
                    )}\n`
                ),
            ]);

            const output = execFileSync(
                process.execPath,
                [
                    typedocCliPath,
                    "--options",
                    "typedoc.json",
                ],
                {
                    cwd: fixtureDirectory,
                    encoding: "utf8",
                }
            );
            const generatedFiles = await readdir(
                nodePath.join(fixtureDirectory, "api"),
                {
                    recursive: true,
                }
            );
            const markdownFiles = generatedFiles.filter((fileName) =>
                fileName.endsWith(".md")
            );
            const generatedMarkdown = (
                await Promise.all(
                    markdownFiles.map((fileName) =>
                        readFile(
                            nodePath.join(fixtureDirectory, "api", fileName),
                            "utf8"
                        )
                    )
                )
            ).join("\n");

            expect(output).toContain("markdown generated");
            expect(generatedMarkdown).toContain("source");
            expect(generatedMarkdown).toContain("target");
        } finally {
            await rm(fixtureDirectory, {
                force: true,
                recursive: true,
            });
            await rm(rootPluginLink, {
                force: true,
                recursive: true,
            });
        }
    });
});
