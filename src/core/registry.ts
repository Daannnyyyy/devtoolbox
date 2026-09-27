import type { ToolDefinition, ToolModule } from './types';

const modules = import.meta.glob('../tools/*/index.ts', { eager: true }) as Record<
  string,
  ToolModule
>;

function resolveDefinition(mod: ToolModule): ToolDefinition | null {
  const def = mod.default ?? mod.tool;
  if (!def || typeof def !== 'object') return null;
  if (!def.id || typeof def.mount !== 'function') return null;
  return def;
}

function pathToolFolder(path: string): string {
  // e.g. ../tools/json-formatter/index.ts -> json-formatter
  const match = path.match(/\/tools\/([^/]+)\/index\.ts$/);
  return match?.[1] ?? '';
}

const tools: ToolDefinition[] = Object.entries(modules)
  .filter(([path]) => pathToolFolder(path) !== '_template')
  .map(([, mod]) => resolveDefinition(mod))
  .filter((t): t is ToolDefinition => t !== null)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((t) => t.id === id);
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((t) => {
    const hay = [t.name, t.description, t.category, ...(t.keywords ?? [])]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}
