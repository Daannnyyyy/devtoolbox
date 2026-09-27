import { describe, expect, it } from 'vitest';
import { exampleTransform } from './logic';

describe('exampleTransform', () => {
  it('returns trimmed value for non-empty input', () => {
    expect(exampleTransform('  hello  ')).toEqual({ ok: true, value: 'hello' });
  });

  it('rejects empty input', () => {
    expect(exampleTransform('   ')).toEqual({ ok: false, error: 'Input is empty.' });
  });
});
