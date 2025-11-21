import Grid from "@/components/common/Grid";
import Keyboard from "@/components/common/Keyboard";
import PuzzleStore from "@/stores/PuzzleStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";


export default observer(function GameScreen() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])

  return(
    <main className="flex flex-col justify-center items-center h-screen p-8 gap-4">
      <div className="flex flex-col gap-1 justify-center items-center">  
        {store.guesses.map((_, i) => (
          <Grid 
            key={i}
            word={store.word} 
            guess={store.guesses[i]} 
            isGuessed={i < store.currentGuess}/>
        ))}
        {/* <h1>won/loss</h1> */}
      </div>
      <div> 
        <Keyboard store={store}/>
      </div>
      {/* word: {store.word}
      guesses: {JSON.stringify(store.guesses)} */}
    </main>
  )
})