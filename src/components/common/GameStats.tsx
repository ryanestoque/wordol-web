import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GameStats({ context }: { context?: string }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0
  });

  useEffect(() => {
    async function fetchStats() {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().stats) {
          setStats(docSnap.data().stats);
        }
      }
    }
    fetchStats();
  }, [user]);

  const losses = stats.gamesPlayed - stats.wins;
  const winrate = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;

  return(
    <Dialog>
      {context === "header" ?       
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <ChartNoAxesColumnIncreasing className="scale-150 md:scale-180"/>
          </Button>
        </DialogTrigger> 
      : <DialogTrigger asChild>
          <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full py-6 text-lg rounded-2xl">My Stats</Button>
        </DialogTrigger> 
      }

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-martires-black">MY STATS</DialogTitle>
          <div className="flex flex-row mt-8 justify-evenly items-center flex-wrap gap-4">
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{stats.gamesPlayed}</h1>  
              <p className="font-inter-medium">Games</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{stats.wins}</h1>  
              <p className="font-inter-medium">Win/s</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{losses}</h1>  
              <p className="font-inter-medium">Loss/es</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{winrate}%</h1>  
              <p className="font-inter-medium">Winrate</p>  
            </div>
            <div className="flex flex-col items-center w-full mt-4 flex-row justify-center gap-12">
              <div className="flex flex-col items-center">
                <h1 className="font-inter-semibold text-4xl">{stats.currentStreak}</h1>  
                <p className="font-inter-medium">Current Streak</p>  
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-inter-semibold text-4xl">{stats.maxStreak}</h1>  
                <p className="font-inter-medium">Max Streak</p>  
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}