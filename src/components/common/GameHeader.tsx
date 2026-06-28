import { Link } from "react-router-dom";
import GameSettings from "./GameSettings";
import GameStats from "./GameStats";
import HowToPlay from "./HowToPlay";
import SuggestWord from "./SuggestWord";

export default function GameHeader() {
  return(
    <header className="flex justify-between items-center">
      <Link to={"/home"} className="flex items-center gap-2">
        <img src="images/wordol_logo.png" className="h-7 w-7"/>
        <h1 className="text-3xl font-martires-black">
          Wordol
        </h1>
      </Link>
      <div className="flex items-center">
        <SuggestWord context="header"/>
        <HowToPlay context="header"/>
        <GameStats context="header"/>
        <GameSettings />
      </div>
    </header>
  )
}