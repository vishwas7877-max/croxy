import { motion } from "framer-motion";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  // JWT Auth Navigation
  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/75" />

      {/* PURPLE GLOW */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-purple-700/20 blur-[180px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-36 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* LEFT SIDE */}
          <div>

            {/* TAG */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl px-4 md:px-5 py-2 md:py-3 rounded-full text-purple-300 text-xs md:text-sm mb-8"
            >
              ✦ AI ENTERTAINMENT PLATFORM
            </motion.div>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1]"
            >
              Discover.
              <br />
              Watch.
              <br />
              Enjoy.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                All In One Place.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl"
            >
              Croxy helps you discover movies, anime,
              music, AI avatars and immersive entertainment
              experiences personalized just for you.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <button
                onClick={() => handleProtectedNavigation("/discover")}
                className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition font-semibold"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/20 backdrop-blur-xl hover:bg-white/10 transition"
              >
                Explore Recommendations
              </button>
            </motion.div>

            {/* PLATFORM NAMES */}
            <div className="mt-14">
              <p className="text-zinc-400 mb-6">
                Works across platforms
              </p>

              <div className="flex flex-wrap gap-5 md:gap-8 text-lg md:text-2xl font-bold text-zinc-300">
                <span className="text-red-500">NETFLIX</span>
                <span>SPOTIFY</span>
                <span>CRUNCHYROLL</span>
                <span>PRIME</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden lg:flex justify-center items-center">

            <div className="w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] absolute"></div>

          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {[
            {
              title: "Personalized For You",
              desc: "AI analyzes your preferences to recommend what you'll love.",
            },
            {
              title: "Cross Platform Search",
              desc: "Discover content across multiple streaming services.",
            },
            {
              title: "Save Time",
              desc: "No endless scrolling. Find the best instantly.",
            },
            {
              title: "Track & Manage",
              desc: "Keep track of what you watch and enjoy.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-purple-500/30 transition"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-2xl md:text-3xl mb-6">
                ✦
              </div>

              <h3 className="text-xl md:text-2xl font-semibold">
                {card.title}
              </h3>

              <p className="text-zinc-400 mt-4 leading-relaxed text-sm md:text-base">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}