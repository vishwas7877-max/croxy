import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getTrendingMovies } from "../api/tmdb";
import { useWatchlist } from "../WatchlistContext";

import Reveal from "./Reveal";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  const { addToWatchlist } = useWatchlist();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovies() {
      const data = await getTrendingMovies();

      let limit = 10;

      if (window.innerWidth < 640) {
        limit = 4;
      } else if (window.innerWidth < 1024) {
        limit = 6;
      }

      setMovies(data.slice(0, limit));
    }

    loadMovies();
  }, []);

  // JWT Auth Check
  const handleProtectedNavigation = (callback) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    callback();
  };

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-16">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              TRENDING NOW
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
              Popular Movies
            </h2>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {movies.map((movie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={
                  window.innerWidth >= 768
                    ? {
                        y: -15,
                      }
                    : {}
                }
                className="group relative"
              >

                {/* Glow */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/30 to-pink-500/20 blur-2xl opacity-0 md:group-hover:opacity-100 transition duration-500"></div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40">

                  {/* Poster */}
                  <div className="overflow-hidden">

                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-[300px] md:h-[420px] object-cover md:group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90"></div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 md:group-hover:opacity-100 transition duration-500"></div>

                  {/* Play Button */}
                  <motion.button
                    whileHover={
                      window.innerWidth >= 768
                        ? { scale: 1.1 }
                        : {}
                    }
                    onClick={() =>
                      handleProtectedNavigation(() => {
                        navigate("/discover");
                      })
                    }
                    className="absolute top-5 right-5 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-100 transition duration-500 z-20"
                  >
                    <Play fill="white" size={20} />
                  </motion.button>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-5 w-full z-10">

                    {/* Badge */}
                    <div className="mb-4 inline-flex px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl text-sm">
                      🎬 Featured
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold">
                      {movie.Title}
                    </h3>

                    {/* Year */}
                    <p className="text-zinc-300 text-sm mt-2">
                      {movie.Year}
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 space-y-3 opacity-100 transition duration-500">

                      {/* Watch */}
                      <button
                        onClick={() =>
                          handleProtectedNavigation(() => {
                            navigate("/discover");
                          })
                        }
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold"
                      >
                        Watch Now
                      </button>

                      {/* Watchlist */}
                      <button
                        onClick={() =>
                          handleProtectedNavigation(() => {
                            addToWatchlist(movie);
                          })
                        }
                        className="w-full py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                      >
                        + Add To Watchlist
                      </button>
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