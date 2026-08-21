import { Application, PageEvent } from "typedoc";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

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

    it("registers the renderer hook once per application", async () => {
        expect.assertions(5);

        const firstApp = await Application.bootstrap();
        const firstOn = vi.spyOn(firstApp.renderer, "on");
        load(firstApp);
        load(firstApp);

        const page = {
            contents: "[Target](target.md)",
            url: "index.md",
        } as PageEvent;
        firstApp.renderer.trigger(PageEvent.END, page);
        const contentlessPage = { url: "index.md" } as PageEvent;
        firstApp.renderer.trigger(PageEvent.END, contentlessPage);
        const htmlPage = {
            contents: "[Target](target.md)",
            url: "index.html",
        } as PageEvent;
        firstApp.renderer.trigger(PageEvent.END, htmlPage);

        const secondApp = await Application.bootstrap();
        const secondOn = vi.spyOn(secondApp.renderer, "on");
        load(secondApp);

        expect(firstOn).toHaveBeenCalledExactlyOnceWith(
            PageEvent.END,
            expect.any(Function)
        );
        expect(secondOn).toHaveBeenCalledExactlyOnceWith(
            PageEvent.END,
            expect.any(Function)
        );
        expect(page.contents).toBe("[Target](./target.md)");
        expect(contentlessPage.contents).toBeUndefined();
        expect(htmlPage.contents).toBe("[Target](target.md)");
    });
});
