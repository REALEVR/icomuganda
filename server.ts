import express from "express";
import path from "path";
import { GoogleGenAI, Modality } from "@google/genai";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

// Per-IP sliding-window limiter. In-memory, so it resets on restart and is
// per-instance; swap for a shared store if the app is scaled horizontally.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

type HistoryItem = { role: string; text: string };

function validateChatBody(body: any): { message: string; history: HistoryItem[] } | string {
  const { message, history = [] } = body ?? {};
  if (typeof message !== "string" || !message.trim()) {
    return "message must be a non-empty string";
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `message must be at most ${MAX_MESSAGE_LENGTH} characters`;
  }
  if (!Array.isArray(history) || history.length > MAX_HISTORY_ITEMS) {
    return `history must be an array of at most ${MAX_HISTORY_ITEMS} items`;
  }
  for (const m of history) {
    if (
      !m ||
      typeof m.role !== "string" ||
      typeof m.text !== "string" ||
      m.text.length > MAX_MESSAGE_LENGTH * 2
    ) {
      return "history items must be { role: string, text: string } with bounded length";
    }
  }
  return { message: message.trim(), history };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cap request body size so oversized payloads are rejected before parsing.
  app.use(express.json({ limit: "32kb" }));

  // Periodically drop idle IPs so the limiter map cannot grow unbounded.
  setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(ip);
    }
  }, RATE_LIMIT_WINDOW_MS).unref();

  app.post("/api/chat", async (req, res) => {
    if (isRateLimited(req.ip ?? "unknown")) {
      res.setHeader("Retry-After", String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
      return res.status(429).json({ error: "Too many requests. Please try again shortly." });
    }

    const parsed = validateChatBody(req.body);
    if (typeof parsed === "string") {
      return res.status(400).json({ error: parsed });
    }
    const { message, history } = parsed;

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are a helpful museum assistant chatbot for ICOM Uganda. You help visitors navigate the platform, suggest museums, provide insights about cultural heritage, and answer general support queries. Keep your responses concise, welcoming, and informative.",
        },
        // Use the structured history API rather than flattening into the prompt.
        history: history.map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      });

      const response = await chat.sendMessage({ message });
      const reply = response.text;

      // generate TTS
      let audioBase64 = null;
      try {
        const ttsResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: reply }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        });
        audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      } catch(e) {
        console.error("TTS failed", e);
      }

      res.json({ text: reply, audio: audioBase64 });
    } catch (e: any) {
      // Log details server-side; don't leak internal error text to clients.
      console.error(e);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  let isProd = process.env.NODE_ENV === "production";
  
  // Vite middleware for development
  let viteLoaded = false;
  if (!isProd) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      viteLoaded = true;
    } catch (e) {
      console.log("Vite not found, falling back to production static serving.");
      isProd = true;
    }
  }
  
  if (isProd || !viteLoaded) {
    const distPath = __dirname;
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
