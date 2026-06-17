import { safeCastTo } from "ts-extras";
import {
    type Application,
    PageEvent,
    type PageEvent as TypeDocPageEvent,
} from "typedoc";

import { prefixBareMarkdownFileLinksInMarkdown } from "./core.js";

/**
 * TypeDoc plugin entrypoint.
 *
 * @param app - TypeDoc app instance.
 */
export function load(app: Readonly<Application>): void {
    app.renderer.on(PageEvent.END, onPageEnd);
}

function onPageEnd(page: Readonly<TypeDocPageEvent>): void {
    if (typeof page.contents !== "string") {
        return;
    }

    if (!page.url.endsWith(".md") && !page.url.endsWith(".mdx")) {
        return;
    }

    safeCastTo<TypeDocPageEvent>(page).contents =
        prefixBareMarkdownFileLinksInMarkdown(page.contents);
}
