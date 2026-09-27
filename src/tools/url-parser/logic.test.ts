import { describe, expect, it } from 'vitest';
import { buildUrl, parseUrl } from './logic';

describe('url-parser logic', () => {
  it('parses a full URL', () => {
    const result = parseUrl('https://user:pass@example.com:8443/path?x=1&y=two#frag');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.protocol).toBe('https:');
    expect(result.value.username).toBe('user');
    expect(result.value.password).toBe('pass');
    expect(result.value.hostname).toBe('example.com');
    expect(result.value.port).toBe('8443');
    expect(result.value.pathname).toBe('/path');
    expect(result.value.hash).toBe('#frag');
    expect(result.value.queryParams).toEqual([
      { key: 'x', value: '1' },
      { key: 'y', value: 'two' },
    ]);
  });

  it('parses query with duplicate keys', () => {
    const result = parseUrl('https://example.com/?a=1&a=2');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.queryParams).toEqual([
      { key: 'a', value: '1' },
      { key: 'a', value: '2' },
    ]);
  });

  it('rejects empty and invalid URLs', () => {
    expect(parseUrl('').ok).toBe(false);
    expect(parseUrl('not a url').ok).toBe(false);
    expect(parseUrl('/relative').ok).toBe(false);
  });

  it('builds a URL from parts', () => {
    const result = buildUrl({
      protocol: 'https',
      hostname: 'example.com',
      pathname: '/docs',
      search: 'q=1',
      hash: 'top',
    });
    expect(result).toEqual({ ok: true, href: 'https://example.com/docs?q=1#top' });
  });

  it('requires hostname when building', () => {
    expect(buildUrl({ protocol: 'https' }).ok).toBe(false);
  });

  it('handles empty path as root', () => {
    const result = buildUrl({ hostname: 'example.com' });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.href).toBe('https://example.com/');
  });
});
