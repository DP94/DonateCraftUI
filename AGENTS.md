# AGENTS.md

## Project Overview

**DonateCraftUI** is the React web frontend for [DonateCraft](https://github.com/DP94/DonateCraft), a Minecraft plugin that lets players raise money for charity in-game. It's an admin/status dashboard for viewing players, charities, and donation "revival" requests, and it surfaces the result of JustGiving donation callbacks (success/error toasts) redirected back from the DonateCraft API.

### Key technologies
- **React 18** + **TypeScript**, bootstrapped with **Create React App** (`react-scripts`)
- **react-router-dom** for client-side routing
- **react-bootstrap** / **bootstrap** for UI components and styling
- **react-toastify** for toast notifications
- **Jest** + **@testing-library/react** for tests
- Talks to the **DonateCraft API** (see the [DonateCraft](https://github.com/DP94/DonateCraft) repo) over HTTP, configured via `REACT_APP_API_URL`

### Project structure

Standard Create React App layout:

- **`public/`** — static assets and the HTML shell (`index.html`).
- **`src/index.tsx`** — app entry point; sets up `BrowserRouter` with the top-level routes and renders the persistent `Navbar` and `App` shell around them.
- **`src/App.tsx`** — hosts the global `ToastContainer` and handles JustGiving donation callback redirects (reads `status`/`code` query params and shows a success/error toast).
- **`src/navbar/`** — top navigation bar (`Navbar.tsx`).
- **`src/pages/`** — one folder per route, each typically containing the page component, a `-service.ts` for API calls, and TS types for the domain model:
  - `home/` — landing page (`Home.tsx`).
  - `players/` — `/players` route; lists players and their deaths/donations (`Players.tsx`, `players-service.ts`, `player.ts`, `death.ts`, `donation.ts`).
  - `Charities/` — `/charities` route; lists charities, including JustGiving-sourced charity data (`Charities.tsx`, `charity-service.ts`, `charity.ts`, `justgiving-charity.ts`).
  - `revivals/` — `/revivals` route; lists player revival requests and their status (`Revivals.tsx`, `revival-service.ts`, `revival.ts`, `revival-status.ts`).
- **`src/modals/`** — modal dialogs (`PlayerSelector`, `InactivityModal`).
- **`src/table/`** — shared table components (`PlayerTableRecord.tsx`).
- **`src/loader/`** — loading spinner component.
- **`src/tests/`** — Jest/RTL tests (e.g. `Players.test.tsx`) plus test mocks (`mocks/cssMock.tsx`).

Each page's `*-service.ts` follows the same pattern: a class wrapping `fetch` calls to `${process.env.REACT_APP_API_URL}v1/<Resource>`, returning typed domain models.
