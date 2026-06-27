import words from '../../words.json'
import { toast } from "sonner"
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { runInAction } from "mobx";

export default {
  word: '',
  guesses: [],
  currentGuess: 0,
  loading: true,
  
  get won() {
    return this.currentGuess > 0 && this.guesses[this.currentGuess - 1].toLowerCase() === this.word.toLowerCase()
  },
  get lost() {
    return this.currentGuess === 6 && !this.won
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join('').split('')
  },
  get exactGuesses() {
    return (
      this.word
        .split('')
        // if any guesses include this letter in this position/index
        .filter((letter: string, i: number) => {
          return this.guesses
            .slice(0, this.currentGuess)
            .map((word: string) => word[i])
            .includes(letter)
        })
    )
  },
  get inexactGuesses() {
    return this.word
      .split('')
      .filter((letter: string) => this.allGuesses.includes(letter))
  },
  
  init(word: string, savedGame: { guesses: string[]; won: boolean; completed: boolean } | null) {
    runInAction(() => {
      this.loading = true;
      this.guesses.replace(new Array(6).fill(''));
      this.currentGuess = 0;
      this.word = word;

      if (savedGame && savedGame.guesses && savedGame.guesses.length > 0) {
        for (let i = 0; i < savedGame.guesses.length; i++) {
          this.guesses[i] = savedGame.guesses[i];
        }
        this.currentGuess = savedGame.guesses.length;
      }

      this.loading = false;
    });
  },

  async syncProgress() {
    const user = auth.currentUser;
    if (!user) return;

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const gameDocRef = doc(db, `users/${user.uid}/games`, dateString);
    
    const currentGuesses = this.guesses.slice(0, this.currentGuess);
    
    await setDoc(gameDocRef, {
      guesses: currentGuesses,
      won: this.won,
      completed: this.won || this.lost,
      lastPlayed: new Date()
    }, { merge: true });

    if (this.won || this.lost) {
      await this.updateUserStats(user.uid, this.won);
    }
  },

  async updateUserStats(uid: string, won: boolean) {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      let stats = data.stats || { gamesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0 };
      
      stats.gamesPlayed += 1;
      if (won) {
        stats.wins += 1;
        stats.currentStreak += 1;
        if (stats.currentStreak > stats.maxStreak) {
          stats.maxStreak = stats.currentStreak;
        }
      } else {
        stats.currentStreak = 0;
      }

      await updateDoc(userDocRef, { stats });
    }
  },

  async submitGuess() {
    if (this.loading) return;
    const currentAttempt = this.guesses[this.currentGuess];

    if (currentAttempt.length < 5) {
      toast.error("Not enough letters!")
      return;
    }

    const lowercasedWords = words.map((w: string) => w.toLowerCase());

    if (!lowercasedWords.includes(currentAttempt.toLowerCase())) {
      toast.error("Not in the word list!")
      return;
    }

    this.currentGuess += 1;

    if (this.won) {
      toast("You Win!");
    } else if (this.lost) {
      toast("Secret word: " + this.word.toUpperCase());
    }
    
    await this.syncProgress();
  },
  
  handleKeyup(e: any) {
    if (this.won || this.lost || this.loading) {
      return
    }

    if (e.key === 'Enter') {
      return this.submitGuess()
    }
    if (e.key === 'Backspace') {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0,
        this.guesses[this.currentGuess].length - 1
      )
      return
    }
    if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
      this.guesses[this.currentGuess] =
        this.guesses[this.currentGuess] + e.key.toLowerCase()
    }
  },
  
  handleKeyPress(key: string) {
    if (this.won || this.lost || this.loading) return;
  
    if (key === "enter") {
      this.submitGuess();
      return;
    }
  
    if (key === "backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0, this.guesses[this.currentGuess].length - 1
      );
      return;
    }
  
    if (this.guesses[this.currentGuess].length < 5 && key.match(/^[a-zA-Z]$/)) {
      this.guesses[this.currentGuess] += key.toLowerCase();
    }
  }
}