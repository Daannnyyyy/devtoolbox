# Contributing to DevToolbox

Thanks for helping improve DevToolbox. This guide covers local setup, coding standards, and how to add a new tool.

## Prerequisites

- Node.js **20+**
- npm (comes with Node)

## Local development

```bash
git clone https://github.com/Daannnyyyy/devtoolbox.git
cd devtoolbox
npm install
npm run dev
```

Before opening a PR, run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

All of the above must pass (CI runs the same checks).

## Coding standards

- **TypeScript** — strict mode; prefer explicit types at module boundaries
- **Vanilla TS** — no React/Vue/framework UI libraries
- **Pure logic** — keep transform/parse functions in plain modules so they are easy to unit test
- **ESLint + Prettier** — run `npm run lint` and `npm run format` as needed
- **Accessibility** — label form controls; keep keyboard navigation usable
- **No secrets** — never commit tokens, `.env` files with secrets, or personal data
- **No new dependencies** without discussion on the related issue first — prefer Web Crypto and built-in browser APIs

## Architecture: independent tools

Each tool is a **self-contained folder** under `src/tools/<id>/`. The registry discovers tools with Vite `import.meta.glob` and **ignores** `_template`. You never need to edit `src/core/registry.ts` to register a tool.

```
src/tools/
  _template/          # starter kit (skipped by registry)
  base64/
  json-formatter/
  unix-timestamp/
  url-parser/
  <your-tool>/        # one folder = one tool
    index.ts          # exports ToolDefinition (default or named `tool`)
    logic.ts          # pure helpers
    logic.test.ts     # Vitest unit tests
```

Suggested categories (reuse when they fit): `Encoding`, `Data`, `Text`, `Time`, `Security`, `Network`, `DevOps`, `Colour`.

## Adding a tool

1. Copy the template:

   ```bash
   cp -r src/tools/_template src/tools/my-tool
   ```

2. Edit `src/tools/my-tool/index.ts`:
   - Set `id` (should match the folder name), `name`, `description`, `category`, and optional `keywords`
   - Implement `mount(container)` to build the UI with shared CSS classes (`.tool-ui`, `.field`, `.btn`, `.status`, …)
   - Return a cleanup function from `mount` if you add listeners or timers that must be removed

3. Put pure helpers in `src/tools/my-tool/logic.ts` (or similar) and keep UI wiring in `index.ts`.

4. Add tests in `src/tools/my-tool/*.test.ts` covering happy paths and edge cases.

5. Reuse `copyText` / `flashCopy` from `src/core/dom.ts` for clipboard actions.

6. Do **not** edit `src/core/registry.ts` — tools are discovered via `import.meta.glob`.

7. Folder name `_template` is ignored by the registry; never use that name for a real tool.

Study existing seed tools (`base64`, `json-formatter`, `unix-timestamp`, `url-parser`) for UI and Result-type patterns.

### ToolDefinition shape

```ts
export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords?: string[];
  mount: (container: HTMLElement) => void | (() => void);
}
```

## Pull requests

- Keep PRs focused: one tool or one concern per PR
- Include tests for new logic
- Update docs if you change user-facing behavior
- Fill out the PR template
- **No drive-by typo-only PRs** — small doc fixes are fine when bundled with substantive work or filed as a focused issue first
- Link related issues when applicable

## Tests

- Use **Vitest**
- Prefer testing pure functions over DOM-heavy assertions
- Name files `*.test.ts` next to the code under test

## AI assistance

If you used AI tools (ChatGPT, Copilot, Claude, etc.) to help write code or docs, please say so briefly in the PR description. Disclosure is encouraged so reviewers can give appropriate attention — it is not a reason to reject a contribution.

## Quality bar & maintainers

- Project quality standards: [docs/quality-bar.md](./docs/quality-bar.md)
- Maintainer review / merge criteria: [MAINTAINING.md](./MAINTAINING.md)
- Community contributors log (maintainers): [docs/contributors-tracker.md](./docs/contributors-tracker.md)

## Code of Conduct

By participating, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Questions?

Open a discussion or issue on the repository. Feature ideas can use the **Feature request** or **New tool** issue templates.
