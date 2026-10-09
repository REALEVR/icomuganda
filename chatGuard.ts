// Request validation and per-IP rate limiting for POST /api/chat.
// Kept free of Express/Gemini imports so it can be unit tested on its own.

export const MAX_MESSAGE_CHARS = 1000;
export const MAX_HISTORY_ITEMS = 20;
export const MAX_HISTORY_TEXT_CHARS = 1000;
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 10;

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

export interface ChatInput {
  message: string;
  history: ChatTurn[];
}

export type ValidationResult =
  | { ok: true; value: ChatInput }
  | { ok: false; error: string };

export function validateChatBody(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }
  const { message, history = [] } = body as Record<string, unknown>;

  if (typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, error: "message must be a non-empty string" };
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return { ok: false, error: `message must be at most ${MAX_MESSAGE_CHARS} characters` };
  }
  if (!Array.isArray(history) || history.length > MAX_HISTORY_ITEMS) {
    return { ok: false, error: `history must be an array of at most ${MAX_HISTORY_ITEMS} items` };
  }

  const turns: ChatTurn[] = [];
  for (const turn of history) {
    const t = turn as Partial<ChatTurn> | null;
    if (
      !t ||
      (t.role !== "user" && t.role !== "model") ||
      typeof t.text !== "string" ||
      t.text.length > MAX_HISTORY_TEXT_CHARS
    ) {
      return { ok: false, error: "history contains an invalid entry" };
    }
    turns.push({ role: t.role, text: t.text });
  }

  return { ok: true, value: { message, history: turns } };
}

// Fixed-window counter per key (IP). Returns a function that reports whether
// the request is allowed. Expired windows are pruned on each call to keep the
// map bounded.
export function createRateLimiter(
  maxRequests = RATE_LIMIT_MAX_REQUESTS,
  windowMs = RATE_LIMIT_WINDOW_MS,
  now: () => number = Date.now,
) {
  const windows = new Map<string, { start: number; count: number }>();

  return function allow(key: string): boolean {
    const t = now();
    for (const [k, w] of windows) {
      if (t - w.start >= windowMs) windows.delete(k);
    }
    const current = windows.get(key);
    if (!current) {
      windows.set(key, { start: t, count: 1 });
      return true;
    }
    if (current.count >= maxRequests) return false;
    current.count += 1;
    return true;
  };
}
