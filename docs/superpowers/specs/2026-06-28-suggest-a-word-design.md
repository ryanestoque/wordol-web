# Design Spec: Suggest a Word Feature

**Date**: 2026-06-28
**Topic**: Suggest a Word Feature

## Overview
A feature that allows authenticated users to suggest new 5-letter Bisaya words for the game. This crowdsources the expansion of the daily word dictionary (`words.json`) while maintaining quality through an admin review process.

## Architecture & Data Flow
- **Client-Side Component**: A reusable dialog (`SuggestWord.tsx`) utilizing Radix UI (via shadcn) and React Hook Form.
- **Data Storage**: Submissions are written directly to a Firestore collection (`word_suggestions`).
- **Validation**:
  - **Local**: Zod validates that the input is exactly 5 letters, contains only alphabetic characters, and does not already exist in the local `words.json`.
  - **Remote**: 
    - Queries Firestore before writing to ensure the word hasn't already been suggested.
    - Queries Firestore to ensure the user hasn't exceeded the daily limit of 5 suggestions per day (client-side date filtering used to avoid requiring composite indexes).

## User Interface
The feature is accessible from two locations:
1. **Home Page**: A full-width outline button placed under the "How to Play?" button.
2. **Game Screen**: A lightbulb icon in the top header, matching the existing utility icons.

The dialog modal contains:
- A title and short description explaining the feature.
- A single text input (uppercase styling, restricted to 5 characters).
- A submit button with loading states.
- A success view that thanks the user and offers a "Suggest Another Word" button.

## Data Schema (Firestore)
**Collection**: `word_suggestions`

```typescript
{
  word: string;             // The suggested word (lowercase, trimmed)
  suggestedBy: string;      // The Firebase Auth UID of the submitter
  suggestedByEmail: string; // The email of the submitter (for admin convenience)
  suggestedAt: Timestamp;   // Firestore server timestamp of submission
  status: "pending" | "approved" | "rejected"; // Status for admin review workflow
}
```

## Security & Constraints
- Only authenticated users can submit suggestions (enforced client-side, must be backed by Firestore rules).
- Firestore security rules should be configured to allow `create` access to authenticated users for the `word_suggestions` collection.
