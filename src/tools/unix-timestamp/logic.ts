export type TimestampUnit = 's' | 'ms';

export type TimestampParseResult =
  | {
      ok: true;
      epochMs: number;
      unit: TimestampUnit;
      isoUtc: string;
      isoLocal: string;
      unixSeconds: number;
      unixMillis: number;
    }
  | { ok: false; error: string };

export type IsoParseResult =
  | {
      ok: true;
      epochMs: number;
      isoUtc: string;
      isoLocal: string;
      unixSeconds: number;
      unixMillis: number;
    }
  | { ok: false; error: string };

function formatLocalIso(date: Date): string {
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  const ms = pad(date.getMilliseconds(), 3);
  const offsetMin = -date.getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const oh = pad(Math.floor(abs / 60));
  const om = pad(abs % 60);
  return `${y}-${m}-${d}T${h}:${min}:${s}.${ms}${sign}${oh}:${om}`;
}

function fromEpochMs(epochMs: number, unit: TimestampUnit): TimestampParseResult {
  if (!Number.isFinite(epochMs)) {
    return { ok: false, error: 'Timestamp must be a finite number.' };
  }
  const date = new Date(epochMs);
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: 'Invalid date from timestamp.' };
  }
  return {
    ok: true,
    epochMs,
    unit,
    isoUtc: date.toISOString(),
    isoLocal: formatLocalIso(date),
    unixSeconds: Math.floor(epochMs / 1000),
    unixMillis: Math.trunc(epochMs),
  };
}

/** Detect seconds vs milliseconds by magnitude (10 digits ≈ seconds). */
export function detectUnit(raw: string): TimestampUnit {
  const digits = raw.trim().replace(/^-/, '').split('.')[0] ?? '';
  return digits.length <= 10 ? 's' : 'ms';
}

export function parseUnixTimestamp(raw: string, unit?: TimestampUnit): TimestampParseResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: 'Input is empty.' };
  }
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { ok: false, error: 'Enter a numeric Unix timestamp.' };
  }
  const num = Number(trimmed);
  if (!Number.isFinite(num)) {
    return { ok: false, error: 'Timestamp must be a finite number.' };
  }
  const resolved = unit ?? detectUnit(trimmed);
  const epochMs = resolved === 's' ? num * 1000 : num;
  return fromEpochMs(epochMs, resolved);
}

export function parseIsoDate(raw: string): IsoParseResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: 'Input is empty.' };
  }
  const ms = Date.parse(trimmed);
  if (Number.isNaN(ms)) {
    return { ok: false, error: 'Could not parse as an ISO / date string.' };
  }
  const date = new Date(ms);
  return {
    ok: true,
    epochMs: ms,
    isoUtc: date.toISOString(),
    isoLocal: formatLocalIso(date),
    unixSeconds: Math.floor(ms / 1000),
    unixMillis: ms,
  };
}

export function nowTimestamp(): TimestampParseResult {
  return fromEpochMs(Date.now(), 'ms');
}
