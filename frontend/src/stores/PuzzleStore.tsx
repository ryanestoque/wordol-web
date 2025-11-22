import words from '../../words.json'
import { toast } from "sonner"

export default {
  word: '',
  guesses: [],
  currentGuess: 0,
  get won() {
    return this.guesses[this.currentGuess - 1] === this.word
  },
  get lost() {
    return this.currentGuess === 6
  },
  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join('').split('')
  },
  get exactGuesses() {
    return (
      this.word
        .split('')
        // if any guesses include this letter in this position/index
        .filter((letter, i) => {
          return this.guesses
            .slice(0, this.currentGuess)
            .map((word) => word[i])
            .includes(letter)
        })
    )
  },
  get inexactGuesses() {
    return this.word
      .split('')
      .filter((letter) => this.allGuesses.includes(letter))
  },
  init() {
    this.word = words[Math.round(Math.random() * words.length)]
    this.guesses.replace(new Array(6).fill(''))
    this.currentGuess = 0
  },
  submitGuess() {
    const currentAttempt = this.guesses[this.currentGuess];

    if (words.includes(currentAttempt)) {
      this.currentGuess += 1
    }

    if (currentAttempt.length < 5) {
      toast.error("Not enough letters!")
      return;
    }

    const lowercasedWords = words.map(w => w.toLowerCase());

    if (!lowercasedWords.includes(currentAttempt.toLowerCase())) {
      toast.error("Not in the word list!")
      return;
    }

    // Check if the guess is the winning word
    if (currentAttempt.toLowerCase() === this.word.toLowerCase()) {
      toast("You Win!");
    } else {
  
      if (this.currentGuess === 6 && currentAttempt !== this.word) {
        toast("Secret word: " + this.word.toUpperCase());
      }
    }
  },
  handleKeyup(e) {
    if (this.won || this.lost) {
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
    if (this.won || this.lost) return;
  
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