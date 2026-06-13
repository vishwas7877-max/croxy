const cards = [
  {
    title: "Anime AI",
    desc: "Personalized anime recommendations powered by AI."
  },
  {
    title: "Movie Universe",
    desc: "Discover immersive movie experiences instantly."
  },
  {
    title: "Music Intelligence",
    desc: "Smart playlists based on your emotions and mood."
  },
];

export default function EntertainmentCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-bold text-center mb-16">
          Explore Experiences
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:-translate-y-2 transition"
            >
              <div className="h-40 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 mb-6"></div>

              <h3 className="text-2xl font-semibold">
                {card.title}
              </h3>

              <p className="text-zinc-400 mt-4">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}