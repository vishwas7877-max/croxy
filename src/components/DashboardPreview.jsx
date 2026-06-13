import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function DashboardPreview() {
  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-20">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              AI DASHBOARD
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
              Personalized
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Entertainment Intelligence
              </span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-3xl mx-auto mt-8">
              Croxy intelligently adapts to your entertainment behavior
              to create a fully personalized experience.
            </p>
          </div>

          {/* Dashboard */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT LARGE CARD */}
            <motion.div
              whileHover={{ y: -10 }}
              className="lg:col-span-2 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8 overflow-hidden relative"
            >

              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5"></div>

              <div className="relative z-10">

                <div className="flex items-center justify-between mb-10">

                  <div>
                    <p className="text-zinc-400 text-sm">
                      AI Recommendation Engine
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                      Your Entertainment Feed
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
                    Live
                  </div>
                </div>

                {/* Recommendation Cards */}
                <div className="grid md:grid-cols-3 gap-6">

                  {[
                    {
                      title: "Cyberpunk Anime",
                      match: "98%",
                    },
                    {
                      title: "Sci-Fi Movies",
                      match: "95%",
                    },
                    {
                      title: "Lo-Fi Music",
                      match: "92%",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-3xl border border-white/10 bg-black/30 p-6"
                    >

                      <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6"></div>

                      <div className="flex items-center justify-between">

                        <h4 className="font-semibold">
                          {item.title}
                        </h4>

                        <span className="text-purple-400 font-bold">
                          {item.match}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Stats */}
              <motion.div
                whileHover={{ y: -8 }}
                className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8"
              >

                <p className="text-zinc-400 mb-4">
                  AI Accuracy
                </p>

                <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  98%
                </h3>

                <p className="text-zinc-500 mt-4">
                  Personalized recommendation accuracy based on user behavior.
                </p>
              </motion.div>

              {/* Activity */}
              <motion.div
                whileHover={{ y: -8 }}
                className="rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8"
              >

                <p className="text-zinc-400 mb-6">
                  Trending Activity
                </p>

                <div className="space-y-5">

                  {[
                    "Anime trends increasing",
                    "Sci-fi movies exploding",
                    "AI playlists trending",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>

                      <p className="text-zinc-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}