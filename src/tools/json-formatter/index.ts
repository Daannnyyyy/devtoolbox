import { copyText, flashCopy } from '../../core/dom';
import type { ToolDefinition } from '../../core/types';
import { formatJson, minifyJson, validateJson } from './logic';

export const tool: ToolDefinition = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  description: 'Format, minify, and validate JSON with clear error messages.',
  category: 'Data',
  keywords: ['json', 'pretty', 'minify', 'validate', 'format'],
  mount(container) {
    container.innerHTML = `
      <div class="tool-ui">
        <div class="grid-2">
          <div class="field">
            <label class="field-label" for="json-input">Input</label>
            <textarea id="json-input" spellcheck="false" placeholder='{"hello":"world"}'></textarea>
          </div>
          <div class="field">
            <label class="field-label" for="json-output">Output</label>
            <textarea id="json-output" spellcheck="false" readonly placeholder="Result appears here"></textarea>
          </div>
        </div>
        <div class="tool-actions">
          <button type="button" class="btn btn-primary" id="json-format">Format</button>
          <button type="button" class="btn" id="json-minify">Minify</button>
          <button type="button" class="btn" id="json-validate">Validate</button>
          <button type="button" class="btn btn-ghost" id="json-copy">Copy output</button>
          <button type="button" class="btn btn-ghost" id="json-clear">Clear</button>
        </div>
        <p class="status status-info" id="json-status" hidden></p>
      </div>
    `;

    const input = container.querySelector('#json-input') as HTMLTextAreaElement;
    const output = container.querySelector('#json-output') as HTMLTextAreaElement;
    const status = container.querySelector('#json-status') as HTMLParagraphElement;
    const formatBtn = container.querySelector('#json-format') as HTMLButtonElement;
    const minifyBtn = container.querySelector('#json-minify') as HTMLButtonElement;
    const validateBtn = container.querySelector('#json-validate') as HTMLButtonElement;
    const copyBtn = container.querySelector('#json-copy') as HTMLButtonElement;
    const clearBtn = container.querySelector('#json-clear') as HTMLButtonElement;

    function setStatus(kind: 'ok' | 'error' | 'info', message: string): void {
      status.hidden = false;
      status.className = `status status-${kind}`;
      status.textContent = message;
    }

    function hideStatus(): void {
      status.hidden = true;
      status.textContent = '';
    }

    formatBtn.addEventListener('click', () => {
      const result = formatJson(input.value);
      if (!result.ok) {
        output.value = '';
        setStatus('error', result.error);
        return;
      }
      output.value = result.formatted;
      setStatus('ok', 'Valid JSON — formatted.');
    });

    minifyBtn.addEventListener('click', () => {
      const result = minifyJson(input.value);
      if (!result.ok) {
        output.value = '';
        setStatus('error', result.error);
        return;
      }
      output.value = result.minified;
      setStatus('ok', 'Valid JSON — minified.');
    });

    validateBtn.addEventListener('click', () => {
      const result = validateJson(input.value);
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      setStatus('ok', 'Valid JSON.');
    });

    copyBtn.addEventListener('click', async () => {
      if (!output.value) {
        setStatus('info', 'Nothing to copy.');
        return;
      }
      const ok = await copyText(output.value);
      flashCopy(copyBtn, ok);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      hideStatus();
    });
  },
};

export default tool;
