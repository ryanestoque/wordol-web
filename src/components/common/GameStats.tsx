import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import useSWR from "swr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GameStats({ context }: { context?: string }) {
  const { user } = useAuth();

  const { data: stats, isLoading } = useSWR(
    user ? `users/${user.uid}` : null,
    async (key: string) => {
      const snap = await getDoc(doc(db, "users", key.split("/")[1]));
      if (snap.exists() && snap.data().stats) {
        return snap.data().stats as {
          gamesPlayed: number;
          wins: number;
          currentStreak: number;
          maxStreak: number;
        };
      }
      return { gamesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0 };
    }
  );

  const safeStats = stats ?? { gamesPlayed: 0, wins: 0, currentStreak: 0, maxStreak: 0 };


  const losses = safeStats.gamesPlayed - safeStats.wins;
  const winrate = safeStats.gamesPlayed > 0 ? Math.round((safeStats.wins / safeStats.gamesPlayed) * 100) : 0;

  return(
    <Dialog>
      {context === "header" ?       
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <ChartNoAxesColumnIncreasing className="scale-150 md:scale-180"/>
          </Button>
        </DialogTrigger> 
      : <DialogTrigger asChild>
          <Button size={"sm"} variant={"outline"} className="cursor-pointer w-full py-6 text-base rounded-2xl">My Stats</Button>
        </DialogTrigger> 
      }

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-martires-black">MY STATS</DialogTitle>
          <div className="flex flex-row mt-8 justify-evenly items-center flex-wrap gap-4">
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : safeStats.gamesPlayed}</h1>  
              <p className="font-inter-medium">Games</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : safeStats.wins}</h1>  
              <p className="font-inter-medium">Win/s</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : losses}</h1>  
              <p className="font-inter-medium">Loss/es</p>  
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : `${winrate}%`}</h1>  
              <p className="font-inter-medium">Winrate</p>  
            </div>
            <div className="flex flex-col items-center w-full mt-4 flex-row justify-center gap-12">
              <div className="flex flex-col items-center">
                <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : safeStats.currentStreak}</h1>  
                <p className="font-inter-medium">Current Streak</p>  
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-inter-semibold text-4xl">{isLoading ? "—" : safeStats.maxStreak}</h1>  
                <p className="font-inter-medium">Max Streak</p>  
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}