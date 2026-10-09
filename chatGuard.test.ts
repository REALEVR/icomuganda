import test from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter, validateChatBody, MAX_MESSAGE_CHARS } from "./chatGuard.ts";

test("rejects non-string and empty messages", () => {
  assert.equal(validateChatBody({ message: 5 }).ok, false);
  assert.equal(validateChatBody({ message: "   " }).ok, false);
  assert.equal(validateChatBody(null).ok, false);
});

test("rejects oversized message", () => {
  assert.equal(validateChatBody({ message: "a".repeat(MAX_MESSAGE_CHARS + 1) }).ok, false);
});

test("rejects malformed history entries", () => {
  assert.equal(validateChatBody({ message: "hi", history: [{ role: "admin", text: "x" }] }).ok, false);
  assert.equal(validateChatBody({ message: "hi", history: "nope" }).ok, false);
});

test("accepts a valid body and defaults history to empty", () => {
  const r = validateChatBody({ message: "hello" });
  assert.deepEqual(r.ok && r.value, { message: "hello", history: [] });
});

test("rate limiter blocks after the limit and resets after the window", () => {
  let t = 0;
  const allow = createRateLimiter(2, 1000, () => t);
  assert.equal(allow("a"), true);
  assert.equal(allow("a"), true);
  assert.equal(allow("a"), false);
  assert.equal(allow("b"), true);
  t = 1000;
  assert.equal(allow("a"), true);
});
