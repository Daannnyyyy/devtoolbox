import { describe, expect, it } from 'vitest';
import { detectUnit, nowTimestamp, parseIsoDate, parseUnixTimestamp } from './logic';

describe('unix-timestamp logic', () => {
  it('detects seconds for 10-digit values', () => {
    expect(detectUnit('1700000000')).toBe('s');
  });

  it('detects milliseconds for 13-digit values', () => {
    expect(detectUnit('1700000000000')).toBe('ms');
  });

  it('parses unix seconds to UTC ISO', () => {
    const result = parseUnixTimestamp('0', 's');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isoUtc).toBe('1970-01-01T00:00:00.000Z');
    expect(result.unixSeconds).toBe(0);
    expect(result.unixMillis).toBe(0);
  });

  it('parses unix milliseconds', () => {
    const result = parseUnixTimestamp('1000', 'ms');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.isoUtc).toBe('1970-01-01T00:00:01.000Z');
  });

  it('rejects empty and non-numeric input', () => {
    expect(parseUnixTimestamp('').ok).toBe(false);
    expect(parseUnixTimestamp('abc').ok).toBe(false);
  });

  it('parses ISO UTC strings', () => {
    const result = parseIsoDate('2020-01-01T00:00:00.000Z');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.unixSeconds).toBe(1577836800);
    expect(result.isoUtc).toBe('2020-01-01T00:00:00.000Z');
  });

  it('rejects invalid ISO', () => {
    expect(parseIsoDate('not-a-date').ok).toBe(false);
  });

  it('nowTimestamp returns a recent value', () => {
    const before = Date.now();
    const result = nowTimestamp();
    const after = Date.now();
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.unixMillis).toBeGreaterThanOrEqual(before);
    expect(result.unixMillis).toBeLessThanOrEqual(after);
  });
});
