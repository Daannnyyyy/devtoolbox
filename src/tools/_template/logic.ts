/**
 * Pure helpers for this tool. Keep UI out of this file so unit tests stay simple.
 * Replace these stubs with your real transforms.
 */

export type ExampleResult = { ok: true; value: string } | { ok: false; error: string };

/** Example transform — delete or rename when implementing a real tool. */
export function exampleTransform(input: string): ExampleResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: 'Input is empty.' };
  }
  return { ok: true, value: trimmed };
}
