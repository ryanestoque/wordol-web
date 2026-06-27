import GameSettings from "@/components/common/GameSettings";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(today);

  const containerVariants = {
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
      <main className="flex-1 flex flex-col justify-center items-center w-full">
        {children}
        <motion.div className="text-center mt-12" variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}>
          <p className="font-inter-bold">{formattedDate}</p>
          <p className="text-sm opacity-70">Version 1.0</p>
        </motion.div>
      </main>
    </motion.div>
  );
}
