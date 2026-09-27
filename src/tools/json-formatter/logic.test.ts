import { describe, expect, it } from 'vitest';
import { formatJson, minifyJson, parseJson, validateJson } from './logic';

describe('json-formatter logic', () => {
  it('formats valid objects', () => {
    const result = formatJson('{"a":1,"b":[true,null]}');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.formatted).toBe('{\n  "a": 1,\n  "b": [\n    true,\n    null\n  ]\n}');
  });

  it('minifies valid arrays', () => {
    const result = minifyJson('[ 1,  2, 3 ]');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.minified).toBe('[1,2,3]');
  });

  it('rejects empty input', () => {
    expect(parseJson('   ').ok).toBe(false);
  });

  it('rejects invalid JSON with a message', () => {
    const result = parseJson('{a:1}');
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.length).toBeGreaterThan(0);
  });

  it('validateJson succeeds for primitives', () => {
    expect(validateJson('"hello"')).toEqual({ ok: true });
    expect(validateJson('42')).toEqual({ ok: true });
    expect(validateJson('null')).toEqual({ ok: true });
  });

  it('validateJson fails for trailing commas', () => {
    const result = validateJson('{"a":1,}');
    expect(result.ok).toBe(false);
  });

  it('preserves unicode', () => {
    const result = parseJson('{"emoji":"🧰"}');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect((result.value as { emoji: string }).emoji).toBe('🧰');
  });
});
