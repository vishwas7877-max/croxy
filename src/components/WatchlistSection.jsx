import { motion } from "framer-motion";
import { useWatchlist } from "../WatchlistContext";
import Reveal from "./Reveal";

export default function WatchlistSection() {
  const { watchlist, removeFromWatchlist } =
    useWatchlist();

  if (watchlist.length === 0) {
    return (
      <section className="relative py-24 md:py-36 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
            YOUR WATCHLIST
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
            Nothing Saved Yet
          </h2>

          <p className="text-zinc-400 text-lg mt-8">
            Start adding movies and anime to your watchlist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <Reveal>
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-16">

            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
              YOUR WATCHLIST
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
              Saved Collection
            </h2>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {watchlist.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group relative"
              >

                {/* Glow */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40">

                  {/* Poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[300px] md:h-[420px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-5 w-full">

                    <h3 className="text-xl font-bold">
                      {movie.title}
                    </h3>

                    <button
                      onClick={() =>
                        removeFromWatchlist(movie.id)
                      }
                      className="mt-4 w-full py-3 rounded-2xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition"
                    >
                      Remove
                    </button>
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