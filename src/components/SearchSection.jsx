import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { searchMovies } from "../api/tmdb";
import Reveal from "./Reveal";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const data = await searchMovies(value);

    setResults(data);

    setLoading(false);
  }

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              SEARCH ENGINE
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
              Discover Anything
            </h2>
          </div>

          {/* Search */}
          <div className="max-w-3xl mx-auto relative mb-16">

            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500"
              size={22}
            />

            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search movies..."
              className="w-full h-20 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl pl-16 pr-6 text-lg outline-none focus:border-purple-500/40 transition"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-zinc-400">
              Searching...
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

              {results.map((movie, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group"
                >

                  <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30">

                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-5">

                      <h3 className="text-lg font-bold">
                        {movie.Title}
                      </h3>

                      <p className="text-zinc-300 text-sm mt-2">
                        {movie.Year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}