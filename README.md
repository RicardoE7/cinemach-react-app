# Cinemach

**A fast, modern movie discovery app built with React — because choosing a movie shouldn't take longer than watching one.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org/)

**[Live Demo](#)** · **[Report Bug](https://github.com/RicardoE7/cinemach-react-app/issues)** · **[Request Feature](https://github.com/RicardoE7/cinemach-react-app/issues)**

---

## Why This Project?

Cinemach is a portfolio piece I built to demonstrate real-world front-end development skills. It connects to a live API, handles async data with proper UI states, and ships a polished, responsive interface from scratch.

If you're reviewing this repo as a hiring manager or recruiter, here's what I want you to take away: **I can take a design from concept to working product, integrate third-party APIs securely, and write clean, maintainable React.**

---

## Highlights

| What I built | Why it matters |
|---|---|
| **TMDB API integration** | Real HTTP requests, Bearer auth, env-based secrets — no hardcoded keys |
| **Async UI patterns** | Loading, error, and success states so users always know what's happening |
| **Component architecture** | Lifted state, controlled inputs, reusable `Search` component |
| **Custom design system** | Tailwind v4 `@theme`, layered components, responsive grid layout |
| **Modern toolchain** | React 19, Vite 8, ESLint — current stack, fast dev experience |

---

## Features

- Browse popular movies fetched live from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Real-time search input with controlled React state (filtering wired next)
- Responsive layout — mobile-first grid that scales to desktop
- Dark cinematic UI with custom typography, gradients, and hero imagery
- Graceful error handling when the API is unavailable

### On the roadmap

- [ ] Debounced search against TMDB `/search/movie`
- [ ] Rich movie cards with posters, ratings, and release year
- [ ] Trending section with horizontal scroll
- [ ] TypeScript migration
- [ ] Deploy to Vercel / Netlify with CI

---

## Tech Stack

**Frontend:** React 19 · Vite 8 · Tailwind CSS v4 · JavaScript (ES modules)

**API:** TMDB REST API v3 (Bearer token authentication)

**Tooling:** ESLint · npm · Git / GitHub

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A free [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### 1. Clone the repo

```bash
git clone https://github.com/RicardoE7/cinemach-react-app.git
cd cinemach-react-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_tmdb_bearer_token_here
```

> **Note:** Never commit `.env.local`. API keys stay local and are injected at build time via Vite's `import.meta.env`.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Project Structure

```
cinemach-react-app/
├── public/              # Static assets (hero images, icons)
├── src/
│   ├── components/
│   │   └── Search.jsx   # Controlled search input
│   ├── App.jsx          # Main app — API fetch, state, movie list
│   ├── index.css        # Tailwind theme + component styles
│   └── main.jsx         # React entry point
├── .env.local           # API credentials (not committed)
└── vite.config.js
```

---

## What This Demonstrates

**For front-end / React roles**, this project shows I can:

- Fetch and display data from a REST API with modern `fetch` + `async/await`
- Manage component state with hooks (`useState`, `useEffect`)
- Build accessible, responsive UIs without a component library
- Structure a growing codebase with separated concerns
- Follow security basics (env vars, no secrets in source control)

---

## Author

**Ricardo Edwards**

- GitHub: [@RicardoE7](https://github.com/RicardoE7)
- Repo: [cinemach-react-app](https://github.com/RicardoE7/cinemach-react-app)

*Open to opportunities in front-end development. Feel free to clone, explore, or reach out.*

---

## License

This project is open source and available for portfolio review purposes.
