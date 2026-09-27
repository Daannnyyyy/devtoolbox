import type { ToolDefinition } from '../../core/types';
import { exampleTransform } from './logic';

/**
 * Copy this folder to `src/tools/<your-id>/` and customize.
 * Export a ToolDefinition as default (or named `tool`).
 * The registry auto-discovers folders; do not edit registry.ts.
 *
 * Checklist:
 * 1. `cp -r src/tools/_template src/tools/my-tool`
 * 2. Set id/name/description/category/keywords (id should match folder name)
 * 3. Implement pure logic + Vitest tests
 * 4. Wire UI in `mount` with shared CSS classes
 * 5. Run `npm test && npm run typecheck && npm run lint && npm run build`
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
        <div class="field">
          <label class="field-label" for="tpl-input">Input</label>
          <textarea id="tpl-input" spellcheck="false" placeholder="Type something"></textarea>
        </div>
        <div class="tool-actions">
          <button type="button" class="btn btn-primary" id="tpl-run">Run</button>
        </div>
        <p class="status status-info" id="tpl-status" hidden></p>
      </div>
    `;

    const input = container.querySelector('#tpl-input') as HTMLTextAreaElement;
    const status = container.querySelector('#tpl-status') as HTMLParagraphElement;
    const runBtn = container.querySelector('#tpl-run') as HTMLButtonElement;

    runBtn.addEventListener('click', () => {
      const result = exampleTransform(input.value);
      status.hidden = false;
      if (!result.ok) {
        status.className = 'status status-error';
        status.textContent = result.error;
        return;
      }
      status.className = 'status status-ok';
      status.textContent = `OK: ${result.value}`;
    });
  },
};

export default tool;
