import { motion } from "framer-motion";

import img1 from "../assets/c1.jpg";
import img2 from "../assets/c2.jpg";
import img3 from "../assets/c3.jpg";
import img4 from "../assets/c4.jpg";
import img5 from "../assets/c5.jpg";
import img6 from "../assets/c6.jpg";

const row1 = [
  img1,
  img2,
  img3,
  img4,
];

const row2 = [
  img5,
  img6,
  img1,
  img2,
];

export default function EntertainmentScroll() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 px-6">

        <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
          ENDLESS ENTERTAINMENT
        </p>

        <h2 className="text-4xl md:text-6xl font-black leading-tight">
          Movies. Anime. <br />
          Everything You Love.
        </h2>
      </div>

      {/* Row 1 */}
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="flex gap-6 w-max mb-6"
      >
        {[...row1, ...row1].map((image, index) => (
          <div
            key={index}
            className="relative min-w-[280px] md:min-w-[380px] h-[180px] md:h-[240px] rounded-[32px] overflow-hidden border border-white/10 bg-white/5"
          >

            {/* Image */}
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Glow */}
            <div className="absolute inset-0 bg-purple-500/10"></div>
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
        className="flex gap-6 w-max"
      >
        {[...row2, ...row2].map((image, index) => (
          <div
            key={index}
            className="relative min-w-[280px] md:min-w-[380px] h-[180px] md:h-[240px] rounded-[32px] overflow-hidden border border-white/10 bg-white/5"
          >

            {/* Image */}
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Glow */}
            <div className="absolute inset-0 bg-pink-500/10"></div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}