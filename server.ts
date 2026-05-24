import express from "express";
import path from "path";
import { GoogleGenAI, Modality } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API constraints check
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
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
      });

      // if history exists, we should probably set it or just pass history in a different way.
      // But for simplicity, we can just send the latest message or format history into a string.
      let prompt = message;
      if (history && history.length > 0) {
        prompt = `Previous conversation:\n${history.map((m: any) => `${m.role}: ${m.text}`).join('\n')}\nUser: ${message}`;
      }

      const response = await chat.sendMessage({ message: prompt });
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
      console.error(e);
      res.status(500).json({ error: e.message });
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
    const distPath = path.join(process.cwd(), 'dist');
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
