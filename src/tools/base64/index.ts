import { copyText, flashCopy } from '../../core/dom';
import type { ToolDefinition } from '../../core/types';
import { decodeBase64, encodeBase64 } from './logic';

export const tool: ToolDefinition = {
  id: 'base64',
  name: 'Base64',
  description: 'Encode and decode UTF-8 text as Base64. Invalid input surfaces a clear error.',
  category: 'Encoding',
  keywords: ['base64', 'encode', 'decode', 'utf-8'],
  mount(container) {
    container.innerHTML = `
      <div class="tool-ui">
        <div class="grid-2">
          <div class="field">
            <label class="field-label" for="b64-input">Input</label>
            <textarea id="b64-input" spellcheck="false" placeholder="Text to encode, or Base64 to decode"></textarea>
          </div>
          <div class="field">
            <label class="field-label" for="b64-output">Output</label>
            <textarea id="b64-output" spellcheck="false" readonly placeholder="Result appears here"></textarea>
          </div>
        </div>
        <div class="tool-actions">
          <button type="button" class="btn btn-primary" id="b64-encode">Encode</button>
          <button type="button" class="btn" id="b64-decode">Decode</button>
          <button type="button" class="btn btn-ghost" id="b64-copy">Copy output</button>
          <button type="button" class="btn btn-ghost" id="b64-clear">Clear</button>
        </div>
        <p class="status status-info" id="b64-status" hidden></p>
      </div>
    `;

    const input = container.querySelector('#b64-input') as HTMLTextAreaElement;
    const output = container.querySelector('#b64-output') as HTMLTextAreaElement;
    const status = container.querySelector('#b64-status') as HTMLParagraphElement;
    const encodeBtn = container.querySelector('#b64-encode') as HTMLButtonElement;
    const decodeBtn = container.querySelector('#b64-decode') as HTMLButtonElement;
    const copyBtn = container.querySelector('#b64-copy') as HTMLButtonElement;
    const clearBtn = container.querySelector('#b64-clear') as HTMLButtonElement;

    function setStatus(kind: 'ok' | 'error' | 'info', message: string): void {
      status.hidden = false;
      status.className = `status status-${kind}`;
      status.textContent = message;
    }

    encodeBtn.addEventListener('click', () => {
      const result = encodeBase64(input.value);
      if (!result.ok) {
        output.value = '';
        setStatus('error', result.error);
        return;
      }
      output.value = result.value;
      setStatus('ok', 'Encoded to Base64.');
    });

    decodeBtn.addEventListener('click', () => {
      const result = decodeBase64(input.value);
      if (!result.ok) {
        output.value = '';
        setStatus('error', result.error);
        return;
      }
      output.value = result.value;
      setStatus('ok', 'Decoded from Base64.');
    });

    copyBtn.addEventListener('click', async () => {
      if (!output.value) {
        setStatus('info', 'Nothing to copy.');
        return;
      }
      flashCopy(copyBtn, await copyText(output.value));
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      output.value = '';
      status.hidden = true;
    });
  },
};

export default tool;
