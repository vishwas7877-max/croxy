import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const addHoverEvents = () => {
      const elements = document.querySelectorAll(
        "button, a, .cursor-hover"
      );

      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setHovering(true);
        });

        el.addEventListener("mouseleave", () => {
          setHovering(false);
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);

    addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: hovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 28,
        }}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-purple-400 z-[9999] pointer-events-none mix-blend-screen"
      />

      {/* Glow */}
      <motion.div
        animate={{
          x: position.x - 80,
          y: position.y - 80,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        className="fixed top-0 left-0 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl z-[9998] pointer-events-none"
      />
    </>
  );
}