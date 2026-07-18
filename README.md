# Scholars.visualis.id

Scholars.visualis.id is an Indonesian academic research discovery platform: search/browse research
documents by university, discipline, and degree level, view document detail pages, and cross-sell
into the external ResearchOS product via segmented CTA banners.

This repo is a monorepo:

- `/frontend` — React (Vite + React Router) single-page app, deployable to **Vercel**.
- `/backend` — Node/Express REST API backed by MongoDB, deployable to **Render**.
- `/design_handoff_scholar_platform` — original design handoff bundle (reference only, not
  production code — kept in the repo as documentation).

## Architecture

```
frontend (React/Vite) ──HTTP──> backend (Express) ──Mongoose──> MongoDB Atlas
```

The frontend never talks to MongoDB directly — all data (documents, universities, disciplines)
comes from the backend's REST API. The four researcher CTA banners (`s1`/`s2`/`s3`/`aff`) use a
small static content config on the frontend for zero-latency rendering; the same content is also
served by the backend at `GET /api/cta/:variant` for any other client that needs it.

## Data model

- `documents`: `id, title, authors[], universityId, university, faculty, program, degree (S1/S2/S3), year, language, repository, disciplineId, keywords[], abstract, doi`
- `universities`: `id, name, abbr, province, indexedDocs, status, topFaculties[]`
- `disciplines`: `id, name, mono, docCount`
- `researchCTAs`: static config (not a DB collection), served via `GET /api/cta/:variant`

## API routes (backend)

- `GET /api/documents?q=&degree=&universityId=&disciplineId=&language=&sort=` — list/search/filter
- `GET /api/documents/:id` — document detail + related documents
- `GET /api/universities` — list universities
- `GET /api/universities/:id` — university detail + its documents
- `GET /api/disciplines` — list disciplines
- `GET /api/disciplines/:id` — discipline detail + its documents, top keywords, top universities
- `GET /api/cta/:variant` — CTA banner content (`s1`, `s2`, `s3`, `aff`)

## Running locally

### 1. Backend

```bash
cd backend
cp .env.example .env
# edit .env and set MONGODB_URI to a MongoDB Atlas (or local) connection string
npm install
npm run seed   # loads sample documents/universities/disciplines into MongoDB
npm run dev    # starts the API on http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
# edit .env if your backend runs somewhere other than http://localhost:4000/api
npm install
npm run dev    # starts Vite dev server, default http://localhost:5173
```

Open http://localhost:5173.

## Environment variables

### Backend (`backend/.env`)

| Variable       | Description                                   |
| -------------- | ---------------------------------------------- |
| `MONGODB_URI`  | MongoDB connection string (Atlas or local)     |
| `PORT`         | Port for the Express server (default `4000`)   |
| `CORS_ORIGIN`  | Allowed origin for CORS (frontend URL)         |

### Frontend (`frontend/.env`)

| Variable              | Description                          |
| --------------------- | ------------------------------------- |
| `VITE_API_BASE_URL`   | Base URL of the backend API, e.g. `https://scholar-visualis-api.onrender.com/api` |

## Deployment

### Backend → Render

1. Create a new **Web Service** on Render, pointing at this repo with root directory `backend`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Set environment variables `MONGODB_URI`, `PORT` (Render sets this automatically, but the app
   reads `process.env.PORT`), and `CORS_ORIGIN` (your Vercel frontend URL).
5. After the first deploy, run the seed script once (e.g. via Render's shell) with
   `npm run seed`, or run it locally against the Atlas URI.

### Frontend → Vercel

1. Import this repo into Vercel, set the project root to `frontend`.
2. Framework preset: Vite.
3. Build command: `npm run build`; output directory: `dist`.
4. Set environment variable `VITE_API_BASE_URL` to your deployed Render API URL (with `/api`
   suffix).

### Database → MongoDB Atlas

1. Create a free-tier Atlas cluster.
2. Create a database user and allow network access from Render (or `0.0.0.0/0` for simplicity).
3. Copy the connection string into `MONGODB_URI` on the backend.

## Notes

- The `design_handoff_scholar_platform/` folder contains the original design reference bundle
  (`*.dc.html` files, `data.js`, and the authoritative spec `README.md`). It is not part of the
  running application — it's kept as documentation of the design intent.
- No mock data ships in the frontend production build; all page data is fetched from the backend
  API at runtime.
