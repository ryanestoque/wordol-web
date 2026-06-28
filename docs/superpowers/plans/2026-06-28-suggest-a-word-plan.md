# Suggest a Word Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a feature that allows authenticated users to suggest 5-letter Bisaya words via a dialog modal from the Home page or Game Screen.

**Architecture:** A reusable React component (`SuggestWord.tsx`) utilizing Radix UI dialog, React Hook Form, and Zod for validation, which writes valid suggestions to a Firestore `word_suggestions` collection.

**Tech Stack:** React 19, TypeScript, Zod, React Hook Form, Firebase Firestore, Tailwind v4

## Global Constraints
- Validation must strictly enforce exactly 5 alphabetic letters.
- Must ensure word does not already exist in `words.json`.
- Users must be authenticated to submit.

---

### Task 1: Component Creation

**Files:**
- Create: `src/components/common/SuggestWord.tsx`

**Interfaces:**
- Produces: `SuggestWord` component accepting a `context?: string` prop.

- [x] **Step 1: Write the component skeleton and imports**
- [x] **Step 2: Add Zod Schema and React Hook Form setup**
- [x] **Step 3: Implement Firestore write logic and duplicate checking**
- [x] **Step 3.5: Implement Daily Rate Limit (5 per day) check**
- [x] **Step 4: Implement Dialog UI (Trigger, Form, Success State)**
- [x] **Step 5: Commit**

### Task 2: Page Integrations

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/common/GameHeader.tsx`

**Interfaces:**
- Consumes: `SuggestWord` component from Task 1.

- [x] **Step 1: Import SuggestWord into Home.tsx**
- [x] **Step 2: Add `<SuggestWord />` button below HowToPlay**
- [x] **Step 3: Import SuggestWord into GameHeader.tsx**
- [x] **Step 4: Add `<SuggestWord context="header" />` in the icon group**
- [x] **Step 5: Verify integration with `npm run build`**
- [x] **Step 6: Commit**
