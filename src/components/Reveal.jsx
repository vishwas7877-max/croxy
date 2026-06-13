import { motion } from "framer-motion";

export default function Reveal({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 150,
        scale: 0.9,
        filter: "blur(20px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}