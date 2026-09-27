export type JsonResult =
  { ok: true; value: unknown; formatted: string; minified: string } | { ok: false; error: string };

export function parseJson(input: string): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: 'Input is empty.' };
  }
  try {
    const value = JSON.parse(trimmed) as unknown;
    return {
      ok: true,
      value,
      formatted: JSON.stringify(value, null, 2),
      minified: JSON.stringify(value),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON.';
    return { ok: false, error: message };
  }
}

export function formatJson(input: string): JsonResult {
  return parseJson(input);
}

export function minifyJson(input: string): JsonResult {
  return parseJson(input);
}

export function validateJson(input: string): { ok: true } | { ok: false; error: string } {
  const result = parseJson(input);
  if (result.ok) return { ok: true };
  return { ok: false, error: result.error };
}
