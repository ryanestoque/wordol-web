import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import Hero from "@/components/common/Hero";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import GameSettings from "@/components/common/GameSettings";
import GameStats from "@/components/common/GameStats";

export default observer(function Home() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);

  return(
    <div className="flex flex-col h-screen p-4 gap-4">
      <header className="flex flex-row-reverse gap-4">
        <GameSettings />
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <Hero />
        <div className="flex flex-col-reverse sm:flex-row gap-2 justify-center items-center mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">How to Play?</Button>
            </DialogTrigger> 
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-3xl font-martires-black">HOW TO PLAY</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>     
          <GameStats />   
          <Button asChild size={"lg"} className="cursor-pointer w-full sm:w-1/2 py-6">
            <Link to={"/game"} >
              Play
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <p className="font-inter-bold">{formattedDate}</p>
          <p>Version 1.0</p>
        </div>
      </main>
    </div>
  );
})