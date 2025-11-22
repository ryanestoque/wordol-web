import { ChartNoAxesColumnIncreasing, ChevronRight, RotateCcw, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function GameHeader() {
  return(
    <header className="flex justify-between items-center">
      <Link to={"/home"} className="flex items-center gap-2">
        <img src="images/wordol_logo.png" className="h-7 w-7"/>
        <h1 className="text-3xl font-martires-black">
          Wordol
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="cursor-pointer" onClick={() => window.location.reload()}>
          <RotateCcw className="scale-150 md:scale-180"/>
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost" className="cursor-pointer">
              <ChartNoAxesColumnIncreasing className="scale-150 md:scale-180"/>
            </Button>
          </DialogTrigger> 
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl font-martires-black">MY STATS</DialogTitle>
              <div className="flex flex-row mt-8 justify-evenly items-center">
                <div className="flex flex-col items-center">
                  <h1 className="font-inter-bold text-4xl">0</h1>  
                  <p className="font-inter-medium">Games</p>  
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-inter-bold text-4xl">0</h1>  
                  <p className="font-inter-medium">Win/s</p>  
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-inter-bold text-4xl">0</h1>  
                  <p className="font-inter-medium">Loss/es</p>  
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="font-inter-bold text-4xl">0%</h1>  
                  <p className="font-inter-medium">Winrate</p>  
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
<Dialog>
          <DialogTrigger>
            <Button variant="ghost" className="cursor-pointer">
              <Settings className="scale-150 md:scale-180"/>
            </Button>
          </DialogTrigger> 
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl font-martires-black mb-6">SETTINGS</DialogTitle>
              <div className="flex flex-col gap-6">
                <div className="p-0 flex flex-row items-center justify-between space-x-2">
                  <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Lagom Mode</Label>
                  <Switch id="airplane-mode"/>
                </div>
                <Button variant="ghost" className="p-0 flex flex-row items-center justify-between space-x-2">
                  <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Akawnt</Label>
                </Button>
                <div className="flex flex-row items-center justify-between space-x-2">
                  <Label htmlFor="airplane-mode" className="font-inter-medium text-base">Clear Statistics</Label>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}