import { motion } from "framer-motion";

export default function AIOrbSection() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE */}
        <div>

          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
            AI ASSISTANT
          </p>

          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Meet Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Entertainment AI
            </span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed mt-8 max-w-2xl">
            Croxy intelligently understands your mood,
            preferences and entertainment patterns to create
            deeply personalized experiences in real time.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-6">

            {[
              "Real-time AI recommendations",
              "Mood-based entertainment discovery",
              "Anime, movie & music intelligence",
              "Smart watch tracking & suggestions",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

                <p className="text-zinc-300 text-lg">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center min-h-[500px]">

          {/* Outer Glow */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="absolute w-[420px] h-[420px] rounded-full bg-purple-600/20 blur-[100px]"
          />

          {/* Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="absolute w-[420px] h-[420px] rounded-full border border-purple-500/20"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
          </motion.div>

          {/* Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: "linear",
            }}
            className="absolute w-[320px] h-[320px] rounded-full border border-pink-500/20"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full shadow-[0_0_20px_rgba(236,72,153,1)]"></div>
          </motion.div>

          {/* MAIN ORB */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="relative w-[220px] h-[220px] rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-pink-500 shadow-[0_0_100px_rgba(168,85,247,0.8)]"
          >

            {/* Inner Glow */}
            <div className="absolute inset-6 rounded-full bg-black/30 backdrop-blur-3xl border border-white/10"></div>

            {/* Center Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute inset-[35%] rounded-full bg-white"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}