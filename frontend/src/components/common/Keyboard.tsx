import useWindowDimensions from '@/hooks/useWindowDimensions';
import { observer } from 'mobx-react-lite'
import { Button } from '../ui/button';
import { Delete } from 'lucide-react';

export default observer(function Keyboard({ store } : any) {
  const { width } = useWindowDimensions();
  const keySize1 = Math.round(width / 15);
  const keySize2 = Math.round(width / 11);

  const qwerty = [
    'qwertyuiop', 
    'asdfghjkl', 
    ["enter", ..."zxcvbnm", "backspace"]
  ]

  return (
    <div>
      {qwerty.map((row) => (
        <div className="flex justify-center gap-4">
          {(typeof row === "string" ? row.split('') : row).map((char) => {
            
            const cellStyle = store.exactGuesses.includes(char)
            ? "bg-blue-600 text-white" 
            : store.inexactGuesses.includes(char)
            ? "bg-yellow-500 text-white"
            : store.allGuesses.includes(char)
            ? "bg-red-600 text-white"
            : "bg-white text-black" 

            return (
              <Button
                key={char}
                onClick={() => store.handleKeyPress(char)}
                // style={{
                //   width: char === "enter" || char === "backspace" ? keySize2 : keySize1,
                //   fontSize: char === "enter" ? 18 : 24,
                //   height: 60,
                //   maxWidth: char === "enter" || char === "backspace" ? 75 : 50,
                // }}
                className={`h-16 max-w-18 min-w-0 cursor-pointer font-martires-bold text-2xl rounded-xs m-px flex items-center justify-center uppercase hover:${cellStyle} ${cellStyle}`}
              >
                {char === "backspace" ? <Delete /> : char}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
})