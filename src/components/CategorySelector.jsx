import { useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Music,
  Tv,
  Gamepad2,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Movies",
    icon: Film,
    desc: "Discover trending blockbusters and hidden gems.",
  },
  {
    title: "Anime",
    icon: Tv,
    desc: "Explore immersive anime worlds personalized for you.",
  },
  {
    title: "Music",
    icon: Music,
    desc: "AI-generated playlists based on your mood.",
  },
  {
    title: "Gaming",
    icon: Gamepad2,
    desc: "Track trending games and immersive experiences.",
  },
  {
    title: "AI Experiences",
    icon: Sparkles,
    desc: "Interact with intelligent entertainment systems.",
  },
];

export default function CategorySelector() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-36 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
            ENTERTAINMENT MODES
          </p>

          <h2 className="text-5xl md:text-6xl font-black">
            One Platform.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Infinite Experiences.
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mt-8">
            Seamlessly explore every type of entertainment
            through one intelligent AI-powered ecosystem.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setActive(index)}
                className={`relative cursor-pointer rounded-3xl p-8 border transition duration-500 overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.25)]"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >

                {/* Glow */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  />
                )}

                <div className="relative z-10">

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                    ${
                      isActive
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-white/10"
                    }`}
                  >
                    <Icon size={30} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4">
                    {category.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-zinc-400 leading-relaxed">
                    {category.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}