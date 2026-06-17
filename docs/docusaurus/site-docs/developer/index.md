---
id: index
title: Developer Notes
---

# Developer Notes

The runtime is split into two modules:

- `src/plugin.ts` registers a TypeDoc renderer page hook and rewrites Markdown
  or MDX page contents before output is written.
- `src/core.ts` contains the Markdown scanner and is exported through the
  `./core` package subpath.

The scanner handles nested inline-link parentheses, escaped brackets, code
spans, and fenced code blocks without introducing a Markdown parser dependency.
