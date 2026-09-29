# ICOM Uganda

Web platform for ICOM Uganda: museum and cultural-heritage discovery, with an AI museum assistant that answers visitor questions in text and speech.

Built with React 19, Vite, Tailwind CSS 4, React Router, Firebase (Firestore) and an Express server that proxies Gemini calls.

## Project layout

| Path | Purpose |
|---|---|
| `src/` | React app (`pages/`, `components/`, `data/`, `lib/`, `assets/`) |
| `server.ts` | Express server: `/api/chat` endpoint, Vite middleware in dev, static serving in production |
| `firestore.rules` | Firestore security rules |
| `firebase-blueprint.json` | Firestore data-model blueprint |
| `public/` | Static assets |
| `*.ts` / `*.cjs` in repo root | One-off asset scripts (logo/photo fetching, image identification) |

## Getting started

Prerequisites: Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then set GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Gemini API key used by the server for chat and text-to-speech |
| `APP_URL` | No | Public URL of the deployed app (injected by AI Studio / Cloud Run) |

The key is read only on the server; it is never bundled into the client.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Express server with Vite middleware (hot reload) |
| `npm run build` | Build the client with Vite and bundle the server to `dist/server.cjs` |
| `npm start` | Run the production bundle |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` |

## API

### `POST /api/chat`

Request body:

```json
{ "message": "Which museums can I visit in Kampala?", "history": [{ "role": "user", "text": "..." }] }
```

Response:

```json
{ "text": "...", "audio": "<base64 audio or null>" }
```

`audio` is synthesized speech of the reply; it is `null` if text-to-speech fails, in which case the text reply is still returned.

## Security notes

- Firestore access is governed by `firestore.rules`; changes to it should be reviewed carefully (see the open PR on the `questions` collection).
- Do not commit `.env.local` or real API keys.

## Deployment

`npm run build` (also wired as `gcp-build`) then `npm start`. The server listens on port 3000.
