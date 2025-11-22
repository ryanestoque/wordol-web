import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function Grid({ isGuessed, guess, word } : any) {
  const { width } = useWindowDimensions();
  const cellSize = Math.round(width / 6);

  return(
    <div className="flex gap-1">
      {new Array(5).fill(0).map((_, i) => {
        const cellStyle = !isGuessed 
          ? "bg-white text-black" 
          : guess[i] === word[i] 
          ? "bg-blue-600 text-white" 
          : word.includes(guess[i]) 
          ? "bg-yellow-500 text-white"
          : "bg-red-600 text-white"
        return(
          <div 
            key={i}
            style={{ width: cellSize }}
            className={`h-16 max-w-16 border-2 ${cellStyle} border-neutral-300 font-martires-black uppercase flex items-center justify-center text-5xl`}>
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}