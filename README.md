# Cinemach

**A full-stack movie discovery app that combines live TMDB data with real-time search analytics — built to show I can ship polished front-end products with multiple API integrations.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)

**[Live Demo](#)** · **[Report Bug](https://github.com/RicardoE7/cinemach-react-app/issues)** · **[Request Feature](https://github.com/RicardoE7/cinemach-react-app/issues)**

---

## Why This Project?

Most tutorial movie apps stop at fetching a list and calling it done. **Cinemach goes further** — it integrates two live services (TMDB + Appwrite), handles async UX properly, tracks user search behavior, and surfaces a dynamic trending section driven by real usage data.

If you're a recruiter or hiring manager scanning this repo: **this is production-minded front-end work** — component-driven architecture, debounced API calls, error/loading states, environment-based config, and a backend layer for analytics without exposing secrets in the browser.

---

## What It Does

### Movie discovery (TMDB)
- Loads **popular movies** on first visit via TMDB `/discover/movie`
- **Debounced search** (1s) hits TMDB `/search/movie` — reduces API noise while typing
- Clears search → automatically returns to the popular movies feed

### Rich movie cards
Each result renders as a responsive card with:
- Poster image (TMDB CDN + fallback)
- Title, star rating, original language, and release year

### Search analytics (Appwrite)
Every successful search writes to an Appwrite database:
- **New term** → creates a document with search term, count, movie ID, and poster URL
- **Repeat term** → increments the existing count
- Powers a **Trending Movies** section ranked by search popularity

### Trending section
- Fetches the **top 5 most-searched movies** from Appwrite on load
- Horizontal scroll layout with oversized rank numbers and poster art
- Only appears once search data exists — driven by real user behavior

### UX & polish
- Custom **loading spinner** with accessible `role="status"` and screen-reader text
- Loading, error, and success states for every fetch
- Dark cinematic UI — custom Tailwind v4 theme, gradients, hero imagery, responsive grid

---

## Architecture

```
User types in Search
       │
       ▼
  Debounce (1s) ──────────────────────────────┐
       │                                       │
       ▼                                       ▼
  TMDB API                              Appwrite DB
  (search / discover)                   (search metrics)
       │                                       │
       ▼                                       ▼
  MovieCard grid                        Trending section
```

| Layer | Tech | Role |
|---|---|---|
| **UI** | React 19, Tailwind v4 | Components, state, responsive layout |
| **Movie data** | TMDB REST API v3 | Discover, search, poster CDN |
| **Analytics** | Appwrite Databases | Persist search counts, power trending |
| **Build** | Vite 8 | Fast HMR, env injection, production bundling |

---

## Tech Stack

**Frontend:** React 19 · Vite 8 · Tailwind CSS v4 · JavaScript (ES modules)

**APIs & Services:** TMDB REST API v3 · Appwrite Cloud (Database SDK)

**Tooling:** ESLint · npm · Git / GitHub

---

## Project Structure

```
cinemach-react-app/
├── public/                  # Hero images, icons, fallbacks
├── src/
│   ├── components/
│   │   ├── Search.jsx       # Controlled search input
│   │   ├── MovieCard.jsx    # Poster, rating, language, year
│   │   └── Spinner.jsx      # Accessible loading indicator
│   ├── App.jsx              # State, debounce, fetch orchestration
│   ├── appwrite.js          # Search analytics + trending queries
│   ├── index.css            # Tailwind theme + component styles
│   └── main.jsx             # Entry point
├── .env.example             # Environment variable template
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Free [TMDB API key](https://developer.themoviedb.org/docs/getting-started)
- Free [Appwrite Cloud](https://cloud.appwrite.io/) project with a `metrics` collection

### Appwrite collection setup

Create a collection (e.g. `metrics`) with these attributes:

| Attribute | Type |
|---|---|
| `searchTerm` | String |
| `count` | Integer |
| `movie_id` | Integer |
| `poster_url` | String |

Set collection permissions for role **Any**: Read, Create, Update (required for browser-side SDK — no API keys in client code).

### 1. Clone & install

```bash
git clone https://github.com/RicardoE7/cinemach-react-app.git
cd cinemach-react-app
npm install
```

### 2. Environment variables

Copy the example and fill in your keys:

```bash
cp .env.example .env.local
```

```env
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_bearer_token
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
```

> Never commit `.env.local`. All secrets are injected at build time via Vite's `import.meta.env`.

### 3. Run

```bash
npm run dev        # http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
```

---

## Skills Demonstrated

**For front-end / React roles:**

- Multi-API integration (TMDB + Appwrite) with clean separation of concerns
- Debounced search pattern with `useEffect` + `setTimeout` cleanup
- Controlled components, lifted state, and reusable component architecture
- Async UI: loading spinners, error boundaries, conditional rendering
- Custom design system without a component library (Tailwind v4 `@theme`, layered CSS)
- Environment-based configuration and security awareness (no secrets in source control)
- CRUD-style database operations from the client SDK (create, read, update, query with filters)

---

## Roadmap

- [ ] Refresh trending list automatically after each search
- [ ] TypeScript migration
- [ ] Deploy to Vercel / Netlify with CI
- [ ] Server-side Appwrite route for elevated operations (if needed)

---

## Author

**Ricardo Edwards**

- GitHub: [@RicardoE7](https://github.com/RicardoE7)
- Repo: [cinemach-react-app](https://github.com/RicardoE7/cinemach-react-app)

*Open to front-end development opportunities. Clone it, break it, reach out — happy to walk through any part of the codebase.*

---

## License

Open source — available for portfolio review purposes.
