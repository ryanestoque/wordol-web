import GameSettings from "@/components/common/GameSettings";
import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  noScroll?: boolean;
}

export default function PageLayout({ children, headerLeft, headerRight, noScroll }: PageLayoutProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      className={cn("flex flex-col p-4 gap-4", noScroll ? "h-dvh overflow-hidden" : "min-h-dvh")}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.header className="flex justify-between items-center gap-4 w-full" variants={{ initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }}>
        <div className="flex items-center min-w-0">
          {headerLeft}
        </div>
        <div className="flex shrink-0 items-center">
          {headerRight}
          <GameSettings />
        </div>
      </motion.header>
      <main className="flex-1 flex flex-col items-center w-full min-h-0">
        {children}
      </main>
    </motion.div>
  );
}
