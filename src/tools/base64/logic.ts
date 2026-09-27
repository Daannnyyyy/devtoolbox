export type Base64Result = { ok: true; value: string } | { ok: false; error: string };

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Encode UTF-8 text to Base64. */
export function encodeBase64(text: string): Base64Result {
  try {
    const bytes = new TextEncoder().encode(text);
    return { ok: true, value: bytesToBase64(bytes) };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Encode failed.';
    return { ok: false, error: message };
  }
}

/** Decode Base64 to UTF-8 text. Rejects invalid Base64. */
export function decodeBase64(input: string): Base64Result {
  const cleaned = input.replace(/\s+/g, '');
  if (!cleaned) {
    return { ok: false, error: 'Input is empty.' };
  }
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned) || cleaned.length % 4 !== 0) {
    return { ok: false, error: 'Invalid Base64 string.' };
  }
  try {
    const bytes = base64ToBytes(cleaned);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { ok: true, value: text };
  } catch {
    return { ok: false, error: 'Invalid Base64 or non-UTF-8 payload.' };
  }
}
