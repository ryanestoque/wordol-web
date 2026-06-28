# AGENTS.md

## Project Overview

**Wordol** is a daily Wordle-style word puzzle web app built with **React 19 + TypeScript + Vite**. Players get 6 attempts to guess a 5-letter word. A new puzzle word is served each day from Firebase Firestore.

Key tech:
- **React 19** with **TypeScript** (~5.9)
- **Vite 7** (with `@vitejs/plugin-react-swc`) as the build tool
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed)
- **shadcn/ui** components (Radix UI primitives under the hood)
- **MobX** (`mobx` + `mobx-react-lite`) for global game state
- **Firebase** (Firestore for daily puzzle words, Firebase Auth for user accounts)
- **React Router v7** for client-side routing
- **Framer Motion** for page transitions and animations
- **SWR** for data fetching hooks
- **Zod + React Hook Form** for form validation

---

## Setup Commands

```bash
# Install dependencies
npm install

# Copy env file and fill in your Firebase credentials
cp .env.example .env.local
```

### Environment Variables (`.env.local`)

All variables must be prefixed with `VITE_` to be exposed to the client:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Firebase is initialized in `src/lib/firebase.ts`. Do **not** import `serviceAccountKey.json` from client-side code — it is only used by `scripts/populateDailyWords.cjs`.

---

## Development Workflow

```bash
# Start dev server (hot reload via Vite + SWC)
npm run dev

# Lint (ESLint with TypeScript + React Hooks plugins)
npm run lint

# Type-check + production build
npm run build

# Preview production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

### Path Alias

`@` resolves to `./src`. Always use `@/` imports for internal modules:

```ts
import { something } from '@/components/common/Foo'
import { puzzleStore } from '@/stores/PuzzleStore'
```

---

## Project Structure

```
src/
├── App.tsx              # Route definitions (React Router v7)
├── main.tsx             # Entry point (wraps app with BrowserRouter + ThemeProvider)
├── index.css            # Global styles + Tailwind CSS v4 directives
├── lib/
│   ├── firebase.ts      # Firebase app + Firestore + Auth initialization
│   └── utils.ts         # Utility helpers (cn() for class merging)
├── stores/
│   └── PuzzleStore.tsx  # MobX store — core game state (guesses, letter states, win/loss)
├── hooks/
│   ├── useAuth.ts           # Firebase Auth state observer
│   ├── usePuzzleData.ts     # SWR hook for fetching today's word from Firestore
│   └── useWindowDimensions.ts
├── pages/
│   ├── Home.tsx         # Landing page (hero + start game)
│   ├── Login.tsx        # Auth page (email/password via Firebase)
│   └── GameScreen.tsx   # Main game UI (Grid + Keyboard)
├── components/
│   ├── common/          # Feature-specific components
│   │   ├── Grid.tsx         # Letter tile grid
│   │   ├── Keyboard.tsx     # On-screen keyboard
│   │   ├── GameHeader.tsx
│   │   ├── GameSettings.tsx
│   │   ├── GameStats.tsx
│   │   ├── Hero.tsx
│   │   ├── HowToPlay.tsx
│   │   ├── PageLayout.tsx   # Shared page wrapper
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx  # Auth guards (ProtectedRoute + PublicRoute)
│   └── ui/              # shadcn/ui generated components (do not manually edit)
└── assets/
```

---

## Routing & Auth

Routes are defined in `App.tsx`. There are two route guards:

- **`<ProtectedRoute>`** — redirects unauthenticated users to `/login`
- **`<PublicRoute>`** — redirects already-authenticated users to `/home`

Protected routes: `/`, `/home`, `/game`
Public-only route: `/login`

---

## State Management (MobX)

All game state lives in `src/stores/PuzzleStore.tsx`. It is a MobX `observable` class instance exported as a singleton. Use `observer()` from `mobx-react-lite` to make components reactive:

```tsx
import { observer } from 'mobx-react-lite'
import { puzzleStore } from '@/stores/PuzzleStore'

const MyComponent = observer(() => {
  return <div>{puzzleStore.currentGuess}</div>
})
```

Do **not** use React `useState` for game-critical state — keep it in the store.

---

## Styling Guidelines

- **Tailwind CSS v4** is used — no `tailwind.config.js`. Configuration (theme, custom tokens) goes in `src/index.css` using `@theme {}`.
- **shadcn/ui** components live in `src/components/ui/`. Run `npx shadcn add <component>` to add new ones; do not manually modify these files unless absolutely necessary.
- Use the `cn()` utility from `@/lib/utils` to conditionally merge class names (powered by `clsx` + `tailwind-merge`).
- The app supports light/dark mode via `next-themes`. Use CSS variables for theme-aware colors.

---

## Scripts

### Populate Daily Words (Admin Script)

`scripts/populateDailyWords.cjs` is a Node.js admin script that populates Firestore with daily puzzle words. It requires `serviceAccountKey.json` at the project root (Firebase Admin SDK).

```bash
# Run via Node directly (not an npm script)
node scripts/populateDailyWords.cjs
```

> Never commit `serviceAccountKey.json` or `.env.local` — both are gitignored.

---

## Build & Deployment

```bash
# Type-check and build for production
npm run build
# Output goes to ./dist/

# Preview production build
npm run preview
```

The app is a standard Vite SPA. Deploy `./dist/` to any static host (Firebase Hosting, Vercel, Netlify, etc.).

---

## Code Style & Conventions

- **TypeScript strict mode** is enabled — avoid `any`, use proper types.
- All React components are **function components** with typed props.
- ESLint config (`eslint.config.js`) enforces: `@eslint/js` recommended + `typescript-eslint` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`.
- File naming: `PascalCase` for components/pages/stores (`.tsx`), `camelCase` for hooks/utils (`.ts`).
- Keep `src/components/ui/` files untouched — they are managed by shadcn CLI.
- Always run `npm run lint` and `npm run build` before committing.

---

## Common Gotchas

- **Tailwind v4**: There is no `tailwind.config.js`. Customize the theme with `@theme {}` in `index.css`.
- **Firebase Auth**: Auth state is async. Use `useAuth` hook and handle loading states to avoid flashing protected content.
- **SWR + Firestore**: `usePuzzleData` fetches the daily word. Do not call Firestore directly in components — go through the hook.
- **MobX reactivity**: Components must be wrapped with `observer()` to react to store changes.
- **`serviceAccountKey.json`**: This file is at the root for the admin script only. Never import it in `src/`.