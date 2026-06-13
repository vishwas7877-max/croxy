const features = [
  "AI Recommendations",
  "Real-Time Personalization",
  "Immersive UI Experience",
  "Multi-Entertainment Ecosystem",
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        
        <h2 className="text-5xl font-bold">
          Built For The Next Generation
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="border border-zinc-800 bg-zinc-900 rounded-2xl p-8 text-left"
            >
              <h3 className="text-xl font-semibold">
                {feature}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}