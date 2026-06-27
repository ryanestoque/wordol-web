import useSWR from "swr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import words from "../../words.json";

function getTodayString(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getFallbackWord(): string {
  return words[Math.round(Math.random() * words.length)];
}

export interface SavedGame {
  guesses: string[];
  won: boolean;
  completed: boolean;
}

export interface PuzzleData {
  word: string | undefined;
  savedGame: SavedGame | null | undefined;
  isLoading: boolean;
}

export function usePuzzleData(): PuzzleData {
  const { user } = useAuth();
  const dateString = getTodayString();

  const { data: word, isLoading: wordLoading } = useSWR(
    `daily_words/${dateString}`,
    async (key: string) => {
      const [collection, id] = key.split("/");
      const snap = await getDoc(doc(db, collection, id));
      return snap.exists() ? (snap.data().word as string) : getFallbackWord();
    }
  );

  const { data: savedGame, isLoading: gameLoading } = useSWR(
    user ? `users/${user.uid}/games/${dateString}` : null,
    async (key: string) => {
      // key format: users/{uid}/games/{date}
      const parts = key.split("/");
      const snap = await getDoc(doc(db, parts[0], parts[1], parts[2], parts[3]));
      return snap.exists() ? (snap.data() as SavedGame) : null;
    }
  );

  return {
    word,
    savedGame,
    isLoading: wordLoading || gameLoading,
  };
}
