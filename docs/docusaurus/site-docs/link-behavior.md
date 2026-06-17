---
id: link-behavior
title: Link Behavior
---

# Link Behavior

The plugin prefixes bare Markdown destinations ending in `.md` or `.mdx`.

## Rewritten

```md
[Getting Started](getting-started.md)
[API](developer/api/index.md#load)
[MDX Page](guides/advanced.mdx)
```

These become:

```md
[Getting Started](./getting-started.md)
[API](./developer/api/index.md#load)
[MDX Page](./guides/advanced.mdx)
```

## Left alone

```md
[Already relative](./getting-started.md)
[Parent](../README.md)
[Anchor](#configuration)
[Absolute](/docs/getting-started)
[External](https://example.com/page.md)
`[Inline code](guide.md)`
```

The plugin also leaves fenced code blocks untouched. This keeps examples and
snippets truthful while still fixing generated documentation links.
