import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


export default function GameStats({ context }: any) {
  return(
    <Dialog>
      {context === "header" ?       
        <DialogTrigger>
          <Button variant="ghost" className="cursor-pointer">
            <ChartNoAxesColumnIncreasing className="scale-150 md:scale-180"/>
          </Button>
        </DialogTrigger> 
      : <DialogTrigger asChild>
          <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">My Stats</Button>
        </DialogTrigger> 
      }

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-martires-black">MY STATS</DialogTitle>
          <div className="flex flex-row mt-8 justify-evenly items-center">
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">0</h1>  
              <p className="font-inter-medium">Games</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">0</h1>  
              <p className="font-inter-medium">Win/s</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">0</h1>  
              <p className="font-inter-medium">Loss/es</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">0%</h1>  
              <p className="font-inter-medium">Winrate</p>  
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}