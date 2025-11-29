import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import GameSettings from "./GameSettings";
import GameStats from "./GameStats";

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
        <GameStats context="header"/>
        <GameSettings />
      </div>
    </header>
  )
}