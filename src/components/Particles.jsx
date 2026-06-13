import { motion } from "framer-motion";

const particles = Array.from({ length: 40 });

export default function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {particles.map((_, index) => {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={index}
            initial={{
              y: "110vh",
              opacity: 0,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-purple-400/40 blur-sm"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
            }}
          />
        );
      })}
    </div>
  );
}