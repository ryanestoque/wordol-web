import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import Hero from "@/components/common/Hero";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default observer(function Home() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);

  return(
    <>
      <main className="flex flex-col justify-center items-center h-screen p-8">
        <Hero />
        <div className="flex flex-col-reverse sm:flex-row gap-2 justify-center items-center mb-12">
          <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">How to Play?</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">My Stats</Button>
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
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>     
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
    </>
  );
})