// Input validation and per-IP rate limiting for POST /api/chat.
// Kept dependency-free and in-memory: fine for a single server instance.

export const MAX_MESSAGE_CHARS = 1000;
export const MAX_HISTORY_ITEMS = 20;
export const MAX_HISTORY_TEXT_CHARS = 1000;
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 10;

export type ChatTurn = { role: "user" | "model"; text: string };
export type ChatInput = { message: string; history: ChatTurn[] };

export function parseChatInput(body: unknown): { ok: true; value: ChatInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const { message, history } = body as Record<string, unknown>;

  if (typeof message !== "string" || message.trim() === "") {
    return { ok: false, error: "message must be a non-empty string." };
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return { ok: false, error: `message must be at most ${MAX_MESSAGE_CHARS} characters.` };
  }

  if (history === undefined) return { ok: true, value: { message, history: [] } };
  if (!Array.isArray(history) || history.length > MAX_HISTORY_ITEMS) {
    return { ok: false, error: `history must be an array of at most ${MAX_HISTORY_ITEMS} items.` };
  }

  const turns: ChatTurn[] = [];
  for (const item of history) {
    const turn = item as Partial<ChatTurn> | null;
    const validRole = turn?.role === "user" || turn?.role === "model";
    if (!validRole || typeof turn?.text !== "string" || turn.text.length > MAX_HISTORY_TEXT_CHARS) {
      return { ok: false, error: "history contains an invalid entry." };
    }
    turns.push({ role: turn.role as ChatTurn["role"], text: turn.text });
  }
  return { ok: true, value: { message, history: turns } };
}

/** Returns a checker that says whether a key (e.g. an IP) may make another request now. */
export function createRateLimiter(
  maxRequests = RATE_LIMIT_MAX_REQUESTS,
  windowMs = RATE_LIMIT_WINDOW_MS,
  now: () => number = Date.now,
) {
  const hits = new Map<string, number[]>();
  return function allow(key: string): boolean {
    const t = now();
    const recent = (hits.get(key) ?? []).filter((ts) => t - ts < windowMs);
    if (recent.length >= maxRequests) {
      hits.set(key, recent);
      return false;
    }
    recent.push(t);
    hits.set(key, recent);
    // Drop idle keys so the map cannot grow without bound.
    if (hits.size > 10_000) {
      for (const [k, v] of hits) if (v.every((ts) => t - ts >= windowMs)) hits.delete(k);
    }
    return true;
  };
}
