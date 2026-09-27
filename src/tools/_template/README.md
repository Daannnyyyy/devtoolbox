# Tool template

Copy this folder:

```bash
cp -r src/tools/_template src/tools/my-tool
```

Then:

1. Edit `index.ts` — set `id` (must match folder name), `name`, `description`, `category`, `keywords`
2. Replace `logic.ts` with pure helpers; keep Vitest coverage in `logic.test.ts`
3. Implement `mount(container)` using shared CSS (`.tool-ui`, `.grid-2`, `.field`, `.field-label`, `.btn`, `.btn-primary`, `.btn-ghost`, `.status`, `.status-ok` / `.status-error` / `.status-info`)
4. Optionally return a cleanup function from `mount` when you add listeners or timers
5. Reuse helpers from `src/core/dom.ts` (`copyText`, `flashCopy`) when you need clipboard UX

The registry skips `_template` and loads every other `src/tools/*/index.ts` automatically — **do not edit** `src/core/registry.ts`.

Do not add npm dependencies without discussion on the issue first. Prefer Web Crypto / built-in browser APIs.

See seed tools (`base64`, `json-formatter`, `unix-timestamp`, `url-parser`) and [CONTRIBUTING.md](../../../CONTRIBUTING.md).
