---
id: configuration
title: Configuration
---

# Configuration

The package is a standard TypeDoc plugin. It does not add custom TypeDoc
options:

```json
{
 "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-docusaurus-doc-links"]
}
```

## Package exports

The package exposes two entrypoints:

| Export                                     | Purpose                                                    |
| ------------------------------------------ | ---------------------------------------------------------- |
| `typedoc-plugin-docusaurus-doc-links`      | TypeDoc plugin entrypoint with `load(app)`.                |
| `typedoc-plugin-docusaurus-doc-links/core` | Markdown link rewrite helper for direct tests and tooling. |

The core helper accepts Markdown source and returns the rewritten Markdown
string, which makes it easy to test edge cases outside TypeDoc.
