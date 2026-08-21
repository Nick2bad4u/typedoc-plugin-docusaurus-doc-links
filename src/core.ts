import { arrayJoin, stringSplit } from "ts-extras";

const SCHEME_RE = /^[A-Za-z][+\-.A-Za-z]*:/v;

interface FenceState {
    length: number;
    marker: "`" | "~";
}

interface InlineLinkDestinationParts {
    destination: string;
    remainder: string;
}

/**
 * Prefixes bare intra-doc Markdown file links with `./`.
 *
 * The function is designed for TypeDoc markdown renderer output. It avoids
 * fenced code blocks and inline code spans.
 *
 * @param input - Markdown source to normalize for Docusaurus doc-file link
 *   resolution.
 */
export function prefixBareMarkdownFileLinksInMarkdown(input: string): string {
    const newline = input.includes("\r\n") ? "\r\n" : "\n";
    const lines = stringSplit(input.replaceAll("\r\n", "\n"), "\n");

    let fenceState: FenceState | null = null;

    const outLines = lines.map((line) => {
        const fenceMatch = /^[\t ]{0,3}(?<run>`{3,}|~{3,})/v.exec(line);
        if (fenceMatch) {
            const run = fenceMatch.groups?.run ?? "";
            const markerChar = run.charAt(0);
            const marker = markerChar === "`" ? "`" : "~";
            const { length } = run;
            const rest = line.slice(fenceMatch[0].length);

            if (fenceState === null) {
                fenceState = { length, marker };
            } else if (
                marker === fenceState.marker &&
                length >= fenceState.length &&
                rest.trim().length === 0
            ) {
                fenceState = null;
            }

            return line;
        }

        if (fenceState !== null) {
            return line;
        }

        return prefixInlineMarkdownLinksInLine(line);
    });

    return arrayJoin(outLines, newline);
}

function countCharacterRun(
    value: string,
    startIndex: number,
    character: string
): number {
    let count = 0;
    while (
        startIndex + count < value.length &&
        value.charAt(startIndex + count) === character
    ) {
        count += 1;
    }

    return count;
}

function findInlineLinkClosingParen(input: string, startIndex: number): number {
    let depth = 0;
    let index = startIndex;

    while (index < input.length) {
        const character = input.charAt(index);

        if (character === "(") {
            depth += 1;
            index += 1;
            continue;
        }

        if (character === ")") {
            if (depth === 0) {
                return index;
            }

            depth -= 1;
            index += 1;
            continue;
        }

        if (character === "\\") {
            index += 2;
            continue;
        }

        index += 1;
    }

    return -1;
}

function findInlineLinkLabelOpenBracket(
    line: string,
    closeBracketIndex: number
): number {
    let depth = 0;

    for (let index = closeBracketIndex - 1; index >= 0; index -= 1) {
        const character = line.charAt(index);
        const isBracket = character === "[" || character === "]";
        const isEscapedBracket = isBracket && isEscaped(line, index);

        if (!isEscapedBracket) {
            if (character === "]") {
                depth += 1;
            } else if (character === "[") {
                if (depth === 0) {
                    return index;
                }

                depth -= 1;
            }
        }
    }

    return -1;
}

function isEscaped(input: string, index: number): boolean {
    let backslashCount = 0;
    let currentIndex = index - 1;

    while (currentIndex >= 0 && input.charAt(currentIndex) === "\\") {
        backslashCount += 1;
        currentIndex -= 1;
    }

    return backslashCount % 2 === 1;
}

function prefixIfBareRelativeMarkdownFile(destination: string): string {
    const trimmedStart = destination.trimStart();
    const leadingWhitespace = destination.slice(
        0,
        destination.length - trimmedStart.length
    );

    const trimmedEnd = destination.trimEnd();
    const trailingWhitespace = destination.slice(trimmedEnd.length);

    const trimmed = destination.slice(
        leadingWhitespace.length,
        destination.length - trailingWhitespace.length
    );

    if (
        trimmed.startsWith("#") ||
        trimmed.startsWith("/") ||
        trimmed.startsWith("./") ||
        trimmed.startsWith("../") ||
        trimmed.startsWith("//") ||
        SCHEME_RE.test(trimmed)
    ) {
        return destination;
    }

    const hashIndex = trimmed.indexOf("#");
    const beforeHash = hashIndex === -1 ? trimmed : trimmed.slice(0, hashIndex);
    const queryIndex = beforeHash.indexOf("?");
    const pathname =
        queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);

    if (!pathname.endsWith(".md") && !pathname.endsWith(".mdx")) {
        return destination;
    }

    return `${leadingWhitespace}./${trimmed}${trailingWhitespace}`;
}

function prefixInlineLinkPayload(payload: string): string {
    const trimmedStart = payload.trimStart();
    const leadingWhitespace = payload.slice(
        0,
        payload.length - trimmedStart.length
    );

    const trimmedEnd = payload.trimEnd();
    const trailingWhitespace = payload.slice(trimmedEnd.length);
    const core = payload.trim();
    const { destination, remainder } = splitInlineLinkDestination(core);

    if (destination.length === 0) {
        return payload;
    }

    const isAngleWrapped =
        destination.startsWith("<") &&
        destination.endsWith(">") &&
        destination.length >= 2;
    const inner = isAngleWrapped ? destination.slice(1, -1) : destination;
    const rewrittenInner = prefixIfBareRelativeMarkdownFile(inner);

    if (rewrittenInner === inner) {
        return payload;
    }

    const rewrittenDestination = isAngleWrapped
        ? `<${rewrittenInner}>`
        : rewrittenInner;

    return `${leadingWhitespace}${rewrittenDestination}${remainder}${trailingWhitespace}`;
}

function prefixInlineMarkdownLinksInLine(line: string): string {
    let out = "";
    let index = 0;
    let codeSpanLength: null | number = null;

    while (index < line.length) {
        const tickRun =
            line.charAt(index) === "`"
                ? countCharacterRun(line, index, "`")
                : 0;
        if (tickRun > 0) {
            codeSpanLength = toggleCodeSpan(codeSpanLength, tickRun);
            out += line.slice(index, index + tickRun);
            index += tickRun;
            continue;
        }

        if (
            codeSpanLength === null &&
            line.charAt(index) === "]" &&
            line.charAt(index + 1) === "(" &&
            !isEscaped(line, index)
        ) {
            const rewrittenLink = rewriteInlineLinkAt(line, index);
            if (rewrittenLink !== null) {
                out += rewrittenLink.value;
                index = rewrittenLink.nextIndex;
                continue;
            }
        }

        out += line.charAt(index);
        index += 1;
    }

    return out;
}

function rewriteInlineLinkAt(
    line: string,
    labelCloseIndex: number
): null | { nextIndex: number; value: string } {
    const labelOpen = findInlineLinkLabelOpenBracket(line, labelCloseIndex);
    if (labelOpen === -1) {
        return null;
    }

    const urlStart = labelCloseIndex + 2;
    const end = findInlineLinkClosingParen(line, urlStart);
    if (end === -1) {
        return null;
    }

    const payload = line.slice(urlStart, end);
    return {
        nextIndex: end + 1,
        value: `](${prefixInlineLinkPayload(payload)})`,
    };
}

function splitAngleWrappedDestination(
    core: string
): InlineLinkDestinationParts {
    let index = 1;
    while (index < core.length) {
        const character = core.charAt(index);

        if (character === "\\") {
            index += 2;
        } else if (character === ">") {
            return {
                destination: core.slice(0, index + 1),
                remainder: core.slice(index + 1),
            };
        } else {
            index += 1;
        }
    }

    return { destination: core, remainder: "" };
}

function splitBareDestination(core: string): InlineLinkDestinationParts {
    let depth = 0;
    let index = 0;
    while (index < core.length) {
        const character = core.charAt(index);

        if (character === "(") {
            depth += 1;
            index += 1;
            continue;
        }

        if (character === ")") {
            depth = Math.max(0, depth - 1);
            index += 1;
            continue;
        }

        if (character === "\\") {
            index += 2;
            continue;
        }

        if (depth === 0 && /\s/v.test(character)) {
            return {
                destination: core.slice(0, index),
                remainder: core.slice(index),
            };
        }

        index += 1;
    }

    return { destination: core, remainder: "" };
}

function splitInlineLinkDestination(
    payload: string
): InlineLinkDestinationParts {
    const core = payload.trim();
    if (core.length === 0) {
        return { destination: "", remainder: "" };
    }

    return core.startsWith("<")
        ? splitAngleWrappedDestination(core)
        : splitBareDestination(core);
}

function toggleCodeSpan(
    currentLength: null | number,
    encounteredLength: number
): null | number {
    if (currentLength === null) {
        return encounteredLength;
    }

    return currentLength === encounteredLength ? null : currentLength;
}
