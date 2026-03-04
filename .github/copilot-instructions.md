# Copilot Instructions — API-Football Dashboard

## Project Overview
A fully local, open-source React 18 + Vite web app that lets developers and statisticians fetch data from the [API-Football v3](https://v3.football.api-sports.io) API, preview responses, and save them as JSON files into `data-stat/`.

## Architecture
- **Frontend**: React 18 + Vite (`src/`) — components, pages, hooks, utils
- **Backend**: Express server (`server/index.js`) — acts as API proxy (avoids CORS) and handles all file I/O into `data-stat/`
- `data-stat/` is the single output folder — all saved JSON files land here
- Both processes run together via `npm run dev` (concurrently)

## Folder Structure
```
src/
  components/{ComponentName}/   ← one folder per component
  pages/{PageName}/             ← one folder per page (FetchPage, FilesPage, WikiPage)
  hooks/                        ← useApiKey (re-exports context), useFetch
  utils/                        ← endpoints.js, wikiContent.js
  context/ApiKeyContext.jsx     ← global API key state via React Context
server/
  index.js                      ← Express backend
data-stat/                      ← saved JSON output files
```

## Code Style
- Functional components only, hooks for all stateful logic
- Each component/page has its own `.jsx` + `.css` files in its own folder
- `useApiKey` re-exports from `src/context/ApiKeyContext.jsx` — shared global state via React Context, **not** per-component localStorage reads
- `ApiKeyProvider` wraps the entire app in `main.jsx`
- `useFetch` is instantiated in `App.jsx` and passed as `fetchState` prop to `FetchPage` so navigating away and back does not lose the last response
- All API-Football requests go through `POST /api/fetch` on the Express backend
- File listing via `GET /api/files`, file content via `GET /api/files/:name`

## Build & Run
```bash
npm install          # install all deps
npm run dev          # starts Vite (port 5173) + Express (port 3001) concurrently
npm run build        # production build
```

## Design System
- Industrial dark terminal aesthetic — `#0a0a0a` bg, `#00ff88` accent (electric green), `#ff4444` danger
- Display font: **Bebas Neue**; monospace data: **JetBrains Mono**; body: **Inter**
- All loaded via Google Fonts in `index.html`
- CSS custom properties defined in `src/index.css`
- No Tailwind — plain CSS per component

## Integration Points
- API-Football base URL: `https://v3.football.api-sports.io`
- Auth header: `x-apisports-key: <user_api_key>`
- Proxy backend runs at `http://localhost:3001`
- Vite proxies `/api` → `http://localhost:3001` (configured in `vite.config.js`)

## Security
- API key is stored only in `localStorage`, never committed or logged to files
- Express backend validates that the API key header is present before proxying
