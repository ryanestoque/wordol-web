import useWindowDimensions from '@/hooks/useWindowDimensions';
import { observer } from 'mobx-react-lite'
import { Button } from '../ui/button';
import { Delete } from 'lucide-react';

export default observer(function Keyboard({ store } : any) {
  const { width } = useWindowDimensions();
  const keySize1 = width / 12.5;
  const keySize2 = width / 8.5;

  const qwerty = [
    'qwertyuiop', 
    'asdfghjkl', 
    ["enter", ..."zxcvbnm", "backspace"]
  ]

  return (
    <div className='flex flex-col justify-center items-center gap-0.5'>
      {qwerty.map((row) => (
        <div className="flex justify-center items-center gap-0.5">
          {(typeof row === "string" ? row.split('') : row).map((char) => {
            
            const cellStyle = store.exactGuesses.includes(char)
            ? "bg-blue-600 text-white" 
            : store.inexactGuesses.includes(char)
            ? "bg-yellow-500 text-white"
            : store.allGuesses.includes(char)
            ? "bg-red-600 text-white"
            : "bg-neutral-200 text-black" 

            return (
              <Button
                key={char}
                onClick={() => store.handleKeyPress(char)}
                style={{
                  width: char === "enter" || char === "backspace" ? keySize2 : keySize1,
                  fontSize: char === "enter" || char === "backspace" ? 16 : 24,
                  height: 56,
                  maxWidth: char === "enter" || char === "backspace" ? 75 : 50,
                }}
                className={`cursor-pointer font-martires-bold rounded-xs m-px flex items-center justify-center uppercase hover:${cellStyle} ${cellStyle}`}
              >
                {char === "backspace" ? <Delete className='scale-135'/>  : char}
              </Button>
            ) 
          })}
        </div>
      ))}
    </div>
  )
})