import { copyText, flashCopy } from '../../core/dom';
import type { ToolDefinition } from '../../core/types';
import { buildUrl, parseUrl } from './logic';

export const tool: ToolDefinition = {
  id: 'url-parser',
  name: 'URL Parser',
  description:
    'Parse a URL into protocol, host, path, query parameters, and hash. Optionally rebuild from fields.',
  category: 'Data',
  keywords: ['url', 'uri', 'query', 'parse', 'href'],
  mount(container) {
    container.innerHTML = `
      <div class="tool-ui">
        <div class="field">
          <label class="field-label" for="url-input">URL</label>
          <input id="url-input" type="url" placeholder="https://example.com/path?q=1#hash" autocomplete="off" spellcheck="false" />
        </div>
        <div class="tool-actions">
          <button type="button" class="btn btn-primary" id="url-parse">Parse</button>
          <button type="button" class="btn" id="url-build">Build from fields</button>
          <button type="button" class="btn btn-ghost" id="url-copy">Copy href</button>
          <button type="button" class="btn btn-ghost" id="url-clear">Clear</button>
        </div>
        <div class="grid-2">
          <div class="field">
            <label class="field-label" for="url-protocol">Protocol</label>
            <input id="url-protocol" type="text" placeholder="https" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="url-host">Hostname</label>
            <input id="url-host" type="text" placeholder="example.com" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="url-port">Port</label>
            <input id="url-port" type="text" placeholder="443" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="url-path">Path</label>
            <input id="url-path" type="text" placeholder="/path" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="url-search">Query (without ?)</label>
            <input id="url-search" type="text" placeholder="a=1&amp;b=2" autocomplete="off" />
          </div>
          <div class="field">
            <label class="field-label" for="url-hash">Hash (without #)</label>
            <input id="url-hash" type="text" placeholder="section" autocomplete="off" />
          </div>
        </div>
        <div class="field">
          <label class="field-label" for="url-href">Href</label>
          <input id="url-href" type="text" readonly placeholder="Parsed or built href" />
        </div>
        <div class="table-wrap">
          <table class="data-table" aria-label="Query parameters">
            <thead>
              <tr><th scope="col">Param</th><th scope="col">Value</th></tr>
            </thead>
            <tbody id="url-params">
              <tr><td colspan="2" class="muted">No query parameters</td></tr>
            </tbody>
          </table>
        </div>
        <p class="status status-info" id="url-status" hidden></p>
      </div>
    `;

    const input = container.querySelector('#url-input') as HTMLInputElement;
    const protocol = container.querySelector('#url-protocol') as HTMLInputElement;
    const host = container.querySelector('#url-host') as HTMLInputElement;
    const port = container.querySelector('#url-port') as HTMLInputElement;
    const path = container.querySelector('#url-path') as HTMLInputElement;
    const search = container.querySelector('#url-search') as HTMLInputElement;
    const hash = container.querySelector('#url-hash') as HTMLInputElement;
    const href = container.querySelector('#url-href') as HTMLInputElement;
    const paramsBody = container.querySelector('#url-params') as HTMLTableSectionElement;
    const status = container.querySelector('#url-status') as HTMLParagraphElement;
    const parseBtn = container.querySelector('#url-parse') as HTMLButtonElement;
    const buildBtn = container.querySelector('#url-build') as HTMLButtonElement;
    const copyBtn = container.querySelector('#url-copy') as HTMLButtonElement;
    const clearBtn = container.querySelector('#url-clear') as HTMLButtonElement;

    function setStatus(kind: 'ok' | 'error' | 'info', message: string): void {
      status.hidden = false;
      status.className = `status status-${kind}`;
      status.textContent = message;
    }

    function renderParams(rows: Array<{ key: string; value: string }>): void {
      if (rows.length === 0) {
        paramsBody.innerHTML = `<tr><td colspan="2" class="muted">No query parameters</td></tr>`;
        return;
      }
      paramsBody.innerHTML = rows
        .map(
          (r) =>
            `<tr><td><code>${escapeHtml(r.key)}</code></td><td><code>${escapeHtml(r.value)}</code></td></tr>`,
        )
        .join('');
    }

    parseBtn.addEventListener('click', () => {
      const result = parseUrl(input.value);
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      const v = result.value;
      protocol.value = v.protocol.replace(/:$/, '');
      host.value = v.hostname;
      port.value = v.port;
      path.value = v.pathname;
      search.value = v.search.replace(/^\?/, '');
      hash.value = v.hash.replace(/^#/, '');
      href.value = v.href;
      renderParams(v.queryParams);
      setStatus('ok', 'URL parsed.');
    });

    buildBtn.addEventListener('click', () => {
      const result = buildUrl({
        protocol: protocol.value || 'https',
        hostname: host.value,
        port: port.value,
        pathname: path.value,
        search: search.value,
        hash: hash.value,
      });
      if (!result.ok) {
        setStatus('error', result.error);
        return;
      }
      href.value = result.href;
      input.value = result.href;
      const parsed = parseUrl(result.href);
      if (parsed.ok) renderParams(parsed.value.queryParams);
      setStatus('ok', 'URL built.');
    });

    copyBtn.addEventListener('click', async () => {
      if (!href.value) {
        setStatus('info', 'Nothing to copy.');
        return;
      }
      flashCopy(copyBtn, await copyText(href.value));
    });

    clearBtn.addEventListener('click', () => {
      for (const el of [input, protocol, host, port, path, search, hash, href]) {
        el.value = '';
      }
      renderParams([]);
      status.hidden = true;
    });
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default tool;
