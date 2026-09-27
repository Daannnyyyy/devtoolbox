import { getAllTools, getToolById, searchTools } from './registry';
import { getToolIdFromHash, navigateToTool, onRouteChange } from './router';
import type { ToolDefinition } from './types';

const THEME_KEY = 'devtoolbox-theme';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function createApp(root: HTMLElement): void {
  let cleanup: void | (() => void);
  let activeId: string | null = null;

  root.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" aria-label="Tools">
        <div class="sidebar-header">
          <a href="#/" class="brand" id="brand-link">
            <span class="brand-mark" aria-hidden="true">🧰</span>
            <span class="brand-text">DevToolbox</span>
          </a>
          <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <span class="theme-icon" aria-hidden="true"></span>
          </button>
        </div>
        <label class="search-label" for="tool-search">Search tools</label>
        <input
          type="search"
          id="tool-search"
          class="tool-search"
          placeholder="Search tools…"
          autocomplete="off"
          spellcheck="false"
        />
        <nav class="tool-nav" id="tool-nav" aria-label="Available tools"></nav>
        <p class="sidebar-footer">Private · browser-only</p>
      </aside>
      <main class="main" id="main-panel">
        <div class="empty-state" id="empty-state">
          <h1>DevToolbox</h1>
          <p>Fast, private developer tools that run entirely in your browser.</p>
          <p class="muted">Select a tool from the sidebar to get started.</p>
        </div>
        <section class="tool-panel" id="tool-panel" hidden>
          <header class="tool-header">
            <div>
              <p class="tool-category" id="tool-category"></p>
              <h1 id="tool-title"></h1>
              <p class="tool-desc" id="tool-desc"></p>
            </div>
          </header>
          <div class="tool-body" id="tool-body"></div>
        </section>
      </main>
    </div>
  `;

  const themeToggle = root.querySelector('#theme-toggle') as HTMLButtonElement;
  const searchInput = root.querySelector('#tool-search') as HTMLInputElement;
  const toolNav = root.querySelector('#tool-nav') as HTMLElement;
  const emptyState = root.querySelector('#empty-state') as HTMLElement;
  const toolPanel = root.querySelector('#tool-panel') as HTMLElement;
  const toolBody = root.querySelector('#tool-body') as HTMLElement;
  const toolTitle = root.querySelector('#tool-title') as HTMLElement;
  const toolDesc = root.querySelector('#tool-desc') as HTMLElement;
  const toolCategory = root.querySelector('#tool-category') as HTMLElement;
  const brandLink = root.querySelector('#brand-link') as HTMLAnchorElement;

  applyTheme(getPreferredTheme());
  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
    updateThemeButton();
  });

  function updateThemeButton(): void {
    const theme = document.documentElement.getAttribute('data-theme');
    themeToggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme',
    );
    themeToggle.title = theme === 'light' ? 'Dark mode' : 'Light mode';
  }

  brandLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToTool(null);
  });

  function renderNav(list: ToolDefinition[]): void {
    if (list.length === 0) {
      toolNav.innerHTML = `<p class="nav-empty">No tools match your search.</p>`;
      return;
    }

    const byCategory = new Map<string, ToolDefinition[]>();
    for (const t of list) {
      const cat = t.category || 'Other';
      const arr = byCategory.get(cat) ?? [];
      arr.push(t);
      byCategory.set(cat, arr);
    }

    const parts: string[] = [];
    for (const [category, items] of [...byCategory.entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    )) {
      parts.push(`<p class="nav-category">${escapeHtml(category)}</p>`);
      parts.push('<ul class="nav-list">');
      for (const t of items) {
        const active = t.id === activeId ? ' is-active' : '';
        parts.push(
          `<li><button type="button" class="nav-item${active}" data-tool-id="${escapeAttr(t.id)}">${escapeHtml(t.name)}</button></li>`,
        );
      }
      parts.push('</ul>');
    }
    toolNav.innerHTML = parts.join('');
  }

  toolNav.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-tool-id]');
    if (!btn?.dataset.toolId) return;
    navigateToTool(btn.dataset.toolId);
  });

  searchInput.addEventListener('input', () => {
    renderNav(searchTools(searchInput.value));
  });

  function showEmpty(): void {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }
    activeId = null;
    emptyState.hidden = false;
    toolPanel.hidden = true;
    toolBody.innerHTML = '';
    renderNav(searchTools(searchInput.value));
  }

  function showTool(tool: ToolDefinition): void {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }
    activeId = tool.id;
    emptyState.hidden = true;
    toolPanel.hidden = false;
    toolCategory.textContent = tool.category;
    toolTitle.textContent = tool.name;
    toolDesc.textContent = tool.description;
    toolBody.innerHTML = '';
    cleanup = tool.mount(toolBody) ?? undefined;
    renderNav(searchTools(searchInput.value));
  }

  function syncFromRoute(toolId: string | null): void {
    if (!toolId) {
      showEmpty();
      return;
    }
    const tool = getToolById(toolId);
    if (!tool) {
      showEmpty();
      return;
    }
    showTool(tool);
  }

  onRouteChange(syncFromRoute);
  renderNav(getAllTools());
  syncFromRoute(getToolIdFromHash());
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, '&#39;');
}
