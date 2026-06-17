import type { Application, PageEvent } from "typedoc";

import { describe, expect, expectTypeOf, it } from "vitest";

import { prefixBareMarkdownFileLinksInMarkdown } from "../src/core.js";
import { load } from "../src/plugin.js";

describe("public API types", () => {
    it("stays aligned with TypeDoc", () => {
        expect.assertions(1);

        expect(load).not.toBe(prefixBareMarkdownFileLinksInMarkdown);

        expectTypeOf(load).parameter(0).toEqualTypeOf<Readonly<Application>>();
        expectTypeOf(load).returns.toBeVoid();

        expectTypeOf(prefixBareMarkdownFileLinksInMarkdown)
            .parameter(0)
            .toEqualTypeOf<string>();
        expectTypeOf(
            prefixBareMarkdownFileLinksInMarkdown
        ).returns.toEqualTypeOf<string>();

        expectTypeOf<PageEvent["contents"]>().toEqualTypeOf<
            string | undefined
        >();
    });
});
