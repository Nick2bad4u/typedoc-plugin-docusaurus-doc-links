<!-- markdownlint-disable -->
<!-- eslint-disable markdown/no-missing-label-refs -->
# 📜 Changelog

## ✨ What's Changed

- <b>Commit Range: ➡️</b> [`v1.0.2...f7fc953`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v1.0.2...f7fc953b6fe005f05890259fd94b475fd047e60c "View full commit range on GitHub")

### 🛠️ Bug Fixes

- [`de63428`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/de634289b6fd28fd2b4bf1245a993c5e81c68776 "Diff: 3 files, +53 | -8") — 🐛 [fix] Preserve malformed angle destinations&nbsp;<sub><em>(3&nbsp;files,&nbsp;+53,&nbsp;-8)</em></sub>
    - 🐛 [fix] Leave an unterminated angle-wrapped Markdown destination unchanged instead of synthesizing an invalid relative target.
    - 🧪 [test] Cover malformed links, nested and escaped destinations, strict fence closers, contentless pages, and non-Markdown renderer output.
    - 📈 [test] Raise measured source coverage to 98.19% statements, 94.73% branches, and 100% functions.

- [`33a04a2`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/33a04a27f959373aa3afbd4516577a4f9227eeee "Diff: 5 files, +163 | -82") — 🐛 [fix] Harden Markdown link rewriting lifecycle&nbsp;<sub><em>(5&nbsp;files,&nbsp;+163,&nbsp;-82)</em></sub>
    - 🐛 [fix] Honor CommonMark fence closing rules and escaped inline-link delimiters.`n - Require a matching marker, sufficient run length, and an otherwise empty closing-fence line.`n - Keep malformed closing candidates inside the fenced block instead of rewriting their links.
    - 🐛 [fix] Register the TypeDoc renderer hook once per Application instance.`n - Prevent duplicate callbacks without suppressing independent TypeDoc applications in one process.
    - 🚜 [refactor] Split inline-link scanning into focused parsing helpers.`n - Preserve nested destinations, titles, angle wrappers, code spans, queries, fragments, and CRLF output while reducing cognitive complexity.
    - 🧪 [test] Exercise the public plugin contract with real TypeDoc applications and a consumer-style Markdown generation fixture.`n - Verify duplicate-load protection and caller-visible PageEvent mutation.
    - ♿️ [fix] Give the primary documentation action sufficient text contrast on its teal gradient.

### 🧹 Chores

- [`f7fc953`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/f7fc953b6fe005f05890259fd94b475fd047e60c "Diff: 17 files, +1015 | -643") — 🔀 [chore] Merge TypeDoc and npm 12 release hardening (#9)&nbsp;<sub><em>(17&nbsp;files,&nbsp;+1015,&nbsp;-643)</em></sub>
    - Merge the exact de634289 candidate after Linux, macOS, Windows, full release verification, CodeQL, SonarCloud, Codecov, dependency review, Socket, StepSecurity, gitleaks, and TruffleHog passed. Sonar npm lifecycle findings were accepted with the repository's strict npm 12 allowScripts rationale.

- [`18301db`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/18301db60cad8db1c40d6ea0565a6e94d6ad19c6 "Diff: 10 files, +48713 | -48501") — *(tooling)* Migrate shared package configs&nbsp;<sub><em>(10&nbsp;files,&nbsp;+48713,&nbsp;-48501)</em></sub>
    - 🔧 [chore] Adopt the shared NCU, Yamllint, TypeDoc, lint, and formatter presets while retaining project-specific YAML policy.
    - 🐛 [fix] Load the package's TypeDoc plugin from its local build while retaining the rest of the shared plugin set.
    - ⬆️ [chore] Refresh npm 12 dependencies, lockfile metadata, and synchronized Node version files.

- [`47dca45`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/47dca453a369d2eb7dc73b6bc59655657eaf8d55 "Diff: 4 files, +186 | -234") — 🔧 [chore] Adopt shared validation configs&nbsp;<sub><em>(4&nbsp;files,&nbsp;+186,&nbsp;-234)</em></sub>
    - 🔧 [chore] Wire JSCPD, git-cliff, and Lychee through shared config packages.
    - 👷 [ci] Point release-note generation at the shared git-cliff config where workflows invoke git-cliff directly.

### 👷 CI/CD

- [`e50abe1`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/e50abe19c6ded8526b4a360f439b7e73e8f83667 "Diff: 3 files, +3 | -1") — 💚 [ci] Resolve the locked Vitest binary in CI&nbsp;<sub><em>(3&nbsp;files,&nbsp;+3,&nbsp;-1)</em></sub>
    - 💚 [ci] Run the exact matrix test command through an npm package script so node_modules/.bin is available without on-demand installation.
    - 🙈 [chore] Ignore the generated root JUnit report used by Codecov uploads.

- [`37b4703`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/37b4703a457f11395b81b40251fc41d3b65b2488 "Diff: 11 files, +803 | -559") — 👷 [ci] Harden the npm 12 release lifecycle&nbsp;<sub><em>(11&nbsp;files,&nbsp;+803,&nbsp;-559)</em></sub>
    - 🔒️ [ci] Enforce npm 12 lifecycle-script policy with an exact package-manager check.`n - Allow only required SWC, esbuild, and resolver builds while explicitly denying optional core-js and fsevents scripts.`n - Replace repository-local npx execution with lockfile-resolved binaries and keep ephemeral tooling non-interactive with scripts disabled.
    - ⬆️ [build] Refresh compatible runtime and quality-tool dependencies.`n - Advance Node 26 and npm 12 patch versions, remove the platform-specific Rspack binding, and retain the supported TypeDoc 0.28 / TypeScript 6 contract.`n - Apply the patched nanoid transitive release without introducing dependency overrides.
    - 👷 [ci] Make every workflow install the declared npm version and remove forced installs.`n - Pin the Go-based gitleaks installation to the verified v8.30.1 commit.
    - 🔒️ [ci] Make trusted publishing fail closed and artifact-identical.`n - Remove release verification bypasses and alternate refs, reject duplicate registry/tag/release state, and compare the complete worktree before and after verification.`n - Limit the generated release commit to CHANGELOG.md, package.json, and package-lock.json with an explicit staging allowlist.`n - Validate one system-temp package archive, publish that exact tarball with provenance, and attach it alongside its matching zip without overwriting assets.

- [`7a39c03`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/7a39c032c71ebd505ac9517d1d34ad0dc492a612 "Diff: 4 files, +49 | -18") — *(release)* Guard git-cliff note generation&nbsp;<sub><em>(4&nbsp;files,&nbsp;+49,&nbsp;-18)</em></sub>
    - Validate the authoritative release tag at HEAD immediately before git-cliff and export GitHub authentication for enriched notes. Standardize Actionlint configuration and direct package CLI usage where applicable.

### 📦 Dependencies

- [`cb835ed`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/cb835eda5fcdd7fe95a71bfa084bd3577fac9b0f "Diff: 1 file, +6 | -6") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+6,&nbsp;-6)</em></sub>

- [`fcaea8c`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/fcaea8cfb43340be24af45e219c0dae19b924d09 "Diff: 1 file, +3 | -3") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+3,&nbsp;-3)</em></sub>

- [`4f06a05`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/4f06a05cf642fc991859d09109dc3838f964be90 "Diff: 1 file, +10 | -10") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+10,&nbsp;-10)</em></sub>

- [`58e052a`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/58e052abbf4beddeebd97a1e01f380089ef6a537 "Diff: 1 file, +6 | -6") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+6,&nbsp;-6)</em></sub>

- [`48bdc87`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/48bdc874fe6014379517cd53d294a446d1aec13f "Diff: 1 file, +19 | -19") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+19,&nbsp;-19)</em></sub>

- [`ee1ab48`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/ee1ab48be6ae6bbdaa770f12326e91d5814cf682 "Diff: 1 file, +66 | -841") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+66,&nbsp;-841)</em></sub>

- [`7f3e47c`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/7f3e47c559741c8dfa05ca9de3a7f8dae77de246 "Diff: 1 file, +48650 | -48666") — ⬆️ [build] Update npm_and_yarn dependencies&nbsp;<sub><em>(1&nbsp;file,&nbsp;+48650,&nbsp;-48666)</em></sub>

## ✨ What's Changed in v1.0.2

- <b>Commit Range: ➡️</b> [`v1.0.1...v1.0.2`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v1.0.1...v1.0.2 "View full commit range on GitHub")

### 🛠️ Bug Fixes

- [`152ea90`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/152ea90136820ae120a60787465dea76f5baeb31 "Diff: 3 files, +160 | -160") — 💚 [fix] Align TOML formatting gate&nbsp;<sub><em>(3&nbsp;files,&nbsp;+160,&nbsp;-160)</em></sub>

- [`518755d`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/518755d617662adc171c7b857a37a5d9e6d9b9e6 "Diff: 7 files, +332 | -332") — 💚 [fix] Restore release verification formatting&nbsp;<sub><em>(7&nbsp;files,&nbsp;+332,&nbsp;-332)</em></sub>

### 🧹 Chores

- [`0f5e00e`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/0f5e00eb3d622aaf18e18bd15591d9ac2910eeec "Diff: 2 files, +3 | -3") — Release v1.0.2&nbsp;<sub><em>(2&nbsp;files,&nbsp;+3,&nbsp;-3)</em></sub>

### 📦 Dependencies

- [`69e79cb`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/69e79cb08a0b137f9671ba190a54779c12ba7831 "Diff: 9 files, +48295 | -46531") — ⬆️ [build] Update dependency toolchain&nbsp;<sub><em>(9&nbsp;files,&nbsp;+48295,&nbsp;-46531)</em></sub>

- [`07f49a6`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/07f49a6dad26d2837b2b282eb2d2465a390257fd "Diff: 1 file, +44 | -304") — Bump @apidevtools/json-schema-ref-parser&nbsp;<sub><em>(1&nbsp;file,&nbsp;+44,&nbsp;-304)</em></sub>
    - Bumps the npm_and_yarn group with 1 update in the / directory: [@apidevtools/json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser).
    - Updates `@apidevtools/json-schema-ref-parser` from 11.1.0 to 15.4.0
- [Release notes](https://github.com/APIDevTools/json-schema-ref-parser/releases)
- [Commits](https://github.com/APIDevTools/json-schema-ref-parser/compare/v11.1.0...v15.4.0)
    - ---
updated-dependencies:
- dependency-name: "@apidevtools/json-schema-ref-parser"
  dependency-version: 15.4.0
  dependency-type: indirect
  dependency-group: npm_and_yarn
...

### 🛡️ Security

- [`e661b58`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/e661b5825cc86d3fd011b1d060ddb006c25e53f3 "Diff: 13 files, +47160 | -47208") — 👷 [ci] Use shared workflow callers&nbsp;<sub><em>(13&nbsp;files,&nbsp;+47160,&nbsp;-47208)</em></sub>
    - 👷 [ci] Switches the Dependabot auto-merge caller to workflow-templates@main and replaces local security and maintenance workflows with shared reusable callers.
    - ⬆️ [build] Updates eslint-config-nick2bad4u to the published caller override version and records any peer dependency needed for the shared ESLint config to load.

### New Contributors
* @dependabot[bot] made their first contribution in [#1](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/pull/1)

> [!NOTE]
> **Release comparison**: https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v1.0.1...v1.0.2

## ✨ What's Changed in v1.0.1

- <b>Commit Range: ➡️</b> [`v1.0.0...v1.0.1`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v1.0.0...v1.0.1 "View full commit range on GitHub")

### ✨ Features

- [`86d5341`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/86d5341a3050a400289bd5b1eed9d275a877c390 "Diff: 17 files, +879 | -102") — ✨ [feat] Polish docs and shared config integration&nbsp;<sub><em>(17&nbsp;files,&nbsp;+879,&nbsp;-102)</em></sub>

### 🧪 Testing

- [`23d5386`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/23d5386531694a8e74f5655444c92629e92f7ab1 "Diff: 2 files, +29 | -1") — ✅ [test] Restore Codecov matrix uploads&nbsp;<sub><em>(2&nbsp;files,&nbsp;+29,&nbsp;-1)</em></sub>

### 🧹 Chores

- [`c8e5268`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/c8e52681fa6c0e82c8007a47e01a8187a8569228 "Diff: 2 files, +3 | -3") — Release v1.0.1&nbsp;<sub><em>(2&nbsp;files,&nbsp;+3,&nbsp;-3)</em></sub>

> [!NOTE]
> **Release comparison**: https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v1.0.0...v1.0.1

## ✨ What's Changed in v1.0.0

- <b>Commit Range: ➡️</b> [`v0.1.0...v1.0.0`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v0.1.0...v1.0.0 "View full commit range on GitHub")

### ✨ Features

- [`28a3f35`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/28a3f3595847b92d46f27d936fe8d26b6c6abb33 "Diff: 36 files, +41502 | -13960") — ✨ [feat] Add Docusaurus docs and release verification&nbsp;<sub><em>(36&nbsp;files,&nbsp;+41502,&nbsp;-13960)</em></sub>
    - ✨ [feat] Add a Docusaurus documentation workspace with TypeDoc API generation, local search, PWA assets, and end-user docs tailored to the plugin behavior.
    - 👷 [ci] Add docs deployment, Codecov OIDC uploads, generated-output ignores, Stylelint, Remark, and package-lint coverage to the release verification gate.
    - 🚜 [refactor] Tighten TypeDoc hook typing for readonly lint rules while preserving the renderer mutation point through an explicit safe cast.
    - 🧪 [test] Keep validation quiet by relying on the normal TypeScript gate instead of Vitest experimental typecheck.

### 🛠️ Bug Fixes

- [`25977d8`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/25977d8e223b44454248d9a1bdf492676ff591e0 "Diff: 2 files, +6 | -0") — 🐛 [fix] Repair docs deploy and Gitleaks workflows&nbsp;<sub><em>(2&nbsp;files,&nbsp;+6,&nbsp;-0)</em></sub>
    - 🐛 [fix] Add the missing Gitleaks configuration so the existing secret scan workflow can load the default rule set instead of failing before scan startup.
    - 👷 [ci] Allow the Docusaurus Pages workflow to enable GitHub Pages during the first repository deployment.

### 🚜 Refactor

- [`f6d8c43`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/f6d8c43b0497f77dcf8d084828a97a2b9dfd5d2b "Diff: 13 files, +395 | -451") — Build Docusaurus doc link plugin from TypeScript&nbsp;<sub><em>(13&nbsp;files,&nbsp;+395,&nbsp;-451)</em></sub>

### 🧹 Chores

- [`116bd44`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/116bd446b4b666ff8186be2c1e10b850963a9358 "Diff: 2 files, +3 | -3") — Release v1.0.0&nbsp;<sub><em>(2&nbsp;files,&nbsp;+3,&nbsp;-3)</em></sub>

- [`44aa5d1`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/44aa5d1e41f713b78068303bfec010a848028498 "Diff: 3 files, +3 | -3") — 🧹 [chore] Correct repository maintenance metadata&nbsp;<sub><em>(3&nbsp;files,&nbsp;+3,&nbsp;-3)</em></sub>
    - 🔧 [chore] Update copied repository references in GitHub metadata and workflow agent guidance.
 - Rename the funding header and workflow instructions from copied project names to `typedoc-plugin-docusaurus-doc-links`.
    - 🔧 [chore] Normalize the stale configuration schema URL.
 - Switch the stale config schema reference to the canonical SchemaStore URL.

### 👷 CI/CD

- [`f0efea6`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/f0efea68e670aabfd8a60529ca74fe8ab2e37f6e "Diff: 13 files, +1721 | -333") — 👷 [ci] Add repository maintenance automation&nbsp;<sub><em>(13&nbsp;files,&nbsp;+1721,&nbsp;-333)</em></sub>
    - 👷 [ci] Add Dependabot auto-merge, dependency review, labeler, stale, Gitleaks, and Trufflehog workflows.
 - Configure pinned third-party actions, explicit job permissions, concurrency groups, timeouts, hardened runners, and merge-group support where applicable.
 - Route Dependabot patch and minor updates through the reusable auto-merge workflow.
    - 🔧 [chore] Add GitHub repository maintenance configuration.
 - Add funding metadata, pull request label rules, stale issue and PR policy, and agent commit-message guidance.
 - Add workflow-scoped agent instructions for GitHub Actions review and CI/CD maintenance.
    - 🔨 [build] Refresh package scripts and shared tooling.
 - Run project CLI tools through npx-backed script commands.
 - Add dependency, action, and type update helper scripts.
 - Update shared ESLint, npm-package-json-lint, and Prettier config packages with the refreshed lockfile.

### New Contributors
* @github-actions[bot] made their first contribution

> [!NOTE]
> **Release comparison**: https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/v0.1.0...v1.0.0

## ✨ What's Changed in v0.1.0

- <b>Commit Range: ➡️</b> [`38a3f23...v0.1.0`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/compare/38a3f23a09535dcad366e56c0fb8b9223bba6b8c...v0.1.0 "View full commit range on GitHub")

### ✨ Features

- [`38a3f23`](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/commit/38a3f23a09535dcad366e56c0fb8b9223bba6b8c "Diff: 42 files, +22737 | -0") — Create standalone TypeDoc Docusaurus link plugin&nbsp;<sub><em>(42&nbsp;files,&nbsp;+22737,&nbsp;-0)</em></sub>

### New Contributors
* @Nick2bad4u made their first contribution

## ⭐ Contributors
Thanks to anyone who has 🧑‍💻 [contributed](https://github.com/Nick2bad4u/typedoc-plugin-docusaurus-doc-links/graphs/contributors).

*This changelog was automatically generated with ⛰️ [git-cliff](https://github.com/orhun/git-cliff).*
