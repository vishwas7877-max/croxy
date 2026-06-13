const API_KEY =
  import.meta.env.VITE_OMDB_API_KEY;

const featuredMovies = [
  "Interstellar",
  "Inception",
  "John Wick",
  "Avatar",
  "The Batman",
  "Dune",
  "Oppenheimer",
  "Avengers",
  "Joker",
  "Spider-Man",
];

export async function getTrendingMovies() {
  try {
    const promises = featuredMovies.map(
      async (title) => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
        );

        return response.json();
      }
    );

    const data = await Promise.all(promises);

    return data;
  } catch (error) {
    console.log("OMDb Error:", error);

    return [];
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
    );

    const data = await response.json();

    return data.Search || [];
  } catch (error) {
    console.log("Search Error:", error);

    return [];
  }
}