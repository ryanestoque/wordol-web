import GameHeader from "@/components/common/GameHeader";
import Grid from "@/components/common/Grid";
import Keyboard from "@/components/common/Keyboard";
import { Toaster } from "@/components/ui/sonner";
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
    <div className="flex flex-col h-screen p-4 gap-4">
      <GameHeader />
      <main className="flex-1 flex flex-col justify-center items-center  gap-6">
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
      <Toaster position="top-center" visibleToasts={1} compact/>
    </div>
  )
})