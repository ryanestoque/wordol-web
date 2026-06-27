import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import Hero from "@/components/common/Hero";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import HowToPlay from "@/components/common/HowToPlay";
import GameStats from "@/components/common/GameStats";
import PageLayout from "@/components/common/PageLayout";
import { motion } from "framer-motion";

export default observer(function Home() {
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  return(
    <PageLayout>
      <Hero />
      <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full max-w-[280px]">
        <Button asChild size={"lg"} className="cursor-pointer w-full py-6 text-lg rounded-2xl">
          <Link to={"/game"} >
            Play
          </Link>
        </Button>
        <GameStats />   
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"} variant={"outline"} className="cursor-pointer w-full py-6 text-lg rounded-2xl">How to Play?</Button>
          </DialogTrigger> 
          <HowToPlay />
        </Dialog>     
      </motion.div>
    </PageLayout>
  );
})