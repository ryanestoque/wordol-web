import { observer } from "mobx-react-lite";
import Guess from "../components/common/Grid";
import Keyboard from "../components/common/Keyboard";
import PuzzleStore from "../stores/PuzzleStore";
import { Button } from "@/components/ui/button";
import Hero from "@/components/common/Hero";
import { Link } from "react-router-dom";

export default observer(function Home() {
  return(
    <>
      <main className="flex flex-col justify-center items-center h-screen p-8">
        <Hero />
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-center items-center mb-12">
            <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">How to Play?</Button>
            <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full sm:w-1/2 py-6 border-black">My Stats</Button>
            
              <Button asChild size={"lg"} className="cursor-pointer w-full sm:w-1/2 py-6">
                <Link to={"/game"} >
                  Play
                </Link>
              </Button>
            
          </div>
        <div className="text-center">
          <p className="font-inter-bold">November 18, 2025</p>
          <p>Word #1</p>
        </div>
      </main>
    </>
  );
})