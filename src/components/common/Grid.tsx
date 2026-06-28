import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function Grid({ isGuessed, guess, word } : any) {
  const { width } = useWindowDimensions();
  const cellSize = Math.min(Math.round(width / 6.8), 56);

  return(
    <div className="flex gap-1">
      {new Array(5).fill(0).map((_, i) => {
        const cellStyle = !isGuessed 
          ? "bg-transparent text-foreground" 
          : guess[i] === word[i] 
          ? "bg-blue-600 text-white" 
          : word.includes(guess[i]) 
          ? "bg-yellow-500 text-white"
          : "bg-red-600 text-white"
        return(
          <div 
            key={i}
            style={{ width: cellSize, height: cellSize }}
            className={`border-2 ${cellStyle} border-neutral-400 dark:border-neutral-600 font-martires-black uppercase flex items-center justify-center text-4xl`}>
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}