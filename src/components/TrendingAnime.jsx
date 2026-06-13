import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrendingAnime } from "../api/anilist";
import Reveal from "./Reveal";

export default function TrendingAnime() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    async function loadAnime() {
      const data = await getTrendingAnime();
      let limit = 10;
      if (window.innerWidth < 640) {
        limit = 4;
      } else if (window.innerWidth < 1024) {
        limit = 6;
      } else if (window.innerWidth < 1280) {
        limit = 8;
      }
        setAnime(data.slice(0, limit));
    }

    loadAnime();
  }, []);

  return (
    <section className="relative py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-pink-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-16">
            <p className="text-pink-400 uppercase tracking-[0.3em] text-sm mb-6">
              TRENDING ANIME
            </p>

            <h2 className="text-5xl md:text-6xl font-black">
              Anime Universe
            </h2>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {anime.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="group"
              >

                {/* Poster */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10">

                  <img
                    src={item.coverImage.large}
                    alt={item.title.romaji}
                    className="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1 rounded-full text-sm">
                    ⭐ {item.averageScore || "N/A"}
                  </div>

                  {/* Bottom */}
                  <div className="absolute bottom-0 left-0 p-5">

                    <h3 className="text-lg font-bold">
                      {item.title.romaji}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.genres.slice(0, 2).map((genre, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/10 px-2 py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}