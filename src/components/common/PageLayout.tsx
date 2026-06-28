import GameSettings from "@/components/common/GameSettings";
import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
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
      className="flex flex-col min-h-screen p-4 gap-4"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.header className="flex flex-row-reverse gap-4 w-full" variants={{ initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } }}>
        <GameSettings />
      </motion.header>
      <main className="flex-1 flex flex-col items-center w-full">
        {children}
      </main>
    </motion.div>
  );
}
