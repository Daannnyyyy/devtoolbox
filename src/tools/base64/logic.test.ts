import { describe, expect, it } from 'vitest';
import { decodeBase64, encodeBase64 } from './logic';

describe('base64 logic', () => {
  it('encodes ASCII text', () => {
    expect(encodeBase64('hello')).toEqual({ ok: true, value: 'aGVsbG8=' });
  });

  it('decodes ASCII text', () => {
    expect(decodeBase64('aGVsbG8=')).toEqual({ ok: true, value: 'hello' });
  });

  it('round-trips unicode', () => {
    const original = 'café 🧰';
    const encoded = encodeBase64(original);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeBase64(encoded.value)).toEqual({ ok: true, value: original });
  });

  it('allows whitespace in decode input', () => {
    expect(decodeBase64('aGVs\nbG8=')).toEqual({ ok: true, value: 'hello' });
  });

  it('rejects empty decode', () => {
    const result = decodeBase64('   ');
    expect(result.ok).toBe(false);
  });

  it('rejects invalid characters', () => {
    const result = decodeBase64('@@@');
    expect(result.ok).toBe(false);
  });

  it('rejects wrong padding / length', () => {
    const result = decodeBase64('aGVsbG8');
    expect(result.ok).toBe(false);
  });

  it('encodes empty string', () => {
    expect(encodeBase64('')).toEqual({ ok: true, value: '' });
  });
});
