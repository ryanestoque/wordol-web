# Cebuano Dictionary Page

Add a dedicated `/dictionary` route that serves as a browsable Cebuano word dictionary with an integrated "Suggest a Word" form. The dictionary displays all words from `words.json` grouped alphabetically with search/filter, and becomes the primary home for word contributions.

## Proposed Changes

### SuggestWord Refactor

The current `SuggestWord.tsx` bundles form logic + dialog shell together. We need both an inline version (for the dictionary page) and a dialog version (for the GameHeader).

#### [NEW] SuggestWordForm.tsx (`src/components/common/SuggestWordForm.tsx`)

Extract the core suggest form (input, validation, quota display, submit logic) into a standalone component:
- Accepts a `mode: "inline" | "dialog"` prop to control layout differences (e.g. inline shows a more compact header)
- Contains all the existing form state: `useForm`, Zod schema, quota fetching, Firestore submission
- The quota bar, input field, submit button, and success state all live here

#### [MODIFY] SuggestWord.tsx (`src/components/common/SuggestWord.tsx`)

Refactor to be a thin dialog wrapper around `SuggestWordForm`:
- Keeps the `Dialog`/`DialogTrigger`/`DialogContent` shell
- Renders `<SuggestWordForm mode="dialog" />` inside the dialog content
- All form logic moves to `SuggestWordForm.tsx`
- External API (the `context` prop for header vs button trigger) stays unchanged

---

### Dictionary Page

#### [NEW] Dictionary.tsx (`src/pages/Dictionary.tsx`)

A full-page dictionary view, structured as:

1. **Header** — Back arrow + "DIKSYONARYO" title (Martires-Black font, consistent with other page titles), with word count badge
2. **Suggest Word section** — `<SuggestWordForm mode="inline" />` rendered directly in-page, with a subtle card/container
3. **Search bar** — Text input with search icon, filters words in real-time (case-insensitive substring match)
4. **Alphabetical word list** — Words from `words.json` grouped by first letter:
   - Letter section headers (e.g. "A", "B", "D") with word count per group
   - Each word displayed as a clean row — uppercase, Martires font, with a subtle hover state
   - Groups with no matching words (from search) are hidden
   - Smooth scroll, full page height
5. **Empty state** — When search yields no results, show a friendly "No words found" message

Uses `PageLayout` for consistent page chrome. Protected route (requires auth).

---

### Routing & Navigation

#### [MODIFY] App.tsx (`src/App.tsx`)

Add the `/dictionary` route:
```tsx
<Route path="/dictionary" element={
  <ProtectedRoute>
    <Dictionary />
  </ProtectedRoute>
} />
```

#### [MODIFY] Home.tsx (`src/pages/Home.tsx`)

- Replace `<SuggestWord />` button with a "Dictionary" `<Link to="/dictionary">` button
- Keep the same button styling (`outline` variant, `rounded-2xl`, full width)
- Use a `BookOpen` icon from lucide-react for visual distinction

---

### Global Styles

#### [MODIFY] index.css (`src/index.css`)

- Remove `overflow: hidden` from `html, body` — the dictionary page needs natural page scrolling
- Use `overflow: hidden` only on the game page where it's needed (via a utility class or page-level style)

---

## Files Not Changed

- **GameHeader.tsx** — Keeps `<SuggestWord context="header" />` dialog as-is
- **words.json** — Read-only data source, no changes
- All `src/components/ui/` — No shadcn component modifications

## Verification Plan

### Automated Tests
```bash
npm run lint
npm run build
```

### Manual Verification
- Navigate to `/dictionary` from Home
- Verify all 197 words appear grouped alphabetically
- Test search filtering (partial matches, clearing, empty state)
- Submit a word suggestion via the inline form
- Verify the SuggestWord dialog still works in GameHeader
- Test dark mode compatibility
- Test mobile responsiveness
