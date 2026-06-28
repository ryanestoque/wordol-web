import { motion } from "framer-motion";

export default function Footer() {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <motion.div 
      className="text-center mt-auto mb-8" 
      variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
    >
      <p className="font-inter-bold">{formattedDate}</p>
      <p className="text-sm">Created by Ryan Estoque</p>
    </motion.div>
  );
}
