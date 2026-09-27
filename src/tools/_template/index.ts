import type { ToolDefinition } from '../../core/types';

/**
 * Copy this folder to `src/tools/<your-id>/` and customize.
 * Export a ToolDefinition as default (or named `tool`).
 * The registry auto-discovers folders; do not edit registry.ts.
 *
 * README snippet:
 * 1. `cp -r src/tools/_template src/tools/my-tool`
 * 2. Implement pure logic + tests
 * 3. Wire UI in `mount`
 * 4. Run `npm test && npm run typecheck`
 */
export const tool: ToolDefinition = {
  id: 'template-example',
  name: 'Template Example',
  description: 'Replace this with your tool description.',
  category: 'Template',
  keywords: ['example'],
  mount(container) {
    container.innerHTML = `
      <div class="tool-ui">
        <p class="muted">This is the tool template. Replace me.</p>
      </div>
    `;
  },
};

export default tool;
