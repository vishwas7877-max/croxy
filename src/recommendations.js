export function generateRecommendations(mood) {
  const database = {
    chill: [
      "Lo-Fi Beats",
      "Your Name",
      "Spirited Away",
      "Interstellar",
    ],

    action: [
      "John Wick",
      "Attack on Titan",
      "Cyberpunk: Edgerunners",
      "Mad Max",
    ],

    emotional: [
      "A Silent Voice",
      "The Pursuit of Happyness",
      "Weathering With You",
      "La La Land",
    ],

    futuristic: [
      "Blade Runner 2049",
      "Ghost in the Shell",
      "Akira",
      "Ex Machina",
    ],
  };

  return database[mood] || [];
}