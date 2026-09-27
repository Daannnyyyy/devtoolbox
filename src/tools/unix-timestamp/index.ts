import { copyText, flashCopy } from '../../core/dom';
import type { ToolDefinition } from '../../core/types';
import { nowTimestamp, parseIsoDate, parseUnixTimestamp, type TimestampUnit } from './logic';

export const tool: ToolDefinition = {
  id: 'unix-timestamp',
  name: 'Unix Timestamp',
  description: 'Convert Unix timestamps (seconds or milliseconds) to local/UTC ISO and back.',
  category: 'Time',
  keywords: ['unix', 'epoch', 'timestamp', 'iso', 'date'],
  mount(container) {
    container.innerHTML = `
      <div class="tool-ui">
        <div class="grid-2">
          <div class="field">
            <label class="field-label" for="ts-unix">Unix timestamp</label>
            <input id="ts-unix" type="text" inputmode="decimal" placeholder="e.g. 1700000000" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="ts-unit">Unit</label>
            <select id="ts-unit">
              <option value="auto">Auto-detect</option>
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="field-label" for="ts-iso">ISO / date string</label>
          <input id="ts-iso" type="text" placeholder="e.g. 2024-01-01T00:00:00.000Z" autocomplete="off" />
        </div>
        <div class="tool-actions">
          <button type="button" class="btn btn-primary" id="ts-from-unix">From Unix</button>
          <button type="button" class="btn" id="ts-from-iso">From ISO</button>
          <button type="button" class="btn" id="ts-now">Now</button>
          <button type="button" class="btn btn-ghost" id="ts-copy">Copy UTC ISO</button>
        </div>
        <div class="table-wrap">
          <table class="data-table" aria-label="Converted timestamp">
            <tbody>
              <tr><th scope="row">UTC ISO</th><td><code id="ts-out-utc">—</code></td></tr>
              <tr><th scope="row">Local ISO</th><td><code id="ts-out-local">—</code></td></tr>
              <tr><th scope="row">Unix (s)</th><td><code id="ts-out-s">—</code></td></tr>
              <tr><th scope="row">Unix (ms)</th><td><code id="ts-out-ms">—</code></td></tr>
            </tbody>
          </table>
        </div>
        <p class="status status-info" id="ts-status" hidden></p>
      </div>
    `;

    const unixInput = container.querySelector('#ts-unix') as HTMLInputElement;
    const isoInput = container.querySelector('#ts-iso') as HTMLInputElement;
    const unitSelect = container.querySelector('#ts-unit') as HTMLSelectElement;
    const outUtc = container.querySelector('#ts-out-utc') as HTMLElement;
    const outLocal = container.querySelector('#ts-out-local') as HTMLElement;
    const outS = container.querySelector('#ts-out-s') as HTMLElement;
    const outMs = container.querySelector('#ts-out-ms') as HTMLElement;
    const status = container.querySelector('#ts-status') as HTMLParagraphElement;
    const fromUnixBtn = container.querySelector('#ts-from-unix') as HTMLButtonElement;
    const fromIsoBtn = container.querySelector('#ts-from-iso') as HTMLButtonElement;
    const nowBtn = container.querySelector('#ts-now') as HTMLButtonElement;
    const copyBtn = container.querySelector('#ts-copy') as HTMLButtonElement;

    let lastUtc = '';

    function setStatus(kind: 'ok' | 'error' | 'info', message: string): void {
      status.hidden = false;
      status.className = `status status-${kind}`;
      status.textContent = message;
    }

    function applyResult(data: {
      isoUtc: string;
      isoLocal: string;
      unixSeconds: number;
      unixMillis: number;
    }): void {
      outUtc.textContent = data.isoUtc;
      outLocal.textContent = data.isoLocal;
      outS.textContent = String(data.unixSeconds);
      outMs.textContent = String(data.unixMillis);
      lastUtc = data.isoUtc;
      unixInput.value = String(data.unixSeconds);
      isoInput.value = data.isoUtc;
    }

    fromUnixBtn.addEventListener('click', () => {
      const unitValue = unitSelect.value;
      const unit: TimestampUnit | undefined =
        unitValue === 's' || unitValue === 'ms' ? unitValue : undefined;
      const result = parseUnixTimestamp(unixInput.value, unit);
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      applyResult(result);
      setStatus('ok', `Parsed as ${result.unit === 's' ? 'seconds' : 'milliseconds'}.`);
    });

    fromIsoBtn.addEventListener('click', () => {
      const result = parseIsoDate(isoInput.value);
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      applyResult(result);
      setStatus('ok', 'Parsed ISO / date string.');
    });

    nowBtn.addEventListener('click', () => {
      const result = nowTimestamp();
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      applyResult(result);
      setStatus('ok', 'Using current time.');
    });

    copyBtn.addEventListener('click', async () => {
      if (!lastUtc) {
        setStatus('info', 'Nothing to copy yet.');
        return;
      }
      flashCopy(copyBtn, await copyText(lastUtc));
    });
  },
};

export default tool;
