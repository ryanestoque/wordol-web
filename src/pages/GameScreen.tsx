import GameHeader from "@/components/common/GameHeader";
import Grid from "@/components/common/Grid";
import Keyboard from "@/components/common/Keyboard";
import { Toaster } from "@/components/ui/sonner";
import PuzzleStore from "@/stores/PuzzleStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { motion } from "framer-motion";
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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  return(
    <motion.div 
      className="flex flex-col h-screen p-4 gap-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <GameHeader />
      </motion.div>
      <main className="flex-1 flex flex-col justify-center items-center  gap-6">
        <motion.div variants={itemVariants} className="flex flex-col gap-1 justify-center items-center">  
          {store.guesses.map((_, i) => (
            <Grid 
              key={i}
              word={store.word} 
              guess={store.guesses[i]} 
              isGuessed={i < store.currentGuess}/>
          ))}
          {/* <h1>won/loss</h1> */}
        </motion.div>
        <motion.div variants={itemVariants}> 
          <Keyboard store={store}/>
        </motion.div>
        {/* word: {store.word}
        guesses: {JSON.stringify(store.guesses)} */}
      </main>
      <Toaster position="top-center" visibleToasts={1}/>
    </motion.div>
  )
})