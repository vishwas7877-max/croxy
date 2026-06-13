import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Clapperboard,
  Music4,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Advanced AI understands your taste and delivers personalized entertainment instantly.",
  },
  {
    icon: Search,
    title: "Cross Platform Discovery",
    desc: "Find movies, anime, and music across all major streaming ecosystems.",
  },
  {
    icon: Clapperboard,
    title: "Immersive Experience",
    desc: "A cinematic interface designed for modern entertainment exploration.",
  },
  {
    icon: Music4,
    title: "Mood Based Suggestions",
    desc: "Croxy adapts recommendations based on your vibe and emotions.",
  },
];

export default function WhyCroxy() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-700/10 blur-[160px] rounded-full" />

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              WHY CROXY
            </p>

            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Entertainment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                {" "}Reimagined
              </span>
            </h2>

            <p className="text-zinc-400 mt-8 max-w-3xl mx-auto text-lg">
              Built for the next generation of intelligent entertainment experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group relative"
                >

                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

                  <div className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 h-full hover:border-purple-500/30 transition duration-300">

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-8 border border-white/10">
                      <Icon className="text-purple-400" size={30} />
                    </div>

                    <h3 className="text-2xl font-semibold mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-zinc-400 leading-relaxed">
                      {feature.desc}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}