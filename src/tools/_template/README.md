# Tool template

Copy this folder:

```bash
cp -r src/tools/_template src/tools/my-tool
```

Then:

1. Rename / edit `index.ts` — set `id`, `name`, `description`, `category`, `keywords`
2. add pure logic modules (e.g. `logic.ts`) and Vitest tests (`logic.test.ts`)
3. implement `mount(container)` UI using shared CSS classes (`.tool-ui`, `.btn`, `.field`, …)
4. optionally return a cleanup function from `mount`

The registry skips `_template` and loads every other `src/tools/*/index.ts` automatically.
