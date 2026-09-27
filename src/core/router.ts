export type RouteHandler = (toolId: string | null) => void;

const listeners = new Set<RouteHandler>();

export function getToolIdFromHash(): string | null {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return null;
  const id = hash.split(/[/?#]/)[0];
  return id || null;
}

export function navigateToTool(toolId: string | null): void {
  const next = toolId ? `#/${toolId}` : '#/';
  if (window.location.hash === next) {
    notify(toolId);
    return;
  }
  window.location.hash = next;
}

function notify(toolId: string | null): void {
  for (const fn of listeners) fn(toolId);
}

export function onRouteChange(handler: RouteHandler): () => void {
  listeners.add(handler);
  return () => listeners.delete(handler);
}

export function startRouter(): void {
  window.addEventListener('hashchange', () => {
    notify(getToolIdFromHash());
  });
  notify(getToolIdFromHash());
}
