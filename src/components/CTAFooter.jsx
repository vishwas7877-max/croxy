

export default function CTAFooter() {
  return (
    <footer className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      {/* CTA SECTION */}
      <section className="relative z-10 px-6 py-32">

        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-12 md:p-20">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10"></div>

            <div className="relative z-10 text-center">

              <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
                START YOUR EXPERIENCE
              </p>

              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                The Future Of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Entertainment Is Here.
                </span>
              </h2>

              <p className="text-zinc-400 text-lg max-w-3xl mx-auto mt-8 leading-relaxed">
                Discover movies, anime, music and intelligent
                AI experiences in one immersive platform.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-6 mt-12">

                <button className="px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-lg hover:scale-105 transition duration-300 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                  Launch Croxy
                </button>

                <button className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition text-lg">
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="relative z-10 border-t border-white/10 px-6 py-10">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500"></div>

            <div>
              <h3 className="text-2xl font-bold">
                CROXY
              </h3>

              <p className="text-zinc-500 text-sm">
                AI Entertainment Platform
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-zinc-400">

            <a href="#" className="hover:text-purple-400 transition">
              Home
            </a>

            <a href="#" className="hover:text-purple-400 transition">
              Features
            </a>

            <a href="#" className="hover:text-purple-400 transition">
              Explore
            </a>

            <a href="#" className="hover:text-purple-400 transition">
              Privacy
            </a>

            <a href="#" className="hover:text-purple-400 transition">
              Terms
            </a>
          </div>

          {/* Socials */}
            <div className="flex gap-4">

            {["IG", "X", "YT"].map((item, index) => (
                <button
                key={index}
                className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center hover:border-purple-500/40 hover:bg-purple-500/10 transition text-sm font-bold"
                >
                {item}
                </button>
            ))}
            </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-zinc-500 text-sm mt-10">
          © 2026 Croxy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}