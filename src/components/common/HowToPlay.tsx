import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function HowToPlay({ context }: { context?: string }) {
  return (
    <Dialog>
      {context === "header" ?       
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <HelpCircle className="scale-150 md:scale-180"/>
          </Button>
        </DialogTrigger> 
      : <DialogTrigger asChild>
          <Button size={"sm"} variant={"outline"} className="cursor-pointer w-full py-6 text-base rounded-2xl">How to Play?</Button>
        </DialogTrigger> 
      }
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-4xl font-martires-black uppercase tracking-wider text-left">
          HOW TO PLAY?
        </DialogTitle>
        <h2 className="text-2xl font-martires-regular uppercase text-left">
          Guess the Bisaya word in 6 tries.
        </h2>
      </DialogHeader>
      
      <div className="flex flex-col gap-5 text-base font-inter-regular">
        <ul className="list-disc pl-5 space-y-3">
          <li>Each guess must be a valid 5-letter Bisaya word.</li>
          <li>The cell colors will change to display how close you are to the secret Bisaya word.</li>
        </ul>

        <h3 className="font-inter-bold text-lg">Examples</h3>
        
        {/* Example 1 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <Cell letter="b" />
            <Cell letter="u" status="correct" />
            <Cell letter="k" />
            <Cell letter="o" />
            <Cell letter="g" />
          </div>
          <p>
            <strong>U</strong> is in the word and in the correct spot.
          </p>
        </div>

        {/* Example 2 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <Cell letter="k" />
            <Cell letter="a" />
            <Cell letter="l" status="present" />
            <Cell letter="a" />
            <Cell letter="g" />
          </div>
          <p>
            <strong>L</strong> is in the word but in the wrong spot.
          </p>
        </div>

        {/* Example 3 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            <Cell letter="a" />
            <Cell letter="d" />
            <Cell letter="u" />
            <Cell letter="n" status="absent" />
            <Cell letter="a" />
          </div>
          <p>
            <strong>N</strong> is not in the word in any spot.
          </p>
        </div>

        <p className="mt-4 pt-4 border-t border-border">
          A new Bisaya word is released daily at midnight. You can only play the game once a day. Kayahon ba nimo, dol?
        </p>
      </div>
    </DialogContent>
    </Dialog>
  )
}

function Cell({ letter, status }: { letter: string, status?: 'correct' | 'present' | 'absent' }) {
  let styleClass = "text-foreground bg-background";
  if (status === 'correct') styleClass = "bg-blue-600 text-white";
  else if (status === 'present') styleClass = "bg-yellow-500 text-white";
  else if (status === 'absent') styleClass = "bg-red-600 text-white";

  return (
    <div className={`w-12 h-12 border border-border ${styleClass} font-martires-black uppercase flex items-center justify-center text-3xl`}>
      {letter}
    </div>
  )
}
