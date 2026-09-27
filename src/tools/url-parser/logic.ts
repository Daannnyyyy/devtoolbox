export interface ParsedUrl {
  href: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  queryParams: Array<{ key: string; value: string }>;
}

export type UrlParseResult = { ok: true; value: ParsedUrl } | { ok: false; error: string };

export interface UrlBuildInput {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
}

export type UrlBuildResult = { ok: true; href: string } | { ok: false; error: string };

function paramsFromSearch(search: string): Array<{ key: string; value: string }> {
  const q = search.startsWith('?') ? search.slice(1) : search;
  if (!q) return [];
  const params = new URLSearchParams(q);
  const rows: Array<{ key: string; value: string }> = [];
  for (const [key, value] of params.entries()) {
    rows.push({ key, value });
  }
  return rows;
}

export function parseUrl(raw: string): UrlParseResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: 'Input is empty.' };
  }
  try {
    const url = new URL(trimmed);
    return {
      ok: true,
      value: {
        href: url.href,
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        queryParams: paramsFromSearch(url.search),
      },
    };
  } catch {
    return { ok: false, error: 'Invalid URL. Include a scheme, e.g. https://example.com/path' };
  }
}

export function buildUrl(parts: UrlBuildInput): UrlBuildResult {
  const protocol = (parts.protocol ?? 'https').replace(/:?$/, '');
  const hostname = (parts.hostname ?? '').trim();
  if (!hostname) {
    return { ok: false, error: 'Hostname is required.' };
  }
  try {
    const url = new URL(`${protocol}://placeholder`);
    url.hostname = hostname;
    if (parts.port) url.port = parts.port;
    if (parts.username) url.username = parts.username;
    if (parts.password) url.password = parts.password;
    url.pathname = parts.pathname?.trim() ? parts.pathname : '/';
    const search = parts.search?.trim() ?? '';
    url.search = search && !search.startsWith('?') ? `?${search}` : search;
    const hash = parts.hash?.trim() ?? '';
    url.hash = hash && !hash.startsWith('#') ? `#${hash}` : hash;
    return { ok: true, href: url.href };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not build URL.';
    return { ok: false, error: message };
  }
}
