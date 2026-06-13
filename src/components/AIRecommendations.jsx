import { useState } from "react";
import { motion } from "framer-motion";

import Reveal from "./Reveal";
import { generateRecommendations } from "../recommendations";

const moods = [
  "chill",
  "action",
  "emotional",
  "futuristic",
];

export default function AIRecommendations() {
  const [selectedMood, setSelectedMood] =
    useState("chill");

  const recommendations =
    generateRecommendations(selectedMood);

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              AI RECOMMENDATIONS
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
              Entertainment Based
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                On Your Mood
              </span>
            </h2>

            <p className="text-zinc-400 text-lg mt-6 max-w-3xl mx-auto">
              Croxy AI intelligently adapts recommendations
              according to your emotional state and interests.
            </p>
          </div>

          {/* Mood Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">

            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-6 py-3 rounded-full capitalize transition duration-300 border
                ${
                  selectedMood === mood
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 border-transparent"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          {/* Recommendation Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {recommendations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8"
              >

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-8 flex items-center justify-center text-3xl">
                    ✦
                  </div>

                  <h3 className="text-2xl font-bold">
                    {item}
                  </h3>

                  <p className="text-zinc-400 mt-4">
                    AI-curated recommendation based on your
                    selected entertainment mood.
                  </p>

                  <button className="mt-8 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold">
                    Explore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}