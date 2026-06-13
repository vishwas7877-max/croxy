import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function AIAssistant() {
  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              AI ASSISTANT
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
              Your Personal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Entertainment Companion
              </span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mt-8 max-w-2xl">
              Ask Croxy anything — from anime recommendations
              to mood-based playlists and cinematic experiences.
            </p>

            {/* Features */}
            <div className="space-y-5 mt-12">

              {[
                "Smart AI entertainment suggestions",
                "Mood-based recommendations",
                "Cross-platform discovery",
                "Real-time personalized insights",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >

                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

                  <p className="text-zinc-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT CHAT PANEL */}
          <motion.div
            whileHover={{ y: -8 }}
            className="relative rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl overflow-hidden"
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500"></div>

                <div>
                  <h3 className="font-bold">
                    Croxy AI
                  </h3>

                  <p className="text-green-400 text-sm">
                    Online
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                Beta
              </div>
            </div>

            {/* Chat */}
            <div className="p-6 space-y-6">

              {/* USER */}
              <div className="flex justify-end">

                <div className="max-w-[80%] rounded-3xl rounded-br-md bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-4">
                  Suggest me a cyberpunk anime with amazing visuals.
                </div>
              </div>

              {/* AI */}
              <div className="flex justify-start">

                <div className="max-w-[80%] rounded-3xl rounded-bl-md bg-white/[0.05] border border-white/10 px-5 py-4">
                  Based on your interests, I recommend:
                  <span className="text-purple-400 font-semibold">
                    {" "}Cyberpunk: Edgerunners
                  </span>
                  , Akira and Ghost in the Shell.
                </div>
              </div>

              {/* USER */}
              <div className="flex justify-end">

                <div className="max-w-[80%] rounded-3xl rounded-br-md bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-4">
                  Also generate a late-night lo-fi playlist.
                </div>
              </div>

              {/* AI Typing */}
              <div className="flex justify-start">

                <div className="rounded-3xl rounded-bl-md bg-white/[0.05] border border-white/10 px-5 py-4 flex gap-2">

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                    }}
                    className="w-2 h-2 rounded-full bg-purple-400"
                  />

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: 0.1,
                    }}
                    className="w-2 h-2 rounded-full bg-purple-400"
                  />

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-5">

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-zinc-500">
                Ask Croxy AI anything...
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
